<template>
  <div class="relative flex aspect-[16/9] justify-center sm:px-4">
    <div class="slider-mask flex w-[300%] flex-shrink-0 justify-center">
      <div class="aspect-[16/9] w-[calc(1/3*100%)]">
        <div :style="sliderStyle" class="relative flex">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="mr-2 h-full flex-grow"
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
const state = ref<"idle" | "transitioning">("idle");
const translateOffset = ref(0);

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
    transform: `translateX(-${((2 + translateOffset.value) / 5) * 100}%)`,
  };

  if (state.value === "transitioning") {
    style.transition = "transform 0.5s ease-in-out";
  }

  return style;
});

const next = () => {
  if (state.value !== "idle") return;
  
  state.value = "transitioning";
  translateOffset.value = 1;
  
  setTimeout(() => {
    // Reset without transition
    state.value = "idle";
    translateOffset.value = 0;
    index.value = getNewIndex(1);
  }, 500);
};

const prev = () => {
  if (state.value !== "idle") return;
  
  state.value = "transitioning";
  translateOffset.value = -1;
  
  setTimeout(() => {
    // Reset without transition
    state.value = "idle";
    translateOffset.value = 0;
    index.value = getNewIndex(-1);
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
