<template>
  <div>
    <ContentRenderer v-if="project?.description" :value="project.description" />
    <ContentRenderer
      v-if="project?.mainFunctionnalities"
      :value="project.mainFunctionnalities"
    />
    <ContentRenderer v-if="project?.myRole" :value="project.myRole" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const projectId = route.params.id as string;

const { locale } = useI18n();

const { data: projectMeta } = await useAsyncData("projectMeta", () =>
  queryCollection("projects_meta")
    .where("stem", "LIKE", `${projectId}/meta`)
    .first(),
);

const { data: project } = await useAsyncData(
  "projects_content",
  () =>
    queryCollection("projects_content")
      .where("stem", "LIKE", `${projectId}/${locale.value}/%`)
      .all(),
  {
    watch: [locale],
    transform: (data) => ({
      description: data[0],
      mainFunctionnalities: data[1],
      myRole: data[2],
    }),
  },
);
</script>
