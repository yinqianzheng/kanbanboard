import React from "react";
import { Switch } from "react-router-dom";
import LoginForm from "./session/loginFormContainer";
import Home from "./homeContainer"
import { AuthRoute, ProtectedRoute } from "../utils/route";
import "./main.css"

const App = () => (
  <div className="app-main">
    <Switch>
      <ProtectedRoute exact path="/home" component={Home} />
      <AuthRoute path="/" component={LoginForm} />
    </Switch>
  </div>
);

export default App;
