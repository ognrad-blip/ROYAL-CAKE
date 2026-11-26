import { Suspense } from "react";
import { GalerijaGrid } from "./GalerijaGrid";

export const metadata = { title: "Galerija", description: "Torte i kolači Royal Cake: rođendani, dečije torte, venčanja." };

export default function Galerija() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold-dark">Naši radovi</p>
        <h1 className="mt-2 font-serif text-5xl">Galerija</h1>
      </div>
      <Suspense>
        <GalerijaGrid />
      </Suspense>
    </div>
  );
}
