import { v4 as uuidv4 } from "uuid";
import User from "./UserModel";
import moment from "moment";

export default class Ticket {
  _id!: string;
  name: string;
  dateCreated: string;
  description: string;
  history: any[];
  comments: any[];
  createdBy: User;
  projectId: string;
  assignedUser: User;
  priority: string;
  status: string;

  constructor(title: string, description: string, assignedUser: User) {
    this.name = title;
    this.dateCreated = moment().format("MMMM Do YYYY, h:mm:ss a");
    this.description = description;
    this.history = [];
    this.comments = [];
    this.createdBy = assignedUser;
    this.projectId = "";
    this.assignedUser = assignedUser;
    this.priority = "High";
    this.status = "Open";
  }
}
