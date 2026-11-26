"use client";
import Link from "next/link";
import { useState } from "react";
import ponuda from "@/content/ponuda.json";
import { din } from "@/lib/format";

export const torte = ponuda.stavke.filter((s) => s.grupa === "torte");

export function VrstaFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
      {[{ id: "sve", naziv: "Sve" }, ...ponuda.vrste].map((v) => (
        <button
          key={v.id}
          onClick={() => onChange(v.id)}
          className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${
            value === v.id ? "btn-gold border-transparent" : "border-line bg-ivory text-cocoa-soft"
          }`}
        >
          {v.naziv}
        </button>
      ))}
    </div>
  );
}

export const filtriraj = (vrsta: string) =>
  torte.filter((t) => vrsta === "sve" || (t.vrste ?? []).includes(vrsta));

export function UkusiTorti() {
  const [vrsta, setVrsta] = useState("sve");
  const lista = filtriraj(vrsta);
  return (
    <>
      <VrstaFilter value={vrsta} onChange={setVrsta} />
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {lista.map((s) => (
          <li key={s.id} className="flex items-center gap-3 rounded-2xl border border-line bg-ivory p-4">
            <div className="flex-1">
              <p className="font-serif text-xl leading-tight">{s.naziv}</p>
              {s.opis && <p className="text-xs text-cocoa-soft">{s.opis}</p>}
              <p className="mt-1 text-sm text-gold-dark">{din(s.cena)} / kg</p>
            </div>
            <Link
              href={`/napravi-tortu?ukus=${s.id}`}
              className="whitespace-nowrap rounded-full border border-gold px-4 py-2 text-xs font-medium text-gold-dark hover:bg-blush"
            >
              Izaberi ovaj ukus
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
