import React, { useState, useEffect } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import ProjectModel from "../../models/main models/ProjectModel";
import ProjectList from "./ProjectList";
import Project from "./Project";
import AddProject from "./AddProject";
import plusSVG from "./img/plus.svg";

function ProjectManager() {
  const { path } = useRouteMatch();

  const [titleInput, handleTitleUpdate] = useState("");
  const [descInput, handleDescUpdate] = useState("");
  const [devInput, handleDevUpdate] = useState("");
  const [projectList, updateProjectList] = useState([]);
  const [addProjectVisible, toggleAddProject] = useState(false);

  const validateInputs = () => {
    return (
      titleInput.length > 0 && descInput.length > 0 && devInput.length > 0
    );
  };

  const getAllProjects = () => {
    if (localStorage.getItem("id_token")) {
      let token = localStorage.getItem("id_token");

      fetch("http://localhost:5000/projects/all-projects", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `bearer ${token}`
        },
        method: "GET"
      })
        .then(response => {
          if (response.status >= 400) {
            console.log("no projects");
          }
          return response.json();
        })
        .then(json => {
          console.log(json.projects);
          updateProjectList(json.projects);
        });
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const handleInput = e => {
    const elementName = e.target.name;
    const value = e.target.value;

    switch (elementName) {
      case "project-title":
        handleTitleUpdate(value);
        break;
      case "project-dev":
        handleDevUpdate(value);
        break;
      case "project-description":
        handleDescUpdate(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let newProject = new ProjectModel(titleInput, descInput, devInput);
    updateProjectList([...projectList, newProject]);

    let response = await fetch(
      "http://localhost:5000/projects/save-project",
      {
        headers: { "content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(newProject),
        method: "POST"
      }
    );
    let json = await response.json();
    console.log(json);
    handleTitleUpdate("");
    handleDescUpdate("");
    toggleAddProject(false);
  };

  return (
    <div className="project-manager">
      <div className="top-bar">
        <h1>All Projects</h1>
        {addProjectVisible ? null : (
          <button
            className="add-project-button"
            onClick={() => toggleAddProject(true)}
          >
            New Project{" "}
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 29 29"
              >
                <g transform="translate(-1507 -684)">
                  <line
                    y2="24"
                    transform="translate(1521.5 686.5)"
                    fill="none"
                    stroke="#141414"
                    strokeLinecap="round"
                    strokeWidth="5"
                  />
                  <line
                    y1="24"
                    transform="translate(1533.5 698.5) rotate(90)"
                    fill="none"
                    stroke="#141414"
                    strokeLinecap="round"
                    strokeWidth="5"
                  />
                </g>
              </svg>
            }
          </button>
        )}
      </div>

      <Switch>
        <Route
          exact
          path={path}
          render={() => {
            return (
              <ProjectList
                addProjectVisible={addProjectVisible}
                projectList={projectList}
              />
            );
          }}
        />
        <Route
          path="/home/project/:projectid"
          render={() => <Project />}
        />
      </Switch>

      <AddProject
        validateInputs={validateInputs}
        addProjectVisible={addProjectVisible}
        titleValue={titleInput}
        onTitleChange={e => handleInput(e)}
        onDevChange={e => handleInput(e)}
        onSubmit={e => handleSubmit(e)}
        closeAddForm={() => toggleAddProject(false)}
        descValue={descInput}
        onDescChange={e => handleInput(e)}
      />
    </div>
  );
}

export default ProjectManager;
