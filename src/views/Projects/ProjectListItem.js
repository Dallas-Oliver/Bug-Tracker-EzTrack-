import React from "react";

export default function ProjectListItem(props) {
  return (
    <tr className="project-list-item">
      <td>
        <p
          className="project-link"
          onClick={() => props.redirectToProject(props._id)}
        >
          {props.name}
        </p>
      </td>

      <td
        className={`status ${props.status === "Open" ? "open" : "closed"}`}
      >
        {props.status}
      </td>
      <td>{props.numberOfTickets}</td>
    </tr>
  );
}
