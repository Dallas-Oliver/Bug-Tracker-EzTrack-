import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";
import TicketList from "../tickets/TicketList";
import HeaderBar from "../../components/HeaderBar";
import AddForm from "../../components/AddForm";
import TicketModel from "../../models/main models/TicketModel";
import Ticket from "../../views/tickets/Ticket";

function Project(props) {
  const [projectInfo, setProjectInfo] = useState();
  const [ticketList, setTicketList] = useState([]);
  const [currentTicketId, setTicketId] = useState();
  const [titleInput, handleTitleUpdate] = useState("");
  const [descInput, handleDescUpdate] = useState("");
  const [formIsVisible, toggleForm] = useState(false);
  const [ticketIsVisible, toggleTicket] = useState(false);
  const { projectId } = useParams();

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

  async function handleSubmit(e) {
    e.preventDefault();
    let newTicket = new TicketModel(titleInput, descInput);

    const ticket = await Auth.fetch(
      `http://localhost:5000/projects/save-ticket/${projectId}`,
      { body: JSON.stringify(newTicket), method: "POST" }
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
    setTicketId(_id);
    toggleTicket(true);
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
            buttonText="New Ticket"
            toggle={() => toggleForm(true)}
          />

          <section className="project-description">
            <h2>Project description</h2>
            <hr></hr>
            <p>{projectInfo.projectDescription}</p>
          </section>
          <div className="ticket-list-container">
            <TicketList
              projectId={projectInfo._id}
              ticketList={ticketList}
              passTicketId={(_id) => passTicketId(_id)}
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
          onSubmit={(e) => handleSubmit(e)}
          hideForm={() => toggleForm(false)}
          descValue={descInput}
          onDescChange={(e) => handleInput(e)}
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
