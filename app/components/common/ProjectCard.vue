<template>
  <div
    :class="[
      'relative flex items-end overflow-hidden rounded-2xl p-2',
      classes,
    ]"
  >
    <NuxtImg
      class="absolute inset-0 hidden size-full object-cover sm:block"
      :src="imgDesktop?.src"
      alt=""
      :width="!props.project.large || props.disableLarge ? '400' : '864'"
      height="400"
    />
    <NuxtImg
      class="absolute inset-0 size-full object-cover object-top sm:hidden"
      :src="imgMobile?.srcMobile"
      alt=""
      width="600"
      :height="!props.project.large || props.disableLarge ? '400' : '855'"
    />
    <CommonGlassDiv
      :rounded="8"
      :blur-amount="1"
      :class="['z-10 w-full', colorClasses]"
      :force-theme="project.cardTheme"
    >
      <div class="p-4">
        <NuxtLinkLocale
          :to="link"
          class="font-heading group mb-4 flex items-start justify-between gap-2 leading-[1.1] md:text-xl"
        >
          {{ project.name }}
          <AssetsProjectCardLinkIcon
            class="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:size-4"
          />
        </NuxtLinkLocale>
        <div class="flex flex-wrap items-center gap-2">
          <CommonTechnologyChip
            v-for="technology in project.techStack.slice(
              0,
              project.techStack.length > 4 ? 3 : project.techStack.length,
            )"
            :key="technology"
            :id="technology as keyof typeof technologies"
            size="small"
            :force-theme="project.cardTheme"
            :icon-only="!props.project.large || props.disableLarge"
          />
          <CommonGlassDiv
            v-if="project.techStack.length > 4"
            :rounded="999"
            :blur-amount="3"
            :force-theme="project.cardTheme"
            opaque
          >
            <div
              :class="[
                'flex items-center justify-center px-1.5 py-1 text-xs leading-4 md:text-sm',
                project.cardTheme === 'light'
                  ? 'text-secondary-light'
                  : 'text-secondary-dark',
              ]"
            >
              +{{ project.techStack.length - 3 }}
            </div>
          </CommonGlassDiv>
        </div>
      </div>
    </CommonGlassDiv>
  </div>
</template>
<script lang="ts" setup>
import type { ProjectsMetaCollectionItem } from "@nuxt/content";
import technologies from "~/assets/data/technologies";

interface Props {
  project: ProjectsMetaCollectionItem;
  disableLarge?: boolean;
}

const props = withDefaults(defineProps<Props>(), {});

const link = computed(() => {
  return `/projects/${props.project.stem.replace("/meta", "")}`;
});

const classes = computed(() => ({
  "aspect-[3/2] sm:aspect-square": !props.project.large || props.disableLarge,
  "aspect-[2/3] sm:aspect-auto sm:col-span-2":
    props.project.large && !props.disableLarge,
}));

const colorClasses = computed(() => ({
  "!bg-black/10 text-primary-light": props.project.cardTheme === "light",
  "!bg-black/80 text-primary-dark": props.project.cardTheme === "dark",
}));

const imgDesktop = computed(() => {
  return !props.project.large || props.disableLarge
    ? props.project.cardImages.default
    : props.project.cardImages.large;
});

const imgMobile = computed(() => {
  return !props.project.large || props.disableLarge
    ? props.project.cardImages.default
    : props.project.cardImages.large;
});
</script>
