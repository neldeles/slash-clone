import { AnimatePresence } from "framer-motion";
import { BreakTimer } from "modules/BreakTimer";
import { Main } from "modules/Main";
import { SuccessPage } from "modules/SuccessPage";
import { TogglSettingsPage } from "modules/TogglSettingsPage";
import { WorkTimer } from "modules/WorkTimer";
import { LastTaskPage } from "modules/WorkTimer/components/LastTaskPage";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Switch, Route, useLocation } from "react-router-dom";

type TTogglContext = {
  workspaceId: string;
  setWorkspaceId: Dispatch<SetStateAction<string>>;
};

const TogglSettingsContext = createContext<TTogglContext | undefined>(
  undefined
);
const TogglProvider = TogglSettingsContext.Provider;
TogglSettingsContext.displayName = "TogglSettingsContext";

export function useTogglSettings() {
  const context = useContext(TogglSettingsContext);
  if (context === undefined) {
    throw new Error(
      "🚨 useTogglSettings must be used within a TogglSettingsContextProvider"
    );
  }
  return context;
}

export function AuthenticatedApp() {
  const [workspaceId, setWorkspaceId] = useState("");
  const location = useLocation();
  const value = {
    workspaceId,
    setWorkspaceId,
  };

  return (
    <TogglProvider value={value}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <Route path="/timer/work">
            <WorkTimer />
          </Route>
          <Route path="/timer/break">
            <BreakTimer />
          </Route>
          <Route path="/success">
            <SuccessPage />
          </Route>
          <Route path="/congrats">
            <LastTaskPage />
          </Route>
          <Route path="/toggl-settings">
            <TogglSettingsPage />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </AnimatePresence>
    </TogglProvider>
  );
}
