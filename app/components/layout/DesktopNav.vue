<template>
  <div class="relative flex items-center gap-2 px-3 py-2">
    <NuxtLinkLocale
      v-for="item in navigation"
      :key="item.path"
      :to="item.path"
      class="relative z-10 px-5 py-1.5"
      ref="links"
    >
      {{ $t(item.i18nKey) }}
    </NuxtLinkLocale>
    <CommonGlassDiv
      ref="glass"
      position="absolute"
      :rounded="999"
      opaque
      :withGlassFilter="false"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  navigation: {
    i18nKey: string;
    path: string;
  }[];
}>();

const links = useTemplateRef("links");
const glass = useTemplateRef("glass");

const setGlassStyle = () => {
  const selected = links.value?.find((link) =>
    link?.$el.classList.contains("router-link-exact-active"),
  )?.$el;

  if (!selected || !glass.value) return;

  glass.value.$el.style.left = selected.offsetLeft + "px";
  glass.value.$el.style.width = selected.offsetWidth + "px";
  glass.value.$el.style.height = selected.offsetHeight + "px";
};

const route = useRoute();
watch(() => route.path, setGlassStyle);
onMounted(setGlassStyle);
</script>
