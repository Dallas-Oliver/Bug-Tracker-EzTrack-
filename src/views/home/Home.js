import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Dashboard from "../Dashboard/Dashboard";
import ProjectManager from "../Projects/ProjectManager";
import AllTickets from "../tickets/AllTickets";
import { Tooltip } from "react-tippy";
import { Route, Switch, useHistory } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";
import { GithubPicker } from "react-color";
import { Utils } from "../../utils";
import Sidebar from "./Sidebar";

function Home(props) {
  const history = useHistory();
  const [formIsVisible, toggleForm] = useState(false);
  const [sidebarColor, setSidebarColor] = useState("");
  const [avatarImage, setAvatarImage] = useState();

  async function getUserPreferences() {
    const userPreferences = await Utils.getUserPreferences();

    if (!userPreferences) {
      console.log("no preferences found");
      return;
    }

    if (userPreferences.sidebarColor === "") {
      setSidebarColor("#4D7D94");
      return;
    }

    setSidebarColor(userPreferences.sidebarColor);
    return;
  }
  useEffect(() => {
    getUserPreferences();
  }, []);

  function handleLogout() {
    Auth.logout();
    history.replace("/login");
  }

  async function changeSidebarColor(color) {
    const hexValue = color.hex;

    const updatedPreferences = await Utils.updateSidebarColorPreference(
      hexValue
    );

    if (!updatedPreferences) {
      console.log("color not saved!");
      return;
    }

    setSidebarColor(updatedPreferences.sidebarColor);
  }

  async function handleFileSelect() {
    let fileSelector = Utils.buildFileSelector();
    fileSelector.click();

    const response = await Auth.fetch("http://localhost:5000/users/");
  }
  return (
    <div className="Home">
      <Sidebar
        sidebarColor={sidebarColor}
        handleFileSelect={() => handleFileSelect()}
        avatarImage={avatarImage}
        handleLogout={() => handleLogout()}
        changeSideBarColor={(color) => changeSidebarColor(color)}
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
