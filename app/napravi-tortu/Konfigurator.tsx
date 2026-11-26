"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { VrstaFilter, filtriraj } from "@/components/UkusiTorti";
import cfg from "@/config/torte.json";
import ponuda from "@/content/ponuda.json";
import galerija from "@/content/galerija.json";
import { din } from "@/lib/format";

type Izbor = {
  prilika?: string;
  osobe: number;
  spratovi?: string;
  ukusi: (string | undefined)[];
  stil?: string;
  boje: string[];
  detalji: string[];
  natpis: string;
  inspiracija?: string;
  datum: string;
  preuzimanje?: string;
  ime: string;
  telefon: string;
  napomena: string;
};

const KORACI = ["Prilika", "Veličina", "Ukus", "Stil", "Detalji", "Datum", "Upit"];
const ukusi = ponuda.stavke.filter((s) => s.grupa === cfg.ukusiIzPonude);
const udeo = cfg.udeoPoSpratu as unknown as Record<string, number[]>;
const NAZIV_SPRATA = ["Donji sprat", "Srednji sprat", "Gornji sprat"];

function danaDo(datum: string) {
  if (!datum) return Infinity;
  const d = new Date(datum + "T12:00:00");
  return Math.ceil((d.getTime() - Date.now()) / 86400000);
}

export function Konfigurator() {
  const [korak, setKorak] = useState(0);
  const [poslato, setPoslato] = useState(false);
  const params = useSearchParams();
  const izLinka = ukusi.find((u) => u.id === params.get("ukus"))?.id;
  const [vrsta, setVrsta] = useState("sve");
  const [aktivniSprat, setAktivniSprat] = useState(0);
  const [z, setZ] = useState<Izbor>({
    osobe: cfg.osobe.podrazumevano,
    ukusi: izLinka ? [izLinka] : [],
    stil: galerija.slike.find((g) => g.id === params.get("stil"))?.id,
    boje: [],
    detalji: [],
    natpis: "",
    datum: "",
    ime: "",
    telefon: "",
    napomena: "",
  });
  const set = (p: Partial<Izbor>) => setZ((s) => ({ ...s, ...p }));

  const kg = Math.max(cfg.minKg.vrednost, Math.round(z.osobe * cfg.kgPoOsobi.vrednost * 2) / 2);
  const brojSpratova = Number(z.spratovi ?? 1);
  const udeli = udeo[String(brojSpratova)] ?? [1];
  const ukusSprata = (i: number) => ukusi.find((u) => u.id === (z.ukusi[i] ?? z.ukusi[0]));
  const sviIzabrani = udeli.every((_, i) => !!ukusSprata(i));
  const cena = sviIzabrani ? udeli.reduce((sum, d, i) => sum + kg * d * ukusSprata(i)!.cena, 0) : null;
  const opisUkusa = udeli
    .map((_, i) => ukusSprata(i)?.naziv)
    .map((n, i) => (brojSpratova > 1 ? `${NAZIV_SPRATA[brojSpratova === 2 && i === 1 ? 2 : i]}: ${n ?? "-"}` : n ?? "-"))
    .join(", ");
  const prilika = cfg.prilike.find((p) => p.id === z.prilika);
  const vencanje = z.prilika === "vencanje";
  const minDana = vencanje ? cfg.rokovi.vencanjeDana.vrednost : cfg.rokovi.standardDana.vrednost;
  const prekratko = danaDo(z.datum) < minDana;
  const spratovi = cfg.spratovi.filter(
    (s) => (!("minOsoba" in s) || z.osobe >= (s.minOsoba ?? 0)) && (!("maxOsoba" in s) || z.osobe <= (s.maxOsoba ?? 999)),
  );

  const moze = [
    !!z.prilika,
    !!z.spratovi,
    sviIzabrani,
    true,
    true,
    !!z.datum && !!z.preuzimanje,
    z.ime.trim().length > 1 && z.telefon.trim().length > 5,
  ][korak];

  const poruka = useMemo(() => {
    const stil = galerija.slike.find((s) => s.src.includes(z.stil ?? "---"));
    const det = cfg.detalji.filter((d) => z.detalji.includes(d.id)).map((d) => d.naziv);
    return [
      "Upit za tortu (sajt Royal Cake)",
      `Prilika: ${prilika?.naziv ?? "-"}`,
      `Broj osoba: ${z.osobe} (oko ${kg} kg)`,
      `Spratovi: ${cfg.spratovi.find((s) => s.id === z.spratovi)?.naziv ?? "-"}`,
      `Ukus: ${opisUkusa}`,
      `Stil: ${stil ? stil.naslov : "po dogovoru"}`,
      `Boje: ${z.boje.join(", ") || "-"}`,
      `Detalji: ${det.join(", ") || "-"}`,
      z.natpis ? `Natpis: "${z.natpis}"` : "",
      z.inspiracija ? "Slika za inspiraciju: šaljem odvojeno" : "",
      `Datum: ${z.datum}`,
      `Preuzimanje: ${cfg.preuzimanje.find((p) => p.id === z.preuzimanje)?.naziv.replace(/\s*\[.*\]/, "") ?? "-"}`,
      `Okvirna cena: ${cena ? din(cena) : "-"} (bez ukrasa)`,
      `Ime: ${z.ime}`,
      `Telefon: ${z.telefon}`,
      z.napomena ? `Napomena: ${z.napomena}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }, [z, kg, cena, prilika, opisUkusa]);

  if (poslato) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="font-serif text-5xl">Hvala, {z.ime.split(" ")[0]}!</p>
        <p className="mt-4 text-cocoa-soft">
          Upit je pripremljen. Dušanka će vam se javiti da potvrdi detalje i konačnu cenu. Kaparu možete uplatiti na račun ili u radnji.
        </p>
        <Link href="/" className="btn-gold mt-8 inline-block rounded-full px-8 py-3">Nazad na početnu</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-40 pt-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-[11px] uppercase tracking-wider text-cocoa-soft">
          <span>Korak {korak + 1} od {KORACI.length}</span>
          <span className="text-gold-dark">{KORACI[korak]}</span>
        </div>
        <div className="mt-2 h-1 rounded-full bg-line">
          <div className="btn-gold h-1 rounded-full transition-all" style={{ width: `${((korak + 1) / KORACI.length) * 100}%` }} />
        </div>
      </div>

      {korak === 0 && (
        <Step naslov="Za koju priliku?">
          <div className="grid grid-cols-2 gap-3">
            {cfg.prilike.map((p) => (
              <Choice key={p.id} active={z.prilika === p.id} onClick={() => set({ prilika: p.id })}>
                <span className="text-2xl">{p.ikona}</span>
                <span className="mt-1 block font-medium">{p.naziv}</span>
              </Choice>
            ))}
          </div>
          {vencanje && (
            <Note>Svadbene torte naručujte bar {cfg.rokovi.vencanjeDana.vrednost} dana unapred.</Note>
          )}
        </Step>
      )}

      {korak === 1 && (
        <Step naslov="Za koliko osoba?">
          <div className="rounded-2xl border border-line bg-ivory p-6 text-center">
            <p className="font-serif text-6xl text-gold-dark">{z.osobe}</p>
            <p className="text-sm text-cocoa-soft">osoba · oko {kg} kg</p>
            <input
              type="range"
              min={cfg.osobe.min}
              max={cfg.osobe.max}
              step={cfg.osobe.korak}
              value={z.osobe}
              onChange={(e) => {
                const osobe = +e.target.value;
                set({ osobe, spratovi: undefined });
              }}
              className="mt-5 w-full accent-[var(--gold)]"
            />
          </div>
          <p className="mb-2 mt-6 text-sm font-medium">Broj spratova</p>
          <div className="grid grid-cols-3 gap-3">
            {spratovi.map((s) => (
              <Choice key={s.id} active={z.spratovi === s.id} onClick={() => set({ spratovi: s.id })}>
                <span className="font-serif text-3xl">{s.id}</span>
                <span className="block text-xs">{s.naziv}</span>
              </Choice>
            ))}
          </div>
        </Step>
      )}

      {korak === 2 && (
        <Step
          naslov="Ukus i fil"
          podnaslov={brojSpratova > 1 ? "Svaki sprat može biti drugog ukusa. Izaberite sprat, pa ukus." : undefined}
        >
          {brojSpratova > 1 && (
            <div className="mb-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${brojSpratova}, 1fr)` }}>
              {udeli.map((_, i) => {
                const naziv = NAZIV_SPRATA[brojSpratova === 2 && i === 1 ? 2 : i];
                return (
                  <button
                    key={i}
                    onClick={() => setAktivniSprat(i)}
                    className={`rounded-xl border px-2 py-2 text-left text-xs ${Math.min(aktivniSprat, brojSpratova - 1) === i ? "border-gold bg-blush ring-1 ring-gold" : "border-line bg-ivory"}`}
                  >
                    <span className="block font-medium">{naziv}</span>
                    <span className="block truncate text-gold-dark">{ukusSprata(i)?.naziv ?? "Izaberite"}</span>
                  </button>
                );
              })}
            </div>
          )}
          <VrstaFilter value={vrsta} onChange={setVrsta} />
          <div className="mt-3 grid grid-cols-2 gap-2">
            {filtriraj(vrsta).map((u) => {
              const i = Math.min(aktivniSprat, brojSpratova - 1);
              const active = (z.ukusi[i] ?? (i > 0 ? undefined : z.ukusi[0])) === u.id;
              return (
                <Choice
                  key={u.id}
                  active={active}
                  compact
                  onClick={() => {
                    const n = [...z.ukusi];
                    n[i] = u.id;
                    if (i === 0) for (let j = 1; j < brojSpratova; j++) if (!n[j]) n[j] = u.id;
                    set({ ukusi: n });
                    if (brojSpratova > 1 && i < brojSpratova - 1) setAktivniSprat(i + 1);
                  }}
                >
                  <span className="block font-medium">{u.naziv}</span>
                  <span className="text-xs text-gold-dark">{din(u.cena)}/kg</span>
                </Choice>
              );
            })}
          </div>
        </Step>
      )}

      {korak === 3 && (
        <Step naslov="Izaberite stil" podnaslov="Izaberite tortu iz naše galerije koja vam se najviše dopada. Nije obavezno.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(z.stil && !cfg.stilovi.includes(z.stil) ? [z.stil, ...cfg.stilovi] : cfg.stilovi).map((id) => {
              const s = galerija.slike.find((g) => g.src.includes(id))!;
              return (
                <button
                  key={id}
                  onClick={() => set({ stil: z.stil === id ? undefined : id })}
                  className={`relative aspect-[3/4] overflow-hidden rounded-2xl ring-offset-2 ring-offset-cream ${z.stil === id ? "ring-2 ring-gold" : ""}`}
                >
                  <Image src={s.src} alt={s.naslov} fill sizes="(max-width:640px) 45vw, 160px" className="object-cover" />
                  {z.stil === id && <span className="btn-gold absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        </Step>
      )}

      {korak === 4 && (
        <Step naslov="Boje i detalji">
          <p className="mb-2 text-sm font-medium">Boje</p>
          <div className="flex flex-wrap gap-2">
            {cfg.boje.map((b) => (
              <Pill key={b} active={z.boje.includes(b)} onClick={() => set({ boje: toggle(z.boje, b) })}>{b}</Pill>
            ))}
          </div>
          <p className="mb-2 mt-6 text-sm font-medium">Ukrasi</p>
          <div className="flex flex-wrap gap-2">
            {cfg.detalji.map((d) => (
              <Pill key={d.id} active={z.detalji.includes(d.id)} onClick={() => set({ detalji: toggle(z.detalji, d.id) })}>{d.naziv}</Pill>
            ))}
          </div>
          {z.detalji.includes("natpis") && (
            <input
              placeholder="Tekst natpisa, npr. Srećan 18. rođendan, Ana"
              value={z.natpis}
              onChange={(e) => set({ natpis: e.target.value })}
              className="mt-4 w-full rounded-xl border border-line bg-ivory px-4 py-3"
            />
          )}
          <p className="mb-2 mt-6 text-sm font-medium">Slika za inspiraciju (opciono)</p>
          <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-gold/60 bg-ivory p-4">
            {z.inspiracija ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={z.inspiracija} alt="Inspiracija" className="h-16 w-16 rounded-lg object-cover" />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-lg bg-cream-deep text-2xl">📷</span>
            )}
            <span className="text-sm text-cocoa-soft">{z.inspiracija ? "Promeni sliku" : "Dodaj sliku sa telefona"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) set({ inspiracija: URL.createObjectURL(f) });
              }}
            />
          </label>
          <Note>Cena ukrasa se dogovara sa Dušankom i nije uračunata u okvirnu cenu.</Note>
        </Step>
      )}

      {korak === 5 && (
        <Step naslov="Datum i preuzimanje">
          <input
            type="date"
            value={z.datum}
            onChange={(e) => set({ datum: e.target.value })}
            className="w-full rounded-xl border border-line bg-ivory px-4 py-3"
          />
          {z.datum && prekratko && (
            <Note warn>
              Za {vencanje ? "svadbene torte" : "torte po meri"} potrebno je bar {minDana} dana. Pošaljite upit, a Dušanka će proveriti da li je moguće.
            </Note>
          )}
          <div className="mt-4 grid gap-3">
            {cfg.preuzimanje.map((p) => (
              <Choice key={p.id} active={z.preuzimanje === p.id} onClick={() => set({ preuzimanje: p.id })} compact>
                {p.naziv}
              </Choice>
            ))}
          </div>
        </Step>
      )}

      {korak === 6 && (
        <Step naslov="Vaši podaci">
          <div className="grid gap-3">
            <input placeholder="Ime i prezime" value={z.ime} onChange={(e) => set({ ime: e.target.value })} className="rounded-xl border border-line bg-ivory px-4 py-3" />
            <input placeholder="Telefon (Viber / WhatsApp)" type="tel" value={z.telefon} onChange={(e) => set({ telefon: e.target.value })} className="rounded-xl border border-line bg-ivory px-4 py-3" />
            <textarea placeholder="Napomena (opciono)" rows={3} value={z.napomena} onChange={(e) => set({ napomena: e.target.value })} className="rounded-xl border border-line bg-ivory px-4 py-3" />
          </div>
          <div className="mt-6 rounded-2xl border border-line bg-ivory p-5">
            <p className="mb-2 font-serif text-2xl">Pregled upita</p>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-cocoa-soft">{poruka}</pre>
          </div>
          <p className="mt-3 text-xs text-cocoa-soft">
            Vaše podatke koristimo samo da bismo vam odgovorili na upit. [POPUNITI: link ka politici privatnosti]
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a
              href={`https://wa.me/${cfg.kontakt.whatsapp}?text=${encodeURIComponent(poruka)}`}
              target="_blank"
              onClick={() => moze && setTimeout(() => setPoslato(true), 400)}
              className={`btn-gold rounded-full py-4 text-center font-medium ${moze ? "" : "pointer-events-none opacity-40"}`}
            >
              Pošalji preko WhatsApp-a
            </a>
            <a
              href={`viber://forward?text=${encodeURIComponent(poruka)}`}
              onClick={() => moze && setTimeout(() => setPoslato(true), 400)}
              className={`rounded-full border border-gold py-4 text-center font-medium text-gold-dark ${moze ? "" : "pointer-events-none opacity-40"}`}
            >
              Pošalji preko Vibera
            </a>
          </div>
        </Step>
      )}

      {/* Sticky footer: price + nav */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-wider text-cocoa-soft">Okvirna cena</p>
            <p className="font-serif text-2xl text-gold-dark">{cena ? din(cena) : "—"}</p>
          </div>
          {korak > 0 && (
            <button onClick={() => { setKorak(korak - 1); window.scrollTo(0, 0); }} className="rounded-full border border-line px-5 py-3 text-sm">Nazad</button>
          )}
          {korak < KORACI.length - 1 && (
            <button
              disabled={!moze}
              onClick={() => { setKorak(korak + 1); window.scrollTo(0, 0); }}
              className="btn-gold rounded-full px-7 py-3 text-sm font-medium disabled:opacity-40"
            >
              Dalje
            </button>
          )}
        </div>
        <p className="pb-2 text-center text-[10px] text-cocoa-soft">Cena je okvirna. Konačnu cenu potvrđuje Dušanka.</p>
      </div>
    </div>
  );
}

function toggle(arr: string[], v: string) {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

function Step({ naslov, podnaslov, children }: { naslov: string; podnaslov?: string; children: React.ReactNode }) {
  return (
    <section>
      <h1 className="font-serif text-4xl">{naslov}</h1>
      {podnaslov && <p className="mt-2 text-sm text-cocoa-soft">{podnaslov}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Choice({ active, onClick, children, compact }: { active: boolean; onClick: () => void; children: React.ReactNode; compact?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border text-left transition ${compact ? "px-4 py-3" : "p-5"} ${
        active ? "border-gold bg-blush ring-1 ring-gold shadow-sm" : "border-line bg-ivory hover:border-gold/50"
      }`}
    >
      {children}
    </button>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm ${active ? "btn-gold border-transparent" : "border-line bg-ivory text-cocoa-soft"}`}
    >
      {children}
    </button>
  );
}

function Note({ children, warn }: { children: React.ReactNode; warn?: boolean }) {
  return (
    <p className={`mt-4 rounded-xl px-4 py-3 text-sm ${warn ? "bg-blush text-cocoa" : "bg-cream-deep text-cocoa-soft"}`}>{children}</p>
  );
}
