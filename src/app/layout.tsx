import type { Metadata } from "next";
import "./globals.css";
import {
  PokemonHollow,
  PokemonSolid,
  PokemonClassic,
  PokemonXY,
  NeoDunggeunmoPro,
  PretendardRegular,
} from "./styles/fonts";

// 메타데이터 선언
export const metadata: Metadata = {
  title: "Pokedex",
  description: "포켓몬 도감을 보여줍니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        // var 변수로 선언된 커스텀 폰트를 css 변수로 할당
        className={`${PokemonHollow.variable} ${PokemonSolid.variable} ${PokemonClassic.variable} ${PokemonXY.variable} ${NeoDunggeunmoPro.variable} ${PretendardRegular.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
