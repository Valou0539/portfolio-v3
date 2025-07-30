import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
  ],

  fonts: {
    families: [
      {
        name: "Righteous",
        provider: "google",
        weights: [400],
      },
      {
        name: "Jost",
        provider: "google",
        weights: [400, 500, 600],
      },
    ],
  },

  i18n: {
    defaultLocale: "fr",
    locales: [
      {
        code: "en",
        files: ["layout.en.json", "home.en.json"],
        name: "English",
      },
      {
        code: "fr",
        files: ["layout.fr.json", "home.fr.json"],
        name: "Français",
      },
    ],
  },

  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});