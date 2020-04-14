import React from "react";

function AddForm(props) {
  return (
    <div className="add-form">
      <h3>{props.header}</h3>
      <hr></hr>
      <form
        className={`form ${props.formType}-form`}
        onSubmit={props.onSubmit}
      >
        <label htmlFor="title">{props.formType} Title</label>
        <input
          onChange={props.onTitleChange}
          value={props.titleValue}
          name="title"
          type="text"
        ></input>
        <label htmlFor="dev">Assigned Developer</label>
        <input
          onChange={props.onDevChange}
          value={props.devValue}
          name="dev"
          type="text"
        ></input>
        <label htmlFor="description">{props.formType} Description</label>
        <textarea
          type="text"
          name="description"
          value={props.descValue}
          onChange={props.onDescChange}
        ></textarea>
        <div className="buttons">
          <button
            disabled={!props.validateInputs()}
            className="button add"
            type="submit"
          >
            Add {props.formType}
          </button>
          <button className="button cancel" onClick={props.hideForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddForm;
