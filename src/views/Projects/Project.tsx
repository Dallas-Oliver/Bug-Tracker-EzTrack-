import React, { useState, useEffect, useContext } from "react";
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
  handleProjectStatusChange: (_id: string, status: string) => void;
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
  const [assignedUser, setAssignedUser] = useState<string>("");

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
    const currentUser: User = await Auth.getUserData();
    let newTicket = new TicketModel(
      titleInput,
      descInput,
      currentUser,
      assignedUser
    );

    const response = await Auth.fetch(`/projects/${projectId}/save-ticket`, {
      body: JSON.stringify({ newTicket, currentUser }),
      method: "POST",
    });

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

  const changeProjectStatus = async (_id: string) => {
    const response = await Auth.fetch(`/projects/${_id}/change-status`);

    if (!response) {
      console.log("status not changed");
    }

    const project = await response.json();

    props.handleProjectStatusChange(projectId, project.status);
    changeAllTicketStatus(project.status);

    setProjectInfo(project);
  };

  const changeAllTicketStatus = (newStatus: string) => {
    const newTicketList: TicketModel[] = [...ticketList];
    newTicketList.forEach((ticket) => (ticket.status = newStatus));
    setTicketList(newTicketList);
  };

  const changeTicketStatus = (ticketId: string, newStatus: string) => {
    const newTicketList: TicketModel[] = [...ticketList];
    const ticketIndex = newTicketList
      .map((ticket: TicketModel) => ticket._id)
      .indexOf(ticketId);
    newTicketList[ticketIndex].status = newStatus;
    setTicketList(newTicketList);
  };

  const deleteCurrentProject = (projectId: string) => {
    console.log(projectId);
  };

  const deleteTicketListItems = async (selectedItemIds: string[]) => {
    const newTicketList: TicketModel[] = [...ticketList];
    const ticketIdsWithoutSelectedItems = newTicketList
      .filter((ticket) => selectedItemIds.indexOf(ticket._id) < 0)
      .map((ticket) => ticket._id);
    console.log(ticketIdsWithoutSelectedItems);

    const response = await Auth.fetch(`/projects/${projectId}/updateTickeList`, {
      method: "POST",
      body: JSON.stringify({ ticketIdsWithoutSelectedItems, selectedItemIds }),
    });

    const updatedAndSavedTicketList = await response.json();
    console.log(updatedAndSavedTicketList);

    setTicketList(updatedAndSavedTicketList);
  };

  return (
    <div className="project">
      {projectInfo ? (
        <div
          className={`project-content ${
            formIsVisible || ticketIsVisible ? "blur" : ""
          }`}>
          <HeaderBar
            projectOrTicketicketVisible={true}
            projectStatus={projectInfo.status}
            title={projectInfo.name}
            formIsVisible={formIsVisible}
            buttonText="New Ticket +"
            toggle={() => toggleForm(true)}
            delete={() => deleteCurrentProject(projectId)}
          />
          <InfoBar
            barType="project"
            createdBy={projectInfo.createdBy}
            dateCreated={projectInfo.dateCreated}
            status={projectInfo.status}
            description={projectInfo.projectDescription}
            _id={projectInfo._id}
            changeStatus={(_id: string) => changeProjectStatus(_id)}
          />

          <TicketList
            deleteTicketListItems={(selectedItemIds) =>
              deleteTicketListItems(selectedItemIds)
            }
            projectStatus={projectInfo.status}
            ticketList={ticketList}
            openTicket={(userId: string) => openTicket(userId)}
            isRenderedInDashboard={false}
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
          addUser={(_id) => addUser(_id)}
        />
      ) : null}

      {!currentTicketId || ticketIsVisible === false ? null : (
        <Ticket
          hideTicket={() => toggleTicket(false)}
          handleTicketStatusChange={(ticketId: string, newStatus: string) =>
            changeTicketStatus(ticketId, newStatus)
          }
          _id={currentTicketId}
        />
      )}
    </div>
  );
}

export default Project;
