import { Request, Response, NextFunction } from "express";
import Listing from "../database/models/listing.model";
import { handleError } from "../utils/error";

export const createListing = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { reviews = [], ...listingData } = request.body;
    const listingWithReviews = { ...listingData, reviews };
    const listing = await Listing.create(listingWithReviews);
    if (listing) {
      response.status(201).json({
        success: true,
        message: "Listing created successfully",
        data: listing,
      });
    } else {
      return next(
        handleError(404, "Something went wrong while creating the listing")
      );
    }
  } catch (error: any) {
    next(error);
  }
};

export const getListingById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const listing = await Listing.findById(request.params.listingId).exec();
    if (!listing) {
      return response.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }
    response.status(200).json({
      success: true,
      message: "Listing fetched successfully",
      data: listing,
    });
  } catch (error) {
    return next(error);
  }
};
export const deleteListing = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const listing = await Listing.findByIdAndDelete(request.params.listingId);
    if (!listing) {
      return response.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }
    response.status(200).json({
      success: true,
      message: "Listing deleted successfully",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
export const updateListing = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      request.params.listingId,
      request.body,
      { new: true }
    );
    if (!listing) {
      return response.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }
    response.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};
