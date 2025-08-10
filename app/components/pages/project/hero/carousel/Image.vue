<template>
  <div
    class="mr-2 h-full w-full flex-grow transition-opacity duration-500 ease-in-out"
  >
    <NuxtImg
      v-bind="imageAttributes"
      :src="props.image.srcMobile"
      class="lg:hidden"
    />
    <NuxtImg
      v-bind="imageAttributes"
      :src="props.image.src"
      class="hidden lg:block"
    />
  </div>
</template>
<script lang="ts" setup>
import type { ProjectsCarouselCollectionItem } from "@nuxt/content";
interface Props {
  image: ProjectsCarouselCollectionItem["images"][number];
  fetchPriorityHigh?: boolean;
}

const props = defineProps<Props>();

const { locale } = useI18n();

const imageAttributes = computed(() => {
  return {
    alt: props.image.alt[locale.value],
    width: 1920,
    height: 1080,
    class: [
      "size-full object-cover sm:rounded-lg md:rounded-xl lg:rounded-2xl",
    ],
    fetchpriority: props.fetchPriorityHigh ? "high" : undefined,
  };
});
</script>
