import { FaLocationDot, FaBath } from "react-icons/fa6";
import { FaParking, FaSwimmingPool } from "react-icons/fa";
import { BiSolidBed } from "react-icons/bi";
import { GiSofa } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { AiOutlineWifi } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { useListingDetailController } from "./controller";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselSettings } from "../../../utils/constant";
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
    <div className="flex flex-col items-center bg-white rounded-lg shadow-lg py-6 w-[150px] xs:w-[47%] sm:w-[23%] lg:w-[18%] xl:w-[15%] gap-3">
      {icon}{" "}
      <p className={twMerge("text-md font-bold text-center", style)}>{value}</p>
    </div>
  );
};
function Listing() {
  const { listing } = useListingDetailController();
  return (
    <main className="flex flex-col pb-10">
      <div>
        <Slider {...carouselSettings}>
          {listing.imageUrl?.length &&
            listing.imageUrl?.map((url: string, index: number) => (
              <div className="h-[13rem] sm:h-[20rem] lg:h-[30rem] w-full" key={url}>
                <img
                  key={index}
                  src={url}
                  alt="images"
                  className="h-full w-full"
                />
              </div>
            ))}
        </Slider>
      </div>

      <div className="flex flex-col gap-4 mt-10 w-[80%] mx-auto">
        <div>
          <h1 className="text-3xl font-bold">{listing?.name}</h1>
        </div>
        <div className="flex">
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
        </div>
        <div className="flex gap-2 my-3 items-center">
          <FaLocationDot className="h-5 w-5 fill-green-700" />
          <p className="text-lg font-bold">{listing?.address}</p>
        </div>
        <p className="text-lg text-zinc-700">
          <span className="font-bold">Description - </span>
          {listing?.description}
        </p>
        <div className="flex items-center gap-4 flex-wrap">
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
        </div>
      </div>
    </main>
  );
}

export default Listing;
