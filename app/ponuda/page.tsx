import Link from "next/link";
import ponuda from "@/content/ponuda.json";
import { UkusiTorti } from "@/components/UkusiTorti";
import { ProizvodKartica } from "@/components/ProizvodKartica";
import { PageHeader } from "@/components/Naslov";
import { Crown } from "@/components/Crown";

export const metadata = { title: "Ponuda i cene", description: "Torte po kilogramu, kolači i poslastice Royal Cake Čačak." };

export default function Ponuda() {
  return (
    <>
    <PageHeader nad="Cenovnik" naslov="Naša" istaknuto="ponuda">
      <p>Sve torte možemo uraditi u stilu po vašoj želji. Za tortu po meri koristite</p>
      <Link href="/napravi-tortu" className="btn-gold mt-5 inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium shadow-lg shadow-black/30">
        Konfigurator torte <span aria-hidden>→</span>
      </Link>
    </PageHeader>
    <div className="mx-auto max-w-4xl px-4 pb-16">
      {ponuda.grupe.map((g) => (
        <section key={g.id} className="mt-14">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-gold-light/20 pb-3">
            <h2 className="font-serif text-4xl font-medium md:text-5xl">{g.naslov}</h2>
            <span className="pb-1 text-[10px] uppercase tracking-[0.35em] text-gold-light">{g.opis}</span>
          </div>
          {g.id === "torte" ? <UkusiTorti /> : <ul className="grid items-start gap-3 md:grid-cols-2">
            {ponuda.stavke.filter((x) => x.grupa === g.id).map((x) => <ProizvodKartica key={x.id} s={x} />)}
          </ul>}
        </section>
      ))}
      <div className="glow glow-r mt-16 overflow-hidden rounded-[2rem] border border-gold-light/15 bg-cocoa p-10 text-center text-cream">
        <Crown className="mx-auto mb-4 h-6 w-10 text-gold-light" />
        <p className="font-serif text-4xl font-medium">Želite nešto <em className="gold-text font-semibold">posebno?</em></p>
        <Link href="/napravi-tortu" className="btn-gold mt-5 inline-block rounded-full px-8 py-3 font-medium">Napravi svoju tortu</Link>
      </div>
    </div>
    </>
  );
}
