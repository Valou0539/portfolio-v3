<template>
  <section>
    <h2 class="sr-only">{{ $t("project.sections.description") }}</h2>
    <ContentRenderer :value="projectDescription!" class="md:text-xl" />
  </section>
</template>

<script lang="ts" setup>
import type { ProjectsContentCollectionItem } from '@nuxt/content';

interface Props {
  projectDescription: ProjectsContentCollectionItem;
}

defineProps<Props>();
</script>
