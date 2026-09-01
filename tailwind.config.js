/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      spacing: {
        18: '4.5rem',
      },
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        background: '#FDF8FF',
        surface: '#FFFFFF',
        'surface-container-lowest': '#F8F9FD',
        'surface-container': '#F3EDF7',
        'surface-variant': '#E7E0EC',
        'on-surface': '#1C1A26',
        'on-surface-variant': '#49454F',
        primary: '#7C3AED',
        'primary-container': '#6D28D9',
        'on-primary': '#FFFFFF',
        'on-primary-container': '#FFFFFF',
        'tertiary-container': '#F5D0FE',
        'on-tertiary-container': '#4A044E',
        'outline-variant': '#CAC4D0',
        error: '#B3261E',
        'on-error': '#FFFFFF',
        'secondary-container': '#F59E0B',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
