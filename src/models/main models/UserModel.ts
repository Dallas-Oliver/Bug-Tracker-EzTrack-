export default class User {
  userId!: string;
  email: string;
  name: string;
  companyName: string;
  password: string;
  assignedTickets: [];
  preferences: {};

  constructor(
    email: string,
    name: string,
    companyName: string,
    password: string
  ) {
    this.email = email;
    this.name = name;
    this.companyName = companyName;
    this.password = password;
    this.assignedTickets = [];
    this.preferences = {
      colorScheme: "",
    };
  }
}
