<template>
  <main>
    <PagesHomeHero />
    <PagesHomeWhatIDo />
    <PagesHomeFeaturedProjects :style="style(1000)" />
    <PagesHomeCTA :style="style(1200)" />
  </main>
</template>
<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
  title: t("home.seo.title"),
  description: t("home.seo.description"),
  ogTitle: t("home.seo.title"),
  ogDescription: t("home.seo.description"),
  twitterTitle: t("home.seo.title"),
  twitterDescription: t("home.seo.description"),
});

const { style } = useAnimationOnLoad();
</script>
