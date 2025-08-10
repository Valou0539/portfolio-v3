<template>
  <div class="relative flex aspect-[16/9] justify-center sm:px-4">
    <div class="slider-mask flex w-[300%] flex-shrink-0 justify-center">
      <div class="relative aspect-[16/9] w-[calc(1/3*100%)]">
        <div
          :class="[
            'flex',
            {
              'transition-transform duration-500 ease-in-out':
                !disabledTransition,
            },
          ]"
          :style="{
            width: `calc(${itemsCount > 1 ? itemsCount + 3 : 1} * (100% + 8px))`,
            transform:
              itemsCount > 1
                ? `translateX(-${(index + 2) * (100 / (itemsCount + 3))}%)`
                : undefined,
          }"
          @transitionend="handleSliderTransitionEnd"
        >
          <PagesProjectHeroCarouselImage
            v-if="itemsCount > 1"
            :image="projectCarousel.images.at(-2)!"
            class="opacity-50"
          />
          <PagesProjectHeroCarouselImage
            v-if="itemsCount > 1"
            :image="projectCarousel.images.at(-1)!"
            :class="{
              'opacity-50': index !== -1 && index !== itemsCount - 1,
            }"
            fetch-priority-high
          />
          <PagesProjectHeroCarouselImage
            v-for="(image, i) in projectCarousel.images"
            :key="image.src"
            :image="image"
            :fetch-priority-high="i === 0 || i === 1"
            :class="{
              'opacity-50': index !== i,
              '!duration-0': disabledTransition,
            }"
          />
          <PagesProjectHeroCarouselImage
            v-if="itemsCount > 1"
            :image="projectCarousel.images[0]!"
            class="opacity-50"
          />
        </div>
      </div>
    </div>
    <PagesProjectHeroCarouselButton
      v-if="itemsCount > 1"
      type="prev"
      :disabled="disabledNav"
      @click="prev"
    />
    <PagesProjectHeroCarouselButton
      v-if="itemsCount > 1"
      type="next"
      :disabled="disabledNav"
      @click="next"
    />
  </div>
</template>
<script lang="ts" setup>
import type { ProjectsCarouselCollectionItem } from "@nuxt/content";

interface Props {
  projectCarousel: ProjectsCarouselCollectionItem;
}

const props = defineProps<Props>();

const index = ref(0);
const itemsCount = computed(() => props.projectCarousel.images.length);
const disabledNav = ref(false);
const disabledTransition = ref(false);

const prev = () => {
  disabledNav.value = true;
  index.value = index.value - 1;
};

const next = () => {
  disabledNav.value = true;

  if (index.value + 1 >= itemsCount.value) {
    disabledTransition.value = true;
    index.value = -1;
  }
  setTimeout(() => {
    disabledTransition.value = false;
    index.value = index.value + 1;
  }, 10);
};

const handleSliderTransitionEnd = () => {
  if (index.value < 0) {
    disabledTransition.value = true;
    index.value = itemsCount.value - 1;
  }
  setTimeout(() => {
    disabledTransition.value = false;
    disabledNav.value = false;
  }, 10);
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
