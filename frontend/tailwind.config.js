/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}" // Perbaiki path ini
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    daisyui, // Anda juga bisa menggunakan daisyui langsung jika sudah diimport
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a991f7",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      {
        business: {
          ...require("daisyui/src/theming/themes")["business"],
        },
      },
      "light",
      "dark",
      "cupcake",
      "forest",
      "business"
    ],
  },
};
