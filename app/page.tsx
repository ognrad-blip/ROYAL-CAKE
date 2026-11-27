import Image from "next/image";
import Link from "next/link";
import sajt from "@/content/sajt.json";
import ponuda from "@/content/ponuda.json";
import { Crown } from "@/components/Crown";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/Naslov";
import { din } from "@/lib/format";
import pitanja from "@/content/pitanja.json";

const prilike = [
  { naslov: "Rođendani", slika: "/galerija/0347.webp", href: "/galerija?k=rodjendan" },
  { naslov: "Dečije torte", slika: "/galerija/0357.webp", href: "/galerija?k=decije" },
  { naslov: "Venčanja", slika: "/galerija/0349.webp", href: "/galerija?k=vencanje" },
  { naslov: "Kolači i čaše", slika: "/galerija/0351.webp", href: "/galerija?k=kolaci" },
];

const oNama = sajt.oNama;

const izdvojeno = ["bajadera", "zlatna-lesnik", "svarcvald", "cizkejk"];

export default function Home() {
  const torte = ponuda.stavke.filter((s) => izdvojeno.includes(s.id));
  return (
    <>
      <Hero />

      {/* Prilike */}
      <section className="glow glow-r border-t border-gold-light/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle nad="Za svaku priliku" naslov="Naši radovi" />
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {prilike.map((p) => (
              <Link key={p.naslov} href={p.href} className="group relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-gold-light/20">
                <Image src={p.slika} alt={p.naslov} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/85 via-cocoa/10 to-transparent" />
                <p className="absolute inset-x-0 bottom-4 text-center font-serif text-2xl italic text-cream">{p.naslov}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Konfigurator CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="glow relative overflow-hidden rounded-[2rem] border border-gold-light/15 bg-cocoa px-6 py-12 text-center text-cream md:px-16 md:py-16">
            <Crown className="mx-auto mb-4 h-8 w-12 text-gold-light" />
            <h2 className="font-serif text-[2.6rem] font-medium leading-none md:text-6xl">Napravi <em className="gold-text font-semibold">svoju</em> tortu</h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/75">
              Izaberi priliku, veličinu, ukus i stil. Odmah vidiš okvirnu cenu, a Dušanka ti se javlja da potvrdi detalje.
            </p>
            <ol className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 text-left text-sm md:grid-cols-4">
              {["Prilika i veličina", "Ukus i fil", "Stil i detalji", "Pošalji upit"].map((k, i) => (
                <li key={k} className="rounded-xl border border-gold-light/20 p-3">
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
      <section className="glow border-t border-gold-light/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle nad="Iz ponude" naslov="Omiljene torte" />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {torte.map((t) => (
              <Link key={t.id} href={`/napravi-tortu?ukus=${t.id}`} className="rounded-2xl border border-gold-light/15 bg-ivory/70 p-6 text-center transition hover:border-gold-light/40">
                <Crown className="mx-auto mb-3 h-4 w-7 text-gold-light/60" />
                <p className="font-serif text-2xl">{t.naziv}</p>
                <p className="mt-2 text-sm text-gold-light">{din(t.cena)} / kg</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/ponuda" className="inline-block rounded-full border border-gold-light/40 px-7 py-3 text-sm font-medium text-gold-light hover:bg-white/5">
              Cela ponuda, {ponuda.stavke.length} torti i kolača
            </Link>
          </div>
        </div>
      </section>

      {/* Kako poručujem */}
      <section id="kako-porucujem" className="glow glow-r border-t border-gold-light/10 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle nad="Jednostavno" naslov="Kako poručujem?" />
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {pitanja.kakoPorucujem.map((k, i) => (
              <li key={k.naslov} className="relative rounded-2xl border border-gold-light/15 bg-ivory/70 p-6">
                <span className="btn-gold flex h-9 w-9 items-center justify-center rounded-full font-serif text-lg">{i + 1}</span>
                <p className="mt-3 font-serif text-2xl">{k.naslov}</p>
                <p className="mt-1 text-sm leading-relaxed text-cocoa-soft">{k.tekst}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center">
            <Link href="/napravi-tortu" className="btn-gold inline-block rounded-full px-8 py-3 font-medium">Napravi svoju tortu</Link>
          </div>
        </div>
      </section>

      {/* O nama */}
      <section id="o-nama" className="glow scroll-mt-28 border-t border-gold-light/10 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-gold-light/20 md:aspect-square">
              <Image src="/galerija/0361.webp" alt="Domaći kolači Royal Cake" fill sizes="(max-width:768px) 90vw, 40vw" className="object-cover" />
            </div>
            <div>
              <SectionTitle nad="O nama" naslov={oNama.naslov} left />
              <div className="mt-6 space-y-4 leading-relaxed text-cocoa-soft">
                {oNama.pasusi.map((p, i) => (
                  <p key={i} className={i === 0 ? "font-serif text-2xl leading-snug text-cream" : ""}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3 md:gap-4">
            {oNama.odlike.map((o) => (
              <div key={o.tekst} className="rounded-2xl border border-gold-light/15 bg-ivory/70 p-4 text-center md:p-6">
                <p className="gold-text font-serif text-[1.65rem] font-semibold leading-tight md:text-5xl">{o.broj}</p>
                <p className="mt-2 text-xs leading-snug text-cocoa-soft md:text-sm">{o.tekst}</p>
              </div>
            ))}
          </div>

          <figure className="mx-auto mt-14 max-w-2xl text-center">
            <Crown className="mx-auto mb-4 h-5 w-8 text-gold-light/70" />
            <blockquote className="font-serif text-5xl italic leading-none text-cream md:text-6xl">„{oNama.citat}“</blockquote>
            <figcaption className="mt-4 text-sm text-cocoa-soft">{oNama.citatOpis}</figcaption>
            <p className="mt-8 text-[11px] uppercase tracking-[0.45em] text-gold-light">
              {oNama.moto.join(" · ")}
            </p>
          </figure>

          <div className="glow relative mt-14 overflow-hidden rounded-[2rem] border border-gold-light/15 bg-cocoa px-6 py-10 text-cream md:px-12 md:py-12">
            <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.45em] text-gold-light">Rashladno vozilo</p>
                <h3 className="mt-3 font-serif text-4xl font-medium leading-none md:text-5xl">
                  {oNama.dostava.naslov} <em className="gold-text font-semibold">širom Srbije</em>
                </h3>
                <p className="mt-4 leading-relaxed text-cream/75">{oNama.dostava.tekst}</p>
              </div>
              <ul className="flex flex-wrap gap-2 md:justify-end">
                {oNama.dostava.gradovi.map((g) => (
                  <li key={g} className="rounded-full border border-gold-light/30 px-4 py-2 text-sm text-cream/85">{g}</li>
                ))}
              </ul>
            </div>
            <div className="mt-9 flex flex-col items-center gap-3 border-t border-gold-light/10 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <p className="text-sm text-cream/70">{oNama.rezervacija}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={`tel:${sajt.telefonLink}`} className="btn-gold rounded-full px-7 py-3 font-medium">Pozovite {sajt.telefon}</a>
                <a href={sajt.instagramLink} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold-light/40 px-7 py-3 text-sm font-medium text-gold-light hover:bg-white/5">
                  Instagram {sajt.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Česta pitanja */}
      <section id="pitanja" className="glow glow-r border-t border-gold-light/10 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <SectionTitle nad="Imate pitanje?" naslov="Česta pitanja" />
          <div className="mt-8 divide-y divide-gold-light/10 rounded-2xl border border-gold-light/15 bg-ivory/60">
            {pitanja.pitanja.map((q) => (
              <details key={q.p} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {q.p}
                  <span className="text-xl text-gold-light transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-cocoa-soft">{q.o}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
