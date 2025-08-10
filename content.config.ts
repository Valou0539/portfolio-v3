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
        year: z.number(),
        large: z.boolean().optional(),
        featured: z.boolean().optional(),
        cardTheme: z.enum(["light", "dark"]),
        cardImages: z.object({
          default: z
            .object({
              src: z.string(),
              srcMobile: z.string(),
            })
            .optional(),
          large: z
            .object({
              src: z.string(),
              srcMobile: z.string(),
            })
            .optional(),
        }),
        website: z.string().optional(),
        figma: z.string().optional(),
        github: z.string().optional(),
        techStack: z.array(z.string()),
      }),
    }),
    projects_carousel: defineCollection({
      type: "data",
      source: {
        include: "projects/**/carousel.json",
        prefix: "",
      },
      schema: z.object({
        images: z.array(
          z.object({
            src: z.string(),
            alt: z.object({
              en: z.string(),
              fr: z.string(),
            }),
          }),
        ),
      }),
    }),
    experiences_content: defineCollection({
      type: "page",
      source: {
        include: "experiences/**/*.md",
        prefix: "",
      },
    }),
    experiences_meta: defineCollection({
      type: "data",
      source: {
        include: "experiences/**/meta.json",
        prefix: "",
      },
      schema: z.object({
        jobTitle: z.string(),
        company: z.string(),
        companyLink: z.string().optional(),
        startDate: z.string(),
        endDate: z.string(),
        techStack: z.array(z.string()),
      }),
    }),
  },
});
