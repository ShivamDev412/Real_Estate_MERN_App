import { BsCurrencyDollar } from "react-icons/bs";
import Carousel from "./Carousel";
import { FaLocationDot } from "react-icons/fa6";
import React from "react";
import { ListingType } from "../utils/constant";

interface Listing {
  listing: ListingType;
  listingDetail: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
}
const ListingCard: React.FC<Listing> = ({ listingDetail, listing }) => {
  return (
    <div
      className="w-full md:w-[48%] lg:w-[31%] rounded-lg shadow-xl bg-white hover:cursor-pointer my-4"
      onClick={(e) => listingDetail(e, listing._id!)}
    >
      <Carousel imageUrl={listing.imageUrl} />

      <div className="p-3">
        <h3 className="text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis text-zinc-900">
          {listing.name}
        </h3>
        <p className="flex items-center gap-1 my-2 whitespace-nowrap overflow-hidden text-ellipsis">
          <FaLocationDot className="text-green-600" /> {listing.address}
        </p>
        <p className="text-sm text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis my-2">
          {listing.description}
        </p>
        {listing.discountPrice ? (
          <p className="text-sm font-bold flex my-2">
            <span className="line-through text-gray-500 flex items-center gap-1">
              <BsCurrencyDollar />
              {listing.regularPrice}
            </span>{" "}
            <span className="text-green-600 ml-2 flex items-center gap-1">
              {" "}
              <BsCurrencyDollar /> {listing.discountPrice}
            </span>
          </p>
        ) : (
          <p className="text-sm font-bold flex items-center gap-1 my-2">
            {" "}
            <BsCurrencyDollar /> {listing.regularPrice}
          </p>
        )}
      </div>
    </div>
  );
};
export default React.memo(ListingCard);
