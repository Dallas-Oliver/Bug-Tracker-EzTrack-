import React, { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";
import CheckBox from "../../components/CheckBox";

interface ITicketListitemProps {
  name: string;
  openTicket: (_id: string) => void;
  _id: string;
  status: string;
  assignedUser: string;
  projectStatus?: string;
  isRenderedOnDashboard: boolean;
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
      {props.isRenderedOnDashboard ? null : (
        <CheckBox addItemToDeleteArray={() => addTicketToDeleteArray(props._id)} />
      )}
      <td style={{ padding: "0px" }}>
        <p
          style={
            props.projectStatus === "Closed" || props.status === "Closed"
              ? { color: "gray", margin: "0px" }
              : { color: theme.linkTextColor, margin: "0px" }
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
