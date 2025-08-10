<template>
  <NuxtImg
    :src="image?.src"
    :alt="image?.alt[$i18n.locale]"
    :width="1920"
    :height="1080"
    :class="[
      'mr-2 size-full object-cover',
      {
        'opacity-50':
          (index !== 1 || state !== 'movingPrev') &&
          (index !== 2 || state !== 'idle') &&
          (index !== 3 || state !== 'movingNext') &&
          multiple,
      },
      {
        'transition-opacity duration-500 ease-in-out': state !== 'idle',
      },
    ]"
  />
</template>
<script lang="ts" setup>
import type { ProjectsCarouselCollectionItem } from "@nuxt/content";
interface Props {
  image: ProjectsCarouselCollectionItem["images"][number];
  index: number;
  state: "idle" | "movingPrev" | "movingNext";
  multiple?: boolean;
}

defineProps<Props>();
</script>
