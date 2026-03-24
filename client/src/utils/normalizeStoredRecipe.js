function normalizeStoredList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? ""));
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item ?? ""));
      }
    } catch {
      return [value];
    }

    return [value];
  }

  return [];
}

function normalizeStoredRecipeVersion(version = {}) {
  const recipeDetailsSource = version.recipeDetails || version;

  return {
    ...version,
    id: version.id ?? null,
    recipeDetails: {
      calories: recipeDetailsSource.calories ?? null,
      servings: recipeDetailsSource.servings ?? null,
      total_time: recipeDetailsSource.total_time ?? null,
    },
    description: version.description || "",
    ingredients: normalizeStoredList(version.ingredients),
    instructions: normalizeStoredList(version.instructions),
    source_prompt: version.source_prompt || "",
  };
}

export function normalizeStoredRecipe(recipe = {}) {
  return {
    ...recipe,
    id: recipe.id ?? null,
    title: recipe.title || "",
    created_at: recipe.created_at ?? null,
    tags: Array.isArray(recipe.tags) ? recipe.tags : [],
    versions: Array.isArray(recipe.versions)
      ? recipe.versions.map(normalizeStoredRecipeVersion)
      : [],
  };
}

export function normalizeStoredRecipes(recipes) {
  if (!Array.isArray(recipes)) return [];
  return recipes.map(normalizeStoredRecipe);
}
