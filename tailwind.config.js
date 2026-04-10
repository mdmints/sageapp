/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        shell: '0 32px 80px rgba(0,0,0,.22), 0 0 0 1.5px rgba(0,0,0,.1)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        slideUp: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp .22s ease',
        spin: 'spin .8s linear infinite',
        'slide-up': 'slideUp .28s cubic-bezier(.4,0,.2,1)',
      },
    },
  },
  plugins: [],
};
