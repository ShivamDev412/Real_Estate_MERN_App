import mongoose, { Document } from "mongoose";

interface User extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
}
interface UserDocument extends User {
  _doc: any;
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
    },
    avatar: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg",
    },
  },
  { timestamps: true }
);
const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
