import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthService as Auth } from "../../auth/AuthService";
import User from "../../models/main models/UserModel";
import TicketList from "../tickets/TicketList";
import HeaderBar from "../../components/HeaderBar";
import AddForm from "../../components/AddForm";
import TicketModel from "../../models/main models/TicketModel";
import Ticket from "../tickets/Ticket";
import InfoBar from "../../components/InfoBar";
import { Project as ProjectModel } from "../../models/main models/ProjectModel";

interface IProjectProps {
  handleStatusChange: (_id: string, status: string) => void;
  users: User[];
}
interface IProjectId {
  projectId: string;
}
function Project(props: IProjectProps) {
  const [projectInfo, setProjectInfo] = useState<ProjectModel>();
  const [ticketList, setTicketList] = useState<TicketModel[]>([]);
  const [currentTicketId, setTicketId] = useState("");
  const [titleInput, handleTitleUpdate] = useState("");
  const [descInput, handleDescUpdate] = useState("");
  const [formIsVisible, toggleForm] = useState(false);
  const [ticketIsVisible, toggleTicket] = useState(false);
  const { projectId } = useParams<IProjectId>();
  const [assignedUser, setAssignedUser] = useState<string>();

  useEffect(() => {
    const getProjectData = async () => {
      const response = await Auth.fetch(`/projects/${projectId}`);

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

  const handleTicketSubmit = async () => {
    const user: User = await Auth.getUserData();
    let newTicket = new TicketModel(titleInput, descInput, user);

    const response = await Auth.fetch(
      `/projects/save-ticket/${projectId}`,
      {
        body: JSON.stringify({ newTicket, user }),
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

  const openTicket = (_id: string) => {
    if (_id) {
      setTicketId(_id);
      toggleTicket(true);
    }
  };

  const addUser = async (userId: string) => {
    if (userId) {
      setAssignedUser(userId);
    }
  };

  const changeStatus = async (_id: string) => {
    const response = await Auth.fetch(`/projects/${_id}/change-status`);

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
            changeStatus={(_id: string) => changeStatus(_id)}
          />

          <TicketList
            ticketList={ticketList}
            openTicket={(userId: string) => openTicket(userId)}
          />
        </div>
      ) : (
        <h4 className="loading-msg">Loading...</h4>
      )}
      {formIsVisible ? (
        <AddForm
          header="New Ticket"
          formType="Ticket"
          titleValue={titleInput}
          descValue={descInput}
          onTitleChange={handleTitleUpdate}
          onDescChange={handleDescUpdate}
          onSubmit={() => handleTicketSubmit()}
          hideForm={() => toggleForm(false)}
          users={props.users}
          addUser={(userId: string) => addUser(userId)}
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
