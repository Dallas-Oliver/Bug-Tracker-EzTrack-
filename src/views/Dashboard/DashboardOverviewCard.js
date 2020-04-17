import React, { useEffect } from "react";
import Chart from "./Chart";

function DashboardOverviewCard(props) {
  function getTicketData() {
    let ticketsArray = [];
    props.userInfo.projects.forEach((project) => {
      project.Tickets.forEach((ticket) => {
        ticketsArray.push(ticket);
      });
    });
    ticketsArray.flat();
  }

  useEffect(() => {
    getTicketData();
  }, []);

  return (
    <div className="dash-card overview-card">
      {/* <h2>Overview</h2>
      <div className="content">
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
