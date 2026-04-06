import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Tag } from "../types/tag";
type ColorString = {
  hex: string;
};
type useDraftTagProps = {
  tags: Tag[];
  isEditTags: boolean;
  setTagsToBeDeleted: Dispatch<SetStateAction<Tag[]>>;
};
function useDraftTags({
  tags,
  isEditTags,
  setTagsToBeDeleted,
}: useDraftTagProps) {
  const [draftTags, setDraftTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (isEditTags && tags) {
      setDraftTags(tags);
    }
  }, [tags, isEditTags]);

  function handleEditDraftTagName(newName: string, tagId: number) {
    setDraftTags((prev) => {
      return prev.map((t) => {
        if (t.id === tagId) {
          return { ...t, name: newName };
        } else {
          return t;
        }
      });
    });
  }

  function handleEditDraftTagColor(color: ColorString, tag: Tag) {
    const newColor = color.hex;
    const originalColor = tag.color;
    if (newColor === originalColor) {
      return;
    }
    setDraftTags((prev) => {
      return prev.map((t) => {
        if (t.id === tag.id) {
          return { ...t, color: newColor };
        } else {
          return t;
        }
      });
    });
  }

  function handleDraftTagDelete(tag: Tag) {
    setTagsToBeDeleted((prev) => [...prev, tag]);
    setDraftTags((prev) => {
      return prev.filter((t) => t.id !== tag.id);
    });
  }

  return {
    draftTags,
    handleDraftTagDelete,
    handleEditDraftTagName,
    handleEditDraftTagColor,
  };
}

export default useDraftTags;
