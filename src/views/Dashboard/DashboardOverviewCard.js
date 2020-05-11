import React from "react";
import Chart from "./Chart";

function DashboardOverviewCard(props) {
  return (
    <div className="dash-card overview-card">
      <div className="ticket-chart chart">
        <h5>Tickets</h5>
        <Chart tickets={props.tickets} />
      </div>
      <div className="project-chart chart">
        <h5>Projects</h5>
        <Chart tickets={props.projects} />
      </div>
    </div>
  );
}

export default DashboardOverviewCard;
