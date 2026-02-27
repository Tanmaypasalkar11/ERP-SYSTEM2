/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui"],
        serif: ["Cormorant Garamond", "ui-serif", "Georgia"],
        body: ["Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        ink: {
          900: "#0b1115",
          800: "#121a1f",
          700: "#1b262d",
          500: "#2b3a42"
        },
        aqua: {
          600: "#1fb6a6",
          400: "#4fd1c5"
        },
        sun: {
          500: "#f6b73c",
          300: "#ffd277"
        }
      },
      boxShadow: {
        glow: "0 30px 60px rgba(31, 182, 166, 0.25)",
        card: "0 20px 50px rgba(11, 17, 21, 0.25)"
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
