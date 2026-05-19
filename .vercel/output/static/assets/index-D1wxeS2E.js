import{r as nt,j as w}from"./index-BfSh1zkC.js";var Ea="1.3.23";function Ao(i,e,t){return Math.max(i,Math.min(e,t))}function yl(i,e,t){return(1-t)*i+t*e}function Tl(i,e,t,n){return yl(i,e,1-Math.exp(-t*n))}function Al(i,e){return(i%e+e)%e}var wl=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(i){if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=i;const t=Ao(0,this.currentTime/this.duration,1);e=t>=1;const n=e?1:this.easing(t);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=Tl(this.value,this.to,this.lerp*60,i),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),this.onUpdate?.(this.value,e)}stop(){this.isRunning=!1}fromTo(i,e,{lerp:t,duration:n,easing:s,onStart:r,onUpdate:a}){this.from=this.value=i,this.to=e,this.lerp=t,this.duration=n,this.easing=s,this.currentTime=0,this.isRunning=!0,r?.(),this.onUpdate=a}};function Rl(i,e){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>{t=void 0,i.apply(this,n)},e)}}var Cl=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(i,e,{autoResize:t=!0,debounce:n=250}={}){this.wrapper=i,this.content=e,t&&(this.debouncedResize=Rl(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},wo=class{events={};emit(i,...e){const t=this.events[i]||[];for(let n=0,s=t.length;n<s;n++)t[n]?.(...e)}on(i,e){return this.events[i]?this.events[i].push(e):this.events[i]=[e],()=>{this.events[i]=this.events[i]?.filter(t=>e!==t)}}off(i,e){this.events[i]=this.events[i]?.filter(t=>e!==t)}destroy(){this.events={}}};const Pl=100/6,Mn={passive:!1};function ba(i,e){return i===1?Pl:i===2?e:1}var Nl=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new wo;constructor(i,e={wheelMultiplier:1,touchMultiplier:1}){this.element=i,this.options=e,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Mn),this.element.addEventListener("touchstart",this.onTouchStart,Mn),this.element.addEventListener("touchmove",this.onTouchMove,Mn),this.element.addEventListener("touchend",this.onTouchEnd,Mn)}on(i,e){return this.emitter.on(i,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Mn),this.element.removeEventListener("touchstart",this.onTouchStart,Mn),this.element.removeEventListener("touchmove",this.onTouchMove,Mn),this.element.removeEventListener("touchend",this.onTouchEnd,Mn)}onTouchStart=i=>{const{clientX:e,clientY:t}=i.targetTouches?i.targetTouches[0]:i;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:i})};onTouchMove=i=>{const{clientX:e,clientY:t}=i.targetTouches?i.targetTouches[0]:i,n=-(e-this.touchStart.x)*this.options.touchMultiplier,s=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:s},this.emitter.emit("scroll",{deltaX:n,deltaY:s,event:i})};onTouchEnd=i=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:i})};onWheel=i=>{let{deltaX:e,deltaY:t,deltaMode:n}=i;const s=ba(n,this.window.width),r=ba(n,this.window.height);e*=s,t*=r,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:i})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}};const ya=i=>Math.min(1,1.001-2**(-10*i));var Dl=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;isTouching;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new wl;emitter=new wo;dimensions;virtualScroll;constructor({wrapper:i=window,content:e=document.documentElement,eventsTarget:t=i,smoothWheel:n=!0,syncTouch:s=!1,syncTouchLerp:r=.075,touchInertiaExponent:a=1.7,duration:o,easing:l,lerp:c=.1,infinite:d=!1,orientation:p="vertical",gestureOrientation:u=p==="horizontal"?"both":"vertical",touchMultiplier:m=1,wheelMultiplier:_=1,autoResize:E=!0,prevent:f,virtualScroll:h,overscroll:M=!0,autoRaf:A=!1,anchors:y=!1,autoToggle:D=!1,allowNestedScroll:b=!1,__experimental__naiveDimensions:P=!1,naiveDimensions:v=P,stopInertiaOnNavigate:T=!1}={}){window.lenisVersion=Ea,window.lenis||(window.lenis={}),window.lenis.version=Ea,p==="horizontal"&&(window.lenis.horizontal=!0),s===!0&&(window.lenis.touch=!0),(!i||i===document.documentElement)&&(i=window),typeof o=="number"&&typeof l!="function"?l=ya:typeof l=="function"&&typeof o!="number"&&(o=1),this.options={wrapper:i,content:e,eventsTarget:t,smoothWheel:n,syncTouch:s,syncTouchLerp:r,touchInertiaExponent:a,duration:o,easing:l,lerp:c,infinite:d,gestureOrientation:u,orientation:p,touchMultiplier:m,wheelMultiplier:_,autoResize:E,prevent:f,virtualScroll:h,overscroll:M,autoRaf:A,anchors:y,autoToggle:D,allowNestedScroll:b,naiveDimensions:v,stopInertiaOnNavigate:T},this.dimensions=new Cl(i,e,{autoResize:E}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Nl(t,{touchMultiplier:m,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(i,e){return this.emitter.on(i,e)}off(i,e){return this.emitter.off(i,e)}onScrollEnd=i=>{i instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&i.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){const i=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[i]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=i=>{i.propertyName?.includes("overflow")&&i.target===this.rootElement&&this.checkOverflow()};setScroll(i){this.isHorizontal?this.options.wrapper.scrollTo({left:i,behavior:"instant"}):this.options.wrapper.scrollTo({top:i,behavior:"instant"})}onClick=i=>{const e=i.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),t=new URL(window.location.href);if(this.options.anchors){const n=e.find(s=>t.host===s.host&&t.pathname===s.pathname&&s.hash);if(n){const s=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,r=`#${n.hash.split("#")[1]}`;this.scrollTo(r,s);return}}if(this.options.stopInertiaOnNavigate&&e.some(n=>t.host===n.host&&t.pathname!==n.pathname)){this.reset();return}};onPointerDown=i=>{i.button===1&&this.reset()};onVirtualScroll=i=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(i)===!1)return;const{deltaX:e,deltaY:t,event:n}=i;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const s=n.type.includes("touch"),r=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const a=e===0&&t===0;if(this.options.syncTouch&&s&&n.type==="touchstart"&&a&&!this.isStopped&&!this.isLocked){this.reset();return}const o=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(a||o)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,d=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";if(l.find(_=>_ instanceof HTMLElement&&(typeof c=="function"&&c?.(_)||_.hasAttribute?.("data-lenis-prevent")||d==="vertical"&&_.hasAttribute?.("data-lenis-prevent-vertical")||d==="horizontal"&&_.hasAttribute?.("data-lenis-prevent-horizontal")||s&&_.hasAttribute?.("data-lenis-prevent-touch")||r&&_.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(_,{deltaX:e,deltaY:t}))))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&s||this.options.smoothWheel&&r)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let p=t;this.options.gestureOrientation==="both"?p=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(p=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const u=s&&this.options.syncTouch,m=s&&n.type==="touchend";m&&(p=Math.sign(p)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+p,{programmatic:!1,...u?{lerp:m?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const i=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-i,this.direction=Math.sign(this.animatedScroll-i),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=i=>{const e=i-(this.time||i);this.time=i,this.animate.advance(e*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(i,{offset:e=0,immediate:t=!1,lock:n=!1,programmatic:s=!0,lerp:r=s?this.options.lerp:void 0,duration:a=s?this.options.duration:void 0,easing:o=s?this.options.easing:void 0,onStart:l,onComplete:c,force:d=!1,userData:p}={}){if((this.isStopped||this.isLocked)&&!d)return;let u=i,m=e;if(typeof u=="string"&&["top","left","start","#"].includes(u))u=0;else if(typeof u=="string"&&["bottom","right","end"].includes(u))u=this.limit;else{let _=null;if(typeof u=="string"?(_=document.querySelector(u),_||(u==="#top"?u=0:console.warn("Lenis: Target not found",u))):u instanceof HTMLElement&&u?.nodeType&&(_=u),_){if(this.options.wrapper!==window){const y=this.rootElement.getBoundingClientRect();m-=this.isHorizontal?y.left:y.top}const E=_.getBoundingClientRect(),f=getComputedStyle(_),h=this.isHorizontal?Number.parseFloat(f.scrollMarginLeft):Number.parseFloat(f.scrollMarginTop),M=getComputedStyle(this.rootElement),A=this.isHorizontal?Number.parseFloat(M.scrollPaddingLeft):Number.parseFloat(M.scrollPaddingTop);u=(this.isHorizontal?E.left:E.top)+this.animatedScroll-(Number.isNaN(h)?0:h)-(Number.isNaN(A)?0:A)}}if(typeof u=="number"){if(u+=m,this.options.infinite){if(s){this.targetScroll=this.animatedScroll=this.scroll;const _=u-this.animatedScroll;_>this.limit/2?u-=this.limit:_<-this.limit/2&&(u+=this.limit)}}else u=Ao(0,u,this.limit);if(u===this.targetScroll){l?.(this),c?.(this);return}if(this.userData=p??{},t){this.animatedScroll=this.targetScroll=u,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}s||(this.targetScroll=u),typeof a=="number"&&typeof o!="function"?o=ya:typeof o=="function"&&typeof a!="number"&&(a=1),this.animate.fromTo(this.animatedScroll,u,{duration:a,easing:o,lerp:r,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(_,E)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=_-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=_,this.setScroll(this.scroll),s&&(this.targetScroll=_),E||this.emit(),E&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(i,{deltaX:e,deltaY:t}){const n=Date.now();i._lenis||(i._lenis={});const s=i._lenis;let r,a,o,l,c,d,p,u,m,_;if(n-(s.time??0)>2e3){s.time=Date.now();const b=window.getComputedStyle(i);if(s.computedStyle=b,r=["auto","overlay","scroll"].includes(b.overflowX),a=["auto","overlay","scroll"].includes(b.overflowY),c=["auto"].includes(b.overscrollBehaviorX),d=["auto"].includes(b.overscrollBehaviorY),s.hasOverflowX=r,s.hasOverflowY=a,!(r||a))return!1;p=i.scrollWidth,u=i.scrollHeight,m=i.clientWidth,_=i.clientHeight,o=p>m,l=u>_,s.isScrollableX=o,s.isScrollableY=l,s.scrollWidth=p,s.scrollHeight=u,s.clientWidth=m,s.clientHeight=_,s.hasOverscrollBehaviorX=c,s.hasOverscrollBehaviorY=d}else o=s.isScrollableX,l=s.isScrollableY,r=s.hasOverflowX,a=s.hasOverflowY,p=s.scrollWidth,u=s.scrollHeight,m=s.clientWidth,_=s.clientHeight,c=s.hasOverscrollBehaviorX,d=s.hasOverscrollBehaviorY;if(!(r&&o||a&&l))return!1;const E=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";let f,h,M,A,y,D;if(E==="horizontal")f=Math.round(i.scrollLeft),h=p-m,M=e,A=r,y=o,D=c;else if(E==="vertical")f=Math.round(i.scrollTop),h=u-_,M=t,A=a,y=l,D=d;else return!1;return!D&&(f>=h||f<=0)?!0:(M>0?f<h:f>0)&&A&&y}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const i=this.options.wrapper;return this.isHorizontal?i.scrollX??i.scrollLeft:i.scrollY??i.scrollTop}get scroll(){return this.options.infinite?Al(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(i){this._isScrolling!==i&&(this._isScrolling=i,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(i){this._isStopped!==i&&(this._isStopped=i,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(i){this._isLocked!==i&&(this._isLocked=i,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let i="lenis";return this.options.autoToggle&&(i+=" lenis-autoToggle"),this.isStopped&&(i+=" lenis-stopped"),this.isLocked&&(i+=" lenis-locked"),this.isScrolling&&(i+=" lenis-scrolling"),this.isScrolling==="smooth"&&(i+=" lenis-smooth"),i}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(i=>{this.rootElement.classList.add(i)})}cleanUpClassName(){for(const i of Array.from(this.rootElement.classList))(i==="lenis"||i.startsWith("lenis-"))&&this.rootElement.classList.remove(i)}};function Ll(){return nt.useEffect(()=>{const i=new Dl({duration:1.4,easing:n=>Math.min(1,1.001-Math.pow(2,-10*n)),smoothWheel:!0});let e=0;const t=n=>{i.raf(n),e=requestAnimationFrame(t)};return e=requestAnimationFrame(t),()=>{cancelAnimationFrame(e),i.destroy()}},[]),null}function Ul(){const i=nt.useRef(null),[e,t]=nt.useState(!1);return nt.useEffect(()=>{if(window.matchMedia("(pointer: coarse)").matches)return;t(!0);let n=window.innerWidth/2,s=window.innerHeight/2,r=n,a=s;const o=d=>{n=d.clientX,s=d.clientY};window.addEventListener("mousemove",o);let l=0;const c=()=>{r+=(n-r)*.18,a+=(s-a)*.18,i.current&&(i.current.style.transform=`translate3d(${r-12}px, ${a-12}px, 0)`),l=requestAnimationFrame(c)};return l=requestAnimationFrame(c),()=>{cancelAnimationFrame(l),window.removeEventListener("mousemove",o)}},[]),e?w.jsx("div",{ref:i,"aria-hidden":!0,className:"pointer-events-none fixed left-0 top-0 z-[200] size-6 rounded-full mix-blend-difference",style:{background:"var(--bone)"}}):null}function Il(){const[i,e]=nt.useState(!1),[t,n]=nt.useState(0);return nt.useEffect(()=>{const s=performance.now(),r=2200;let a=0;const o=l=>{const c=Math.min(1,(l-s)/r);n(Math.floor(c*100)),c<1?a=requestAnimationFrame(o):setTimeout(()=>e(!0),350)};return a=requestAnimationFrame(o),()=>cancelAnimationFrame(a)},[]),w.jsxs("div",{className:"fixed inset-0 z-[300] flex flex-col justify-between p-6 md:p-10 transition-transform duration-[1200ms]",style:{background:"var(--ink)",transform:i?"translateY(-100%)":"translateY(0)",transitionTimingFunction:"cubic-bezier(.8,0,.15,1)",pointerEvents:i?"none":"auto"},children:[w.jsxs("div",{className:"flex items-center justify-between font-mono text-[10px] tracking-cine uppercase text-bone/60",children:[w.jsx("span",{children:"NOCTURNE / 02:14 AM"}),w.jsx("span",{children:"EST. MMXXV"})]}),w.jsxs("div",{className:"flex items-end justify-between gap-6",children:[w.jsxs("h1",{className:"font-display leading-[0.82] text-bone",style:{fontSize:"clamp(4rem, 18vw, 18rem)"},children:["AFTER",w.jsx("br",{}),"DARK."]}),w.jsxs("div",{className:"hidden md:flex flex-col items-end gap-2",children:[w.jsx("div",{className:"font-mono text-xs tracking-cine text-bone/60",children:"LOADING ATMOSPHERE"}),w.jsx("div",{className:"font-display text-bone tabular-nums",style:{fontSize:"clamp(2rem, 5vw, 4rem)"},children:String(t).padStart(3,"0")})]})]}),w.jsx("div",{className:"relative h-px w-full bg-bone/15 overflow-hidden",children:w.jsx("div",{className:"absolute inset-y-0 left-0 bg-crimson",style:{width:`${t}%`,transition:"width 80ms linear"}})})]})}function Fl(){const[i,e]=nt.useState(!1),[t,n]=nt.useState(!1);nt.useEffect(()=>{const r=()=>e(window.scrollY>40);return window.addEventListener("scroll",r,{passive:!0}),()=>window.removeEventListener("scroll",r)},[]);const s=["Nights","Cocktails","Rooms","Membership","Contact"];return w.jsxs(w.Fragment,{children:[w.jsx("header",{className:"fixed inset-x-0 top-0 z-50 transition-all duration-700",style:{backgroundColor:i?"color-mix(in oklab, var(--ink) 65%, transparent)":"transparent",backdropFilter:i?"blur(14px)":"none",borderBottom:i?"1px solid color-mix(in oklab, var(--bone) 8%, transparent)":"1px solid transparent"},children:w.jsxs("div",{className:"mx-auto flex items-center justify-between px-5 md:px-10 h-16 md:h-20",children:[w.jsxs("a",{href:"#top",className:"font-display text-xl md:text-2xl tracking-[0.18em] text-bone",children:["NOCTURNE",w.jsx("span",{className:"text-crimson",children:"."})]}),w.jsx("nav",{className:"hidden md:flex items-center gap-10",children:s.map(r=>w.jsxs("a",{href:`#${r.toLowerCase()}`,className:"font-mono text-[11px] uppercase tracking-cine text-bone/70 hover:text-bone transition-colors relative group",children:[w.jsx("span",{children:r}),w.jsx("span",{className:"absolute -bottom-1 left-0 h-px w-0 bg-crimson transition-all duration-500 group-hover:w-full"})]},r))}),w.jsxs("div",{className:"flex items-center gap-4",children:[w.jsx("a",{href:"#reserve",className:"hidden md:inline-flex font-mono text-[11px] uppercase tracking-cine text-bone border border-bone/30 px-4 py-2 hover:bg-bone hover:text-ink transition-colors",children:"Reserve"}),w.jsxs("button",{onClick:()=>n(r=>!r),className:"md:hidden flex flex-col gap-1.5 p-2","aria-label":"Menu",children:[w.jsx("span",{className:`block h-px w-6 bg-bone transition-transform ${t?"translate-y-[6px] rotate-45":""}`}),w.jsx("span",{className:`block h-px w-6 bg-bone transition-opacity ${t?"opacity-0":""}`}),w.jsx("span",{className:`block h-px w-6 bg-bone transition-transform ${t?"-translate-y-[6px] -rotate-45":""}`})]})]})]})}),w.jsxs("div",{className:"fixed inset-0 z-40 md:hidden flex flex-col justify-between p-8 transition-all duration-700",style:{background:"var(--ink)",clipPath:t?"inset(0 0 0 0)":"inset(0 0 100% 0)"},children:[w.jsx("div",{className:"h-20"}),w.jsx("nav",{className:"flex flex-col gap-4",children:s.map((r,a)=>w.jsxs("a",{href:`#${r.toLowerCase()}`,onClick:()=>n(!1),className:"font-display text-bone leading-none",style:{fontSize:"clamp(3rem, 14vw, 6rem)",transitionDelay:`${a*60}ms`},children:[r,"."]},r))}),w.jsx("div",{className:"font-mono text-[10px] tracking-cine uppercase text-bone/50",children:"12 Velvet Lane · Open Thu — Sun · 22:00 — Late"})]})]})}const Ol="/assets/hero-O5NvL_cH.jpg";function Bl(){const i=nt.useRef(null);return nt.useEffect(()=>{const e=()=>{if(!i.current)return;const t=window.scrollY;i.current.style.transform=`translate3d(0, ${t*.3}px, 0) scale(${1+t*3e-4})`};return window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},[]),w.jsxs("section",{id:"top",className:"relative h-[100svh] w-full overflow-hidden vignette",children:[w.jsxs("div",{ref:i,className:"absolute inset-0 will-change-transform",children:[w.jsx("img",{src:Ol,alt:"Nocturne club interior, crimson lighting",width:1920,height:1280,className:"h-full w-full object-cover",style:{filter:"brightness(0.7) contrast(1.1) saturate(1.1)"}}),w.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(180deg, color-mix(in oklab, var(--ink) 40%, transparent) 0%, transparent 30%, color-mix(in oklab, var(--ink) 90%, transparent) 100%)"}})]}),w.jsxs("div",{className:"absolute top-24 md:top-28 left-5 md:left-10 right-5 md:right-10 z-10 flex items-start justify-between font-mono text-[10px] uppercase tracking-cine text-bone/70",children:[w.jsx("div",{className:"reveal-mask",children:w.jsx("span",{style:{animationDelay:".2s"},children:"N° 014 — Volume I"})}),w.jsx("div",{className:"reveal-mask hidden md:block",children:w.jsx("span",{style:{animationDelay:".3s"},children:"Members & Invited Guests"})})]}),w.jsxs("div",{className:"relative z-10 flex h-full flex-col justify-end px-5 md:px-10 pb-12 md:pb-16",children:[w.jsxs("h1",{className:"font-display text-bone leading-[0.82]",style:{fontSize:"clamp(3.8rem, 15vw, 17rem)"},children:[w.jsx("span",{className:"block reveal-mask",children:w.jsx("span",{style:{animationDelay:".4s"},children:"THE NIGHT"})}),w.jsx("span",{className:"block reveal-mask",children:w.jsxs("span",{style:{animationDelay:".55s"},children:["STARTS ",w.jsx("span",{className:"italic font-serif font-light text-crimson",children:"here"}),"."]})})]}),w.jsxs("div",{className:"mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8",children:[w.jsx("p",{className:"max-w-md text-sm md:text-base text-bone/70 leading-relaxed reveal-mask",children:w.jsx("span",{style:{animationDelay:".8s"},children:"An after-dark members club where sound becomes atmosphere and every hour is its own short film."})}),w.jsx("div",{className:"reveal-mask",children:w.jsxs("a",{href:"#reserve",style:{animationDelay:".9s"},className:"btn-cine",children:["Reserve a Table",w.jsx("span",{"aria-hidden":!0,children:"→"})]})})]})]}),w.jsxs("div",{className:"absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-cine text-bone/50",children:[w.jsx("span",{children:"Scroll"}),w.jsx("span",{className:"block h-10 w-px bg-bone/40 animate-pulse"})]})]})}function zl({items:i}){const e=[...i,...i];return w.jsx("div",{className:"relative overflow-hidden border-y border-bone/10 py-6 md:py-8 bg-ink",children:w.jsx("div",{className:"flex gap-12 whitespace-nowrap animate-marquee",children:e.map((t,n)=>w.jsxs("span",{className:"flex items-center gap-12 font-display text-bone/90",style:{fontSize:"clamp(2.5rem, 6vw, 5rem)"},children:[t,w.jsx("span",{className:"text-crimson",children:"●"})]},n))})})}const Gl="/assets/ezgif-frame-001-Ce6Klu4l.jpg",Hl=Object.freeze(Object.defineProperty({__proto__:null,default:Gl},Symbol.toStringTag,{value:"Module"})),Vl="/assets/ezgif-frame-002-DorSiTTp.jpg",kl=Object.freeze(Object.defineProperty({__proto__:null,default:Vl},Symbol.toStringTag,{value:"Module"})),Wl="/assets/ezgif-frame-003-DyVl1gVT.jpg",Xl=Object.freeze(Object.defineProperty({__proto__:null,default:Wl},Symbol.toStringTag,{value:"Module"})),jl="/assets/ezgif-frame-004-W9V6jkAc.jpg",ql=Object.freeze(Object.defineProperty({__proto__:null,default:jl},Symbol.toStringTag,{value:"Module"})),Yl="/assets/ezgif-frame-005-BgGvI_8F.jpg",Kl=Object.freeze(Object.defineProperty({__proto__:null,default:Yl},Symbol.toStringTag,{value:"Module"})),Zl="/assets/ezgif-frame-006-DGsAvgkm.jpg",$l=Object.freeze(Object.defineProperty({__proto__:null,default:Zl},Symbol.toStringTag,{value:"Module"})),Jl="/assets/ezgif-frame-007-CJtPYhi6.jpg",Ql=Object.freeze(Object.defineProperty({__proto__:null,default:Jl},Symbol.toStringTag,{value:"Module"})),ec="/assets/ezgif-frame-008-u45B8w98.jpg",tc=Object.freeze(Object.defineProperty({__proto__:null,default:ec},Symbol.toStringTag,{value:"Module"})),nc="/assets/ezgif-frame-009-8lAJ5aN9.jpg",ic=Object.freeze(Object.defineProperty({__proto__:null,default:nc},Symbol.toStringTag,{value:"Module"})),sc="/assets/ezgif-frame-010-Bwv9X-dZ.jpg",rc=Object.freeze(Object.defineProperty({__proto__:null,default:sc},Symbol.toStringTag,{value:"Module"})),ac="/assets/ezgif-frame-011-CBiAEhiM.jpg",oc=Object.freeze(Object.defineProperty({__proto__:null,default:ac},Symbol.toStringTag,{value:"Module"})),lc="/assets/ezgif-frame-012-BLJTcE9P.jpg",cc=Object.freeze(Object.defineProperty({__proto__:null,default:lc},Symbol.toStringTag,{value:"Module"})),uc="/assets/ezgif-frame-013-C_zyXfZG.jpg",hc=Object.freeze(Object.defineProperty({__proto__:null,default:uc},Symbol.toStringTag,{value:"Module"})),dc="/assets/ezgif-frame-014-DDyQYjyc.jpg",fc=Object.freeze(Object.defineProperty({__proto__:null,default:dc},Symbol.toStringTag,{value:"Module"})),pc="/assets/ezgif-frame-015-DhmF0CHw.jpg",mc=Object.freeze(Object.defineProperty({__proto__:null,default:pc},Symbol.toStringTag,{value:"Module"})),gc="/assets/ezgif-frame-016-DX8fw_m4.jpg",_c=Object.freeze(Object.defineProperty({__proto__:null,default:gc},Symbol.toStringTag,{value:"Module"})),xc="/assets/ezgif-frame-017-CC1j0o1o.jpg",vc=Object.freeze(Object.defineProperty({__proto__:null,default:xc},Symbol.toStringTag,{value:"Module"})),Sc="/assets/ezgif-frame-018-Ll0YVw-r.jpg",Mc=Object.freeze(Object.defineProperty({__proto__:null,default:Sc},Symbol.toStringTag,{value:"Module"})),Ec="/assets/ezgif-frame-019-1VbRmxSH.jpg",bc=Object.freeze(Object.defineProperty({__proto__:null,default:Ec},Symbol.toStringTag,{value:"Module"})),yc="/assets/ezgif-frame-020-BaEhOR-D.jpg",Tc=Object.freeze(Object.defineProperty({__proto__:null,default:yc},Symbol.toStringTag,{value:"Module"})),Ac="/assets/ezgif-frame-021-GsJUJFbH.jpg",wc=Object.freeze(Object.defineProperty({__proto__:null,default:Ac},Symbol.toStringTag,{value:"Module"})),Rc="/assets/ezgif-frame-022-D7mGM6TG.jpg",Cc=Object.freeze(Object.defineProperty({__proto__:null,default:Rc},Symbol.toStringTag,{value:"Module"})),Pc="/assets/ezgif-frame-023-C6uyK40O.jpg",Nc=Object.freeze(Object.defineProperty({__proto__:null,default:Pc},Symbol.toStringTag,{value:"Module"})),Dc="/assets/ezgif-frame-024-BIOiYjhA.jpg",Lc=Object.freeze(Object.defineProperty({__proto__:null,default:Dc},Symbol.toStringTag,{value:"Module"})),Uc="/assets/ezgif-frame-025-FraoVdx8.jpg",Ic=Object.freeze(Object.defineProperty({__proto__:null,default:Uc},Symbol.toStringTag,{value:"Module"})),Fc="/assets/ezgif-frame-026-DCfZmhhL.jpg",Oc=Object.freeze(Object.defineProperty({__proto__:null,default:Fc},Symbol.toStringTag,{value:"Module"})),Bc="/assets/ezgif-frame-027-CryU5Xgq.jpg",zc=Object.freeze(Object.defineProperty({__proto__:null,default:Bc},Symbol.toStringTag,{value:"Module"})),Gc="/assets/ezgif-frame-028-Bu6NoMcA.jpg",Hc=Object.freeze(Object.defineProperty({__proto__:null,default:Gc},Symbol.toStringTag,{value:"Module"})),Vc="/assets/ezgif-frame-029-BO_u96pn.jpg",kc=Object.freeze(Object.defineProperty({__proto__:null,default:Vc},Symbol.toStringTag,{value:"Module"})),Wc="/assets/ezgif-frame-030-CcZ2B725.jpg",Xc=Object.freeze(Object.defineProperty({__proto__:null,default:Wc},Symbol.toStringTag,{value:"Module"})),jc="/assets/ezgif-frame-031-DoEujU8u.jpg",qc=Object.freeze(Object.defineProperty({__proto__:null,default:jc},Symbol.toStringTag,{value:"Module"})),Yc="/assets/ezgif-frame-032-D_nl4-1k.jpg",Kc=Object.freeze(Object.defineProperty({__proto__:null,default:Yc},Symbol.toStringTag,{value:"Module"})),Zc="/assets/ezgif-frame-033-CLSsgPxN.jpg",$c=Object.freeze(Object.defineProperty({__proto__:null,default:Zc},Symbol.toStringTag,{value:"Module"})),Jc="/assets/ezgif-frame-034-CisvjjX2.jpg",Qc=Object.freeze(Object.defineProperty({__proto__:null,default:Jc},Symbol.toStringTag,{value:"Module"})),eu="/assets/ezgif-frame-035-DCqy0r-X.jpg",tu=Object.freeze(Object.defineProperty({__proto__:null,default:eu},Symbol.toStringTag,{value:"Module"})),nu="/assets/ezgif-frame-036-BzUn2c9U.jpg",iu=Object.freeze(Object.defineProperty({__proto__:null,default:nu},Symbol.toStringTag,{value:"Module"})),su="/assets/ezgif-frame-037-loAsD2L8.jpg",ru=Object.freeze(Object.defineProperty({__proto__:null,default:su},Symbol.toStringTag,{value:"Module"})),Ro="/assets/ezgif-frame-038-mlM38n31.jpg",au=Object.freeze(Object.defineProperty({__proto__:null,default:Ro},Symbol.toStringTag,{value:"Module"}));const Jr="184",ou=0,Ta=1,lu=2,as=1,cu=2,yi=3,Pn=0,Pt=1,un=2,dn=0,li=1,rr=2,Aa=3,wa=4,uu=5,On=100,hu=101,du=102,fu=103,pu=104,mu=200,gu=201,_u=202,xu=203,ar=204,or=205,vu=206,Su=207,Mu=208,Eu=209,bu=210,yu=211,Tu=212,Au=213,wu=214,lr=0,cr=1,ur=2,ui=3,hr=4,dr=5,fr=6,pr=7,Co=0,Ru=1,Cu=2,en=0,Po=1,No=2,Do=3,Lo=4,Uo=5,Io=6,Fo=7,Oo=300,Hn=301,hi=302,As=303,ws=304,vs=306,mr=1e3,hn=1001,gr=1002,St=1003,Pu=1004,Ui=1005,At=1006,Rs=1007,zn=1008,zt=1009,Bo=1010,zo=1011,Ai=1012,Qr=1013,nn=1014,Jt=1015,mn=1016,ea=1017,ta=1018,wi=1020,Go=35902,Ho=35899,Vo=1021,ko=1022,Wt=1023,gn=1026,Gn=1027,Wo=1028,na=1029,Vn=1030,ia=1031,sa=1033,os=33776,ls=33777,cs=33778,us=33779,_r=35840,xr=35841,vr=35842,Sr=35843,Mr=36196,Er=37492,br=37496,yr=37488,Tr=37489,ds=37490,Ar=37491,wr=37808,Rr=37809,Cr=37810,Pr=37811,Nr=37812,Dr=37813,Lr=37814,Ur=37815,Ir=37816,Fr=37817,Or=37818,Br=37819,zr=37820,Gr=37821,Hr=36492,Vr=36494,kr=36495,Wr=36283,Xr=36284,fs=36285,jr=36286,Nu=3200,Ra=0,Du=1,Rn="",Ot="srgb",ps="srgb-linear",ms="linear",Ke="srgb",qn=7680,Ca=519,Lu=512,Uu=513,Iu=514,ra=515,Fu=516,Ou=517,aa=518,Bu=519,Pa=35044,Na="300 es",Qt=2e3,gs=2001;function zu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function _s(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gu(){const i=_s("canvas");return i.style.display="block",i}const Da={};function La(...i){const e="THREE."+i.shift();console.log(e,...i)}function Xo(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Re(...i){i=Xo(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Xe(...i){i=Xo(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function qr(...i){const e=i.join(" ");e in Da||(Da[e]=!0,Re(...i))}function Hu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Vu={[lr]:cr,[ur]:fr,[hr]:pr,[ui]:dr,[cr]:lr,[fr]:ur,[pr]:hr,[dr]:ui};class Wn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Cs=Math.PI/180,Yr=180/Math.PI;function Ri(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]).toLowerCase()}function Ve(i,e,t){return Math.max(e,Math.min(t,i))}function ku(i,e){return(i%e+e)%e}function Ps(i,e,t){return(1-t)*i+t*e}function gi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ct(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ca=class ca{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ca.prototype.isVector2=!0;let qe=ca;class pi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],p=n[s+3],u=r[a+0],m=r[a+1],_=r[a+2],E=r[a+3];if(p!==E||l!==u||c!==m||d!==_){let f=l*u+c*m+d*_+p*E;f<0&&(u=-u,m=-m,_=-_,E=-E,f=-f);let h=1-o;if(f<.9995){const M=Math.acos(f),A=Math.sin(M);h=Math.sin(h*M)/A,o=Math.sin(o*M)/A,l=l*h+u*o,c=c*h+m*o,d=d*h+_*o,p=p*h+E*o}else{l=l*h+u*o,c=c*h+m*o,d=d*h+_*o,p=p*h+E*o;const M=1/Math.sqrt(l*l+c*c+d*d+p*p);l*=M,c*=M,d*=M,p*=M}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],p=r[a],u=r[a+1],m=r[a+2],_=r[a+3];return e[t]=o*_+d*p+l*m-c*u,e[t+1]=l*_+d*u+c*p-o*m,e[t+2]=c*_+d*m+o*u-l*p,e[t+3]=d*_-o*p-l*u-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),p=o(r/2),u=l(n/2),m=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=u*d*p+c*m*_,this._y=c*m*p-u*d*_,this._z=c*d*_+u*m*p,this._w=c*d*p-u*m*_;break;case"YXZ":this._x=u*d*p+c*m*_,this._y=c*m*p-u*d*_,this._z=c*d*_-u*m*p,this._w=c*d*p+u*m*_;break;case"ZXY":this._x=u*d*p-c*m*_,this._y=c*m*p+u*d*_,this._z=c*d*_+u*m*p,this._w=c*d*p-u*m*_;break;case"ZYX":this._x=u*d*p-c*m*_,this._y=c*m*p+u*d*_,this._z=c*d*_-u*m*p,this._w=c*d*p+u*m*_;break;case"YZX":this._x=u*d*p+c*m*_,this._y=c*m*p+u*d*_,this._z=c*d*_-u*m*p,this._w=c*d*p-u*m*_;break;case"XZY":this._x=u*d*p-c*m*_,this._y=c*m*p-u*d*_,this._z=c*d*_+u*m*p,this._w=c*d*p+u*m*_;break;default:Re("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],p=t[10],u=n+o+p;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(d-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>p){const m=2*Math.sqrt(1+n-o-p);this._w=(d-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>p){const m=2*Math.sqrt(1+o-n-p);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+p-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ua=class ua{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ua.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ua.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),p=2*(r*n-a*t);return this.x=t+l*c+a*p-o*d,this.y=n+l*d+o*c-r*p,this.z=s+l*p+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ns.copy(this).projectOnVector(e),this.sub(Ns)}reflect(e){return this.sub(Ns.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ua.prototype.isVector3=!0;let G=ua;const Ns=new G,Ua=new pi,ha=class ha{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],p=n[7],u=n[2],m=n[5],_=n[8],E=s[0],f=s[3],h=s[6],M=s[1],A=s[4],y=s[7],D=s[2],b=s[5],P=s[8];return r[0]=a*E+o*M+l*D,r[3]=a*f+o*A+l*b,r[6]=a*h+o*y+l*P,r[1]=c*E+d*M+p*D,r[4]=c*f+d*A+p*b,r[7]=c*h+d*y+p*P,r[2]=u*E+m*M+_*D,r[5]=u*f+m*A+_*b,r[8]=u*h+m*y+_*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],p=d*a-o*c,u=o*l-d*r,m=c*r-a*l,_=t*p+n*u+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/_;return e[0]=p*E,e[1]=(s*c-d*n)*E,e[2]=(o*n-s*a)*E,e[3]=u*E,e[4]=(d*t-s*l)*E,e[5]=(s*r-o*t)*E,e[6]=m*E,e[7]=(n*l-c*t)*E,e[8]=(a*t-n*r)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ds.makeScale(e,t)),this}rotate(e){return this.premultiply(Ds.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ds.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ha.prototype.isMatrix3=!0;let Ne=ha;const Ds=new Ne,Ia=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fa=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wu(){const i={enabled:!0,workingColorSpace:ps,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ke&&(s.r=fn(s.r),s.g=fn(s.g),s.b=fn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ke&&(s.r=ci(s.r),s.g=ci(s.g),s.b=ci(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Rn?ms:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return qr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return qr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ps]:{primaries:e,whitePoint:n,transfer:ms,toXYZ:Ia,fromXYZ:Fa,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ot},outputColorSpaceConfig:{drawingBufferColorSpace:Ot}},[Ot]:{primaries:e,whitePoint:n,transfer:Ke,toXYZ:Ia,fromXYZ:Fa,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ot}}}),i}const He=Wu();function fn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ci(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Yn;class Xu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Yn===void 0&&(Yn=_s("canvas")),Yn.width=e.width,Yn.height=e.height;const s=Yn.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Yn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=_s("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=fn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(fn(t[n]/255)*255):t[n]=fn(t[n]);return{data:t,width:e.width,height:e.height}}else return Re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ju=0;class oa{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=Ri(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ls(s[a].image)):r.push(Ls(s[a]))}else r=Ls(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ls(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Xu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Re("Texture: Unable to serialize Texture."),{})}let qu=0;const Us=new G;class Rt extends Wn{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,n=hn,s=hn,r=At,a=zn,o=Wt,l=zt,c=Rt.DEFAULT_ANISOTROPY,d=Rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qu++}),this.uuid=Ri(),this.name="",this.source=new oa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Us).x}get height(){return this.source.getSize(Us).y}get depth(){return this.source.getSize(Us).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Re(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Oo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mr:e.x=e.x-Math.floor(e.x);break;case hn:e.x=e.x<0?0:1;break;case gr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mr:e.y=e.y-Math.floor(e.y);break;case hn:e.y=e.y<0?0:1;break;case gr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=Oo;Rt.DEFAULT_ANISOTROPY=1;const da=class da{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],p=l[8],u=l[1],m=l[5],_=l[9],E=l[2],f=l[6],h=l[10];if(Math.abs(d-u)<.01&&Math.abs(p-E)<.01&&Math.abs(_-f)<.01){if(Math.abs(d+u)<.1&&Math.abs(p+E)<.1&&Math.abs(_+f)<.1&&Math.abs(c+m+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(c+1)/2,y=(m+1)/2,D=(h+1)/2,b=(d+u)/4,P=(p+E)/4,v=(_+f)/4;return A>y&&A>D?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=b/n,r=P/n):y>D?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=b/s,r=v/s):D<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),n=P/r,s=v/r),this.set(n,s,r,t),this}let M=Math.sqrt((f-_)*(f-_)+(p-E)*(p-E)+(u-d)*(u-d));return Math.abs(M)<.001&&(M=1),this.x=(f-_)/M,this.y=(p-E)/M,this.z=(u-d)/M,this.w=Math.acos((c+m+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};da.prototype.isVector4=!0;let pt=da;class Yu extends Wn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:At,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new Rt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:At,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new oa(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class tn extends Yu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class jo extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=St,this.minFilter=St,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ku extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=St,this.minFilter=St,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xs=class xs{constructor(e,t,n,s,r,a,o,l,c,d,p,u,m,_,E,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,p,u,m,_,E,f)}set(e,t,n,s,r,a,o,l,c,d,p,u,m,_,E,f){const h=this.elements;return h[0]=e,h[4]=t,h[8]=n,h[12]=s,h[1]=r,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=d,h[10]=p,h[14]=u,h[3]=m,h[7]=_,h[11]=E,h[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xs().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Kn.setFromMatrixColumn(e,0).length(),r=1/Kn.setFromMatrixColumn(e,1).length(),a=1/Kn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){const u=a*d,m=a*p,_=o*d,E=o*p;t[0]=l*d,t[4]=-l*p,t[8]=c,t[1]=m+_*c,t[5]=u-E*c,t[9]=-o*l,t[2]=E-u*c,t[6]=_+m*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*d,m=l*p,_=c*d,E=c*p;t[0]=u+E*o,t[4]=_*o-m,t[8]=a*c,t[1]=a*p,t[5]=a*d,t[9]=-o,t[2]=m*o-_,t[6]=E+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*d,m=l*p,_=c*d,E=c*p;t[0]=u-E*o,t[4]=-a*p,t[8]=_+m*o,t[1]=m+_*o,t[5]=a*d,t[9]=E-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*d,m=a*p,_=o*d,E=o*p;t[0]=l*d,t[4]=_*c-m,t[8]=u*c+E,t[1]=l*p,t[5]=E*c+u,t[9]=m*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,m=a*c,_=o*l,E=o*c;t[0]=l*d,t[4]=E-u*p,t[8]=_*p+m,t[1]=p,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=m*p+_,t[10]=u-E*p}else if(e.order==="XZY"){const u=a*l,m=a*c,_=o*l,E=o*c;t[0]=l*d,t[4]=-p,t[8]=c*d,t[1]=u*p+E,t[5]=a*d,t[9]=m*p-_,t[2]=_*p-m,t[6]=o*d,t[10]=E*p+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zu,e,$u)}lookAt(e,t,n){const s=this.elements;return Lt.subVectors(e,t),Lt.lengthSq()===0&&(Lt.z=1),Lt.normalize(),En.crossVectors(n,Lt),En.lengthSq()===0&&(Math.abs(n.z)===1?Lt.x+=1e-4:Lt.z+=1e-4,Lt.normalize(),En.crossVectors(n,Lt)),En.normalize(),Ii.crossVectors(Lt,En),s[0]=En.x,s[4]=Ii.x,s[8]=Lt.x,s[1]=En.y,s[5]=Ii.y,s[9]=Lt.y,s[2]=En.z,s[6]=Ii.z,s[10]=Lt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],p=n[5],u=n[9],m=n[13],_=n[2],E=n[6],f=n[10],h=n[14],M=n[3],A=n[7],y=n[11],D=n[15],b=s[0],P=s[4],v=s[8],T=s[12],U=s[1],R=s[5],z=s[9],X=s[13],j=s[2],I=s[6],H=s[10],k=s[14],J=s[3],ee=s[7],le=s[11],Se=s[15];return r[0]=a*b+o*U+l*j+c*J,r[4]=a*P+o*R+l*I+c*ee,r[8]=a*v+o*z+l*H+c*le,r[12]=a*T+o*X+l*k+c*Se,r[1]=d*b+p*U+u*j+m*J,r[5]=d*P+p*R+u*I+m*ee,r[9]=d*v+p*z+u*H+m*le,r[13]=d*T+p*X+u*k+m*Se,r[2]=_*b+E*U+f*j+h*J,r[6]=_*P+E*R+f*I+h*ee,r[10]=_*v+E*z+f*H+h*le,r[14]=_*T+E*X+f*k+h*Se,r[3]=M*b+A*U+y*j+D*J,r[7]=M*P+A*R+y*I+D*ee,r[11]=M*v+A*z+y*H+D*le,r[15]=M*T+A*X+y*k+D*Se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],p=e[6],u=e[10],m=e[14],_=e[3],E=e[7],f=e[11],h=e[15],M=l*m-c*u,A=o*m-c*p,y=o*u-l*p,D=a*m-c*d,b=a*u-l*d,P=a*p-o*d;return t*(E*M-f*A+h*y)-n*(_*M-f*D+h*b)+s*(_*A-E*D+h*P)-r*(_*y-E*b+f*P)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],p=e[9],u=e[10],m=e[11],_=e[12],E=e[13],f=e[14],h=e[15],M=t*o-n*a,A=t*l-s*a,y=t*c-r*a,D=n*l-s*o,b=n*c-r*o,P=s*c-r*l,v=d*E-p*_,T=d*f-u*_,U=d*h-m*_,R=p*f-u*E,z=p*h-m*E,X=u*h-m*f,j=M*X-A*z+y*R+D*U-b*T+P*v;if(j===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/j;return e[0]=(o*X-l*z+c*R)*I,e[1]=(s*z-n*X-r*R)*I,e[2]=(E*P-f*b+h*D)*I,e[3]=(u*b-p*P-m*D)*I,e[4]=(l*U-a*X-c*T)*I,e[5]=(t*X-s*U+r*T)*I,e[6]=(f*y-_*P-h*A)*I,e[7]=(d*P-u*y+m*A)*I,e[8]=(a*z-o*U+c*v)*I,e[9]=(n*U-t*z-r*v)*I,e[10]=(_*b-E*y+h*M)*I,e[11]=(p*y-d*b-m*M)*I,e[12]=(o*T-a*R-l*v)*I,e[13]=(t*R-n*T+s*v)*I,e[14]=(E*A-_*D-f*M)*I,e[15]=(d*D-p*A+u*M)*I,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,p=o+o,u=r*c,m=r*d,_=r*p,E=a*d,f=a*p,h=o*p,M=l*c,A=l*d,y=l*p,D=n.x,b=n.y,P=n.z;return s[0]=(1-(E+h))*D,s[1]=(m+y)*D,s[2]=(_-A)*D,s[3]=0,s[4]=(m-y)*b,s[5]=(1-(u+h))*b,s[6]=(f+M)*b,s[7]=0,s[8]=(_+A)*P,s[9]=(f-M)*P,s[10]=(1-(u+E))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinant();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Kn.set(s[0],s[1],s[2]).length();const o=Kn.set(s[4],s[5],s[6]).length(),l=Kn.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Gt.copy(this);const c=1/a,d=1/o,p=1/l;return Gt.elements[0]*=c,Gt.elements[1]*=c,Gt.elements[2]*=c,Gt.elements[4]*=d,Gt.elements[5]*=d,Gt.elements[6]*=d,Gt.elements[8]*=p,Gt.elements[9]*=p,Gt.elements[10]*=p,t.setFromRotationMatrix(Gt),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Qt,l=!1){const c=this.elements,d=2*r/(t-e),p=2*r/(n-s),u=(t+e)/(t-e),m=(n+s)/(n-s);let _,E;if(l)_=r/(a-r),E=a*r/(a-r);else if(o===Qt)_=-(a+r)/(a-r),E=-2*a*r/(a-r);else if(o===gs)_=-a/(a-r),E=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=E,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Qt,l=!1){const c=this.elements,d=2/(t-e),p=2/(n-s),u=-(t+e)/(t-e),m=-(n+s)/(n-s);let _,E;if(l)_=1/(a-r),E=a/(a-r);else if(o===Qt)_=-2/(a-r),E=-(a+r)/(a-r);else if(o===gs)_=-1/(a-r),E=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=_,c[14]=E,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};xs.prototype.isMatrix4=!0;let gt=xs;const Kn=new G,Gt=new gt,Zu=new G(0,0,0),$u=new G(1,1,1),En=new G,Ii=new G,Lt=new G,Oa=new gt,Ba=new pi;class kn{constructor(e=0,t=0,n=0,s=kn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],p=s[2],u=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ve(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Oa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Oa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ba.setFromEuler(this),this.setFromQuaternion(Ba,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kn.DEFAULT_ORDER="XYZ";class qo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ju=0;const za=new G,Zn=new pi,rn=new gt,Fi=new G,_i=new G,Qu=new G,eh=new pi,Ga=new G(1,0,0),Ha=new G(0,1,0),Va=new G(0,0,1),ka={type:"added"},th={type:"removed"},$n={type:"childadded",child:null},Is={type:"childremoved",child:null};class Nt extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=Ri(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nt.DEFAULT_UP.clone();const e=new G,t=new kn,n=new pi,s=new G(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new gt},normalMatrix:{value:new Ne}}),this.matrix=new gt,this.matrixWorld=new gt,this.matrixAutoUpdate=Nt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zn.setFromAxisAngle(e,t),this.quaternion.multiply(Zn),this}rotateOnWorldAxis(e,t){return Zn.setFromAxisAngle(e,t),this.quaternion.premultiply(Zn),this}rotateX(e){return this.rotateOnAxis(Ga,e)}rotateY(e){return this.rotateOnAxis(Ha,e)}rotateZ(e){return this.rotateOnAxis(Va,e)}translateOnAxis(e,t){return za.copy(e).applyQuaternion(this.quaternion),this.position.add(za.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ga,e)}translateY(e){return this.translateOnAxis(Ha,e)}translateZ(e){return this.translateOnAxis(Va,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(rn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Fi.copy(e):Fi.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),_i.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rn.lookAt(_i,Fi,this.up):rn.lookAt(Fi,_i,this.up),this.quaternion.setFromRotationMatrix(rn),s&&(rn.extractRotation(s.matrixWorld),Zn.setFromRotationMatrix(rn),this.quaternion.premultiply(Zn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ka),$n.child=e,this.dispatchEvent($n),$n.child=null):Xe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(th),Is.child=e,this.dispatchEvent(Is),Is.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(rn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ka),$n.child=e,this.dispatchEvent($n),$n.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_i,e,Qu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_i,eh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const p=l[c];r(e.shapes,p)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),p=a(e.shapes),u=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),p.length>0&&(n.shapes=p),u.length>0&&(n.skeletons=u),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Nt.DEFAULT_UP=new G(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Oi extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nh={type:"move"};class Fs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const E of e.hand.values()){const f=t.getJointPose(E,n),h=this._getHandJoint(c,E);f!==null&&(h.matrix.fromArray(f.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=f.radius),h.visible=f!==null}const d=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=d.position.distanceTo(p.position),m=.02,_=.005;c.inputState.pinching&&u>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nh)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Oi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Yo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bn={h:0,s:0,l:0},Bi={h:0,s:0,l:0};function Os(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,He.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=He.workingColorSpace){return this.r=e,this.g=t,this.b=n,He.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=He.workingColorSpace){if(e=ku(e,1),t=Ve(t,0,1),n=Ve(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Os(a,r,e+1/3),this.g=Os(a,r,e),this.b=Os(a,r,e-1/3)}return He.colorSpaceToWorking(this,s),this}setStyle(e,t=Ot){function n(r){r!==void 0&&parseFloat(r)<1&&Re("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Re("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){const n=Yo[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fn(e.r),this.g=fn(e.g),this.b=fn(e.b),this}copyLinearToSRGB(e){return this.r=ci(e.r),this.g=ci(e.g),this.b=ci(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return He.workingToColorSpace(yt.copy(this),e),Math.round(Ve(yt.r*255,0,255))*65536+Math.round(Ve(yt.g*255,0,255))*256+Math.round(Ve(yt.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=He.workingColorSpace){He.workingToColorSpace(yt.copy(this),t);const n=yt.r,s=yt.g,r=yt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const p=a-o;switch(c=d<=.5?p/(a+o):p/(2-a-o),a){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=He.workingColorSpace){return He.workingToColorSpace(yt.copy(this),t),e.r=yt.r,e.g=yt.g,e.b=yt.b,e}getStyle(e=Ot){He.workingToColorSpace(yt.copy(this),e);const t=yt.r,n=yt.g,s=yt.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(bn),this.setHSL(bn.h+e,bn.s+t,bn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(bn),e.getHSL(Bi);const n=Ps(bn.h,Bi.h,t),s=Ps(bn.s,Bi.s,t),r=Ps(bn.l,Bi.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yt=new Ze;Ze.NAMES=Yo;class ih extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ht=new G,an=new G,Bs=new G,on=new G,Jn=new G,Qn=new G,Wa=new G,zs=new G,Gs=new G,Hs=new G,Vs=new pt,ks=new pt,Ws=new pt;class kt{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Ht.subVectors(e,t),s.cross(Ht);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Ht.subVectors(s,t),an.subVectors(n,t),Bs.subVectors(e,t);const a=Ht.dot(Ht),o=Ht.dot(an),l=Ht.dot(Bs),c=an.dot(an),d=an.dot(Bs),p=a*c-o*o;if(p===0)return r.set(0,0,0),null;const u=1/p,m=(c*l-o*d)*u,_=(a*d-o*l)*u;return r.set(1-m-_,_,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,on)===null?!1:on.x>=0&&on.y>=0&&on.x+on.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,on)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,on.x),l.addScaledVector(a,on.y),l.addScaledVector(o,on.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Vs.setScalar(0),ks.setScalar(0),Ws.setScalar(0),Vs.fromBufferAttribute(e,t),ks.fromBufferAttribute(e,n),Ws.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Vs,r.x),a.addScaledVector(ks,r.y),a.addScaledVector(Ws,r.z),a}static isFrontFacing(e,t,n,s){return Ht.subVectors(n,t),an.subVectors(e,t),Ht.cross(an).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ht.subVectors(this.c,this.b),an.subVectors(this.a,this.b),Ht.cross(an).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return kt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return kt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Jn.subVectors(s,n),Qn.subVectors(r,n),zs.subVectors(e,n);const l=Jn.dot(zs),c=Qn.dot(zs);if(l<=0&&c<=0)return t.copy(n);Gs.subVectors(e,s);const d=Jn.dot(Gs),p=Qn.dot(Gs);if(d>=0&&p<=d)return t.copy(s);const u=l*p-d*c;if(u<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(Jn,a);Hs.subVectors(e,r);const m=Jn.dot(Hs),_=Qn.dot(Hs);if(_>=0&&m<=_)return t.copy(r);const E=m*c-l*_;if(E<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(Qn,o);const f=d*_-m*p;if(f<=0&&p-d>=0&&m-_>=0)return Wa.subVectors(r,s),o=(p-d)/(p-d+(m-_)),t.copy(s).addScaledVector(Wa,o);const h=1/(f+E+u);return a=E*h,o=u*h,t.copy(n).addScaledVector(Jn,a).addScaledVector(Qn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ci{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Vt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Vt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Vt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Vt):Vt.fromBufferAttribute(r,a),Vt.applyMatrix4(e.matrixWorld),this.expandByPoint(Vt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),zi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zi.copy(n.boundingBox)),zi.applyMatrix4(e.matrixWorld),this.union(zi)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vt),Vt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xi),Gi.subVectors(this.max,xi),ei.subVectors(e.a,xi),ti.subVectors(e.b,xi),ni.subVectors(e.c,xi),yn.subVectors(ti,ei),Tn.subVectors(ni,ti),Dn.subVectors(ei,ni);let t=[0,-yn.z,yn.y,0,-Tn.z,Tn.y,0,-Dn.z,Dn.y,yn.z,0,-yn.x,Tn.z,0,-Tn.x,Dn.z,0,-Dn.x,-yn.y,yn.x,0,-Tn.y,Tn.x,0,-Dn.y,Dn.x,0];return!Xs(t,ei,ti,ni,Gi)||(t=[1,0,0,0,1,0,0,0,1],!Xs(t,ei,ti,ni,Gi))?!1:(Hi.crossVectors(yn,Tn),t=[Hi.x,Hi.y,Hi.z],Xs(t,ei,ti,ni,Gi))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ln=[new G,new G,new G,new G,new G,new G,new G,new G],Vt=new G,zi=new Ci,ei=new G,ti=new G,ni=new G,yn=new G,Tn=new G,Dn=new G,xi=new G,Gi=new G,Hi=new G,Ln=new G;function Xs(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ln.fromArray(i,r);const o=s.x*Math.abs(Ln.x)+s.y*Math.abs(Ln.y)+s.z*Math.abs(Ln.z),l=e.dot(Ln),c=t.dot(Ln),d=n.dot(Ln);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const mt=new G,Vi=new qe;let sh=0;class Tt extends Wn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pa,this.updateRanges=[],this.gpuType=Jt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Vi.fromBufferAttribute(this,t),Vi.applyMatrix3(e),this.setXY(t,Vi.x,Vi.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=gi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=gi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=gi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=gi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=gi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),s=Ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),s=Ct(s,this.array),r=Ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pa&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ko extends Tt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Zo extends Tt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pn extends Tt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const rh=new Ci,vi=new G,js=new G;class Ss{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):rh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vi.subVectors(e,this.center);const t=vi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(vi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(js.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vi.copy(e.center).add(js)),this.expandByPoint(vi.copy(e.center).sub(js))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ah=0;const Ft=new gt,qs=new Nt,ii=new G,Ut=new Ci,Si=new Ci,vt=new G;class jt extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ah++}),this.uuid=Ri(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(zu(e)?Zo:Ko)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ne().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ft.makeRotationFromQuaternion(e),this.applyMatrix4(Ft),this}rotateX(e){return Ft.makeRotationX(e),this.applyMatrix4(Ft),this}rotateY(e){return Ft.makeRotationY(e),this.applyMatrix4(Ft),this}rotateZ(e){return Ft.makeRotationZ(e),this.applyMatrix4(Ft),this}translate(e,t,n){return Ft.makeTranslation(e,t,n),this.applyMatrix4(Ft),this}scale(e,t,n){return Ft.makeScale(e,t,n),this.applyMatrix4(Ft),this}lookAt(e){return qs.lookAt(e),qs.updateMatrix(),this.applyMatrix4(qs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ii).negate(),this.translate(ii.x,ii.y,ii.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new pn(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ci);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Ut.setFromBufferAttribute(r),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Ut.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Ut.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Ut.min),this.boundingBox.expandByPoint(Ut.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ss);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const n=this.boundingSphere.center;if(Ut.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Si.setFromBufferAttribute(o),this.morphTargetsRelative?(vt.addVectors(Ut.min,Si.min),Ut.expandByPoint(vt),vt.addVectors(Ut.max,Si.max),Ut.expandByPoint(vt)):(Ut.expandByPoint(Si.min),Ut.expandByPoint(Si.max))}Ut.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)vt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(vt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)vt.fromBufferAttribute(o,c),l&&(ii.fromBufferAttribute(e,c),vt.add(ii)),s=Math.max(s,n.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new G,l[v]=new G;const c=new G,d=new G,p=new G,u=new qe,m=new qe,_=new qe,E=new G,f=new G;function h(v,T,U){c.fromBufferAttribute(n,v),d.fromBufferAttribute(n,T),p.fromBufferAttribute(n,U),u.fromBufferAttribute(r,v),m.fromBufferAttribute(r,T),_.fromBufferAttribute(r,U),d.sub(c),p.sub(c),m.sub(u),_.sub(u);const R=1/(m.x*_.y-_.x*m.y);isFinite(R)&&(E.copy(d).multiplyScalar(_.y).addScaledVector(p,-m.y).multiplyScalar(R),f.copy(p).multiplyScalar(m.x).addScaledVector(d,-_.x).multiplyScalar(R),o[v].add(E),o[T].add(E),o[U].add(E),l[v].add(f),l[T].add(f),l[U].add(f))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let v=0,T=M.length;v<T;++v){const U=M[v],R=U.start,z=U.count;for(let X=R,j=R+z;X<j;X+=3)h(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const A=new G,y=new G,D=new G,b=new G;function P(v){D.fromBufferAttribute(s,v),b.copy(D);const T=o[v];A.copy(T),A.sub(D.multiplyScalar(D.dot(T))).normalize(),y.crossVectors(b,T);const R=y.dot(l[v])<0?-1:1;a.setXYZW(v,A.x,A.y,A.z,R)}for(let v=0,T=M.length;v<T;++v){const U=M[v],R=U.start,z=U.count;for(let X=R,j=R+z;X<j;X+=3)P(e.getX(X+0)),P(e.getX(X+1)),P(e.getX(X+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Tt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,m=n.count;u<m;u++)n.setXYZ(u,0,0,0);const s=new G,r=new G,a=new G,o=new G,l=new G,c=new G,d=new G,p=new G;if(e)for(let u=0,m=e.count;u<m;u+=3){const _=e.getX(u+0),E=e.getX(u+1),f=e.getX(u+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,E),a.fromBufferAttribute(t,f),d.subVectors(a,r),p.subVectors(s,r),d.cross(p),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,E),c.fromBufferAttribute(n,f),o.add(d),l.add(d),c.add(d),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(E,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let u=0,m=t.count;u<m;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),p.subVectors(s,r),d.cross(p),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,p=o.normalized,u=new c.constructor(l.length*d);let m=0,_=0;for(let E=0,f=l.length;E<f;E++){o.isInterleavedBufferAttribute?m=l[E]*o.data.stride+o.offset:m=l[E]*d;for(let h=0;h<d;h++)u[_++]=c[m++]}return new Tt(u,d,p)}if(this.index===null)return Re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,p=c.length;d<p;d++){const u=c[d],m=e(u,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let p=0,u=c.length;p<u;p++){const m=c[p];d.push(m.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],p=r[c];for(let u=0,m=p.length;u<m;u++)d.push(p[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let oh=0;class Pi extends Wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=Ri(),this.name="",this.type="Material",this.blending=li,this.side=Pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ar,this.blendDst=or,this.blendEquation=On,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=ui,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ca,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qn,this.stencilZFail=qn,this.stencilZPass=qn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Re(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==li&&(n.blending=this.blending),this.side!==Pn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ar&&(n.blendSrc=this.blendSrc),this.blendDst!==or&&(n.blendDst=this.blendDst),this.blendEquation!==On&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ui&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ca&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const cn=new G,Ys=new G,ki=new G,An=new G,Ks=new G,Wi=new G,Zs=new G;class $o{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,cn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=cn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(cn.copy(this.origin).addScaledVector(this.direction,t),cn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ys.copy(e).add(t).multiplyScalar(.5),ki.copy(t).sub(e).normalize(),An.copy(this.origin).sub(Ys);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ki),o=An.dot(this.direction),l=-An.dot(ki),c=An.lengthSq(),d=Math.abs(1-a*a);let p,u,m,_;if(d>0)if(p=a*l-o,u=a*o-l,_=r*d,p>=0)if(u>=-_)if(u<=_){const E=1/d;p*=E,u*=E,m=p*(p+a*u+2*o)+u*(a*p+u+2*l)+c}else u=r,p=Math.max(0,-(a*u+o)),m=-p*p+u*(u+2*l)+c;else u=-r,p=Math.max(0,-(a*u+o)),m=-p*p+u*(u+2*l)+c;else u<=-_?(p=Math.max(0,-(-a*r+o)),u=p>0?-r:Math.min(Math.max(-r,-l),r),m=-p*p+u*(u+2*l)+c):u<=_?(p=0,u=Math.min(Math.max(-r,-l),r),m=u*(u+2*l)+c):(p=Math.max(0,-(a*r+o)),u=p>0?r:Math.min(Math.max(-r,-l),r),m=-p*p+u*(u+2*l)+c);else u=a>0?-r:r,p=Math.max(0,-(a*u+o)),m=-p*p+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Ys).addScaledVector(ki,u),m}intersectSphere(e,t){cn.subVectors(e.center,this.origin);const n=cn.dot(this.direction),s=cn.dot(cn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),p>=0?(o=(e.min.z-u.z)*p,l=(e.max.z-u.z)*p):(o=(e.max.z-u.z)*p,l=(e.min.z-u.z)*p),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,cn)!==null}intersectTriangle(e,t,n,s,r){Ks.subVectors(t,e),Wi.subVectors(n,e),Zs.crossVectors(Ks,Wi);let a=this.direction.dot(Zs),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;An.subVectors(this.origin,e);const l=o*this.direction.dot(Wi.crossVectors(An,Wi));if(l<0)return null;const c=o*this.direction.dot(Ks.cross(An));if(c<0||l+c>a)return null;const d=-o*An.dot(Zs);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Jo extends Pi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Co,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Xa=new gt,Un=new $o,Xi=new Ss,ja=new G,ji=new G,qi=new G,Yi=new G,$s=new G,Ki=new G,qa=new G,Zi=new G;class _n extends Nt{constructor(e=new jt,t=new Jo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ki.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],p=r[l];d!==0&&($s.fromBufferAttribute(p,e),a?Ki.addScaledVector($s,d):Ki.addScaledVector($s.sub(t),d))}t.add(Ki)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xi.copy(n.boundingSphere),Xi.applyMatrix4(r),Un.copy(e.ray).recast(e.near),!(Xi.containsPoint(Un.origin)===!1&&(Un.intersectSphere(Xi,ja)===null||Un.origin.distanceToSquared(ja)>(e.far-e.near)**2))&&(Xa.copy(r).invert(),Un.copy(e.ray).applyMatrix4(Xa),!(n.boundingBox!==null&&Un.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Un)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,p=r.attributes.normal,u=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,E=u.length;_<E;_++){const f=u[_],h=a[f.materialIndex],M=Math.max(f.start,m.start),A=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let y=M,D=A;y<D;y+=3){const b=o.getX(y),P=o.getX(y+1),v=o.getX(y+2);s=$i(this,h,e,n,c,d,p,b,P,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const _=Math.max(0,m.start),E=Math.min(o.count,m.start+m.count);for(let f=_,h=E;f<h;f+=3){const M=o.getX(f),A=o.getX(f+1),y=o.getX(f+2);s=$i(this,a,e,n,c,d,p,M,A,y),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,E=u.length;_<E;_++){const f=u[_],h=a[f.materialIndex],M=Math.max(f.start,m.start),A=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let y=M,D=A;y<D;y+=3){const b=y,P=y+1,v=y+2;s=$i(this,h,e,n,c,d,p,b,P,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const _=Math.max(0,m.start),E=Math.min(l.count,m.start+m.count);for(let f=_,h=E;f<h;f+=3){const M=f,A=f+1,y=f+2;s=$i(this,a,e,n,c,d,p,M,A,y),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function lh(i,e,t,n,s,r,a,o){let l;if(e.side===Pt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Pn,o),l===null)return null;Zi.copy(o),Zi.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Zi);return c<t.near||c>t.far?null:{distance:c,point:Zi.clone(),object:i}}function $i(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,ji),i.getVertexPosition(l,qi),i.getVertexPosition(c,Yi);const d=lh(i,e,t,n,ji,qi,Yi,qa);if(d){const p=new G;kt.getBarycoord(qa,ji,qi,Yi,p),s&&(d.uv=kt.getInterpolatedAttribute(s,o,l,c,p,new qe)),r&&(d.uv1=kt.getInterpolatedAttribute(r,o,l,c,p,new qe)),a&&(d.normal=kt.getInterpolatedAttribute(a,o,l,c,p,new G),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new G,materialIndex:0};kt.getNormal(ji,qi,Yi,u.normal),d.face=u,d.barycoord=p}return d}class ch extends Rt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=St,d=St,p,u){super(null,a,o,l,c,d,s,r,p,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Js=new G,uh=new G,hh=new Ne;class Fn{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Js.subVectors(n,t).cross(uh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Js),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||hh.getNormalMatrix(e),s=this.coplanarPoint(Js).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const In=new Ss,dh=new qe(.5,.5),Ji=new G;class Qo{constructor(e=new Fn,t=new Fn,n=new Fn,s=new Fn,r=new Fn,a=new Fn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Qt,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],p=r[5],u=r[6],m=r[7],_=r[8],E=r[9],f=r[10],h=r[11],M=r[12],A=r[13],y=r[14],D=r[15];if(s[0].setComponents(c-a,m-d,h-_,D-M).normalize(),s[1].setComponents(c+a,m+d,h+_,D+M).normalize(),s[2].setComponents(c+o,m+p,h+E,D+A).normalize(),s[3].setComponents(c-o,m-p,h-E,D-A).normalize(),n)s[4].setComponents(l,u,f,y).normalize(),s[5].setComponents(c-l,m-u,h-f,D-y).normalize();else if(s[4].setComponents(c-l,m-u,h-f,D-y).normalize(),t===Qt)s[5].setComponents(c+l,m+u,h+f,D+y).normalize();else if(t===gs)s[5].setComponents(l,u,f,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),In.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),In.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(In)}intersectsSprite(e){In.center.set(0,0,0);const t=dh.distanceTo(e.center);return In.radius=.7071067811865476+t,In.applyMatrix4(e.matrixWorld),this.intersectsSphere(In)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ji.x=s.normal.x>0?e.max.x:e.min.x,Ji.y=s.normal.y>0?e.max.y:e.min.y,Ji.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ji)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class fh extends Pi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ya=new gt,Kr=new $o,Qi=new Ss,es=new G;class ph extends Nt{constructor(e=new jt,t=new fh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qi.copy(n.boundingSphere),Qi.applyMatrix4(s),Qi.radius+=r,e.ray.intersectsSphere(Qi)===!1)return;Ya.copy(s).invert(),Kr.copy(e.ray).applyMatrix4(Ya);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,p=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let _=u,E=m;_<E;_++){const f=c.getX(_);es.fromBufferAttribute(p,f),Ka(es,f,l,s,e,t,this)}}else{const u=Math.max(0,a.start),m=Math.min(p.count,a.start+a.count);for(let _=u,E=m;_<E;_++)es.fromBufferAttribute(p,_),Ka(es,_,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ka(i,e,t,n,s,r,a){const o=Kr.distanceSqToPoint(i);if(o<t){const l=new G;Kr.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class el extends Rt{constructor(e=[],t=Hn,n,s,r,a,o,l,c,d){super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class di extends Rt{constructor(e,t,n=nn,s,r,a,o=St,l=St,c,d=gn,p=1){if(d!==gn&&d!==Gn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:p};super(u,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new oa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class mh extends di{constructor(e,t=nn,n=Hn,s,r,a=St,o=St,l,c=gn){const d={width:e,height:e,depth:1},p=[d,d,d,d,d,d];super(e,e,t,n,s,r,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class tl extends Rt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ni extends jt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],p=[];let u=0,m=0;_("z","y","x",-1,-1,n,t,e,a,r,0),_("z","y","x",1,-1,n,t,-e,a,r,1),_("x","z","y",1,1,e,n,t,s,a,2),_("x","z","y",1,-1,e,n,-t,s,a,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new pn(c,3)),this.setAttribute("normal",new pn(d,3)),this.setAttribute("uv",new pn(p,2));function _(E,f,h,M,A,y,D,b,P,v,T){const U=y/P,R=D/v,z=y/2,X=D/2,j=b/2,I=P+1,H=v+1;let k=0,J=0;const ee=new G;for(let le=0;le<H;le++){const Se=le*R-X;for(let ve=0;ve<I;ve++){const Ge=ve*U-z;ee[E]=Ge*M,ee[f]=Se*A,ee[h]=j,c.push(ee.x,ee.y,ee.z),ee[E]=0,ee[f]=0,ee[h]=b>0?1:-1,d.push(ee.x,ee.y,ee.z),p.push(ve/P),p.push(1-le/v),k+=1}}for(let le=0;le<v;le++)for(let Se=0;Se<P;Se++){const ve=u+Se+I*le,Ge=u+Se+I*(le+1),ke=u+(Se+1)+I*(le+1),Ce=u+(Se+1)+I*le;l.push(ve,Ge,Ce),l.push(Ge,ke,Ce),J+=6}o.addGroup(m,J,T),m+=J,u+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ni(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ms extends jt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,p=e/o,u=t/l,m=[],_=[],E=[],f=[];for(let h=0;h<d;h++){const M=h*u-a;for(let A=0;A<c;A++){const y=A*p-r;_.push(y,-M,0),E.push(0,0,1),f.push(A/o),f.push(1-h/l)}}for(let h=0;h<l;h++)for(let M=0;M<o;M++){const A=M+c*h,y=M+c*(h+1),D=M+1+c*(h+1),b=M+1+c*h;m.push(A,y,b),m.push(y,D,b)}this.setIndex(m),this.setAttribute("position",new pn(_,3)),this.setAttribute("normal",new pn(E,3)),this.setAttribute("uv",new pn(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ms(e.width,e.height,e.widthSegments,e.heightSegments)}}function fi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Za(s))s.isRenderTargetTexture?(Re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Za(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function wt(i){const e={};for(let t=0;t<i.length;t++){const n=fi(i[t]);for(const s in n)e[s]=n[s]}return e}function Za(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function gh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function nl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:He.workingColorSpace}const _h={clone:fi,merge:wt};var xh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xt extends Pi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xh,this.fragmentShader=vh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=fi(e.uniforms),this.uniformsGroups=gh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Sh extends Xt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Mh extends Pi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Eh extends Pi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ts=new G,ns=new pi,Kt=new G;class il extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new gt,this.projectionMatrix=new gt,this.projectionMatrixInverse=new gt,this.coordinateSystem=Qt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ts,ns,Kt),Kt.x===1&&Kt.y===1&&Kt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ts,ns,Kt.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ts,ns,Kt),Kt.x===1&&Kt.y===1&&Kt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ts,ns,Kt.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const wn=new G,$a=new qe,Ja=new qe;class Bt extends il{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Yr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Cs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yr*2*Math.atan(Math.tan(Cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(wn.x,wn.y).multiplyScalar(-e/wn.z),wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(wn.x,wn.y).multiplyScalar(-e/wn.z)}getViewSize(e,t){return this.getViewBounds(e,$a,Ja),t.subVectors(Ja,$a)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Cs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class sl extends il{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const si=-90,ri=1;class bh extends Nt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Bt(si,ri,e,t);s.layers=this.layers,this.add(s);const r=new Bt(si,ri,e,t);r.layers=this.layers,this.add(r);const a=new Bt(si,ri,e,t);a.layers=this.layers,this.add(a);const o=new Bt(si,ri,e,t);o.layers=this.layers,this.add(o);const l=new Bt(si,ri,e,t);l.layers=this.layers,this.add(l);const c=new Bt(si,ri,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Qt)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===gs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,p=e.getRenderTarget(),u=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const E=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=E,e.setRenderTarget(n,5,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(p,u,m),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class yh extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const fa=class fa{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};fa.prototype.isMatrix2=!0;let Qa=fa;function eo(i,e,t,n){const s=Th(n);switch(t){case Vo:return i*e;case Wo:return i*e/s.components*s.byteLength;case na:return i*e/s.components*s.byteLength;case Vn:return i*e*2/s.components*s.byteLength;case ia:return i*e*2/s.components*s.byteLength;case ko:return i*e*3/s.components*s.byteLength;case Wt:return i*e*4/s.components*s.byteLength;case sa:return i*e*4/s.components*s.byteLength;case os:case ls:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case cs:case us:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case xr:case Sr:return Math.max(i,16)*Math.max(e,8)/4;case _r:case vr:return Math.max(i,8)*Math.max(e,8)/2;case Mr:case Er:case yr:case Tr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case br:case ds:case Ar:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Rr:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Cr:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Pr:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Nr:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Dr:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Lr:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ur:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ir:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Fr:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Or:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Br:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case zr:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Gr:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Hr:case Vr:case kr:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Wr:case Xr:return Math.ceil(i/4)*Math.ceil(e/4)*8;case fs:case jr:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Th(i){switch(i){case zt:case Bo:return{byteLength:1,components:1};case Ai:case zo:case mn:return{byteLength:2,components:1};case ea:case ta:return{byteLength:2,components:4};case nn:case Qr:case Jt:return{byteLength:4,components:1};case Go:case Ho:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jr}}));typeof window<"u"&&(window.__THREE__?Re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jr);function rl(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Ah(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,p=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,d),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function n(o,l,c){const d=l.array,p=l.updateRanges;if(i.bindBuffer(c,o),p.length===0)i.bufferSubData(c,0,d);else{p.sort((m,_)=>m.start-_.start);let u=0;for(let m=1;m<p.length;m++){const _=p[u],E=p[m];E.start<=_.start+_.count+1?_.count=Math.max(_.count,E.start+E.count-_.start):(++u,p[u]=E)}p.length=u+1;for(let m=0,_=p.length;m<_;m++){const E=p[m];i.bufferSubData(c,E.start*d.BYTES_PER_ELEMENT,d,E.start,E.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var wh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ch=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ph=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Dh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Uh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ih=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Fh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Oh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,qh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Yh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Zh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,$h=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Qh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ed=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,td=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,id="gl_FragColor = linearToOutputTexel( gl_FragColor );",sd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ad=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,od=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ld=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ud=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,md=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_d=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,vd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Sd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Md=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ed=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Td=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ad=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,wd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Rd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cd=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Pd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ld=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ud=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Id=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Od=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Wd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,jd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Zd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$d=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ef=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,sf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,af=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,of=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,hf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,df=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ff=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,pf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_f=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ef=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,bf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Af=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,wf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,If=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ff=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Of=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,kf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Kf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Zf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$f=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Qf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,np=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ip=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ap=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,op=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ie={alphahash_fragment:wh,alphahash_pars_fragment:Rh,alphamap_fragment:Ch,alphamap_pars_fragment:Ph,alphatest_fragment:Nh,alphatest_pars_fragment:Dh,aomap_fragment:Lh,aomap_pars_fragment:Uh,batching_pars_vertex:Ih,batching_vertex:Fh,begin_vertex:Oh,beginnormal_vertex:Bh,bsdfs:zh,iridescence_fragment:Gh,bumpmap_pars_fragment:Hh,clipping_planes_fragment:Vh,clipping_planes_pars_fragment:kh,clipping_planes_pars_vertex:Wh,clipping_planes_vertex:Xh,color_fragment:jh,color_pars_fragment:qh,color_pars_vertex:Yh,color_vertex:Kh,common:Zh,cube_uv_reflection_fragment:$h,defaultnormal_vertex:Jh,displacementmap_pars_vertex:Qh,displacementmap_vertex:ed,emissivemap_fragment:td,emissivemap_pars_fragment:nd,colorspace_fragment:id,colorspace_pars_fragment:sd,envmap_fragment:rd,envmap_common_pars_fragment:ad,envmap_pars_fragment:od,envmap_pars_vertex:ld,envmap_physical_pars_fragment:vd,envmap_vertex:cd,fog_vertex:ud,fog_pars_vertex:hd,fog_fragment:dd,fog_pars_fragment:fd,gradientmap_pars_fragment:pd,lightmap_pars_fragment:md,lights_lambert_fragment:gd,lights_lambert_pars_fragment:_d,lights_pars_begin:xd,lights_toon_fragment:Sd,lights_toon_pars_fragment:Md,lights_phong_fragment:Ed,lights_phong_pars_fragment:bd,lights_physical_fragment:yd,lights_physical_pars_fragment:Td,lights_fragment_begin:Ad,lights_fragment_maps:wd,lights_fragment_end:Rd,lightprobes_pars_fragment:Cd,logdepthbuf_fragment:Pd,logdepthbuf_pars_fragment:Nd,logdepthbuf_pars_vertex:Dd,logdepthbuf_vertex:Ld,map_fragment:Ud,map_pars_fragment:Id,map_particle_fragment:Fd,map_particle_pars_fragment:Od,metalnessmap_fragment:Bd,metalnessmap_pars_fragment:zd,morphinstance_vertex:Gd,morphcolor_vertex:Hd,morphnormal_vertex:Vd,morphtarget_pars_vertex:kd,morphtarget_vertex:Wd,normal_fragment_begin:Xd,normal_fragment_maps:jd,normal_pars_fragment:qd,normal_pars_vertex:Yd,normal_vertex:Kd,normalmap_pars_fragment:Zd,clearcoat_normal_fragment_begin:$d,clearcoat_normal_fragment_maps:Jd,clearcoat_pars_fragment:Qd,iridescence_pars_fragment:ef,opaque_fragment:tf,packing:nf,premultiplied_alpha_fragment:sf,project_vertex:rf,dithering_fragment:af,dithering_pars_fragment:of,roughnessmap_fragment:lf,roughnessmap_pars_fragment:cf,shadowmap_pars_fragment:uf,shadowmap_pars_vertex:hf,shadowmap_vertex:df,shadowmask_pars_fragment:ff,skinbase_vertex:pf,skinning_pars_vertex:mf,skinning_vertex:gf,skinnormal_vertex:_f,specularmap_fragment:xf,specularmap_pars_fragment:vf,tonemapping_fragment:Sf,tonemapping_pars_fragment:Mf,transmission_fragment:Ef,transmission_pars_fragment:bf,uv_pars_fragment:yf,uv_pars_vertex:Tf,uv_vertex:Af,worldpos_vertex:wf,background_vert:Rf,background_frag:Cf,backgroundCube_vert:Pf,backgroundCube_frag:Nf,cube_vert:Df,cube_frag:Lf,depth_vert:Uf,depth_frag:If,distance_vert:Ff,distance_frag:Of,equirect_vert:Bf,equirect_frag:zf,linedashed_vert:Gf,linedashed_frag:Hf,meshbasic_vert:Vf,meshbasic_frag:kf,meshlambert_vert:Wf,meshlambert_frag:Xf,meshmatcap_vert:jf,meshmatcap_frag:qf,meshnormal_vert:Yf,meshnormal_frag:Kf,meshphong_vert:Zf,meshphong_frag:$f,meshphysical_vert:Jf,meshphysical_frag:Qf,meshtoon_vert:ep,meshtoon_frag:tp,points_vert:np,points_frag:ip,shadow_vert:sp,shadow_frag:rp,sprite_vert:ap,sprite_frag:op},he={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},$t={basic:{uniforms:wt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:wt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ze(0)},envMapIntensity:{value:1}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:wt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:wt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:wt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:wt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:wt([he.points,he.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:wt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:wt([he.common,he.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:wt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:wt([he.sprite,he.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distance:{uniforms:wt([he.common,he.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distance_vert,fragmentShader:Ie.distance_frag},shadow:{uniforms:wt([he.lights,he.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};$t.physical={uniforms:wt([$t.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const is={r:0,b:0,g:0},lp=new gt,al=new Ne;al.set(-1,0,0,0,1,0,0,0,1);function cp(i,e,t,n,s,r){const a=new Ze(0);let o=s===!0?0:1,l,c,d=null,p=0,u=null;function m(M){let A=M.isScene===!0?M.background:null;if(A&&A.isTexture){const y=M.backgroundBlurriness>0;A=e.get(A,y)}return A}function _(M){let A=!1;const y=m(M);y===null?f(a,o):y&&y.isColor&&(f(y,1),A=!0);const D=i.xr.getEnvironmentBlendMode();D==="additive"?t.buffers.color.setClear(0,0,0,1,r):D==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function E(M,A){const y=m(A);y&&(y.isCubeTexture||y.mapping===vs)?(c===void 0&&(c=new _n(new Ni(1,1,1),new Xt({name:"BackgroundCubeMaterial",uniforms:fi($t.backgroundCube.uniforms),vertexShader:$t.backgroundCube.vertexShader,fragmentShader:$t.backgroundCube.fragmentShader,side:Pt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(D,b,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(lp.makeRotationFromEuler(A.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(al),c.material.toneMapped=He.getTransfer(y.colorSpace)!==Ke,(d!==y||p!==y.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=y,p=y.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new _n(new Ms(2,2),new Xt({name:"BackgroundMaterial",uniforms:fi($t.background.uniforms),vertexShader:$t.background.vertexShader,fragmentShader:$t.background.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=He.getTransfer(y.colorSpace)!==Ke,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||p!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,d=y,p=y.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function f(M,A){M.getRGB(is,nl(i)),t.buffers.color.setClear(is.r,is.g,is.b,A,r)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,A=1){a.set(M),o=A,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,f(a,o)},render:_,addToRenderList:E,dispose:h}}function up(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(R,z,X,j,I){let H=!1;const k=p(R,j,X,z);r!==k&&(r=k,c(r.object)),H=m(R,j,X,I),H&&_(R,j,X,I),I!==null&&e.update(I,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,y(R,z,X,j),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function d(R){return i.deleteVertexArray(R)}function p(R,z,X,j){const I=j.wireframe===!0;let H=n[z.id];H===void 0&&(H={},n[z.id]=H);const k=R.isInstancedMesh===!0?R.id:0;let J=H[k];J===void 0&&(J={},H[k]=J);let ee=J[X.id];ee===void 0&&(ee={},J[X.id]=ee);let le=ee[I];return le===void 0&&(le=u(l()),ee[I]=le),le}function u(R){const z=[],X=[],j=[];for(let I=0;I<t;I++)z[I]=0,X[I]=0,j[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:X,attributeDivisors:j,object:R,attributes:{},index:null}}function m(R,z,X,j){const I=r.attributes,H=z.attributes;let k=0;const J=X.getAttributes();for(const ee in J)if(J[ee].location>=0){const Se=I[ee];let ve=H[ee];if(ve===void 0&&(ee==="instanceMatrix"&&R.instanceMatrix&&(ve=R.instanceMatrix),ee==="instanceColor"&&R.instanceColor&&(ve=R.instanceColor)),Se===void 0||Se.attribute!==ve||ve&&Se.data!==ve.data)return!0;k++}return r.attributesNum!==k||r.index!==j}function _(R,z,X,j){const I={},H=z.attributes;let k=0;const J=X.getAttributes();for(const ee in J)if(J[ee].location>=0){let Se=H[ee];Se===void 0&&(ee==="instanceMatrix"&&R.instanceMatrix&&(Se=R.instanceMatrix),ee==="instanceColor"&&R.instanceColor&&(Se=R.instanceColor));const ve={};ve.attribute=Se,Se&&Se.data&&(ve.data=Se.data),I[ee]=ve,k++}r.attributes=I,r.attributesNum=k,r.index=j}function E(){const R=r.newAttributes;for(let z=0,X=R.length;z<X;z++)R[z]=0}function f(R){h(R,0)}function h(R,z){const X=r.newAttributes,j=r.enabledAttributes,I=r.attributeDivisors;X[R]=1,j[R]===0&&(i.enableVertexAttribArray(R),j[R]=1),I[R]!==z&&(i.vertexAttribDivisor(R,z),I[R]=z)}function M(){const R=r.newAttributes,z=r.enabledAttributes;for(let X=0,j=z.length;X<j;X++)z[X]!==R[X]&&(i.disableVertexAttribArray(X),z[X]=0)}function A(R,z,X,j,I,H,k){k===!0?i.vertexAttribIPointer(R,z,X,I,H):i.vertexAttribPointer(R,z,X,j,I,H)}function y(R,z,X,j){E();const I=j.attributes,H=X.getAttributes(),k=z.defaultAttributeValues;for(const J in H){const ee=H[J];if(ee.location>=0){let le=I[J];if(le===void 0&&(J==="instanceMatrix"&&R.instanceMatrix&&(le=R.instanceMatrix),J==="instanceColor"&&R.instanceColor&&(le=R.instanceColor)),le!==void 0){const Se=le.normalized,ve=le.itemSize,Ge=e.get(le);if(Ge===void 0)continue;const ke=Ge.buffer,Ce=Ge.type,K=Ge.bytesPerElement,ce=Ce===i.INT||Ce===i.UNSIGNED_INT||le.gpuType===Qr;if(le.isInterleavedBufferAttribute){const te=le.data,Te=te.stride,we=le.offset;if(te.isInstancedInterleavedBuffer){for(let Ae=0;Ae<ee.locationSize;Ae++)h(ee.location+Ae,te.meshPerAttribute);R.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ae=0;Ae<ee.locationSize;Ae++)f(ee.location+Ae);i.bindBuffer(i.ARRAY_BUFFER,ke);for(let Ae=0;Ae<ee.locationSize;Ae++)A(ee.location+Ae,ve/ee.locationSize,Ce,Se,Te*K,(we+ve/ee.locationSize*Ae)*K,ce)}else{if(le.isInstancedBufferAttribute){for(let te=0;te<ee.locationSize;te++)h(ee.location+te,le.meshPerAttribute);R.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let te=0;te<ee.locationSize;te++)f(ee.location+te);i.bindBuffer(i.ARRAY_BUFFER,ke);for(let te=0;te<ee.locationSize;te++)A(ee.location+te,ve/ee.locationSize,Ce,Se,ve*K,ve/ee.locationSize*te*K,ce)}}else if(k!==void 0){const Se=k[J];if(Se!==void 0)switch(Se.length){case 2:i.vertexAttrib2fv(ee.location,Se);break;case 3:i.vertexAttrib3fv(ee.location,Se);break;case 4:i.vertexAttrib4fv(ee.location,Se);break;default:i.vertexAttrib1fv(ee.location,Se)}}}}M()}function D(){T();for(const R in n){const z=n[R];for(const X in z){const j=z[X];for(const I in j){const H=j[I];for(const k in H)d(H[k].object),delete H[k];delete j[I]}}delete n[R]}}function b(R){if(n[R.id]===void 0)return;const z=n[R.id];for(const X in z){const j=z[X];for(const I in j){const H=j[I];for(const k in H)d(H[k].object),delete H[k];delete j[I]}}delete n[R.id]}function P(R){for(const z in n){const X=n[z];for(const j in X){const I=X[j];if(I[R.id]===void 0)continue;const H=I[R.id];for(const k in H)d(H[k].object),delete H[k];delete I[R.id]}}}function v(R){for(const z in n){const X=n[z],j=R.isInstancedMesh===!0?R.id:0,I=X[j];if(I!==void 0){for(const H in I){const k=I[H];for(const J in k)d(k[J].object),delete k[J];delete I[H]}delete X[j],Object.keys(X).length===0&&delete n[z]}}}function T(){U(),a=!0,r!==s&&(r=s,c(r.object))}function U(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:U,dispose:D,releaseStatesOfGeometry:b,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:E,enableAttribute:f,disableUnusedAttributes:M}}function hp(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,d){d!==0&&(i.drawArraysInstanced(n,l,c,d),t.update(c,n,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,d);let u=0;for(let m=0;m<d;m++)u+=c[m];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function dp(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==Wt&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const v=P===mn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==zt&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Jt&&!v)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(Re("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const p=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Re("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:_,maxTextureSize:E,maxCubemapSize:f,maxAttributes:h,maxVertexUniforms:M,maxVaryings:A,maxFragmentUniforms:y,maxSamples:D,samples:b}}function fp(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Fn,o=new Ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){const m=p.length!==0||u||n!==0||s;return s=u,n=p.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,u){t=d(p,u,0)},this.setState=function(p,u,m){const _=p.clippingPlanes,E=p.clipIntersection,f=p.clipShadows,h=i.get(p);if(!s||_===null||_.length===0||r&&!f)r?d(null):c();else{const M=r?0:n,A=M*4;let y=h.clippingState||null;l.value=y,y=d(_,u,A,m);for(let D=0;D!==A;++D)y[D]=t[D];h.clippingState=y,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(p,u,m,_){const E=p!==null?p.length:0;let f=null;if(E!==0){if(f=l.value,_!==!0||f===null){const h=m+E*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(f===null||f.length<h)&&(f=new Float32Array(h));for(let A=0,y=m;A!==E;++A,y+=4)a.copy(p[A]).applyMatrix4(M,o),a.normal.toArray(f,y),f[y+3]=a.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,f}}const Cn=4,to=[.125,.215,.35,.446,.526,.582],Bn=20,pp=256,Mi=new sl,no=new Ze;let Qs=null,er=0,tr=0,nr=!1;const mp=new G;class io{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=mp}=r;Qs=this._renderer.getRenderTarget(),er=this._renderer.getActiveCubeFace(),tr=this._renderer.getActiveMipmapLevel(),nr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ao(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ro(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Qs,er,tr),this._renderer.xr.enabled=nr,e.scissorTest=!1,ai(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Hn||e.mapping===hi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qs=this._renderer.getRenderTarget(),er=this._renderer.getActiveCubeFace(),tr=this._renderer.getActiveMipmapLevel(),nr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:At,minFilter:At,generateMipmaps:!1,type:mn,format:Wt,colorSpace:ps,depthBuffer:!1},s=so(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=so(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=gp(r)),this._blurMaterial=xp(r,e,t),this._ggxMaterial=_p(r,e,t)}return s}_compileMaterial(e){const t=new _n(new jt,e);this._renderer.compile(t,Mi)}_sceneToCubeUV(e,t,n,s,r){const l=new Bt(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,m=p.toneMapping;p.getClearColor(no),p.toneMapping=en,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new _n(new Ni,new Jo({name:"PMREM.Background",side:Pt,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,f=E.material;let h=!1;const M=e.background;M?M.isColor&&(f.color.copy(M),e.background=null,h=!0):(f.color.copy(no),h=!0);for(let A=0;A<6;A++){const y=A%3;y===0?(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[A],r.y,r.z)):y===1?(l.up.set(0,0,c[A]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[A],r.z)):(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[A]));const D=this._cubeSize;ai(s,y*D,A>2?D:0,D,D),p.setRenderTarget(s),h&&p.render(E,l),p.render(e,l)}p.toneMapping=m,p.autoClear=u,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Hn||e.mapping===hi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ao()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ro());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ai(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Mi)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),p=Math.sqrt(c*c-d*d),u=0+c*1.25,m=p*u,{_lodMax:_}=this,E=this._sizeLods[n],f=3*E*(n>_-Cn?n-_+Cn:0),h=4*(this._cubeSize-E);l.envMap.value=e.texture,l.roughness.value=m,l.mipInt.value=_-t,ai(r,f,h,3*E,2*E),s.setRenderTarget(r),s.render(o,Mi),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=_-n,ai(e,f,h,3*E,2*E),s.setRenderTarget(e),s.render(o,Mi)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Xe("blur direction must be either latitudinal or longitudinal!");const d=3,p=this._lodMeshes[s];p.material=c;const u=c.uniforms,m=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Bn-1),E=r/_,f=isFinite(r)?1+Math.floor(d*E):Bn;f>Bn&&Re(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Bn}`);const h=[];let M=0;for(let P=0;P<Bn;++P){const v=P/E,T=Math.exp(-v*v/2);h.push(T),P===0?M+=T:P<f&&(M+=2*T)}for(let P=0;P<h.length;P++)h[P]=h[P]/M;u.envMap.value=e.texture,u.samples.value=f,u.weights.value=h,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:A}=this;u.dTheta.value=_,u.mipInt.value=A-n;const y=this._sizeLods[s],D=3*y*(s>A-Cn?s-A+Cn:0),b=4*(this._cubeSize-y);ai(t,D,b,3*y,2*y),l.setRenderTarget(t),l.render(p,Mi)}}function gp(i){const e=[],t=[],n=[];let s=i;const r=i-Cn+1+to.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Cn?l=to[a-i+Cn-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),d=-c,p=1+c,u=[d,d,p,d,p,p,d,d,p,p,d,p],m=6,_=6,E=3,f=2,h=1,M=new Float32Array(E*_*m),A=new Float32Array(f*_*m),y=new Float32Array(h*_*m);for(let b=0;b<m;b++){const P=b%3*2/3-1,v=b>2?0:-1,T=[P,v,0,P+2/3,v,0,P+2/3,v+1,0,P,v,0,P+2/3,v+1,0,P,v+1,0];M.set(T,E*_*b),A.set(u,f*_*b);const U=[b,b,b,b,b,b];y.set(U,h*_*b)}const D=new jt;D.setAttribute("position",new Tt(M,E)),D.setAttribute("uv",new Tt(A,f)),D.setAttribute("faceIndex",new Tt(y,h)),n.push(new _n(D,null)),s>Cn&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function so(i,e,t){const n=new tn(i,e,t);return n.texture.mapping=vs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ai(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function _p(i,e,t){return new Xt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:pp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Es(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:dn,depthTest:!1,depthWrite:!1})}function xp(i,e,t){const n=new Float32Array(Bn),s=new G(0,1,0);return new Xt({name:"SphericalGaussianBlur",defines:{n:Bn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Es(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:dn,depthTest:!1,depthWrite:!1})}function ro(){return new Xt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Es(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:dn,depthTest:!1,depthWrite:!1})}function ao(){return new Xt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Es(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:dn,depthTest:!1,depthWrite:!1})}function Es(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class ol extends tn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new el(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ni(5,5,5),r=new Xt({name:"CubemapFromEquirect",uniforms:fi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pt,blending:dn});r.uniforms.tEquirect.value=t;const a=new _n(s,r),o=t.minFilter;return t.minFilter===zn&&(t.minFilter=At),new bh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function vp(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,m=!1){return u==null?null:m?a(u):r(u)}function r(u){if(u&&u.isTexture){const m=u.mapping;if(m===As||m===ws)if(e.has(u)){const _=e.get(u).texture;return o(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const E=new ol(_.height);return E.fromEquirectangularTexture(i,u),e.set(u,E),u.addEventListener("dispose",c),o(E.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const m=u.mapping,_=m===As||m===ws,E=m===Hn||m===hi;if(_||E){let f=t.get(u);const h=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return n===null&&(n=new io(i)),f=_?n.fromEquirectangular(u,f):n.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),f.texture;if(f!==void 0)return f.texture;{const M=u.image;return _&&M&&M.height>0||E&&M&&l(M)?(n===null&&(n=new io(i)),f=_?n.fromEquirectangular(u):n.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),u.addEventListener("dispose",d),f.texture):null}}}return u}function o(u,m){return m===As?u.mapping=Hn:m===ws&&(u.mapping=hi),u}function l(u){let m=0;const _=6;for(let E=0;E<_;E++)u[E]!==void 0&&m++;return m===_}function c(u){const m=u.target;m.removeEventListener("dispose",c);const _=e.get(m);_!==void 0&&(e.delete(m),_.dispose())}function d(u){const m=u.target;m.removeEventListener("dispose",d);const _=t.get(m);_!==void 0&&(t.delete(m),_.dispose())}function p(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function Sp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&qr("WebGLRenderer: "+n+" extension not supported."),s}}}function Mp(i,e,t,n){const s={},r=new WeakMap;function a(p){const u=p.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);u.removeEventListener("dispose",a),delete s[u.id];const m=r.get(u);m&&(e.remove(m),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(p,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(p){const u=p.attributes;for(const m in u)e.update(u[m],i.ARRAY_BUFFER)}function c(p){const u=[],m=p.index,_=p.attributes.position;let E=0;if(_===void 0)return;if(m!==null){const M=m.array;E=m.version;for(let A=0,y=M.length;A<y;A+=3){const D=M[A+0],b=M[A+1],P=M[A+2];u.push(D,b,b,P,P,D)}}else{const M=_.array;E=_.version;for(let A=0,y=M.length/3-1;A<y;A+=3){const D=A+0,b=A+1,P=A+2;u.push(D,b,b,P,P,D)}}const f=new(_.count>=65535?Zo:Ko)(u,1);f.version=E;const h=r.get(p);h&&e.remove(h),r.set(p,f)}function d(p){const u=r.get(p);if(u){const m=p.index;m!==null&&u.version<m.version&&c(p)}else c(p);return r.get(p)}return{get:o,update:l,getWireframeAttribute:d}}function Ep(i,e,t){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,u){i.drawElements(n,u,r,p*a),t.update(u,n,1)}function c(p,u,m){m!==0&&(i.drawElementsInstanced(n,u,r,p*a,m),t.update(u,n,m))}function d(p,u,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,p,0,m);let E=0;for(let f=0;f<m;f++)E+=u[f];t.update(E,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function bp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Xe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function yp(i,e,t){const n=new WeakMap,s=new pt;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=d!==void 0?d.length:0;let u=n.get(o);if(u===void 0||u.count!==p){let T=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,E=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let A=0;m===!0&&(A=1),_===!0&&(A=2),E===!0&&(A=3);let y=o.attributes.position.count*A,D=1;y>e.maxTextureSize&&(D=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const b=new Float32Array(y*D*4*p),P=new jo(b,y,D,p);P.type=Jt,P.needsUpdate=!0;const v=A*4;for(let U=0;U<p;U++){const R=f[U],z=h[U],X=M[U],j=y*D*4*U;for(let I=0;I<R.count;I++){const H=I*v;m===!0&&(s.fromBufferAttribute(R,I),b[j+H+0]=s.x,b[j+H+1]=s.y,b[j+H+2]=s.z,b[j+H+3]=0),_===!0&&(s.fromBufferAttribute(z,I),b[j+H+4]=s.x,b[j+H+5]=s.y,b[j+H+6]=s.z,b[j+H+7]=0),E===!0&&(s.fromBufferAttribute(X,I),b[j+H+8]=s.x,b[j+H+9]=s.y,b[j+H+10]=s.z,b[j+H+11]=X.itemSize===4?s.w:1)}}u={count:p,texture:P,size:new qe(y,D)},n.set(o,u),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let E=0;E<c.length;E++)m+=c[E];const _=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Tp(i,e,t,n,s){let r=new WeakMap;function a(c){const d=s.render.frame,p=c.geometry,u=e.get(c,p);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==d&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){const m=c.skeleton;r.get(m)!==d&&(m.update(),r.set(m,d))}return u}function o(){r=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const Ap={[Po]:"LINEAR_TONE_MAPPING",[No]:"REINHARD_TONE_MAPPING",[Do]:"CINEON_TONE_MAPPING",[Lo]:"ACES_FILMIC_TONE_MAPPING",[Io]:"AGX_TONE_MAPPING",[Fo]:"NEUTRAL_TONE_MAPPING",[Uo]:"CUSTOM_TONE_MAPPING"};function wp(i,e,t,n,s){const r=new tn(e,t,{type:i,depthBuffer:n,stencilBuffer:s,depthTexture:n?new di(e,t):void 0}),a=new tn(e,t,{type:mn,depthBuffer:!1,stencilBuffer:!1}),o=new jt;o.setAttribute("position",new pn([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new pn([0,2,0,0,2,0],2));const l=new Sh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new _n(o,l),d=new sl(-1,1,1,-1,0,1);let p=null,u=null,m=!1,_,E=null,f=[],h=!1;this.setSize=function(M,A){r.setSize(M,A),a.setSize(M,A);for(let y=0;y<f.length;y++){const D=f[y];D.setSize&&D.setSize(M,A)}},this.setEffects=function(M){f=M,h=f.length>0&&f[0].isRenderPass===!0;const A=r.width,y=r.height;for(let D=0;D<f.length;D++){const b=f[D];b.setSize&&b.setSize(A,y)}},this.begin=function(M,A){if(m||M.toneMapping===en&&f.length===0)return!1;if(E=A,A!==null){const y=A.width,D=A.height;(r.width!==y||r.height!==D)&&this.setSize(y,D)}return h===!1&&M.setRenderTarget(r),_=M.toneMapping,M.toneMapping=en,!0},this.hasRenderPass=function(){return h},this.end=function(M,A){M.toneMapping=_,m=!0;let y=r,D=a;for(let b=0;b<f.length;b++){const P=f[b];if(P.enabled!==!1&&(P.render(M,D,y,A),P.needsSwap!==!1)){const v=y;y=D,D=v}}if(p!==M.outputColorSpace||u!==M.toneMapping){p=M.outputColorSpace,u=M.toneMapping,l.defines={},He.getTransfer(p)===Ke&&(l.defines.SRGB_TRANSFER="");const b=Ap[u];b&&(l.defines[b]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,M.setRenderTarget(E),M.render(c,d),E=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const ll=new Rt,Zr=new di(1,1),cl=new jo,ul=new Ku,hl=new el,oo=[],lo=[],co=new Float32Array(16),uo=new Float32Array(9),ho=new Float32Array(4);function mi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=oo[s];if(r===void 0&&(r=new Float32Array(s),oo[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function _t(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function bs(i,e){let t=lo[e];t===void 0&&(t=new Int32Array(e),lo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Rp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Cp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2fv(this.addr,e),xt(t,e)}}function Pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;i.uniform3fv(this.addr,e),xt(t,e)}}function Np(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4fv(this.addr,e),xt(t,e)}}function Dp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),xt(t,e)}else{if(_t(t,n))return;ho.set(n),i.uniformMatrix2fv(this.addr,!1,ho),xt(t,n)}}function Lp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),xt(t,e)}else{if(_t(t,n))return;uo.set(n),i.uniformMatrix3fv(this.addr,!1,uo),xt(t,n)}}function Up(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),xt(t,e)}else{if(_t(t,n))return;co.set(n),i.uniformMatrix4fv(this.addr,!1,co),xt(t,n)}}function Ip(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Fp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2iv(this.addr,e),xt(t,e)}}function Op(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3iv(this.addr,e),xt(t,e)}}function Bp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4iv(this.addr,e),xt(t,e)}}function zp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2uiv(this.addr,e),xt(t,e)}}function Hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3uiv(this.addr,e),xt(t,e)}}function Vp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4uiv(this.addr,e),xt(t,e)}}function kp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Zr.compareFunction=t.isReversedDepthBuffer()?aa:ra,r=Zr):r=ll,t.setTexture2D(e||r,s)}function Wp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ul,s)}function Xp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||hl,s)}function jp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||cl,s)}function qp(i){switch(i){case 5126:return Rp;case 35664:return Cp;case 35665:return Pp;case 35666:return Np;case 35674:return Dp;case 35675:return Lp;case 35676:return Up;case 5124:case 35670:return Ip;case 35667:case 35671:return Fp;case 35668:case 35672:return Op;case 35669:case 35673:return Bp;case 5125:return zp;case 36294:return Gp;case 36295:return Hp;case 36296:return Vp;case 35678:case 36198:case 36298:case 36306:case 35682:return kp;case 35679:case 36299:case 36307:return Wp;case 35680:case 36300:case 36308:case 36293:return Xp;case 36289:case 36303:case 36311:case 36292:return jp}}function Yp(i,e){i.uniform1fv(this.addr,e)}function Kp(i,e){const t=mi(e,this.size,2);i.uniform2fv(this.addr,t)}function Zp(i,e){const t=mi(e,this.size,3);i.uniform3fv(this.addr,t)}function $p(i,e){const t=mi(e,this.size,4);i.uniform4fv(this.addr,t)}function Jp(i,e){const t=mi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Qp(i,e){const t=mi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function em(i,e){const t=mi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function tm(i,e){i.uniform1iv(this.addr,e)}function nm(i,e){i.uniform2iv(this.addr,e)}function im(i,e){i.uniform3iv(this.addr,e)}function sm(i,e){i.uniform4iv(this.addr,e)}function rm(i,e){i.uniform1uiv(this.addr,e)}function am(i,e){i.uniform2uiv(this.addr,e)}function om(i,e){i.uniform3uiv(this.addr,e)}function lm(i,e){i.uniform4uiv(this.addr,e)}function cm(i,e,t){const n=this.cache,s=e.length,r=bs(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),xt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Zr:a=ll;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function um(i,e,t){const n=this.cache,s=e.length,r=bs(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),xt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ul,r[a])}function hm(i,e,t){const n=this.cache,s=e.length,r=bs(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),xt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||hl,r[a])}function dm(i,e,t){const n=this.cache,s=e.length,r=bs(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),xt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||cl,r[a])}function fm(i){switch(i){case 5126:return Yp;case 35664:return Kp;case 35665:return Zp;case 35666:return $p;case 35674:return Jp;case 35675:return Qp;case 35676:return em;case 5124:case 35670:return tm;case 35667:case 35671:return nm;case 35668:case 35672:return im;case 35669:case 35673:return sm;case 5125:return rm;case 36294:return am;case 36295:return om;case 36296:return lm;case 35678:case 36198:case 36298:case 36306:case 35682:return cm;case 35679:case 36299:case 36307:return um;case 35680:case 36300:case 36308:case 36293:return hm;case 36289:case 36303:case 36311:case 36292:return dm}}class pm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=qp(t.type)}}class mm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=fm(t.type)}}class gm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const ir=/(\w+)(\])?(\[|\.)?/g;function fo(i,e){i.seq.push(e),i.map[e.id]=e}function _m(i,e,t){const n=i.name,s=n.length;for(ir.lastIndex=0;;){const r=ir.exec(n),a=ir.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){fo(t,c===void 0?new pm(o,i,e):new mm(o,i,e));break}else{let p=t.map[o];p===void 0&&(p=new gm(o),fo(t,p)),t=p}}}class hs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);_m(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function po(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const xm=37297;let vm=0;function Sm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const mo=new Ne;function Mm(i){He._getMatrix(mo,He.workingColorSpace,i);const e=`mat3( ${mo.elements.map(t=>t.toFixed(4))} )`;switch(He.getTransfer(i)){case ms:return[e,"LinearTransferOETF"];case Ke:return[e,"sRGBTransferOETF"];default:return Re("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function go(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Sm(i.getShaderSource(e),o)}else return r}function Em(i,e){const t=Mm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const bm={[Po]:"Linear",[No]:"Reinhard",[Do]:"Cineon",[Lo]:"ACESFilmic",[Io]:"AgX",[Fo]:"Neutral",[Uo]:"Custom"};function ym(i,e){const t=bm[e];return t===void 0?(Re("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ss=new G;function Tm(){He.getLuminanceCoefficients(ss);const i=ss.x.toFixed(4),e=ss.y.toFixed(4),t=ss.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Am(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ti).join(`
`)}function wm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Rm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ti(i){return i!==""}function _o(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function xo(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Cm=/^[ \t]*#include +<([\w\d./]+)>/gm;function $r(i){return i.replace(Cm,Nm)}const Pm=new Map;function Nm(i,e){let t=Ie[e];if(t===void 0){const n=Pm.get(e);if(n!==void 0)t=Ie[n],Re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return $r(t)}const Dm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vo(i){return i.replace(Dm,Lm)}function Lm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function So(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Um={[as]:"SHADOWMAP_TYPE_PCF",[yi]:"SHADOWMAP_TYPE_VSM"};function Im(i){return Um[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Fm={[Hn]:"ENVMAP_TYPE_CUBE",[hi]:"ENVMAP_TYPE_CUBE",[vs]:"ENVMAP_TYPE_CUBE_UV"};function Om(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Fm[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Bm={[hi]:"ENVMAP_MODE_REFRACTION"};function zm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Bm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Gm={[Co]:"ENVMAP_BLENDING_MULTIPLY",[Ru]:"ENVMAP_BLENDING_MIX",[Cu]:"ENVMAP_BLENDING_ADD"};function Hm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Gm[i.combine]||"ENVMAP_BLENDING_NONE"}function Vm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function km(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Im(t),c=Om(t),d=zm(t),p=Hm(t),u=Vm(t),m=Am(t),_=wm(r),E=s.createProgram();let f,h,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ti).join(`
`),f.length>0&&(f+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ti).join(`
`),h.length>0&&(h+=`
`)):(f=[So(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ti).join(`
`),h=[So(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==en?"#define TONE_MAPPING":"",t.toneMapping!==en?Ie.tonemapping_pars_fragment:"",t.toneMapping!==en?ym("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,Em("linearToOutputTexel",t.outputColorSpace),Tm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ti).join(`
`)),a=$r(a),a=_o(a,t),a=xo(a,t),o=$r(o),o=_o(o,t),o=xo(o,t),a=vo(a),o=vo(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,h=["#define varying in",t.glslVersion===Na?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Na?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const A=M+f+a,y=M+h+o,D=po(s,s.VERTEX_SHADER,A),b=po(s,s.FRAGMENT_SHADER,y);s.attachShader(E,D),s.attachShader(E,b),t.index0AttributeName!==void 0?s.bindAttribLocation(E,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(E,0,"position"),s.linkProgram(E);function P(R){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(E)||"",X=s.getShaderInfoLog(D)||"",j=s.getShaderInfoLog(b)||"",I=z.trim(),H=X.trim(),k=j.trim();let J=!0,ee=!0;if(s.getProgramParameter(E,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,E,D,b);else{const le=go(s,D,"vertex"),Se=go(s,b,"fragment");Xe("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(E,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+I+`
`+le+`
`+Se)}else I!==""?Re("WebGLProgram: Program Info Log:",I):(H===""||k==="")&&(ee=!1);ee&&(R.diagnostics={runnable:J,programLog:I,vertexShader:{log:H,prefix:f},fragmentShader:{log:k,prefix:h}})}s.deleteShader(D),s.deleteShader(b),v=new hs(s,E),T=Rm(s,E)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(E,xm)),U},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(E),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vm++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=D,this.fragmentShader=b,this}let Wm=0;class Xm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new jm(e),t.set(e,n)),n}}class jm{constructor(e){this.id=Wm++,this.code=e,this.usedTimes=0}}function qm(i){return i===Vn||i===ds||i===fs}function Ym(i,e,t,n,s,r){const a=new qo,o=new Xm,l=new Set,c=[],d=new Map,p=n.logarithmicDepthBuffer;let u=n.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return l.add(v),v===0?"uv":`uv${v}`}function E(v,T,U,R,z,X){const j=R.fog,I=z.geometry,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?R.environment:null,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,J=e.get(v.envMap||H,k),ee=J&&J.mapping===vs?J.image.height:null,le=m[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Re("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const Se=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ve=Se!==void 0?Se.length:0;let Ge=0;I.morphAttributes.position!==void 0&&(Ge=1),I.morphAttributes.normal!==void 0&&(Ge=2),I.morphAttributes.color!==void 0&&(Ge=3);let ke,Ce,K,ce;if(le){const De=$t[le];ke=De.vertexShader,Ce=De.fragmentShader}else ke=v.vertexShader,Ce=v.fragmentShader,o.update(v),K=o.getVertexShaderID(v),ce=o.getFragmentShaderID(v);const te=i.getRenderTarget(),Te=i.state.buffers.depth.getReversed(),we=z.isInstancedMesh===!0,Ae=z.isBatchedMesh===!0,rt=!!v.map,Fe=!!v.matcap,Ye=!!J,Qe=!!v.aoMap,Oe=!!v.lightMap,ut=!!v.bumpMap,at=!!v.normalMap,Mt=!!v.displacementMap,N=!!v.emissiveMap,ot=!!v.metalnessMap,ze=!!v.roughnessMap,it=v.anisotropy>0,ue=v.clearcoat>0,lt=v.dispersion>0,S=v.iridescence>0,g=v.sheen>0,F=v.transmission>0,Y=it&&!!v.anisotropyMap,Q=ue&&!!v.clearcoatMap,ne=ue&&!!v.clearcoatNormalMap,oe=ue&&!!v.clearcoatRoughnessMap,W=S&&!!v.iridescenceMap,Z=S&&!!v.iridescenceThicknessMap,pe=g&&!!v.sheenColorMap,_e=g&&!!v.sheenRoughnessMap,re=!!v.specularMap,ie=!!v.specularColorMap,Pe=!!v.specularIntensityMap,Ue=F&&!!v.transmissionMap,je=F&&!!v.thicknessMap,C=!!v.gradientMap,se=!!v.alphaMap,q=v.alphaTest>0,me=!!v.alphaHash,ae=!!v.extensions;let $=en;v.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&($=i.toneMapping);const Ee={shaderID:le,shaderType:v.type,shaderName:v.name,vertexShader:ke,fragmentShader:Ce,defines:v.defines,customVertexShaderID:K,customFragmentShaderID:ce,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Ae,batchingColor:Ae&&z._colorsTexture!==null,instancing:we,instancingColor:we&&z.instanceColor!==null,instancingMorph:we&&z.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:He.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:rt,matcap:Fe,envMap:Ye,envMapMode:Ye&&J.mapping,envMapCubeUVHeight:ee,aoMap:Qe,lightMap:Oe,bumpMap:ut,normalMap:at,displacementMap:Mt,emissiveMap:N,normalMapObjectSpace:at&&v.normalMapType===Du,normalMapTangentSpace:at&&v.normalMapType===Ra,packedNormalMap:at&&v.normalMapType===Ra&&qm(v.normalMap.format),metalnessMap:ot,roughnessMap:ze,anisotropy:it,anisotropyMap:Y,clearcoat:ue,clearcoatMap:Q,clearcoatNormalMap:ne,clearcoatRoughnessMap:oe,dispersion:lt,iridescence:S,iridescenceMap:W,iridescenceThicknessMap:Z,sheen:g,sheenColorMap:pe,sheenRoughnessMap:_e,specularMap:re,specularColorMap:ie,specularIntensityMap:Pe,transmission:F,transmissionMap:Ue,thicknessMap:je,gradientMap:C,opaque:v.transparent===!1&&v.blending===li&&v.alphaToCoverage===!1,alphaMap:se,alphaTest:q,alphaHash:me,combine:v.combine,mapUv:rt&&_(v.map.channel),aoMapUv:Qe&&_(v.aoMap.channel),lightMapUv:Oe&&_(v.lightMap.channel),bumpMapUv:ut&&_(v.bumpMap.channel),normalMapUv:at&&_(v.normalMap.channel),displacementMapUv:Mt&&_(v.displacementMap.channel),emissiveMapUv:N&&_(v.emissiveMap.channel),metalnessMapUv:ot&&_(v.metalnessMap.channel),roughnessMapUv:ze&&_(v.roughnessMap.channel),anisotropyMapUv:Y&&_(v.anisotropyMap.channel),clearcoatMapUv:Q&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:ne&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:W&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:_e&&_(v.sheenRoughnessMap.channel),specularMapUv:re&&_(v.specularMap.channel),specularColorMapUv:ie&&_(v.specularColorMap.channel),specularIntensityMapUv:Pe&&_(v.specularIntensityMap.channel),transmissionMapUv:Ue&&_(v.transmissionMap.channel),thicknessMapUv:je&&_(v.thicknessMap.channel),alphaMapUv:se&&_(v.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(at||it),vertexNormals:!!I.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!I.attributes.uv&&(rt||se),fog:!!j,useFog:v.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||I.attributes.normal===void 0&&at===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Te,skinning:z.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Ge,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:$,decodeVideoTexture:rt&&v.map.isVideoTexture===!0&&He.getTransfer(v.map.colorSpace)===Ke,decodeVideoTextureEmissive:N&&v.emissiveMap.isVideoTexture===!0&&He.getTransfer(v.emissiveMap.colorSpace)===Ke,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===un,flipSided:v.side===Pt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ae&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&v.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ee.vertexUv1s=l.has(1),Ee.vertexUv2s=l.has(2),Ee.vertexUv3s=l.has(3),l.clear(),Ee}function f(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const U in v.defines)T.push(U),T.push(v.defines[U]);return v.isRawShaderMaterial===!1&&(h(T,v),M(T,v),T.push(i.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function h(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function M(v,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),v.push(a.mask)}function A(v){const T=m[v.type];let U;if(T){const R=$t[T];U=_h.clone(R.uniforms)}else U=v.uniforms;return U}function y(v,T){let U=d.get(T);return U!==void 0?++U.usedTimes:(U=new km(i,T,v,s),c.push(U),d.set(T,U)),U}function D(v){if(--v.usedTimes===0){const T=c.indexOf(v);c[T]=c[c.length-1],c.pop(),d.delete(v.cacheKey),v.destroy()}}function b(v){o.remove(v)}function P(){o.dispose()}return{getParameters:E,getProgramCacheKey:f,getUniforms:A,acquireProgram:y,releaseProgram:D,releaseShaderCache:b,programs:c,dispose:P}}function Km(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Zm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Mo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Eo(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,_,E,f,h){let M=i[e];return M===void 0?(M={id:u.id,object:u,geometry:m,material:_,materialVariant:a(u),groupOrder:E,renderOrder:u.renderOrder,z:f,group:h},i[e]=M):(M.id=u.id,M.object=u,M.geometry=m,M.material=_,M.materialVariant=a(u),M.groupOrder=E,M.renderOrder=u.renderOrder,M.z=f,M.group=h),e++,M}function l(u,m,_,E,f,h){const M=o(u,m,_,E,f,h);_.transmission>0?n.push(M):_.transparent===!0?s.push(M):t.push(M)}function c(u,m,_,E,f,h){const M=o(u,m,_,E,f,h);_.transmission>0?n.unshift(M):_.transparent===!0?s.unshift(M):t.unshift(M)}function d(u,m){t.length>1&&t.sort(u||Zm),n.length>1&&n.sort(m||Mo),s.length>1&&s.sort(m||Mo)}function p(){for(let u=e,m=i.length;u<m;u++){const _=i[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:p,sort:d}}function $m(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Eo,i.set(n,[a])):s>=r.length?(a=new Eo,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Jm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new Ze};break;case"SpotLight":t={position:new G,direction:new G,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new G,halfWidth:new G,halfHeight:new G};break}return i[e.id]=t,t}}}function Qm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let eg=0;function tg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ng(i){const e=new Jm,t=Qm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new G);const s=new G,r=new gt,a=new gt;function o(c){let d=0,p=0,u=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let m=0,_=0,E=0,f=0,h=0,M=0,A=0,y=0,D=0,b=0,P=0;c.sort(tg);for(let T=0,U=c.length;T<U;T++){const R=c[T],z=R.color,X=R.intensity,j=R.distance;let I=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Vn?I=R.shadow.map.texture:I=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)d+=z.r*X,p+=z.g*X,u+=z.b*X;else if(R.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(R.sh.coefficients[H],X);P++}else if(R.isDirectionalLight){const H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const k=R.shadow,J=t.get(R);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,n.directionalShadow[m]=J,n.directionalShadowMap[m]=I,n.directionalShadowMatrix[m]=R.shadow.matrix,M++}n.directional[m]=H,m++}else if(R.isSpotLight){const H=e.get(R);H.position.setFromMatrixPosition(R.matrixWorld),H.color.copy(z).multiplyScalar(X),H.distance=j,H.coneCos=Math.cos(R.angle),H.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),H.decay=R.decay,n.spot[E]=H;const k=R.shadow;if(R.map&&(n.spotLightMap[D]=R.map,D++,k.updateMatrices(R),R.castShadow&&b++),n.spotLightMatrix[E]=k.matrix,R.castShadow){const J=t.get(R);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,n.spotShadow[E]=J,n.spotShadowMap[E]=I,y++}E++}else if(R.isRectAreaLight){const H=e.get(R);H.color.copy(z).multiplyScalar(X),H.halfWidth.set(R.width*.5,0,0),H.halfHeight.set(0,R.height*.5,0),n.rectArea[f]=H,f++}else if(R.isPointLight){const H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),H.distance=R.distance,H.decay=R.decay,R.castShadow){const k=R.shadow,J=t.get(R);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,J.shadowCameraNear=k.camera.near,J.shadowCameraFar=k.camera.far,n.pointShadow[_]=J,n.pointShadowMap[_]=I,n.pointShadowMatrix[_]=R.shadow.matrix,A++}n.point[_]=H,_++}else if(R.isHemisphereLight){const H=e.get(R);H.skyColor.copy(R.color).multiplyScalar(X),H.groundColor.copy(R.groundColor).multiplyScalar(X),n.hemi[h]=H,h++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=p,n.ambient[2]=u;const v=n.hash;(v.directionalLength!==m||v.pointLength!==_||v.spotLength!==E||v.rectAreaLength!==f||v.hemiLength!==h||v.numDirectionalShadows!==M||v.numPointShadows!==A||v.numSpotShadows!==y||v.numSpotMaps!==D||v.numLightProbes!==P)&&(n.directional.length=m,n.spot.length=E,n.rectArea.length=f,n.point.length=_,n.hemi.length=h,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=y+D-b,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=P,v.directionalLength=m,v.pointLength=_,v.spotLength=E,v.rectAreaLength=f,v.hemiLength=h,v.numDirectionalShadows=M,v.numPointShadows=A,v.numSpotShadows=y,v.numSpotMaps=D,v.numLightProbes=P,n.version=eg++)}function l(c,d){let p=0,u=0,m=0,_=0,E=0;const f=d.matrixWorldInverse;for(let h=0,M=c.length;h<M;h++){const A=c[h];if(A.isDirectionalLight){const y=n.directional[p];y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(f),p++}else if(A.isSpotLight){const y=n.spot[m];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(f),y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(f),m++}else if(A.isRectAreaLight){const y=n.rectArea[_];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(f),a.identity(),r.copy(A.matrixWorld),r.premultiply(f),a.extractRotation(r),y.halfWidth.set(A.width*.5,0,0),y.halfHeight.set(0,A.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),_++}else if(A.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(f),u++}else if(A.isHemisphereLight){const y=n.hemi[E];y.direction.setFromMatrixPosition(A.matrixWorld),y.direction.transformDirection(f),E++}}}return{setup:o,setupView:l,state:n}}function bo(i){const e=new ng(i),t=[],n=[],s=[];function r(u){p.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}const p={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function ig(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new bo(i),e.set(s,[o])):r>=a.length?(o=new bo(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const sg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ag=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],og=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],yo=new gt,Ei=new G,sr=new G;function lg(i,e,t){let n=new Qo;const s=new qe,r=new qe,a=new pt,o=new Mh,l=new Eh,c={},d=t.maxTextureSize,p={[Pn]:Pt,[Pt]:Pn,[un]:un},u=new Xt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:sg,fragmentShader:rg}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const _=new jt;_.setAttribute("position",new Tt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new _n(_,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=as;let h=this.type;this.render=function(b,P,v){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||b.length===0)return;this.type===cu&&(Re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=as);const T=i.getRenderTarget(),U=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),z=i.state;z.setBlending(dn),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const X=h!==this.type;X&&P.traverse(function(j){j.material&&(Array.isArray(j.material)?j.material.forEach(I=>I.needsUpdate=!0):j.material.needsUpdate=!0)});for(let j=0,I=b.length;j<I;j++){const H=b[j],k=H.shadow;if(k===void 0){Re("WebGLShadowMap:",H,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const J=k.getFrameExtents();s.multiply(J),r.copy(k.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/J.x),s.x=r.x*J.x,k.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/J.y),s.y=r.y*J.y,k.mapSize.y=r.y));const ee=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=ee,k.map===null||X===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===yi){if(H.isPointLight){Re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new tn(s.x,s.y,{format:Vn,type:mn,minFilter:At,magFilter:At,generateMipmaps:!1}),k.map.texture.name=H.name+".shadowMap",k.map.depthTexture=new di(s.x,s.y,Jt),k.map.depthTexture.name=H.name+".shadowMapDepth",k.map.depthTexture.format=gn,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=St,k.map.depthTexture.magFilter=St}else H.isPointLight?(k.map=new ol(s.x),k.map.depthTexture=new mh(s.x,nn)):(k.map=new tn(s.x,s.y),k.map.depthTexture=new di(s.x,s.y,nn)),k.map.depthTexture.name=H.name+".shadowMap",k.map.depthTexture.format=gn,this.type===as?(k.map.depthTexture.compareFunction=ee?aa:ra,k.map.depthTexture.minFilter=At,k.map.depthTexture.magFilter=At):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=St,k.map.depthTexture.magFilter=St);k.camera.updateProjectionMatrix()}const le=k.map.isWebGLCubeRenderTarget?6:1;for(let Se=0;Se<le;Se++){if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,Se),i.clear();else{Se===0&&(i.setRenderTarget(k.map),i.clear());const ve=k.getViewport(Se);a.set(r.x*ve.x,r.y*ve.y,r.x*ve.z,r.y*ve.w),z.viewport(a)}if(H.isPointLight){const ve=k.camera,Ge=k.matrix,ke=H.distance||ve.far;ke!==ve.far&&(ve.far=ke,ve.updateProjectionMatrix()),Ei.setFromMatrixPosition(H.matrixWorld),ve.position.copy(Ei),sr.copy(ve.position),sr.add(ag[Se]),ve.up.copy(og[Se]),ve.lookAt(sr),ve.updateMatrixWorld(),Ge.makeTranslation(-Ei.x,-Ei.y,-Ei.z),yo.multiplyMatrices(ve.projectionMatrix,ve.matrixWorldInverse),k._frustum.setFromProjectionMatrix(yo,ve.coordinateSystem,ve.reversedDepth)}else k.updateMatrices(H);n=k.getFrustum(),y(P,v,k.camera,H,this.type)}k.isPointLightShadow!==!0&&this.type===yi&&M(k,v),k.needsUpdate=!1}h=this.type,f.needsUpdate=!1,i.setRenderTarget(T,U,R)};function M(b,P){const v=e.update(E);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new tn(s.x,s.y,{format:Vn,type:mn})),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(P,null,v,u,E,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(P,null,v,m,E,null)}function A(b,P,v,T){let U=null;const R=v.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)U=R;else if(U=v.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const z=U.uuid,X=P.uuid;let j=c[z];j===void 0&&(j={},c[z]=j);let I=j[X];I===void 0&&(I=U.clone(),j[X]=I,P.addEventListener("dispose",D)),U=I}if(U.visible=P.visible,U.wireframe=P.wireframe,T===yi?U.side=P.shadowSide!==null?P.shadowSide:P.side:U.side=P.shadowSide!==null?P.shadowSide:p[P.side],U.alphaMap=P.alphaMap,U.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,U.map=P.map,U.clipShadows=P.clipShadows,U.clippingPlanes=P.clippingPlanes,U.clipIntersection=P.clipIntersection,U.displacementMap=P.displacementMap,U.displacementScale=P.displacementScale,U.displacementBias=P.displacementBias,U.wireframeLinewidth=P.wireframeLinewidth,U.linewidth=P.linewidth,v.isPointLight===!0&&U.isMeshDistanceMaterial===!0){const z=i.properties.get(U);z.light=v}return U}function y(b,P,v,T,U){if(b.visible===!1)return;if(b.layers.test(P.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&U===yi)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,b.matrixWorld);const X=e.update(b),j=b.material;if(Array.isArray(j)){const I=X.groups;for(let H=0,k=I.length;H<k;H++){const J=I[H],ee=j[J.materialIndex];if(ee&&ee.visible){const le=A(b,ee,T,U);b.onBeforeShadow(i,b,P,v,X,le,J),i.renderBufferDirect(v,null,X,le,b,J),b.onAfterShadow(i,b,P,v,X,le,J)}}}else if(j.visible){const I=A(b,j,T,U);b.onBeforeShadow(i,b,P,v,X,I,null),i.renderBufferDirect(v,null,X,I,b,null),b.onAfterShadow(i,b,P,v,X,I,null)}}const z=b.children;for(let X=0,j=z.length;X<j;X++)y(z[X],P,v,T,U)}function D(b){b.target.removeEventListener("dispose",D);for(const v in c){const T=c[v],U=b.target.uuid;U in T&&(T[U].dispose(),delete T[U])}}}function cg(i,e){function t(){let C=!1;const se=new pt;let q=null;const me=new pt(0,0,0,0);return{setMask:function(ae){q!==ae&&!C&&(i.colorMask(ae,ae,ae,ae),q=ae)},setLocked:function(ae){C=ae},setClear:function(ae,$,Ee,De,ht){ht===!0&&(ae*=De,$*=De,Ee*=De),se.set(ae,$,Ee,De),me.equals(se)===!1&&(i.clearColor(ae,$,Ee,De),me.copy(se))},reset:function(){C=!1,q=null,me.set(-1,0,0,0)}}}function n(){let C=!1,se=!1,q=null,me=null,ae=null;return{setReversed:function($){if(se!==$){const Ee=e.get("EXT_clip_control");$?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),se=$;const De=ae;ae=null,this.setClear(De)}},getReversed:function(){return se},setTest:function($){$?te(i.DEPTH_TEST):Te(i.DEPTH_TEST)},setMask:function($){q!==$&&!C&&(i.depthMask($),q=$)},setFunc:function($){if(se&&($=Vu[$]),me!==$){switch($){case lr:i.depthFunc(i.NEVER);break;case cr:i.depthFunc(i.ALWAYS);break;case ur:i.depthFunc(i.LESS);break;case ui:i.depthFunc(i.LEQUAL);break;case hr:i.depthFunc(i.EQUAL);break;case dr:i.depthFunc(i.GEQUAL);break;case fr:i.depthFunc(i.GREATER);break;case pr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=$}},setLocked:function($){C=$},setClear:function($){ae!==$&&(ae=$,se&&($=1-$),i.clearDepth($))},reset:function(){C=!1,q=null,me=null,ae=null,se=!1}}}function s(){let C=!1,se=null,q=null,me=null,ae=null,$=null,Ee=null,De=null,ht=null;return{setTest:function($e){C||($e?te(i.STENCIL_TEST):Te(i.STENCIL_TEST))},setMask:function($e){se!==$e&&!C&&(i.stencilMask($e),se=$e)},setFunc:function($e,sn,qt){(q!==$e||me!==sn||ae!==qt)&&(i.stencilFunc($e,sn,qt),q=$e,me=sn,ae=qt)},setOp:function($e,sn,qt){($!==$e||Ee!==sn||De!==qt)&&(i.stencilOp($e,sn,qt),$=$e,Ee=sn,De=qt)},setLocked:function($e){C=$e},setClear:function($e){ht!==$e&&(i.clearStencil($e),ht=$e)},reset:function(){C=!1,se=null,q=null,me=null,ae=null,$=null,Ee=null,De=null,ht=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let d={},p={},u={},m=new WeakMap,_=[],E=null,f=!1,h=null,M=null,A=null,y=null,D=null,b=null,P=null,v=new Ze(0,0,0),T=0,U=!1,R=null,z=null,X=null,j=null,I=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,J=0;const ee=i.getParameter(i.VERSION);ee.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(ee)[1]),k=J>=1):ee.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),k=J>=2);let le=null,Se={};const ve=i.getParameter(i.SCISSOR_BOX),Ge=i.getParameter(i.VIEWPORT),ke=new pt().fromArray(ve),Ce=new pt().fromArray(Ge);function K(C,se,q,me){const ae=new Uint8Array(4),$=i.createTexture();i.bindTexture(C,$),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ee=0;Ee<q;Ee++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(se+Ee,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return $}const ce={};ce[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),ce[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ce[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(i.DEPTH_TEST),a.setFunc(ui),ut(!1),at(Ta),te(i.CULL_FACE),Qe(dn);function te(C){d[C]!==!0&&(i.enable(C),d[C]=!0)}function Te(C){d[C]!==!1&&(i.disable(C),d[C]=!1)}function we(C,se){return u[C]!==se?(i.bindFramebuffer(C,se),u[C]=se,C===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),C===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function Ae(C,se){let q=_,me=!1;if(C){q=m.get(se),q===void 0&&(q=[],m.set(se,q));const ae=C.textures;if(q.length!==ae.length||q[0]!==i.COLOR_ATTACHMENT0){for(let $=0,Ee=ae.length;$<Ee;$++)q[$]=i.COLOR_ATTACHMENT0+$;q.length=ae.length,me=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,me=!0);me&&i.drawBuffers(q)}function rt(C){return E!==C?(i.useProgram(C),E=C,!0):!1}const Fe={[On]:i.FUNC_ADD,[hu]:i.FUNC_SUBTRACT,[du]:i.FUNC_REVERSE_SUBTRACT};Fe[fu]=i.MIN,Fe[pu]=i.MAX;const Ye={[mu]:i.ZERO,[gu]:i.ONE,[_u]:i.SRC_COLOR,[ar]:i.SRC_ALPHA,[bu]:i.SRC_ALPHA_SATURATE,[Mu]:i.DST_COLOR,[vu]:i.DST_ALPHA,[xu]:i.ONE_MINUS_SRC_COLOR,[or]:i.ONE_MINUS_SRC_ALPHA,[Eu]:i.ONE_MINUS_DST_COLOR,[Su]:i.ONE_MINUS_DST_ALPHA,[yu]:i.CONSTANT_COLOR,[Tu]:i.ONE_MINUS_CONSTANT_COLOR,[Au]:i.CONSTANT_ALPHA,[wu]:i.ONE_MINUS_CONSTANT_ALPHA};function Qe(C,se,q,me,ae,$,Ee,De,ht,$e){if(C===dn){f===!0&&(Te(i.BLEND),f=!1);return}if(f===!1&&(te(i.BLEND),f=!0),C!==uu){if(C!==h||$e!==U){if((M!==On||D!==On)&&(i.blendEquation(i.FUNC_ADD),M=On,D=On),$e)switch(C){case li:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rr:i.blendFunc(i.ONE,i.ONE);break;case Aa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wa:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Xe("WebGLState: Invalid blending: ",C);break}else switch(C){case li:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Aa:Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wa:Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xe("WebGLState: Invalid blending: ",C);break}A=null,y=null,b=null,P=null,v.set(0,0,0),T=0,h=C,U=$e}return}ae=ae||se,$=$||q,Ee=Ee||me,(se!==M||ae!==D)&&(i.blendEquationSeparate(Fe[se],Fe[ae]),M=se,D=ae),(q!==A||me!==y||$!==b||Ee!==P)&&(i.blendFuncSeparate(Ye[q],Ye[me],Ye[$],Ye[Ee]),A=q,y=me,b=$,P=Ee),(De.equals(v)===!1||ht!==T)&&(i.blendColor(De.r,De.g,De.b,ht),v.copy(De),T=ht),h=C,U=!1}function Oe(C,se){C.side===un?Te(i.CULL_FACE):te(i.CULL_FACE);let q=C.side===Pt;se&&(q=!q),ut(q),C.blending===li&&C.transparent===!1?Qe(dn):Qe(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);const me=C.stencilWrite;o.setTest(me),me&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),N(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):Te(i.SAMPLE_ALPHA_TO_COVERAGE)}function ut(C){R!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),R=C)}function at(C){C!==ou?(te(i.CULL_FACE),C!==z&&(C===Ta?i.cullFace(i.BACK):C===lu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Te(i.CULL_FACE),z=C}function Mt(C){C!==X&&(k&&i.lineWidth(C),X=C)}function N(C,se,q){C?(te(i.POLYGON_OFFSET_FILL),(j!==se||I!==q)&&(j=se,I=q,a.getReversed()&&(se=-se),i.polygonOffset(se,q))):Te(i.POLYGON_OFFSET_FILL)}function ot(C){C?te(i.SCISSOR_TEST):Te(i.SCISSOR_TEST)}function ze(C){C===void 0&&(C=i.TEXTURE0+H-1),le!==C&&(i.activeTexture(C),le=C)}function it(C,se,q){q===void 0&&(le===null?q=i.TEXTURE0+H-1:q=le);let me=Se[q];me===void 0&&(me={type:void 0,texture:void 0},Se[q]=me),(me.type!==C||me.texture!==se)&&(le!==q&&(i.activeTexture(q),le=q),i.bindTexture(C,se||ce[C]),me.type=C,me.texture=se)}function ue(){const C=Se[le];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function lt(){try{i.compressedTexImage2D(...arguments)}catch(C){Xe("WebGLState:",C)}}function S(){try{i.compressedTexImage3D(...arguments)}catch(C){Xe("WebGLState:",C)}}function g(){try{i.texSubImage2D(...arguments)}catch(C){Xe("WebGLState:",C)}}function F(){try{i.texSubImage3D(...arguments)}catch(C){Xe("WebGLState:",C)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(C){Xe("WebGLState:",C)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(C){Xe("WebGLState:",C)}}function ne(){try{i.texStorage2D(...arguments)}catch(C){Xe("WebGLState:",C)}}function oe(){try{i.texStorage3D(...arguments)}catch(C){Xe("WebGLState:",C)}}function W(){try{i.texImage2D(...arguments)}catch(C){Xe("WebGLState:",C)}}function Z(){try{i.texImage3D(...arguments)}catch(C){Xe("WebGLState:",C)}}function pe(C){return p[C]!==void 0?p[C]:i.getParameter(C)}function _e(C,se){p[C]!==se&&(i.pixelStorei(C,se),p[C]=se)}function re(C){ke.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),ke.copy(C))}function ie(C){Ce.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),Ce.copy(C))}function Pe(C,se){let q=c.get(se);q===void 0&&(q=new WeakMap,c.set(se,q));let me=q.get(C);me===void 0&&(me=i.getUniformBlockIndex(se,C.name),q.set(C,me))}function Ue(C,se){const me=c.get(se).get(C);l.get(se)!==me&&(i.uniformBlockBinding(se,me,C.__bindingPointIndex),l.set(se,me))}function je(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},p={},le=null,Se={},u={},m=new WeakMap,_=[],E=null,f=!1,h=null,M=null,A=null,y=null,D=null,b=null,P=null,v=new Ze(0,0,0),T=0,U=!1,R=null,z=null,X=null,j=null,I=null,ke.set(0,0,i.canvas.width,i.canvas.height),Ce.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:te,disable:Te,bindFramebuffer:we,drawBuffers:Ae,useProgram:rt,setBlending:Qe,setMaterial:Oe,setFlipSided:ut,setCullFace:at,setLineWidth:Mt,setPolygonOffset:N,setScissorTest:ot,activeTexture:ze,bindTexture:it,unbindTexture:ue,compressedTexImage2D:lt,compressedTexImage3D:S,texImage2D:W,texImage3D:Z,pixelStorei:_e,getParameter:pe,updateUBOMapping:Pe,uniformBlockBinding:Ue,texStorage2D:ne,texStorage3D:oe,texSubImage2D:g,texSubImage3D:F,compressedTexSubImage2D:Y,compressedTexSubImage3D:Q,scissor:re,viewport:ie,reset:je}}function ug(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qe,d=new WeakMap,p=new Set;let u;const m=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(S,g){return _?new OffscreenCanvas(S,g):_s("canvas")}function f(S,g,F){let Y=1;const Q=lt(S);if((Q.width>F||Q.height>F)&&(Y=F/Math.max(Q.width,Q.height)),Y<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){const ne=Math.floor(Y*Q.width),oe=Math.floor(Y*Q.height);u===void 0&&(u=E(ne,oe));const W=g?E(ne,oe):u;return W.width=ne,W.height=oe,W.getContext("2d").drawImage(S,0,0,ne,oe),Re("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ne+"x"+oe+")."),W}else return"data"in S&&Re("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),S;return S}function h(S){return S.generateMipmaps}function M(S){i.generateMipmap(S)}function A(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(S,g,F,Y,Q,ne=!1){if(S!==null){if(i[S]!==void 0)return i[S];Re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let oe;Y&&(oe=e.get("EXT_texture_norm16"),oe||Re("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let W=g;if(g===i.RED&&(F===i.FLOAT&&(W=i.R32F),F===i.HALF_FLOAT&&(W=i.R16F),F===i.UNSIGNED_BYTE&&(W=i.R8),F===i.UNSIGNED_SHORT&&oe&&(W=oe.R16_EXT),F===i.SHORT&&oe&&(W=oe.R16_SNORM_EXT)),g===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.R8UI),F===i.UNSIGNED_SHORT&&(W=i.R16UI),F===i.UNSIGNED_INT&&(W=i.R32UI),F===i.BYTE&&(W=i.R8I),F===i.SHORT&&(W=i.R16I),F===i.INT&&(W=i.R32I)),g===i.RG&&(F===i.FLOAT&&(W=i.RG32F),F===i.HALF_FLOAT&&(W=i.RG16F),F===i.UNSIGNED_BYTE&&(W=i.RG8),F===i.UNSIGNED_SHORT&&oe&&(W=oe.RG16_EXT),F===i.SHORT&&oe&&(W=oe.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RG8UI),F===i.UNSIGNED_SHORT&&(W=i.RG16UI),F===i.UNSIGNED_INT&&(W=i.RG32UI),F===i.BYTE&&(W=i.RG8I),F===i.SHORT&&(W=i.RG16I),F===i.INT&&(W=i.RG32I)),g===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RGB8UI),F===i.UNSIGNED_SHORT&&(W=i.RGB16UI),F===i.UNSIGNED_INT&&(W=i.RGB32UI),F===i.BYTE&&(W=i.RGB8I),F===i.SHORT&&(W=i.RGB16I),F===i.INT&&(W=i.RGB32I)),g===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),F===i.UNSIGNED_INT&&(W=i.RGBA32UI),F===i.BYTE&&(W=i.RGBA8I),F===i.SHORT&&(W=i.RGBA16I),F===i.INT&&(W=i.RGBA32I)),g===i.RGB&&(F===i.UNSIGNED_SHORT&&oe&&(W=oe.RGB16_EXT),F===i.SHORT&&oe&&(W=oe.RGB16_SNORM_EXT),F===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(W=i.R11F_G11F_B10F)),g===i.RGBA){const Z=ne?ms:He.getTransfer(Q);F===i.FLOAT&&(W=i.RGBA32F),F===i.HALF_FLOAT&&(W=i.RGBA16F),F===i.UNSIGNED_BYTE&&(W=Z===Ke?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT&&oe&&(W=oe.RGBA16_EXT),F===i.SHORT&&oe&&(W=oe.RGBA16_SNORM_EXT),F===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function D(S,g){let F;return S?g===null||g===nn||g===wi?F=i.DEPTH24_STENCIL8:g===Jt?F=i.DEPTH32F_STENCIL8:g===Ai&&(F=i.DEPTH24_STENCIL8,Re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===nn||g===wi?F=i.DEPTH_COMPONENT24:g===Jt?F=i.DEPTH_COMPONENT32F:g===Ai&&(F=i.DEPTH_COMPONENT16),F}function b(S,g){return h(S)===!0||S.isFramebufferTexture&&S.minFilter!==St&&S.minFilter!==At?Math.log2(Math.max(g.width,g.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?g.mipmaps.length:1}function P(S){const g=S.target;g.removeEventListener("dispose",P),T(g),g.isVideoTexture&&d.delete(g),g.isHTMLTexture&&p.delete(g)}function v(S){const g=S.target;g.removeEventListener("dispose",v),R(g)}function T(S){const g=n.get(S);if(g.__webglInit===void 0)return;const F=S.source,Y=m.get(F);if(Y){const Q=Y[g.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&U(S),Object.keys(Y).length===0&&m.delete(F)}n.remove(S)}function U(S){const g=n.get(S);i.deleteTexture(g.__webglTexture);const F=S.source,Y=m.get(F);delete Y[g.__cacheKey],a.memory.textures--}function R(S){const g=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(g.__webglFramebuffer[Y]))for(let Q=0;Q<g.__webglFramebuffer[Y].length;Q++)i.deleteFramebuffer(g.__webglFramebuffer[Y][Q]);else i.deleteFramebuffer(g.__webglFramebuffer[Y]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[Y])}else{if(Array.isArray(g.__webglFramebuffer))for(let Y=0;Y<g.__webglFramebuffer.length;Y++)i.deleteFramebuffer(g.__webglFramebuffer[Y]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let Y=0;Y<g.__webglColorRenderbuffer.length;Y++)g.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[Y]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const F=S.textures;for(let Y=0,Q=F.length;Y<Q;Y++){const ne=n.get(F[Y]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(F[Y])}n.remove(S)}let z=0;function X(){z=0}function j(){return z}function I(S){z=S}function H(){const S=z;return S>=s.maxTextures&&Re("WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),z+=1,S}function k(S){const g=[];return g.push(S.wrapS),g.push(S.wrapT),g.push(S.wrapR||0),g.push(S.magFilter),g.push(S.minFilter),g.push(S.anisotropy),g.push(S.internalFormat),g.push(S.format),g.push(S.type),g.push(S.generateMipmaps),g.push(S.premultiplyAlpha),g.push(S.flipY),g.push(S.unpackAlignment),g.push(S.colorSpace),g.join()}function J(S,g){const F=n.get(S);if(S.isVideoTexture&&it(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&F.__version!==S.version){const Y=S.image;if(Y===null)Re("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Re("WebGLRenderer: Texture marked for update but image is incomplete");else{Te(F,S,g);return}}else S.isExternalTexture&&(F.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+g)}function ee(S,g){const F=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&F.__version!==S.version){Te(F,S,g);return}else S.isExternalTexture&&(F.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+g)}function le(S,g){const F=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&F.__version!==S.version){Te(F,S,g);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+g)}function Se(S,g){const F=n.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&F.__version!==S.version){we(F,S,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+g)}const ve={[mr]:i.REPEAT,[hn]:i.CLAMP_TO_EDGE,[gr]:i.MIRRORED_REPEAT},Ge={[St]:i.NEAREST,[Pu]:i.NEAREST_MIPMAP_NEAREST,[Ui]:i.NEAREST_MIPMAP_LINEAR,[At]:i.LINEAR,[Rs]:i.LINEAR_MIPMAP_NEAREST,[zn]:i.LINEAR_MIPMAP_LINEAR},ke={[Lu]:i.NEVER,[Bu]:i.ALWAYS,[Uu]:i.LESS,[ra]:i.LEQUAL,[Iu]:i.EQUAL,[aa]:i.GEQUAL,[Fu]:i.GREATER,[Ou]:i.NOTEQUAL};function Ce(S,g){if(g.type===Jt&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===At||g.magFilter===Rs||g.magFilter===Ui||g.magFilter===zn||g.minFilter===At||g.minFilter===Rs||g.minFilter===Ui||g.minFilter===zn)&&Re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,ve[g.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,ve[g.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,ve[g.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,Ge[g.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,Ge[g.minFilter]),g.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,ke[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===St||g.minFilter!==Ui&&g.minFilter!==zn||g.type===Jt&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(S,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function K(S,g){let F=!1;S.__webglInit===void 0&&(S.__webglInit=!0,g.addEventListener("dispose",P));const Y=g.source;let Q=m.get(Y);Q===void 0&&(Q={},m.set(Y,Q));const ne=k(g);if(ne!==S.__cacheKey){Q[ne]===void 0&&(Q[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Q[ne].usedTimes++;const oe=Q[S.__cacheKey];oe!==void 0&&(Q[S.__cacheKey].usedTimes--,oe.usedTimes===0&&U(g)),S.__cacheKey=ne,S.__webglTexture=Q[ne].texture}return F}function ce(S,g,F){return Math.floor(Math.floor(S/F)/g)}function te(S,g,F,Y){const ne=S.updateRanges;if(ne.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,F,Y,g.data);else{ne.sort((_e,re)=>_e.start-re.start);let oe=0;for(let _e=1;_e<ne.length;_e++){const re=ne[oe],ie=ne[_e],Pe=re.start+re.count,Ue=ce(ie.start,g.width,4),je=ce(re.start,g.width,4);ie.start<=Pe+1&&Ue===je&&ce(ie.start+ie.count-1,g.width,4)===Ue?re.count=Math.max(re.count,ie.start+ie.count-re.start):(++oe,ne[oe]=ie)}ne.length=oe+1;const W=t.getParameter(i.UNPACK_ROW_LENGTH),Z=t.getParameter(i.UNPACK_SKIP_PIXELS),pe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let _e=0,re=ne.length;_e<re;_e++){const ie=ne[_e],Pe=Math.floor(ie.start/4),Ue=Math.ceil(ie.count/4),je=Pe%g.width,C=Math.floor(Pe/g.width),se=Ue,q=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,je),t.pixelStorei(i.UNPACK_SKIP_ROWS,C),t.texSubImage2D(i.TEXTURE_2D,0,je,C,se,q,F,Y,g.data)}S.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,W),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(i.UNPACK_SKIP_ROWS,pe)}}function Te(S,g,F){let Y=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(Y=i.TEXTURE_3D);const Q=K(S,g),ne=g.source;t.bindTexture(Y,S.__webglTexture,i.TEXTURE0+F);const oe=n.get(ne);if(ne.version!==oe.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+F),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){const q=He.getPrimaries(He.workingColorSpace),me=g.colorSpace===Rn?null:He.getPrimaries(g.colorSpace),ae=g.colorSpace===Rn||q===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae)}t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let Z=f(g.image,!1,s.maxTextureSize);Z=ue(g,Z);const pe=r.convert(g.format,g.colorSpace),_e=r.convert(g.type);let re=y(g.internalFormat,pe,_e,g.normalized,g.colorSpace,g.isVideoTexture);Ce(Y,g);let ie;const Pe=g.mipmaps,Ue=g.isVideoTexture!==!0,je=oe.__version===void 0||Q===!0,C=ne.dataReady,se=b(g,Z);if(g.isDepthTexture)re=D(g.format===Gn,g.type),je&&(Ue?t.texStorage2D(i.TEXTURE_2D,1,re,Z.width,Z.height):t.texImage2D(i.TEXTURE_2D,0,re,Z.width,Z.height,0,pe,_e,null));else if(g.isDataTexture)if(Pe.length>0){Ue&&je&&t.texStorage2D(i.TEXTURE_2D,se,re,Pe[0].width,Pe[0].height);for(let q=0,me=Pe.length;q<me;q++)ie=Pe[q],Ue?C&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ie.width,ie.height,pe,_e,ie.data):t.texImage2D(i.TEXTURE_2D,q,re,ie.width,ie.height,0,pe,_e,ie.data);g.generateMipmaps=!1}else Ue?(je&&t.texStorage2D(i.TEXTURE_2D,se,re,Z.width,Z.height),C&&te(g,Z,pe,_e)):t.texImage2D(i.TEXTURE_2D,0,re,Z.width,Z.height,0,pe,_e,Z.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Ue&&je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,re,Pe[0].width,Pe[0].height,Z.depth);for(let q=0,me=Pe.length;q<me;q++)if(ie=Pe[q],g.format!==Wt)if(pe!==null)if(Ue){if(C)if(g.layerUpdates.size>0){const ae=eo(ie.width,ie.height,g.format,g.type);for(const $ of g.layerUpdates){const Ee=ie.data.subarray($*ae/ie.data.BYTES_PER_ELEMENT,($+1)*ae/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,$,ie.width,ie.height,1,pe,Ee)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ie.width,ie.height,Z.depth,pe,ie.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,re,ie.width,ie.height,Z.depth,0,ie.data,0,0);else Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?C&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ie.width,ie.height,Z.depth,pe,_e,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,re,ie.width,ie.height,Z.depth,0,pe,_e,ie.data)}else{Ue&&je&&t.texStorage2D(i.TEXTURE_2D,se,re,Pe[0].width,Pe[0].height);for(let q=0,me=Pe.length;q<me;q++)ie=Pe[q],g.format!==Wt?pe!==null?Ue?C&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,ie.width,ie.height,pe,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,q,re,ie.width,ie.height,0,ie.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?C&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ie.width,ie.height,pe,_e,ie.data):t.texImage2D(i.TEXTURE_2D,q,re,ie.width,ie.height,0,pe,_e,ie.data)}else if(g.isDataArrayTexture)if(Ue){if(je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,re,Z.width,Z.height,Z.depth),C)if(g.layerUpdates.size>0){const q=eo(Z.width,Z.height,g.format,g.type);for(const me of g.layerUpdates){const ae=Z.data.subarray(me*q/Z.data.BYTES_PER_ELEMENT,(me+1)*q/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,Z.width,Z.height,1,pe,_e,ae)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,pe,_e,Z.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,re,Z.width,Z.height,Z.depth,0,pe,_e,Z.data);else if(g.isData3DTexture)Ue?(je&&t.texStorage3D(i.TEXTURE_3D,se,re,Z.width,Z.height,Z.depth),C&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,pe,_e,Z.data)):t.texImage3D(i.TEXTURE_3D,0,re,Z.width,Z.height,Z.depth,0,pe,_e,Z.data);else if(g.isFramebufferTexture){if(je)if(Ue)t.texStorage2D(i.TEXTURE_2D,se,re,Z.width,Z.height);else{let q=Z.width,me=Z.height;for(let ae=0;ae<se;ae++)t.texImage2D(i.TEXTURE_2D,ae,re,q,me,0,pe,_e,null),q>>=1,me>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){const q=i.canvas;if(q.hasAttribute("layoutsubtree")||q.setAttribute("layoutsubtree","true"),Z.parentNode!==q){q.appendChild(Z),p.add(g),q.onpaint=De=>{const ht=De.changedElements;for(const $e of p)ht.includes($e.image)&&($e.needsUpdate=!0)},q.requestPaint();return}const me=0,ae=i.RGBA,$=i.RGBA,Ee=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,me,ae,$,Ee,Z),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(Ue&&je){const q=lt(Pe[0]);t.texStorage2D(i.TEXTURE_2D,se,re,q.width,q.height)}for(let q=0,me=Pe.length;q<me;q++)ie=Pe[q],Ue?C&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,pe,_e,ie):t.texImage2D(i.TEXTURE_2D,q,re,pe,_e,ie);g.generateMipmaps=!1}else if(Ue){if(je){const q=lt(Z);t.texStorage2D(i.TEXTURE_2D,se,re,q.width,q.height)}C&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,_e,Z)}else t.texImage2D(i.TEXTURE_2D,0,re,pe,_e,Z);h(g)&&M(Y),oe.__version=ne.version,g.onUpdate&&g.onUpdate(g)}S.__version=g.version}function we(S,g,F){if(g.image.length!==6)return;const Y=K(S,g),Q=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+F);const ne=n.get(Q);if(Q.version!==ne.__version||Y===!0){t.activeTexture(i.TEXTURE0+F);const oe=He.getPrimaries(He.workingColorSpace),W=g.colorSpace===Rn?null:He.getPrimaries(g.colorSpace),Z=g.colorSpace===Rn||oe===W?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const pe=g.isCompressedTexture||g.image[0].isCompressedTexture,_e=g.image[0]&&g.image[0].isDataTexture,re=[];for(let $=0;$<6;$++)!pe&&!_e?re[$]=f(g.image[$],!0,s.maxCubemapSize):re[$]=_e?g.image[$].image:g.image[$],re[$]=ue(g,re[$]);const ie=re[0],Pe=r.convert(g.format,g.colorSpace),Ue=r.convert(g.type),je=y(g.internalFormat,Pe,Ue,g.normalized,g.colorSpace),C=g.isVideoTexture!==!0,se=ne.__version===void 0||Y===!0,q=Q.dataReady;let me=b(g,ie);Ce(i.TEXTURE_CUBE_MAP,g);let ae;if(pe){C&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,je,ie.width,ie.height);for(let $=0;$<6;$++){ae=re[$].mipmaps;for(let Ee=0;Ee<ae.length;Ee++){const De=ae[Ee];g.format!==Wt?Pe!==null?C?q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee,0,0,De.width,De.height,Pe,De.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee,je,De.width,De.height,0,De.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):C?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee,0,0,De.width,De.height,Pe,Ue,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee,je,De.width,De.height,0,Pe,Ue,De.data)}}}else{if(ae=g.mipmaps,C&&se){ae.length>0&&me++;const $=lt(re[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,je,$.width,$.height)}for(let $=0;$<6;$++)if(_e){C?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,re[$].width,re[$].height,Pe,Ue,re[$].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,je,re[$].width,re[$].height,0,Pe,Ue,re[$].data);for(let Ee=0;Ee<ae.length;Ee++){const ht=ae[Ee].image[$].image;C?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee+1,0,0,ht.width,ht.height,Pe,Ue,ht.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee+1,je,ht.width,ht.height,0,Pe,Ue,ht.data)}}else{C?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Pe,Ue,re[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,je,Pe,Ue,re[$]);for(let Ee=0;Ee<ae.length;Ee++){const De=ae[Ee];C?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee+1,0,0,Pe,Ue,De.image[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee+1,je,Pe,Ue,De.image[$])}}}h(g)&&M(i.TEXTURE_CUBE_MAP),ne.__version=Q.version,g.onUpdate&&g.onUpdate(g)}S.__version=g.version}function Ae(S,g,F,Y,Q,ne){const oe=r.convert(F.format,F.colorSpace),W=r.convert(F.type),Z=y(F.internalFormat,oe,W,F.normalized,F.colorSpace),pe=n.get(g),_e=n.get(F);if(_e.__renderTarget=g,!pe.__hasExternalTextures){const re=Math.max(1,g.width>>ne),ie=Math.max(1,g.height>>ne);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,ne,Z,re,ie,g.depth,0,oe,W,null):t.texImage2D(Q,ne,Z,re,ie,0,oe,W,null)}t.bindFramebuffer(i.FRAMEBUFFER,S),ze(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,Q,_e.__webglTexture,0,ot(g)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,Q,_e.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function rt(S,g,F){if(i.bindRenderbuffer(i.RENDERBUFFER,S),g.depthBuffer){const Y=g.depthTexture,Q=Y&&Y.isDepthTexture?Y.type:null,ne=D(g.stencilBuffer,Q),oe=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ze(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot(g),ne,g.width,g.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot(g),ne,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,ne,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,S)}else{const Y=g.textures;for(let Q=0;Q<Y.length;Q++){const ne=Y[Q],oe=r.convert(ne.format,ne.colorSpace),W=r.convert(ne.type),Z=y(ne.internalFormat,oe,W,ne.normalized,ne.colorSpace);ze(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot(g),Z,g.width,g.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot(g),Z,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,Z,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Fe(S,g,F){const Y=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,S),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(g.depthTexture);if(Q.__renderTarget=g,(!Q.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),Y){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,g.depthTexture.addEventListener("dispose",P)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Ce(i.TEXTURE_CUBE_MAP,g.depthTexture);const pe=r.convert(g.depthTexture.format),_e=r.convert(g.depthTexture.type);let re;g.depthTexture.format===gn?re=i.DEPTH_COMPONENT24:g.depthTexture.format===Gn&&(re=i.DEPTH24_STENCIL8);for(let ie=0;ie<6;ie++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,re,g.width,g.height,0,pe,_e,null)}}else J(g.depthTexture,0);const ne=Q.__webglTexture,oe=ot(g),W=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+F:i.TEXTURE_2D,Z=g.depthTexture.format===Gn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===gn)ze(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,W,ne,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,Z,W,ne,0);else if(g.depthTexture.format===Gn)ze(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,W,ne,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,Z,W,ne,0);else throw new Error("Unknown depthTexture format")}function Ye(S){const g=n.get(S),F=S.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==S.depthTexture){const Y=S.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),Y){const Q=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,Y.removeEventListener("dispose",Q)};Y.addEventListener("dispose",Q),g.__depthDisposeCallback=Q}g.__boundDepthTexture=Y}if(S.depthTexture&&!g.__autoAllocateDepthBuffer)if(F)for(let Y=0;Y<6;Y++)Fe(g.__webglFramebuffer[Y],S,Y);else{const Y=S.texture.mipmaps;Y&&Y.length>0?Fe(g.__webglFramebuffer[0],S,0):Fe(g.__webglFramebuffer,S,0)}else if(F){g.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[Y]),g.__webglDepthbuffer[Y]===void 0)g.__webglDepthbuffer[Y]=i.createRenderbuffer(),rt(g.__webglDepthbuffer[Y],S,!1);else{const Q=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=g.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ne)}}else{const Y=S.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),rt(g.__webglDepthbuffer,S,!1);else{const Q=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ne)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Qe(S,g,F){const Y=n.get(S);g!==void 0&&Ae(Y.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Ye(S)}function Oe(S){const g=S.texture,F=n.get(S),Y=n.get(g);S.addEventListener("dispose",v);const Q=S.textures,ne=S.isWebGLCubeRenderTarget===!0,oe=Q.length>1;if(oe||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=g.version,a.memory.textures++),ne){F.__webglFramebuffer=[];for(let W=0;W<6;W++)if(g.mipmaps&&g.mipmaps.length>0){F.__webglFramebuffer[W]=[];for(let Z=0;Z<g.mipmaps.length;Z++)F.__webglFramebuffer[W][Z]=i.createFramebuffer()}else F.__webglFramebuffer[W]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){F.__webglFramebuffer=[];for(let W=0;W<g.mipmaps.length;W++)F.__webglFramebuffer[W]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(oe)for(let W=0,Z=Q.length;W<Z;W++){const pe=n.get(Q[W]);pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture(),a.memory.textures++)}if(S.samples>0&&ze(S)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let W=0;W<Q.length;W++){const Z=Q[W];F.__webglColorRenderbuffer[W]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[W]);const pe=r.convert(Z.format,Z.colorSpace),_e=r.convert(Z.type),re=y(Z.internalFormat,pe,_e,Z.normalized,Z.colorSpace,S.isXRRenderTarget===!0),ie=ot(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,re,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.RENDERBUFFER,F.__webglColorRenderbuffer[W])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),rt(F.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Ce(i.TEXTURE_CUBE_MAP,g);for(let W=0;W<6;W++)if(g.mipmaps&&g.mipmaps.length>0)for(let Z=0;Z<g.mipmaps.length;Z++)Ae(F.__webglFramebuffer[W][Z],S,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,Z);else Ae(F.__webglFramebuffer[W],S,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,0);h(g)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let W=0,Z=Q.length;W<Z;W++){const pe=Q[W],_e=n.get(pe);let re=i.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(re=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,_e.__webglTexture),Ce(re,pe),Ae(F.__webglFramebuffer,S,pe,i.COLOR_ATTACHMENT0+W,re,0),h(pe)&&M(re)}t.unbindTexture()}else{let W=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(W=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(W,Y.__webglTexture),Ce(W,g),g.mipmaps&&g.mipmaps.length>0)for(let Z=0;Z<g.mipmaps.length;Z++)Ae(F.__webglFramebuffer[Z],S,g,i.COLOR_ATTACHMENT0,W,Z);else Ae(F.__webglFramebuffer,S,g,i.COLOR_ATTACHMENT0,W,0);h(g)&&M(W),t.unbindTexture()}S.depthBuffer&&Ye(S)}function ut(S){const g=S.textures;for(let F=0,Y=g.length;F<Y;F++){const Q=g[F];if(h(Q)){const ne=A(S),oe=n.get(Q).__webglTexture;t.bindTexture(ne,oe),M(ne),t.unbindTexture()}}}const at=[],Mt=[];function N(S){if(S.samples>0){if(ze(S)===!1){const g=S.textures,F=S.width,Y=S.height;let Q=i.COLOR_BUFFER_BIT;const ne=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(S),W=g.length>1;if(W)for(let pe=0;pe<g.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const Z=S.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let pe=0;pe<g.length;pe++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),W){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const _e=n.get(g[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,_e,0)}i.blitFramebuffer(0,0,F,Y,0,0,F,Y,Q,i.NEAREST),l===!0&&(at.length=0,Mt.length=0,at.push(i.COLOR_ATTACHMENT0+pe),S.depthBuffer&&S.resolveDepthBuffer===!1&&(at.push(ne),Mt.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Mt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,at))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),W)for(let pe=0;pe<g.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const _e=n.get(g[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,_e,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&l){const g=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function ot(S){return Math.min(s.maxSamples,S.samples)}function ze(S){const g=n.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function it(S){const g=a.render.frame;d.get(S)!==g&&(d.set(S,g),S.update())}function ue(S,g){const F=S.colorSpace,Y=S.format,Q=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||F!==ps&&F!==Rn&&(He.getTransfer(F)===Ke?(Y!==Wt||Q!==zt)&&Re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xe("WebGLTextures: Unsupported texture color space:",F)),g}function lt(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=X,this.getTextureUnits=j,this.setTextureUnits=I,this.setTexture2D=J,this.setTexture2DArray=ee,this.setTexture3D=le,this.setTextureCube=Se,this.rebindTextures=Qe,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=N,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=ze,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function hg(i,e){function t(n,s=Rn){let r;const a=He.getTransfer(s);if(n===zt)return i.UNSIGNED_BYTE;if(n===ea)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ta)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Go)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ho)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Bo)return i.BYTE;if(n===zo)return i.SHORT;if(n===Ai)return i.UNSIGNED_SHORT;if(n===Qr)return i.INT;if(n===nn)return i.UNSIGNED_INT;if(n===Jt)return i.FLOAT;if(n===mn)return i.HALF_FLOAT;if(n===Vo)return i.ALPHA;if(n===ko)return i.RGB;if(n===Wt)return i.RGBA;if(n===gn)return i.DEPTH_COMPONENT;if(n===Gn)return i.DEPTH_STENCIL;if(n===Wo)return i.RED;if(n===na)return i.RED_INTEGER;if(n===Vn)return i.RG;if(n===ia)return i.RG_INTEGER;if(n===sa)return i.RGBA_INTEGER;if(n===os||n===ls||n===cs||n===us)if(a===Ke)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===os)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===cs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===us)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===os)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ls)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===cs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===us)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===_r||n===xr||n===vr||n===Sr)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===_r)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===vr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Sr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Mr||n===Er||n===br||n===yr||n===Tr||n===ds||n===Ar)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Mr||n===Er)return a===Ke?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===br)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===yr)return r.COMPRESSED_R11_EAC;if(n===Tr)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ds)return r.COMPRESSED_RG11_EAC;if(n===Ar)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===wr||n===Rr||n===Cr||n===Pr||n===Nr||n===Dr||n===Lr||n===Ur||n===Ir||n===Fr||n===Or||n===Br||n===zr||n===Gr)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===wr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Rr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Cr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Pr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Nr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Dr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Lr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ur)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ir)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Or)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Br)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===zr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Gr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Hr||n===Vr||n===kr)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Hr)return a===Ke?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Vr)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===kr)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Wr||n===Xr||n===fs||n===jr)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Wr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Xr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===fs)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===jr)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===wi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const dg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class pg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new tl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Xt({vertexShader:dg,fragmentShader:fg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _n(new Ms(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mg extends Wn{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,p=null,u=null,m=null,_=null;const E=typeof XRWebGLBinding<"u",f=new pg,h={},M=t.getContextAttributes();let A=null,y=null;const D=[],b=[],P=new qe;let v=null;const T=new Bt;T.viewport=new pt;const U=new Bt;U.viewport=new pt;const R=[T,U],z=new yh;let X=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ce=D[K];return ce===void 0&&(ce=new Fs,D[K]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(K){let ce=D[K];return ce===void 0&&(ce=new Fs,D[K]=ce),ce.getGripSpace()},this.getHand=function(K){let ce=D[K];return ce===void 0&&(ce=new Fs,D[K]=ce),ce.getHandSpace()};function I(K){const ce=b.indexOf(K.inputSource);if(ce===-1)return;const te=D[ce];te!==void 0&&(te.update(K.inputSource,K.frame,c||a),te.dispatchEvent({type:K.type,data:K.inputSource}))}function H(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",k);for(let K=0;K<D.length;K++){const ce=b[K];ce!==null&&(b[K]=null,D[K].disconnect(ce))}X=null,j=null,f.reset();for(const K in h)delete h[K];e.setRenderTarget(A),m=null,u=null,p=null,s=null,y=null,Ce.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&Re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return p===null&&E&&(p=new XRWebGLBinding(s,t)),p},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",H),s.addEventListener("inputsourceschange",k),M.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(P),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,Te=null,we=null;M.depth&&(we=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=M.stencil?Gn:gn,Te=M.stencil?wi:nn);const Ae={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:r};p=this.getBinding(),u=p.createProjectionLayer(Ae),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new tn(u.textureWidth,u.textureHeight,{format:Wt,type:zt,depthTexture:new di(u.textureWidth,u.textureHeight,Te,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const te={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,te),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new tn(m.framebufferWidth,m.framebufferHeight,{format:Wt,type:zt,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ce.setContext(s),Ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function k(K){for(let ce=0;ce<K.removed.length;ce++){const te=K.removed[ce],Te=b.indexOf(te);Te>=0&&(b[Te]=null,D[Te].disconnect(te))}for(let ce=0;ce<K.added.length;ce++){const te=K.added[ce];let Te=b.indexOf(te);if(Te===-1){for(let Ae=0;Ae<D.length;Ae++)if(Ae>=b.length){b.push(te),Te=Ae;break}else if(b[Ae]===null){b[Ae]=te,Te=Ae;break}if(Te===-1)break}const we=D[Te];we&&we.connect(te)}}const J=new G,ee=new G;function le(K,ce,te){J.setFromMatrixPosition(ce.matrixWorld),ee.setFromMatrixPosition(te.matrixWorld);const Te=J.distanceTo(ee),we=ce.projectionMatrix.elements,Ae=te.projectionMatrix.elements,rt=we[14]/(we[10]-1),Fe=we[14]/(we[10]+1),Ye=(we[9]+1)/we[5],Qe=(we[9]-1)/we[5],Oe=(we[8]-1)/we[0],ut=(Ae[8]+1)/Ae[0],at=rt*Oe,Mt=rt*ut,N=Te/(-Oe+ut),ot=N*-Oe;if(ce.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ot),K.translateZ(N),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),we[10]===-1)K.projectionMatrix.copy(ce.projectionMatrix),K.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const ze=rt+N,it=Fe+N,ue=at-ot,lt=Mt+(Te-ot),S=Ye*Fe/it*ze,g=Qe*Fe/it*ze;K.projectionMatrix.makePerspective(ue,lt,S,g,ze,it),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Se(K,ce){ce===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ce.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let ce=K.near,te=K.far;f.texture!==null&&(f.depthNear>0&&(ce=f.depthNear),f.depthFar>0&&(te=f.depthFar)),z.near=U.near=T.near=ce,z.far=U.far=T.far=te,(X!==z.near||j!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),X=z.near,j=z.far),z.layers.mask=K.layers.mask|6,T.layers.mask=z.layers.mask&-5,U.layers.mask=z.layers.mask&-3;const Te=K.parent,we=z.cameras;Se(z,Te);for(let Ae=0;Ae<we.length;Ae++)Se(we[Ae],Te);we.length===2?le(z,T,U):z.projectionMatrix.copy(T.projectionMatrix),ve(K,z,Te)};function ve(K,ce,te){te===null?K.matrix.copy(ce.matrixWorld):(K.matrix.copy(te.matrixWorld),K.matrix.invert(),K.matrix.multiply(ce.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ce.projectionMatrix),K.projectionMatrixInverse.copy(ce.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Yr*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=K)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(z)},this.getCameraTexture=function(K){return h[K]};let Ge=null;function ke(K,ce){if(d=ce.getViewerPose(c||a),_=ce,d!==null){const te=d.views;m!==null&&(e.setRenderTargetFramebuffer(y,m.framebuffer),e.setRenderTarget(y));let Te=!1;te.length!==z.cameras.length&&(z.cameras.length=0,Te=!0);for(let Fe=0;Fe<te.length;Fe++){const Ye=te[Fe];let Qe=null;if(m!==null)Qe=m.getViewport(Ye);else{const ut=p.getViewSubImage(u,Ye);Qe=ut.viewport,Fe===0&&(e.setRenderTargetTextures(y,ut.colorTexture,ut.depthStencilTexture),e.setRenderTarget(y))}let Oe=R[Fe];Oe===void 0&&(Oe=new Bt,Oe.layers.enable(Fe),Oe.viewport=new pt,R[Fe]=Oe),Oe.matrix.fromArray(Ye.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(Ye.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),Fe===0&&(z.matrix.copy(Oe.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Te===!0&&z.cameras.push(Oe)}const we=s.enabledFeatures;if(we&&we.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&E){p=n.getBinding();const Fe=p.getDepthInformation(te[0]);Fe&&Fe.isValid&&Fe.texture&&f.init(Fe,s.renderState)}if(we&&we.includes("camera-access")&&E){e.state.unbindTexture(),p=n.getBinding();for(let Fe=0;Fe<te.length;Fe++){const Ye=te[Fe].camera;if(Ye){let Qe=h[Ye];Qe||(Qe=new tl,h[Ye]=Qe);const Oe=p.getCameraImage(Ye);Qe.sourceTexture=Oe}}}}for(let te=0;te<D.length;te++){const Te=b[te],we=D[te];Te!==null&&we!==void 0&&we.update(Te,ce,c||a)}Ge&&Ge(K,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),_=null}const Ce=new rl;Ce.setAnimationLoop(ke),this.setAnimationLoop=function(K){Ge=K},this.dispose=function(){}}}const gg=new gt,dl=new Ne;dl.set(-1,0,0,0,1,0,0,0,1);function _g(i,e){function t(f,h){f.matrixAutoUpdate===!0&&f.updateMatrix(),h.value.copy(f.matrix)}function n(f,h){h.color.getRGB(f.fogColor.value,nl(i)),h.isFog?(f.fogNear.value=h.near,f.fogFar.value=h.far):h.isFogExp2&&(f.fogDensity.value=h.density)}function s(f,h,M,A,y){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(f,h):h.isMeshLambertMaterial?(r(f,h),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(f,h),p(f,h)):h.isMeshPhongMaterial?(r(f,h),d(f,h),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(f,h),u(f,h),h.isMeshPhysicalMaterial&&m(f,h,y)):h.isMeshMatcapMaterial?(r(f,h),_(f,h)):h.isMeshDepthMaterial?r(f,h):h.isMeshDistanceMaterial?(r(f,h),E(f,h)):h.isMeshNormalMaterial?r(f,h):h.isLineBasicMaterial?(a(f,h),h.isLineDashedMaterial&&o(f,h)):h.isPointsMaterial?l(f,h,M,A):h.isSpriteMaterial?c(f,h):h.isShadowMaterial?(f.color.value.copy(h.color),f.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(f,h){f.opacity.value=h.opacity,h.color&&f.diffuse.value.copy(h.color),h.emissive&&f.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(f.map.value=h.map,t(h.map,f.mapTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,t(h.alphaMap,f.alphaMapTransform)),h.bumpMap&&(f.bumpMap.value=h.bumpMap,t(h.bumpMap,f.bumpMapTransform),f.bumpScale.value=h.bumpScale,h.side===Pt&&(f.bumpScale.value*=-1)),h.normalMap&&(f.normalMap.value=h.normalMap,t(h.normalMap,f.normalMapTransform),f.normalScale.value.copy(h.normalScale),h.side===Pt&&f.normalScale.value.negate()),h.displacementMap&&(f.displacementMap.value=h.displacementMap,t(h.displacementMap,f.displacementMapTransform),f.displacementScale.value=h.displacementScale,f.displacementBias.value=h.displacementBias),h.emissiveMap&&(f.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,f.emissiveMapTransform)),h.specularMap&&(f.specularMap.value=h.specularMap,t(h.specularMap,f.specularMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest);const M=e.get(h),A=M.envMap,y=M.envMapRotation;A&&(f.envMap.value=A,f.envMapRotation.value.setFromMatrix4(gg.makeRotationFromEuler(y)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(dl),f.reflectivity.value=h.reflectivity,f.ior.value=h.ior,f.refractionRatio.value=h.refractionRatio),h.lightMap&&(f.lightMap.value=h.lightMap,f.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,f.lightMapTransform)),h.aoMap&&(f.aoMap.value=h.aoMap,f.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,f.aoMapTransform))}function a(f,h){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,h.map&&(f.map.value=h.map,t(h.map,f.mapTransform))}function o(f,h){f.dashSize.value=h.dashSize,f.totalSize.value=h.dashSize+h.gapSize,f.scale.value=h.scale}function l(f,h,M,A){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,f.size.value=h.size*M,f.scale.value=A*.5,h.map&&(f.map.value=h.map,t(h.map,f.uvTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,t(h.alphaMap,f.alphaMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest)}function c(f,h){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,f.rotation.value=h.rotation,h.map&&(f.map.value=h.map,t(h.map,f.mapTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,t(h.alphaMap,f.alphaMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest)}function d(f,h){f.specular.value.copy(h.specular),f.shininess.value=Math.max(h.shininess,1e-4)}function p(f,h){h.gradientMap&&(f.gradientMap.value=h.gradientMap)}function u(f,h){f.metalness.value=h.metalness,h.metalnessMap&&(f.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,f.metalnessMapTransform)),f.roughness.value=h.roughness,h.roughnessMap&&(f.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,f.roughnessMapTransform)),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)}function m(f,h,M){f.ior.value=h.ior,h.sheen>0&&(f.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),f.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(f.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,f.sheenColorMapTransform)),h.sheenRoughnessMap&&(f.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,f.sheenRoughnessMapTransform))),h.clearcoat>0&&(f.clearcoat.value=h.clearcoat,f.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(f.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,f.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(f.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Pt&&f.clearcoatNormalScale.value.negate())),h.dispersion>0&&(f.dispersion.value=h.dispersion),h.iridescence>0&&(f.iridescence.value=h.iridescence,f.iridescenceIOR.value=h.iridescenceIOR,f.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(f.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,f.iridescenceMapTransform)),h.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),h.transmission>0&&(f.transmission.value=h.transmission,f.transmissionSamplerMap.value=M.texture,f.transmissionSamplerSize.value.set(M.width,M.height),h.transmissionMap&&(f.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,f.transmissionMapTransform)),f.thickness.value=h.thickness,h.thicknessMap&&(f.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=h.attenuationDistance,f.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(f.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(f.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=h.specularIntensity,f.specularColor.value.copy(h.specularColor),h.specularColorMap&&(f.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,f.specularColorMapTransform)),h.specularIntensityMap&&(f.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,f.specularIntensityMapTransform))}function _(f,h){h.matcap&&(f.matcap.value=h.matcap)}function E(f,h){const M=e.get(h).light;f.referencePosition.value.setFromMatrixPosition(M.matrixWorld),f.nearDistance.value=M.shadow.camera.near,f.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function xg(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,A){const y=A.program;n.uniformBlockBinding(M,y)}function c(M,A){let y=s[M.id];y===void 0&&(_(M),y=d(M),s[M.id]=y,M.addEventListener("dispose",f));const D=A.program;n.updateUBOMapping(M,D);const b=e.render.frame;r[M.id]!==b&&(u(M),r[M.id]=b)}function d(M){const A=p();M.__bindingPointIndex=A;const y=i.createBuffer(),D=M.__size,b=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,D,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,y),y}function p(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const A=s[M.id],y=M.uniforms,D=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let b=0,P=y.length;b<P;b++){const v=Array.isArray(y[b])?y[b]:[y[b]];for(let T=0,U=v.length;T<U;T++){const R=v[T];if(m(R,b,T,D)===!0){const z=R.__offset,X=Array.isArray(R.value)?R.value:[R.value];let j=0;for(let I=0;I<X.length;I++){const H=X[I],k=E(H);typeof H=="number"||typeof H=="boolean"?(R.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,z+j,R.__data)):H.isMatrix3?(R.__data[0]=H.elements[0],R.__data[1]=H.elements[1],R.__data[2]=H.elements[2],R.__data[3]=0,R.__data[4]=H.elements[3],R.__data[5]=H.elements[4],R.__data[6]=H.elements[5],R.__data[7]=0,R.__data[8]=H.elements[6],R.__data[9]=H.elements[7],R.__data[10]=H.elements[8],R.__data[11]=0):ArrayBuffer.isView(H)?R.__data.set(new H.constructor(H.buffer,H.byteOffset,R.__data.length)):(H.toArray(R.__data,j),j+=k.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(M,A,y,D){const b=M.value,P=A+"_"+y;if(D[P]===void 0)return typeof b=="number"||typeof b=="boolean"?D[P]=b:ArrayBuffer.isView(b)?D[P]=b.slice():D[P]=b.clone(),!0;{const v=D[P];if(typeof b=="number"||typeof b=="boolean"){if(v!==b)return D[P]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(v.equals(b)===!1)return v.copy(b),!0}}return!1}function _(M){const A=M.uniforms;let y=0;const D=16;for(let P=0,v=A.length;P<v;P++){const T=Array.isArray(A[P])?A[P]:[A[P]];for(let U=0,R=T.length;U<R;U++){const z=T[U],X=Array.isArray(z.value)?z.value:[z.value];for(let j=0,I=X.length;j<I;j++){const H=X[j],k=E(H),J=y%D,ee=J%k.boundary,le=J+ee;y+=ee,le!==0&&D-le<k.storage&&(y+=D-le),z.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=y,y+=k.storage}}}const b=y%D;return b>0&&(y+=D-b),M.__size=y,M.__cache={},this}function E(M){const A={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(A.boundary=4,A.storage=4):M.isVector2?(A.boundary=8,A.storage=8):M.isVector3||M.isColor?(A.boundary=16,A.storage=12):M.isVector4?(A.boundary=16,A.storage=16):M.isMatrix3?(A.boundary=48,A.storage=48):M.isMatrix4?(A.boundary=64,A.storage=64):M.isTexture?Re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(A.boundary=16,A.storage=M.byteLength):Re("WebGLRenderer: Unsupported uniform value type.",M),A}function f(M){const A=M.target;A.removeEventListener("dispose",f);const y=a.indexOf(A.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function h(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:h}}const vg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Zt=null;function Sg(){return Zt===null&&(Zt=new ch(vg,16,16,Vn,mn),Zt.name="DFG_LUT",Zt.minFilter=At,Zt.magFilter=At,Zt.wrapS=hn,Zt.wrapT=hn,Zt.generateMipmaps=!1,Zt.needsUpdate=!0),Zt}class Mg{constructor(e={}){const{canvas:t=Gu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:m=zt}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const E=m,f=new Set([sa,ia,na]),h=new Set([zt,nn,Ai,wi,ea,ta]),M=new Uint32Array(4),A=new Int32Array(4),y=new G;let D=null,b=null;const P=[],v=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=en,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const U=this;let R=!1,z=null;this._outputColorSpace=Ot;let X=0,j=0,I=null,H=-1,k=null;const J=new pt,ee=new pt;let le=null;const Se=new Ze(0);let ve=0,Ge=t.width,ke=t.height,Ce=1,K=null,ce=null;const te=new pt(0,0,Ge,ke),Te=new pt(0,0,Ge,ke);let we=!1;const Ae=new Qo;let rt=!1,Fe=!1;const Ye=new gt,Qe=new G,Oe=new pt,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let at=!1;function Mt(){return I===null?Ce:1}let N=n;function ot(x,L){return t.getContext(x,L)}try{const x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Jr}`),t.addEventListener("webglcontextlost",$,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",De,!1),N===null){const L="webgl2";if(N=ot(L,x),N===null)throw ot(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw Xe("WebGLRenderer: "+x.message),x}let ze,it,ue,lt,S,g,F,Y,Q,ne,oe,W,Z,pe,_e,re,ie,Pe,Ue,je,C,se,q;function me(){ze=new Sp(N),ze.init(),C=new hg(N,ze),it=new dp(N,ze,e,C),ue=new cg(N,ze),it.reversedDepthBuffer&&u&&ue.buffers.depth.setReversed(!0),lt=new bp(N),S=new Km,g=new ug(N,ze,ue,S,it,C,lt),F=new vp(U),Y=new Ah(N),se=new up(N,Y),Q=new Mp(N,Y,lt,se),ne=new Tp(N,Q,Y,se,lt),Pe=new yp(N,it,g),_e=new fp(S),oe=new Ym(U,F,ze,it,se,_e),W=new _g(U,S),Z=new $m,pe=new ig(ze),ie=new cp(U,F,ue,ne,_,l),re=new lg(U,ne,it),q=new xg(N,lt,it,ue),Ue=new hp(N,ze,lt),je=new Ep(N,ze,lt),lt.programs=oe.programs,U.capabilities=it,U.extensions=ze,U.properties=S,U.renderLists=Z,U.shadowMap=re,U.state=ue,U.info=lt}me(),E!==zt&&(T=new wp(E,t.width,t.height,s,r));const ae=new mg(U,N);this.xr=ae,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const x=ze.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=ze.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return Ce},this.setPixelRatio=function(x){x!==void 0&&(Ce=x,this.setSize(Ge,ke,!1))},this.getSize=function(x){return x.set(Ge,ke)},this.setSize=function(x,L,V=!0){if(ae.isPresenting){Re("WebGLRenderer: Can't change size while VR device is presenting.");return}Ge=x,ke=L,t.width=Math.floor(x*Ce),t.height=Math.floor(L*Ce),V===!0&&(t.style.width=x+"px",t.style.height=L+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,x,L)},this.getDrawingBufferSize=function(x){return x.set(Ge*Ce,ke*Ce).floor()},this.setDrawingBufferSize=function(x,L,V){Ge=x,ke=L,Ce=V,t.width=Math.floor(x*V),t.height=Math.floor(L*V),this.setViewport(0,0,x,L)},this.setEffects=function(x){if(E===zt){Xe("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let L=0;L<x.length;L++)if(x[L].isOutputPass===!0){Re("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(J)},this.getViewport=function(x){return x.copy(te)},this.setViewport=function(x,L,V,O){x.isVector4?te.set(x.x,x.y,x.z,x.w):te.set(x,L,V,O),ue.viewport(J.copy(te).multiplyScalar(Ce).round())},this.getScissor=function(x){return x.copy(Te)},this.setScissor=function(x,L,V,O){x.isVector4?Te.set(x.x,x.y,x.z,x.w):Te.set(x,L,V,O),ue.scissor(ee.copy(Te).multiplyScalar(Ce).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(x){ue.setScissorTest(we=x)},this.setOpaqueSort=function(x){K=x},this.setTransparentSort=function(x){ce=x},this.getClearColor=function(x){return x.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor(...arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha(...arguments)},this.clear=function(x=!0,L=!0,V=!0){let O=0;if(x){let B=!1;if(I!==null){const fe=I.texture.format;B=f.has(fe)}if(B){const fe=I.texture.type,xe=h.has(fe),de=ie.getClearColor(),Me=ie.getClearAlpha(),be=de.r,Le=de.g,Be=de.b;xe?(M[0]=be,M[1]=Le,M[2]=Be,M[3]=Me,N.clearBufferuiv(N.COLOR,0,M)):(A[0]=be,A[1]=Le,A[2]=Be,A[3]=Me,N.clearBufferiv(N.COLOR,0,A))}else O|=N.COLOR_BUFFER_BIT}L&&(O|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(O|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&N.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(x){x.setRenderer(this),z=x},this.dispose=function(){t.removeEventListener("webglcontextlost",$,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",De,!1),ie.dispose(),Z.dispose(),pe.dispose(),S.dispose(),F.dispose(),ne.dispose(),se.dispose(),q.dispose(),oe.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",pa),ae.removeEventListener("sessionend",ma),Nn.stop()};function $(x){x.preventDefault(),La("WebGLRenderer: Context Lost."),R=!0}function Ee(){La("WebGLRenderer: Context Restored."),R=!1;const x=lt.autoReset,L=re.enabled,V=re.autoUpdate,O=re.needsUpdate,B=re.type;me(),lt.autoReset=x,re.enabled=L,re.autoUpdate=V,re.needsUpdate=O,re.type=B}function De(x){Xe("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function ht(x){const L=x.target;L.removeEventListener("dispose",ht),$e(L)}function $e(x){sn(x),S.remove(x)}function sn(x){const L=S.get(x).programs;L!==void 0&&(L.forEach(function(V){oe.releaseProgram(V)}),x.isShaderMaterial&&oe.releaseShaderCache(x))}this.renderBufferDirect=function(x,L,V,O,B,fe){L===null&&(L=ut);const xe=B.isMesh&&B.matrixWorld.determinant()<0,de=xl(x,L,V,O,B);ue.setMaterial(O,xe);let Me=V.index,be=1;if(O.wireframe===!0){if(Me=Q.getWireframeAttribute(V),Me===void 0)return;be=2}const Le=V.drawRange,Be=V.attributes.position;let ye=Le.start*be,Je=(Le.start+Le.count)*be;fe!==null&&(ye=Math.max(ye,fe.start*be),Je=Math.min(Je,(fe.start+fe.count)*be)),Me!==null?(ye=Math.max(ye,0),Je=Math.min(Je,Me.count)):Be!=null&&(ye=Math.max(ye,0),Je=Math.min(Je,Be.count));const dt=Je-ye;if(dt<0||dt===1/0)return;se.setup(B,O,de,V,Me);let ct,et=Ue;if(Me!==null&&(ct=Y.get(Me),et=je,et.setIndex(ct)),B.isMesh)O.wireframe===!0?(ue.setLineWidth(O.wireframeLinewidth*Mt()),et.setMode(N.LINES)):et.setMode(N.TRIANGLES);else if(B.isLine){let Et=O.linewidth;Et===void 0&&(Et=1),ue.setLineWidth(Et*Mt()),B.isLineSegments?et.setMode(N.LINES):B.isLineLoop?et.setMode(N.LINE_LOOP):et.setMode(N.LINE_STRIP)}else B.isPoints?et.setMode(N.POINTS):B.isSprite&&et.setMode(N.TRIANGLES);if(B.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))et.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Et=B._multiDrawStarts,ge=B._multiDrawCounts,Dt=B._multiDrawCount,We=Me?Y.get(Me).bytesPerElement:1,It=S.get(O).currentProgram.getUniforms();for(let Yt=0;Yt<Dt;Yt++)It.setValue(N,"_gl_DrawID",Yt),et.render(Et[Yt]/We,ge[Yt])}else if(B.isInstancedMesh)et.renderInstances(ye,dt,B.count);else if(V.isInstancedBufferGeometry){const Et=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,ge=Math.min(V.instanceCount,Et);et.renderInstances(ye,dt,ge)}else et.render(ye,dt)};function qt(x,L,V){x.transparent===!0&&x.side===un&&x.forceSinglePass===!1?(x.side=Pt,x.needsUpdate=!0,Li(x,L,V),x.side=Pn,x.needsUpdate=!0,Li(x,L,V),x.side=un):Li(x,L,V)}this.compile=function(x,L,V=null){V===null&&(V=x),b=pe.get(V),b.init(L),v.push(b),V.traverseVisible(function(B){B.isLight&&B.layers.test(L.layers)&&(b.pushLight(B),B.castShadow&&b.pushShadow(B))}),x!==V&&x.traverseVisible(function(B){B.isLight&&B.layers.test(L.layers)&&(b.pushLight(B),B.castShadow&&b.pushShadow(B))}),b.setupLights();const O=new Set;return x.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const fe=B.material;if(fe)if(Array.isArray(fe))for(let xe=0;xe<fe.length;xe++){const de=fe[xe];qt(de,V,B),O.add(de)}else qt(fe,V,B),O.add(fe)}),b=v.pop(),O},this.compileAsync=function(x,L,V=null){const O=this.compile(x,L,V);return new Promise(B=>{function fe(){if(O.forEach(function(xe){S.get(xe).currentProgram.isReady()&&O.delete(xe)}),O.size===0){B(x);return}setTimeout(fe,10)}ze.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let ys=null;function gl(x){ys&&ys(x)}function pa(){Nn.stop()}function ma(){Nn.start()}const Nn=new rl;Nn.setAnimationLoop(gl),typeof self<"u"&&Nn.setContext(self),this.setAnimationLoop=function(x){ys=x,ae.setAnimationLoop(x),x===null?Nn.stop():Nn.start()},ae.addEventListener("sessionstart",pa),ae.addEventListener("sessionend",ma),this.render=function(x,L){if(L!==void 0&&L.isCamera!==!0){Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;z!==null&&z.renderStart(x,L);const V=ae.enabled===!0&&ae.isPresenting===!0,O=T!==null&&(I===null||V)&&T.begin(U,I);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(L),L=ae.getCamera()),x.isScene===!0&&x.onBeforeRender(U,x,L,I),b=pe.get(x,v.length),b.init(L),b.state.textureUnits=g.getTextureUnits(),v.push(b),Ye.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Ae.setFromProjectionMatrix(Ye,Qt,L.reversedDepth),Fe=this.localClippingEnabled,rt=_e.init(this.clippingPlanes,Fe),D=Z.get(x,P.length),D.init(),P.push(D),ae.enabled===!0&&ae.isPresenting===!0){const xe=U.xr.getDepthSensingMesh();xe!==null&&Ts(xe,L,-1/0,U.sortObjects)}Ts(x,L,0,U.sortObjects),D.finish(),U.sortObjects===!0&&D.sort(K,ce),at=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,at&&ie.addToRenderList(D,x),this.info.render.frame++,rt===!0&&_e.beginShadows();const B=b.state.shadowsArray;if(re.render(B,x,L),rt===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset(),(O&&T.hasRenderPass())===!1){const xe=D.opaque,de=D.transmissive;if(b.setupLights(),L.isArrayCamera){const Me=L.cameras;if(de.length>0)for(let be=0,Le=Me.length;be<Le;be++){const Be=Me[be];_a(xe,de,x,Be)}at&&ie.render(x);for(let be=0,Le=Me.length;be<Le;be++){const Be=Me[be];ga(D,x,Be,Be.viewport)}}else de.length>0&&_a(xe,de,x,L),at&&ie.render(x),ga(D,x,L)}I!==null&&j===0&&(g.updateMultisampleRenderTarget(I),g.updateRenderTargetMipmap(I)),O&&T.end(U),x.isScene===!0&&x.onAfterRender(U,x,L),se.resetDefaultState(),H=-1,k=null,v.pop(),v.length>0?(b=v[v.length-1],g.setTextureUnits(b.state.textureUnits),rt===!0&&_e.setGlobalState(U.clippingPlanes,b.state.camera)):b=null,P.pop(),P.length>0?D=P[P.length-1]:D=null,z!==null&&z.renderEnd()};function Ts(x,L,V,O){if(x.visible===!1)return;if(x.layers.test(L.layers)){if(x.isGroup)V=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(L);else if(x.isLightProbeGrid)b.pushLightProbeGrid(x);else if(x.isLight)b.pushLight(x),x.castShadow&&b.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||Ae.intersectsSprite(x)){O&&Oe.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Ye);const xe=ne.update(x),de=x.material;de.visible&&D.push(x,xe,de,V,Oe.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||Ae.intersectsObject(x))){const xe=ne.update(x),de=x.material;if(O&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Oe.copy(x.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),Oe.copy(xe.boundingSphere.center)),Oe.applyMatrix4(x.matrixWorld).applyMatrix4(Ye)),Array.isArray(de)){const Me=xe.groups;for(let be=0,Le=Me.length;be<Le;be++){const Be=Me[be],ye=de[Be.materialIndex];ye&&ye.visible&&D.push(x,xe,ye,V,Oe.z,Be)}}else de.visible&&D.push(x,xe,de,V,Oe.z,null)}}const fe=x.children;for(let xe=0,de=fe.length;xe<de;xe++)Ts(fe[xe],L,V,O)}function ga(x,L,V,O){const{opaque:B,transmissive:fe,transparent:xe}=x;b.setupLightsView(V),rt===!0&&_e.setGlobalState(U.clippingPlanes,V),O&&ue.viewport(J.copy(O)),B.length>0&&Di(B,L,V),fe.length>0&&Di(fe,L,V),xe.length>0&&Di(xe,L,V),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function _a(x,L,V,O){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[O.id]===void 0){const ye=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[O.id]=new tn(1,1,{generateMipmaps:!0,type:ye?mn:zt,minFilter:zn,samples:Math.max(4,it.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:He.workingColorSpace})}const fe=b.state.transmissionRenderTarget[O.id],xe=O.viewport||J;fe.setSize(xe.z*U.transmissionResolutionScale,xe.w*U.transmissionResolutionScale);const de=U.getRenderTarget(),Me=U.getActiveCubeFace(),be=U.getActiveMipmapLevel();U.setRenderTarget(fe),U.getClearColor(Se),ve=U.getClearAlpha(),ve<1&&U.setClearColor(16777215,.5),U.clear(),at&&ie.render(V);const Le=U.toneMapping;U.toneMapping=en;const Be=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),b.setupLightsView(O),rt===!0&&_e.setGlobalState(U.clippingPlanes,O),Di(x,V,O),g.updateMultisampleRenderTarget(fe),g.updateRenderTargetMipmap(fe),ze.has("WEBGL_multisampled_render_to_texture")===!1){let ye=!1;for(let Je=0,dt=L.length;Je<dt;Je++){const ct=L[Je],{object:et,geometry:Et,material:ge,group:Dt}=ct;if(ge.side===un&&et.layers.test(O.layers)){const We=ge.side;ge.side=Pt,ge.needsUpdate=!0,xa(et,V,O,Et,ge,Dt),ge.side=We,ge.needsUpdate=!0,ye=!0}}ye===!0&&(g.updateMultisampleRenderTarget(fe),g.updateRenderTargetMipmap(fe))}U.setRenderTarget(de,Me,be),U.setClearColor(Se,ve),Be!==void 0&&(O.viewport=Be),U.toneMapping=Le}function Di(x,L,V){const O=L.isScene===!0?L.overrideMaterial:null;for(let B=0,fe=x.length;B<fe;B++){const xe=x[B],{object:de,geometry:Me,group:be}=xe;let Le=xe.material;Le.allowOverride===!0&&O!==null&&(Le=O),de.layers.test(V.layers)&&xa(de,L,V,Me,Le,be)}}function xa(x,L,V,O,B,fe){x.onBeforeRender(U,L,V,O,B,fe),x.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),B.onBeforeRender(U,L,V,O,x,fe),B.transparent===!0&&B.side===un&&B.forceSinglePass===!1?(B.side=Pt,B.needsUpdate=!0,U.renderBufferDirect(V,L,O,B,x,fe),B.side=Pn,B.needsUpdate=!0,U.renderBufferDirect(V,L,O,B,x,fe),B.side=un):U.renderBufferDirect(V,L,O,B,x,fe),x.onAfterRender(U,L,V,O,B,fe)}function Li(x,L,V){L.isScene!==!0&&(L=ut);const O=S.get(x),B=b.state.lights,fe=b.state.shadowsArray,xe=B.state.version,de=oe.getParameters(x,B.state,fe,L,V,b.state.lightProbeGridArray),Me=oe.getProgramCacheKey(de);let be=O.programs;O.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?L.environment:null,O.fog=L.fog;const Le=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;O.envMap=F.get(x.envMap||O.environment,Le),O.envMapRotation=O.environment!==null&&x.envMap===null?L.environmentRotation:x.envMapRotation,be===void 0&&(x.addEventListener("dispose",ht),be=new Map,O.programs=be);let Be=be.get(Me);if(Be!==void 0){if(O.currentProgram===Be&&O.lightsStateVersion===xe)return Sa(x,de),Be}else de.uniforms=oe.getUniforms(x),z!==null&&x.isNodeMaterial&&z.build(x,V,de),x.onBeforeCompile(de,U),Be=oe.acquireProgram(de,Me),be.set(Me,Be),O.uniforms=de.uniforms;const ye=O.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(ye.clippingPlanes=_e.uniform),Sa(x,de),O.needsLights=Sl(x),O.lightsStateVersion=xe,O.needsLights&&(ye.ambientLightColor.value=B.state.ambient,ye.lightProbe.value=B.state.probe,ye.directionalLights.value=B.state.directional,ye.directionalLightShadows.value=B.state.directionalShadow,ye.spotLights.value=B.state.spot,ye.spotLightShadows.value=B.state.spotShadow,ye.rectAreaLights.value=B.state.rectArea,ye.ltc_1.value=B.state.rectAreaLTC1,ye.ltc_2.value=B.state.rectAreaLTC2,ye.pointLights.value=B.state.point,ye.pointLightShadows.value=B.state.pointShadow,ye.hemisphereLights.value=B.state.hemi,ye.directionalShadowMatrix.value=B.state.directionalShadowMatrix,ye.spotLightMatrix.value=B.state.spotLightMatrix,ye.spotLightMap.value=B.state.spotLightMap,ye.pointShadowMatrix.value=B.state.pointShadowMatrix),O.lightProbeGrid=b.state.lightProbeGridArray.length>0,O.currentProgram=Be,O.uniformsList=null,Be}function va(x){if(x.uniformsList===null){const L=x.currentProgram.getUniforms();x.uniformsList=hs.seqWithValue(L.seq,x.uniforms)}return x.uniformsList}function Sa(x,L){const V=S.get(x);V.outputColorSpace=L.outputColorSpace,V.batching=L.batching,V.batchingColor=L.batchingColor,V.instancing=L.instancing,V.instancingColor=L.instancingColor,V.instancingMorph=L.instancingMorph,V.skinning=L.skinning,V.morphTargets=L.morphTargets,V.morphNormals=L.morphNormals,V.morphColors=L.morphColors,V.morphTargetsCount=L.morphTargetsCount,V.numClippingPlanes=L.numClippingPlanes,V.numIntersection=L.numClipIntersection,V.vertexAlphas=L.vertexAlphas,V.vertexTangents=L.vertexTangents,V.toneMapping=L.toneMapping}function _l(x,L){if(x.length===0)return null;if(x.length===1)return x[0].texture!==null?x[0]:null;y.setFromMatrixPosition(L.matrixWorld);for(let V=0,O=x.length;V<O;V++){const B=x[V];if(B.texture!==null&&B.boundingBox.containsPoint(y))return B}return null}function xl(x,L,V,O,B){L.isScene!==!0&&(L=ut),g.resetTextureUnits();const fe=L.fog,xe=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?L.environment:null,de=I===null?U.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:He.workingColorSpace,Me=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,be=F.get(O.envMap||xe,Me),Le=O.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Be=!!V.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),ye=!!V.morphAttributes.position,Je=!!V.morphAttributes.normal,dt=!!V.morphAttributes.color;let ct=en;O.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ct=U.toneMapping);const et=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Et=et!==void 0?et.length:0,ge=S.get(O),Dt=b.state.lights;if(rt===!0&&(Fe===!0||x!==k)){const st=x===k&&O.id===H;_e.setState(O,x,st)}let We=!1;O.version===ge.__version?(ge.needsLights&&ge.lightsStateVersion!==Dt.state.version||ge.outputColorSpace!==de||B.isBatchedMesh&&ge.batching===!1||!B.isBatchedMesh&&ge.batching===!0||B.isBatchedMesh&&ge.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&ge.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&ge.instancing===!1||!B.isInstancedMesh&&ge.instancing===!0||B.isSkinnedMesh&&ge.skinning===!1||!B.isSkinnedMesh&&ge.skinning===!0||B.isInstancedMesh&&ge.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&ge.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&ge.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&ge.instancingMorph===!1&&B.morphTexture!==null||ge.envMap!==be||O.fog===!0&&ge.fog!==fe||ge.numClippingPlanes!==void 0&&(ge.numClippingPlanes!==_e.numPlanes||ge.numIntersection!==_e.numIntersection)||ge.vertexAlphas!==Le||ge.vertexTangents!==Be||ge.morphTargets!==ye||ge.morphNormals!==Je||ge.morphColors!==dt||ge.toneMapping!==ct||ge.morphTargetsCount!==Et||!!ge.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(We=!0):(We=!0,ge.__version=O.version);let It=ge.currentProgram;We===!0&&(It=Li(O,L,B),z&&O.isNodeMaterial&&z.onUpdateProgram(O,It,ge));let Yt=!1,xn=!1,Xn=!1;const tt=It.getUniforms(),ft=ge.uniforms;if(ue.useProgram(It.program)&&(Yt=!0,xn=!0,Xn=!0),O.id!==H&&(H=O.id,xn=!0),ge.needsLights){const st=_l(b.state.lightProbeGridArray,B);ge.lightProbeGrid!==st&&(ge.lightProbeGrid=st,xn=!0)}if(Yt||k!==x){ue.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),tt.setValue(N,"projectionMatrix",x.projectionMatrix),tt.setValue(N,"viewMatrix",x.matrixWorldInverse);const Sn=tt.map.cameraPosition;Sn!==void 0&&Sn.setValue(N,Qe.setFromMatrixPosition(x.matrixWorld)),it.logarithmicDepthBuffer&&tt.setValue(N,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&tt.setValue(N,"isOrthographic",x.isOrthographicCamera===!0),k!==x&&(k=x,xn=!0,Xn=!0)}if(ge.needsLights&&(Dt.state.directionalShadowMap.length>0&&tt.setValue(N,"directionalShadowMap",Dt.state.directionalShadowMap,g),Dt.state.spotShadowMap.length>0&&tt.setValue(N,"spotShadowMap",Dt.state.spotShadowMap,g),Dt.state.pointShadowMap.length>0&&tt.setValue(N,"pointShadowMap",Dt.state.pointShadowMap,g)),B.isSkinnedMesh){tt.setOptional(N,B,"bindMatrix"),tt.setOptional(N,B,"bindMatrixInverse");const st=B.skeleton;st&&(st.boneTexture===null&&st.computeBoneTexture(),tt.setValue(N,"boneTexture",st.boneTexture,g))}B.isBatchedMesh&&(tt.setOptional(N,B,"batchingTexture"),tt.setValue(N,"batchingTexture",B._matricesTexture,g),tt.setOptional(N,B,"batchingIdTexture"),tt.setValue(N,"batchingIdTexture",B._indirectTexture,g),tt.setOptional(N,B,"batchingColorTexture"),B._colorsTexture!==null&&tt.setValue(N,"batchingColorTexture",B._colorsTexture,g));const vn=V.morphAttributes;if((vn.position!==void 0||vn.normal!==void 0||vn.color!==void 0)&&Pe.update(B,V,It),(xn||ge.receiveShadow!==B.receiveShadow)&&(ge.receiveShadow=B.receiveShadow,tt.setValue(N,"receiveShadow",B.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&L.environment!==null&&(ft.envMapIntensity.value=L.environmentIntensity),ft.dfgLUT!==void 0&&(ft.dfgLUT.value=Sg()),xn){if(tt.setValue(N,"toneMappingExposure",U.toneMappingExposure),ge.needsLights&&vl(ft,Xn),fe&&O.fog===!0&&W.refreshFogUniforms(ft,fe),W.refreshMaterialUniforms(ft,O,Ce,ke,b.state.transmissionRenderTarget[x.id]),ge.needsLights&&ge.lightProbeGrid){const st=ge.lightProbeGrid;ft.probesSH.value=st.texture,ft.probesMin.value.copy(st.boundingBox.min),ft.probesMax.value.copy(st.boundingBox.max),ft.probesResolution.value.copy(st.resolution)}hs.upload(N,va(ge),ft,g)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(hs.upload(N,va(ge),ft,g),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&tt.setValue(N,"center",B.center),tt.setValue(N,"modelViewMatrix",B.modelViewMatrix),tt.setValue(N,"normalMatrix",B.normalMatrix),tt.setValue(N,"modelMatrix",B.matrixWorld),O.uniformsGroups!==void 0){const st=O.uniformsGroups;for(let Sn=0,jn=st.length;Sn<jn;Sn++){const Ma=st[Sn];q.update(Ma,It),q.bind(Ma,It)}}return It}function vl(x,L){x.ambientLightColor.needsUpdate=L,x.lightProbe.needsUpdate=L,x.directionalLights.needsUpdate=L,x.directionalLightShadows.needsUpdate=L,x.pointLights.needsUpdate=L,x.pointLightShadows.needsUpdate=L,x.spotLights.needsUpdate=L,x.spotLightShadows.needsUpdate=L,x.rectAreaLights.needsUpdate=L,x.hemisphereLights.needsUpdate=L}function Sl(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(x,L,V){const O=S.get(x);O.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),S.get(x.texture).__webglTexture=L,S.get(x.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:V,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,L){const V=S.get(x);V.__webglFramebuffer=L,V.__useDefaultFramebuffer=L===void 0};const Ml=N.createFramebuffer();this.setRenderTarget=function(x,L=0,V=0){I=x,X=L,j=V;let O=null,B=!1,fe=!1;if(x){const de=S.get(x);if(de.__useDefaultFramebuffer!==void 0){ue.bindFramebuffer(N.FRAMEBUFFER,de.__webglFramebuffer),J.copy(x.viewport),ee.copy(x.scissor),le=x.scissorTest,ue.viewport(J),ue.scissor(ee),ue.setScissorTest(le),H=-1;return}else if(de.__webglFramebuffer===void 0)g.setupRenderTarget(x);else if(de.__hasExternalTextures)g.rebindTextures(x,S.get(x.texture).__webglTexture,S.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Le=x.depthTexture;if(de.__boundDepthTexture!==Le){if(Le!==null&&S.has(Le)&&(x.width!==Le.image.width||x.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");g.setupDepthRenderbuffer(x)}}const Me=x.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(fe=!0);const be=S.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(be[L])?O=be[L][V]:O=be[L],B=!0):x.samples>0&&g.useMultisampledRTT(x)===!1?O=S.get(x).__webglMultisampledFramebuffer:Array.isArray(be)?O=be[V]:O=be,J.copy(x.viewport),ee.copy(x.scissor),le=x.scissorTest}else J.copy(te).multiplyScalar(Ce).floor(),ee.copy(Te).multiplyScalar(Ce).floor(),le=we;if(V!==0&&(O=Ml),ue.bindFramebuffer(N.FRAMEBUFFER,O)&&ue.drawBuffers(x,O),ue.viewport(J),ue.scissor(ee),ue.setScissorTest(le),B){const de=S.get(x.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+L,de.__webglTexture,V)}else if(fe){const de=L;for(let Me=0;Me<x.textures.length;Me++){const be=S.get(x.textures[Me]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Me,be.__webglTexture,V,de)}}else if(x!==null&&V!==0){const de=S.get(x.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,de.__webglTexture,V)}H=-1},this.readRenderTargetPixels=function(x,L,V,O,B,fe,xe,de=0){if(!(x&&x.isWebGLRenderTarget)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=S.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&xe!==void 0&&(Me=Me[xe]),Me){ue.bindFramebuffer(N.FRAMEBUFFER,Me);try{const be=x.textures[de],Le=be.format,Be=be.type;if(x.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+de),!it.textureFormatReadable(Le)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!it.textureTypeReadable(Be)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=x.width-O&&V>=0&&V<=x.height-B&&N.readPixels(L,V,O,B,C.convert(Le),C.convert(Be),fe)}finally{const be=I!==null?S.get(I).__webglFramebuffer:null;ue.bindFramebuffer(N.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(x,L,V,O,B,fe,xe,de=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=S.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&xe!==void 0&&(Me=Me[xe]),Me)if(L>=0&&L<=x.width-O&&V>=0&&V<=x.height-B){ue.bindFramebuffer(N.FRAMEBUFFER,Me);const be=x.textures[de],Le=be.format,Be=be.type;if(x.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+de),!it.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!it.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ye=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ye),N.bufferData(N.PIXEL_PACK_BUFFER,fe.byteLength,N.STREAM_READ),N.readPixels(L,V,O,B,C.convert(Le),C.convert(Be),0);const Je=I!==null?S.get(I).__webglFramebuffer:null;ue.bindFramebuffer(N.FRAMEBUFFER,Je);const dt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Hu(N,dt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,ye),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,fe),N.deleteBuffer(ye),N.deleteSync(dt),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,L=null,V=0){const O=Math.pow(2,-V),B=Math.floor(x.image.width*O),fe=Math.floor(x.image.height*O),xe=L!==null?L.x:0,de=L!==null?L.y:0;g.setTexture2D(x,0),N.copyTexSubImage2D(N.TEXTURE_2D,V,0,0,xe,de,B,fe),ue.unbindTexture()};const El=N.createFramebuffer(),bl=N.createFramebuffer();this.copyTextureToTexture=function(x,L,V=null,O=null,B=0,fe=0){let xe,de,Me,be,Le,Be,ye,Je,dt;const ct=x.isCompressedTexture?x.mipmaps[fe]:x.image;if(V!==null)xe=V.max.x-V.min.x,de=V.max.y-V.min.y,Me=V.isBox3?V.max.z-V.min.z:1,be=V.min.x,Le=V.min.y,Be=V.isBox3?V.min.z:0;else{const ft=Math.pow(2,-B);xe=Math.floor(ct.width*ft),de=Math.floor(ct.height*ft),x.isDataArrayTexture?Me=ct.depth:x.isData3DTexture?Me=Math.floor(ct.depth*ft):Me=1,be=0,Le=0,Be=0}O!==null?(ye=O.x,Je=O.y,dt=O.z):(ye=0,Je=0,dt=0);const et=C.convert(L.format),Et=C.convert(L.type);let ge;L.isData3DTexture?(g.setTexture3D(L,0),ge=N.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(g.setTexture2DArray(L,0),ge=N.TEXTURE_2D_ARRAY):(g.setTexture2D(L,0),ge=N.TEXTURE_2D),ue.activeTexture(N.TEXTURE0),ue.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,L.flipY),ue.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),ue.pixelStorei(N.UNPACK_ALIGNMENT,L.unpackAlignment);const Dt=ue.getParameter(N.UNPACK_ROW_LENGTH),We=ue.getParameter(N.UNPACK_IMAGE_HEIGHT),It=ue.getParameter(N.UNPACK_SKIP_PIXELS),Yt=ue.getParameter(N.UNPACK_SKIP_ROWS),xn=ue.getParameter(N.UNPACK_SKIP_IMAGES);ue.pixelStorei(N.UNPACK_ROW_LENGTH,ct.width),ue.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ct.height),ue.pixelStorei(N.UNPACK_SKIP_PIXELS,be),ue.pixelStorei(N.UNPACK_SKIP_ROWS,Le),ue.pixelStorei(N.UNPACK_SKIP_IMAGES,Be);const Xn=x.isDataArrayTexture||x.isData3DTexture,tt=L.isDataArrayTexture||L.isData3DTexture;if(x.isDepthTexture){const ft=S.get(x),vn=S.get(L),st=S.get(ft.__renderTarget),Sn=S.get(vn.__renderTarget);ue.bindFramebuffer(N.READ_FRAMEBUFFER,st.__webglFramebuffer),ue.bindFramebuffer(N.DRAW_FRAMEBUFFER,Sn.__webglFramebuffer);for(let jn=0;jn<Me;jn++)Xn&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,S.get(x).__webglTexture,B,Be+jn),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,S.get(L).__webglTexture,fe,dt+jn)),N.blitFramebuffer(be,Le,xe,de,ye,Je,xe,de,N.DEPTH_BUFFER_BIT,N.NEAREST);ue.bindFramebuffer(N.READ_FRAMEBUFFER,null),ue.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(B!==0||x.isRenderTargetTexture||S.has(x)){const ft=S.get(x),vn=S.get(L);ue.bindFramebuffer(N.READ_FRAMEBUFFER,El),ue.bindFramebuffer(N.DRAW_FRAMEBUFFER,bl);for(let st=0;st<Me;st++)Xn?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ft.__webglTexture,B,Be+st):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ft.__webglTexture,B),tt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,vn.__webglTexture,fe,dt+st):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,vn.__webglTexture,fe),B!==0?N.blitFramebuffer(be,Le,xe,de,ye,Je,xe,de,N.COLOR_BUFFER_BIT,N.NEAREST):tt?N.copyTexSubImage3D(ge,fe,ye,Je,dt+st,be,Le,xe,de):N.copyTexSubImage2D(ge,fe,ye,Je,be,Le,xe,de);ue.bindFramebuffer(N.READ_FRAMEBUFFER,null),ue.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else tt?x.isDataTexture||x.isData3DTexture?N.texSubImage3D(ge,fe,ye,Je,dt,xe,de,Me,et,Et,ct.data):L.isCompressedArrayTexture?N.compressedTexSubImage3D(ge,fe,ye,Je,dt,xe,de,Me,et,ct.data):N.texSubImage3D(ge,fe,ye,Je,dt,xe,de,Me,et,Et,ct):x.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,fe,ye,Je,xe,de,et,Et,ct.data):x.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,fe,ye,Je,ct.width,ct.height,et,ct.data):N.texSubImage2D(N.TEXTURE_2D,fe,ye,Je,xe,de,et,Et,ct);ue.pixelStorei(N.UNPACK_ROW_LENGTH,Dt),ue.pixelStorei(N.UNPACK_IMAGE_HEIGHT,We),ue.pixelStorei(N.UNPACK_SKIP_PIXELS,It),ue.pixelStorei(N.UNPACK_SKIP_ROWS,Yt),ue.pixelStorei(N.UNPACK_SKIP_IMAGES,xn),fe===0&&L.generateMipmaps&&N.generateMipmap(ge),ue.unbindTexture()},this.initRenderTarget=function(x){S.get(x).__webglFramebuffer===void 0&&g.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?g.setTextureCube(x,0):x.isData3DTexture?g.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?g.setTexture2DArray(x,0):g.setTexture2D(x,0),ue.unbindTexture()},this.resetState=function(){X=0,j=0,I=null,ue.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=He._getDrawingBufferColorSpace(e),t.unpackColorSpace=He._getUnpackColorSpace()}}const Eg=`
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
`,bg=`
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
`;function yg({active:i}){const e=nt.useRef(null),t=nt.useRef({active:!1,reveal:0,progress:0});return nt.useEffect(()=>{t.current.active=i},[i]),nt.useEffect(()=>{const n=e.current;if(!n)return;const s=new ih,r=new Bt(45,n.clientWidth/n.clientHeight,.1,100);r.position.set(0,0,3.2);const a=new Mg({antialias:!0,alpha:!0,powerPreference:"high-performance"});a.setPixelRatio(Math.min(window.devicePixelRatio,2)),a.setSize(n.clientWidth,n.clientHeight),a.setClearColor(0,0),n.appendChild(a.domElement);const o={uTime:{value:0},uProgress:{value:0},uReveal:{value:0},uMouse:{value:new qe(10,10)},uMouseStrength:{value:0},uPixelRatio:{value:a.getPixelRatio()},uSize:{value:.9}};let l=null,c=!1;const d=b=>{const v=b.height/b.width,T=1100,U=Math.round(1100*v),R=document.createElement("canvas");R.width=T,R.height=U;const z=R.getContext("2d",{willReadFrequently:!0});z.drawImage(b,0,0,T,U);const X=z.getImageData(0,0,T,U).data,j=[],I=[],H=[],k=[],J=[],ee=3.4*1.2,le=ee*v;for(let ke=0;ke<U;ke+=1)for(let Ce=0;Ce<T;Ce+=1){const K=(ke*T+Ce)*4,ce=X[K]/255,te=X[K+1]/255,Te=X[K+2]/255,we=.299*ce+.587*te+.114*Te;if(we<.03)continue;const rt=1+(we>.5?2:we>.25?1:0);for(let Fe=0;Fe<rt;Fe++){const Ye=(Math.random()-.5)*.9,Qe=(Math.random()-.5)*.9,Oe=((Ce+Ye)/T-.5)*ee,ut=-((ke+Qe)/U-.5)*le,at=(Math.random()-.5)*.02;j.push(Oe,ut,at);const Mt=Math.random()*Math.PI*2,N=Math.acos(2*Math.random()-1),ot=2+Math.random()*1.8;I.push(Math.sin(N)*Math.cos(Mt)*ot,Math.sin(N)*Math.sin(Mt)*ot,Math.cos(N)*ot-.5),H.push(ce,te,Te),k.push(Math.random()),J.push(Math.min(1,we*1.25))}}const Se=k.length,ve=new jt;ve.setAttribute("position",new Tt(new Float32Array(j),3)),ve.setAttribute("aTarget",new Tt(new Float32Array(j),3)),ve.setAttribute("aScatter",new Tt(new Float32Array(I),3)),ve.setAttribute("aColor",new Tt(new Float32Array(H),3)),ve.setAttribute("aSeed",new Tt(new Float32Array(k),1)),ve.setAttribute("aBrightness",new Tt(new Float32Array(J),1));const Ge=new Xt({uniforms:o,vertexShader:Eg,fragmentShader:bg,transparent:!0,depthWrite:!1,blending:rr});l=new ph(ve,Ge),s.add(l),console.log(`[WineParticles] ${Se.toLocaleString()} particles`)},p=new Image;p.crossOrigin="anonymous",p.src=Ro,p.onload=()=>{c||d(p)};const u=new qe(10,10),m=new qe(10,10),_=b=>{const P=a.domElement.getBoundingClientRect(),v=(b.clientX-P.left)/P.width*2-1,T=-((b.clientY-P.top)/P.height*2-1),U=r.fov*Math.PI/180,R=2*Math.tan(U/2)*r.position.z,z=R*r.aspect;m.set(v*(z/2),T*(R/2)),o.uMouseStrength.value=1},E=()=>{o.uMouseStrength.value=0,m.set(10,10)};window.addEventListener("pointermove",_),window.addEventListener("pointerleave",E);const f=()=>{const b=n.clientWidth,P=n.clientHeight;a.setSize(b,P),r.aspect=b/P,r.updateProjectionMatrix()},h=new ResizeObserver(f);h.observe(n);let M=performance.now(),A=0,y=0;const D=()=>{const b=performance.now(),P=Math.min((b-M)/1e3,.05);M=b,A+=P;const v=A;o.uTime.value=v;const T=t.current,U=T.active?1:0,R=T.active?1:0;T.reveal+=(U-T.reveal)*Math.min(1,P*6),T.progress+=(R-T.progress)*Math.min(1,P*1.6),o.uReveal.value=T.reveal,o.uProgress.value=T.progress,u.lerp(m,.15),o.uMouse.value.copy(u),r.position.x=Math.sin(v*.15)*.05,r.position.y=Math.cos(v*.12)*.03,r.lookAt(0,0,0),a.render(s,r),y=requestAnimationFrame(D)};return D(),()=>{c=!0,cancelAnimationFrame(y),h.disconnect(),window.removeEventListener("pointermove",_),window.removeEventListener("pointerleave",E),l&&(l.geometry.dispose(),l.material.dispose(),s.remove(l)),a.dispose(),a.domElement.parentNode===n&&n.removeChild(a.domElement)}},[]),w.jsx("div",{ref:e,className:"absolute inset-0"})}const To=Object.assign({"../../assets/wine-glass/ezgif-frame-001.jpg":Hl,"../../assets/wine-glass/ezgif-frame-002.jpg":kl,"../../assets/wine-glass/ezgif-frame-003.jpg":Xl,"../../assets/wine-glass/ezgif-frame-004.jpg":ql,"../../assets/wine-glass/ezgif-frame-005.jpg":Kl,"../../assets/wine-glass/ezgif-frame-006.jpg":$l,"../../assets/wine-glass/ezgif-frame-007.jpg":Ql,"../../assets/wine-glass/ezgif-frame-008.jpg":tc,"../../assets/wine-glass/ezgif-frame-009.jpg":ic,"../../assets/wine-glass/ezgif-frame-010.jpg":rc,"../../assets/wine-glass/ezgif-frame-011.jpg":oc,"../../assets/wine-glass/ezgif-frame-012.jpg":cc,"../../assets/wine-glass/ezgif-frame-013.jpg":hc,"../../assets/wine-glass/ezgif-frame-014.jpg":fc,"../../assets/wine-glass/ezgif-frame-015.jpg":mc,"../../assets/wine-glass/ezgif-frame-016.jpg":_c,"../../assets/wine-glass/ezgif-frame-017.jpg":vc,"../../assets/wine-glass/ezgif-frame-018.jpg":Mc,"../../assets/wine-glass/ezgif-frame-019.jpg":bc,"../../assets/wine-glass/ezgif-frame-020.jpg":Tc,"../../assets/wine-glass/ezgif-frame-021.jpg":wc,"../../assets/wine-glass/ezgif-frame-022.jpg":Cc,"../../assets/wine-glass/ezgif-frame-023.jpg":Nc,"../../assets/wine-glass/ezgif-frame-024.jpg":Lc,"../../assets/wine-glass/ezgif-frame-025.jpg":Ic,"../../assets/wine-glass/ezgif-frame-026.jpg":Oc,"../../assets/wine-glass/ezgif-frame-027.jpg":zc,"../../assets/wine-glass/ezgif-frame-028.jpg":Hc,"../../assets/wine-glass/ezgif-frame-029.jpg":kc,"../../assets/wine-glass/ezgif-frame-030.jpg":Xc,"../../assets/wine-glass/ezgif-frame-031.jpg":qc,"../../assets/wine-glass/ezgif-frame-032.jpg":Kc,"../../assets/wine-glass/ezgif-frame-033.jpg":$c,"../../assets/wine-glass/ezgif-frame-034.jpg":Qc,"../../assets/wine-glass/ezgif-frame-035.jpg":tu,"../../assets/wine-glass/ezgif-frame-036.jpg":iu,"../../assets/wine-glass/ezgif-frame-037.jpg":ru,"../../assets/wine-glass/ezgif-frame-038.jpg":au}),rs=Object.keys(To).sort().map(i=>To[i].default);function bi({text:i,startProgress:e,endProgress:t,scrollProgress:n,isDimmed:s}){const r=i.split(" ");let a=0;const o=i.length,l=t-e;return w.jsx(w.Fragment,{children:r.map((c,d)=>{const p=c.split("");return w.jsxs("span",{className:"inline-block whitespace-nowrap",children:[p.map((u,m)=>{const _=e+a/o*l;a++;const f=Math.min(Math.max((n-_)/.05,0),1),h=f*f*(3-2*f);return w.jsx("span",{className:"inline-block origin-bottom",style:{opacity:s?Math.max(h*.4,.1):Math.max(h,.15),transform:`translate3d(0, ${(1-h)*6}px, 0)`,transition:"transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"},children:u},m)}),d<r.length-1&&w.jsx("span",{className:"inline-block",children:" "})]},d)})})}function Tg(){const i=nt.useRef(null),[e,t]=nt.useState(0),[n,s]=nt.useState(0),[r,a]=nt.useState(!1);return nt.useEffect(()=>{const o=()=>{if(!i.current)return;const l=i.current.getBoundingClientRect(),c=l.height-window.innerHeight;if(c<=0)return;const d=-l.top/c,p=Math.min(Math.max(d,0),1);t(p);const u=Math.min(Math.floor(p*(rs.length-1)),rs.length-1);s(u)};return window.addEventListener("scroll",o,{passive:!0}),o(),()=>window.removeEventListener("scroll",o)},[]),w.jsx("section",{ref:i,className:"relative w-full h-[250vh] bg-ink",children:w.jsxs("div",{className:"sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-center px-5 md:px-10 py-12",children:[w.jsxs("div",{className:"absolute inset-0 w-full h-full pointer-events-none",children:[w.jsx("div",{className:"absolute left-0 top-0 w-full md:w-[50%] h-full pointer-events-auto cursor-pointer z-20",onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1)}),w.jsx("div",{className:"absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ease-in-out",style:{opacity:r?0:1},children:rs.length>0&&rs.map((o,l)=>w.jsx("img",{src:o,alt:"",className:"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[28%] w-[85vw] h-[60vh] md:w-[55vw] md:h-[75vh] object-cover",style:{opacity:l===n?.95:0,filter:"brightness(1.05) contrast(1.25) saturate(1.1)",pointerEvents:"none"}},l))}),w.jsx("div",{className:"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[28%] w-[85vw] h-[60vh] md:w-[55vw] md:h-[75vh] pointer-events-none transition-opacity duration-300 ease-in-out",style:{opacity:r?1:0},children:w.jsx(yg,{active:r})}),w.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink opacity-70 pointer-events-none"})]}),w.jsxs("div",{className:"relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center",children:[w.jsx("div",{className:"md:col-span-4 font-mono text-[11px] uppercase tracking-cine text-bone/50",children:w.jsx(bi,{text:"(01) — Manifesto",startProgress:0,endProgress:.08,scrollProgress:e})}),w.jsxs("div",{className:"md:col-span-6 md:col-start-7",children:[w.jsxs("p",{className:"font-serif italic font-light text-bone leading-[1.1] text-balance",style:{fontSize:"clamp(2rem, 3.4vw, 3.4rem)"},children:[w.jsx(bi,{text:"Not for everyone.",startProgress:.04,endProgress:.14,scrollProgress:e})," ",w.jsx(bi,{text:"A room for the late hours, the long looks, the records that keep playing after the city has gone quiet.",startProgress:.14,endProgress:.42,scrollProgress:e,isDimmed:!0})]}),w.jsxs("div",{className:"mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-bone/60",children:[w.jsx("div",{className:"leading-relaxed",children:w.jsx(bi,{text:"We do not advertise. We do not announce. The door opens for those who already know where it is.",startProgress:.32,endProgress:.52,scrollProgress:e,isDimmed:!0})}),w.jsx("div",{className:"leading-relaxed",children:w.jsx(bi,{text:"Inside: low light, low ceilings, high standards. Drinks built to be remembered. Music that was never meant for daylight.",startProgress:.42,endProgress:.62,scrollProgress:e,isDimmed:!0})})]})]})]})]})})}const fl="/assets/dj-CzHXBebk.jpg",la="/assets/crowd-B5lehDky.jpg",Ag="/assets/portrait-CLOTx2_W.jpg",pl="/assets/interior-DaVL50G8.jpg",wg=[{date:"FRI 14 NOV",name:"BLACK ROOM",artist:"ARCA b2b SHYGIRL",tag:"Underground / Industrial",img:fl},{date:"SAT 15 NOV",name:"VELVET HOUR",artist:"HONEY DIJON",tag:"Disco / Soul / House",img:la},{date:"THU 20 NOV",name:"AFTER DARK XI",artist:"PEGGY GOU",tag:"Resident Showcase",img:Ag},{date:"SAT 22 NOV",name:"MIDNIGHT MASS",artist:"FRED AGAIN..",tag:"Closed Door / Members Only",img:pl}];function Rg(){const i=nt.useRef([]);return nt.useEffect(()=>{const e=new IntersectionObserver(t=>{t.forEach(n=>{n.isIntersecting&&n.target.classList.add("is-in")})},{threshold:.15});return i.current.forEach(t=>t&&e.observe(t)),()=>e.disconnect()},[]),w.jsx("section",{id:"nights",className:"relative px-5 md:px-10 py-32 md:py-48",children:w.jsxs("div",{className:"mx-auto max-w-7xl",children:[w.jsxs("div",{className:"mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6",children:[w.jsxs("div",{children:[w.jsx("div",{className:"font-mono text-[10px] uppercase tracking-cine text-bone/50 mb-4",children:"(02) — Programme"}),w.jsxs("h2",{className:"font-display text-bone leading-[0.85]",style:{fontSize:"clamp(3.5rem, 12vw, 12rem)"},children:["NIGHTS",w.jsx("span",{className:"text-crimson",children:"."})]})]}),w.jsx("p",{className:"max-w-sm text-sm text-bone/60",children:"Four nights a week. Each one a closed loop of sound, light, and consequence. Tables open thirty days out."})]}),w.jsx("div",{className:"divide-y divide-bone/10 border-y border-bone/10",children:wg.map((e,t)=>w.jsxs("div",{ref:n=>{i.current[t]=n},className:"group relative grid grid-cols-12 items-center gap-4 py-8 md:py-10 cursor-pointer overflow-hidden transition-colors hover:bg-bone/[0.02]",children:[w.jsx("div",{className:"col-span-12 md:col-span-2 font-mono text-xs uppercase tracking-cine text-bone/60",children:e.date}),w.jsx("h3",{className:"col-span-8 md:col-span-5 font-display text-bone leading-none transition-transform duration-700 group-hover:translate-x-2",style:{fontSize:"clamp(2rem, 5vw, 4rem)"},children:e.name}),w.jsxs("div",{className:"col-span-4 md:col-span-3 text-right md:text-left",children:[w.jsx("div",{className:"font-mono text-[11px] uppercase tracking-cine text-bone",children:e.artist}),w.jsx("div",{className:"font-mono text-[10px] uppercase tracking-cine text-bone/40 mt-1",children:e.tag})]}),w.jsx("div",{className:"col-span-12 md:col-span-2 flex justify-end",children:w.jsx("span",{className:"font-mono text-[11px] uppercase tracking-cine text-bone/60 border-b border-bone/30 pb-1 transition-all group-hover:text-crimson group-hover:border-crimson",children:"Reserve →"})}),w.jsx("div",{className:"pointer-events-none absolute right-[20%] top-1/2 -translate-y-1/2 h-44 w-32 md:h-56 md:w-40 overflow-hidden opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 z-10",children:w.jsx("img",{src:e.img,alt:"",className:"h-full w-full object-cover",loading:"lazy"})})]},e.name))})]})})}const ml="/assets/cocktail-VrwwlWbT.jpg",oi=[{src:pl,caption:"22:00 — The room awakens."},{src:ml,caption:"23:14 — A drink is poured."},{src:fl,caption:"01:00 — The needle drops."},{src:la,caption:"03:42 — Nothing is the same."}];function Cg(){const i=nt.useRef(null),[e,t]=nt.useState(0);nt.useEffect(()=>{const s=()=>{if(!i.current)return;const r=i.current.getBoundingClientRect(),a=r.height-window.innerHeight,o=Math.min(Math.max(-r.top,0),a);t(a>0?o/a:0)};return s(),window.addEventListener("scroll",s,{passive:!0}),()=>window.removeEventListener("scroll",s)},[]);const n=Math.min(oi.length-1,Math.floor(e*oi.length));return w.jsx("section",{ref:i,className:"relative",style:{height:`${oi.length*100}vh`},children:w.jsxs("div",{className:"sticky top-0 h-[100svh] w-full overflow-hidden vignette",children:[oi.map((s,r)=>w.jsx("img",{src:s.src,alt:s.caption,loading:"lazy",className:"absolute inset-0 h-full w-full object-cover transition-opacity duration-700",style:{opacity:r===n?1:0,filter:"brightness(0.65) contrast(1.1)",transform:`scale(${1+e*.05})`}},r)),w.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink"}),w.jsxs("div",{className:"absolute top-6 md:top-10 left-5 md:left-10 right-5 md:right-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-cine text-bone/70",children:[w.jsx("span",{children:"SEQ 04 — One Night."}),w.jsxs("span",{className:"tabular-nums",children:[String(n+1).padStart(2,"0")," / ",String(oi.length).padStart(2,"0")]})]}),w.jsxs("div",{className:"absolute inset-x-0 bottom-0 px-5 md:px-10 pb-16 md:pb-24",children:[w.jsx("div",{className:"font-mono text-[10px] uppercase tracking-cine text-crimson mb-4",children:"Now playing"}),w.jsx("h3",{className:"font-display text-bone leading-[0.85] reveal-mask",style:{fontSize:"clamp(2.5rem, 8vw, 9rem)"},children:w.jsx("span",{children:oi[n].caption})},n)]}),w.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-px bg-bone/15",children:w.jsx("div",{className:"h-full bg-crimson",style:{width:`${e*100}%`}})})]})})}const Pg=[{n:"01",name:"Obsidian",spec:"Mezcal · Black Cardamom · Smoked Honey",price:"24"},{n:"02",name:"Velvet Hour",spec:"Cognac · Crème de Cassis · Rose",price:"26"},{n:"03",name:"Midnight Mass",spec:"Rye · Amaro · Burnt Orange",price:"22"},{n:"04",name:"Crimson Letter",spec:"Tequila · Hibiscus · Aleppo",price:"23"},{n:"05",name:"Ember",spec:"Islay Scotch · Maple · Lapsang",price:"28"}];function Ng(){return w.jsx("section",{id:"cocktails",className:"relative px-5 md:px-10 py-32 md:py-48 bg-ink overflow-hidden",children:w.jsxs("div",{className:"mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-12 gap-10 md:gap-16",children:[w.jsxs("div",{className:"md:col-span-5 md:sticky md:top-24 self-start",children:[w.jsx("div",{className:"font-mono text-[10px] uppercase tracking-cine text-bone/50 mb-4",children:"(03) — The Bar"}),w.jsxs("h2",{className:"font-display text-bone leading-[0.82] mb-8",style:{fontSize:"clamp(3.5rem, 10vw, 9rem)"},children:["DRINKS",w.jsx("br",{}),"BUILT FOR",w.jsx("br",{}),w.jsx("span",{className:"italic font-serif font-light text-crimson",children:"the night"}),"."]}),w.jsx("div",{className:"img-frame relative aspect-[3/4] max-w-sm",children:w.jsx("img",{src:ml,alt:"Signature cocktail",loading:"lazy",width:1280,height:1600,className:"h-full w-full object-cover"})})]}),w.jsxs("div",{className:"md:col-span-7",children:[w.jsx("ul",{className:"divide-y divide-bone/10 border-y border-bone/10",children:Pg.map(i=>w.jsxs("li",{className:"group flex items-baseline gap-6 py-8 transition-colors hover:bg-bone/[0.02] cursor-pointer",children:[w.jsx("span",{className:"font-mono text-[10px] uppercase tracking-cine text-bone/40 w-8",children:i.n}),w.jsxs("div",{className:"flex-1",children:[w.jsx("div",{className:"font-display text-bone leading-none transition-transform duration-500 group-hover:translate-x-1",style:{fontSize:"clamp(1.75rem, 3.5vw, 2.75rem)"},children:i.name}),w.jsx("div",{className:"mt-2 font-mono text-[11px] uppercase tracking-cine text-bone/50",children:i.spec})]}),w.jsxs("span",{className:"font-display text-bone/80 text-2xl",children:["$",i.price]})]},i.n))}),w.jsxs("p",{className:"mt-10 max-w-md font-serif italic text-bone/60",children:['"Every cocktail is composed for a moment, not a menu."',w.jsx("span",{className:"block mt-2 font-mono not-italic text-[10px] uppercase tracking-cine text-bone/40",children:"— ELIO RAVEN, Head Bar"})]})]})]})})}function Dg(){return w.jsxs("section",{id:"membership",className:"relative px-5 md:px-10 py-32 md:py-48 overflow-hidden",children:[w.jsxs("div",{className:"absolute inset-0 -z-10",children:[w.jsx("img",{src:la,alt:"",className:"h-full w-full object-cover",loading:"lazy",style:{filter:"brightness(0.35) contrast(1.1)"}}),w.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink"})]}),w.jsxs("div",{className:"mx-auto max-w-7xl",children:[w.jsx("div",{className:"font-mono text-[10px] uppercase tracking-cine text-bone/50 mb-6",children:"(04) — Membership"}),w.jsxs("h2",{className:"font-display text-bone leading-[0.85] mb-16",style:{fontSize:"clamp(4rem, 14vw, 14rem)"},children:["NOT FOR",w.jsx("br",{}),"EVERYONE",w.jsx("span",{className:"text-crimson",children:"."})]}),w.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[{tier:"GUEST",price:"By invitation",lines:["Standard reservations","Two guests per visit","Public programme"]},{tier:"MEMBER",price:"$2,400 / yr",lines:["Priority bookings","Private tables","Members-only nights","Cellar access"]},{tier:"CIRCLE",price:"By committee",lines:["No door, no list","Private rooms","Curated travel","Direct line to the bar"]}].map((i,e)=>w.jsxs("div",{className:"group relative border border-bone/15 p-8 md:p-10 transition-all duration-700 hover:border-crimson hover:bg-ink/40 backdrop-blur-sm",children:[w.jsxs("div",{className:"font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-8",children:["N° 0",e+1]}),w.jsx("h3",{className:"font-display text-bone text-5xl md:text-6xl mb-2",children:i.tier}),w.jsx("div",{className:"font-mono text-[11px] uppercase tracking-cine text-crimson mb-10",children:i.price}),w.jsx("ul",{className:"space-y-3 text-sm text-bone/70",children:i.lines.map(t=>w.jsxs("li",{className:"flex gap-3",children:[w.jsx("span",{className:"text-crimson",children:"—"}),w.jsx("span",{children:t})]},t))}),w.jsx("a",{href:"#reserve",className:"absolute bottom-8 right-8 font-mono text-[11px] uppercase tracking-cine text-bone/60 group-hover:text-bone transition-colors",children:"Apply →"})]},i.tier))})]})]})}function Lg(){const[i,e]=nt.useState(!1);return w.jsx("section",{id:"reserve",className:"relative px-5 md:px-10 py-32 md:py-48 bg-ink",children:w.jsxs("div",{className:"mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16",children:[w.jsxs("div",{className:"md:col-span-6",children:[w.jsx("div",{className:"font-mono text-[10px] uppercase tracking-cine text-bone/50 mb-6",children:"(05) — Reservation"}),w.jsxs("h2",{className:"font-display text-bone leading-[0.82] mb-10",style:{fontSize:"clamp(3.5rem, 11vw, 11rem)"},children:["BOOK",w.jsx("br",{}),"YOUR",w.jsx("br",{}),w.jsx("span",{className:"italic font-serif font-light text-crimson",children:"night"}),"."]}),w.jsx("p",{className:"max-w-md text-bone/60 leading-relaxed",children:"Tables are released thirty days in advance. We will respond within twenty-four hours, often sooner, occasionally with the only word that matters: yes."})]}),w.jsxs("form",{onSubmit:t=>{t.preventDefault(),e(!0)},className:"md:col-span-6 space-y-6",children:[[{id:"name",label:"Full name",type:"text"},{id:"email",label:"Email",type:"email"},{id:"date",label:"Preferred date",type:"date"},{id:"guests",label:"Number of guests",type:"number"}].map(t=>w.jsxs("div",{className:"relative border-b border-bone/20 pb-2 focus-within:border-crimson transition-colors",children:[w.jsx("label",{htmlFor:t.id,className:"block font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-2",children:t.label}),w.jsx("input",{id:t.id,type:t.type,required:!0,className:"w-full bg-transparent text-bone font-serif text-xl outline-none placeholder:text-bone/30"})]},t.id)),w.jsxs("div",{className:"relative border-b border-bone/20 pb-2 focus-within:border-crimson transition-colors",children:[w.jsx("label",{htmlFor:"note",className:"block font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-2",children:"Note to the host"}),w.jsx("textarea",{id:"note",rows:3,className:"w-full bg-transparent text-bone font-serif text-lg outline-none resize-none"})]}),w.jsxs("button",{type:"submit",className:"btn-cine w-full justify-center mt-8",children:[i?"Request received":"Send Request",w.jsx("span",{"aria-hidden":!0,children:"→"})]})]})]})})}function Ug(){return w.jsx("footer",{className:"relative px-5 md:px-10 pt-24 pb-10 bg-ink overflow-hidden",children:w.jsxs("div",{className:"mx-auto max-w-7xl",children:[w.jsxs("h2",{className:"font-display text-bone leading-[0.78]",style:{fontSize:"clamp(5rem, 22vw, 22rem)"},children:["NOCTURNE",w.jsx("span",{className:"text-crimson",children:"."})]}),w.jsxs("div",{className:"mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-bone/10 pt-10",children:[w.jsxs("div",{children:[w.jsx("div",{className:"font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-4",children:"Address"}),w.jsxs("p",{className:"text-sm text-bone/70 leading-relaxed",children:["12 Velvet Lane",w.jsx("br",{}),"Brooklyn, NY 11211"]})]}),w.jsxs("div",{children:[w.jsx("div",{className:"font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-4",children:"Hours"}),w.jsxs("p",{className:"text-sm text-bone/70 leading-relaxed",children:["Thu — Sun",w.jsx("br",{}),"22:00 — Late"]})]}),w.jsxs("div",{children:[w.jsx("div",{className:"font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-4",children:"Contact"}),w.jsxs("p",{className:"text-sm text-bone/70 leading-relaxed",children:["host@nocturne.club",w.jsx("br",{}),"+1 (212) 555 0114"]})]}),w.jsxs("div",{children:[w.jsx("div",{className:"font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-4",children:"Follow"}),w.jsx("ul",{className:"space-y-1 text-sm text-bone/70",children:["Instagram","RA","SoundCloud"].map(i=>w.jsx("li",{children:w.jsxs("a",{href:"#",className:"hover:text-crimson transition-colors",children:[i," →"]})},i))})]})]}),w.jsxs("div",{className:"mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-[10px] uppercase tracking-cine text-bone/40",children:[w.jsx("span",{children:"© MMXXV NOCTURNE — All rights observed."}),w.jsx("span",{children:"The night is what you make it."})]})]})})}function Fg(){return w.jsxs("main",{className:"grain relative bg-ink text-bone selection:bg-crimson",children:[w.jsx(Il,{}),w.jsx(Ll,{}),w.jsx(Ul,{}),w.jsx(Fl,{}),w.jsx(Bl,{}),w.jsx(zl,{items:["AFTER DARK","SINCE MMXXV","NOT FOR EVERYONE","THE NIGHT STARTS HERE","VOLUME I"]}),w.jsx(Tg,{}),w.jsx(Rg,{}),w.jsx(Cg,{}),w.jsx(Ng,{}),w.jsx(Dg,{}),w.jsx(Lg,{}),w.jsx(Ug,{})]})}export{Fg as component};
