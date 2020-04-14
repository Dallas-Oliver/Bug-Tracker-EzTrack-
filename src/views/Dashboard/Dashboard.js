import React, { useState } from "react";
import Overview from "./DashboardOverviewCard";
import TicketList from "./TicketList";

function Dashboard(props) {
  const [tickets, updateTickets] = useState([
    {
      id: "2323",
      name: "ticket1",
      dueDate: "333",
      parentProject: "project1"
    },
    {
      id: "2sdsd",
      name: "ticket2",
      dueDate: "333",
      parentProject: "project1"
    }
  ]);

  console.log(props.userInfo);

  return (
    <div className="Dashboard">
      <h1>Welcome, {props.userInfo.name}</h1>
      <Overview userInfo={props.userInfo} />
      <TicketList tickets={props.userInfo.tickets} />
    </div>
  );
}

export default Dashboard;
