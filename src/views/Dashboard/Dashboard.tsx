import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import DashboardOverviewCard from "./DashboardOverviewCard";
import DashboardTicketList from "./DashboardTicketList";
import Ticket from "../tickets/Ticket";
import { AuthService as Auth } from "../../auth/AuthService";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DashboardProjectList from "./DashboardProjectList";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { Project as ProjectModel } from "../../models/main models/ProjectModel";
import TicketModel from "../../models/main models/TicketModel";
import User from "../../models/main models/UserModel";

interface IUserInfo {
  projectList: ProjectModel[];
  ticketList: TicketModel[];
  user: User;
}

function Dashboard() {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [date] = useState(new Date());
  const history = useHistory();
  const [currentTicketId, setTicketId] = useState<string>();
  const [ticketIsVisible, toggleTicket] = useState(false);
  const { theme } = useContext(ThemeContext);

  const getUserData = async () => {
    const user = await Auth.getUserData();
    if (!user) {
      console.log("no user");
      return;
    }

    const response = await Auth.fetch(`/users/${user._id}`);
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

  const openTicket = (_id: string) => {
    if (_id) {
      setTicketId(_id);
      toggleTicket(true);
    }
  };

  const redirectToProject = (_id: string) => {
    if (!_id) {
      return;
    }
    console.log(_id);
    history.push(`/home/projects/${_id}`);
  };

  return (
    <React.Fragment>
      {userInfo ? (
        <div
          style={{ background: theme.background, color: theme.textColor }}
          className="Dashboard">
          <h2>Welcome, {userInfo.user.name}</h2>
          <DashboardOverviewCard
            tickets={userInfo.ticketList}
            projects={userInfo.projectList}
          />
          <DashboardTicketList
            openTicket={(_id) => openTicket(_id)}
            tickets={userInfo.ticketList}
          />
          <DashboardProjectList
            redirectToProject={(_id) => redirectToProject(_id)}
            projects={userInfo.projectList}
          />
          <Calendar
            className={`${theme.background === "#F5F5F5" ? "light" : "dark"}`}
            value={date}
          />
          {!currentTicketId || ticketIsVisible === false ? null : (
            <Ticket hideTicket={() => toggleTicket(false)} _id={currentTicketId} />
          )}
        </div>
      ) : (
        <div className="loading-container">
          <h4
            style={{ background: theme.background, color: theme.textColor }}
            className="loading-msg">
            Loading...
          </h4>
        </div>
      )}
    </React.Fragment>
  );
}

export default Dashboard;
