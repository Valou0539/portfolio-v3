<template>
  <div :style="containerStyles" class="relative">
    <CommonGlassDiv
      :style="glassStyles"
      :position="isMounted ? 'absolute' : 'relative'"
      class="flex ease-[cubic-bezier(0.66,1.75,1,0.78)]"
      :rounded="rounded"
      :blurAmount="animationPhase === 'expand' ? blurAmount + 10 : blurAmount"
      :opaque="opaque"
      :withGlassFilter="withGlassFilter"
      @click.stop
    >
      <div :class="defaultContentClasses" ref="defaultContent">
        <slot name="default" />
      </div>
      <div :class="popupContentClasses" ref="popupContent">
        <slot name="popup" />
      </div>
    </CommonGlassDiv>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  showPopup: boolean;
  openAlignment?: "center" | "left" | "right";
  position?: "fixed" | "absolute" | "sticky" | "relative";
  rounded?: number;
  blurAmount?: number;
  opaque?: boolean;
  withGlassFilter?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPopup: false,
  openAlignment: "center",
  position: "relative",
  rounded: 0,
  blurAmount: 0,
  opaque: false,
  withGlassFilter: false,
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const defaultContent = useTemplateRef<HTMLElement>("defaultContent");
const popupContent = useTemplateRef<HTMLElement>("popupContent");

const {
  defaultContentClasses,
  popupContentClasses,
  containerStyles,
  glassStyles,
  animationPhase,
  isMounted,
  setupPopupButton,
} = usePopupButton({
  showPopup: () => props.showPopup,
  openAlignment: () => props.openAlignment,
  defaultContent,
  popupContent,
  emitClose: () => emit("close"),
});

setupPopupButton();
</script>
