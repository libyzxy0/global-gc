export default defineNuxtConfig({
  devtools: { enabled: true }, 
  ssr: true,
  target: 'server',
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@nuxtjs/google-fonts",
    "nuxt-vue3-google-signin", 
    "",
  ], 
  googleFonts: {
    families: {
      Nunito: [300], 
      Quicksand: [400]
    }
  },
  googleSignIn: {
    clientId: '632928955162-mj5fl2a0541tfek65in8qd3sd120c0ot.apps.googleusercontent.com',
  }, 
  runtimeConfig: {
    public: {
      baseURL: "https://global-gc.libyzxy0.repl.co" //"http://localhost:8080"
    }
  }
})
