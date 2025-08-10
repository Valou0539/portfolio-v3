<template>
  <section>
    <h2 class="heading-2 mb-6 md:mb-8">
      {{ $t("project.sections.technologies") }}
    </h2>
    <div class="flex flex-wrap gap-x-2 gap-y-1.5 md:gap-x-4 md:gap-y-2">
      <CommonTechnologyChip
        v-for="id in projectTechStack"
        :key="id"
        :id="id"
        size="large"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ProjectsMetaCollectionItem } from "@nuxt/content";
import type technologies from "~/assets/data/technologies";

interface Props {
  projectMeta: ProjectsMetaCollectionItem;
}

const props = defineProps<Props>();

const projectTechStack = computed(
  () => props.projectMeta.techStack as (keyof typeof technologies)[],
);
</script>
