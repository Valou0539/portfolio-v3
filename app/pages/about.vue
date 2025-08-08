<template>
  <main>
    <PagesAboutHero />
    <PagesAboutTechnologies />
    <PagesAboutExperiences />
  </main>
</template>
<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
  title: t("about.seo.title"),
  description: t("about.seo.description"),
});
</script>
