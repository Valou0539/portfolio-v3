<template>
  <section class="space-y-4">
    <h2 class="sr-only">{{ $t("project.sections.links") }}</h2>
    <CommonButton
      v-if="projectMeta?.website"
      :href="projectMeta.website"
      target="_blank"
    >
      {{ $t("project.website") }}
      <ArrowTopRightOnSquareIcon class="size-4.5 md:size-5" />
    </CommonButton>
    <CommonButton
      v-if="projectMeta?.figma"
      :href="projectMeta.figma"
      target="_blank"
    >
      {{ $t("project.figma") }}
      <ArrowTopRightOnSquareIcon class="size-4.5 md:size-5" />
    </CommonButton>
    <CommonButton
      v-if="projectMeta?.github"
      :href="projectMeta.github"
      target="_blank"
      outline
    >
      <svg viewBox="0 0 24 24" class="size-4.5 md:size-5">
        <path fill="currentColor" :d="siGithub.path" />
      </svg>
      GitHub
    </CommonButton>
  </section>
</template>

<script lang="ts" setup>
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
import type { ProjectsMetaCollectionItem } from "@nuxt/content";
import { siGithub } from "simple-icons";

interface Props {
  projectMeta?: ProjectsMetaCollectionItem;
}

defineProps<Props>();
</script>
