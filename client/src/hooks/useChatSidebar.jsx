import { useState, useEffect } from "react";

export function useChatSidebar(user) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    try {
      const stored = localStorage.getItem(`isSideBarOpen_${user.id}`);
      if (stored !== null) {
        setIsSideBarOpen(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to parse isSideBarOpen:", err);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    localStorage.setItem(
      `isSideBarOpen_${user.id}`,
      JSON.stringify(isSideBarOpen)
    );
  }, [isSideBarOpen, user?.id]);

  return { isSideBarOpen, setIsSideBarOpen };
}
