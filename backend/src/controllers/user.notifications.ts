import { Response, Request, NextFunction } from "express";
import NotificationModel from "../database/models/notification.model";

export const getNotifications = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.params.userId;
    const page = parseInt(request.query.page as string) || 1;
    const pageSize = 10;

    const skip = (page - 1) * pageSize;
    const [notifications, totalCount] = await Promise.all([
      NotificationModel.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .exec(),
      NotificationModel.countDocuments({ userId }),
    ]);
    const totalUnreadCount = await NotificationModel.find({ isRead: false });
    return response.status(200).json({
      success: true,
      notifications,
      totalCount,
      page,
      totalUnreadCount: totalUnreadCount.length,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const markNotificationAsRead = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { userId, notificationId } = request.body;
    let updatedNotification;
    if (notificationId) {
      updatedNotification = await NotificationModel.findByIdAndUpdate(
        notificationId,
        { isRead: true },
        { new: true }
      );
    } else {
      updatedNotification = await NotificationModel.updateMany(
        { userId },
        { isRead: true },
        { new: true }
      );
    }
    return response
      .status(200)
      .json({ success: true, notification: updatedNotification });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
export const deleteNotifications = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { notificationId } = request.params;
    const { userId } = request.query;
    let deletedNotification;
    let message = "";
    if (notificationId) {
      message = "Notification deleted successfully.";
      deletedNotification = await NotificationModel.findByIdAndDelete(
        notificationId
      );
      if (!deletedNotification) {
        return response
          .status(404)
          .json({ success: false, message: "Notification not found." });
      }
    } else {
      message = "All notifications deleted successfully.";
      const deleteResult = await NotificationModel.deleteMany({ userId });
      if (deleteResult.deletedCount === 0) {
        return response.status(404).json({
          success: false,
          message: "No notifications found for the user.",
        });
      }
    }
    return response.status(200).json({ success: true, message });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
