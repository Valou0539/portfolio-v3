<template>
  <section class="mx-auto max-w-5xl sm:px-8">
    <CommonGlassDiv :rounded="rounded" :blur-amount="3">
      <h2 class="sr-only">{{ $t("home.what-i-do.title") }}</h2>
      <div class="grid gap-8 p-8 md:grid-cols-2 md:gap-12 md:p-16">
        <div v-for="index in 4" :key="index">
          <div
            class="text-primary/50 font-heading mb-5 text-3xl md:mb-6 md:text-4xl"
          >
            {{ index }}
          </div>
          <h3
            class="text-primary font-heading mb-3 text-3xl md:mb-4 md:text-4xl"
          >
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
const rounded = ref(32);

const handleResize = () => {
  rounded.value = window.innerWidth < 768 ? 16 : 32;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
