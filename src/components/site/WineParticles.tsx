import { useEffect, useRef } from "react";
import * as THREE from "three";
import wineImg from "@/assets/wine-glass/ezgif-frame-038.jpg";

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uPixelRatio;
  uniform float uSize;

  attribute vec3 aTarget;     // assembled (image)
  attribute vec3 aScatter;    // dispersed sphere
  attribute vec3 aColor;
  attribute float aSeed;
  attribute float aBrightness;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vBrightness;

  void main() {
    // particles stay locked to the image shape; only subtle life + mouse push
    vec3 pos = aTarget;

    float t = uTime * 0.35 + aSeed * 6.2831;
    vec3 noise = vec3(
      sin(t * 1.1 + aSeed * 3.0),
      cos(t * 0.9 + aSeed * 5.0),
      sin(t * 1.3 + aSeed * 7.0)
    ) * 0.0025;
    pos += noise;

    vec2 toMouse = pos.xy - uMouse;
    float d = length(toMouse);
    float push = exp(-d * d * 8.0) * uMouseStrength;
    pos.xy += normalize(toMouse + 0.0001) * push * 0.18;
    pos.z += push * 0.08;

    // suppress reference to aScatter so attribute stays alive but unused
    pos += aScatter * 0.0 + uProgress * 0.0;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = uSize * (0.6 + aBrightness * 1.4);
    gl_PointSize = size * uPixelRatio * (1.0 / -mv.z);

    vColor = aColor;
    vBrightness = aBrightness;
    vAlpha = 1.0;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uReveal;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vBrightness;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 2.2);

    vec3 col = vColor * (0.7 + vBrightness * 1.6);
    col += vColor * glow * 0.8;

    float a = glow * vAlpha * uReveal * (0.55 + vBrightness * 0.6);
    gl_FragColor = vec4(col, a);
  }
`;

type Props = { active: boolean };

export default function WineParticles({ active }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ active: false, reveal: 0, progress: 0 });

  useEffect(() => {
    stateRef.current.active = active;
  }, [active]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uReveal: { value: 0 },
      uMouse: { value: new THREE.Vector2(10, 10) },
      uMouseStrength: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uSize: { value: 0.9 },
    };

    let points: THREE.Points | null = null;
    let disposed = false;

    const buildParticles = (img: HTMLImageElement) => {
      const targetW = 1100;
      const ratio = img.height / img.width;
      const w = targetW;
      const h = Math.round(targetW * ratio);
      const cnv = document.createElement("canvas");
      cnv.width = w;
      cnv.height = h;
      const ctx = cnv.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;

      const targets: number[] = [];
      const scatters: number[] = [];
      const colors: number[] = [];
      const seeds: number[] = [];
      const brights: number[] = [];

      const worldW = 3.4 * 1.2; // increased 1.2x to match the image frames perfectly
      const worldH = worldW * ratio;

      // sample every pixel + add jittered duplicates on bright areas for density
      for (let y = 0; y < h; y += 1) {
        for (let x = 0; x < w; x += 1) {
          const i = (y * w + x) * 4;
          const r = data[i] / 255;
          const g = data[i + 1] / 255;
          const b = data[i + 2] / 255;
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (lum < 0.03) continue;

          // how many particles for this pixel: 1 base + extras for bright pixels
          const extra = lum > 0.5 ? 2 : lum > 0.25 ? 1 : 0;
          const reps = 1 + extra;

          for (let k = 0; k < reps; k++) {
            const jx = (Math.random() - 0.5) * 0.9;
            const jy = (Math.random() - 0.5) * 0.9;
            const wx = ((x + jx) / w - 0.5) * worldW;
            const wy = -((y + jy) / h - 0.5) * worldH;
            const wz = (Math.random() - 0.5) * 0.02;

            targets.push(wx, wy, wz);

            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const rad = 2.0 + Math.random() * 1.8;
            scatters.push(
              Math.sin(phi) * Math.cos(theta) * rad,
              Math.sin(phi) * Math.sin(theta) * rad,
              Math.cos(phi) * rad - 0.5
            );

            colors.push(r, g, b);
            seeds.push(Math.random());
            brights.push(Math.min(1, lum * 1.25));
          }
        }
      }

      const count = seeds.length;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(targets), 3)
      );
      geo.setAttribute(
        "aTarget",
        new THREE.BufferAttribute(new Float32Array(targets), 3)
      );
      geo.setAttribute(
        "aScatter",
        new THREE.BufferAttribute(new Float32Array(scatters), 3)
      );
      geo.setAttribute(
        "aColor",
        new THREE.BufferAttribute(new Float32Array(colors), 3)
      );
      geo.setAttribute(
        "aSeed",
        new THREE.BufferAttribute(new Float32Array(seeds), 1)
      );
      geo.setAttribute(
        "aBrightness",
        new THREE.BufferAttribute(new Float32Array(brights), 1)
      );

      const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      points = new THREE.Points(geo, mat);
      scene.add(points);
      // eslint-disable-next-line no-console
      console.log(`[WineParticles] ${count.toLocaleString()} particles`);
    };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = wineImg;
    img.onload = () => {
      if (!disposed) buildParticles(img);
    };

    const mouseWorld = new THREE.Vector2(10, 10);
    const targetMouse = new THREE.Vector2(10, 10);
    const handleMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const vFov = (camera.fov * Math.PI) / 180;
      const hh = 2 * Math.tan(vFov / 2) * camera.position.z;
      const ww = hh * camera.aspect;
      targetMouse.set(nx * (ww / 2), ny * (hh / 2));
      uniforms.uMouseStrength.value = 1;
    };
    const handleLeave = () => {
      uniforms.uMouseStrength.value = 0;
      targetMouse.set(10, 10);
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    const onResize = () => {
      const W = mount.clientWidth;
      const H = mount.clientHeight;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    let lastTime = performance.now();
    let elapsedTime = 0;
    let raf = 0;
    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsedTime += dt;
      const t = elapsedTime;
      uniforms.uTime.value = t;

      const s = stateRef.current;
      const targetReveal = s.active ? 1 : 0;
      const targetProgress = s.active ? 1 : 0;
      // smooth easing
      s.reveal += (targetReveal - s.reveal) * Math.min(1, dt * 6);
      s.progress += (targetProgress - s.progress) * Math.min(1, dt * 1.6);
      uniforms.uReveal.value = s.reveal;
      uniforms.uProgress.value = s.progress;

      mouseWorld.lerp(targetMouse, 0.15);
      uniforms.uMouse.value.copy(mouseWorld);

      camera.position.x = Math.sin(t * 0.15) * 0.05;
      camera.position.y = Math.cos(t * 0.12) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      if (points) {
        points.geometry.dispose();
        (points.material as THREE.Material).dispose();
        scene.remove(points);
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
