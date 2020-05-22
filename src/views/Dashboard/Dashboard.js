import React, { useState, useEffect } from "react";
import DashboardOverviewCard from "./DashboardOverviewCard";
import DashboardTicketList from "./DashboardTicketList";
import Ticket from "../tickets/Ticket";
import { AuthService as Auth } from "../../auth/AuthService";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DashboardProjectList from "./DashboardProjectList";

function Dashboard() {
  const [userInfo, setUserInfo] = useState();
  const [date] = useState(new Date());
  const [currentTicketId, setTicketId] = useState();
  const [ticketIsVisible, toggleTicket] = useState(false);

  const getUserData = async () => {
    const user = await Auth.getUserData();
    if (!user) {
      console.log("no user");
      return;
    }

    const response = await Auth.fetch(
      `http://localhost:5000/users/${user._id}`
    );
    if (!response) {
      console.log("no user info available");
      return;
    }
    const userData = await response.json();
    setUserInfo(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const openTicket = (_id) => {
    if (_id) {
      setTicketId(_id);
      toggleTicket(true);
    }
  };

  return (
    <React.Fragment>
      {userInfo ? (
        <div className="Dashboard">
          <h2>Welcome, {userInfo.user.name}</h2>
          <DashboardOverviewCard
            tickets={userInfo.ticketList}
            projects={userInfo.projectList}
          />
          <DashboardTicketList
            openTicket={(_id) => openTicket(_id)}
            tickets={userInfo.ticketList}
            projects={userInfo.projectList}
          />
          <DashboardProjectList projects={userInfo.projectList} />
          <Calendar
            className="dashboard-calendar dash-card"
            value={date}
          />
          {!currentTicketId || ticketIsVisible === false ? null : (
            <Ticket
              hideTicket={() => toggleTicket(false)}
              _id={currentTicketId}
            />
          )}
        </div>
      ) : (
        <h4 className="loading-msg">Loading...</h4>
      )}
    </React.Fragment>
  );
}

export default Dashboard;
