import React from "react";

export default function HeaderBar(props) {
  return (
    <div className="header-bar">
      <h3>{props.title}</h3>
      {props.formIsVisible ? null : (
        <button className="add-project-button" onClick={props.toggle}>
          {props.buttonText}
        </button>
      )}
    </div>
  );
}
