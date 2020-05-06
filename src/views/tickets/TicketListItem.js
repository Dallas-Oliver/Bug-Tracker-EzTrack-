import React from "react";

function TicketListItem(props) {
  return (
    <tr className="ticket-list-item">
      <td>
        <p
          className="ticket-link"
          onClick={() => props.openTicket(props._id)}
        >
          {props.name}
        </p>
      </td>

      <td
        className={`status ${props.status === "Open" ? "open" : "closed"}`}
      >
        {props.status}
      </td>
      <td className="assigned-user">{props.assignedUser}</td>
    </tr>
  );
}

export default TicketListItem;
