export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: { DEFAULT: '#7C5CFC', hover: '#6A47E8', tint: '#F3EFFE' },
        canvas: '#FAFAFB',
        surface: '#FFFFFF',
        border: '#E4E4E7',
        ink: { DEFAULT: '#18181B', secondary: '#71717A', placeholder: '#A1A1AA' },
        danger: '#DC2626',
        status: {
          brouillon: { bg: '#F1F5F9', text: '#475569', dot: '#94A3B8' },
          valide: { bg: '#FEF3E2', text: '#B45309', dot: '#F59E0B' },
          publie: { bg: '#DCFCE7', text: '#15803D', dot: '#22C55E' },
        },
      },
      boxShadow: {
        dropdown: '0 12px 32px rgba(24,24,27,0.12)',
        modal: '0 20px 60px rgba(0,0,0,0.25)',
      },
    },
  },
};
