import React, { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";

function TicketListItem(props) {
  const { theme } = useContext(ThemeContext);
  console.log(props);
  return (
    <tr className="ticket-list-item">
      <td>
        <p
          style={{ color: theme.linkTextColor }}
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
