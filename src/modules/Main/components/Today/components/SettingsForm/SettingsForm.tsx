import { useState } from "react";
import { useModal } from "../Modal";

export function SettingsForm() {
  const { setIsOpen, initialFocusRef } = useModal();
  const [apiKey, setApiKey] = useState("");

  const saveSettings = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(apiKey);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="py-5 px-4 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-500">
          Toggl API Key
        </h3>
        <form onSubmit={saveSettings} className="mt-2">
          <div className="w-full sm:max-w-xs">
            <input
              ref={initialFocusRef}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="py-2 w-full max-h-full text-lg placeholder:text-base font-bold placeholder:font-normal placeholder:text-gray-300 text-black focus:placeholder:text-gray-400 bg-transparent border-b-2 border-gray-400 focus:outline-none"
              placeholder="Enter API key here..."
              required
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
