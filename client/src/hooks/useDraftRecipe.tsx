import { useState, useEffect } from "react";
import { DraftTag } from "../types/tag";
import type { Recipe, RecipeDetails, RecipeVersion } from "../types/recipe";
import type { EditableTag } from "../types/tag";

type ColorString = {
  hex: string;
};

type UseDraftRecipeProps = {
  recipe: Recipe | null;
  recipeVersion: number | null;
  isEditModalOpen: boolean;
};

type DraftTextItem = {
  id: string;
  text: string;
};

type DraftArrayField = "instructions" | "ingredients";

type DraftRecipe = {
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

export function useDraftRecipe({
  recipe,
  recipeVersion,
  isEditModalOpen,
}: UseDraftRecipeProps) {
  const [draft, setDraft] = useState<DraftRecipe | null>(null);

  useEffect(() => {
    if (!recipe || !isEditModalOpen || recipeVersion === null) return;

    const currentVersion = recipe.versions[recipeVersion];
    if (!currentVersion) return;

    const instructionsWithIds = currentVersion.instructions.map(
      (text, index: number) => ({
        id: `instruction-${recipe.id}-${index}`,
        text,
      }),
    );

    const ingredientsWithIds = currentVersion.ingredients.map(
      (text, index: number) => ({
        id: `ingredient-${recipe.id}-${index}`,
        text,
      }),
    );

    const draftRecipe = {
      recipe_id: recipe.id,
      title: recipe.title || "",
      created_at: recipe.created_at,
      tags: recipe.tags || [],
      ...currentVersion,
      description: currentVersion.description || "",
      recipeDetails: currentVersion.recipeDetails || {},
      instructions: instructionsWithIds,
      ingredients: ingredientsWithIds,
    };

    setDraft(draftRecipe);
  }, [recipe, isEditModalOpen, recipeVersion]);

  function handleDraftString(field: string, value: string) {
    setDraft((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [field]: value,
      };
    });
  }
  function handleDraftDetail(field: string, value: string) {
    setDraft((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        recipeDetails: {
          ...(prev.recipeDetails || {}),
          [field]: value,
        },
      };
    });
  }

  function handleDraftTagName(newName: string, tagId: number) {
    setDraft((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        tags: (prev.tags || []).map((tag) => {
          if (tag.id === tagId) {
            return {
              ...tag,
              name: newName,
            };
          } else {
            return tag;
          }
        }),
      };
    });
  }

  function handleDraftTagColor(color: ColorString, tag: EditableTag) {
    setDraft((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        tags: (prev.tags || []).map((prevTag) => {
          if (prevTag.id === tag.id) {
            return {
              ...prevTag,
              color: color.hex,
            };
          } else {
            return prevTag;
          }
        }),
      };
    });
  }

  function handleDraftTagDelete(tagId: number) {
    setDraft((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        tags: (prev.tags || []).filter((prevTag) => {
          return prevTag.id !== tagId;
        }),
      };
    });
  }

  function handleDraftTagAdd(tag: DraftTag) {
    const trimmedName = tag.name.trim();
    if (!trimmedName) return;

    setDraft((prev) => {
      if (!prev) return prev;

      const hasMatchingTag = (prev.tags || []).some((prevTag) => {
        return prevTag.name.trim().toLowerCase() === trimmedName.toLowerCase();
      });

      if (hasMatchingTag) {
        return prev;
      }

      return {
        ...prev,
        tags: [
          ...(prev.tags || []),
          {
            id: `draft-tag-${Date.now()}`,
            name: trimmedName,
            color: tag.color || "#FFB86C",
          },
        ],
      };
    });
  }

  function handleDraftArrayUpdate(
    field: DraftArrayField,
    value: string,
    targetIndex: number,
  ) {
    setDraft((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [field]: (prev[field] || []).map((item, index) => {
          if (targetIndex === index) {
            if (field === "instructions" || field === "ingredients") {
              return { ...item, text: value };
            }
            return value;
          } else {
            return item;
          }
        }),
      };
    });
  }

  function handleDraftArrayReorder(
    field: string,
    reorderedArray: DraftTextItem,
  ) {
    setDraft((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [field]: reorderedArray,
      };
    });
  }

  function handleDraftArrayPush(field: DraftArrayField, newValue: string) {
    setDraft((prev) => {
      if (!prev) return prev;

      if (field === "instructions" || field === "ingredients") {
        const newItem = {
          id: `${field.slice(0, -1)}-${prev.recipe_id}-${Date.now()}`,
          text: newValue,
        };
        return {
          ...prev,
          [field]: [...(prev[field] || []), newItem],
        };
      }
      return {
        ...prev,
        [field]: [...(prev[field] || []), newValue],
      };
    });
  }

  function handleDraftArrayDelete(field: DraftArrayField, targetIndex: number) {
    setDraft((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [field]: (prev[field] || []).filter((item, index) => {
          return index !== targetIndex;
        }),
      };
    });
  }

  return {
    draft,
    handleDraftString,
    handleDraftDetail,
    handleDraftTagName,
    handleDraftTagColor,
    handleDraftTagDelete,
    handleDraftTagAdd,
    handleDraftArrayUpdate,
    handleDraftArrayDelete,
    handleDraftArrayPush,
    handleDraftArrayReorder,
  };
}
