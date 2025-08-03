<template>
  <div
    ref="content"
    class="glass shadow-2xs overflow-hidden transition-all duration-200"
    :style="{
      borderRadius: `${rounded}px`,
      position: position,
    }"
    :class="opaque ? 'bg-glass-opaque' : 'bg-glass'"
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

    <div class="relative">
      <slot />
    </div>

    <div
      class="pointer-events-none absolute inset-0"
      :style="{
        borderRadius: `${rounded}px`,
        padding: '1px',
        background:
          'linear-gradient(165deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.7) 100%)',
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
  updateTextColor?: boolean;
  withGlassFilter?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  position: "relative",
  rounded: 0,
  blurAmount: 0,
  opaque: false,
  updateTextColor: false,
  withGlassFilter: true,
});

const glassFilterId = ref<string | null>(null);
const content = useTemplateRef("content");

if (props.updateTextColor) {
  const { setupBackgroundCapture } = useGlassBackground();
  setupBackgroundCapture(content);
}

onMounted(() => {
  glassFilterId.value = uuid();
});
</script>
