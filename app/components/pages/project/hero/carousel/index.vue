<template>
  <div class="relative flex aspect-[16/9] justify-center sm:px-4">
    <div class="slider-mask flex w-[300%] flex-shrink-0 justify-center">
      <div class="aspect-[16/9]">
        <div :style="sliderStyle" class="relative flex">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="h-full flex-grow"
          >
            <PagesProjectHeroCarouselImage
              :image="image"
              :index="index"
              :state="state"
              :multiple="itemsCount > 1"
            />
          </div>
        </div>
      </div>
    </div>
    <PagesProjectHeroCarouselButton
      v-if="itemsCount > 1"
      type="prev"
      :disabled="state !== 'idle'"
      @click="prev"
    />
    <PagesProjectHeroCarouselButton
      v-if="itemsCount > 1"
      type="next"
      :disabled="state !== 'idle'"
      @click="next"
    />
  </div>
</template>
<script lang="ts" setup>
import type { ProjectsCarouselCollectionItem } from "@nuxt/content";
import type { CSSProperties } from "vue";

interface Props {
  projectCarousel: ProjectsCarouselCollectionItem;
}

const props = defineProps<Props>();

const index = ref(0);
const state = ref<"idle" | "movingPrev" | "movingNext">("idle");

const itemsCount = computed(() => props.projectCarousel.images.length);

const images = computed(() => {
  if (itemsCount.value === 1) return props.projectCarousel.images;

  return [
    props.projectCarousel.images[getNewIndex(-2)],
    props.projectCarousel.images[getNewIndex(-1)],
    props.projectCarousel.images[getNewIndex(0)],
    props.projectCarousel.images[getNewIndex(1)],
    props.projectCarousel.images[getNewIndex(2)],
  ] as ProjectsCarouselCollectionItem["images"];
});

const sliderStyle = computed(() => {
  if (itemsCount.value === 1) return { width: "100%" };

  const style: CSSProperties = {
    width: `calc(5 * (8px + 100%))`,
  };

  switch (state.value) {
    case "idle":
      style.transform = `translateX(-${(2 / 5) * 100}%)`;
      break;
    case "movingPrev":
      style.transform = `translateX(-${(1 / 5) * 100}%)`;
      style.transition = "transform 0.5s ease-in-out";
      break;
    case "movingNext":
      style.transform = `translateX(-${(3 / 5) * 100}%)`;
      style.transition = "transform 0.5s ease-in-out";
      break;
  }

  return style;
});

const next = () => {
  state.value = "movingNext";
  setTimeout(() => {
    index.value = getNewIndex(1);
    state.value = "idle";
  }, 500);
};

const prev = () => {
  state.value = "movingPrev";
  setTimeout(() => {
    index.value = getNewIndex(-1);
    state.value = "idle";
  }, 500);
};

const getNewIndex = (diff: number) => {
  const newIndex = (index.value + diff) % itemsCount.value;
  return newIndex < 0 ? itemsCount.value - 1 : newIndex;
};
</script>
<style scoped>
.slider-mask {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 33.33%,
    black 66.66%,
    transparent 100%
  );
}
</style>
