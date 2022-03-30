module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        shine: 'shine 1.5s',
      },
      keyframes: {
        shine: {
          '100%': { left: '150%' },
        },
      },
    },
  },
  plugins: [],
};
