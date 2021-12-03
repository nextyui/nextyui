const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{jsx,tsx,js,ts}", "./components/**/*.{jsx,tsx,ts,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.indigo,
          500: "#4F46E6",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    container: false,
  },
  plugins: [],
};
