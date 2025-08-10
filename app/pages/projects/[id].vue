<template>
  <main v-if="projectMeta && project?.description">
    <PagesProjectHero
      :project-meta="projectMeta"
      :project-carousel="projectCarousel ?? undefined"
    />
    <div
      class="mx-auto max-w-lg px-4 md:max-w-xl lg:flex lg:max-w-5xl lg:items-start lg:gap-12"
    >
      <div class="space-y-8 md:space-y-12">
        <PagesProjectDescription :project-description="project.description!" />
        <PagesProjectLinks :project-meta="projectMeta" class="lg:hidden" />
        <PagesProjectMainFunctionalities
          v-if="project.mainFunctionnalities"
          :project-main-functionalities="project.mainFunctionnalities"
        />
        <PagesProjectMyRole
          v-if="project.myRole"
          :project-my-role="project.myRole"
        />
        <PagesProjectTechnologies
          :project-meta="projectMeta"
          class="lg:hidden"
        />
      </div>
      <div class="w-91 hidden flex-shrink-0 space-y-12 lg:block">
        <PagesProjectLinks :project-meta="projectMeta" />
        <PagesProjectTechnologies :project-meta="projectMeta" />
      </div>
    </div>
    <PagesProjectOtherProjects :project-meta="projectMeta" />
  </main>
</template>
<script lang="ts" setup>
const route = useRoute();
const projectId = route.params.id as string;

const { projectMetaPromise, projectCarouselPromise, projectPromise } =
  useProject(projectId);
const [{ data: projectMeta }, { data: projectCarousel }, { data: project }] =
  await Promise.all([
    projectMetaPromise,
    projectCarouselPromise,
    projectPromise,
  ]);

if (!projectMeta.value || !project.value?.description) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" });
}

useSeoMeta({
  title: projectMeta.value?.name,
  description: project.value?.description.seo.description,
});
</script>
