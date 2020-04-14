import React from "react";

export default function HeaderBar(props) {
  //props: title, formIsVisible, toggle, buttontext

  return (
    <div className="header-bar">
      <h1>{props.title}</h1>
      {props.formIsVisible ? null : (
        <button className="add-project-button" onClick={props.showForm}>
          {props.buttonText}{" "}
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 29 29"
            >
              <g transform="translate(-1507 -684)">
                <line
                  y2="24"
                  transform="translate(1521.5 686.5)"
                  fill="none"
                  stroke="#141414"
                  strokeLinecap="round"
                  strokeWidth="5"
                />
                <line
                  y1="24"
                  transform="translate(1533.5 698.5) rotate(90)"
                  fill="none"
                  stroke="#141414"
                  strokeLinecap="round"
                  strokeWidth="5"
                />
              </g>
            </svg>
          }
        </button>
      )}
    </div>
  );
}
