import { PanelLeftOpen } from "lucide-react";
import ChatOptions from "./ChatOptions";

const ChatHeader = ({
  recipe,
  recipeVersion,
  isSideBarOpen,
  setIsSideBarOpen,
  setIsEditModalOpen,
  openDeleteModal,
  isMobile,
}) => {
  return (
    <div
      className={`p-2 gap-3 top-0 bg-base border-b-1 border-gray-300  z-10 sticky flex w-full justify-between`}
    >
      <div className={`flex ${isMobile ? "items-center w-8 h-8" : "h-8 w-8"}`}>
        {!isSideBarOpen && (
          <button
            onClick={() => setIsSideBarOpen(true)}
            className="cursor-pointer p-2 hover:bg-mantle-hover rounded-lg flex items-center justify-center"
          >
            <PanelLeftOpen
              size={`${isMobile ? "24" : "20"}`}
              strokeWidth={1.5}
              className="stroke-icon"
            />
          </button>
        )}

        {isSideBarOpen && isMobile && <div className="h-8 w-8" />}
      </div>
      <h1 className="text-2xl font-semibold max-w-screen-md lg:px-4 font-lora w-full">
        {recipe?.title}
      </h1>
      {recipe && (
        <ChatOptions
          recipe={recipe}
          recipeVersion={recipeVersion}
          setIsEditModalOpen={setIsEditModalOpen}
          openDeleteModal={openDeleteModal}
        />
      )}
    </div>
  );
};

ChatHeader.displayName = "ChatHeader";

export default ChatHeader;
