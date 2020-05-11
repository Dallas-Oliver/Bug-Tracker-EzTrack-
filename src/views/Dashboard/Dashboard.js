import React, { useState, useEffect } from "react";
import DashboardOverviewCard from "./DashboardOverviewCard";
import DashboardTicketList from "./DashboardTicketList";
import Ticket from "../tickets/Ticket";
import { AuthService as Auth } from "../../auth/AuthService";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Dashboard(props) {
  const [userInfo, setUserInfo] = useState();
  const [date, setDate] = useState(new Date());
  const [currentTicketId, setTicketId] = useState();
  const [ticketIsVisible, toggleTicket] = useState(false);

  async function getUserData() {
    const user = await Auth.getUserData();
    if (!user) {
      console.log("no user");
    }

    if (user) {
      const response = await Auth.fetch(
        `http://localhost:5000/users/${user._id}`
      );
      const userData = await response.json();
      setUserInfo(userData);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  function openTicket(_id) {
    if (_id) {
      setTicketId(_id);
      toggleTicket(true);
    }
  }

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
            openTicket={(userId) => openTicket(userId)}
            tickets={userInfo.ticketList}
          />
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
