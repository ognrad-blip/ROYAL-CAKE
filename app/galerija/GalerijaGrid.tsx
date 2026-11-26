"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import galerija from "@/content/galerija.json";

export function GalerijaGrid() {
  const params = useSearchParams();
  const [k, setK] = useState<string>(params.get("k") ?? "sve");
  const [open, setOpen] = useState<string | null>(null);
  const slike = galerija.slike.filter(
    (s) => k === "sve" || s.kategorija === k || (k === "rodjendan" && s.kategorija === "punoletstvo"),
  );
  const aktivna = galerija.slike.find((s) => s.src === open);
  return (
    <>
      <div className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 md:justify-center">
        {[{ id: "sve", naziv: "Sve" }, ...galerija.kategorije].map((c) => (
          <button
            key={c.id}
            onClick={() => setK(c.id)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
              k === c.id ? "btn-gold border-transparent" : "border-line bg-ivory text-cocoa-soft"
            }`}
          >
            {c.naziv}
          </button>
        ))}
      </div>
      <div className="mt-6 columns-2 gap-3 md:columns-3 md:gap-5">
        {slike.map((s) => (
          <button key={s.src} onClick={() => setOpen(s.src)} className="mb-3 block w-full overflow-hidden rounded-2xl md:mb-5">
            <Image src={s.src} alt={s.naslov} width={600} height={800} sizes="(max-width:768px) 50vw, 33vw" className="h-auto w-full transition duration-500 hover:scale-[1.03]" />
          </button>
        ))}
      </div>
      {aktivna && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/90 p-4" onClick={() => setOpen(null)}>
          <div className="relative max-h-[90vh] w-full max-w-lg">
            <Image src={aktivna.src} alt={aktivna.naslov} width={1200} height={1600} className="max-h-[80vh] w-full rounded-2xl object-contain" />
            <p className="mt-3 text-center font-serif text-xl text-cream">{aktivna.naslov}</p>
          </div>
        </div>
      )}
    </>
  );
}
