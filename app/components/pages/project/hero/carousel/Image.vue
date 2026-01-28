<template>
  <div
    class="mr-2 size-full grow transition-opacity duration-500 ease-in-out"
  >
    <NuxtImg
      :src="props.image.src"
      class="size-full object-cover sm:rounded-lg md:rounded-xl lg:rounded-2xl"
      :fetchpriority="props.fetchPriorityHigh ? 'high' : undefined"
      :alt="props.image.alt[$i18n.locale]"
      width="1152"
      height="648"
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
</script>
