<script setup lang="ts">
import { ChatBubbleLeftIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <section
    class="md:pt-18 mx-auto max-w-5xl px-8 pt-12 sm:flex sm:items-center sm:justify-between sm:gap-12"
  >
    <div class="mb-8 sm:mb-0">
      <h2 class="heading-2 mb-4">
        {{ $t("home.cta.title") }}
      </h2>
      <p class="text-secondary/75">
        {{ $t("home.cta.description") }}
      </p>
    </div>
    <div class="flex flex-shrink-0 items-center gap-4">
      <CommonButton to="/contact">
        <ChatBubbleLeftIcon class="hidden size-4 sm:block md:size-5" />
        {{ $t("home.cta.contact") }}
      </CommonButton>
      <CommonButton to="/about" outline>
        {{ $t("home.cta.more") }}
      </CommonButton>
    </div>
  </section>
</template>
