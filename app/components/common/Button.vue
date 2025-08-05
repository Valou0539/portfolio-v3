<template>
  <button v-if="!to" :class="classes">
    <slot />
  </button>
  <NuxtLinkLocale v-else :to="to" :class="classes">
    <slot />
  </NuxtLinkLocale>
</template>
<script lang="ts" setup>
interface Props {
  to?: string;
  outline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  outline: false,
});

const classes = computed(() => {
  return [
    "hover:bg-primary/90 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-colors duration-200 hover:text-white md:gap-3 md:px-6 md:py-4 md:text-base",
    props.outline
      ? "outline outline-primary text-primary -outline-offset-1"
      : "bg-primary text-primary-contrast",
  ];
});
</script>
