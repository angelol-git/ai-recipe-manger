import { useState, useEffect } from "react";

function getStoredSidebarState(userId) {
  const id = userId || "guest";
  try {
    const stored = localStorage.getItem(`recipe-is-sidebar-open-${id}`);
    return stored !== null ? JSON.parse(stored) : false;
  } catch {
    return false;
  }
}

export function useChatSidebar(user, isMobile) {
  const userId = user?.id || "guest";

  const [isSideBarOpen, setIsSideBarOpen] = useState(() => {
    if (isMobile) return false;
    return getStoredSidebarState(userId);
  });

  useEffect(() => {
    if (isMobile) {
      setIsSideBarOpen(false);
    } else {
      setIsSideBarOpen(getStoredSidebarState(userId));
    }
  }, [userId, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem(
        `recipe-is-sidebar-open-${userId}`,
        JSON.stringify(isSideBarOpen),
      );
    }
  }, [isSideBarOpen, userId, isMobile]);

  return { isSideBarOpen, setIsSideBarOpen };
}
