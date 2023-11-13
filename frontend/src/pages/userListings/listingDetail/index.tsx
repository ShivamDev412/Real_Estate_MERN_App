import { FaLocationDot, FaBath } from "react-icons/fa6";
import { FaParking, FaSwimmingPool } from "react-icons/fa";
import Slider from "react-slick";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BiSolidBed } from "react-icons/bi";
import { GiSofa } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { AiOutlineWifi } from "react-icons/ai";
import { BsArrowLeft, BsCurrencyDollar } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { useListingDetailController } from "./controller";
import { carouselSettings } from "../../../utils/constant";
import ListingDetailsSkeleton from "./listingDetails.skeleton";
import Button from "../../../components/Button";
import { ListingType } from "../../../utils/constant";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface ExtraDetailComponentProps {
  icon: any;
  value: any;
  style?: string;
}
const ExtraDetailComponent: React.FC<ExtraDetailComponentProps> = ({
  icon,
  value,
  style = "",
}) => {
  return (
    <section className="flex flex-col items-center bg-white rounded-lg shadow-lg py-6 w-[150px] xs:w-[47%] sm:w-[23%] lg:w-[18%] xl:w-[15%] gap-3">
      {icon}{" "}
      <p className={twMerge("text-md font-bold text-center", style)}>{value}</p>
    </section>
  );
};
export const SliderSection = ({
  goBack,
  listing,
}: {
  goBack: () => void;
  listing: any;
}) => {
  return (
    <section className="relative">
      <Slider {...carouselSettings}>
        {listing.imageUrl?.length &&
          listing.imageUrl?.map((url: string, index: number) => (
            <div
              className="h-[13rem] sm:h-[20rem] lg:h-[30rem] w-full"
              key={url}
            >
              <img
                key={index}
                src={url}
                alt="images"
                className="h-full w-full"
              />
            </div>
          ))}
      </Slider>
      <div className="p-3 bg-white rounded-[50%] w-fit absolute top-[1.5rem] left-[1.5rem]">
        <BsArrowLeft
          style={{ strokeWidth: "0.5px" }}
          className="hover:cursor-pointer"
          onClick={goBack}
        />
      </div>
    </section>
  );
};
export const ListingDetailSection = ({
  listing,
  editListing,
  deleteListing,
  pageName,
}: {
  listing: ListingType;
  editListing?: (id: string) => void;
  deleteListing?: (id: string) => void;
  pageName: string;
}) => {
  return (
    <section className="flex flex-col gap-4 mt-10 w-[80%] mx-auto">
      <section className="flex md:items-center flex-col md:flex-row md:justify-between">
        <h1 className="text-3xl font-bold capitalize">{listing?.name}</h1>
        {pageName === "user-listing" && (
          <section className="flex gap-2 xs:my-4 md:m-0">
            <Button
              value={
                <>
                  <FiEdit2 /> Edit
                </>
              }
              type="button"
              className="bg-green-700 py-2 flex items-center gap-2 w-fit"
              onClick={() => editListing && editListing(listing._id!)}
            />
            <Button
              value={
                <>
                  <MdDelete className="w-6 h-6" /> Delete
                </>
              }
              type="button"
              className="bg-red-700 py-2 flex items-center gap-2 w-fit"
              onClick={() => deleteListing && deleteListing(listing._id!)}
            />
          </section>
        )}
      </section>
      <section className="flex">
        {listing.discountPrice ? (
          <p className="text-2xl font-bold flex items-center">
            <span className="line-through text-gray-500 flex items-center">
              <BsCurrencyDollar className="w-7 h-7" /> {listing.regularPrice}
            </span>{" "}
            <span className="text-green-700 ml-2 flex items-center">
              <BsCurrencyDollar className="w-7 h-7 fill-green-700" />{" "}
              {listing.discountPrice} {listing.rent ? "monthly" : ""}
            </span>
          </p>
        ) : (
          <p className="text-2xl font-bold flex items-center">
            <BsCurrencyDollar className="w-7 h-7" /> {listing.regularPrice}{" "}
            {listing.rent ? "monthly" : ""}
          </p>
        )}
      </section>
      <section className="flex gap-2 my-3 items-center">
        <FaLocationDot className="h-5 w-5 fill-green-700" />
        <p className="text-lg font-bold">{listing?.address}</p>
      </section>
      <p className="text-lg text-zinc-700">
        <span className="font-bold">Description - </span>
        {listing?.description}
      </p>
      <section className="flex items-center gap-4 flex-wrap">
        <ExtraDetailComponent
          icon={<BiSolidBed className="h-10 w-10" />}
          value={`Bedroom ${listing?.bedroom}`}
        />
        <ExtraDetailComponent
          icon={<FaBath className="h-10 w-10" />}
          value={`Bathroom ${listing?.bathroom}`}
        />
        <ExtraDetailComponent
          icon={<GiSofa className="h-10 w-10" />}
          value={listing?.furnished ? "Furnished" : "Not Furnished"}
        />
        {listing?.parking ? (
          <ExtraDetailComponent
            icon={<FaParking className="h-10 w-10" />}
            value={listing?.parking ? "Parking" : ""}
          />
        ) : (
          <></>
        )}
        {listing?.swimmingPool ? (
          <ExtraDetailComponent
            icon={<FaSwimmingPool className="h-10 w-10" />}
            value={listing?.swimmingPool ? "Swimming Pool" : ""}
          />
        ) : (
          <></>
        )}
        {listing?.gym ? (
          <ExtraDetailComponent
            icon={<CgGym className="h-10 w-10" />}
            value={listing?.gym ? "Gym" : ""}
          />
        ) : (
          <></>
        )}
        {listing?.wifi ? (
          <ExtraDetailComponent
            icon={<AiOutlineWifi className="h-10 w-10" />}
            value={listing?.wifi ? "Wifi" : ""}
          />
        ) : (
          <></>
        )}
      </section>
    </section>
  );
};
function Listing() {
  const { listing, goBack, editListing, deleteListing, pageName } =
    useListingDetailController();
  return (
    <>
      {Object.keys(listing).length && listing.imageUrl?.length ? (
        <section className="flex flex-col pb-10">
          <SliderSection goBack={goBack} listing={listing} />
          <ListingDetailSection
            listing={listing}
            editListing={editListing}
            deleteListing={deleteListing}
            pageName={pageName}
          />
        </section>
      ) : (
        <ListingDetailsSkeleton />
      )}
    </>
  );
}

export default Listing;
