import React, { useState, useEffect } from "react";
import HeaderBar from "../../components/HeaderBar";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

function DashboardTicketList(props) {
  return (
    <div className="dash-card ">
      <HeaderBar
        title="All Tickets"
        buttonText="View All"
        formIsVisible={props.formIsVisible}
        toggle={props.toggle}
      />

      <table>
        <thead>
          <tr className="table-header">
            <th>Name</th>
            <th>Status</th>
            <th>Assigned User</th>
          </tr>
        </thead>

        <tbody>
          {props.tickets.map((ticket) => {
            return (
              <tr className="table-row" key={ticket._id}>
                <td>{ticket.name}</td>
                <td>{ticket.status}</td>
                <td>{ticket.assignedUser}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTicketList;
