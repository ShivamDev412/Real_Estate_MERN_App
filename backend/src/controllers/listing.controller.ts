import { Request, Response, NextFunction } from "express";
import Listing from "../database/models/listing.model";
import { handleError } from "../utils/error";
export const createListing = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const listing = await Listing.create(request.body);
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
