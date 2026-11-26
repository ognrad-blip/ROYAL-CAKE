import Image from "next/image";
import Link from "next/link";
import sajt from "@/content/sajt.json";
import ponuda from "@/content/ponuda.json";
import { Crown } from "@/components/Crown";
import { din } from "@/lib/format";

const prilike = [
  { naslov: "Rođendani", slika: "/galerija/0347.webp", href: "/galerija?k=rodjendan" },
  { naslov: "Dečije torte", slika: "/galerija/0357.webp", href: "/galerija?k=decije" },
  { naslov: "Venčanja", slika: "/galerija/0349.webp", href: "/galerija?k=vencanje" },
  { naslov: "Kolači i čaše", slika: "/galerija/0351.webp", href: "/galerija?k=kolaci" },
];

const izdvojeno = ["bajadera", "zlatna-lesnik", "svarcvald", "cizkejk"];

export default function Home() {
  const torte = ponuda.stavke.filter((s) => izdvojeno.includes(s.id));
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-14 pt-8 md:grid-cols-2 md:py-20">
          <div className="order-2 text-center md:order-1 md:text-left">
            <p className="ornament mb-4 text-xs uppercase tracking-[0.35em] text-gold-dark">Poslastičarnica · {sajt.grad}</p>
            <h1 className="font-serif text-5xl font-medium leading-[1.05] md:text-7xl">
              Torte koje se <em className="gold-text not-italic font-semibold">pamte</em>
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-cocoa-soft md:mx-0 md:text-lg">{sajt.uvod}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link href="/napravi-tortu" className="btn-gold rounded-full px-8 py-4 text-center font-medium shadow-md shadow-gold/20">
                Napravi svoju tortu
              </Link>
              <Link href="/ponuda" className="rounded-full border border-gold/50 px-8 py-4 text-center font-medium text-gold-dark hover:bg-ivory">
                Pogledaj ponudu
              </Link>
            </div>
          </div>
          <div className="relative order-1 mx-auto w-full max-w-sm md:order-2 md:max-w-none">
            <div className="absolute -inset-3 rounded-[2.5rem] border border-gold/30" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl shadow-cocoa/10">
              <Image src="/galerija/0359.webp" alt="Torta sa ružama, Royal Cake" fill priority sizes="(max-width:768px) 90vw, 45vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-3 hidden w-36 overflow-hidden rounded-2xl border-4 border-cream shadow-lg sm:block">
              <div className="relative aspect-square">
                <Image src="/galerija/0344.webp" alt="Torta za 18. rođendan" fill sizes="150px" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prilike */}
      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle nad="Za svaku priliku" naslov="Naši radovi" />
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {prilike.map((p) => (
              <Link key={p.naslov} href={p.href} className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image src={p.slika} alt={p.naslov} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/10 to-transparent" />
                <p className="absolute inset-x-0 bottom-4 text-center font-serif text-2xl text-cream">{p.naslov}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Konfigurator CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative overflow-hidden rounded-[2rem] bg-cocoa px-6 py-12 text-center text-cream md:px-16 md:py-16">
            <Crown className="mx-auto mb-4 h-8 w-12 text-gold-light" />
            <h2 className="font-serif text-4xl md:text-5xl">Napravi svoju tortu</h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/75">
              Izaberi priliku, veličinu, ukus i stil. Odmah vidiš okvirnu cenu, a Dušanka ti se javlja da potvrdi detalje.
            </p>
            <ol className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 text-left text-sm md:grid-cols-4">
              {["Prilika i veličina", "Ukus i fil", "Stil i detalji", "Pošalji upit"].map((k, i) => (
                <li key={k} className="rounded-xl border border-gold/30 p-3">
                  <span className="font-serif text-2xl text-gold-light">{i + 1}</span>
                  <p className="mt-1 text-cream/85">{k}</p>
                </li>
              ))}
            </ol>
            <Link href="/napravi-tortu" className="btn-gold mt-9 inline-block rounded-full px-9 py-4 font-medium">
              Počni
            </Link>
          </div>
        </div>
      </section>

      {/* Izdvojene torte */}
      <section className="bg-cream-deep/60 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle nad="Iz ponude" naslov="Omiljene torte" />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {torte.map((t) => (
              <div key={t.id} className="rounded-2xl border border-line bg-ivory p-5 text-center">
                <p className="font-serif text-2xl">{t.naziv}</p>
                <p className="mt-2 text-sm text-gold-dark">{din(t.cena)} / kg</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/ponuda" className="text-sm font-medium tracking-wide text-gold-dark underline underline-offset-4">
              Cela ponuda, {ponuda.stavke.length} torti i kolača
            </Link>
          </div>
        </div>
      </section>

      {/* O nama */}
      <section className="py-16">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-[2rem]">
            <Image src="/galerija/0361.webp" alt="Domaći kolači Royal Cake" fill sizes="(max-width:768px) 90vw, 40vw" className="object-cover" />
          </div>
          <div>
            <SectionTitle nad="O nama" naslov="Pravljeno s ljubavlju" left />
            <p className="mt-5 leading-relaxed text-cocoa-soft">{sajt.oNama}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionTitle({ nad, naslov, left }: { nad: string; naslov: string; left?: boolean }) {
  return (
    <div className={left ? "" : "text-center"}>
      <p className="text-xs uppercase tracking-[0.35em] text-gold-dark">{nad}</p>
      <h2 className="mt-2 font-serif text-4xl md:text-5xl">{naslov}</h2>
    </div>
  );
}
