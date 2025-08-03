<template>
  <main></main>
</template>
<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
  title: t("contact.seo.title"),
  description: t("contact.seo.description"),
});
</script>
