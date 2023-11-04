import { Request, Response, NextFunction } from "express";
import Listing from "../database/models/listing.model";
export const getAllListings = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const listings: {}[] | null | null = await Listing.find({});
    if (listings) {
      const recentAddedListings = listings.filter((listing: any) => {
        const createdAt: any = new Date(listing.createdAt);
        const currentDate: any = new Date();
        return (currentDate - createdAt) / (1000 * 60 * 60 * 24) <= 3;
      });
      const listingsOnSale = listings.filter((listing: any) => {
        return listing.offer !== false;
      });
      const listingsOnRent = listings.filter((listing: any) => {
        return listing.rent !== false;
      });
      return response.status(201).json({
        success: true,
        message: "Listings fetched successfully",
        data: {
          recentAddedListings: {
            data: recentAddedListings,
            total: recentAddedListings.length,
          },
          listingsOnSales: {
            data: listingsOnSale,
            total: listingsOnSale.length,
          },
          listingsOnRent: {
            data: listingsOnRent,
            total: listingsOnRent.length,
          },
        },
      });
    } else {
      return response.status(501).json({
        success: false,
        message: "No listings found",
      });
    }
  } catch (err) {
    next(err);
  }
};
