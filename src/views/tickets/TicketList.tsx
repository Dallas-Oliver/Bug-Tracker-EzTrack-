import React, { useContext, useState } from "react";
import TicketListItem from "./TicketListItem";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { ThemeContext } from "../../Contexts/ThemeContext";
import TicketModel from "../../models/main models/TicketModel";
import GarbageIcon from "../projects/img/garbage-icon";
import { Modal, Button } from "react-bootstrap";

interface ITicketListProps {
  ticketIsVisible?: boolean;
  ticketList: TicketModel[];
  openTicket: (_id: string) => void;
  projectStatus?: string;
  isRenderedInDashboard: boolean;
  deleteTicketListItems?: (ticketsToDelete: string[]) => void;
}

export default function TicketList(props: ITicketListProps) {
  const { theme } = useContext(ThemeContext);
  const [ticketsToDelete, updateTicketsToDelete] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const addTicketToDeleteArray = (_id: string) => {
    const newTicketArray: string[] = [...ticketsToDelete];
    newTicketArray.push(_id);
    updateTicketsToDelete(newTicketArray);
  };

  const deleteCheckedListItems = () => {
    props.deleteTicketListItems!(ticketsToDelete);
  };

  return (
    <div
      style={{
        background: theme.dashboardTheme.background,
        color: theme.textColor,
      }}
      className={`ticket-list  ${props.ticketIsVisible ? "blur" : ""}`}>
      <h4>All Tickets</h4>
      <SimpleBar>
        {props.ticketList.length >= 1 ? (
          <table>
            <thead>
              <tr>
                <th style={{ marginRight: "5px", padding: "0px" }}>
                  <span
                    onClick={() => setShowModal(true)}
                    style={{
                      margin: "0px",
                      padding: "0px",
                      cursor: "pointer",
                    }}>
                    <GarbageIcon />
                  </span>
                </th>
                <th>Ticket Name</th>
                <th>Ticket Status</th>
                <th>Assigned user</th>
              </tr>
            </thead>

            <tbody>
              {props.ticketList.map((ticket) => {
                return (
                  <TicketListItem
                    isRenderedInDashboard={props.isRenderedInDashboard}
                    projectStatus={props.projectStatus}
                    key={ticket._id}
                    _id={ticket._id}
                    name={ticket.name}
                    status={ticket.status}
                    openTicket={props.openTicket}
                    assignedUser={ticket.assignedUser}
                    AddTicketToDeleteArray={(_id) => addTicketToDeleteArray(_id)}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No tickets!</p>
        )}
      </SimpleBar>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data deleted cannot be recovered!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            whoops!
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowModal(false);
              deleteCheckedListItems();
            }}>
            Yes Im sure!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
