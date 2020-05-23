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
  const [assignedUser, setAssignedUser] = useState();

  useEffect(() => {
    const getProjectData = async () => {
      const response = await Auth.fetch(
        `http://localhost:5000/projects/${projectId}`
      );

      if (!response) {
        console.log("no project");
        return;
      }
      const json = await response.json();
      setProjectInfo(json.project);
      setTicketList(json.tickets);
      return json;
    };
    getProjectData();
  }, [projectId]);

  const handleTicketSubmit = async (e) => {
    e.preventDefault();

    let newTicket = new TicketModel(titleInput, descInput, assignedUser);
    const currentUser = {
      name: Auth.getUserData().name,
      _id: Auth.getUserData()._id,
    };

    const response = await Auth.fetch(
      `http://localhost:5000/projects/save-ticket/${projectId}`,
      {
        body: JSON.stringify({ newTicket, currentUser }),
        method: "POST",
      }
    );

    if (!response) {
      console.log("no ticket");
    }
    const ticket = await response.json();
    setTicketList((ticketList) => ticketList.concat(ticket));
    handleTitleUpdate("");
    handleDescUpdate("");
    toggleForm(false);
  };

  const handleInput = (e) => {
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
  };

  const validateInputs = () => {
    return titleInput.length > 0 && descInput.length > 0;
  };

  const openTicket = (_id) => {
    if (_id) {
      setTicketId(_id);
      toggleTicket(true);
    }
  };

  const addUser = async (userId) => {
    if (userId) {
      setAssignedUser(userId);
    }
  };

  const changeStatus = async (_id) => {
    console.log(_id);

    const response = await Auth.fetch(
      `http://localhost:5000/projects/${_id}/change-status`
    );

    if (!response) {
      console.log("status not changed");
    }

    const project = await response.json();
    props.handleStatusChange(projectId, project.status);
    setProjectInfo(project);
  };

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
            _id={projectInfo._id}
            changeStatus={(_id) => changeStatus(_id)}
          />

          <TicketList
            ticketList={ticketList}
            openTicket={(userId) => openTicket(userId)}
          />
        </div>
      ) : (
        <h4 className="loading-msg">Loading...</h4>
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
          addUser={(userId) => addUser(userId)}
        />
      ) : null}

      {!currentTicketId || ticketIsVisible === false ? null : (
        <Ticket
          hideTicket={() => toggleTicket(false)}
          _id={currentTicketId}
        />
      )}
    </div>
  );
}

export default Project;
