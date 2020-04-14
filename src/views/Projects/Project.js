import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthService from "../../auth/AuthService";
import TicketList from "../tickets/TicketList";
import HeaderBar from "../../components/HeaderBar";
import AddForm from "../../components/AddForm";
import TicketModel from "../../models/main models/TicketModel";

function Project(props) {
  const [projectInfo, setProjectInfo] = useState();
  const [dataLoaded, setData] = useState(false);
  const [titleInput, handleTitleUpdate] = useState("");
  const [descInput, handleDescUpdate] = useState("");
  const [devInput, handleDevUpdate] = useState("");
  const { projectId } = useParams();
  const Auth = new AuthService();

  async function getProjectData() {
    if (Auth.loggedIn()) {
      const response = await fetch(
        `http://localhost:5000/projects/get-project/${projectId}`
      );

      const json = await response.json();
      if (json) {
        setProjectInfo(json);
        setData(true);
      }
    }
  }

  useEffect(() => {
    if (!dataLoaded) {
      getProjectData();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    let newTicket = new TicketModel(titleInput, descInput, devInput);

    const response = await fetch(
      `http://localhost:5000/projects/save-ticket/${projectId}`,
      {
        headers: { "content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(newTicket),
        method: "POST",
      }
    );

    const json = await response.json();
    if (json) {
      console.log(json);
      handleTitleUpdate("");
      handleDescUpdate("");
    }
  }

  function handleInput(e) {
    const elementName = e.target.name;
    const value = e.target.value;

    switch (elementName) {
      case "title":
        handleTitleUpdate(value);
        break;
      case "dev":
        handleDevUpdate(value);
        break;
      case "description":
        handleDescUpdate(value);
        break;
      default:
        break;
    }
  }

  function validateInputs() {
    return (
      titleInput.length > 0 && descInput.length > 0 && devInput.length > 0
    );
  }

  return (
    <div className="project">
      {dataLoaded ? (
        <div
          className={`project-content ${
            props.formIsVisible ? "blur" : ""
          }`}
        >
          <HeaderBar
            title={projectInfo.name}
            formIsVIsible={props.formIsVIsible}
            buttonText="New Ticket"
            showForm={props.showForm}
          />

          <section className="project-description">
            <h3>Project description</h3>
            <hr></hr>
            <p>{projectInfo.projectDescription}</p>
          </section>
          <div className="ticket-list-container">
            <TicketList ticketList={projectInfo.Tickets} />
          </div>
        </div>
      ) : (
        "Create a ticket"
      )}
      {props.formIsVisible ? (
        <AddForm
          header="New Ticket"
          formType="Ticket"
          validateInputs={validateInputs}
          titleValue={titleInput}
          onTitleChange={(e) => handleInput(e)}
          onDevChange={(e) => handleInput(e)}
          devValue={devInput}
          onSubmit={(e) => handleSubmit(e)}
          hideForm={props.hideForm}
          descValue={descInput}
          onDescChange={(e) => handleInput(e)}
        />
      ) : null}
    </div>
  );
}

export default Project;
