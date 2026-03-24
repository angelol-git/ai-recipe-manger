import { useEffect, useState, useMemo } from "react";
import { Outlet, useParams } from "react-router";
import { useUser } from "../../hooks/useUser";
import { useRecipes } from "../../hooks/useRecipes";
import { useChatSidebar } from "../../hooks/useChatSidebar";
import useIsMobile from "../../hooks/useIsMobile";
import ChatSideBar from "../../components/chat/ChatSideBar";
import ChatHeader from "../../components/chat/ChatHeader.jsx";
import { useDeleteRecipe } from "../../hooks/useDeleteRecipe.jsx";
import DeleteRecipePortal from "../../components/delete/DeleteRecipePortal.jsx";
import { useToast } from "../../hooks/useToast";

const ChatLayout = () => {
  const { id } = useParams();
  const { user, logout, isLoading: isUserLoading } = useUser();
  const { data: recipes, isLoading } = useRecipes();
  const isMobile = useIsMobile();
  const { isSideBarOpen, setIsSideBarOpen, isSidebarHydrated } = useChatSidebar(
    user,
    isMobile,
    isUserLoading,
  );
  const { showToast } = useToast();
  const recipe = useMemo(() => {
    if (!recipes || !id) return null;
    return recipes.find((r) => r.id === id) || null;
  }, [recipes, id]);

  const [recipeVersion, setRecipeVersion] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [hasSidebarInteracted, setHasSidebarInteracted] = useState(false);

  const { deleteModal, openDeleteModal, closeDeleteModal, handleDelete } =
    useDeleteRecipe({
      getRedirectPath: ({ type, recipe }) => {
        const isDeletingActiveRecipe = recipe?.id === id;
        const isDeletingLastVersion =
          type === "version" && recipe?.versions?.length === 1;

        if (isDeletingActiveRecipe && (type === "all" || isDeletingLastVersion)) {
          return "/chat";
        }

        return null;
      },
    });

  const handleSidebarOpenChange = (nextIsOpen) => {
    setHasSidebarInteracted(true);
    setIsSideBarOpen(nextIsOpen);
  };

  const contextValue = useMemo(
    () => ({
      recipe,
      recipeVersion,
      setRecipeVersion,
      isMobile,
      isSideBarOpen,
      setIsSideBarOpen,
      showToast,
      openDeleteModal,
      isEditModalOpen,
      setIsEditModalOpen,
      isLoading,
    }),
    [
      recipe,
      recipeVersion,
      setRecipeVersion,
      isMobile,
      isSideBarOpen,
      setIsSideBarOpen,
      showToast,
      openDeleteModal,
      isEditModalOpen,
      setIsEditModalOpen,
      isLoading,
    ],
  );

  // Reset recipeVersion when recipe changes
  useEffect(() => {
    if (recipe?.versions?.length) {
      setRecipeVersion(recipe.versions.length - 1);
    } else {
      setRecipeVersion(null);
    }
  }, [recipe?.id, recipe?.versions?.length]);

  // Update document title when recipe changes
  useEffect(() => {
    if (recipe?.title) {
      document.title = recipe.title;
    }
  }, [recipe?.title]);

  return (
    <div
      className={`bg-base text-primary relative flex h-[100dvh] w-full overflow-hidden overscroll-contain`}
    >
      <ChatSideBar
        recipes={recipes}
        user={user}
        logout={logout}
        isMobile={isMobile}
        isSideBarOpen={isSideBarOpen}
        isSidebarHydrated={isSidebarHydrated}
        hasSidebarInteracted={hasSidebarInteracted}
        setIsSideBarOpen={handleSidebarOpenChange}
        currentRecipe={recipe}
        openDeleteModal={openDeleteModal}
      />
      {isMobile && isSideBarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30"
          onClick={() => handleSidebarOpenChange(false)}
        />
      )}
      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <ChatHeader
          recipe={recipe}
          recipeVersion={recipeVersion}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={handleSidebarOpenChange}
          setIsEditModalOpen={setIsEditModalOpen}
          openDeleteModal={openDeleteModal}
          isMobile={isMobile}
        />
        <div className="min-h-0 flex-1 overflow-hidden">
          <Outlet context={contextValue} />
        </div>
      </main>
      {deleteModal.isOpen && (
        <DeleteRecipePortal
          recipe={deleteModal.recipe}
          type={deleteModal.type}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ChatLayout;
