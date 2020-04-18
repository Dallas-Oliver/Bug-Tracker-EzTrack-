import React from "react";
import TicketListItem from "./TicketListItem";

export default function TicketList(props) {
  return (
    <div className="ticket-list">
      <h4>All Tickets</h4>
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
                  _id={ticket._id}
                  name={ticket.name}
                  status={ticket.status}
                  passTicketId={props.passTicketId}
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
