import React, { useState, useEffect } from "react";
import HeaderBar from "../../components/HeaderBar";
import { Redirect } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { AuthService as Auth } from "../../auth/AuthService";
import TicketListItem from "../tickets/TicketListItem";

function DashboardTicketList(props) {
  const [redirect, setRedirect] = useState(false);
  // async function getProjectData() {
  //   const response = await Auth.fetch('')
  // }

  // useEffect(() => {
  //   getProjectData()
  // }, [])

  function redirectToTicketView() {
    setRedirect(!redirect);
  }
  return (
    <div className="dash-card ticket-list">
      {!redirect ? null : <Redirect to="/home/tickets" />}
      <HeaderBar
        title="Open Tickets"
        buttonText="View All"
        toggle={() => redirectToTicketView()}
      />

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
            ) : // <tr className="table-row" key={ticket._id}>
            //   <td>{ticket.name}</td>
            //   <td>{ticket.status}</td>
            //   <td>{ticket.assignedUser}</td>
            // </tr>
            null;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTicketList;
