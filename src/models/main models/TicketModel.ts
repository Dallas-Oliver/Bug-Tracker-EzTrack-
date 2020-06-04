import { v4 as uuidv4 } from "uuid";
import User from "./UserModel";

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
    this.dateCreated = `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`;
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
