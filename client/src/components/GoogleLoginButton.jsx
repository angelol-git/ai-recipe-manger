import { useState, useEffect, useRef } from "react";

function GoogleLoginButton({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(true);
  const buttonRef = useRef(null);
  const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const initializeGoogle = () => {
      if (window.google?.accounts?.id && buttonRef.current) {
        window.google.accounts.id.initialize({
          client_id: clientID,
          callback: onSuccess,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
        });

        // Only set loading false AFTER the button is actually rendered
        setIsLoading(false);
      }
    };

    if (window.google?.accounts?.id) {
      initializeGoogle();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.id = "google-client-script";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.body.appendChild(script);
    }

    return () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.cancel();
      }
    };
  }, [onSuccess, clientID]);

  return (
    <div className="relative">
      {isLoading && <div className="w-[180px] h-[40px] bg-white rounded" />}
      <div
        ref={buttonRef}
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        style={{ minHeight: isLoading ? "40px" : "auto" }}
      />
    </div>
  );
}

export default GoogleLoginButton;
