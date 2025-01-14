import localFont from "next/font/local";

// 커스텀 폰트; variable을 통해 var 변수로 선언됨

// 영문 폰트
export const PokemonHollow = localFont({
  src: "../assets/fonts/PokemonHollow.ttf",
  variable: "--font-pokemon-hollow",
});

export const PokemonSolid = localFont({
  src: "../assets/fonts/PokemonSolid.ttf",
  variable: "--font-pokemon-solid",
});

export const PokemonClassic = localFont({
  src: "../assets/fonts/PokemonClassic.ttf",
  variable: "--font-pokemon-classic",
});

export const PokemonXY = localFont({
  src: "../assets/fonts/PokemonXY.ttf",
  variable: "--font-pokemon-XY",
});

// 한글 폰트
export const NeoDunggeunmoPro = localFont({
  src: "../assets/fonts/NeoDunggeunmoProRegular.woff",
  variable: "--font-neo-dunggeunmo-pro",
});

// 한영 공용 폰트
export const PretendardRegular = localFont({
  src: "../assets/fonts/PretendardRegular.otf",
  variable: "--font-pretendard-regular",
});
