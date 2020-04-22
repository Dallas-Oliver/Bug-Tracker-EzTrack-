import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";
import TicketList from "../tickets/TicketList";
import HeaderBar from "../../components/HeaderBar";
import AddForm from "../../components/AddForm";
import TicketModel from "../../models/main models/TicketModel";
import Ticket from "../../views/tickets/Ticket";
import InfoBar from "../../components/InfoBar";

function Project(props) {
  const [projectInfo, setProjectInfo] = useState();
  const [ticketList, setTicketList] = useState([]);
  const [currentTicketId, setTicketId] = useState();
  const [titleInput, handleTitleUpdate] = useState("");
  const [descInput, handleDescUpdate] = useState("");
  const [formIsVisible, toggleForm] = useState(false);
  const [ticketIsVisible, toggleTicket] = useState(false);
  const { projectId } = useParams();
  const [assignedUsers, addAssignedUser] = useState([]);

  async function getProjectData() {
    const response = await Auth.fetch(
      `http://localhost:5000/projects/${projectId}`
    );

    if (response) {
      setProjectInfo(response.project);
      setTicketList(response.tickets);
    }
  }

  useEffect(() => {
    if (!projectInfo) {
      getProjectData();
    }
  });

  async function handleTicketSubmit(e) {
    e.preventDefault();
    let newTicket = new TicketModel(titleInput, descInput, assignedUsers);
    const currentUser = {
      name: Auth.getUserData().name,
      _id: Auth.getUserData()._id,
    };

    const ticket = await Auth.fetch(
      `http://localhost:5000/projects/save-ticket/${projectId}`,
      { body: JSON.stringify({ newTicket, currentUser }), method: "POST" }
    );

    if (ticket) {
      setTicketList(ticketList.concat(ticket));
      handleTitleUpdate("");
      handleDescUpdate("");
      toggleForm(false);
    }
  }

  function handleInput(e) {
    const elementName = e.target.name;
    const value = e.target.value;

    switch (elementName) {
      case "title":
        handleTitleUpdate(value);
        break;
      case "description":
        handleDescUpdate(value);
        break;
      default:
        break;
    }
  }

  function validateInputs() {
    return titleInput.length > 0 && descInput.length > 0;
  }

  function passTicketId(_id) {
    if (_id) {
      setTicketId(_id);
      toggleTicket(true);
    }
  }

  async function addUser(userId) {
    if (userId) {
      if (assignedUsers.indexOf(userId) !== -1) {
        console.log("User already asigned to this ticket");
      } else {
        addAssignedUser(assignedUsers.concat(userId));
      }
    }
  }

  return (
    <div className="project">
      {projectInfo ? (
        <div
          className={`project-content ${
            formIsVisible || ticketIsVisible ? "blur" : ""
          }`}
        >
          <HeaderBar
            title={projectInfo.name}
            formIsVIsible={formIsVisible}
            buttonText="New Ticket +"
            toggle={() => toggleForm(true)}
          />
          <InfoBar
            barType="project"
            createdBy={projectInfo.createdBy}
            dateCreated={projectInfo.dateCreated}
            status={projectInfo.status}
            description={projectInfo.projectDescription}
          />
          <div className="ticket-list-container">
            <TicketList
              projectId={projectInfo._id}
              ticketList={ticketList}
              passTicketId={(userId) => passTicketId(userId)}
            />
          </div>
        </div>
      ) : (
        "Create a ticket"
      )}
      {formIsVisible ? (
        <AddForm
          header="New Ticket"
          formType="Ticket"
          validateInputs={validateInputs}
          titleValue={titleInput}
          onTitleChange={(e) => handleInput(e)}
          onDevChange={(e) => handleInput(e)}
          onSubmit={(e) => handleTicketSubmit(e)}
          hideForm={() => toggleForm(false)}
          descValue={descInput}
          onDescChange={(e) => handleInput(e)}
          users={props.users}
          addUser={(msg) => addUser(msg)}
        />
      ) : null}

      {!currentTicketId || ticketIsVisible === false ? null : (
        <Ticket
          hideTicket={() => toggleTicket(false)}
          ticketId={currentTicketId}
        />
      )}
    </div>
  );
}

export default Project;
