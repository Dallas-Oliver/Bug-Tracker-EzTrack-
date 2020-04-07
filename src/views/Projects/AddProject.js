import React from "react";

function AddProjects(props) {
  return (
    <div className="add-project">
      <h3>New Project</h3>
      <hr></hr>
      <form className="form" onSubmit={props.onSubmit}>
        <label htmlFor="project-title">Project Title</label>
        <input
          onChange={props.onTitleChange}
          value={props.titleValue}
          name="project-title"
          type="text"
        ></input>
        <label htmlFor="project-dev">Assigned Developer</label>
        <input
          onChange={props.onDevChange}
          value={props.devValue}
          name="project-dev"
          type="text"
        ></input>
        <label htmlFor="project-description">Project Description</label>
        <textarea
          type="text"
          name="project-description"
          value={props.descValue}
          onChange={props.onDescChange}
        ></textarea>
        <div className="buttons">
          <button
            disabled={!props.validateInputs()}
            className="button add"
            type="submit"
          >
            Add Project
          </button>
          <button className="button cancel" onClick={props.closeAddForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProjects;
