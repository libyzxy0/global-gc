export default defineNuxtConfig({
  devtools: { enabled: true }, 
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@nuxtjs/google-fonts",
  ], 
  googleFonts: {
    families: {
      Nunito: [300]
    }
  },
})
