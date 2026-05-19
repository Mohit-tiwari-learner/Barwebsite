import { useState } from "react";

export function Reserve() {
  const [sent, setSent] = useState(false);
  return (
    <section id="reserve" className="relative px-5 md:px-10 py-32 md:py-48 bg-ink">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-6">
          <div className="font-mono text-[10px] uppercase tracking-cine text-bone/50 mb-6">(05) — Reservation</div>
          <h2 className="font-display text-bone leading-[0.82] mb-10" style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}>
            BOOK<br/>YOUR<br/><span className="italic font-serif font-light text-crimson">night</span>.
          </h2>
          <p className="max-w-md text-bone/60 leading-relaxed">
            Tables are released thirty days in advance. We will respond within twenty-four hours, often sooner, occasionally with the only word that matters: yes.
          </p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="md:col-span-6 space-y-6"
        >
          {[
            { id: "name", label: "Full name", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "date", label: "Preferred date", type: "date" },
            { id: "guests", label: "Number of guests", type: "number" },
          ].map((f) => (
            <div key={f.id} className="relative border-b border-bone/20 pb-2 focus-within:border-crimson transition-colors">
              <label htmlFor={f.id} className="block font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-2">{f.label}</label>
              <input
                id={f.id} type={f.type} required
                className="w-full bg-transparent text-bone font-serif text-xl outline-none placeholder:text-bone/30"
              />
            </div>
          ))}
          <div className="relative border-b border-bone/20 pb-2 focus-within:border-crimson transition-colors">
            <label htmlFor="note" className="block font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-2">Note to the host</label>
            <textarea id="note" rows={3} className="w-full bg-transparent text-bone font-serif text-lg outline-none resize-none" />
          </div>

          <button type="submit" className="btn-cine w-full justify-center mt-8">
            {sent ? "Request received" : "Send Request"}
            <span aria-hidden>→</span>
          </button>
        </form>
      </div>
    </section>
  );
}
