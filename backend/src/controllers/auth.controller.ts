import { Request, Response, NextFunction } from "express";
import User from "../database/models/user.model";
import bcrypt from "bcrypt";
export const signup = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username, password, email } = request.body;
  const existingUser = await User.findOne({ username });
  const existingEmail = await User.findOne({ email });
  if (existingUser) {
    next({
      status: 500,
      message: "User with that username already exists",
    });
  }
  if (existingEmail) {
    next({
      status: 500,
      message: "User with that email already exists",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = new User({ username, password: hashedPassword, email });
  try {
    await newUser.save();
    response.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error: any) {
    next(error);
    // response.status(500).json({ message: error.message });
    // console.log(error);
  }
};
