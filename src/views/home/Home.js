import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Dashboard from "../Dashboard/Dashboard";
import ProjectManager from "../Projects/ProjectManager";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import AuthService from "../../auth/AuthService";

function Home() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState();
  const [dataLoaded, setDataBoolean] = useState(false);
  const Auth = new AuthService();

  async function getUserData() {
    if (localStorage.getItem("id_token")) {
      let token = localStorage.getItem("id_token");

      fetch("http://localhost:5000/users/get-user-info", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `bearer ${token}`
        },
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          const decodedUserInfo = json;
          return decodedUserInfo;
        })
        .then(decodedUserInfo => {
          setUserInfo(decodedUserInfo.userInfo);
          setDataBoolean(true);
        });
    }
    return dataLoaded;
  }
  useEffect(() => {
    if (!dataLoaded) {
      getUserData();
    }
  }, []);

  function handleLogout() {
    Auth.logout();
    history.replace("/login");
  }

  return (
    <BrowserRouter>
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
          <section className="welcome-screen"></section>
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
      ) : (
        <h3>Loading...</h3>
      )}
    </BrowserRouter>
  );
}

export default Home;
