import React, { useState, useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import SearchId from "./Components/SearchId";
import AdminDashboard from "./Components/AdminDashboard";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  const [userState, setuserState] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setuserState(1);
    }
  }, []);

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
            <PrivateRoute path="/admin" exact component={AdminDashboard} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
