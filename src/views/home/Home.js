import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Dashboard from "../Dashboard";
import ProjectManager from "../ProjectManager";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

function Home(props) {
  const [userInfo, setUserInfo] = useState({});

  const getUserData = async () => {
    await fetch(`/users/get-user/:${props.userName}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setUserInfo(json);
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <BrowserRouter>
      <div className="Home">
        <section className="side-bar">
          <div className="personal">
            <img
              className="avatar"
              src={require("./avatar.jpg")}
              alt="ff"
            ></img>
            <p className="side-bar-name">{props.userName}</p>
          </div>
          <Navigation className="nav" />
          <NavLink className="logout-link" to="/">
            Logout
          </NavLink>
        </section>
        <Switch>
          <Route
            exact
            path="/home/dashboard"
            render={() => <Dashboard userInfo={userInfo} />}
          />
          <Route
            path="/home/project-manager"
            render={() => <ProjectManager />}
          ></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Home;
