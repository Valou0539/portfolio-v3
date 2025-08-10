export function useProjects(featuredOnly?: boolean) {
  return useAsyncData(`projects-${featuredOnly ? "featured" : "all"}`, () => {
    const query = queryCollection("projects_meta");
    if (featuredOnly) {
      query.where("featured", "=", true).order("year", "DESC").limit(3);
    }
    return query.all();
  });
}
