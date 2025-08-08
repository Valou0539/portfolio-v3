<template>
  <div class="text-secondary/75 text-xs font-semibold">
    <time :datetime="startDate">{{ new Date(startDate).getFullYear() }}</time>
    —
    <time :datetime="endDate">{{
      endDate === "now"
        ? $t("about.experiences.now")
        : new Date(endDate).getFullYear()
    }}</time>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  startDate: string;
  endDate: string;
}

defineProps<Props>();
</script>
