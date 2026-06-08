import localFont from "next/font/local";

// 커스텀 폰트; variable을 통해 var 변수로 선언됨

// 한영 공용 폰트
export const PretendardRegular = localFont({
  src: "../assets/fonts/PretendardRegular.otf",
  variable: "--font-pretendard-regular",
});
