import React, { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";
import User from "../../models/main models/UserModel";

interface ITicketListitemProps {
  name: string;
  openTicket: (_id: string) => void;
  _id: string;
  status: string;
  assignedUser: User;
}

function TicketListItem(props: ITicketListitemProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <tr className="ticket-list-item">
      <td>
        <p
          style={{ color: theme.linkTextColor }}
          className="ticket-link"
          onClick={() => props.openTicket(props._id)}>
          {props.name}
        </p>
      </td>

      <td className={`status ${props.status === "Open" ? "open" : "closed"}`}>
        {props.status}
      </td>
      <td className="assigned-user">{props.assignedUser}</td>
    </tr>
  );
}

export default TicketListItem;
