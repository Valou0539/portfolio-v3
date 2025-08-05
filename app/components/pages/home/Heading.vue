<template>
  <section
    class="pb-18 relative mx-auto mt-20 max-w-5xl px-4 text-center md:mt-28"
  >
    <h1 class="heading-1 mb-[clamp(32px,5vw,48px)]">
      {{ $t("home.heading.title") }}
    </h1>
    <p
      class="sm:max-w-7/12 mx-auto w-[284px] max-w-full text-[clamp(16px,3vw,22px)] sm:w-auto"
    >
      {{ $t("home.heading.subtitle") }}
    </p>
    <assets-glass-code
      class="absolute -right-1 -top-1 size-[clamp(40px,12vw,112px)] sm:-top-4 sm:right-[clamp(40px,calc(80px-2vw),64px)]"
    />
    <assets-glass-sparkles
      class="absolute -left-5 top-[clamp(3.3125rem,12vw,10rem)] size-[clamp(40px,12vw,112px)] rotate-[60deg] sm:left-[clamp(-20px,calc(48px-2vw),32px)]"
    />
  </section>
</template>

<script lang="ts" setup></script>
