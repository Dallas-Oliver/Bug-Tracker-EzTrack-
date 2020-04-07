import React from "react";
import { NavLink } from "react-router-dom";

function Navigation(props) {
  return (
    <div className={props.className}>
      <NavLink
        activeClassName="selected"
        className="dashboard-link"
        to="/home/dashboard/"
      >
        Dashboard
      </NavLink>
      <NavLink
        activeClassName="selected"
        className="projects-link"
        to="/home/project-manager"
      >
        Projects
      </NavLink>
    </div>
  );
}

export default Navigation;
