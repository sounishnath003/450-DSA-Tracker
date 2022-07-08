/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "media",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
