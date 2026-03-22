import { useState, useRef, useEffect } from "react";
import { useRecipes } from "../../hooks/useRecipes";
import { X, Check, Plus } from "lucide-react";
import TagChip from "../tags/TagChip";

function ChatTags({ recipe }) {
  const newTagRef = useRef();
  const { addRecipeTag } = useRecipes();
  const tags = recipe?.tags || [];
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState({
    id: "",
    name: "",
    color: "#FFB86C",
  });

  useEffect(() => {
    setIsAddingTag(false);
    setNewTag({ id: "", name: "", color: "#FFB86C" });
  }, [recipe?.id]);

  useEffect(() => {
    if (isAddingTag) {
      newTagRef.current?.focus();
    }
  }, [isAddingTag]);

  function handleAddTag() {
    if (!newTag.name.trim()) return;
    if (!recipe) return;
    addRecipeTag({
      recipeId: recipe.id,
      newTag: { ...newTag, name: newTag.name.trim() },
    });
    setNewTag({ id: "", name: "", color: "#FFB86C" });
    setIsAddingTag(false);
  }

  return (
    <div className="flex gap-2 py-2 flex-wrap">
      {tags?.length > 0 &&
        tags.map((tag) => {
          return (
            <TagChip key={tag.id} color={tag.color}>
              {tag.name}
            </TagChip>
          );
        })}
      {isAddingTag && (
        <div className="flex gap-2">
          <TagChip color={newTag.color}>
            <input
              ref={newTagRef}
              onChange={(event) => {
                setNewTag((prev) => ({
                  ...prev,
                  name: event.target.value,
                }));
              }}
              value={newTag.name}
              type="text"
              className="w-[100px] min-w-[4ch] border-0 border-b border-secondary/50 bg-transparent px-0 pb-0.5 text-[15px] leading-none text-primary outline-none placeholder:text-secondary/70"
              aria-label="New tag name"
              placeholder="Tag name"
            />
          </TagChip>

          <button
            onClick={() => {
              setNewTag({ id: "", name: "", color: "#FFB86C" });
              setIsAddingTag(false);
            }}
            className="inline-flex min-h-8 min-w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-gray-50 px-2 text-gray-600 shadow-xs transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
          >
            <X size={14} strokeWidth={1.5} className="stroke-gray-600" />
          </button>
          <button
            onClick={handleAddTag}
            className="inline-flex min-h-8 min-w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-gray-50 px-2 text-gray-600 shadow-xs transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
          >
            <Check size={"14"} strokeWidth={1.5} className="stroke-gray-600" />
          </button>
        </div>
      )}
      {!isAddingTag && tags.length === 0 && recipe && (
        <button
          onClick={() => {
            setIsAddingTag((prev) => !prev);
          }}
          className="inline-flex min-h-8 w-fit cursor-pointer items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-[15px] leading-none text-gray-600 shadow-xs transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
        >
          <Plus size={14} strokeWidth={1.5} className="stroke-gray-600" />
          Add Tag
        </button>
      )}
      {!isAddingTag && tags.length > 0 && (
        <button
          onClick={() => {
            setIsAddingTag((prev) => !prev);
          }}
          className="inline-flex min-h-8 min-w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-gray-50 px-2 text-gray-600 shadow-xs transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
        >
          <Plus size={14} strokeWidth={1.5} className="stroke-gray-600" />
        </button>
      )}
    </div>
  );
}

export default ChatTags;
