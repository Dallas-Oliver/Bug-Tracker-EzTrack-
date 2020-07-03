import User from "./UserModel";
import moment from "moment";

export class Project {
  _id!: string;
  name: string;
  dateCreated: string;
  createdBy: string;
  projectDescription: string;
  assignedUsers: User[];
  status: string;
  dueDate: Date | null;
  tickets: string[];

  constructor(name: string, description: string, assignedUser: User) {
    this.name = name;
    this.dateCreated = moment().format("MMMM Do YYYY, h:mm:ss a");
    this.createdBy = assignedUser.name;
    this.projectDescription = description;
    this.assignedUsers = [assignedUser];
    this.status = "Open";
    this.dueDate = null;
    this.tickets = [];
  }
}
