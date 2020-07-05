import React, { useContext } from "react";
import ProjectListItem from "./ProjectListItem";
import { Project } from "../../models/main models/ProjectModel";
import HeaderBar from "../../components/HeaderBar";

import { ThemeContext } from "../../Contexts/ThemeContext";
import User from "../../models/main models/UserModel";
import { useState } from "react";
import GarbageIcon from "./img/garbage-icon";
import ModalDropDown from "../../components/ModalDropDown";

interface IProjectListProps {
  formIsVisible: boolean;
  projectList: Project[];
  titleInput: string;
  descInput: string;
  users: User[];
  showForm: () => void;
  handleTitleChange: (title: string) => void;
  handleDescChange: (description: string) => void;
  hideForm: () => void;
  handleSubmit: () => void;
  redirectToProject: (_id: string) => void;
  deleteProjectListItems?: (ticketsToDelete: string[]) => void;
}

function ProjectList(props: IProjectListProps) {
  const { theme } = useContext(ThemeContext);
  const [projectsToDelete, updateProjectsToDelete] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const addProjectToDeleteArray = (_id: string) => {
    const newProjectList = [...projectsToDelete];
    newProjectList.push(_id);
    updateProjectsToDelete(newProjectList);
  };

  const deleteCheckedListItems = () => {
    props.deleteProjectListItems!(projectsToDelete);
  };
  return (
    <div
      style={{
        background: theme.dashboardTheme.background,
        color: theme.textColor,
      }}
      className="project-list">
      <HeaderBar
        title="All Projects"
        formIsVisible={props.formIsVisible}
        toggle={props.showForm}
        buttonText="New Project +"
      />

      {props.projectList.length >= 1 ? (
        <table className={`project-table ${props.formIsVisible ? "blur" : ""}`}>
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
              <th>Project Name</th>
              <th>Project Status</th>
              <th>Number of tickets</th>
            </tr>
          </thead>
          <tbody>
            {props.projectList.length >= 1 ? (
              props.projectList.map((project: Project) => {
                return (
                  <ProjectListItem
                    key={project._id}
                    _id={project._id}
                    name={project.name}
                    status={project.status}
                    numberOfTickets={project.tickets.length}
                    redirectToProject={props.redirectToProject}
                    addProjectToDeleteArray={(_id) => addProjectToDeleteArray(_id)}
                    isRenderedOnDashboard={false}
                  />
                );
              })
            ) : (
              <p>Create a Project!</p>
            )}
          </tbody>
        </table>
      ) : (
        <p>Create a Project!</p>
      )}
      <ModalDropDown
        showModal={showModal}
        setShowModal={() => setShowModal(false)}
        confirmDelete={() => deleteCheckedListItems()}
      />
    </div>
  );
}

export default ProjectList;
