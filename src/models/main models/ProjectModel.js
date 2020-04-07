import { v4 as uuidv4 } from "uuid";

export default class Project {
  constructor(name, description, assignedDeveloper) {
    this.name = name;
    this.uid = uuidv4();
    this.dateCreated = `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`;
    this.numberOfTickets = 0;
    this.projectDescription = description;
    this.Tickets = [];
    this.assignedDevelopers = [assignedDeveloper];
    this.status = "Open";
    this.dueDate = "";
  }

  addUser(developer) {
    if (developer) {
      this.assignedDevelopers.push(developer);
    }
    return developer;
  }

  removeUser(developer) {
    if (developer) {
      this.assignedDevelopers.splice(
        this.assignedDevelopers.indexOf(developer),
        1
      );
    }
    return developer;
  }
}
