import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

export default function Project(props) {
  const { url } = useRouteMatch();

  return (
    <tr>
      <td>
        {" "}
        <NavLink to={`${url}/${props.id}`}>{props.name}</NavLink>
      </td>

      <td>{props.description}</td>
      <td>{props.dateCreated}</td>
    </tr>
  );
}
