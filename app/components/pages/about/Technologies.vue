<template>
  <section class="mx-auto max-w-5xl px-4 pb-8 pt-4 md:pb-12 md:pt-8">
    <h2 class="heading-2 mb-8 md:mb-12">
      {{ $t("about.technologies.title") }}
    </h2>
    <div class="mb-4 flex flex-wrap gap-x-2 gap-y-1.5 md:gap-x-4 md:gap-y-2">
      <CommonTechnologyChip
        v-for="id in Object.keys(technologies) as (keyof typeof technologies)[]"
        :key="id"
        :id="id"
        size="large"
      />
    </div>
    <p class="text-secondary/75 text-center text-xs font-medium md:text-sm">
      {{ $t("about.technologies.more") }}
    </p>
  </section>
</template>
<script setup lang="ts">
import technologies from "~/assets/data/technologies";
</script>
