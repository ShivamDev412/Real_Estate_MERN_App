import { NextFunction, Request, Response } from "express";
import Listing from "../database/models/listing.model";
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
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          phoneNo: request.body.phoneNo,
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
          firstName: rest.firstName,
          lastName: rest.lastName,
          phoneNo: rest.phoneNo,
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
export const deleteUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //@ts-ignore
  if (request.user.id !== request.params.id)
    return next(handleError(401, "You can only delete your own account!"));
  try {
    const deleteUser = await User.findByIdAndDelete(request.params.id);
    if (!deleteUser) {
      return next(handleError(404, "User not found"));
    }
    response.status(201).json({
      success: true,
      message: "User has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const showUserListings = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.params.userId;

    // @ts-ignore
    if (request.user.id !== userId) {
      return next(handleError(401, "You can only view your own listings"));
    }

    const filterObject: any = {
      userRef: userId,
    };

    const filterFields = [
      "bathroom",
      "bedroom",
      "furnished",
      "offer",
      "parking",
      "rent",
      "sale",
      "wifi",
      "gym",
      "swimmingPool",
    ];
    filterFields.forEach((field) => {
      const queryParam = request.query[field] as string | string[] | undefined;
      if (queryParam) {
        if (Array.isArray(queryParam)) {
          filterObject[field] = queryParam[0];
        } else {
          filterObject[field] = queryParam;
        }
      }
    });

    if (request.query.regularPrice) {
      const maxRegularPrice = parseInt(
        request.query.regularPrice as string,
        10
      );
      filterObject.regularPrice = { $lte: maxRegularPrice };
    }

    if (request.query.discountPrice) {
      const maxDiscountPrice = parseInt(
        request.query.discountPrice as string,
        10
      );
      filterObject.discountPrice = { $lte: maxDiscountPrice };
    }

    const pageSize = 9;
    const pageNo = request.query.pageNo
      ? parseInt(request.query.pageNo as string, 10)
      : 1;

    const skip = (pageNo - 1) * pageSize;

    const listings = await Listing.find(filterObject)
      .skip(skip)
      .limit(pageSize);

    // Determine if there are more listings to fetch
    const totalListings = await Listing.countDocuments(filterObject);

    response.status(200).json({
      success: true,
      message: "Listings fetched successfully",
      data: {
        listings,
        pageNo,
        totalCount: totalListings,
      },
    });
  } catch (error) {
    next(error);
  }
};
