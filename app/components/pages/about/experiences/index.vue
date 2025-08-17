<template>
  <section class="mx-auto max-w-5xl px-4 pt-4 md:pt-12">
    <h2 class="heading-2 mb-8 md:mb-12">
      {{
        props.type === "professional"
          ? $t("about.experiences.professional-title")
          : $t("about.experiences.education-title")
      }}
    </h2>
    <div
      v-if="experiencesMeta"
      v-for="(experience, index) in experiencesMeta"
      :key="experience.id"
      class="flex gap-4"
    >
      <PagesAboutExperiencesPeriod
        :start-date="experience.startDate"
        :end-date="experience.endDate"
        class="w-29 mt-2 hidden flex-shrink-0 text-right md:block"
      />
      <div :class="['relative w-3.5 flex-shrink-0', { 'pt-1.5': index === 0 }]">
        <div
          :class="[
            'bg-primary/50 mx-auto h-full w-1',
            {
              'rounded-t-full': index === 0,
              'rounded-b-full': index === experiencesMeta.length - 1,
            },
          ]"
        />
        <CommonGlassDiv
          :rounded="999"
          position="absolute"
          class="left-0 top-0 h-[38px] w-full"
          opaque
        />
      </div>
      <div class="pb-4">
        <PagesAboutExperiencesPeriod
          :start-date="experience.startDate"
          :end-date="experience.endDate"
          class="md:hidden"
        />
        <h3
          class="font-heading text-primary my-2 text-lg leading-[1.1] md:text-xl"
        >
          {{ $t(experience.jobTitle) }}
          ·
          <a
            v-if="experience.companyLink"
            :href="experience.companyLink"
            target="_blank"
          >
            {{ experience.company }}
            <ArrowUpRightIcon class="mb-1 inline size-3" />
          </a>
          <span v-else>{{ experience.company }}</span>
        </h3>
        <ContentRenderer
          v-if="getExperienceContent(experience)"
          :value="getExperienceContent(experience)!"
          class="mb-2 text-sm md:text-base"
        />
        <div class="flex flex-wrap gap-2">
          <CommonTechnologyChip
            v-for="tech in getTechStack(experience)"
            :key="tech"
            :id="tech"
            size="large"
            iconOnly
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ArrowUpRightIcon } from "@heroicons/vue/24/outline";
import type {
  ExperiencesProfessionalMetaCollectionItem,
  ExperiencesEducationMetaCollectionItem,
} from "@nuxt/content";
import technologies from "~/assets/data/technologies";

type ExperienceMeta =
  | ExperiencesProfessionalMetaCollectionItem
  | ExperiencesEducationMetaCollectionItem;

interface Props {
  type: "professional" | "education";
}

const props = defineProps<Props>();

const { data: experiencesMeta } = await useAsyncData(
  "experiencesMeta" + props.type,
  () => queryCollection(`experiences_${props.type}_meta`).all(),
);

const { locale } = useI18n();
const { data: experiencesContent } = await useAsyncData(
  "experiencesContent" + props.type,
  () =>
    queryCollection(`experiences_${props.type}_content`)
      .where("stem", "LIKE", `%${locale.value}`)
      .all(),
  {
    watch: [locale],
  },
);

const getExperienceContent = (experience: ExperienceMeta) =>
  experiencesContent.value?.find(
    (e) => e.stem.split("/")[0] === experience.stem.split("/")[0],
  );

const getTechStack = (experience: ExperienceMeta) =>
  experience.techStack as (keyof typeof technologies)[];
</script>
