import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Dashboard from "../Dashboard/Dashboard";
import ProjectManager from "../Projects/ProjectManager";
import AllTickets from "../tickets/AllTickets";
import { Route, Switch, useHistory } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";

function Home(props) {
  const history = useHistory();
  const [formIsVisible, toggleForm] = useState(false);

  function handleLogout() {
    Auth.logout();
    history.replace("/login");
  }

  return (
    <>
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
            render={() => (
              <Dashboard
                toggle={() => toggleForm()}
                formIsVisible={formIsVisible}
              />
            )}
          />
          <Route
            path="/home/projects"
            render={() => <ProjectManager users={props.users} />}
          ></Route>
          <Route path="/home/tickets" render={() => <AllTickets />} />
        </Switch>
      </div>
    </>
  );
}

export default Home;
