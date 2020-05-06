import React, { useState, useEffect } from "react";
import DashboardOverviewCard from "./DashboardOverviewCard";
import DashboardTicketList from "./DashboardTicketList";
import { AuthService as Auth } from "../../auth/AuthService";

function Dashboard(props) {
  const [userInfo, setUserInfo] = useState();

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
            toggle={props.toggle}
            formIsVisible={props.formIsVisible}
            tickets={userInfo.ticketList}
          />
        </div>
      ) : (
        <h4 className="loading-msg">Loading...</h4>
      )}
    </React.Fragment>
  );
}

export default Dashboard;
