import { Crown } from "./Crown";

/** Naslov sekcije u stilu naslovne: sitna zlatna linija iznad, serif naslov, poslednja reč zlatnim kurzivom. */
export function SectionTitle({ nad, naslov, left }: { nad: string; naslov: string; left?: boolean }) {
  const reci = naslov.split(" ");
  const kraj = reci.pop();
  return (
    <div className={left ? "" : "text-center"}>
      <p className="text-[11px] uppercase tracking-[0.45em] text-gold-light">{nad}</p>
      <h2 className="mt-3 font-serif text-[2.6rem] font-medium leading-none md:text-6xl">
        {reci.join(" ")} <em className="gold-text font-semibold">{kraj}</em>
      </h2>
    </div>
  );
}

/** Zaglavlje podstranice: tamno, sa zlatnim sjajem i krunom, kao hero na naslovnoj. */
export function PageHeader({ nad, naslov, istaknuto, children }: { nad: string; naslov: string; istaknuto?: string; children?: React.ReactNode }) {
  return (
    <section className="glow overflow-hidden border-b border-gold-light/10 px-4 pb-12 pt-12 text-center md:pb-16 md:pt-20">
      <Crown className="mx-auto mb-5 h-7 w-11 text-gold-light" />
      <p className="text-[11px] uppercase tracking-[0.45em] text-gold-light">{nad}</p>
      <h1 className="mt-4 font-serif text-[3.2rem] font-medium leading-[0.95] md:text-[5rem]">
        {naslov} {istaknuto && <em className="gold-text font-semibold">{istaknuto}</em>}
      </h1>
      {children && <div className="mx-auto mt-5 max-w-md text-cream/70">{children}</div>}
    </section>
  );
}
