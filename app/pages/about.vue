<template>
  <main>
    <PagesAboutHero />
    <PagesAboutTechnologies />
    <PagesAboutExperiences type="professional" class="pb-8 md:pb-12" />
    <PagesAboutExperiences type="education" />
  </main>
</template>
<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
  title: t("about.seo.title"),
  description: t("about.seo.description"),
});
</script>
