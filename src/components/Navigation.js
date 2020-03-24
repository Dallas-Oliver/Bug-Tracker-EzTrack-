import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/project-manager">Projects</NavLink>
      <NavLink to="/">Logout</NavLink>
    </div>
  );
}

export default Navigation;
