import React from "react";

export default function HeaderBar(props) {
  //props: title, formIsVisible, toggle, buttontext

  return (
    <div className="header-bar">
      <h1>{props.title}</h1>
      {props.formIsVisible ? null : (
        <button className="add-project-button" onClick={props.toggle}>
          {props.buttonText}
        </button>
      )}
    </div>
  );
}
