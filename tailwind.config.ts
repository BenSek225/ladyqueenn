import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem", // 20px mobile
        sm: "2rem",
        lg: "5rem", // 80px desktop
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Système de couleurs Lady Queenn
        cream: {
          white: "#F9F6F1",
          light: "#F7F3EC",
        },
        deep: {
          black: "#1A1714",
          gray: "#2D2A27",
        },
        gold: {
          champagne: "#C6A87C",
          soft: "#B89B6A",
          dark: "#9D8159",
        },
        warm: {
          100: "#F5F1ED",
          200: "#E8E3DD",
          300: "#D1CBC3",
          400: "#AFA89F",
          500: "#8D877D",
        },
        // Sweet-Hair (Nature & Soin)
        sh: {
          sage: "#8A9A7B",
          olive: "#6B7D5C",
          light: "#E8EDE5",
        },
        // Fragrance (Luxe & Mystère)
        fr: {
          plum: "#6B4E71",
          rose: "#B88E97",
          light: "#F2EDF0",
        },
        // Crochet by THED (Artisanat & Chaleur)
        cr: {
          terracotta: "#D4A59A",
          earth: "#9D8579",
          light: "#F0EBE8",
        },
        // Aliases sémantiques
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        // Display & Titres (Serif élégante)
        display: ["Playfair Display", "serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        // Corps de texte (Sans-serif lisible)
        sans: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        // Prix & Détails techniques (Mono)
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      fontSize: {
        // Système typographique Lady Queenn
        micro: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.02em" }], // 12px
        xs: ["0.875rem", { lineHeight: "1.5" }], // 14px
        sm: ["0.875rem", { lineHeight: "1.5" }], // 14px
        base: ["1rem", { lineHeight: "1.6" }], // 16px
        lg: ["1.125rem", { lineHeight: "1.6" }], // 18px
        xl: ["1.25rem", { lineHeight: "1.5" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "1.3", letterSpacing: "-0.02em" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }], // 36px
        "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }], // 48px
        "6xl": ["4rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }], // 64px
        "7xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.04em" }], // 96px
      },
      spacing: {
        // Système d'espacement basé sur 8px
        18: "4.5rem", // 72px
        22: "5.5rem", // 88px
        26: "6.5rem", // 104px
        30: "7.5rem", // 120px
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Valeurs spécifiques Lady Queenn
        soft: "8px", // Doux, pas trop rond
      },
      boxShadow: {
        // Ombres douces et élégantes
        soft: "0 2px 8px rgba(26, 23, 20, 0.08)",
        elevated: "0 8px 24px rgba(26, 23, 20, 0.12)",
        "gold-glow": "0 8px 24px rgba(198, 168, 124, 0.3)",
      },
      transitionTimingFunction: {
        // Courbes naturelles
        "smooth-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "smooth-in": "cubic-bezier(0.7, 0, 0.84, 0)",
        "smooth-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      transitionDuration: {
        // Durées standard
        fast: "200ms",
        normal: "300ms",
        slow: "500ms",
        slower: "800ms",
      },
      animation: {
        // Animations douces
        "fade-in": "fadeIn 500ms ease-smooth-out",
        "slide-up": "slideUp 500ms ease-smooth-out",
        "scale-in": "scaleIn 300ms ease-smooth-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
