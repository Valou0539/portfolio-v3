import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    projects_content: defineCollection({
      type: "page",
      source: {
        include: "projects/**/*.md",
        prefix: "",
      },
    }),
    projects_meta: defineCollection({
      type: "data",
      source: {
        include: "projects/**/meta.json",
        prefix: "",
      },
      schema: z.object({
        name: z.string(),
        large: z.boolean().optional(),
        featured: z.boolean().optional(),
        featuredOrder: z.number().optional(),
        cardTheme: z.enum(["light", "dark"]),
        images: z.object({
          card: z.object({
            default: z
              .object({
                src: z.string(),
                srcMobile: z.string(),
                alt: z.string(),
              })
              .optional(),
            large: z
              .object({
                src: z.string(),
                srcMobile: z.string(),
                alt: z.string(),
              })
              .optional(),
          }),
          carousel: z.array(
            z.object({
              src: z.string(),
              alt: z.string(),
            }),
          ),
        }),
        website: z.string().optional(),
        figma: z.string().optional(),
        github: z.string().optional(),
        techStack: z.array(z.string()),
      }),
    }),
  },
});
