import { useFetchUser } from "modules/_common/queries";
import { authService } from "modules/_common/services/auth-service";
import { togglService } from "modules/_common/services/toggl-service";
import { TTogglSettings } from "modules/_common/types/api";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useModal } from "../Modal";

export function SettingsForm() {
  // const userQuery = useQuery(["user"], () => authService.getUserDetails());
  // const userData = userQuery.data ?? {};
  const userQuery = useFetchUser();
  // We assert this because user can't login if there is no user data.
  const userData = userQuery.data!;
  const initialApi = userData.togglApiKey;

  const { setIsOpen, initialFocusRef } = useModal();
  const [apiKey, setApiKey] = useState(initialApi);

  const queryClient = useQueryClient();

  const userMutation = useMutation(
    (data: TTogglSettings) => togglService.updateTogglSettings(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  if (userQuery.isLoading) {
    return <h1>loading</h1>;
  }

  const saveSettings = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (apiKey) {
      console.log(apiKey);
    }
    const data = {
      userId: userData.id,
      toggl_api_key: apiKey,
    };
    userMutation.mutate(data);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="py-5 px-4 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-500">
          Toggl API Key
        </h3>
        <form onSubmit={saveSettings} className="mt-2">
          <div className="w-full">
            <input
              ref={initialFocusRef}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="py-2 w-full max-h-full text-lg placeholder:text-base font-bold placeholder:font-normal placeholder:text-gray-300 text-black focus:placeholder:text-gray-400 bg-transparent border-x-0 border-t-0 border-b-2 focus:border-b-black focus:outline-none focus:ring-0"
              placeholder="Enter API key here..."
              autoFocus
              type="text"
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="items-center py-3 px-6 w-3/4 text-base font-medium tracking-wide text-white bg-indigo-200 hover:bg-indigo-100 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 shadow-sm"
              type="submit"
              onClick={() => setIsOpen(false)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
