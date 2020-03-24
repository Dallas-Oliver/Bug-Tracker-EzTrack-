import { v4 as uuidv4 } from "uuid";

export default class Project {
  constructor(name, description) {
    this.name = name;
    this.uid = uuidv4();
    this.dateCreated = `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`;
    this.numberOfTickets = 0;
    this.projectDescription = description;
    this.Tickets = [];
    this.assignedUsers = [];
  }

  addUser(user) {
    if (user) {
      this.assignedUsers.push(user);
    }
  }

  removeUser() {}
}
