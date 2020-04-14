import React, { useState, useEffect } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import ProjectModel from "../../models/main models/ProjectModel";
import TicketModel from "../../models/main models/TicketModel";
import ProjectList from "./ProjectList";
import Project from "./Project";

import AuthService from "../../auth/AuthService";

function ProjectManager() {
  const [titleInput, handleTitleUpdate] = useState("");
  const [descInput, handleDescUpdate] = useState("");
  const [devInput, handleDevUpdate] = useState("");
  const [projectList, updateProjectList] = useState([]);
  const [formIsVisible, toggleForm] = useState(false);
  const { path } = useRouteMatch();
  const Auth = new AuthService();

  function validateInputs() {
    return (
      titleInput.length > 0 && descInput.length > 0 && devInput.length > 0
    );
  }

  async function getAllProjects() {
    if (Auth.loggedIn()) {
      const token = Auth.getToken();
      const response = await fetch(
        "http://localhost:5000/projects/all-projects",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
          },
          method: "GET",
        }
      );

      const json = await response.json();

      if (json) {
        updateProjectList(json.projects);
      }
    }
  }

  useEffect(() => {
    getAllProjects();
  }, []);

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

  async function handleSubmit(e) {
    e.preventDefault();

    let newProject = new ProjectModel(titleInput, descInput, devInput);

    const response = await fetch(
      "http://localhost:5000/projects/save-project",
      {
        headers: { "content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(newProject),
        method: "POST",
      }
    );

    const json = await response.json();
    if (json) {
      updateProjectList([...projectList, json.project]);
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
          path="/home/projects/project/:projectId"
          render={() => (
            <Project
              validateInputs={validateInputs}
              titleInput={titleInput}
              hideForm={() => toggleForm(false)}
              showForm={() => toggleForm(true)}
              formIsVisible={formIsVisible}
              handleInput={(e) => handleInput(e)}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default ProjectManager;
