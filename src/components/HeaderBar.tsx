import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

interface IHeaderBarProps {
  title: string;
  formIsVisible?: boolean;
  toggle: () => void;
  buttonText: string;
  projectStatus?: string;
}

export default function HeaderBar(props: IHeaderBarProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="header-bar">
      <h4 style={{ color: theme.textColor }}>{props.title}</h4>
      {props.formIsVisible ? null : (
        <button
          disabled={props.projectStatus === "Closed"}
          style={
            props.projectStatus === "Open" || props.projectStatus === undefined
              ? {
                  background: theme.background,
                  color: theme.textColor,
                  borderColor: theme.buttonBorder,
                }
              : {
                  background: theme.background,
                  color: "gray",
                  borderColor: "gray",
                  opacity: "0.5",
                }
          }
          className={`add-project-button ${
            props.projectStatus === "Closed" ? "disabled" : ""
          }`}
          onClick={props.toggle}>
          {props.buttonText}
        </button>
      )}
    </div>
  );
}
