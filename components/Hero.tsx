import Image from "next/image";
import Link from "next/link";
import naslovna from "@/content/naslovna.json";
import sajt from "@/content/sajt.json";
import { Crown } from "./Crown";

const slike = naslovna.slike;
const kolone = [0, 1, 2].map((c) => slike.filter((_, i) => i % 3 === c));

function Kartica({ src, priority }: { src: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl ring-1 ring-gold-light/20">
      <Image src={src} alt="Torta, inspiracija" fill priority={priority} sizes="(max-width:768px) 40vw, 18vw" className="object-cover" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-night text-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(217,191,140,0.16),transparent_60%)]" />
      {/* Mobile: horizontal marquee strip */}
      <div className="fade-x relative pt-6 md:hidden">
        <div className="marquee-x flex w-max gap-3">
          {[...slike, ...slike].map((s, i) => (
            <div key={i} className="w-32 shrink-0">
              <Kartica src={s.src} priority={i < 3} />
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-8 md:h-[calc(100svh-61px)] md:min-h-[620px] md:grid-cols-[1.05fr_1fr] md:py-0">
        {/* Text */}
        <div className="text-center md:text-left">
          <Crown className="mx-auto mb-5 h-7 w-11 text-gold-light md:mx-0" />
          <p className="text-[11px] uppercase tracking-[0.45em] text-gold-light">Poslastičarnica · {sajt.grad}</p>
          <h1 className="mt-4 font-serif text-[3.4rem] font-medium leading-[0.95] md:text-[5.5rem]">
            Torta <em className="gold-text font-semibold">vaših</em>
            <br />
            snova
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-cream/70 md:mx-0 md:text-lg">
            Ručno rađene torte za rođendane, venčanja i trenutke koji se pamte. Opišite nam ideju, a mi je pretvaramo u tortu.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link href="/napravi-tortu" className="btn-gold rounded-full px-8 py-4 text-center font-medium shadow-lg shadow-black/30">
              Napravi svoju tortu
            </Link>
            <Link href="/galerija" className="rounded-full border border-gold-light/40 px-8 py-4 text-center font-medium text-gold-light hover:bg-white/5">
              Naši radovi
            </Link>
          </div>
        </div>

        {/* Desktop: three vertical marquee columns */}
        <div className="fade-y relative hidden h-full gap-4 md:grid md:grid-cols-3">
          {kolone.map((kol, c) => (
            <div key={c} className="relative h-full overflow-hidden">
              <div
                className="marquee-y absolute inset-x-0 top-0 flex flex-col gap-4"
                style={{ animationDuration: `${38 + c * 8}s`, animationDirection: c === 1 ? "reverse" : "normal" }}
              >
                {[...kol, ...kol].map((s, i) => (
                  <Kartica key={i} src={s.src} priority={i === 0} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.3em] text-cream/35">{naslovna.oznaka}</p>
    </section>
  );
}
