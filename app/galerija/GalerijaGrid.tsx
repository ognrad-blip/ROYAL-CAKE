"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import galerija from "@/content/galerija.json";

type Slika = (typeof galerija.slike)[number];
const nazivKat = (id: string) => galerija.kategorije.find((k) => k.id === id)?.naziv ?? "";

function spanFor(s: Slika, i: number) {
  const portrait = s.h / s.w > 1.2;
  if (i % 9 === 0) return "col-span-2 row-span-2";
  if (portrait) return "row-span-2";
  return "row-span-1";
}

export function GalerijaGrid() {
  const params = useSearchParams();
  const [k, setK] = useState<string>(params.get("k") ?? "sve");
  const [open, setOpen] = useState<number | null>(null);
  const slike = galerija.slike.filter(
    (s) => k === "sve" || s.kategorija === k || (k === "rodjendan" && s.kategorija === "punoletstvo"),
  );
  const broj = (id: string) =>
    id === "sve" ? galerija.slike.length : galerija.slike.filter((s) => s.kategorija === id || (id === "rodjendan" && s.kategorija === "punoletstvo")).length;

  const go = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + slike.length) % slike.length)),
    [slike.length],
  );
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  const touchX = useRef<number | null>(null);
  const aktivna = open !== null ? slike[open] : null;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20">
      {/* Filter */}
      <nav className="sticky top-[105px] z-20 -mx-4 border-b border-line bg-cream/95 px-4 backdrop-blur md:top-[61px]">
        <div className="flex gap-6 overflow-x-auto py-4 md:justify-center">
          {[{ id: "sve", naziv: "Sve" }, ...galerija.kategorije].map((c) => (
            <button
              key={c.id}
              onClick={() => setK(c.id)}
              className={`relative whitespace-nowrap pb-1 font-serif text-lg transition ${k === c.id ? "text-cocoa" : "text-cocoa-soft/70 hover:text-cocoa"}`}
            >
              {c.naziv}
              <sup className="ml-1 font-sans text-[10px] text-gold-dark">{broj(c.id)}</sup>
              <span className={`absolute inset-x-0 -bottom-px h-px bg-gold transition-transform ${k === c.id ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          ))}
        </div>
      </nav>

      {/* Mosaic */}
      <div key={k} className="mt-8 grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[13rem] md:grid-cols-4 md:gap-4">
        {slike.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setOpen(i)}
            style={{ animationDelay: `${i * 40}ms` }}
            className={`group relative overflow-hidden rounded-[1.25rem] bg-cream-deep [animation:fadeUp_.6s_both] ${spanFor(s, i)}`}
          >
            <Image src={s.src} alt={s.naslov} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-[1.06]" />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/75 via-cocoa/0 to-transparent opacity-80 transition md:opacity-0 md:group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-left md:translate-y-2 md:p-4 md:opacity-0 md:transition md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <p className="text-[9px] uppercase tracking-[0.3em] text-gold-light">{nazivKat(s.kategorija)}</p>
              <p className="font-serif text-base leading-tight text-cream md:text-xl">{s.naslov}</p>
            </div>
            <span className="pointer-events-none absolute inset-2 rounded-[1rem] border border-gold-light/0 transition group-hover:border-gold-light/50" />
          </button>
        ))}
      </div>

      <div className="mt-14 text-center">
        <p className="font-serif text-3xl">Niste pronašli pravu?</p>
        <p className="mt-2 text-sm text-cocoa-soft">Napravite svoju, a mi ćemo je izraditi po vašoj želji.</p>
        <Link href="/napravi-tortu" className="btn-gold mt-5 inline-block rounded-full px-8 py-3 font-medium">Napravi svoju tortu</Link>
      </div>

      {/* Lightbox */}
      {aktivna && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#1a1310]/95 backdrop-blur-sm [animation:fadeIn_.25s_both]"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 text-cream/80">
            <span className="font-serif text-lg tracking-widest">
              {String(open! + 1).padStart(2, "0")} <span className="text-gold-light">/</span> {String(slike.length).padStart(2, "0")}
            </span>
            <button onClick={() => setOpen(null)} aria-label="Zatvori" className="text-3xl leading-none">×</button>
          </div>
          <div className="relative flex-1" onClick={() => setOpen(null)}>
            <Image key={aktivna.src} src={aktivna.src} alt={aktivna.naslov} fill sizes="100vw" className="object-contain px-4 [animation:fadeIn_.35s_both]" />
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Prethodna" className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-full border border-gold/40 text-2xl text-cream md:block">‹</button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Sledeća" className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-full border border-gold/40 text-2xl text-cream md:block">›</button>
          </div>
          <div className="px-5 pb-8 pt-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold-light">{nazivKat(aktivna.kategorija)}</p>
            <p className="mt-1 font-serif text-3xl text-cream">{aktivna.naslov}</p>
            {aktivna.kategorija !== "kolaci" ? (
              <Link href={`/napravi-tortu?stil=${aktivna.id}`} className="btn-gold mt-4 inline-block rounded-full px-7 py-3 text-sm font-medium">
                Želim ovakvu tortu
              </Link>
            ) : (
              <Link href="/ponuda" className="mt-4 inline-block rounded-full border border-gold px-7 py-3 text-sm text-gold-light">
                Pogledaj kolače u ponudi
              </Link>
            )}
            <p className="mt-3 text-[11px] text-cream/40 md:hidden">Prevucite levo ili desno</p>
          </div>
        </div>
      )}
    </div>
  );
}
