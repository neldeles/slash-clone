import { motion } from "framer-motion";
import { useFetchUser } from "modules/_common/queries";
import { togglService } from "modules/_common/services/toggl-service";
import { useQuery } from "react-query";

export function TogglSettingsPage() {
  const userQuery = useFetchUser();
  const togglApiKey = userQuery.data?.toggl_api_key;
  const settingsQuery = useQuery(
    ["settings"],
    () => togglService.getWorkspaces(togglApiKey),
    {
      enabled: !!togglApiKey,
    }
  );

  return (
    <motion.div
      className="flex flex-col justify-center items-center h-screen"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-500">
                  Toggl Settings
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {" "}
                  Your timer will be saved in the specified workspace and
                  project with the specified tags.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 mt-6 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
