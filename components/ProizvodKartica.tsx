"use client";
import Link from "next/link";
import { useState } from "react";
import sastojci from "@/content/sastojci.json";
import { din } from "@/lib/format";

type Stavka = { id: string; naziv: string; cena: number; jedinica: string; grupa: string; opis?: string };
const data = sastojci.stavke as Record<string, { sastojci: string[]; izvor: string }>;

export function ProizvodKartica({ s }: { s: Stavka }) {
  const [open, setOpen] = useState(false);
  const info = data[s.id];
  return (
    <li className={`flex flex-col rounded-2xl border bg-ivory p-4 transition ${open ? "border-gold/60 shadow-md shadow-gold/10" : "border-line"}`}>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="font-serif text-xl leading-tight">{s.naziv}</p>
          <p className="mt-1 text-sm text-gold-dark">
            {din(s.cena)} <span className="text-xs text-cocoa-soft">/ {s.jedinica}</span>
          </p>
        </div>
        {s.grupa === "torte" && (
          <Link
            href={`/napravi-tortu?ukus=${s.id}`}
            className="whitespace-nowrap rounded-full border border-gold px-3 py-1.5 text-xs font-medium text-gold-dark hover:bg-blush"
          >
            Izaberi ovaj ukus
          </Link>
        )}
      </div>
      {info && (
        <>
          <button
            onClick={() => setOpen(!open)}
            className="mt-3 flex items-center gap-1 self-start text-xs uppercase tracking-[0.2em] text-cocoa-soft"
            aria-expanded={open}
          >
            Sastojci <span className={`text-gold transition ${open ? "rotate-45" : ""}`}>+</span>
          </button>
          {open && (
            <div className="mt-2 [animation:fadeIn_.25s_both]">
              <ul className="flex flex-wrap gap-1.5">
                {info.sastojci.map((x) => (
                  <li key={x} className="rounded-full bg-cream-deep px-3 py-1 text-xs text-cocoa">{x}</li>
                ))}
              </ul>
              <p className="mt-2 text-[10px] text-cocoa-soft/70">Klasičan recept, naš se može razlikovati. Za alergene pitajte nas.</p>
            </div>
          )}
        </>
      )}
    </li>
  );
}
