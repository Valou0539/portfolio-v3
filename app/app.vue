<template>
  <NuxtLoadingIndicator color="var(--color-primary)" />
  <Html :lang="locale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>
<script lang="ts" setup>
useHead({
  titleTemplate: `%s - Valentin Gindre`,
});
const { locale } = useI18n();
</script>
