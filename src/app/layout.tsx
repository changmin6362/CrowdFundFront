import type { Metadata } from "next";
import "./globals.css";
import {
  PretendardRegular,
} from "@styles/fonts";

// 메타데이터 선언
export const metadata: Metadata = {
  title: "CrowdFund",
  description: "크라우드 펀딩 사이트입니다.",
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
        className={`${PretendardRegular.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
