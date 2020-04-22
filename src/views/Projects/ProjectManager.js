import React, { useState, useEffect } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
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

  function validateInputs() {
    return titleInput.length > 0 && descInput.length > 0;
  }

  async function getAllProjects() {
    const projects = await Auth.fetch(
      "http://localhost:5000/projects/all-projects"
    );
    if (projects) {
      updateProjectList(projects);
    } else {
      console.log("nooooo");
    }
  }

  useEffect(() => {
    if (projectList.length <= 0) {
      getAllProjects();
    }
  });

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

  async function handleSubmit(e) {
    e.preventDefault();

    let newProject = new ProjectModel(titleInput, descInput);
    const currentUser = {
      name: Auth.getUserData().name,
      _id: Auth.getUserData()._id,
    };

    const project = await Auth.fetch(
      "http://localhost:5000/projects/save-project",
      {
        body: JSON.stringify({ newProject, currentUser }),
        method: "POST",
      }
    );

    if (project) {
      updateProjectList([...projectList, project.project]);
      handleTitleUpdate("");
      handleDescUpdate("");
      toggleForm(false);
    }
  }

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
              />
            );
          }}
        />
        <Route
          path="/home/projects/:projectId"
          render={() => (
            <Project
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
