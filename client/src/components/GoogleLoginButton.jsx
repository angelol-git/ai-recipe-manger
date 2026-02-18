import { useEffect, useRef } from "react";

function GoogleLoginButton({ onSuccess }) {
  const buttonRef = useRef(null);
  const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const initializeGoogle = () => {
      if (window.google?.accounts?.id && buttonRef.current) {
        window.google.accounts.id.initialize({
          client_id: clientID,
          callback: onSuccess,
          use_fedcm_for_button: true,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
        });
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

  return <div ref={buttonRef}></div>;
}

export default GoogleLoginButton;
