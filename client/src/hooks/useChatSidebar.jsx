import { useState, useEffect } from "react";

export function useChatSidebar(user, isMobile) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  useEffect(() => {
    if (!user?.id || isMobile) {
      setIsInitialLoadComplete(true);
      return;
    }

    try {
      const stored = localStorage.getItem(`isSideBarOpen_${user.id}`);
      if (stored !== null) {
        setIsSideBarOpen(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to parse isSideBarOpen:", err);
    } finally {
      setIsInitialLoadComplete(true);
    }
  }, [user?.id, isMobile]);

  useEffect(() => {
    if (!user?.id || isMobile) return;

    localStorage.setItem(
      `isSideBarOpen_${user.id}`,
      JSON.stringify(isSideBarOpen),
    );
  }, [isSideBarOpen, user?.id, isMobile]);

  return { isSideBarOpen, setIsSideBarOpen, isInitialLoadComplete };
}
