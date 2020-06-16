import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

interface IHeaderBarProps {
  title: string;
  formIsVisible?: boolean;
  toggle: () => void;
  buttonText: string;
}

export default function HeaderBar(props: IHeaderBarProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="header-bar">
      <h4 style={{ color: theme.textColor }}>{props.title}</h4>
      {props.formIsVisible ? null : (
        <button
          style={{ background: theme.background, color: theme.textColor }}
          className="add-project-button"
          onClick={props.toggle}>
          {props.buttonText}
        </button>
      )}
    </div>
  );
}
