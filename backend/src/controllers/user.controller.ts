import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import twilio from "twilio";
import Listing from "../database/models/listing.model";
import { handleError } from "../utils/error";
import User, { UserDocument } from "../database/models/user.model";
import { generateRandomFourDigitOTP, sendToMail } from "../utils/constant";
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
    const user: UserDocument | null = await User.findById(request.params.id);
    //* *  If email or phoneNo changes then user has to verify them again
    let emailVerified = user?.emailVerified;
    let phoneNoVerified = user?.phoneNoVerified;
    if (user) {
      if (user.email !== request.body.email) {
        emailVerified = false;
      }
      if (user.phoneNo !== request.body.phoneNo) {
        phoneNoVerified = false;
      }
    }
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
          emailVerified,
          phoneNoVerified,
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
          emailVerified: rest.emailVerified,
          phoneNoVerified: rest.phoneNoVerified,
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
    // @ts-ignore
    const userId = request.user.id;
    // if (request.user.id !== userId) {
    //   return next(handleError(401, "You can only view your own listings"));
    // }

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
export const changePassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { oldPassword, newPassword } = request.body;
  //@ts-ignore
  const userId = request.user.id;
  try {
    const user: UserDocument | null = await User.findById(userId);
    if (!user) {
      return next({
        status: 404,
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return next({
        status: 400,
        message: "Current password is incorrect",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    response.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const sendVerificationEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email } = request.body;

  try {
    const user: UserDocument | null = await User.findOne({ email });

    if (!user) {
      return next(handleError(404, "User with that email does not exist"));
    } else if (user.emailVerified) {
      response.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    } else {
      const verificationOTP = generateRandomFourDigitOTP();
      user.emailVerificationOTP = verificationOTP;
      user.emailVerificationOTPExpires = new Date(Date.now() + 15 * 60 * 1000);
      await user.save();
      const info = await sendToMail(
        email,
        "Email Verification",
        `<p>Your verification OTP is: ${verificationOTP}</p>`
      );
      if (info) {
        response.status(200).json({
          success: true,
          message: "Verification email has been sent to your email address",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
export const verifyEmailWithOTP = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, verificationOTP } = request.body;

  try {
    const user: UserDocument | null = await User.findOne({ email });

    if (!user) {
      return next(handleError(404, "User with that email does not exist"));
    }

    if (
      user.emailVerificationOTP === verificationOTP &&
      user.emailVerificationOTPExpires &&
      user.emailVerificationOTPExpires > new Date()
    ) {
      user.emailVerified = true;
      user.emailVerificationOTP = "";
      user.emailVerificationOTPExpires = null;
      await user.save();
      response.status(200).json({
        success: true,
        message: "Email verified successfully",
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Invalid or expired verification OTP",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const resendVerificationEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email } = request.body;

  try {
    const user: UserDocument | null = await User.findOne({ email });

    if (!user) {
      return next(handleError(404, "User with that email does not exist"));
    }

    if (user.emailVerified) {
      return response.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }
    const verificationOTP = generateRandomFourDigitOTP();
    user.emailVerificationOTP = verificationOTP;
    user.emailVerificationOTPExpires = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();
    const info = await sendToMail(
      email,
      "Email Verification",
      `<p>Your verification OTP is: ${verificationOTP}</p>`
    );
    if (info) {
      response.status(200).json({
        success: true,
        message: "New verification email has been sent to your email address",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const sendVerificationToPhoneNumber = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { phoneNo } = request.body;
  try {
    const user = await User.findOne({ phoneNo });
    if (!user) {
      return next(
        handleError(404, "User with that phone number does not exist")
      );
    }
    const verificationOTP = generateRandomFourDigitOTP();
    user.phoneNoVerificationOTP = verificationOTP;
    user.phoneNoVerificationOTPExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    const message = await client.messages.create({
      body: `Your OTP for verification is ${verificationOTP}`,
      from: process.env.TWILIO_ACCOUNT_PHONE_NUMBER,
      to: phoneNo.replace(/\s/g, ""),
    });
    if (message.sid) {
      response.status(200).json({
        success: true,
        message: "Verification OTP has been sent to your phone number",
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Failed to send verification OTP",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const verifyPhoneNumberWithOTP = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { phoneNo, verificationOTP } = request.body;
  try {
    const user: UserDocument | null = await User.findOne({ phoneNo });
    if (!user) {
      return next(
        handleError(404, "User with that phone number does not exist")
      );
    }
    if (
      user.phoneNoVerificationOTP === verificationOTP &&
      user.phoneNoVerificationOTPExpires &&
      user.phoneNoVerificationOTPExpires > new Date()
    ) {
      user.phoneNoVerified = true;
      user.phoneNoVerificationOTP = "";
      user.phoneNoVerificationOTPExpires = null;
      await user.save();
      response.status(200).json({
        success: true,
        message: "Phone number verified successfully",
      });
    } else {
      response.status(404).json({
        success: false,
        message: "Invalid or expired verification OTP",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const resendVerificationToPhoneNumber = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { phoneNo } = request.body;

  try {
    const user: UserDocument | null = await User.findOne({ phoneNo });

    if (!user) {
      return next(
        handleError(404, "User with that phone number does not exist")
      );
    }
    if (user.phoneNoVerified) {
      return response.status(400).json({
        success: false,
        message: "Phone Number is already verified",
      });
    }
    const verificationOTP = generateRandomFourDigitOTP();
    user.phoneNoVerificationOTP = verificationOTP;
    user.phoneNoVerificationOTPExpires = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    const message = await client.messages.create({
      body: `Your OTP for verification is ${verificationOTP}`,
      from: process.env.TWILIO_ACCOUNT_PHONE_NUMBER,
      to: phoneNo.replace(/\s/g, ""),
    });
    if (message.sid) {
      response.status(200).json({
        success: true,
        message: "Verification OTP has been sent to your phone number",
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Failed to send verification OTP",
      });
    }
  } catch (error) {
    next(error);
  }
};
