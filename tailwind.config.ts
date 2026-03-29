import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#FF4500",
          dark: "#D93C00",
          light: "#FF6A35",
        },
        bg: "#F0EFE9",
        surface: "#FFFFFF",
        "surface-2": "#F7F6F2",
        border: "#E8E7E2",
        sidebar: "#1C1C1E",
        "text-primary": "#1A1A1A",
        "text-secondary": "#6B6B6B",
        "text-muted": "#A0A0A0",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.04)",
        "card-md": "0 4px 16px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
