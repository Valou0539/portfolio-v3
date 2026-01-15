<template>
  <div
    ref="statusChip"
    :title="statusText"
    class="bg-white/1 relative flex size-6 cursor-pointer items-center justify-center"
    v-if="isAvailable || availabilityDate"
  >
    <div
      :class="[
        'pointer-events-none absolute inset-1 animate-ping rounded-full opacity-30 [animation-duration:2s]',
        backgroundColor,
      ]"
    />
    <div
      :class="['pointer-events-none size-2.5 rounded-full', backgroundColor]"
    />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

const availabilityDate = ref<Date | null>(new Date("2026-09"));

const isAvailable = computed(() => {
  return availabilityDate.value && availabilityDate.value < new Date();
});

const backgroundColor = computed(() => {
  return getValueFromAvailability({
    available: "bg-green-500",
    availableDate: "bg-orange-500",
  });
});

const statusText = computed(() => {
  return getValueFromAvailability({
    available: $t("layout.topbar.availability.available"),
    availableDate: $t("layout.topbar.availability.available-from", {
      date: availabilityDate.value?.toLocaleDateString(locale.value, {
        month: "long",
        year: "numeric",
      }),
    }),
  });
});

const getValueFromAvailability = <T,>(values: {
  available: T;
  availableDate: T;
}): T | undefined => {
  if (isAvailable.value) {
    return values.available;
  } else if (availabilityDate.value) {
    return values.availableDate;
  }
};
</script>
