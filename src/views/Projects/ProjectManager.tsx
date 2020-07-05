import React, { useState, useEffect, useContext } from "react";
import { Route, useRouteMatch, Switch, useHistory } from "react-router-dom";
import { Project as ProjectModel } from "../../models/main models/ProjectModel";
import User from "../../models/main models/UserModel";
import ProjectList from "./ProjectList";
import Project from "./Project";
import { AuthService as Auth } from "../../auth/AuthService";
import { ThemeContext } from "../../Contexts/ThemeContext";
import AddForm from "../../components/AddForm";
import produce from "immer";

interface IProjectMangerProps {
  users: User[];
}

function ProjectManager(props: IProjectMangerProps) {
  const [titleInput, handleTitleChange] = useState("");
  const [descInput, handleDescChange] = useState("");
  const [projectList, updateProjectList] = useState<ProjectModel[]>([]);
  const [formIsVisible, toggleForm] = useState(false);

  const { theme } = useContext(ThemeContext);
  const { path } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    async function getAllProjects() {
      const response = await Auth.fetch("/projects/all");
      if (!response) {
        console.log("no projects");
      }
      const projects = await response.json();
      if (mounted) {
        updateProjectList(projects);
      }
    }
    getAllProjects();

    return function unMount() {
      mounted = false;
    };
  }, []);

  const handleSubmit = async () => {
    const user: User = await Auth.getUserData();
    console.log(user);

    const newProject = new ProjectModel(titleInput, descInput, user);

    const response = await Auth.fetch("/projects/save-project", {
      body: JSON.stringify({ newProject, currentUser: user }),
      method: "POST",
    });

    if (response) {
      const project: ProjectModel = await response.json();
      updateProjectList((projectList) => projectList.concat(project));

      handleTitleChange("");
      handleDescChange("");
      toggleForm(false);
    }
  };

  const handleProjectStatusChange = (projectId: string, status: string) => {
    let newProjectList: ProjectModel[] = [...projectList];
    let projectIndex = newProjectList
      .map((project: ProjectModel) => project._id)
      .indexOf(projectId);
    newProjectList[projectIndex].status = status;
    updateProjectList(newProjectList);
  };

  const redirectToProject = (_id: string) => {
    if (!_id) {
      return;
    }
    history.push(`/home/projects/${_id}`);
  };

  const deleteCurrentProject = async (projectId: string) => {
    const response = await Auth.fetch(`/projects/delete-project/${projectId}`);
    const updatedAndSavedProjectList = await response.json();
    updateProjectList(updatedAndSavedProjectList);
    history.push(`/home/projects`);
  };

  const deleteProjectListItems = async (selectedItems: string[]) => {
    //delete projects from project list based on a passed in id list
    const projectIdsWithoutSelectedItems = produce(
      projectList,
      (projectListCopy) => {
        return projectListCopy
          .filter((project) => selectedItems.indexOf(project._id) === -1)
          .map((project) => project._id);
      }
    );

    console.log(projectIdsWithoutSelectedItems);

    const response = await Auth.fetch(`/projects/update-project-list`, {
      method: "POST",
      body: JSON.stringify({ projectIdsWithoutSelectedItems, selectedItems }),
    });

    const updatedAndSavedProjectList = await response.json();
    console.log(updatedAndSavedProjectList);
    updateProjectList(updatedAndSavedProjectList);
  };

  return (
    <div
      style={{ background: theme.background, color: theme.colorText }}
      className="project-manager">
      <Switch>
        <Route
          exact
          path={path}
          render={() => {
            return (
              <ProjectList
                titleInput={titleInput}
                descInput={descInput}
                formIsVisible={formIsVisible}
                projectList={projectList}
                users={props.users}
                handleDescChange={(title) => handleDescChange(title)}
                handleSubmit={() => handleSubmit()}
                hideForm={() => toggleForm(false)}
                showForm={() => toggleForm(true)}
                redirectToProject={(_id) => redirectToProject(_id)}
                handleTitleChange={(title) => {
                  handleTitleChange(title);
                }}
                deleteProjectListItems={(selectedItems) =>
                  deleteProjectListItems(selectedItems)
                }
              />
            );
          }}
        />
        <Route
          path="/home/projects/:projectId"
          render={() => (
            <Project
              users={props.users}
              deleteCurrentProject={(projectId) => deleteCurrentProject(projectId)}
              handleProjectStatusChange={(projectId: string, status: string) =>
                handleProjectStatusChange(projectId, status)
              }
            />
          )}
        />
      </Switch>
      {formIsVisible ? (
        <AddForm
          header="New Project"
          formType="Project"
          titleValue={titleInput}
          descValue={descInput}
          onTitleChange={(title) => {
            handleTitleChange(title);
          }}
          onDescChange={(title) => handleDescChange(title)}
          onSubmit={() => handleSubmit()}
          hideForm={() => toggleForm(false)}
          users={props.users}
        />
      ) : null}
    </div>
  );
}

export default ProjectManager;
