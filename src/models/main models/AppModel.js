import Project from "./ProjectModel";
import User from "./UserModel";

export default class AppModel {
  constructor() {
    this.projectList = [];
    this.registeredUsers = [];
  }

  addProject(projectName) {
    let project = new Project(projectName);
    this.projectList.push(project);
  }

  removeProject(uid) {
    this.projectList.forEach(project => {
      if (project.uid === uid) {
        this.projectList.splice(this.projectList.indexOf(project), 1);
      }
    });

    return this.projectList;
  }

  registerNewUser(userName, roles) {
    let user = new User(userName, roles);
    this.registeredUsers.push(user);
  }

  removeUser() {}
}
