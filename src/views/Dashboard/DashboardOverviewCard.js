import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import { AuthService as Auth } from "../../auth/AuthService";

function DashboardOverviewCard(props) {
  console.log(props.userInfo);
  return (
    <div className="dash-card overview-card">
      <h3>Overview</h3>
      {/* <div className="content">
        <Chart ticketInfo={props.userInfo.tickets} />
        <section className="statistics">
          <h3>Statistics</h3>
          <ul>
            <li>
              Open Tickets: {props.userInfo.tickets.openTickets.length}
            </li>
            <li>
              Closed Tickets: {props.userInfo.tickets.closedTickets.length}
            </li>
            <li>Assigned Projects: {props.userInfo.projects.length}</li>
            <li>
              OverDue Tickets:{" "}
              {props.userInfo.tickets.overdueTickets.length}
            </li>
          </ul>
        </section>
      </div> */}
    </div>
  );
}

export default DashboardOverviewCard;
