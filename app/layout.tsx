import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});
const jost = Jost({ variable: "--font-jost", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: { default: "Royal Cake Čačak | Torte i kolači po meri", template: "%s | Royal Cake Čačak" },
  description: "Ručno rađene torte i kolači iz Čačka. Napravite svoju tortu za rođendan, venčanje ili krštenje i pošaljite upit.",
  openGraph: {
    title: "Royal Cake Čačak",
    description: "Torte i kolači za svaku priliku. Napravi svoju tortu online.",
    images: ["/galerija/0347.webp"],
    locale: "sr_RS",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#faf5ee" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${cormorant.variable} ${jost.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
