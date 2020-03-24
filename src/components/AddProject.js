import React from "react";

function AddProjects(props) {
  return (
    <div className="add-projects">
      <input
        onChange={props.onNameChange}
        value={props.nameValue}
        name="project-name"
        type="text"
        placeholder="project name"
      ></input>
      <input
        type="text"
        name="project-description"
        placeholder="project description"
        value={props.descValue}
        onChange={props.onDescChange}
      ></input>
      <button onClick={props.onSubmit} type="submit">
        Add Project
      </button>
    </div>
  );
}

export default AddProjects;
