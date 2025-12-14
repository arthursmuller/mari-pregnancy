/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E57A8E',
          dark: '#C64B60',
        },
        accent: {
          DEFAULT: '#FDAE61',
          light: '#FFE1BB',
        },
      },
    },
  },
  plugins: [],
};