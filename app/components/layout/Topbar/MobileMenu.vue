<template>
  <div class="flex flex-col items-start gap-2 px-5 py-2">
    <div class="flex w-full items-center justify-between gap-2">
      <LayoutTopbarThemeButton />
      <button
        @click="$emit('close')"
        class="cursor-pointer rounded-sm p-2 hover:bg-white/10"
      >
        <span class="sr-only">{{ $t("layout.topbar.close-menu") }}</span>
        <XMarkIcon class="size-5" />
      </button>
    </div>
    <NuxtLinkLocale
      v-for="item in navigation"
      :key="item.path"
      :to="item.path"
      class="flex w-full items-center gap-6 rounded-sm p-2 hover:bg-white/10"
      @click="$emit('close')"
    >
      <component :is="item.icon" class="size-5" />
      {{ $t(item.i18nKey) }}
    </NuxtLinkLocale>
  </div>
</template>

<script lang="ts" setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { navigation } from "@/consts/navigation";

defineEmits<{
  (e: "close"): void;
}>();
</script>
