// import User from "./UserModel";
import uuid from "uuid/v4";

export default class Ticket {
  constructor(
    name,
    summary,
    description,
    reproduceDesc,
    reproducable,
    submitter,
    dev,
    projectid,
    type
  ) {
    this.name = name;
    this.uid = uuid();
    this.dateCreated = Date.now();
    this.summary = summary;
    this.description = description;
    this.history = [];
    this.reproduceDesc = reproduceDesc;
    this.reproducable = reproducable;
    this.comments = [];
    this.submitter = submitter;
    this.assignedDeveloper = dev;
    this.projectid = projectid;
    this.priority = "High";
    this.status = "Open";
    this.type = type;
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
