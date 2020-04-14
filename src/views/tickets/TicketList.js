import React from "react";
import TicketListItem from "./TicketListItem";

export default function TicketList(props) {
  return (
    <div className="ticket-list">
      {props.ticketList.length >= 1 ? (
        <table>
          <thead>
            <tr>
              <th>Ticket Name</th>
              <th>Ticket Status</th>
            </tr>
          </thead>
          <tbody>
            {props.ticketList.map((ticket) => {
              return (
                <TicketListItem
                  key={ticket._id}
                  id={ticket._id}
                  name={ticket.name}
                  status={ticket.status}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No tickets in this project!</p>
      )}
    </div>
  );
}
