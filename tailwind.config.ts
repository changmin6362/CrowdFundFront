import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "pretendard-regular": ["var(--font-pretendard-regular)"]
      },
    },
  },
  plugins: [],
};
export default config;
