import Filter from "../../components/Filter";
import ListingCard from "../../components/ListingCard";
import Pagination from "../../components/Pagination";
import UserListingsSkeleton from "../userListings/userListings.skeleton";
import { useListingController } from "../userListings/controller";
function Listings() {
  const {
    listings,
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
    closeFilter,
    loading,
    listingDetail,
  } = useListingController();
  return (
    <>
      {!loading ? (
        <div className="py-4 w-[90%] mx-auto my-4 sm:w-[80%]">
          <div className="flex justify-between items-center flex-wrap">
            <h2 className="text-3xl font-bold">My Listings</h2>

            <Filter
              showFilter={showFilter}
              toggleFilter={toggleFilter}
              listingFilter={listingFilter}
              handleToggleInputChange={handleToggleInputChange}
              handlePriceFilter={handlePriceFilter}
              clearFilter={clearFilter}
              applyFilter={() => applyFilter(pageNo)}
              activeFilterCount={activeFilterCount}
              closeFilter={closeFilter}
            />
          </div>

          <div className="flex flex-wrap gap-6 lg:gap-[3.5%] my-6">
            {listings?.length ? (
              listings.map((listing) => (
                <ListingCard
                  key={listing._id}
                  listing={listing}
                  listingDetail={listingDetail}
                />
              ))
            ) : (
              <div>No listings available</div>
            )}
          </div>
          {totalCount > 9 ? (
            <div className="flex justify-end mt-[50px]">
              <Pagination
                pageNo={pageNo}
                totalPageCount={Math.ceil(totalCount / 9)}
                onPageChange={onPageChange}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <UserListingsSkeleton />
      )}
    </>
  );
}

export default Listings;
