import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Dashboard from "../Dashboard/Dashboard";
import ProjectManager from "../Projects/ProjectManager";
import { Route, Switch, useHistory } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";

function Home(props) {
  const history = useHistory();

  function handleLogout() {
    Auth.logout();
    history.replace("/login");
  }

  return (
    <React.Fragment>
      <div className="Home">
        <section className="side-bar">
          <div className="personal">
            <img
              className="avatar"
              src={require("./avatar.jpg")}
              alt="ff"
            ></img>
          </div>
          <Navigation className="nav" />
          <h3 className="logout-link" onClick={() => handleLogout()}>
            Logout
          </h3>
        </section>
        <Switch>
          <Route
            exact
            path="/home/dashboard"
            render={() => <Dashboard currentUser={props.currentUser} />}
          />
          <Route
            path="/home/projects"
            render={() => <ProjectManager users={props.users} />}
          ></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Home;
