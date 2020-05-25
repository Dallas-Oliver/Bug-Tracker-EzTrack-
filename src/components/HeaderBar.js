import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function HeaderBar(props) {
  const { colorScheme, setColorScheme } = useContext(ThemeContext);

  return (
    <div className="header-bar">
      <h4>{props.title}</h4>
      {props.formIsVisible ? null : (
        <button
          style={{ background: colorScheme, color: "white" }}
          className="add-project-button"
          onClick={props.toggle}
        >
          {props.buttonText}
        </button>
      )}
    </div>
  );
}
