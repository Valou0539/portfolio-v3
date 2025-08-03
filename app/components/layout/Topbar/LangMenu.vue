<template>
  <div class="flex flex-col items-start gap-2 px-5 py-2">
    <button
      @click="$emit('close')"
      class="cursor-pointer rounded-sm p-2 hover:bg-white/10"
    >
      <span class="sr-only">{{ $t("layout.topbar.cancel") }}</span>
      <ArrowUturnLeftIcon class="size-5" />
    </button>
    <SwitchLocalePathLink
      v-for="lang in $i18n.availableLocales.filter((l) => l !== $i18n.locale)"
      :key="lang"
      :locale="lang"
      class="flex w-full items-center gap-2 rounded-sm p-2 hover:bg-white/10"
      @click="$emit('close')"
    >
      <AssetsFlag :lang="lang" class="size-5 opacity-90" />
      {{ $i18n.locales.value.find((l) => l.code === lang)?.name }}
    </SwitchLocalePathLink>
  </div>
</template>

<script lang="ts" setup>
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";

defineEmits<{
  (e: "close"): void;
}>();
</script>
