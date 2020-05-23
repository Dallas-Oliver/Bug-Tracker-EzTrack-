import React, { useState, useEffect } from "react";
import HeaderBar from "../../components/HeaderBar";
import { Redirect } from "react-router-dom";
// import { AuthService as Auth } from "../../auth/AuthService";
import TicketListItem from "../tickets/TicketListItem";

function DashboardTicketList(props) {
  console.log(props.tickets);
  const [redirect, setRedirect] = useState(false);

  const redirectToTicketView = () => {
    setRedirect(!redirect);
  };

  // useEffect(() => {
  //   const getProjectNames = async () => {

  //   }
  //   getProjectNames()
  // },[]);

  return (
    <div className="dash-card dash-list ticket-list">
      {!redirect ? null : <Redirect to="/home/tickets" />}
      <HeaderBar
        title="Open Tickets"
        buttonText="View All"
        toggle={() => redirectToTicketView()}
      />
      {props.tickets.length <= 0 ? (
        <p>No Tickets!</p>
      ) : (
        <table>
          <thead>
            <tr className="table-header">
              <th>Name</th>
              <th>Status</th>
              <th>Assigned User</th>
            </tr>
          </thead>

          <tbody className="list-body">
            {props.tickets.map((ticket) => {
              return ticket.status === "Open" ? (
                <TicketListItem
                  key={ticket._id}
                  _id={ticket._id}
                  name={ticket.name}
                  status={ticket.status}
                  openTicket={props.openTicket}
                  assignedUser={ticket.assignedUser}
                />
              ) : null;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DashboardTicketList;
