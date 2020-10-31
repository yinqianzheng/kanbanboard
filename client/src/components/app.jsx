import React from "react";
import { Switch } from "react-router-dom";
import Kanbanboard from "./kanbanboard/boardContainer";
import LoginForm from "./session/loginFormContainer";
import { AuthRoute, ProtectedRoute } from "../utils/route";

const App = () => (
  <div className="app-main">
    <Switch>
      <AuthRoute exact path="/" component={LoginForm} />
      <ProtectedRoute exact path="/kanbanboard" component={Kanbanboard} />
    </Switch>
  </div>
);

export default App;
