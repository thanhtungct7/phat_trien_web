module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'var(--color-primary-100)', // blue-100
          600: 'var(--color-primary-600)', // blue-600
          700: 'var(--color-primary-700)', // blue-700
        },
        gray: {
          50: 'var(--color-surface)', // gray-50
          200: 'var(--color-border)', // gray-200
          400: 'var(--color-text-tertiary)', // gray-400
          600: 'var(--color-text-secondary)', // gray-600
          900: 'var(--color-text-primary)', // gray-900
        },
        success: 'var(--color-success)', // green-600
        warning: 'var(--color-warning)', // amber-500
        error: 'var(--color-error)', // red-600
        info: 'var(--color-info)', // sky-500
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('@tailwindcss/aspect-ratio'),
  ],
}