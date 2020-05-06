import React from "react";
import Chart from "./Chart";

function DashboardOverviewCard(props) {
  return (
    <div className="dash-card overview-card">
      <h3>Overview</h3>
      <div className="content">
        <Chart tickets={props.tickets} />
        {/* <section className="statistics">
          <h3>Statistics</h3>
          <ul>
            <li>Open Tickets: {props.tickets.length}</li>
            <li>Closed Tickets: {props.tickets.closedTickets.length}</li>
            <li>Assigned Projects: {props.projects.length}</li>
            <li>OverDue Tickets: {props.tickets.overdueTickets.length}</li>
          </ul>
        </section> */}
      </div>
    </div>
  );
}

export default DashboardOverviewCard;
