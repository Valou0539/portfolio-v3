<template>
  <NuxtLoadingIndicator color="var(--color-primary)" />
  <Html :lang="$i18n.locale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>
<script lang="ts" setup>
useHead({
  titleTemplate: `%s - Valentin Gindre`,
});
</script>
