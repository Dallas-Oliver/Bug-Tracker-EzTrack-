import React, { useState, useContext } from "react";
import HeaderBar from "../../components/HeaderBar";
import { Redirect } from "react-router-dom";
import TicketListItem from "../tickets/TicketListItem";
import { ThemeContext } from "../../Contexts/ThemeContext";
function DashboardTicketList(props) {
  const [redirect, setRedirect] = useState(false);
  const { theme } = useContext(ThemeContext);

  const redirectToTicketView = () => {
    setRedirect(!redirect);
  };
  console.log(props.tickets);

  return (
    <div
      style={{
        background: theme.dashboardTheme.background,
        color: theme.textColor,
      }}
      className="dash-card dash-list ticket-list"
    >
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
