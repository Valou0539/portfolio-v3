<template>
  <CommonGlassDiv
    :rounded="999"
    :blur-amount="3"
    :force-theme="forceTheme"
    opaque
  >
    <NuxtLink
      :to="technologies[id].url"
      :class="['flex items-center', linkClasses]"
      target="_blank"
    >
      <component :is="technologies[id].logo" :class="iconClasses" />
      <span :class="{ 'sr-only': iconOnly }">{{ technologies[id].name }}</span>
    </NuxtLink>
  </CommonGlassDiv>
</template>
<script lang="ts" setup>
import technologies from "~/assets/data/technologies";

interface Props {
  id: keyof typeof technologies;
  size?: "small" | "large";
  iconOnly?: boolean;
  forceTheme?: "light" | "dark";
}

const props = withDefaults(defineProps<Props>(), {
  size: "small",
  iconOnly: false,
  forceDark: false,
});

const linkClasses = computed(() => ({
  "px-1.5 py-1 text-xs md:text-sm gap-1": props.size === "small",
  "px-3 py-1.5 text-sm md:text-base gap-2 md:gap-3": props.size === "large",
  "!p-1": props.iconOnly && props.size === "small",
  "!p-1.5": props.iconOnly && props.size === "large",
  "text-secondary-dark": props.forceTheme === "dark",
  "text-secondary-light": props.forceTheme === "light",
}));

const iconClasses = computed(() => ({
  "size-4": props.size === "small",
  "size-5.5 md:size-7": props.size === "large",
}));
</script>
