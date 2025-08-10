<template>
  <NuxtImg v-bind="imageAttributes" class="md:hidden" :quality="50" />
  <NuxtImg v-bind="imageAttributes" class="hidden lg:block" :quality="100" />
</template>
<script lang="ts" setup>
import type { ProjectsCarouselCollectionItem } from "@nuxt/content";
interface Props {
  image: ProjectsCarouselCollectionItem["images"][number];
  index: number;
  state: "idle" | "movingPrev" | "movingNext";
  multiple?: boolean;
}

const props = defineProps<Props>();

const { locale } = useI18n();

const imageAttributes = computed(() => {
  return {
    src: props.image.src,
    alt: props.image.alt[locale.value],
    width: 1920,
    height: 1080,
    class: [
      "mr-2 size-full object-cover sm:rounded-lg md:rounded-xl lg:rounded-2xl",
      {
        "opacity-50":
          (props.index !== 1 || props.state !== "movingPrev") &&
          (props.index !== 2 || props.state !== "idle") &&
          (props.index !== 3 || props.state !== "movingNext") &&
          props.multiple,
      },
      {
        "transition-opacity duration-500 ease-in-out": props.state !== "idle",
      },
    ],
    fetchpriority: "high",
  };
});
</script>
