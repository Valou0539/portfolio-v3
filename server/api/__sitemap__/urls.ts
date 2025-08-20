export default defineSitemapEventHandler(async (e) => {
  const contentList = await queryCollection(e, "projects_meta").all();

  return contentList.flatMap((c) => {
    return [
      asSitemapUrl({
        loc: `/projects/${c.stem.replace("/meta", "")}`,
      }),
      asSitemapUrl({
        loc: `/en/projects/${c.stem.replace("/meta", "")}`,
      }),
    ];
  });
});
