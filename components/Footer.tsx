import sajt from "@/content/sajt.json";
import { Crown } from "./Crown";

export function Footer() {
  return (
    <footer id="kontakt" className="bg-cocoa text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <Crown className="mb-3 h-6 w-10 text-gold-light" />
          <p className="font-serif text-3xl">Royal Cake</p>
          <p className="mt-1 text-sm uppercase tracking-[0.3em] text-gold-light">{sajt.grad}</p>
        </div>
        <div className="space-y-2 text-sm text-cream/80">
          <p className="font-serif text-xl text-cream">Kontakt</p>
          <p>{sajt.adresa}</p>
          <p>{sajt.telefon}</p>
          <p>{sajt.instagram}</p>
        </div>
        <div className="space-y-2 text-sm text-cream/80">
          <p className="font-serif text-xl text-cream">Radno vreme</p>
          <p>{sajt.radnoVreme}</p>
        </div>
      </div>
      <p className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        © 2026 Royal Cake, {sajt.grad}. Prototip sajta.
      </p>
    </footer>
  );
}
