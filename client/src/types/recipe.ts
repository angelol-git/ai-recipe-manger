import type { Tag } from "./tag";

export type RecipeDetailValue = string | number | null;

export type Recipe = {
  id: string;
  title: string;
  source_url?: string | null;
  tags: Tag[];
  versions: RecipeVersion[];
  created_at?: string | null;
};

export type RecipeDetails = {
  calories: RecipeDetailValue;
  servings: RecipeDetailValue;
  total_time: RecipeDetailValue;
};

export type RecipeVersion = {
  id: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  recipeDetails: RecipeDetails;
  source_prompt: string;
};