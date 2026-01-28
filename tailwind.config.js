/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#202F55",
          700: "#4F669D",
          500: "#7796C8",
        },
        muted: {
          500: "#A6B1B9",
        },
        border: "#D6E3EC",
        surface: "#F8FAFC",
        accent: "#40F3F7",
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
      },
      fontFamily: {
        sans: [
          "Roboto",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Arial",
          "Noto Sans",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
    },
  },
};