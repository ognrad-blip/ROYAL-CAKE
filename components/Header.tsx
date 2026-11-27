import Link from "next/link";
import { Crown } from "./Crown";

const links = [
  { href: "/ponuda", label: "Ponuda" },
  { href: "/galerija", label: "Galerija" },
  { href: "/#o-nama", label: "O nama" },
  { href: "/#pitanja", label: "Pitanja" },
  { href: "/#kontakt", label: "Kontakt" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold-light/10 bg-night/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="Royal Cake, početna">
          <Crown className="h-5 w-8 text-gold-light" />
          <span className="font-serif text-2xl font-semibold tracking-wide text-cream">Royal Cake</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm tracking-wide text-cocoa-soft md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-gold-light">{l.label}</Link>
          ))}
          <Link href="/napravi-tortu" className="btn-gold rounded-full px-5 py-2 text-sm font-medium shadow-sm">
            Napravi svoju tortu
          </Link>
        </nav>
        <Link href="/napravi-tortu" className="btn-gold rounded-full px-4 py-2 text-xs font-medium md:hidden">
          Napravi tortu
        </Link>
      </div>
      <nav className="flex justify-center gap-6 border-t border-gold-light/10 py-2 text-sm text-cocoa-soft md:hidden">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>{l.label}</Link>
        ))}
      </nav>
    </header>
  );
}
