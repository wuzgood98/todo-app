/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      /* Primary */
      brightBlue: "hsl(220, 98%, 61%)",
      checkBgFrom: "hsl(192, 100%, 67%)",
      checkBgTo: "hsl(280, 87%, 65%)",
      /* Neutral */
      /* Light theme */
      light: "hsl(0, 0%, 100%)",
      veryLightGray: "hsl(0, 0%, 98%)",
      dragEnterLight: "hsl(233, 11%, 81%)",
      veryLightGrayishBlue: "hsl(236, 33%, 92%)",
      lightGrayishBlue: "hsl(233, 11%, 84%)",
      darkGrayishBlue: "hsl(236, 9%, 61%)",
      veryDarkGrayishBlue: "hsl(235, 19%, 35%)",
      /* Dark theme */
      veryDarkBlue: "hsl(235, 21%, 11%)",
      veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
      dragEnterDark: "hsl(235, 24%, 30%)",
      lightGrayishBlueDt: "hsl(234, 39%, 85%)",
      lightGrayishBlueDtHover: "hsl(236, 33%, 92%)",
      darkGrayishBlueDt: "hsl(234, 11%, 52%)",
      veryDarkGrayishBlueDt: "hsl(233, 14%, 35%)",
      veryDarkGrayishBlueDt3: "hsl(233, 14%, 43%)",
      veryDarkGrayishBlueDt2: "hsl(237, 14%, 26%)",
    },
    fontFamily: {
      josefin: ["Josefin Sans", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        mobileDark: "url('./assets/bg-mobile-dark.jpg')",
        mobileLight: "url('./assets/bg-mobile-light.jpg')",
        desktopDark: "url('./assets/bg-desktop-dark.jpg')",
        desktopLight: "url('./assets/bg-desktop-light.jpg')",
      },
    },
  },
  plugins: [],
};
