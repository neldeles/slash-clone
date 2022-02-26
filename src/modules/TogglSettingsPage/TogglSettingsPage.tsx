import { motion } from "framer-motion";
import { useFetchUser } from "modules/_common/queries";
import { togglService } from "modules/_common/services/toggl-service";
import { TTogglSettings } from "modules/_common/types/api";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { Link, Redirect } from "react-router-dom";
import { Multiselect } from "./components/Multiselect";

export function TogglSettingsPage() {
  const userQuery = useFetchUser();
  const togglApiKey = userQuery.data?.togglApiKey;
  const userWorkspaceId = userQuery.data?.workspaceId;
  const userProjectId = userQuery.data?.projectId;
  const userTags = userQuery.data?.tags ?? [];
  const queryClient = useQueryClient();

  const [workspaceIdInput, setWorkspaceIdInput] = useState(
    userWorkspaceId ?? ""
  );
  const [projectIdInput, setProjectIdInput] = useState(userProjectId ?? "");
  const [selectedTags, setSelectedTags] = useState(togglApiKey ? userTags : []);

  const workspacesQuery = useQuery(
    ["toggl", "workspaces"],
    () => togglService.getWorkspaces(togglApiKey!),
    {
      enabled: !!togglApiKey,
    }
  );

  const projectsQuery = useQuery(
    ["toggl", "projects"],
    () => togglService.getProjects(togglApiKey!, userWorkspaceId!),
    {
      enabled: !!togglApiKey && !!userWorkspaceId,
    }
  );

  const tagsQuery = useQuery(
    ["toggl", "tags"],
    () => togglService.getTags(togglApiKey!, userWorkspaceId!),
    {
      enabled: !!togglApiKey && !!userWorkspaceId,
    }
  );

  const userMutation = useMutation(
    (data: TTogglSettings) => togglService.updateTogglSettings(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const workspaces = workspacesQuery.data ?? [];
  const projects = projectsQuery.data ?? [];
  const tagsData = tagsQuery.data ?? [];
  const tagsNames = tagsData.map((tag: any) => tag.name);

  const saveSettings = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = {
      userId: userQuery.data!.id,
      workspace_id: parseInt(workspaceIdInput),
      project_id: parseInt(projectIdInput),
      tags: selectedTags,
    };
    userMutation.mutate(data);
  };

  const handleWorkspaceIdInput = (e: ChangeEvent<HTMLSelectElement>) => {
    setWorkspaceIdInput(e.target.value);
    if (e.target.value === "") {
      setProjectIdInput("");
    }
  };

  if (userMutation.isSuccess) {
    return <Redirect to="/" />;
  }

  return (
    <motion.div
      className="flex flex-col justify-center items-center h-screen"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        className="space-y-8 max-w-md divide-y divide-gray-200"
        onSubmit={saveSettings}
      >
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
                      value={workspaceIdInput}
                      onChange={handleWorkspaceIdInput}
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
                      value={projectIdInput}
                      onChange={(e) => setProjectIdInput(e.target.value)}
                      className="block p-4 w-full bg-transparent border-x-0 border-t-0 border-b-2 border-b-black focus:border-b-black focus:ring-0"
                    >
                      {workspaceIdInput === "" ? (
                        <option disabled value="">
                          -- select workspace first --
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

              <div className="mt-6 w-full">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Tags
                  </label>
                  <div className="mt-1">
                    <Multiselect
                      items={tagsNames}
                      isWorkspaceSet={userWorkspaceId !== ""}
                      selectedTags={selectedTags}
                      setSelectedTags={setSelectedTags}
                    />
                  </div>
                </div>
              </div>

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
