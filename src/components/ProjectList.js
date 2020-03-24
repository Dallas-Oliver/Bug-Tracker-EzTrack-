import React from "react";
import ProjectListItem from "./ProjectListItem";

function ProjectList(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Project description</th>
          <th>Project Date</th>
        </tr>
      </thead>
      <tbody>
        {props.projectList.map(project => {
          return (
            <ProjectListItem
              key={project.uid}
              id={project.uid}
              name={project.name}
              description={project.projectDescription}
              dateCreated={project.dateCreated}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default ProjectList;
