<template>
  <section
    class="mx-auto mt-20 pb-8 sm:max-w-xl md:mt-28 md:pb-12 lg:max-w-5xl"
  >
    <h1 :style="style(0)" class="heading-1 mb-8 px-4 text-center md:mb-12">
      {{ projectMeta.name }}
    </h1>
    <PagesProjectHeroCarousel
      :style="style(200)"
      v-if="projectCarousel?.images.length"
      :project-carousel="projectCarousel"
    />
  </section>
</template>

<script lang="ts" setup>
import type {
  ProjectsCarouselCollectionItem,
  ProjectsMetaCollectionItem,
} from "@nuxt/content";

interface Props {
  projectMeta: ProjectsMetaCollectionItem;
  projectCarousel?: ProjectsCarouselCollectionItem;
}

defineProps<Props>();

const { style } = useAnimationOnLoad();
</script>
