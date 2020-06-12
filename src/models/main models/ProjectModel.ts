import User from "./UserModel";
import moment from "moment";

export class Project {
  _id!: string;
  name: string;
  dateCreated: string;
  createdBy: User;
  numberOfTickets: number;
  projectDescription: string;
  assignedUsers: User[];
  status: string;
  dueDate: Date | null;
  constructor(name: string, description: string, assignedUser: User) {
    this.name = name;
    this.dateCreated = moment().format("MMMM Do YYYY, h:mm:ss a");
    this.createdBy = assignedUser;
    this.numberOfTickets = 0;
    this.projectDescription = description;
    this.assignedUsers = [assignedUser];
    this.status = "Open";
    this.dueDate = null;
  }
}

// interface Addable<T> {
//   add(other: T): T;
// }

// class Thing<T> implements Addable<Thing<T>> {
//   value: T;
//   constructor(value: T) {
//     this.value = value;
//   }

//   add(other: Thing<T>): Thing<T> {
//     const newValue: T = this.value + other.value;
//     return new Thing<T>(newValue);
//   }
// }

// class NumberThing implements Addable<NumberThing> {
//   value: number;
//   constructor(value: number) {
//     this.value = value;
//   }

//   add(other: NumberThing): NumberThing {
//     return new NumberThing(this.value + other.value);
//   }
// }

// class StringThing implements Addable<StringThing> {
//   value: string;
//   constructor(value: string) {
//     this.value = value;
//   }

//   add(other: StringThing): StringThing {
//     return new StringThing(this.value + other.value);
//   }
// }

// class Adder {
//   addTheThings<T extends Addable<T>>(thingsToAdd: T[]): T {
//     return thingsToAdd.reduce((a, b) => a.add(b));
//   }
// }

// const test = new StringThing("a");
// const test2 = new StringThing("b");

// const num1 = new NumberThing(0);
// const num2 = new NumberThing(1);

// const ultimateAdder = new Adder();

// ultimateAdder.addTheThings([test, test2]);

// ultimateAdder.addTheThings([num1, num2]);
