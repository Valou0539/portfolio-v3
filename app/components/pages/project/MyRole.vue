<template>
  <section>
    <h2 class="heading-2 mb-6 md:mb-8">
      {{ $t("project.sections.myRole") }}
    </h2>
    <ContentRenderer :value="projectMyRole" class="md:text-xl" />
  </section>
</template>

<script lang="ts" setup>
import type { ProjectsContentCollectionItem } from "@nuxt/content";

interface Props {
  projectMyRole: ProjectsContentCollectionItem;
}

defineProps<Props>();
</script>
