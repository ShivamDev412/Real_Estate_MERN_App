import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/models/user.model";
import { handleError } from "../utils/error";
import { UserDocument } from "../database/models/user.model";
import { transporter } from "../utils/constant";
import {
  resetPasswordTemplate,
  resetPasswordSuccessTemplate,
} from "../utils/mailTemplates";

export const signup = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username, password, email, firstName, lastName, phoneNo } =
    request.body;
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
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    firstName,
    lastName,
    phoneNo,
  });
  try {
    await newUser.save();
    response.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          username: newUser.username,
          avatar: newUser.avatar,
          phoneNo: newUser.phoneNo,
          emailVerified: newUser.emailVerified,
          phoneNoVerified: newUser.phoneNoVerified,
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
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                phoneNo: existingUser.phoneNo,
                email: existingUser.email,
                username: existingUser.username,
                avatar: existingUser.avatar,
                emailVerified: existingUser.emailVerified,
                phoneNoVerified: existingUser.phoneNoVerified,
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
  const { email, firstName, lastName, image } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
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
            firstName: rest.firstName,
            lastName: rest.lastName,
            phoneNo: rest.phoneNo,
            avatar: rest.avatar,
            email: rest.email,
            username: rest.username,
            emailVerified: rest.emailVerified,
            phoneNoVerified: rest.phoneNoVerified,
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
        firstName,
        lastName,
        username:
          firstName.toLowerCase() + Math.random().toString(36).slice(-4),
        password: hashedPassword,
        phoneNo: "",
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
              firstName: rest.firstName,
              lastName: rest.lastName,
              emailVerified: rest.emailVerified,
              phoneNoVerified: rest.phoneNoVerified,
              phoneNo: "",
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
// Make sure to import the 'crypto' module

export const forgotPassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email } = request.body;
  try {
    const user: UserDocument | null = await User.findOne({ email });
    if (!user) {
      return next(handleError(404, "User with that email does not exist"));
    } else {
      const resetToken = crypto.randomBytes(16).toString("hex");
      user.resetPasswordToken = resetToken;
      // Expire in 10 minutes
      user.resetPasswordExpires = new Date(Date.now() + 600000);
      await user.save();
      const info = await transporter.sendMail({
        from: 'Paradise Estate "shivam412978143@gmail.com"',
        to: email,
        subject: "Password Reset",
        html: resetPasswordTemplate(
          user.firstName,
          `http://localhost:5173/reset-password/${resetToken}`
        ),
      });
      if (info) {
        response.status(200).json({
          success: true,
          message: "Email has been sent to your email address",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
export const resetPassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const resetToken = request.params.resetToken;
    const { newPassword, confirmPassword } = request.body;

    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        success: false,
        message: "Password and confirmation do not match",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return response.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    } else {
      // Update the user's password with the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
      const info = await transporter.sendMail({
        from: 'Paradise Estate "shivam412978143@gmail.com"',
        to: user.email,
        subject: "Password Reset Success",
        html: resetPasswordSuccessTemplate(user.firstName),
      });
      if (info) {
        response.status(200).json({
          success: true,
          message: "Password reset successfully",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
