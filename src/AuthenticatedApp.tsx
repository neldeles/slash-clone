import { AnimatePresence } from "framer-motion";
import { BreakTimer } from "modules/BreakTimer";
import { Main } from "modules/Main";
import { SuccessPage } from "modules/SuccessPage";
import { TogglSettingsPage } from "modules/TogglSettingsPage";
import { WorkTimer } from "modules/WorkTimer";
import { LastTaskPage } from "modules/WorkTimer/components/LastTaskPage";
import { Switch, Route, useLocation } from "react-router-dom";

export function AuthenticatedApp() {
  const location = useLocation();

  return (
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
  );
}
