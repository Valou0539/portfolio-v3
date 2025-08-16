<template>
  <CommonGlassDiv
    :rounded="999"
    :blur-amount="2"
    position="absolute"
    :class="[
      'top-1/2 -translate-y-1/2 !bg-black/40',
      props.type === 'prev' ? 'left-4 sm:left-8' : 'right-4 sm:right-8',
    ]"
  >
    <button
      @click="$emit('click')"
      class="cursor-pointer p-2 md:p-3 lg:p-4"
      :disabled="disabled"
    >
      <component
        :is="props.type === 'prev' ? ChevronLeftIcon : ChevronRightIcon"
        class="text-secondary-dark size-4 drop-shadow-2xl md:size-6 lg:size-8"
      />
      <span class="sr-only">{{ $t(`project.carousel-btn.${type}`) }}</span>
    </button>
  </CommonGlassDiv>
</template>
<script lang="ts" setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";

interface Props {
  disabled?: boolean;
  type: "prev" | "next";
}

const props = defineProps<Props>();

defineEmits<{
  (e: "click"): void;
}>();
</script>
