/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: "#060606",
        primary: "#E50914",
        transparent: 'transparent',
      },
    },
    fontFamily: {
      "mulish": ['Mulish', 'sans-serif'],
      "merriweather": ['Merriweather', 'sans-serif'],
    }
  },
  plugins: [],
}
