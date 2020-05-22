import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import ProjectManager from "../Projects/ProjectManager";
import AllTickets from "../tickets/AllTickets";
import { Route, Switch, useHistory } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";

import Sidebar from "./Sidebar";

function Home(props) {
  const history = useHistory();
  const [formIsVisible, toggleForm] = useState(false);

  function handleLogout() {
    Auth.logout();
    history.replace("/login");
  }

  return (
    <div className="Home">
      <Sidebar
        // handleFileSelect={() => handleFileSelect()}
        // avatarImage={avatarImage}
        handleLogout={() => handleLogout()}
      />
      <Switch>
        <Route exact path="/home/dashboard">
          <Dashboard
            toggle={() => toggleForm()}
            formIsVisible={formIsVisible}
          />
        </Route>
        <Route path="/home/projects">
          <ProjectManager users={props.users} />
        </Route>
        <Route path="/home/tickets" render={() => <AllTickets />} />
      </Switch>
    </div>
  );
}

export default Home;
