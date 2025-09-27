// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand-primary)',
          secondary: 'var(--brand-secondary)',
          accent: 'var(--brand-accent)',
          ink: 'var(--brand-ink)',
          bg: 'var(--brand-bg)',
        },
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  // Keep empty unless you've installed extras like @tailwindcss/typography
  plugins: [],
}

export default config
