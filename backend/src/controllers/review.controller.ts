import { Request, Response, NextFunction } from "express";
import ListingModel, { Listing } from "../database/models/listing.model";
import NotificationModel from "../database/models/notification.model";
import { getIo } from "../utils/socket";

export const addReview = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const io = getIo();
    const { listingId } = request.params;
    const { userName, comment, profileImage } = request.body;

    const listing: Listing | null = await ListingModel.findById(listingId);

    if (!listing) {
      return response.status(404).json({ error: "Listing not found" });
    }

    const newReview = {
      userName,
      comment,
      profileImage,
      createdAt: new Date(),
    };

    listing.reviews.push(newReview);
    await listing.save();

    const ownerUserId = listing.userRef;
    const listingName = listing.name;

    const notification = new NotificationModel({
      userId: ownerUserId,
      title: "New Review Added",
      message: `@${userName} added a new review to your listing: "${listingName}".`,
      listingId,
    });

    await notification.save();

    io.emit("newReview", {
      userId: ownerUserId,
      title: "New Review Added",
      message: `@${userName} added a new review to your listing: "${listingName}".`,
    });
    return response.status(201).json({
      success: true,
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
