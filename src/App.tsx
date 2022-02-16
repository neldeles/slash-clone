import { useEffect } from "react";
import { AuthenticatedApp } from "AuthenticatedApp";
import { UnauthenticatedApp } from "UnauthenticatedApp";

import { authService } from "modules/_common/services/auth-service";

function App() {
  useEffect(function setBackgroundColor() {
    document.body.classList.add("bg-alabaster");

    return () => {
      document.body.classList.remove("bg-alabaster");
    };
  }, []);

  return (
    <>
      {authService.isAuthenticated ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}{" "}
    </>
  );
}

export default App;
