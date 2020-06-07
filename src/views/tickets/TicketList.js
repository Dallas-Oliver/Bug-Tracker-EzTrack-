import React, { useContext } from "react";
import TicketListItem from "./TicketListItem";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { ThemeContext } from "../../Contexts/ThemeContext";

export default function TicketList(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      style={{
        background: theme.dashboardTheme.background,
        color: theme.textColor,
      }}
      className={`ticket-list  ${props.ticketIsVisible ? "blur" : ""}`}
    >
      <h4>All Tickets</h4>
      <SimpleBar>
        {props.ticketList.length >= 1 ? (
          <table>
            <thead>
              <tr>
                <th>Ticket Name</th>
                <th>Ticket Status</th>
                <th>Assigned user</th>
              </tr>
            </thead>

            <tbody>
              {props.ticketList.map((ticket) => {
                return (
                  <TicketListItem
                    key={ticket._id}
                    _id={ticket._id}
                    name={ticket.name}
                    status={ticket.status}
                    openTicket={props.openTicket}
                    assignedUser={ticket.assignedUser}
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
