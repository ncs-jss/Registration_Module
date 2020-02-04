import React, { useState, useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import SearchId from "./Components/SearchId";
import AdminDashboard from "./Components/AdminDashboard";
import PrivateRoute from "./Components/PrivateRoute";
import CtcDashboard from "./Components/CtcDashboard";
import SecurityDashboard from "./Components/SecurityDashboard";

const App = () => {
  const [userState, setuserState] = useState(0);
  const [role, setrole] = useState("");

  useEffect(
    () => {
      if (localStorage.getItem("token") && localStorage.getItem("role")) {
        setuserState(1);
        setrole(localStorage.getItem("role"));
      }
    },
    [userState, role]
  );

  return (
    <div className="App">
      <Router>
        <Navbar state={userState} setState={setuserState} />
        <div className="container mt-5">
          <Switch>
            <Route path="/" exact component={Register} />
            <Route
              path="/login"
              exact
              render={props =>
                <Login state={userState} setState={setuserState} {...props} />}
            />
            <Route path="/search" exact component={SearchId} />
            <PrivateRoute
              path="/dashboard"
              component={
                role === "admin"
                  ? AdminDashboard
                  : role === "user" ? CtcDashboard : SecurityDashboard
              }
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
