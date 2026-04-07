import type { Recipe, RecipeDetails, RecipeVersion } from "./recipe";
import type { EditableTag } from "./tag";

export type DraftTextItem = {
  id: string;
  text: string;
};

export type DraftArrayField = "instructions" | "ingredients";

export type DraftStringField = "title" | "description" | "source_prompt";

export type DraftRecipe = {
  id: RecipeVersion["id"];
  recipe_id: Recipe["id"];
  title: Recipe["title"];
  created_at: Recipe["created_at"];
  tags: EditableTag[];
  description: RecipeVersion["description"];
  recipeDetails: RecipeDetails;
  instructions: DraftTextItem[];
  ingredients: DraftTextItem[];
  source_prompt: RecipeVersion["source_prompt"];
};

export type DraftArrayEditorProps = {
  draft: DraftRecipe | null;
  handleDraftArrayUpdate: (
    field: DraftArrayField,
    value: string,
    targetIndex: number,
  ) => void;
  handleDraftArrayDelete: (
    field: DraftArrayField,
    targetIndex: number,
  ) => void;
  handleDraftArrayPush: (
    field: DraftArrayField,
    newValue: string,
  ) => void;
  handleDraftArrayReorder: (
    field: DraftArrayField,
    reorderedArray: DraftTextItem[],
  ) => void;
};
