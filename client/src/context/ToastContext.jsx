import { useState, useCallback, useRef, useEffect } from "react";
import { ToastContext } from "./ToastContext.js";

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  const clearToastTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const showToast = useCallback((message, type = "error", duration = 3000) => {
    clearToastTimeout();
    setToast({ message, type });

    timeoutRef.current = setTimeout(() => {
      setToast(null);
      timeoutRef.current = null;
    }, duration);
  }, [clearToastTimeout]);

  useEffect(() => {
    return () => {
      clearToastTimeout();
    };
  }, [clearToastTimeout]);

  const value = {
    toast,
    setToast,
    showToast,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
