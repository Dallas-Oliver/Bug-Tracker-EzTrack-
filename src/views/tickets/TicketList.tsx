import React, { useContext, useState } from "react";
import TicketListItem from "./TicketListItem";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { ThemeContext } from "../../Contexts/ThemeContext";
import TicketModel from "../../models/main models/TicketModel";
import GarbageIcon from "../projects/img/garbage-icon";
import Ticket from "../../models/main models/TicketModel";

interface ITicketListProps {
  ticketIsVisible?: boolean;
  ticketList: TicketModel[];
  openTicket: (_id: string) => void;
  projectStatus?: string;
  isRenderedInDashboard: boolean;
  deleteTicketListItems?: (ticketsToDelete: string[]) => void;
}

export default function TicketList(props: ITicketListProps) {
  const { theme } = useContext(ThemeContext);
  const [ticketsToDelete, updateTicketsToDelete] = useState<string[]>([]);

  const addTicketToDeleteArray = (_id: string) => {
    const newTicketArray: string[] = [...ticketsToDelete];
    newTicketArray.push(_id);
    updateTicketsToDelete(newTicketArray);
  };

  const deleteCheckedListItems = () => {
    props.deleteTicketListItems!(ticketsToDelete);
  };

  return (
    <div
      style={{
        background: theme.dashboardTheme.background,
        color: theme.textColor,
      }}
      className={`ticket-list  ${props.ticketIsVisible ? "blur" : ""}`}>
      <h4>All Tickets</h4>
      <SimpleBar>
        {props.ticketList.length >= 1 ? (
          <table>
            <thead>
              <tr>
                <th style={{ marginRight: "5px", padding: "0px" }}>
                  <span
                    onClick={() => deleteCheckedListItems()}
                    style={{ cursor: "pointer" }}>
                    <GarbageIcon />
                  </span>
                </th>
                <th>Ticket Name</th>
                <th>Ticket Status</th>
                <th>Assigned user</th>
              </tr>
            </thead>

            <tbody>
              {props.ticketList.map((ticket) => {
                return (
                  <TicketListItem
                    isRenderedInDashboard={props.isRenderedInDashboard}
                    projectStatus={props.projectStatus}
                    key={ticket._id}
                    _id={ticket._id}
                    name={ticket.name}
                    status={ticket.status}
                    openTicket={props.openTicket}
                    assignedUser={ticket.assignedUser}
                    AddTicketToDeleteArray={(_id) => addTicketToDeleteArray(_id)}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No tickets!</p>
        )}
      </SimpleBar>
    </div>
  );
}
