import React, { useState } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import ProjectModel from "../models/main models/ProjectModel";
import ProjectList from "../components/ProjectList";
import Project from "../views/Project";
import AddProject from "../components/AddProject";

function ProjectManager() {
  const { path } = useRouteMatch();

  const [nameInput, handleNameUpdate] = useState("project 1");
  const [descInput, handleDescUpdate] = useState("big project");
  const [projectList, updateProjectList] = useState([]);

  const handleNameChange = e => {
    handleNameUpdate(e.target.value);
  };

  const handleDescChange = e => {
    handleDescUpdate(e.target.value);
  };

  const handleSubmit = async (projectName, projectDesc) => {
    let newProject = new ProjectModel(projectName, projectDesc);
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
    handleNameUpdate("");
    handleDescUpdate("");
  };

  return (
    <div>
      <h1>Project Manager</h1>
      <AddProject
        nameValue={nameInput}
        onNameChange={e => handleNameChange(e)}
        onSubmit={() => handleSubmit(nameInput, descInput)}
        descValue={descInput}
        onDescChange={e => handleDescChange(e)}
      />
      <Switch>
        <Route
          exact
          path={path}
          render={() => <ProjectList projectList={projectList} />}
        />
        <Route
          path="/home/project/:projectid"
          render={() => <Project />}
        />
      </Switch>
    </div>
  );
}

export default ProjectManager;
