import React, { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";

interface ITicketListitemProps {
  name: string;
  openTicket: (_id: string) => void;
  _id: string;
  status: string;
  assignedUser: string;
  projectStatus?: string;
  isRenderedInDashboard: boolean;
  AddTicketToDeleteArray?: (_id: string) => void;
}

function TicketListItem(props: ITicketListitemProps) {
  const { theme } = useContext(ThemeContext);

  const addTicketToDeleteArray = (_id: string) => {
    if (!_id) {
      return null;
    }

    props.AddTicketToDeleteArray!(_id);
  };

  return (
    <tr className="ticket-list-item">
      {props.isRenderedInDashboard ? null : (
        <td>
          <input
            onChange={() => addTicketToDeleteArray(props._id)}
            style={{ margin: "0px 5px" }}
            type="checkbox"></input>
        </td>
      )}
      <td style={{ padding: "0px" }}>
        <p
          style={
            props.projectStatus === "Closed" || props.status === "Closed"
              ? { color: "gray" }
              : { color: theme.linkTextColor }
          }
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
