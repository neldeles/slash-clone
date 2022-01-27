import { AnimatePresence } from "framer-motion";
import { BreakTimer } from "modules/BreakTimer";
import { Main } from "modules/Main";
import { SuccessPage } from "modules/SuccessPage";
import { WorkTimer } from "modules/WorkTimer";
import { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  useEffect(function setBackgroundColor() {
    document.body.classList.add("bg-alabaster");

    return () => {
      document.body.classList.remove("bg-alabaster");
    };
  }, []);
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        <Route path="/timer">
          <WorkTimer />
        </Route>
        <Route path="/break">
          <BreakTimer />
        </Route>
        <Route path="/success">
          <SuccessPage />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

export default App;
