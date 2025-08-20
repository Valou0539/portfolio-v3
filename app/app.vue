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
  titleTemplate: "%s - Valentin Gindre",
});

const setSeoMeta = () => {
  const url = useRequestURL();

  useSeoMeta({
    ogLocale: `${locale.value}_${locale.value.toUpperCase()}`,
    ogUrl: url.href,
  });
};

const { locale } = useI18n();
const route = useRoute();

setSeoMeta();

watch([locale, () => route.path], setSeoMeta);
</script>
