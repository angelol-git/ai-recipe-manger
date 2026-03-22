import { useState, useEffect, memo } from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";
import { X, PanelLeftClose, CirclePlus } from "lucide-react";
import RecipeOptions from "../RecipeOptions";
import UserOptions from "../UserOptions";

const ChatSideBar = memo(
  ({
    recipes,
    user,
    logout,
    isMobile,
    isSideBarOpen,
    isSidebarHydrated,
    hasSidebarInteracted,
    setIsSideBarOpen,
    currentRecipe,
    openDeleteModal,
  }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
      setHasMounted(true);
    }, []);

    return (
      <nav
        className={`
        inset-y-0 left-0 z-100 h-full flex-col flex bg-mantle gap-4 text-sm
        ${isMobile ? "fixed" : "relative shrink-0 border-r-1 border-r-gray-300"}
        ${
          isMobile
            ? isSideBarOpen
              ? "translate-x-0 w-70 p-2"
              : "-translate-x-full w-0 p-0 overflow-hidden"
            : isSideBarOpen
              ? "w-70 p-2"
              : "w-0 p-0 overflow-hidden"
        }
        ${
          hasMounted && isSidebarHydrated && hasSidebarInteracted
            ? isMobile
              ? "duration-200 transition-all ease-out"
              : "duration-200 transition-[width,padding] ease-out"
            : "transition-none"
        }
        `}
      >
        <div className="flex justify-between items-center">
          <Link
            to={`/`}
            className="cursor-pointer  p-1 rounded-lg duration-150 hover:bg-mantle-hover"
          >
            <img src={logo} className="w-8" />
          </Link>
          <button
            onClick={() => {
              setIsSideBarOpen(false);
            }}
            className="cursor-pointer rounded-lg p-2 duration-150 hover:bg-mantle-hover"
          >
            {isMobile ? (
              <X
                size={20}
                strokeWidth={1.5}
                className="stroke-icon duration-150 hover:bg-mantle-hover"
              />
            ) : (
              <PanelLeftClose
                size={20}
                strokeWidth={1.5}
                className="stroke-icon duration-150 hover:bg-mantle-hover"
              />
            )}
          </button>
        </div>
        <button
          onClick={() => {
            if (isMobile) {
              setIsSideBarOpen(false);
            }
          }}
          className="w-full"
        >
          <Link
            to="/chat"
            className="flex gap-2 p-1 pl-2 rounded-lg duration-150 items-center hover:bg-mantle-hover"
          >
            <CirclePlus size={18} strokeWidth={1.5} className="stroke-icon" />
            New Chat
          </Link>
        </button>
        <div className="flex min-h-0 flex-1 flex-col gap-1">
          <h2 className="text-secondary">Recipes</h2>
          <div className="flex w-full flex-col overflow-y-auto">
            {recipes?.map((recipe) => {
              return (
                <SideBarItem
                  key={recipe.id}
                  recipe={recipe}
                  isActive={currentRecipe?.id === recipe.id}
                  isMobile={isMobile}
                  setIsSideBarOpen={setIsSideBarOpen}
                  openDeleteModal={openDeleteModal}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-auto border-t border-secondary/20 pt-2">
          <div className="flex items-center justify-between rounded-lg px-1 py-1 hover:bg-mantle-hover/40">
            <UserOptions
              user={user}
              logout={logout}
              openUpwards
              hideUserSummary
              redirectOnLogin="/"
              redirectOnLogout="/"
            />
            <div className="min-w-0 flex-1 px-2">
              <p className="truncate text-sm text-primary">
                {user?.name || user?.email || "Guest"}
              </p>
            </div>
          </div>
        </div>
      </nav>
    );
  },
);

ChatSideBar.displayName = "ChatSideBar";

const SideBarItem = memo(
  ({ recipe, isActive, isMobile, setIsSideBarOpen, openDeleteModal }) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    return (
      <Link
        to={`/chat/${recipe.id}`}
        state={{ recipe }}
        onClick={() => {
          if (isMobile) {
            setIsSideBarOpen(false);
          }
        }}
        className={`items-center px-2 py-1 flex justify-between duration-150 cursor-pointer rounded-lg hover:bg-mantle-hover 
          ${isActive ? "bg-overlay0" : ""} 
          ${isOptionsOpen ? "bg-mantle-hover" : ""}`}
      >
        <p className="truncate">{recipe.title}</p>

        <RecipeOptions
          recipe={recipe}
          isOptionsOpen={isOptionsOpen}
          setIsOptionsOpen={setIsOptionsOpen}
          openDeleteModal={openDeleteModal}
        />
      </Link>
    );
  },
);

SideBarItem.displayName = "SideBarItem";

export default ChatSideBar;
