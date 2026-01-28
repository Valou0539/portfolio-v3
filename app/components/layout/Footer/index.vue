<template>
  <footer class="mx-auto max-w-4xl pb-4 pt-28 md:pt-56">
    <div class="mb-12 flex justify-between gap-8 sm:px-8">
      <LayoutFooterTechStack />
      <div class="flex w-full shrink-0 grow pl-8 sm:max-w-80 sm:pl-0">
        <LayoutFooterMenu
          class="w-1/2 shrink-0 grow"
          i18n-key-title="layout.footer.my-links"
          :items="myLinks"
        />
        <LayoutFooterMenu
          class="w-1/2 shrink-0 grow"
          i18n-key-title="layout.footer.navigation"
          :items="navigation.map((item) => ({ ...item, localeLink: true }))"
        />
      </div>
    </div>
    <p class="text-secondary/75 text-center text-xs">
      {{ $t("layout.footer.copyright", { year: new Date().getFullYear() }) }}
    </p>
  </footer>
</template>
<script lang="ts" setup>
import { navigation } from "@/consts/navigation";

const { locale } = useI18n();

const myLinks = computed<
  {
    label?: string;
    i18nKey?: string;
    path: string;
    target: "_blank";
    localeLink?: boolean;
  }[]
>(() => [
  {
    label: "GitHub",
    path: "https://github.com/valou0539",
    target: "_blank",
    localeLink: false,
  },
  {
    label: "LinkedIn",
    path: "https://www.linkedin.com/in/valentin-gindre",
    target: "_blank",
    localeLink: false,
  },
  {
    i18nKey: "layout.footer.cv",
    path: `/CV-GINDRE_Valentin-${locale.value.toUpperCase()}.pdf`,
    target: "_blank",
    localeLink: false,
  },
]);
</script>
