/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DEDBC8",
        charcoal: "#101010",
        graphite: "#212121",
        rust: "#A85E3B",
        moss: "#7A8062",
      },
      fontFamily: {
        serif: ['"Instrument Serif"', "serif"],
      },
      boxShadow: {
        warm: "0 24px 80px rgba(168, 94, 59, 0.18)",
      },
    },
  },
  plugins: [],
};
