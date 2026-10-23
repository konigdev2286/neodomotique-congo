import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noir: {
          DEFAULT: "#050505",
          950: "#030303",
          900: "#0A0A0A",
          850: "#0E0E0E",
          800: "#121212",
          700: "#1C1C1C",
          600: "#2A2A2A",
          500: "#3D3D3D",
        },
        or: {
          DEFAULT: "#C49C4F",
          clair: "#E3C77A",
          fonce: "#8E6F2E",
          subtil: "#C49C4F33", // 20% opacité pour filets fins
          halo: "#C49C4F1A", // 10% opacité pour halo discret
        },
        ivoire: {
          DEFAULT: "#F3EEE4",
          800: "#A39E93",
          700: "#C9C3B6",
          600: "#DDD7CB",
        },
      },
      fontFamily: {
        titre: ['"Jost Variable"', "system-ui", "sans-serif"],
        texte: ['"Source Sans 3 Variable"', "system-ui", "sans-serif"],
      },
      // Échelle d'espacement stricte basée sur la grille de 8 px
      spacing: {
        13: "3.25rem", // 52px — bouton WhatsApp flottant et Button lg
        18: "4.5rem", // 72px
        22: "5.5rem", // 88px
        26: "6.5rem", // 104px
        30: "7.5rem", // 120px
      },
      letterSpacing: {
        logo: "0.28em",
        accroche: "0.18em",
        large: "0.12em",
      },
      // Angles très peu arrondis (aucun arrondi excessif type rounded-2xl/3xl)
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
        lg: "6px",
      },
      // Halo discret uniquement pour le point lumineux d'or (jamais d'ombres lourdes)
      boxShadow: {
        "point-or": "0 0 12px 2px rgba(196, 156, 79, 0.4)",
        "halo-or": "0 0 24px -4px rgba(196, 156, 79, 0.25)",
        none: "none",
      },
    },
  },
  plugins: [],
  // Safelist pour les classes dynamiques utilisées dans les composants
  safelist: [
    "delay-75",
    "delay-100",
    "delay-150",
    "delay-300",
    "delay-500",
    "animate-pulse",
    "point-or-init",
  ],
};
export default config;

