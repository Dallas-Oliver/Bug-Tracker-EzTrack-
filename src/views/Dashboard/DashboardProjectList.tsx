import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar";
import ProjectListItem from "../projects/ProjectListItem";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { Project } from "../../models/main models/ProjectModel";

interface IDashboardProjectListProps {
  projects: Project[];
  redirectToProject: (_id: string) => void;
}

function DashboardProjectList(props: IDashboardProjectListProps) {
  const [redirect, setRedirect] = useState(false);
  const [openProjects, setOpenProjects] = useState<Project[]>([]);
  const { theme } = useContext(ThemeContext);

  const redirectToProjectView = () => {
    setRedirect(!redirect);
  };

  React.useEffect(() => {
    let openProjects = props.projects.filter((project) => project.status === "Open");
    setOpenProjects(openProjects);
  }, [props.projects]);

  return (
    <div
      style={{
        background: theme.dashboardTheme.background,
        color: theme.textColor,
      }}
      className="dash-card dash-list project-list">
      {!redirect ? null : <Redirect to="/home/projects" />}
      <HeaderBar
        title="Open Projects"
        buttonText="View All"
        toggle={() => redirectToProjectView()}
      />
      {openProjects.length === 0 ? (
        <p>No Projects!</p>
      ) : (
        <table>
          <thead>
            <tr className="table-header">
              <th>Name</th>
              <th>Status</th>
              <th>Number of Tickets</th>
            </tr>
          </thead>

          <tbody>
            {openProjects.length >= 1 ? (
              openProjects.map((project) => {
                return project.status === "Open" ? (
                  <ProjectListItem
                    key={project._id}
                    _id={project._id}
                    name={project.name}
                    status={project.status}
                    numberOfTickets={project.tickets.length}
                    redirectToProject={props.redirectToProject}
                  />
                ) : null;
              })
            ) : (
              <p>Create a Project!</p>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DashboardProjectList;
