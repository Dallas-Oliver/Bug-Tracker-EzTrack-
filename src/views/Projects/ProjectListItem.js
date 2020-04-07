import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

export default function Project(props) {
  const { url } = useRouteMatch();

  return (
    <tr className="project-list-item">
      <td>
        {" "}
        <NavLink className="project-link" to={`${url}/${props.id}`}>
          {props.name}
        </NavLink>
      </td>

      <td
        className={`status ${props.status === "Open" ? "open" : "closed"}`}
      >
        {props.status}
      </td>
      <td>{props.numberOfTickets}</td>
    </tr>
  );
}
