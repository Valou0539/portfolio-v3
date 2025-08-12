<template>
  <NuxtImg
    :src="props.image.src"
    class="mr-2 block h-full flex-grow object-cover transition-opacity duration-500 ease-in-out sm:rounded-lg md:rounded-xl lg:rounded-2xl"
    :fetchpriority="props.fetchPriorityHigh ? 'high' : undefined"
    :alt="props.image.alt[$i18n.locale]"
    width="1920"
    height="1080"
  />
</template>
<script lang="ts" setup>
import type { ProjectsCarouselCollectionItem } from "@nuxt/content";
interface Props {
  image: ProjectsCarouselCollectionItem["images"][number];
  fetchPriorityHigh?: boolean;
}

const props = defineProps<Props>();
</script>
