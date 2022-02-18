import { useTogglSettings } from "AuthenticatedApp";
import { motion } from "framer-motion";
import { useFetchUser } from "modules/_common/queries";
import { togglService } from "modules/_common/services/toggl-service";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export function TogglSettingsPage() {
  const { workspaceId, setWorkspaceId, projectId, setProjectId } =
    useTogglSettings();

  const userQuery = useFetchUser();
  const togglApiKey = userQuery.data?.toggl_api_key;

  const workspacesQuery = useQuery(
    ["toggl", "workspaces"],
    () => togglService.getWorkspaces(togglApiKey),
    {
      enabled: !!togglApiKey,
    }
  );

  const projectsQuery = useQuery(
    ["toggl", "projects"],
    () => togglService.getProjects(togglApiKey, workspaceId),
    {
      enabled: !!togglApiKey && workspaceId !== "",
    }
  );

  const workspaces = workspacesQuery.data ?? [];
  const projects = projectsQuery.data ?? [];

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
                <h3 className="text-lg font-medium leading-6 text-black">
                  Toggl Settings
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {" "}
                  Your timer will be saved with the specified settings.
                </p>
              </div>
              <div className="mt-6 w-full">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Workspace
                  </label>
                  <div className="mt-1">
                    <select
                      id="workspace"
                      name="workspace"
                      value={workspaceId}
                      onChange={(e) => setWorkspaceId(e.target.value)}
                      className="block p-4 w-full bg-transparent border-x-0 border-t-0 border-b-2 border-b-black focus:border-b-black focus:ring-0"
                    >
                      <option value="">-- select an option --</option>
                      {workspaces.map((workspace: any) => (
                        <option key={workspace.id} value={workspace.id}>
                          {workspace.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 w-full">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Project
                  </label>
                  <div className="mt-1">
                    <select
                      id="project"
                      name="project"
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                      className="block p-4 w-full bg-transparent border-x-0 border-t-0 border-b-2 border-b-black focus:border-b-black focus:ring-0"
                    >
                      {workspaceId === "" ? (
                        <option disabled value="">
                          -- no workspace selected --
                        </option>
                      ) : (
                        <option value="">-- select an option --</option>
                      )}
                      {projects.map((project: any) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* <div className="mt-6 w-full">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Workspace
                  </label>
                  <div className="mt-1">
                    <select
                      id="workspace"
                      name="workspace"
                      value={workspaceId}
                      onChange={(e) => setWorkspaceId(e.target.value)}
                      className="block p-4 w-full bg-transparent border-x-0 border-t-0 border-b-2 border-b-black focus:border-b-black focus:ring-0"
                    >
                      <option value="">-- select an option --</option>
                      {workspaces.map((workspace: any) => (
                        <option key={workspace.id} value={workspace.id}>
                          {workspace.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div> */}

              <Link to="/">
                <button
                  className="items-center py-3 px-6 mt-6 w-full text-base font-medium tracking-wide text-black bg-transparent hover:bg-gray-200 rounded-md border-2 border-black"
                  type="button"
                >
                  Cancel
                </button>
              </Link>

              <button
                className="items-center py-3 px-6 mt-6 w-full text-base font-medium tracking-wide text-white bg-indigo-200 hover:bg-indigo-100 rounded-md border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 shadow-sm"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
