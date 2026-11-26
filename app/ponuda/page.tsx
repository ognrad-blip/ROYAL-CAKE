import Link from "next/link";
import ponuda from "@/content/ponuda.json";
import { din } from "@/lib/format";

export const metadata = { title: "Ponuda i cene", description: "Torte po kilogramu, kolači i poslastice Royal Cake Čačak." };

export default function Ponuda() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold-dark">Cenovnik</p>
        <h1 className="mt-2 font-serif text-5xl">Ponuda</h1>
        <p className="mx-auto mt-4 max-w-md text-cocoa-soft">Sve torte možemo uraditi u stilu po vašoj želji. Za tortu po meri koristite konfigurator.</p>
      </div>
      {ponuda.grupe.map((g) => (
        <section key={g.id} className="mt-12">
          <div className="mb-4 flex items-baseline justify-between border-b border-gold/40 pb-2">
            <h2 className="font-serif text-3xl">{g.naslov}</h2>
            <span className="text-xs uppercase tracking-widest text-cocoa-soft">{g.opis}</span>
          </div>
          <ul className="grid gap-x-10 md:grid-cols-2">
            {ponuda.stavke.filter((s) => s.grupa === g.id).map((s) => (
              <li key={s.id} className="flex items-baseline gap-2 py-2.5">
                <span className="text-[15px]">{s.naziv}</span>
                <span className="flex-1 border-b border-dotted border-line" />
                <span className="whitespace-nowrap font-medium text-gold-dark">
                  {din(s.cena)}<span className="text-xs text-cocoa-soft"> / {s.jedinica}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <div className="mt-14 rounded-2xl bg-cocoa p-8 text-center text-cream">
        <p className="font-serif text-3xl">Želite nešto posebno?</p>
        <Link href="/napravi-tortu" className="btn-gold mt-5 inline-block rounded-full px-8 py-3 font-medium">Napravi svoju tortu</Link>
      </div>
    </div>
  );
}
