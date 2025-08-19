<template>
  <section
    v-if="projectMeta?.website || projectMeta?.figma || projectMeta?.github"
    class="space-y-4"
  >
    <h2 class="sr-only">{{ $t("project.sections.links") }}</h2>
    <CommonButton
      v-if="projectMeta?.website"
      :href="projectMeta.website"
      target="_blank"
      :style="style(400)"
    >
      {{ $t("project.website") }}
      <ArrowTopRightOnSquareIcon class="size-4.5 md:size-5" />
    </CommonButton>
    <CommonButton
      v-if="projectMeta?.figma"
      :href="projectMeta.figma"
      target="_blank"
      :style="style(400 + websiteDelay)"
    >
      {{ $t("project.figma") }}
      <ArrowTopRightOnSquareIcon class="size-4.5 md:size-5" />
    </CommonButton>
    <CommonButton
      v-if="projectMeta?.github"
      :href="projectMeta.github"
      target="_blank"
      :style="style(400 + websiteDelay + figmaDelay)"
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

const props = defineProps<Props>();

const { style } = useAnimationOnLoad();

const websiteDelay = computed(() => {
  return props.projectMeta?.website ? 100 : 0;
});

const figmaDelay = computed(() => {
  return props.projectMeta?.website || props.projectMeta?.figma ? 100 : 0;
});
</script>
