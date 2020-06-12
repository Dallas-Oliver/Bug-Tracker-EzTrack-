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
  const [ticketInfo, setTicketInfo] = useState<TicketModel>();
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

  if (!ticketInfo) {
    return null;
  }

  const changeStatus = async (ticketId: string) => {
    //change ticket status
    const ticket = await ticketAPICall(`/tickets/${ticketId}/change-status`);

    setTicketInfo(ticket);

    const newStatus = ticket.status;
    if (props.handleTicketStatusChange) {
      props.handleTicketStatusChange(ticketId, newStatus);
    }
  };

  console.log(ticketInfo);

  return (
    <div
      style={{
        background: theme.dashboardTheme.background,
        color: theme.textColor,
      }}
      className="ticket">
      <HeaderBar
        title={ticketInfo.name}
        buttonText="< back"
        toggle={props.hideTicket}
      />
      <InfoBar
        barType="ticket"
        createdBy={ticketInfo.createdBy.name}
        dateCreated={ticketInfo.dateCreated}
        status={ticketInfo.status}
        description={ticketInfo.description}
        priority={ticketInfo.priority}
        assignedTo={ticketInfo.assignedUser}
        changeStatus={() => changeStatus(ticketInfo._id)}
      />
    </div>
  );
}
