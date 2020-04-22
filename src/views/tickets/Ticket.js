import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";
import HeaderBar from "../../components/HeaderBar";
import InfoBar from "../../components/InfoBar";

export default function Ticket(props) {
  const { projectId } = useParams();
  const [ticketInfo, setTicketInfo] = useState();

  useEffect(() => {
    getTicketData();
  }, []);

  if (!ticketInfo) {
    return null;
  }

  async function getTicketData() {
    const ticket = await Auth.fetch(
      `http://localhost:5000/projects/${projectId}/ticket/${props.ticketId}`
    );

    if (ticket) {
      console.log(ticket);
      setTicketInfo(ticket);
    }
  }

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
        description={ticketInfo.projectDescription}
        priority={ticketInfo.priority}
      />
    </div>
  );
}
