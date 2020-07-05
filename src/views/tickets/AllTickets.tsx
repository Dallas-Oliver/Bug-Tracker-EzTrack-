import React, { useEffect, useState, useContext } from "react";
import TicketList from "./TicketList";
import Ticket from "./Ticket";
import { AuthService as Auth } from "../../auth/AuthService";
import { ThemeContext } from "../../Contexts/ThemeContext";
import TicketModel from "../../models/main models/TicketModel";
import produce from "immer";

function AllTickets() {
  const [ticketList, setTicketList] = useState<TicketModel[]>([]);
  const [currentTicketId, setTicketId] = useState<string>();
  const [ticketIsVisible, toggleTicket] = useState(false);
  const { theme } = useContext(ThemeContext);

  const openTicket = (_id: string) => {
    if (_id) {
      setTicketId(_id);
      toggleTicket(true);
    }
  };

  useEffect(() => {
    let mounted = true;

    const getTicketData = async () => {
      const response = await Auth.fetch("/tickets/all");

      if (!response) {
        console.log("no tickets");
        return;
      }
      const tickets = await response.json();
      if (mounted) {
        setTicketList(tickets);
      }
    };

    getTicketData();

    return function unMount() {
      mounted = false;
    };
  }, []);

  const changeTicketStatus = (ticketId: string, newStatus: string) => {
    const newTicketList = produce(ticketList, (ticketListCopy) => {
      const ticketIndex = ticketListCopy
        .map((ticket: TicketModel) => ticket._id)
        .indexOf(ticketId);
      ticketListCopy[ticketIndex].status = newStatus;
    });

    setTicketList(newTicketList);
  };

  return (
    <div
      style={{
        background: theme.background,
        color: theme.textColor,
      }}
      className="all-tickets">
      <TicketList
        projectStatus="Open"
        ticketIsVisible={ticketIsVisible}
        ticketList={ticketList}
        openTicket={(_id) => openTicket(_id)}
        isRenderedOnDashboard={true}
      />
      {!currentTicketId || ticketIsVisible === false ? null : (
        <Ticket
          hideTicket={() => toggleTicket(false)}
          _id={currentTicketId}
          handleTicketStatusChange={(ticketId: string, newStatus: string) =>
            changeTicketStatus(ticketId, newStatus)
          }
        />
      )}
    </div>
  );
}

export default AllTickets;
