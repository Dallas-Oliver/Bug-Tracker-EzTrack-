import { v4 as uuidv4 } from "uuid";

export default class Project {
  constructor(name, description, assignedUser) {
    this.name = name;
    this.uid = uuidv4();
    this.dateCreated = `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`;
    this.numberOfTickets = 0;
    this.projectDescription = description;
    this.assignedUsers = [assignedUser];
    this.status = "Open";
    this.dueDate = "";
  }

  addUser(user) {
    if (user) {
      this.assignedDevelopers.push(user);
    }
    return user;
  }

  removeUser(user) {
    if (user) {
      this.assignedDevelopers.splice(
        this.assignedDevelopers.indexOf(user),
        1
      );
    }
    return user;
  }
}
