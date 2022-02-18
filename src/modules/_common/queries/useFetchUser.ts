import { useQuery } from "react-query";
import { authService } from "../services/auth-service";

export function useFetchUser() {
  return useQuery(["user"], () => authService.getUserDetails());
}
