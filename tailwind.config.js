import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{vue,js,md}'],
  theme: {
    extend: {
      colors: {
        ink: '#31180d',
        wine: '#4a1014',
        parchment: '#ead4af',
        parchmentDeep: '#b68758',
        oldGold: '#b08a42',
        dusk: '#0f1320',
        dawnMist: '#d9c4a7',
      },
      fontFamily: {
        display: ['Baskerville', 'Iowan Old Style', 'Palatino Linotype', 'Songti TC', 'serif'],
        serifTc: ['Alegreya', 'Georgia', 'Noto Serif TC', 'PMingLiU', 'serif'],
        sansTc: ['Optima', 'Segoe UI', 'Noto Sans TC', 'sans-serif'],
      },
      boxShadow: {
        paper: '0 28px 90px rgba(22, 9, 4, 0.35)',
        halo: '0 0 0 1px rgba(255, 226, 170, 0.12), 0 0 40px rgba(203, 166, 92, 0.24)',
      },
      backgroundImage: {
        'starlit-sky':
          'radial-gradient(circle at 20% 20%, rgba(255, 239, 196, 0.18), transparent 0 28%), radial-gradient(circle at 80% 12%, rgba(141, 163, 255, 0.18), transparent 0 18%), radial-gradient(circle at 52% 36%, rgba(255, 240, 203, 0.16), transparent 0 20%), linear-gradient(180deg, #090c14 0%, #12192a 52%, #171118 100%)',
        parchment:
          'linear-gradient(180deg, rgba(255, 251, 239, 0.88), rgba(234, 212, 175, 0.96)), radial-gradient(circle at top, rgba(255, 255, 255, 0.45), transparent 32%)',
      },
      maxWidth: {
        shell: '84rem',
      },
      animation: {
        drift: 'drift 14s ease-in-out infinite alternate',
        pulseRune: 'pulseRune 3.6s ease-in-out infinite',
        fadeRise: 'fadeRise 900ms ease-out both',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translate3d(-1.5%, -1%, 0) scale(1)' },
          '100%': { transform: 'translate3d(1.5%, 1%, 0) scale(1.05)' },
        },
        pulseRune: {
          '0%, 100%': {
            boxShadow: '0 0 0 1px rgba(255, 228, 177, 0.25), 0 0 24px rgba(205, 168, 89, 0.18)',
          },
          '50%': {
            boxShadow: '0 0 0 1px rgba(255, 228, 177, 0.45), 0 0 48px rgba(205, 168, 89, 0.35)',
          },
        },
        fadeRise: {
          from: { opacity: '0', transform: 'translate3d(0, 18px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
      },
    },
  },
  plugins: [typography],
}