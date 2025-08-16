<template>
  <section class="mx-auto max-w-5xl px-8 pb-4 pt-12 md:pb-12 md:pt-16">
    <div class="mb-8 flex items-center justify-between md:mb-12">
      <h2 class="heading-2">
        {{ $t("home.featured-projects.title") }}
      </h2>
      <CommonButton class="group hidden sm:flex" :to="'/projects'" outline>
        {{ $t("home.featured-projects.see-all") }}
        <ArrowUpRightIcon
          class="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </CommonButton>
    </div>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-16">
      <CommonProjectCard
        v-for="project in featuredProjects?.slice(0, 3)"
        :key="project.id"
        :project="project"
        disable-large
      />
    </div>
    <div class="mt-8 flex justify-end sm:hidden">
      <CommonButton class="group" :to="'/projects'" outline>
        {{ $t("home.featured-projects.see-all") }}
        <ArrowUpRightIcon
          class="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </CommonButton>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ArrowUpRightIcon } from "@heroicons/vue/24/outline";

const { data: featuredProjects } = await useProjects(true);
</script>
