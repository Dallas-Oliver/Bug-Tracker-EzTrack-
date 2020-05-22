import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar";
import ProjectListItem from "../Projects/ProjectListItem";

function DashboardProjectList(props) {
  const [redirect, setRedirect] = useState(false);

  const redirectToProjectView = () => {
    setRedirect(!redirect);
  };

  return (
    <div className="dash-card dash-list project-list">
      {!redirect ? null : <Redirect to="/home/projects" />}
      <HeaderBar
        title="Open Projects"
        buttonText="View All"
        toggle={() => redirectToProjectView()}
      />
      {props.projects.length <= 0 ? (
        <p>No Projects!</p>
      ) : (
        <table>
          <thead>
            <tr className="table-header">
              <th>Name</th>
              <th>Status</th>
              <th>Number of Tickets</th>
            </tr>
          </thead>

          <tbody>
            {props.projects.length >= 1 ? (
              props.projects.map((project) => {
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
      )}
    </div>
  );
}

export default DashboardProjectList;
