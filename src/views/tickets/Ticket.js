import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";

export default function Ticket(props) {
  const { projectId, ticketId } = useParams();
  const [ticketInfo, setTicketInfo] = useState();

  useEffect(() => {
    if (ticketId && !ticketInfo) {
      getTicketData();
    }
  });

  if (!ticketId) {
    return null;
  }

  async function getTicketData() {
    const ticket = await Auth.fetch(
      `/projects/${projectId}/ticket/${ticketId}`
    );

    if (ticket) {
      setTicketInfo(ticket);
    }

    console.log(ticket);
  }

  return <h1>{props.title}</h1>;
}
