import { Suspense } from "react";
import { Konfigurator } from "./Konfigurator";

export const metadata = {
  title: "Napravi svoju tortu",
  description: "Sklopi tortu za rođendan, venčanje ili krštenje, vidi okvirnu cenu i pošalji upit Royal Cake poslastičarnici.",
  openGraph: { title: "Napravi svoju tortu | Royal Cake Čačak", images: ["/galerija/0358.webp"] },
};

export default function Page() {
  return (
    <div className="glow relative z-10 min-h-[80svh]">
      <Suspense>
        <Konfigurator />
      </Suspense>
    </div>
  );
}
