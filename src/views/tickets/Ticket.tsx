import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";
import HeaderBar from "../../components/HeaderBar";
import InfoBar from "../../components/InfoBar";
import TicketModel from "../../models/main models/TicketModel";
import { ThemeContext } from "../../Contexts/ThemeContext";

interface ITicketProps {
  _id: string;
  handleTicketStatusChange?: (ticketId: string, status: string) => void;
  hideTicket: () => void;
}

export default function Ticket(props: ITicketProps) {
  const { projectId } = useParams();
  const [ticket, setTicketInfo] = useState<TicketModel>();
  const { theme } = useContext(ThemeContext);

  const ticketAPICall = async (url: string) => {
    const response = await Auth.fetch(url);

    if (!response) {
      console.log("no ticket info");
      return;
    }
    const ticket = await response.json();

    setTicketInfo(ticket);
    return ticket;
  };

  useEffect(() => {
    //request ticket information
    ticketAPICall(`/projects/${projectId}/ticket/${props._id}`);
  }, []);

  if (!ticket) {
    return null;
  }

  const changeStatus = async () => {
    //change ticket status

    const updatedTicket = await ticketAPICall(
      `/tickets/${ticket._id}/change-status`
    );

    setTicketInfo(updatedTicket);

    const newStatus = updatedTicket.status;
    if (props.handleTicketStatusChange) {
      props.handleTicketStatusChange(ticket._id, newStatus);
    }
  };

  return (
    <div
      style={{
        background: theme.dashboardTheme.background,
        color: theme.textColor,
      }}
      className="ticket">
      <HeaderBar
        projectOrTicketicketVisible={true}
        title={ticket.name}
        buttonText="< back"
        toggle={props.hideTicket}
      />
      <InfoBar
        barType="ticket"
        createdBy={ticket.createdBy}
        dateCreated={ticket.dateCreated}
        status={ticket.status}
        description={ticket.description}
        priority={ticket.priority}
        assignedTo={ticket.assignedUser}
        changeStatus={() => changeStatus()}
      />
    </div>
  );
}
