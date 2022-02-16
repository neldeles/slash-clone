import { LoginPage } from "modules/LoginPage";
import { SignupPage } from "modules/SignupPage";
import { Route, Switch } from "react-router-dom";

export function UnauthenticatedApp() {
  return (
    <Switch>
      <Route path="/signup">
        <SignupPage />
      </Route>
      <Route path="/">
        <LoginPage />
      </Route>
    </Switch>
  );
}
