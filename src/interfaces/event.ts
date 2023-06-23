import { IUser } from "./User";

export interface IEvent {
  _id: string;
  title: string;
  notes: string;
  end: Date;
  start: Date;
  user: string | IUser;
}
