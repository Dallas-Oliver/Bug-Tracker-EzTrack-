import React, { useEffect, useState } from "react";
import TicketList from "./TicketList";
import { AuthService as Auth } from "../../auth/AuthService";

function AllTickets(props) {
  const [ticketList, setTicketList] = useState([]);

  async function getTicketData() {
    const response = await Auth.fetch("http://localhost:5000/tickets/all");

    if (!response) {
      console.log("no tickets");
      return;
    }

    const tickets = await response.json();
    setTicketList(tickets);
  }

  useEffect(() => {
    getTicketData();
  }, []);
  return (
    <div className="all-tickets">
      <h3>All Tickets</h3>
      <TicketList ticketList={ticketList} openTicket={props.openTicket} />
    </div>
  );
}

export default AllTickets;
