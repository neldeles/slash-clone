import { useQueryClient } from "react-query";

export function useAuth() {
  const queryClient = useQueryClient();

  /**
   * Remove token from local storage,
   * clear the query cache,
   * and reload the page.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.removeQueries("user");
    window.location.reload();
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null && token !== undefined;
  };

  return {
    handleLogout,
    isAuthenticated: isAuthenticated(),
  };
}
