/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      fontSize:{
          h1:     ['48px', '56px'],
          h2:     ['40px', '48px'],
          h3:     ['32px', '40px'],
          h4:     ['20px', '32px'],
          h5:     ['20px', '28px'],
          h6:     ['16px', '24px'],
          body:   ['16px', '24px'],
          callboy:['14px', '24px'],
          subheadline:['13px', '16px'],
          footnote:   ['12px', '15px'],
          caption:    ['11px', '14px']
      },
      backdropBlur: {
          30: '30px',
          20: '20px',
          16: '16px',
          12: '12px',
      },
      colors:{
          primary: {
              100:'#FF2D55',
              75: 'rgba(255, 45, 85, 0.75)',
              50: 'rgba(255, 45, 85, 0.5)',
              22: 'rgba(255, 45, 85, 0.2)',
              10: 'rgba(255, 45, 85, 0.10)',
              5:  'rgba(255, 45, 85, 0.05)', 
          },
          black:  {
              100:'#282122',
              75: 'rgba(40, 33, 34, 0.75)',
              50: 'rgba(40, 33, 34, 0.5)',
              22: 'rgba(40, 33, 34, 0.22)',
              10: 'rgba(40, 33, 34, 0.10)',
              5:  'rgba(40, 33, 34, 0.05)', 
          },
          white: {
              100:'#FFFFFF',
              75: 'rgba(255, 255, 255, 0.75)',
              50: 'rgba(255, 255, 255, 0.5)',
              22: 'rgba(255, 255, 255, 0.22)',
              10: 'rgba(255, 255, 255, 0.10)',
              5:  'rgba(255, 255, 255, 0.05)', 
          },
          fill: {
              primary:    'rgba(120, 120, 128, 0.20)',
              secondary:  'rgba(120, 120, 128, 0.16)',
              tertiary:   'rgba(120, 120, 128, 0.12)',
              quaternary: 'rgba(120, 120, 128, 0.08)',
          }
      },
    },
  },
  plugins: [

  ],
}