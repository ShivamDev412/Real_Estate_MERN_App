import { Request, Response, NextFunction } from "express";
import Listing from "../database/models/listing.model";
import User from "../database/models/user.model";
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
        return listing.sale !== false;
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
export const getListingById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { listingId } = request.params;
  try {
    const listing = await Listing.findById(listingId).exec();
    if (!listing) {
      return response.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }
    const user = await User.findById(listing?.userRef).exec();
    if (user) {
      const {
        _doc: { __v, ...restListingWithoutInternal },
        ...restListing
      } = listing;
      const { phoneNo, email, firstName, lastName, username, ...rest } = user;
      return response.status(201).json({
        success: true,
        message: "Listing fetched successfully",
        data: {
          ...restListingWithoutInternal,
          creatorPhoneNo: phoneNo,
          creatorEmail: email,
          creatorUserName: username,
          creatorName: `${user.firstName} ${user.lastName}`,
        },
      });
    } else {
      return response.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return next(error);
  }
};
