import { v4 as uuidv4 } from "uuid";

export default class Ticket {
  constructor(title, description, projectid) {
    this.name = title;
    this.uid = uuidv4();
    this.dateCreated = Date.now();
    this.description = description;
    this.history = [];
    this.comments = [];
    this.createdBy = undefined;
    this.projectid = projectid;
    this.priority = "High";
    this.status = "Open";
    this.possibleStatuses = ["Open", "Closed", "Reopened"];
    this.possiblePriorityLevels = ["High", "Medium", "Low"];
  }

  updateStatus(newStatus) {
    if (this.possibleStatuses.indexOf(newStatus) !== -1) {
      this.status = newStatus;
    } else {
      throw "Not a valid status!";
    }
  }

  updatePriority(newPriority) {
    if (this.possiblePriorityLevels.indexOf(newPriority) !== -1) {
      this.priority = newPriority;
    } else {
      throw "Not a valid prioritry level!";
    }
  }

  // addComment(newComment) {
  //   let comment = new Comment(newComment);
  //   return comment;
  // }
}
