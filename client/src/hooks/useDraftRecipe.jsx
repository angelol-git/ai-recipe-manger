import { useState, useEffect } from "react";
export function useDraftRecipe({ recipe, recipeVersion, isEditModalOpen }) {
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (!recipe || !isEditModalOpen) return;

    const currentVersion = recipe.versions[recipeVersion];
    let draftRecipe = {
      id: recipe.id,
      title: recipe.title,
      created_at: recipe.created_at,
      tags: recipe.tags,
      ...currentVersion,
    };

    setDraft(draftRecipe);
  }, [recipe, isEditModalOpen, recipeVersion]);

  function handleDraftString(field, value) {
    setDraft((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  }
  function handleDraftDetail(field, value) {
    setDraft((prev) => ({
      ...prev,
      recipeDetails: {
        ...prev.recipeDetails,
        [field]: value,
      },
    }));
  }

  function handleDraftTagName(event, tag) {
    const newName = event.target.value;
    setDraft((prev) => {
      return {
        ...prev,
        tags: prev.tags.map((prevTag) => {
          if (prevTag.id === tag.id) {
            return {
              ...prevTag,
              name: newName,
            };
          } else {
            return prevTag;
          }
        }),
      };
    });
  }

  function handleDraftTagColor(color, tag) {
    setDraft((prev) => {
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

  function handleDraftTagDelete(tagId) {
    setDraft((prev) => {
      console.log("Here");
      return {
        ...prev,
        tags: prev.tags.filter((prevTag) => {
          return prevTag.id !== tagId;
        }),
      };
    });
  }

  // function deleteDraftArray(versionId, field, targetIndex) {
  //   setDraft((prev) => {
  //     return {
  //       ...prev,
  //       versions: prev.versions.map((version) => {
  //         if (version.id === versionId) {
  //           return {
  //             ...version,
  //             [field]: version[field].filter((item, index) => {
  //               return index !== targetIndex;
  //             }),
  //           };
  //         } else {
  //           return version;
  //         }
  //       }),
  //     };
  //   });
  // }
  return {
    draft,
    handleDraftString,
    handleDraftDetail,
    handleDraftTagName,
    handleDraftTagColor,
    handleDraftTagDelete,
  };
}
