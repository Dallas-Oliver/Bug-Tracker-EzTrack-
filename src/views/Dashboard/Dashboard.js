import React, { useState } from "react";
import Overview from "./DashboardOverviewCard";
import DashboardTicketList from "./DashboardTicketList";

function Dashboard(props) {
  return (
    <div className="Dashboard">
      <h1>Welcome, {props.userInfo.name}</h1>
      <Overview userInfo={props.userInfo} />
      {/* <TicketList tickets={props.userInfo} /> */}
    </div>
  );
}

export default Dashboard;
