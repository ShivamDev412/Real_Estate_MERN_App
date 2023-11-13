import { Response, Request, NextFunction } from "express";
import NotificationModel from "../database/models/notification.model";

export const getNotifications = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.params.userId;
    const notifications = await NotificationModel.find({ userId })
      .sort({ createdAt: -1 })
      .exec();
    return response.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
