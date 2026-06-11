/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // 이미지를 허용하는 URL 설정(1. Github 이미지 허용, 2. 이미지 서버 생성 후 수정 예정)
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pokedex-changmin.vercel.app",
      },
    ],
  },
};

export default nextConfig;
