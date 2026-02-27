/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui"],
        serif: ["Cormorant Garamond", "ui-serif", "Georgia"],
        body: ["Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        ink: {
          900: "rgb(var(--ink-900) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
          500: "rgb(var(--ink-500) / <alpha-value>)"
        },
        carbon: {
          900: "rgb(var(--carbon-900) / <alpha-value>)",
          800: "rgb(var(--carbon-800) / <alpha-value>)",
          700: "rgb(var(--carbon-700) / <alpha-value>)",
          600: "rgb(var(--carbon-600) / <alpha-value>)",
          500: "rgb(var(--carbon-500) / <alpha-value>)"
        },
        aqua: {
          600: "rgb(var(--aqua-600) / <alpha-value>)",
          400: "rgb(var(--aqua-400) / <alpha-value>)"
        },
        sun: {
          500: "rgb(var(--sun-500) / <alpha-value>)",
          300: "rgb(var(--sun-300) / <alpha-value>)"
        }
      },
      boxShadow: {
        glow: "0 30px 60px rgba(31, 182, 166, 0.25)",
        card:
          "0 18px 36px rgb(var(--shadow-card) / 0.22), 0 0 14px rgb(var(--shadow-card) / 0.16)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s ease-out both"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
