import { Link } from "react-router-dom";
import BannerImg from "../../assets/banner.jpg";
import ListingCard from "../../components/ListingCard";
import NoData from "../../components/noData";
import { useHomeController } from "./controller";
import ENDPOINTS from "../../utils/endpoints";
interface ListingData {
  data: any;
  total: number;
}
interface SectionComponent {
  title: string;
  data: ListingData;
}
const SectionComponent: React.FC<SectionComponent> = ({ title, data }) => {
  return (
    <section className="w-[90%] sm:w-[80%] mx-auto my-[4rem]">
      <h3 className="text-2xl font-bold text-zinc-900">{title}</h3>
      <section className="my-4 flex gap-6 lg:gap-[3.5%] flex-wrap">
        {data.data?.length ? (
          data.data.map((listing: any, index: number) => {
            if (index < 3) {
              return (
                <ListingCard
                  key={listing._id}
                  listing={listing}
                  listingDetail={() => {}}
                />
              );
            }
          })
        ) : (
          <section className="w-full">
            {" "}
            <NoData title="listings" />
          </section>
        )}
      </section>
      {data.data?.length > 3 && (
        <Link to={ENDPOINTS.LISTINGS} className="flex justify-end text-lg">
          + {data.data?.length - 3} more
        </Link>
      )}
    </section>
  );
};
function Home() {
  const { recentAddedListings, listingsOnSales, listingsOnRent } =
    useHomeController();
  return (
    <>
      <section className="relative w-full h-[20rem] xl:h-[30rem]">
        <div
          className="bg-cover bg-no-repeat bg-center w-full h-full absolute"
          style={{
            backgroundImage: `url(${BannerImg})`,
          }}
        />
        <div className="bg-black opacity-50 w-full h-full absolute"></div>
        <div className="flex flex-col justify-center items-center relative z-10 h-full text-center w-[90%] mx-auto sm:w-[80%]">
          <h1 className="font-semibold text-white text-[2rem] xl:text-[4rem]">
            Find your next perfect place with ease
          </h1>
          <h3 className="text-lg xl:text-2xl text-white font-semibold">
            Paradise Estate: Your gateway to the Home of Your Dreams – Swift,
            Effortless, and Blissfully Comfortable!
          </h3>
          <p className="my-4 text-lg text-white">
            Discover it with our 24/7 expert support.
          </p>
        </div>
      </section>

      <SectionComponent title="Recently Added" data={recentAddedListings} />
      <SectionComponent title="On Sale" data={listingsOnSales} />
      <SectionComponent title="Available For Rent" data={listingsOnRent} />
    </>
  );
}

export default Home;
