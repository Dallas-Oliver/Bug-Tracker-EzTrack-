import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function HeaderBar(props) {
  const { theme, toggleThemes } = useContext(ThemeContext);
  console.log(theme);

  return (
    <div className="header-bar">
      <h4>{props.title}</h4>
      {props.formIsVisible ? null : (
        <button
          style={{ background: theme.background, color: theme.textColor }}
          className="add-project-button"
          onClick={props.toggle}
        >
          {props.buttonText}
        </button>
      )}
    </div>
  );
}
