import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { handleError } from "../utils/error";
import User from "../database/models/user.model";
export const updateUserProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //@ts-ignore
  if (request.user.id !== request.params.id)
    return next(handleError(401, "You can only update your own account!"));
  try {
    if (request.body.password) {
      request.body.password = bcrypt.hashSync(request.body.password, 10);
    }
    const user = await User.findById(request.params.id);
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      {
        $set: {
          username: request.body.username,
          password:
            request.body.password === ""
              ? user?.password
              : request.body.password,
          email: request.body.email,
          avatar: request.body.avatar,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return next(handleError(404, "User not found"));
    }
    const { password, ...rest } = updatedUser?._doc;
    response.status(201).json({
      success: true,
      message: "User Updated successfully",
      data: {
        user: {
          email: rest.email,
          username: rest.username,
          avatar: rest.avatar,
          id: rest._id,
        },
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      if (err.keyPattern.username === 1) {
        return next(handleError(400, "User with that username already exists"));
      } else if (err.keyPattern.email === 1) {
        return next(handleError(400, "User with that email already exists"));
      }
    } else {
      next(err);
    }
  }
};
