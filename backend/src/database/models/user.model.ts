import mongoose, { Document } from "mongoose";

interface User extends Document {
  username: string;
  email: string;
  password: string;
}
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username should be unique"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email should be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password should be at least 8 characters long"],
      // maxlength: [20, "Password should be at most 20 characters long"],
    },
  },
  { timestamps: true }
);
const User = mongoose.model<User>("User", UserSchema);
export default User;
