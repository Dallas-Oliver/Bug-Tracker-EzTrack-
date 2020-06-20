import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import GarbageIcon from "../views/projects/img/garbage-icon";

interface IHeaderBarProps {
  title: string;
  formIsVisible?: boolean;
  toggle: () => void;
  buttonText: string;
  projectStatus?: string;
  delete?: () => void;
  projectOrTicketicketVisible?: boolean;
}

export default function HeaderBar(props: IHeaderBarProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="header-bar">
      <h4 style={{ color: theme.textColor }}>{props.title}</h4>
      <div>
        {props.projectOrTicketicketVisible ? (
          <span
            onClick={props.delete}
            style={{
              cursor: "pointer",
              marginRight: "10px",
            }}>
            <GarbageIcon />
          </span>
        ) : null}

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
    </div>
  );
}
