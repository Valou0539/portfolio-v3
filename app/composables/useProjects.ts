import type { ProjectsMetaCollectionItem } from "@nuxt/content";

export function useProjects(featuredOnly?: boolean) {
  return useAsyncData(
    `projects-${featuredOnly ? "featured" : "all"}`,
    () => {
      const query = queryCollection("projects_meta").order("date", "DESC");
      query.where("name", "<>", "Purstream");
      if (featuredOnly) {
        query.where("featured", "=", true).limit(3);
      }
      return query.all();
    },
    {
      transform: (projects) => {
        if (!featuredOnly) return arrangeProjects(projects);
        return projects;
      },
    },
  );
}

const arrangeProjects = (
  projects: ProjectsMetaCollectionItem[],
): ProjectsMetaCollectionItem[] => {
  const result: ProjectsMetaCollectionItem[] = [];
  let remaining = [...projects];

  while (remaining.length) {
    if (remaining.length < 3) {
      result.push(...remaining);
      break;
    }

    const first = remaining[0]!;
    const second = remaining[1]!;
    const third = remaining[2]!;
    const lastIsLarge = result.at(-1)?.large;
    const secondLastIsLarge = result.at(-2)?.large;

    let itemsToAdd: ProjectsMetaCollectionItem[];
    let indicesToRemove: number[];

    if (!first.large && !second.large && third.large) {
      if (lastIsLarge) {
        itemsToAdd = [third, first];
        indicesToRemove = [2, 0];
      } else {
        itemsToAdd = [first, third];
        indicesToRemove = [0, 2];
      }
    } else if (first.large || second.large) {
      if (first.large && second.large) {
        itemsToAdd = [first, remaining.find((p) => !p.large)!];
        indicesToRemove = [0, remaining.findIndex((p) => !p.large)];
      } else {
        itemsToAdd = [first, second];
        indicesToRemove = [0, 1];
      }
      if (
        (itemsToAdd[0]!.large && secondLastIsLarge) ||
        (itemsToAdd[1]!.large && lastIsLarge)
      ) {
        itemsToAdd = itemsToAdd.reverse();
      }
    } else {
      itemsToAdd = [first, second, third];
      indicesToRemove = [0, 1, 2];
    }

    result.push(...itemsToAdd);

    indicesToRemove
      .sort((a, b) => b - a)
      .forEach((index) => remaining.splice(index, 1));
  }

  return result;
};
