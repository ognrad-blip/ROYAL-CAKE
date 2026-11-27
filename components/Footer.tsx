import sajt from "@/content/sajt.json";
import { Crown } from "./Crown";

export function Footer() {
  return (
    <footer id="kontakt" className="glow border-t border-gold-light/15 bg-cocoa text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <Crown className="mb-3 h-6 w-10 text-gold-light" />
          <p className="font-serif text-4xl font-medium">Royal <em className="gold-text font-semibold">Cake</em></p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.45em] text-gold-light">{sajt.grad}</p>
        </div>
        <div className="space-y-2 text-sm text-cream/80">
          <p className="text-[11px] uppercase tracking-[0.45em] text-gold-light">Kontakt</p>
          <p><a href={`tel:${sajt.telefonLink}`} className="hover:text-gold-light">{sajt.telefon}</a></p>
          <p><a href={sajt.instagramLink} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">Instagram {sajt.instagram}</a></p>
          <p>{sajt.adresa}</p>
        </div>
        <div className="space-y-2 text-sm text-cream/80">
          <p className="text-[11px] uppercase tracking-[0.45em] text-gold-light">Radno vreme</p>
          <p>{sajt.radnoVreme}</p>
          <p className="pt-3 text-[11px] uppercase tracking-[0.45em] text-gold-light">Dostava</p>
          <p>Čačak i okolina, za veće porudžbine cela Srbija</p>
        </div>
      </div>
      <p className="border-t border-gold-light/10 py-5 text-center text-xs text-cream/50">
        © 2026 Royal Cake, {sajt.grad}. Prototip sajta.
      </p>
    </footer>
  );
}
