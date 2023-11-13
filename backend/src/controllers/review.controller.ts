import { Request, Response, NextFunction } from "express";
import ListingModel, { Listing } from "../database/models/listing.model";

export const addReview = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
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
