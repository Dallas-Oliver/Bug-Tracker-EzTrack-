import React, { useContext } from "react";
import ProjectListItem from "./ProjectListItem";
import { Project } from "../../models/main models/ProjectModel";
import HeaderBar from "../../components/HeaderBar";

import { ThemeContext } from "../../Contexts/ThemeContext";
import User from "../../models/main models/UserModel";

interface IProjectListProps {
  formIsVisible: boolean;
  showForm: () => void;
  projectList: Project[];
  titleInput: string;
  handleTitleChange: (title: string) => void;
  handleDescChange: (description: string) => void;
  handleSubmit: () => void;
  hideForm: () => void;
  redirectToProject: (_id: string) => void;
  descInput: string;
  users: User[];
}

function ProjectList(props: IProjectListProps) {
  const { theme } = useContext(ThemeContext);
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
                    projectStatus={project.status}
                    key={project._id}
                    _id={project._id}
                    name={project.name}
                    status={project.status}
                    numberOfTickets={project.tickets.length}
                    redirectToProject={props.redirectToProject}
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
    </div>
  );
}

export default ProjectList;
