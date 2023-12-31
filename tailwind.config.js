/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        "twitter-chirp": ["TwitterChirp", "sans-serif"],
      },
      colors: {
        primary: "#1DA1F2",
        secondary: "#14171A",
        "dark-gray": "#657786",
        "light-gray": "#AAB8C2",
        "extra-light-gray": "#E1E8ED",
        "bright-gray": "#E1E8ED",
      },
      
    },
  },
  plugins: [require("tailwindcss-animated"),
],
};

