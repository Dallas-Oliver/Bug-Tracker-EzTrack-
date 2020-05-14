import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Dashboard from "../Dashboard/Dashboard";
import ProjectManager from "../Projects/ProjectManager";
import AllTickets from "../tickets/AllTickets";
import { Tooltip } from "react-tippy";
import { Route, Switch, useHistory } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";
import { GithubPicker } from "react-color";

function Home(props) {
  const history = useHistory();
  const [formIsVisible, toggleForm] = useState(false);
  const [sideBarColor, setSideBarColor] = useState("");
  const swatchColors = [
    "#518763",
    "#8A8A4B",
    "#B0834C",
    "#B34C42",
    "#94358C",
    "#455194",
    "#4D7D94",
  ];

  async function getUserPreferences() {
    const userId = await Auth.getUserData()._id;
    const userPreferences = await Auth.getUserPreferences(userId);

    if (!userPreferences) {
      console.log("no preferences found");
      return;
    }
    console.log(userPreferences);

    if (userPreferences.sideBarColor === "") {
      setSideBarColor("#fefefe");
      return;
    }

    setSideBarColor(userPreferences.sideBarColor);
    return;
  }

  useEffect(() => {
    getUserPreferences();
  }, []);

  function handleLogout() {
    Auth.logout();
    history.replace("/login");
  }

  async function changeSideBarColor(color) {
    const user = await Auth.getUserData();

    const response = await Auth.fetch(
      `http://localhost:5000/users/preferences/sidebarColor`,
      {
        method: "POST",
        body: JSON.stringify({
          color: color.hex,
          userId: user._id,
        }),
      }
    );
    // if (!response) {
    //   console.log("color not saved!");
    //   return;
    // }
    const json = await response.json();
    console.log(json);
    setSideBarColor(color.hex);
  }

  return (
    <>
      <div className="Home">
        <section style={{ background: sideBarColor }} className="side-bar">
          <div className="personal">
            <img
              className="avatar"
              src={require("./avatar.jpg")}
              alt="ff"
            ></img>
          </div>
          <Navigation className="nav" />

          <section className="side-bar__footer">
            <h3 className="logout-link" onClick={() => handleLogout()}>
              Logout
            </h3>

            <Tooltip
              html={
                <GithubPicker
                  onChangeComplete={(color) => changeSideBarColor(color)}
                  color={sideBarColor}
                  colors={swatchColors}
                />
              }
              interactive
              trigger="click"
            >
              <div className="color-picker-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 48 48"
                >
                  <path d="M24 6C14.06 6 6 14.06 6 24s8.06 18 18 18c1.66 0 3-1.34 3-3 0-.78-.29-1.48-.78-2.01-.47-.53-.75-1.22-.75-1.99 0-1.66 1.34-3 3-3H32c5.52 0 10-4.48 10-10 0-8.84-8.06-16-18-16zM13 24c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6-8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm10 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                </svg>
              </div>
            </Tooltip>
          </section>
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
