import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Dashboard from "../Dashboard/Dashboard";
import ProjectManager from "../Projects/ProjectManager";
import { Route, Switch, useHistory } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";

function Home() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState();
  const [dataLoaded, handleDataLoaded] = useState(false);

  async function getUserData() {
    const jsonData = await Auth.fetch(
      "http://localhost:5000/users/get-user-info"
    );

    if (jsonData) {
      setUserInfo(jsonData);
      handleDataLoaded(true);
    }
  }

  useEffect(() => {
    if (!dataLoaded) {
      getUserData();
    }
  });

  function handleLogout() {
    Auth.logout();
    history.replace("/login");
  }

  return (
    <React.Fragment>
      {dataLoaded ? (
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
              render={() => <Dashboard userInfo={userInfo} />}
            />
            <Route
              path="/home/projects"
              render={() => <ProjectManager />}
            ></Route>
          </Switch>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </React.Fragment>
  );
}

export default Home;
