import React, { useEffect, useState } from "react";
import TicketList from "./TicketList";
import Ticket from "./Ticket";
import { AuthService as Auth } from "../../auth/AuthService";

function AllTickets(props) {
  const [ticketList, setTicketList] = useState([]);
  const [currentTicketId, setTicketId] = useState();
  const [ticketIsVisible, toggleTicket] = useState(false);

  async function getTicketData() {
    const response = await Auth.fetch("http://localhost:5000/tickets/all");

    if (!response) {
      console.log("no tickets");
      return;
    }
    const tickets = await response.json();
    console.log(tickets);
    setTicketList(tickets);
  }

  function openTicket(_id) {
    if (_id) {
      setTicketId(_id);
      toggleTicket(true);
    }
  }

  useEffect(() => {
    getTicketData();
  }, []);
  return (
    <div className={`all-tickets ${ticketIsVisible ? "blur" : ""}`}>
      <h3>All Tickets</h3>
      <TicketList
        ticketList={ticketList}
        openTicket={(userId) => openTicket(userId)}
      />
      {!currentTicketId || ticketIsVisible === false ? null : (
        <Ticket
          hideTicket={() => toggleTicket(false)}
          ticketId={currentTicketId}
        />
      )}
    </div>
  );
}

export default AllTickets;
