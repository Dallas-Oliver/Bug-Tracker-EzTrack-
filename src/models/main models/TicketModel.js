import { v4 as uuidv4 } from "uuid";

export default class Ticket {
  constructor(title, description, assignedUser) {
    this.name = title;
    this.uid = uuidv4();
    this.dateCreated = `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`;
    this.description = description;
    this.history = [];
    this.comments = [];
    this.createdBy = undefined;
    this.projectid = "";
    this.assignedUser = assignedUser;
    this.priority = "High";
    this.status = "Open";
    this.possibleStatuses = ["Open", "Closed", "Reopened"];
    this.possiblePriorityLevels = ["High", "Medium", "Low"];
  }
}
