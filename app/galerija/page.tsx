import { Suspense } from "react";
import galerija from "@/content/galerija.json";
import { GalerijaGrid } from "./GalerijaGrid";
import { PageHeader } from "@/components/Naslov";

export const metadata = { title: "Galerija", description: "Torte i kolači Royal Cake: rođendani, dečije torte, venčanja." };

export default function Galerija() {
  return (
    <>
      <PageHeader nad="Naši radovi" naslov="" istaknuto="Galerija">
        <p className="text-sm">
          {galerija.slike.length} torti i kolača iz naše radionice. Dodirnite sliku za detalje, a ako vam se dopadne, naručite sličnu.
        </p>
      </PageHeader>
      <Suspense>
        <GalerijaGrid />
      </Suspense>
    </>
  );
}
