<template>
  <section class="mx-auto mt-20 max-w-lg pb-8 md:mt-28 md:max-w-5xl">
    <h1 class="heading-1 mb-8 px-2 text-center sm:px-4 md:mb-12">
      {{ $t("about.hero.title") }}
    </h1>
    <div class="px-4 md:flex md:items-start md:gap-8 lg:gap-16">
      <NuxtImg
        src="/images/about-me.JPEG"
        class="mb-6 max-h-[340px] w-full overflow-auto rounded-full object-cover md:mb-0 lg:max-w-[340px] lg:flex-shrink-0"
      />
      <div>
        <h2 class="heading-2 mb-4 md:mb-8">{{ $t("about.hero.subtitle") }}</h2>
        <p class="mb-6 whitespace-pre-line md:mb-8 md:text-xl">
          {{
            $t("about.hero.description", {
              startCodingYears,
              startFreelanceYears,
            })
          }}
        </p>
        <div class="flex gap-4">
          <CommonButton :href="cvHref" target="_blank">
            {{ $t("about.hero.cvButton") }}
            <ArrowTopRightOnSquareIcon class="size-4.5 md:size-5" />
          </CommonButton>
          <CommonButton href="https://github.com/valou0539" outline>
            <svg viewBox="0 0 24 24" class="size-4.5 md:size-5">
              <path fill="currentColor" :d="siGithub.path" />
            </svg>
            {{ $t("about.hero.githubButton") }}
          </CommonButton>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
import { siGithub } from "simple-icons";

const actualYear = new Date().getFullYear();
const startCodingYears = actualYear - 2021;
const startFreelanceYears = actualYear - 2023;

const { locale } = useI18n();
const cvHref = computed(
  () => `/CV-GINDRE_Valentin-${locale.value.toUpperCase()}.pdf`,
);
</script>
