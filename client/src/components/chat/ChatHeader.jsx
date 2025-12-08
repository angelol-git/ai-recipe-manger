import { PanelLeftOpen } from "lucide-react";
import ChatOptions from "./ChatOptions";

function ChatHeader({
  recipe,
  isMobile,
  currentVersion,
  isSideBarOpen,
  setIsSideBarOpen,
  setIsEditModalOpen,
  handleDeleteRecipeVersion,
  handleDeleteRecipe,
}) {
  return (
    <div className="p-4 gap-3 top-0 bg-base  border-b-1  border-gray-300  sticky flex w-full justify-between py-2">
      <div className={`flex items-start ${isMobile ? "w-8" : ""}`}>
        {!isSideBarOpen && (
          // show icon only when sidebar is closed on ALL devices
          <button
            onClick={() => setIsSideBarOpen(true)}
            className="cursor-pointer pt-1"
          >
            <PanelLeftOpen
              size={24}
              strokeWidth={1.5}
              className="stroke-icon"
            />
          </button>
        )}

        {/* mobile only: placeholder to prevent shift */}
        {isSideBarOpen && isMobile && <div className="w-6" />}
      </div>

      <h1 className="text-2xl font-semibold  font-lora w-full">
        {recipe?.title}
      </h1>
      <ChatOptions
        recipe={recipe}
        currentVersion={currentVersion}
        setIsEditModalOpen={setIsEditModalOpen}
        handleDeleteRecipeVersion={handleDeleteRecipeVersion}
        handleDeleteRecipe={handleDeleteRecipe}
      />
    </div>
  );
}

export default ChatHeader;
