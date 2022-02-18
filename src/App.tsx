import { useEffect } from "react";
import { AuthenticatedApp } from "AuthenticatedApp";
import { UnauthenticatedApp } from "UnauthenticatedApp";

import { useAuth } from "modules/_common/hooks";

function App() {
  const { isAuthenticated } = useAuth();

  useEffect(function setBackgroundColor() {
    document.body.classList.add("bg-alabaster");

    return () => {
      document.body.classList.remove("bg-alabaster");
    };
  }, []);

  return (
    <>{isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />} </>
  );
}

export default App;
