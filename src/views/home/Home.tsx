import React, { useState, useEffect, useMemo } from "react";
import Dashboard from "../Dashboard/Dashboard";
import ProjectManager from "../projects/ProjectManager";
import AllTickets from "../tickets/AllTickets";
import { Route, Switch, useHistory } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "../../Contexts/ThemeContext";
import User from "../../models/main models/UserModel";

function Home() {
  const history = useHistory();
  const [users, setUserList] = useState<User[]>([]);

  const getUserList = async () => {
    const response = await Auth.fetch("/users/all-users");
    if (!response) {
      console.log("no users");
    }
    const userList = await response.json();
    setUserList(userList);
  };

  useEffect(() => {
    if (users.length <= 0) {
      getUserList();
    }
  });

  const handleLogout = () => {
    Auth.logout();
    history.replace("/login");
  };

  return (
    <ThemeProvider>
      <div className="Home">
        <Sidebar
          //still need to implement this feature
          // handleFileSelect={() => handleFileSelect()}
          // avatarImage={avatarImage}
          handleLogout={() => handleLogout()}
        />
        <Switch>
          <Route exact path="/home/dashboard">
            <Dashboard />
          </Route>
          <Route path="/home/projects" render={() => <ProjectManager users={users} />} />
          <Route path="/home/tickets" render={() => <AllTickets />} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default Home;
