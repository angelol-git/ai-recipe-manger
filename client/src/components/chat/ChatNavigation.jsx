import { memo } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const ChatNavigation = memo(({ recipe, recipeVersion, setRecipeVersion }) => {
  const totalVersions = recipe?.versions?.length ?? 0;

  function handleNext(event) {
    event.stopPropagation();
    if (totalVersions > recipeVersion + 1) {
      setRecipeVersion((prev) => prev + 1);
    }
  }

  function handlePrevious(event) {
    event.stopPropagation();
    if (recipeVersion > 0) {
      setRecipeVersion((prev) => prev - 1);
    }
  }

  return (
    <div className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-secondary/15 bg-mantle px-2">
      <button
        onClick={handlePrevious}
        disabled={recipeVersion === 0}
        className="flex h-8 w-6 cursor-pointer items-center justify-center rounded-full text-secondary disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Previous version"
      >
        <ChevronLeft size={18} strokeWidth={1.75} />
      </button>

      <span className="min-w-14 text-center text-sm font-medium tabular-nums text-secondary">
        {recipeVersion + 1}
        <span className="text-icon-muted">/{totalVersions}</span>
      </span>
      <button
        onClick={handleNext}
        disabled={recipeVersion === totalVersions - 1}
        className="flex h-8 w-6 cursor-pointer items-center justify-center rounded-full text-secondary disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Next version"
      >
        <ChevronRight size={18} strokeWidth={1.75} />
      </button>
    </div>
  );
});

ChatNavigation.displayName = "ChatNavigation";

export default ChatNavigation;
