// tailwind.config.mjs
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
      extend: {
        colors: {
          primary: '#0f172a',
          secondary: '#1e293b',
          accent: '#60a5fa'
        },
        fontFamily: {
          sans: ['Inter var', 'sans-serif'],
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }