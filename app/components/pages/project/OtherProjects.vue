<template>
  <section
    class="mx-auto flex max-w-lg flex-wrap justify-between gap-x-4 gap-y-3 px-4 pt-16 md:max-w-xl md:pt-24 lg:max-w-5xl"
  >
    <h2 class="sr-only">
      {{ $t("project.sections.otherProjects") }}
    </h2>
    <CommonButton v-if="prevProject" :to="prevProjectLink" outline>
      <ArrowLeftIcon class="size-4.5 md:size-5" />
      <span class="sr-only">{{ $t("project.projects-btn.prev") }}</span>
      <span>{{ prevProject.name }}</span>
    </CommonButton>
    <CommonButton
      v-if="nextProject"
      :to="nextProjectLink"
      outline
      class="ml-auto"
    >
      <span class="sr-only">{{ $t("project.projects-btn.next") }}</span>
      <span>{{ nextProject.name }}</span>
      <ArrowRightIcon class="size-4.5 md:size-5" />
    </CommonButton>
  </section>
</template>
<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";
import type { ProjectsMetaCollectionItem } from "@nuxt/content";

interface Props {
  projectMeta: ProjectsMetaCollectionItem;
}

const props = defineProps<Props>();

const { data: projects } = await useProjects();

const projectIndex = computed(() =>
  projects.value?.findIndex((project) => project.id === props.projectMeta.id),
);

const prevProject = computed(() => projects.value?.at(projectIndex.value! - 1));

const nextProject = computed(() =>
  projects.value?.at((projectIndex.value! + 1) % projects.value!.length),
);

const prevProjectLink = computed(() => {
  return `/projects/${prevProject.value?.stem.replace("/meta", "")}`;
});

const nextProjectLink = computed(() => {
  return `/projects/${nextProject.value?.stem.replace("/meta", "")}`;
});
</script>
