export function useProject(projectId: string) {
  const { locale } = useI18n();

  const projectMetaPromise = useAsyncData(`projectMeta-${projectId}`, () =>
    queryCollection("projects_meta")
      .where("stem", "LIKE", `${projectId}/meta`)
      .first(),
  );

  const projectCarouselPromise = useAsyncData(
    `projectCarousel-${projectId}`,
    () =>
      queryCollection("projects_carousel")
        .where("stem", "LIKE", `${projectId}/carousel`)
        .first(),
  );

  const projectPromise = useAsyncData(
    `projects_content-${projectId}-${locale.value}`,
    () =>
      queryCollection("projects_content")
        .where("stem", "LIKE", `${projectId}/${locale.value}/%`)
        .all(),
    {
      transform: (data) => ({
        description: data.find((item) => item.stem.endsWith("description")),
        mainFunctionnalities: data.find((item) =>
          item.stem.endsWith("main-functionnalities"),
        ),
        myRole: data.find((item) => item.stem.endsWith("my-role")),
      }),
    },
  );

  return { projectMetaPromise, projectCarouselPromise, projectPromise };
}
