<template>
  <main></main>
</template>
<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
  title: t("projects.seo.title"),
  description: t("projects.seo.description"),
});
</script>
