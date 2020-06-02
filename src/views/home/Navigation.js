import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../Contexts/ThemeContext";

function Navigation(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{ background: theme.background, color: theme.textColor }}
      className={props.className}
    >
      <NavLink
        activeClassName="selected"
        className="dashboard-link"
        to="/home/dashboard"
      >
        Dashboard
      </NavLink>
      <NavLink
        activeClassName="selected"
        className="projects-link"
        to="/home/projects"
        exact
      >
        Projects
      </NavLink>
      <NavLink
        activeClassName="selected"
        className="tickets-link"
        to="/home/tickets"
        exact
      >
        Tickets
      </NavLink>
    </div>
  );
}

export default Navigation;
