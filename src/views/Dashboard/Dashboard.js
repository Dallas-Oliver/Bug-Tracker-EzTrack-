import React, { useState, useEffect } from "react";
import DashboardOverviewCard from "./DashboardOverviewCard";
import DashboardTicketList from "./DashboardTicketList";
import { AuthService as Auth } from "../../auth/AuthService";
import { useHistory } from "react-router-dom";

function Dashboard(props) {
  const history = useHistory();
  const [ticketList, setTicketList] = useState();
  const [projectList, setProjectList] = useState();

  async function getUserData() {
    const tickets = await Auth.fetch(
      "http://localhost:5000/projects/all-tickets"
    );
    const projects = await Auth.fetch(
      "http://localhost:5000/projects/all-projects"
    );

    if (tickets && projects) {
      console.log(projects);
      setTicketList(tickets);
      setProjectList(projects);
      history.push("/home/dashboard");
    } else {
      console.log("no data");
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <React.Fragment>
      {ticketList && projectList ? (
        <div className="Dashboard">
          <h2>Welcome, {props.currentUser.name}</h2>
          <DashboardOverviewCard
            tickets={ticketList}
            projects={projectList}
          />
          {/* <DashboardTicketList tickets={userInfo.tickets} /> */}
        </div>
      ) : (
        <h4 className="loading-msg">Loading...</h4>
      )}
    </React.Fragment>
  );
}

export default Dashboard;
