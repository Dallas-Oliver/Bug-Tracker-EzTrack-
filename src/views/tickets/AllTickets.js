import React, { useEffect, useState, useContext } from "react";
import TicketList from "./TicketList";
import Ticket from "./Ticket";
import { AuthService as Auth } from "../../auth/AuthService";
import { ThemeContext } from "../../Contexts/ThemeContext";

function AllTickets(props) {
  const [ticketList, setTicketList] = useState([]);
  const [currentTicketId, setTicketId] = useState();
  const [ticketIsVisible, toggleTicket] = useState(false);
  const { theme } = useContext(ThemeContext);

  const openTicket = (_id) => {
    if (_id) {
      setTicketId(_id);
      toggleTicket(true);
    }
  };

  useEffect(() => {
    const getTicketData = async () => {
      const response = await Auth.fetch("/tickets/all");

      if (!response) {
        console.log("no tickets");
        return;
      }
      const tickets = await response.json();
      setTicketList(tickets);
    };
    getTicketData();
  }, []);

  return (
    <div
      style={{
        background: theme.background,
        color: theme.textColor,
      }}
      className="all-tickets"
    >
      <TicketList
        ticketIsVisible={ticketIsVisible}
        ticketList={ticketList}
        openTicket={(userId) => openTicket(userId)}
      />
      {!currentTicketId || ticketIsVisible === false ? null : (
        <Ticket
          hideTicket={() => toggleTicket(false)}
          _id={currentTicketId}
        />
      )}
    </div>
  );
}

export default AllTickets;
