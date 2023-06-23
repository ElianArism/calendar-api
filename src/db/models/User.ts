import { Schema, model } from "mongoose";
import { IUser } from "../../interfaces/User";

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.method("toJSON", function () {
  const { __V, ...object } = this.toObject();
  return object;
});

const User = model<IUser>("User", UserSchema);

export default User;
