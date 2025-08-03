<template>
  <button
    @click="
      $colorMode.preference = selectedTheme === 'light' ? 'dark' : 'light';
      selectedTheme = selectedTheme === 'light' ? 'dark' : 'light';
    "
    class="relative cursor-pointer p-2"
  >
    <span class="sr-only">{{
      $t("layout.theme.switch-from-" + selectedTheme)
    }}</span>
    <MoonIcon
      :class="[
        selectedTheme === 'light'
          ? 'opacity-75'
          : '-rotate-180 scale-50 opacity-0',
        'size-5 transition duration-200',
      ]"
    />
    <SunIcon
      :class="[
        selectedTheme === 'dark' ? 'opacity-75' : 'rotate-180 opacity-0',
        'absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 transition duration-200',
      ]"
    />
  </button>
</template>

<script lang="ts" setup>
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";

const selectedTheme = ref("light");

onMounted(() => {
  const colorMode = useColorMode();
  selectedTheme.value = colorMode.value;
});
</script>
