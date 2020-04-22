import React from "react";

function TicketListItem(props) {
  return (
    <tr className="ticket-list-item">
      <td>
        <p
          className="ticket-link"
          onClick={() => props.passTicketId(props._id)}
        >
          {props.name}
        </p>
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
