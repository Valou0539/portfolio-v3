<template>
  <main>
    <section class="mx-auto mt-20 max-w-sm px-4 sm:max-w-5xl md:mt-28">
      <h1 class="heading-1 mb-8 text-center md:mb-12">
        {{ t("projects.title") }}
      </h1>
      <div
        class="grid grid-cols-1 gap-6 sm:auto-rows-fr sm:grid-cols-3 lg:gap-16"
      >
        <CommonProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
  title: t("projects.seo.title"),
  description: t("projects.seo.description"),
});

const { data: projects } = await useProjects();
</script>
