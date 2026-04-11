import { z } from "zod";
import type { Recipe, RecipeVersion } from "../types/recipe";
import type { Tag } from "../types/tag";

const storedListSchema = z
  .union([z.array(z.unknown()), z.string(), z.undefined(), z.null()])
  .transform((value): string[] => {
    if (Array.isArray(value)) {
      return value.map((item) => String(item ?? ""));
    }

    if (typeof value === "string") {
      const trimmed = value.trim();

      if (!trimmed) return [];

      try {
        const parsed: unknown = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item ?? ""));
        }
      } catch {
        return [value];
      }

      return [value];
    }

    return [];
  });

const recipeDetailsSchema = z.object({
  calories: z.union([z.string(), z.number(), z.null()]).optional(),
  servings: z.union([z.string(), z.number(), z.null()]).optional(),
  total_time: z.union([z.string(), z.number(), z.null()]).optional(),
});

const tagSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  color: z.string(),
}) satisfies z.ZodType<Tag>;

const storedRecipeVersionSchema = z
  .object({
    id: z.union([z.string(), z.number()]).optional(),
    description: z.string().optional(),
    ingredients: storedListSchema.optional(),
    instructions: storedListSchema.optional(),
    source_prompt: z.string().optional(),
    recipeDetails: recipeDetailsSchema.partial().nullable().optional(),
  })
  .transform(
    (version): RecipeVersion => {
      return {
        id: String(version.id ?? ""),
        recipeDetails: {
          calories: version.recipeDetails?.calories ?? null,
          servings: version.recipeDetails?.servings ?? null,
          total_time: version.recipeDetails?.total_time ?? null,
        },
        description: version.description ?? "",
        ingredients: version.ingredients ?? [],
        instructions: version.instructions ?? [],
        source_prompt: version.source_prompt ?? "",
      };
    },
  );

const storedRecipeSchema = z
  .object({
    id: z.union([z.string(), z.number()]).optional(),
    title: z.string().optional(),
    source_url: z.string().nullable().optional(),
    created_at: z.string().nullable().optional(),
    tags: z.array(tagSchema).optional(),
    versions: z.array(storedRecipeVersionSchema).optional(),
  })
  .transform(
    (recipe): Recipe => ({
      id: String(recipe.id ?? ""),
      title: recipe.title ?? "",
      source_url: recipe.source_url ?? null,
      created_at: recipe.created_at ?? null,
      tags: recipe.tags ?? [],
      versions: recipe.versions ?? [],
    }),
  );

const storedRecipesSchema = z.array(storedRecipeSchema);

export function normalizeStoredRecipe(recipe: unknown = {}): Recipe {
  return storedRecipeSchema.parse(recipe);
}

export function normalizeStoredRecipes(recipes: unknown): Recipe[] {
  const result = storedRecipesSchema.safeParse(recipes);
  return result.success ? result.data : [];
}
