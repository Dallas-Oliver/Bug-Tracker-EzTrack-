import React from "react";
import { NavLink, useParams } from "react-router-dom";

function TicketListItem(props) {
  const { projectId, ticketId } = useParams();

  function showTicket() {
    props.passTicketId(props._id);
  }

  return (
    <tr className="ticket-list-item">
      <td>
        {/* <NavLink
          className="ticket-link"
          to={`/home/projects/${projectId}/ticket/${props._id}`}
        >
          {props.name}
        </NavLink> */}
        <p onClick={() => showTicket()}>{props.name}</p>
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
