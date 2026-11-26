"use client";
import { useState } from "react";
import ponuda from "@/content/ponuda.json";
import { ProizvodKartica } from "./ProizvodKartica";

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
  return (
    <>
      <VrstaFilter value={vrsta} onChange={setVrsta} />
      <ul className="mt-4 grid items-start gap-3 md:grid-cols-2">
        {filtriraj(vrsta).map((s) => (
          <ProizvodKartica key={s.id} s={s} />
        ))}
      </ul>
    </>
  );
}
