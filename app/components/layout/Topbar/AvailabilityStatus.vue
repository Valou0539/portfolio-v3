<template>
  <div
    ref="statusChip"
    v-tooltip="statusText"
    class="bg-white/1 relative flex size-6 cursor-pointer items-center justify-center"
    v-if="isAvailable || returnDate"
  >
    <div class="absolute right-0 top-0">
      <div
        :class="[
          'pointer-events-none absolute inset-0 animate-ping rounded-full opacity-50 [animation-duration:2s]',
          backgroundColor,
        ]"
      />
      <div
        :class="['pointer-events-none size-2 rounded-full', backgroundColor]"
      />
    </div>
    <CalendarDaysIcon class="mr-1 size-5" />
  </div>
</template>

<script setup lang="ts">
import { CalendarDaysIcon } from "@heroicons/vue/24/outline";

const { locale } = useI18n();

const returnDate: Date | null = new Date("2026-09");

const { isAvailable, backgroundColor, statusTextKey } =
  useAvailability(returnDate);

const statusText = computed(() => {
  return $t(statusTextKey.value ?? "", {
    date: returnDate.toLocaleDateString(locale.value, {
      month: "long",
      year: "numeric",
    }),
  });
});
</script>
