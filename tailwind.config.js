/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Brand: deep teal, a nod to WhatsApp without copying its green */
        brand: {
          50: '#effefa',
          100: '#c8fff1',
          200: '#91fee4',
          300: '#53f5d4',
          400: '#1fe0bf',
          500: '#06c4a6',
          600: '#019e88',
          700: '#067e6f',
          800: '#0a645a',
          900: '#0d534b',
          950: '#00332f',
        },
        ink: {
          900: '#0a0a0a',
          700: '#27272a',
          500: '#52525b',
          400: '#71717a',
          300: '#a1a1aa',
          100: '#e4e4e7',
          50: '#f4f4f5',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)',
        'card-lg': '0 4px 6px rgba(0,0,0,0.03), 0 12px 32px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
