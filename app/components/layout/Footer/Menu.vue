<template>
  <section class="text-sm">
    <h2 class="text-primary mb-8 font-semibold">{{ $t(i18nKeyTitle) }}</h2>
    <ul class="flex flex-col gap-4">
      <li v-for="item in items" :key="item.path">
        <NuxtLinkLocale
          :to="item.path"
          :target="item.target"
          class="hover:text-primary"
        >
          {{ item.i18nKey ? $t(item.i18nKey) : (item.label ?? "") }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </section>
</template>
<script lang="ts" setup>
interface Props {
  i18nKeyTitle: string;
  items: {
    path: string;
    label?: string;
    i18nKey?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
  }[];
}
const props = defineProps<Props>();
</script>
