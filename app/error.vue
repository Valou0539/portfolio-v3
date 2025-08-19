<template>
  <NuxtLoadingIndicator color="var(--color-primary)" />
  <Html :lang="$i18n.locale">
    <NuxtLayout>
      <main
        class="pb-18 relative mx-auto mt-20 max-w-5xl px-4 text-center md:mt-28"
      >
        <div class="relative">
          <div
            :style="style(100)"
            class="heading-2 !text-gray-700 dark:!text-gray-300"
          >
            {{ error.statusCode || "404" }}
          </div>

          <h1 :style="style(0)" class="heading-1 mb-[clamp(24px,4vw,32px)]">
            {{ $t("error.title") }}
          </h1>

          <p
            :style="style(300)"
            class="sm:max-w-7/12 mx-auto mb-[clamp(32px,5vw,64px)] w-[284px] max-w-full text-[clamp(16px,3vw,22px)] sm:w-auto"
          >
            {{
              $t(
                (error.data as any)?.isProjectNotFound
                  ? "error.project-not-found"
                  : "error.default",
              )
            }}
          </p>

          <div
            :style="style(400)"
            class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <CommonButton
              v-if="(error.data as any)?.isProjectNotFound"
              to="/projects"
            >
              {{ $t("error.back-to-projects") }}
            </CommonButton>
            <CommonButton v-else to="/">
              {{ $t("error.back-home") }}
            </CommonButton>
            <CommonButton @click="$router.go(-1)" outline>
              {{ $t("error.go-back") }}
            </CommonButton>
          </div>
        </div>
      </main>
    </NuxtLayout>
  </Html>
</template>
<script lang="ts" setup>
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();

const { t } = useI18n();
const { style } = useAnimationOnLoad();

useHead({
  titleTemplate: `${t("error.title")} - Valentin Gindre`,
});

const { locale } = useI18n();
</script>
