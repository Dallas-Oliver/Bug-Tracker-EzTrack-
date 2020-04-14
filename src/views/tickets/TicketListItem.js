import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

function TicketListItem(props) {
  const { url } = useRouteMatch();

  return (
    <tr className="ticket-list-item">
      <td>
        {" "}
        <NavLink className="ticket-link" to={`${url}/${props.id}`}>
          {props.name}
        </NavLink>
      </td>

      <td
        className={`status ${props.status === "Open" ? "open" : "closed"}`}
      >
        {props.status}
      </td>
    </tr>
  );
}

export default TicketListItem;
