<template>
  <div
    class="shadow-2xs shadow-black/2 overflow-hidden transition-all duration-200"
    :style="{
      borderRadius: `${rounded}px`,
      position: position,
    }"
    :class="classes"
  >
    <AssetsGlassFilter
      v-if="withGlassFilter && glassFilterId"
      :glassFilterId="glassFilterId"
      class="absolute h-full w-full"
    />

    <div
      v-if="withGlassFilter && glassFilterId"
      :style="{
        filter: `url(#${glassFilterId})`,
        backdropFilter: `blur(${blurAmount}px)`,
      }"
      class="absolute inset-0"
    />

    <div
      class="relative"
      :style="{
        backdropFilter: !withGlassFilter ? `blur(${blurAmount}px)` : undefined,
      }"
    >
      <slot />
    </div>

    <div
      class="pointer-events-none absolute inset-0"
      :style="{
        borderRadius: `${rounded}px`,
        padding: '1px',
        background: `linear-gradient(165deg, ${colorGlassBorder} 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, ${colorGlassBorder} 100%)`,
        mask: 'linear-gradient(black 0px, black 0px) content-box exclude, linear-gradient(black 0px, black 0px)',
      }"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { v4 as uuid } from "uuid";

interface Props {
  position?: "fixed" | "absolute" | "sticky" | "relative";
  rounded?: number;
  blurAmount?: number;
  opaque?: boolean;
  withGlassFilter?: boolean;
  forceTheme?: "light" | "dark";
}

const props = withDefaults(defineProps<Props>(), {
  position: "relative",
  rounded: 0,
  blurAmount: 0,
  opaque: false,
  withGlassFilter: false,
});

const glassFilterId = ref<string | null>(null);

const classes = computed(() => ({
  "bg-glass-opaque-light": props.forceTheme === "light" && props.opaque,
  "bg-glass-opaque-dark": props.forceTheme === "dark" && props.opaque,
  "bg-glass-opaque": !props.forceTheme && props.opaque,
  "bg-glass-light": props.forceTheme === "light" && !props.opaque,
  "bg-glass-dark": props.forceTheme === "dark" && !props.opaque,
  "bg-glass": !props.forceTheme && !props.opaque,
}));

const colorGlassBorder = computed(() => {
  if (!props.forceTheme) return "var(--color-glass-border)";

  return props.forceTheme === "dark"
    ? "var(--color-glass-border-dark)"
    : "var(--color-glass-border-light)";
});

onMounted(() => {
  glassFilterId.value = uuid();
});
</script>
