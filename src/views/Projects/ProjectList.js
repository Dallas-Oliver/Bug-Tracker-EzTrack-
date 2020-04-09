import React from "react";
import ProjectListItem from "./ProjectListItem";

function ProjectList(props) {
  return (
    <div
      className={`project-list ${props.addProjectVisible ? "blur" : ""}`}
    >
      {props.projectList.length >= 1 ? (
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Project Status</th>
              <th>Number of tickets</th>
            </tr>
          </thead>
          <tbody>
            {props.projectList.length >= 1 ? (
              props.projectList.map(project => {
                return (
                  <ProjectListItem
                    key={project._id}
                    id={project._id}
                    name={project.name}
                    status={project.status}
                    numberOfTickets={project.numberOfTickets}
                  />
                );
              })
            ) : (
              <p>Create a Project!</p>
            )}
          </tbody>
        </table>
      ) : (
        <p>Create a Project!</p>
      )}
    </div>
  );
}

export default ProjectList;
