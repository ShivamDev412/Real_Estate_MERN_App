import { useListingController } from "./controller";
import { ListingType } from "../../redux/slice/listing/listingSlice";
import Carousel from "../../components/Carousel";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";

interface Listing extends ListingType {
  deleteListing: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  editListing: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  listingDetail: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
}

const ListingCard: React.FC<Listing> = ({
  _id,
  imageUrl,
  name,
  description,
  regularPrice,
  discountPrice,
  deleteListing,
  listingDetail,
  editListing,
}) => {
  return (
    <div
      className="w-full md:w-[48%] lg:w-[32.3%] rounded-lg shadow-xl bg-white hover:cursor-pointer"
      onClick={(e) => listingDetail(e, _id)}
    >
      <Carousel imageUrl={imageUrl} />

      <div className="p-3">
        <h3 className="text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </h3>
        <p className="text-sm text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
          {description}
        </p>
        {discountPrice ? (
          <p className="text-sm font-bold">
            <span className="line-through text-gray-500">
              Price: $ {regularPrice}
            </span>{" "}
            <span className="text-green-600 ml-2">Price $ {discountPrice}</span>
          </p>
        ) : (
          <p className="text-sm font-bold">Price: $ {regularPrice}</p>
        )}

        <div className="flex gap-2 flex-row-reverse items-center my-2">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-auto hover:opacity-80 transition-colors ease-in-out"
            onClick={(e) => editListing(e, _id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg mt-auto hover:opacity-80 transition-colors ease-in-out"
            onClick={(e) => deleteListing(e, _id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

function Listing() {
  const {
    listings,
    deleteListing,
    listingDetail,
    editListing,
    showFilter,
    toggleFilter,
    listingFilter,
    handleToggleInputChange,
    handlePriceFilter,
    clearFilter,
    applyFilter,
    activeFilterCount,
    totalCount,
    onPageChange,
    pageNo,
  } = useListingController();
  return (
    <div className="py-4 w-[80%] mx-auto my-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Your Listings</h2>
        <Filter
          showFilter={showFilter}
          toggleFilter={toggleFilter}
          listingFilter={listingFilter}
          handleToggleInputChange={handleToggleInputChange}
          handlePriceFilter={handlePriceFilter}
          clearFilter={clearFilter}
          applyFilter={() => applyFilter(pageNo)}
          activeFilterCount={activeFilterCount}
        />
      </div>

      <div className="flex flex-wrap gap-3 2xl:gap-6 my-4">
        {listings?.length ? (
          listings.map((listing) => (
            <ListingCard
              key={listing._id}
              deleteListing={deleteListing}
              {...listing}
              listingDetail={listingDetail}
              editListing={editListing}
            />
          ))
        ) : (
          <div>No listings available</div>
        )}
      </div>
      <div className="flex justify-end mt-[50px]">
      <Pagination
        pageNo={pageNo}
        totalPageCount={Math.ceil(totalCount / 9)}
        onPageChange={onPageChange}
      />
      </div>
    
    </div>
  );
}

export default Listing;