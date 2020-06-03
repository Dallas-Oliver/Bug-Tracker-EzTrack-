import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";
import HeaderBar from "../../components/HeaderBar";
import InfoBar from "../../components/InfoBar";

export default function Ticket(props) {
  const { projectId } = useParams();
  const [ticketInfo, setTicketInfo] = useState();

  const ticketAPICall = async (url) => {
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
  }, [projectId, props._id]);

  if (!ticketInfo) {
    return null;
  }

  const changeStatus = async (_id) => {
    //change ticket status
    const response = await ticketAPICall(
      `/tickets/${ticketInfo._id}/change-status`
    );

    const newStatus = response.status;

    props.handleTicketStatusChange(_id, newStatus);
  };

  return (
    <div className="ticket">
      <HeaderBar
        title={ticketInfo.name}
        buttonText="< back"
        toggle={props.hideTicket}
      />
      <InfoBar
        barType="ticket"
        createdBy={ticketInfo.createdBy}
        dateCreated={ticketInfo.dateCreated}
        status={ticketInfo.status}
        description={ticketInfo.ticketDescription}
        priority={ticketInfo.priority}
        assignedTo={ticketInfo.assignedUser}
        changeStatus={() => changeStatus(ticketInfo._id)}
      />
    </div>
  );
}
