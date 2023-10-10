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
      data: {
        user: {
          email: newUser.email,
          username: newUser.username,
          avatar: newUser.avatar,
          id: newUser._id,
        },
      },
    });
  } catch (error: any) {
    next(error);
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
                avatar: existingUser.avatar,
                id: existingUser._id,
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
export const googleSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, image } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log("if");
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string
      );
      const { password, ...rest } = user._doc;
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
          user: {
            avatar: rest.avatar,
            email: rest.email,
            username: rest.username,
            id: rest._id,
          },
          token: token,
        },
      });
    } else {
      const newPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      const newUser = new User({
        email,
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        password: hashedPassword,
        avatar: image,
      });
      await newUser.save();
      if (newUser) {
        const token = jwt.sign(
          { id: newUser._id },
          process.env.JWT_SECRET as string
        );
        const { password: pass, ...rest } = newUser._doc;
        res.status(200).json({
          success: true,
          message: "User logged in successfully",
          data: {
            user: {
              avatar: rest.avatar,
              email: rest.email,
              username: rest.username,
              id: rest._id,
            },
            token: token,
          },
        });
      } else {
        next(handleError(500, "Something went wrong"));
      }
    }
  } catch (error) {
    next(error);
  }
};
