import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/user.model";
import bcrypt from "bcrypt";
import { handleError } from "../utils/error";
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
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error: any) {
    next(error);
    // response.status(500).json({ message: error.message });
    // console.log(error);
  }
};

export const signIn = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      next(handleError(500, "User with that email does not exist"));
    else {
      const validPassword = bcrypt.compareSync(
        password,
        existingUser?.password
      );
      if (!validPassword) next(handleError(500, "Invalid password"));
      else {
        const token = jwt.sign(
          { id: existingUser._id },
          process.env.JWT_SECRET as string
        );
        response
          // .cookie("access-token", token, { httpOnly: true })
          .status(200)
          .json({
            success: true,
            message: "User logged in successfully",
            data: {
              user: {
                email: existingUser.email,
                username: existingUser.username,
              },
              token: token,
            },
          });
      }
    }
  } catch (error: any) {
    next(error);
  }
};
