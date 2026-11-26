<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Dizajn je zaključan (odluka vlasnika, 26.11.2026)

Izgled sajta je konačan: tamna tema kao na naslovnoj, boje i tokeni u `app/globals.css`, fontovi Cormorant Garamond + Jost, komponente `components/Naslov.tsx` (SectionTitle, PageHeader), `.glow`, i tok konfiguratora (7 koraka, traka sa cenom i Nazad/Dalje).

- Ne menjati boje, fontove, raspored, animacije ni korake konfiguratora.
- Nove stvari (tekst, cene, slike, sekcije, stranice) dodavati isključivo u postojećem stilu, koristeći postojeće klase i komponente.
- Sadržaj ide u `content/*.json` i `config/torte.json`, ne u kod.
- Ispravke grešaka su dozvoljene ako ne menjaju izgled.
- Promena izgleda samo kada je vlasnik izričito traži.
