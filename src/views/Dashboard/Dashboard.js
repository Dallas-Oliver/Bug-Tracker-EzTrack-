import React, { useState } from "react";
import Overview from "./DashboardOverviewCard";
import TicketList from "./TicketList";

function Dashboard(props) {
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
