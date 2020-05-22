import { atom } from "recoil";

const projectInfo = atom({
  key: "projectInfo",
  default: {
    name: undefined,
    dateCreated: undefined,
    createdBy: undefined,
    numberOfTickets: undefined,
    projectDescription: undefined,
    assignedUsers: [],
    status: "Open",
    dueDate: undefined,
  },
});

export default projectInfo;

/*
 this.name = name;
    this.uid = uuidv4();
    this.dateCreated = `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`;
    this.createdBy = undefined;
    this.numberOfTickets = 0;
    this.projectDescription = description;
    this.assignedUsers = [assignedUser];
    this.status = "Open";
    this.dueDate = "";
*/
