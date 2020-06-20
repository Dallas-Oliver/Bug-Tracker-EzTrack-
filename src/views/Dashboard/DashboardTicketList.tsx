import React, { useState, useContext } from "react";
import HeaderBar from "../../components/HeaderBar";
import { Redirect } from "react-router-dom";
import TicketListItem from "../tickets/TicketListItem";
import { ThemeContext } from "../../Contexts/ThemeContext";
import Ticket from "../../models/main models/TicketModel";

interface IDashboardTicketListProps {
  tickets: Ticket[];
  openTicket: (_id: string) => void;
}

function DashboardTicketList(props: IDashboardTicketListProps) {
  const [redirect, setRedirect] = useState(false);
  const [openTickets, setOpenTickets] = useState<Ticket[]>([]);
  const { theme } = useContext(ThemeContext);

  const redirectToTicketView = () => {
    setRedirect(!redirect);
  };

  React.useEffect(() => {
    const openTickets = props.tickets.filter((ticket) => ticket.status === "Open");
    setOpenTickets(openTickets);
  }, [props.tickets]);
  return (
    <div
      style={{
        background: theme.dashboardTheme.background,
        color: theme.textColor,
      }}
      className="dash-card dash-list ticket-list">
      {!redirect ? null : <Redirect to="/home/tickets" />}
      <HeaderBar
        title="Open Tickets"
        buttonText="View All"
        toggle={() => redirectToTicketView()}
      />
      {openTickets.length <= 0 ? (
        <p>No Tickets!</p>
      ) : (
        <table>
          <thead>
            <tr className="table-header">
              <th></th>
              <th>Name</th>
              <th>Status</th>
              <th>Assigned User</th>
            </tr>
          </thead>

          <tbody className="list-body">
            {openTickets.map((ticket: Ticket) => {
              return ticket.status === "Open" ? (
                <TicketListItem
                  key={ticket._id}
                  _id={ticket._id}
                  name={ticket.name}
                  status={ticket.status}
                  openTicket={props.openTicket}
                  assignedUser={ticket.assignedUser}
                  isRenderedInDashboard={true}
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
