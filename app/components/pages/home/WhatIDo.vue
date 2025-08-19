<template>
  <section :style="style(300)" class="mx-auto max-w-5xl sm:px-8">
    <CommonGlassDiv :rounded="rounded" :blur-amount="3">
      <h2 class="sr-only">{{ $t("home.what-i-do.title") }}</h2>
      <div class="grid gap-8 p-8 md:grid-cols-2 md:gap-12 md:p-16">
        <div v-for="index in 4" :key="index" :style="style(index * 100 + 300)">
          <div class="heading-3 mb-5 opacity-50 md:mb-6">0{{ index }}</div>
          <h3 class="heading-3 mb-3 md:mb-4">
            {{ $t("home.what-i-do." + index + ".title") }}
          </h3>
          <p class="leading-normal md:text-xl">
            {{ $t("home.what-i-do." + index + ".description") }}
          </p>
        </div>
      </div>
    </CommonGlassDiv>
  </section>
</template>

<script lang="ts" setup>
const rounded = useBreakpoints(16, {
  md: 32,
});
const { style } = useAnimationOnLoad();
</script>
