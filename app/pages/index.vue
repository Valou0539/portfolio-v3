<template>
  <main>
    <PagesHomeHero />
    <PagesHomeWhatIDo />
    <PagesHomeFeaturedProjects />
    <PagesHomeCTA />
  </main>
</template>
<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
  title: t("home.seo.title"),
  description: t("home.seo.description"),
});
</script>
