import React, { useState, useEffect } from "react";
import {
  Route,
  useRouteMatch,
  Switch,
  useHistory,
} from "react-router-dom";
import ProjectModel from "../../models/main models/ProjectModel";
import ProjectList from "./ProjectList";
import Project from "./Project";
import { AuthService as Auth } from "../../auth/AuthService";

function ProjectManager(props) {
  const [titleInput, handleTitleUpdate] = useState("");
  const [descInput, handleDescUpdate] = useState("");
  const [projectList, updateProjectList] = useState([]);
  const [formIsVisible, toggleForm] = useState(false);
  const { path } = useRouteMatch();
  const history = useHistory();

  const validateInputs = () => {
    return titleInput.length > 0 && descInput.length > 0;
  };

  useEffect(() => {
    async function getAllProjects() {
      const response = await Auth.fetch(
        "http://localhost:5000/projects/all"
      );
      if (!response) {
        console.log("no projects");
      }
      const projects = await response.json();
      updateProjectList(projects);
    }
    getAllProjects();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newProject = new ProjectModel(titleInput, descInput);
    const currentUser = {
      name: Auth.getUserData().name,
      _id: Auth.getUserData()._id,
    };

    const response = await Auth.fetch(
      "http://localhost:5000/projects/save-project",
      {
        body: JSON.stringify({ newProject, currentUser }),
        method: "POST",
      }
    );

    if (response) {
      const project = await response.json();
      updateProjectList((projectList) => projectList.concat(project));
      handleTitleUpdate("");
      handleDescUpdate("");
      toggleForm(false);
    }
  };

  const handleStatusChange = (projectId, status) => {
    let newProjectList = [...projectList];
    let projectIndex = newProjectList
      .map((project) => project._id)
      .indexOf(projectId);
    newProjectList[projectIndex].status = status;
    updateProjectList(newProjectList);
  };

  const redirectToProject = (_id) => {
    if (!_id) {
      return;
    }
    history.push(`/home/projects/${_id}`);
  };

  return (
    <div className="project-manager">
      <Switch>
        <Route
          exact
          path={path}
          render={() => {
            return (
              <ProjectList
                validateInputs={validateInputs}
                titleInput={titleInput}
                handleInput={(e) => handleInput(e)}
                handleSubmit={(e) => handleSubmit(e)}
                hideForm={() => toggleForm(false)}
                showForm={() => toggleForm(true)}
                formIsVisible={formIsVisible}
                projectList={projectList}
                redirectToProject={(_id) => redirectToProject(_id)}
              />
            );
          }}
        />
        <Route
          path="/home/projects/:projectId"
          render={() => (
            <Project
              handleStatusChange={(projectId, status) =>
                handleStatusChange(projectId, status)
              }
              validateInputs={validateInputs}
              titleInput={titleInput}
              hideForm={() => toggleForm(false)}
              showForm={() => toggleForm(true)}
              formIsVisible={formIsVisible}
              handleInput={(e) => handleInput(e)}
              users={props.users}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default ProjectManager;
