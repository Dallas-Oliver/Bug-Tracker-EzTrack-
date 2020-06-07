import React, { useState, useEffect, useContext } from "react";
import {
  Route,
  useRouteMatch,
  Switch,
  useHistory,
} from "react-router-dom";
import { Project as ProjectModel } from "../../models/main models/ProjectModel";
import User from "../../models/main models/UserModel";
import ProjectList from "./ProjectList";
import Project from "./Project";
import { AuthService as Auth } from "../../auth/AuthService";
import { ThemeContext } from "../../Contexts/ThemeContext";

interface IProjectMangerProps {
  users: User[];
}

function ProjectManager(props: IProjectMangerProps) {
  const [titleInput, handleTitleChange] = useState("");
  const [descInput, handleDescChange] = useState("");
  const [projectList, updateProjectList] = useState<ProjectModel[]>([]);
  const [formIsVisible, toggleForm] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { path } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    async function getAllProjects() {
      const response = await Auth.fetch("/projects/all");
      if (!response) {
        console.log("no projects");
      }
      const projects = await response.json();
      updateProjectList(projects);
    }
    getAllProjects();
  }, []);

  const handleSubmit = async () => {
    const user: User = await Auth.getUserData();
    console.log(user);

    const newProject = new ProjectModel(titleInput, descInput, user);

    const response = await Auth.fetch("/projects/save-project", {
      body: JSON.stringify({ newProject, currentUser: user }),
      method: "POST",
    });

    if (response) {
      const project: ProjectModel = await response.json();
      updateProjectList((projectList) => projectList.concat(project));

      handleTitleChange("");
      handleDescChange("");
      toggleForm(false);
    }
  };

  const handleProjectStatusChange = (
    projectId: string,
    status: string
  ) => {
    let newProjectList: ProjectModel[] = [...projectList];
    let projectIndex = newProjectList
      .map((project: ProjectModel) => project._id)
      .indexOf(projectId);
    newProjectList[projectIndex].status = status;
    updateProjectList(newProjectList);
  };

  const redirectToProject = (_id: string) => {
    if (!_id) {
      return;
    }
    history.push(`/home/projects/${_id}`);
  };

  return (
    <div
      style={{ background: theme.background, color: theme.colorText }}
      className="project-manager"
    >
      <Switch>
        <Route
          exact
          path={path}
          render={() => {
            return (
              <ProjectList
                titleInput={titleInput}
                descInput={descInput}
                handleTitleChange={(title) => {
                  handleTitleChange(title);
                }}
                handleDescChange={(title) => handleDescChange(title)}
                handleSubmit={() => handleSubmit()}
                hideForm={() => toggleForm(false)}
                showForm={() => toggleForm(true)}
                formIsVisible={formIsVisible}
                projectList={projectList}
                redirectToProject={(_id) => redirectToProject(_id)}
                users={props.users}
              />
            );
          }}
        />
        <Route
          path="/home/projects/:projectId"
          render={() => (
            <Project
              handleProjectStatusChange={(
                projectId: string,
                status: string
              ) => handleProjectStatusChange(projectId, status)}
              users={props.users}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default ProjectManager;
