import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.yellow,
        secondary: '#5865f2'
      }
    },
  },
  plugins: [],
}
export default config
