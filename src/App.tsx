import { AnimatePresence } from "framer-motion";
import { Main } from "modules/main/components/Main";
import { Timer } from "modules/timer/components/Timer";
import { Switch, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        <Route path="/timer">
          <Timer />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

export default App;
