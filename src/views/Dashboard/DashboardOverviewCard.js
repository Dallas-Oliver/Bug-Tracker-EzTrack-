import React, { useContext } from "react";
import Chart from "./Chart";
import { ThemeContext } from "../../Contexts/ThemeContext";

function DashboardOverviewCard(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      style={{
        background: theme.dashboardTheme.background,
        color: theme.textColor,
      }}
      className="dash-card overview-card"
    >
      {props.tickets.length > 0 ? (
        <div className="ticket-chart chart">
          <h5>Tickets</h5>
          <Chart tickets={props.tickets} />
        </div>
      ) : null}
      {props.projects.length > 0 ? (
        <div className="project-chart chart">
          <h5>Projects</h5>
          <Chart tickets={props.projects} />
        </div>
      ) : null}
    </div>
  );
}

export default DashboardOverviewCard;
