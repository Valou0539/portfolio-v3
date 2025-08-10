<template>
  <section>
    <h2 class="heading-2 mb-6 md:mb-8">
      {{ $t("project.sections.mainFunctionnalities") }}
    </h2>
    <ContentRenderer :value="projectMainFunctionalities" class="md:text-xl" />
  </section>
</template>

<script lang="ts" setup>
import type { ProjectsContentCollectionItem } from "@nuxt/content";

interface Props {
  projectMainFunctionalities: ProjectsContentCollectionItem;
}

defineProps<Props>();
</script>
