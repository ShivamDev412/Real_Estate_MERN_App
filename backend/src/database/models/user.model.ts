import mongoose, { Document } from "mongoose";

interface User extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  emailVerified: boolean;
  emailVerificationOTP:string;
  emailVerificationOTPExpires: Date | null;
  phoneNoVerified: boolean;
  phoneNoVerificationOTP:string;
  phoneNoVerificationOTPExpires: Date | null;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;
}

export interface UserDocument extends User {
  _doc: any;
}

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "FirstName is required"],
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username should be unique"],
    },
    phoneNo: {
      type: String,
      unique: [true, "PhoneNo should be unique"],
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
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationOTP: String,
    emailVerificationOTPExpires: Date,
    phoneNoVerified: {
      type: Boolean,
      default: false,
    },
    phoneNoVerificationOTP: String,
    phoneNoVerificationOTPExpires: Date,
    avatar: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
