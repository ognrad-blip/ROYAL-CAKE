import { Suspense } from "react";
import galerija from "@/content/galerija.json";
import { GalerijaGrid } from "./GalerijaGrid";
import { Crown } from "@/components/Crown";

export const metadata = { title: "Galerija", description: "Torte i kolači Royal Cake: rođendani, dečije torte, venčanja." };

export default function Galerija() {
  return (
    <>
      <section className="relative overflow-hidden bg-cocoa py-14 text-center text-cream md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(var(--gold-light) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
        <Crown className="relative mx-auto mb-4 h-7 w-11 text-gold-light" />
        <p className="relative text-xs uppercase tracking-[0.4em] text-gold-light">Naši radovi</p>
        <h1 className="relative mt-3 font-serif text-6xl italic md:text-8xl">Galerija</h1>
        <p className="relative mx-auto mt-4 max-w-md px-4 text-sm text-cream/70">
          {galerija.slike.length} torti i kolača iz naše radionice. Dodirnite sliku za detalje, a ako vam se dopadne, naručite sličnu.
        </p>
      </section>
      <Suspense>
        <GalerijaGrid />
      </Suspense>
    </>
  );
}
