import React, { useState, useEffect } from "react";

function TicketList(props) {
  const [tickets, setTicketArray] = useState();

  useEffect(() => {
    let tickets = props.tickets;
    let ticketArray = [
      ...tickets.openTickets,
      ...tickets.closedTickets,
      ...tickets.overdueTickets,
    ];
    console.log(props.tickets);
    setTicketArray(ticketArray);
  }, []);

  return (
    <div className="dash-card ticket-list">
      <h2>Tickets</h2>
      <button>View All</button>
      <table className="list">
        <thead>
          <tr className="table-header">
            <th>Name</th>
            <th>Project</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {/* {tickets.map((ticket) => {
            return (
              <tr className="table-row" key={ticket.id}>
                <td>{ticket.name}</td>
                <td>{ticket.parentProject}</td>
                <td>{ticket.dueDate}</td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
}

export default TicketList;
