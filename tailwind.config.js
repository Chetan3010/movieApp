/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        gridTemplateColumns: {
            // Simple 16 column grid
            '16': 'repeat(16, minmax(0, 1fr))',
    
            // Complex site-specific column configuration
            'footer': '200px minmax(900px, 1fr) 100px',
        },
        keyframes: {
            pop: {
              '0%': { transform: 'scaleX(0%)' },
              '100%': { transform: 'scaleX(100%)' },
            }
          }
    },
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },

  },
  plugins: [],
}

