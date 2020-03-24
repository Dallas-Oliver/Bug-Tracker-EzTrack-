// import Project from "./ProjectModel";
// import Ticket from "./TicketModel";
import { v4 as uuidv4 } from "uuid";

export default class User {
  constructor(name, password, roles) {
    this.name = name;
    this.password = password;
    this.userId = uuidv4();
    this.roles = roles;
    this.assignedTickets = [];
  }

  // submitTicket(
  //   name,
  //   summary,
  //   description,
  //   reproduceDesc,
  //   reproducable,
  //   submitter,
  //   dev,
  //   projectid,
  //   type
  // ) {
  //   let ticket = new Ticket(
  //     name,
  //     projectid,
  //     summary,
  //     description,
  //     reproduceDesc,
  //     reproducable,
  //     submitter,
  //     dev,
  //     type
  //   );
  // }
}
