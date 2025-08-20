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
    "@nuxt/content",
    "@nuxtjs/sitemap",
  ],

  colorMode: {
    classSuffix: "",
  },

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
        files: [
          "en/layout.json",
          "en/home.json",
          "en/contact.json",
          "en/about.json",
          "en/projects.json",
          "en/project.json",
          "en/error.json",
        ],
        name: "English",
      },
      {
        code: "fr",
        files: [
          "fr/layout.json",
          "fr/home.json",
          "fr/contact.json",
          "fr/about.json",
          "fr/projects.json",
          "fr/project.json",
          "fr/error.json",
        ],
        name: "Français",
      },
    ],
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },

  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    emailUser: process.env.MAIL_USER,
    emailPassword: process.env.MAIL_PASSWORD,
    emailHost: process.env.MAIL_HOST,
    emailPort: process.env.MAIL_PORT,
  },

  app: {
    head: {
      meta: [
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:site_name",
          content: "Valentin Gindre",
        },
      ],
    },
  },
});
