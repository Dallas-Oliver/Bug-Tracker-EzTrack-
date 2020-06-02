import React, { useState, useMemo } from "react";
import Dashboard from "../Dashboard/Dashboard";
import ProjectManager from "../projects/ProjectManager";
import AllTickets from "../tickets/AllTickets";
import { Route, Switch, useHistory } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";

import Sidebar from "./Sidebar";
import { ThemeProvider } from "../../Contexts/ThemeContext";

function Home(props) {
  const history = useHistory();
  const [theme, setTheme] = useState();
  const [formIsVisible, toggleForm] = useState(false);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  const handleLogout = () => {
    Auth.logout();
    history.replace("/login");
  };

  return (
    <ThemeProvider>
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
          <Route
            path="/home/projects"
            render={() => <ProjectManager users={props.users} />}
          />
          <Route path="/home/tickets" render={() => <AllTickets />} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default Home;
