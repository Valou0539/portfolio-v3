<template>
  <button v-if="!to && !href" :class="classes" :type="type">
    <slot />
  </button>
  <NuxtLinkLocale v-else-if="to" :to="to" :class="classes" :target="target">
    <slot />
  </NuxtLinkLocale>
  <a v-else :href="href" :class="classes" :target="target">
    <slot />
  </a>
</template>
<script lang="ts" setup>
interface Props {
  to?: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  outline?: boolean;
  type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  href: undefined,
  target: undefined,
  outline: false,
  type: "button",
});

const classes = computed(() => {
  return [
    "hover:bg-primary/90 flex justify-center items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-colors duration-200 hover:text-white md:gap-3 md:px-6 md:py-4 md:text-base",
    props.outline
      ? "outline outline-primary text-primary -outline-offset-2"
      : "bg-primary text-primary-contrast",
  ];
});
</script>
