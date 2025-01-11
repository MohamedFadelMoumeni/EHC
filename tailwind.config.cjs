/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      keyframes: {
        fadeInWithPause: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '60%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '70%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '80%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '90%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
        },
      },
      animation: {
        fadeInWithPause: 'fadeInWithPause 3s ease-in-out infinite',
      },
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
