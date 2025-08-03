<template>
  <footer class="mx-auto max-w-4xl pt-28 md:pt-56">
    <div class="mb-12 flex justify-between gap-8 sm:px-8">
      <LayoutFooterTechStack />
      <div class="flex w-full flex-shrink-0 flex-grow pl-8 sm:max-w-80 sm:pl-0">
        <LayoutFooterMenu
          class="w-1/2 flex-shrink-0 flex-grow"
          i18n-key-title="layout.footer.my-links"
          :items="myLinks"
        />
        <LayoutFooterMenu
          class="w-1/2 flex-shrink-0 flex-grow"
          i18n-key-title="layout.footer.navigation"
          :items="navigation"
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

const myLinks: {
  label: string;
  path: string;
  target: "_blank";
}[] = [
  {
    label: "GitHub",
    path: "https://github.com/valou0539",
    target: "_blank",
  },
  {
    label: "LinkedIn",
    path: "https://www.linkedin.com/in/valentin-gindre",
    target: "_blank",
  },
  /*{
    label: "CV",
    path: "/cv",
    target: "_blank",
  },*/
];
</script>
