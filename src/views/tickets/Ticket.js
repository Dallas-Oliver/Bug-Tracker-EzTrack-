import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";
import HeaderBar from "../../components/HeaderBar";
import InfoBar from "../../components/InfoBar";

export default function Ticket(props) {
  const { projectId } = useParams();
  const [ticketInfo, setTicketInfo] = useState();

  useEffect(() => {
    ticketAPICall(
      `http://localhost:5000/projects/${projectId}/ticket/${props._id}`
    );
  }, [projectId, props._id]);

  if (!ticketInfo) {
    return null;
  }

  const ticketAPICall = async (url) => {
    const response = await Auth.fetch(url);

    if (!response) {
      console.log("no ticket info");
      return;
    }
    const ticket = await response.json();
    setTicketInfo(ticket);
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
        changeStatus={() =>
          ticketAPICall(
            `http://localhost:5000/tickets/${ticketInfo._id}/change-status`
          )
        }
      />
    </div>
  );
}
