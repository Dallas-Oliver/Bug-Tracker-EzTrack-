import React from "react";
import ThemeContext from "../Contexts/ThemeContext";

export default function HeaderBar(props) {
  return (
    <div className="header-bar">
      <h4>{props.title}</h4>
      <ThemeContext.Consumer>
        {
          (context) => <p>{context.state.colorScheme}</p>
          // props.formIsVisible ? null : (
          //   <button className="add-project-button" onClick={props.toggle}>
          //     {props.buttonText}
          //   </button>
          // )
        }
      </ThemeContext.Consumer>
    </div>
  );
}
