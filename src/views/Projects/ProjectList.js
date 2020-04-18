import React from "react";
import ProjectListItem from "./ProjectListItem";
import HeaderBar from "../../components/HeaderBar";
import AddForm from "../../components/AddForm";

function ProjectList(props) {
  return (
    <div className="project-list">
      <HeaderBar
        title="All Projects"
        formIsVisible={props.formIsVisible}
        showForm={props.showForm}
        buttonText="New Project"
      />
      {props.projectList.length >= 1 ? (
        <table
          className={`project-table ${props.formIsVisible ? "blur" : ""}`}
        >
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Project Status</th>
              <th>Number of tickets</th>
            </tr>
          </thead>
          <tbody>
            {props.projectList.length >= 1 ? (
              props.projectList.map((project) => {
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
      {props.formIsVisible ? (
        <AddForm
          header="New Project"
          formType="Project"
          validateInputs={props.validateInputs}
          titleValue={props.titleInput}
          onTitleChange={props.handleInput}
          onSubmit={props.handleSubmit}
          hideForm={props.hideForm}
          descValue={props.descInput}
          onDescChange={props.handleInput}
          users={props.users}
          addUser={props.addUser}
        />
      ) : null}
    </div>
  );
}

export default ProjectList;
