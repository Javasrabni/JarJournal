module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // untuk React.js
  ],
  theme: {
    extend: {
      screens: {
        'max-mbl': {'max': '600px'},  // Custom screen untuk max-width 640px
      },
    },
  },
  plugins: [],
}
