import { LoginPage } from "modules/LoginPage";
import { SignupPage } from "modules/SignupPage";
import { Route, Switch } from "react-router-dom";
import MediaQuery from "react-responsive";
import { MobileWarning } from "modules/MobileWarning";

export function UnauthenticatedApp() {
  return (
    <MediaQuery maxWidth={991}>
      {(matches: any) =>
        matches ? (
          <MobileWarning />
        ) : (
          <Switch>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        )
      }
    </MediaQuery>
  );
}
