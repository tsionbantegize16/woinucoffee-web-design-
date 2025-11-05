/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#F5F5DC',
          100: '#E8D7C3',
          200: '#D4B896',
          300: '#C19A6B',
          400: '#A67C52',
          500: '#6F4E37',
          600: '#5C4033',
          700: '#4A342A',
          800: '#3E2723',
          900: '#2C1810',
        },
        yellow: {
          50: '#FFFEF0',
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEE58',
          500: '#FDB813',
          600: '#FFD700',
          700: '#FFC107',
          800: '#FFB300',
          900: '#FF8F00',
        },
        cream: '#F5F5DC',
      },
    },
  },
  plugins: [],
}
