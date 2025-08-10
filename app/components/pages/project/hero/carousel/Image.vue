<template>
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
</template>
<script lang="ts" setup>
import type { ProjectsCarouselCollectionItem } from "@nuxt/content";
interface Props {
  image: ProjectsCarouselCollectionItem["images"][number];
  index: number;
  state: "idle" | "transitioning";
  multiple?: boolean;
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
      {
        "opacity-50": props.index !== 2 && props.multiple,
      },
      {
        "transition-opacity duration-500 ease-in-out": props.state === "transitioning",
      },
    ],
    fetchpriority: "high",
  };
});
</script>
