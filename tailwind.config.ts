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
        // Design System MPASI SMART
        primary: {
          DEFAULT: "#52765B", // Sage Green
          50: "#F2F6F3",
          100: "#E3ECE5",
          200: "#C7DACB",
          300: "#A3C3A8",
          400: "#7CA484",
          500: "#52765B",
          600: "#43624B",
          700: "#354F3C",
          800: "#273D2F",
          900: "#1A2A20",
        },
        secondary: {
          DEFAULT: "#A9C4A8", // Light Sage
          50: "#F7FAF7",
          100: "#EFF5EF",
          200: "#DFEBE0",
          300: "#CDDFCE",
          400: "#BCD2BD",
          500: "#A9C4A8",
          600: "#8EAE8D",
          700: "#709370",
          800: "#547355",
          900: "#3C543C",
        },
        cream: {
          DEFAULT: "#F7F4EA", // Cream Background
          50: "#FDFAF6",
          100: "#FAF7F1",
          200: "#F4EFE2",
          300: "#EDE5CF",
          400: "#E3D6B7",
          500: "#D6C39B",
        },
        accent: {
          DEFAULT: "#E8B88D", // Warm Peach Accent
          50: "#FDF8F3",
          100: "#FBF1E6",
          200: "#F6E0CD",
          300: "#F0CDB0",
          400: "#EBB994",
          500: "#E8B88D",
          600: "#D99965",
          700: "#C47C42",
          800: "#9E5E2B",
          900: "#7B461D",
        },
        darkGreen: {
          DEFAULT: "#26352B", // Dark Green Text
          50: "#EAECEB",
          100: "#CACFCB",
          200: "#9BA59D",
          300: "#6C7A70",
          400: "#4A584E",
          500: "#26352B",
          600: "#1E2A22",
          700: "#17201A",
          800: "#0F1612",
          900: "#080B09",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F7F4EA",
          subtle: "#F4EFE5",
        },
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "Poppins", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(82, 118, 91, 0.08), 0 2px 6px -1px rgba(82, 118, 91, 0.04)",
        "soft-md": "0 8px 30px -4px rgba(82, 118, 91, 0.12), 0 4px 10px -2px rgba(82, 118, 91, 0.06)",
        "soft-lg": "0 14px 40px -6px rgba(82, 118, 91, 0.16), 0 6px 16px -3px rgba(82, 118, 91, 0.08)",
        card: "0 6px 24px -4px rgba(38, 53, 43, 0.07), 0 2px 6px -2px rgba(38, 53, 43, 0.04)",
        "card-hover": "0 16px 36px -6px rgba(38, 53, 43, 0.13), 0 6px 14px -3px rgba(38, 53, 43, 0.07)",
        floating: "0 20px 48px -8px rgba(82, 118, 91, 0.22), 0 8px 18px -4px rgba(82, 118, 91, 0.12)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out forwards",
        "slide-up": "slideUp 0.3s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

