/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#00C9D3',
          secondary: '#00B4D8',
          accent: '#37cdbe',
          neutral: '#3d4451',
        },
      },
    ],
  },
};
