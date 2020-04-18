import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";
import HeaderBar from "../../components/HeaderBar";

export default function Ticket(props) {
  const { projectId } = useParams();
  const [ticketInfo, setTicketInfo] = useState();

  useEffect(() => {
    getTicketData();
  }, [ticketInfo]);

  if (!ticketInfo) {
    return null;
  }

  async function getTicketData() {
    const ticket = await Auth.fetch(
      `http://localhost:5000/projects/${projectId}/ticket/${props.ticketId}`
    );

    if (ticket) {
      setTicketInfo(ticket);
    }
  }

  return (
    <div className="ticket">
      <HeaderBar
        title={ticketInfo.name}
        buttonText="hide"
        toggle={props.hideTicket}
      />
      <p>Created by: {ticketInfo.createdBy}</p>
      <hr></hr>
    </div>
  );
}
