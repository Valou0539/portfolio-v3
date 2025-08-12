<template>
  <main>
    <section class="mx-auto mt-20 max-w-3xl md:mt-28">
      <h1 class="heading-1 mb-[clamp(24px,5vw,32px)] text-center">
        {{ t("contact.title") }}
      </h1>
      <p
        class="mb-[clamp(32px,5vw,48px)] px-4 text-center text-[clamp(16px,2vw,22px)] lg:px-0"
      >
        {{ t("contact.subtitle") }}
      </p>
      <CommonGlassDiv :rounded="rounded" :blur-amount="3">
        <PagesContactForm class="p-8 md:p-16" />
      </CommonGlassDiv>
    </section>
  </main>
</template>
<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
  title: t("contact.seo.title"),
  description: t("contact.seo.description"),
});

const rounded = useBreakpoints(16, {
  md: 32,
});
</script>
