import User from "./UserModel";
import produce from "immer";
import moment from "moment";

export default class Ticket {
  _id!: string;
  name: string;
  dateCreated: string;
  description: string;
  history: any[];
  comments: any[];
  createdBy: string;
  projectId: string;
  assignedUser: string;
  priority: string;
  status: string;

  constructor(
    title: string,
    description: string,
    currentUser: User,
    assignedUser: string
  ) {
    this.name = title;
    this.dateCreated = moment().format("MMMM Do YYYY, h:mm:ss a");
    this.description = description;
    this.history = [];
    this.comments = [];
    this.createdBy = currentUser.name;
    this.projectId = "";
    this.assignedUser = assignedUser;
    this.priority = "High";
    this.status = "Open";
  }
}
