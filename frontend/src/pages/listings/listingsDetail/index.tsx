import { AiFillPhone } from "react-icons/ai";
import { GrMail } from "react-icons/gr";
import {
  SliderSection,
  ListingDetailSection,
} from "../../userListings/listingDetail";
import ListingDetailsSkeleton from "../../userListings/listingDetail/listingDetails.skeleton";
import { useListingDetail } from "./controller";
import Button from "../../../components/Button";
import ReviewsSection from "../../../components/ReviewsSection";
import moment from "moment";

const ListingsDetails = () => {
  const {
    listing,
    goBack,
    pageName,
    copyToClipboard,
    mailTo,
    currentUser,
    setYourReview,
    yourReview,
    handleReviewFormSubmit,
    handleSearchInReview,
    searchInReview,
    initialReviews,
  } = useListingDetail();
  return (
    <>
      {Object.keys(listing).length && listing.imageUrl?.length ? (
        <section className="flex flex-col pb-10">
          <SliderSection goBack={goBack} listing={listing} />
          <ListingDetailSection listing={listing} pageName={pageName} />
          <section className="flex flex-col mt-10 w-[90%] sm:w-[80%] mx-auto">
            <h3 className="text-xl">
              <span className="font-semibold">Contact Name:</span>{" "}
              {listing.creatorName}{" "}
              {currentUser.data.user.username === listing.creatorUserName ? (
                <span className="text-lg italic">(You)</span>
              ) : (
                ""
              )}
            </h3>
            <h4 className="text-lg">
              <span className="font-semibold">Created On:</span>{" "}
              {moment(listing.createdAt).format("MMMM DD, YYYY")}
            </h4>
            {currentUser.data.user.username === listing.creatorUserName ? (
              <></>
            ) : (
              <section className="flex flex-col gap-4 mt-5 md:flex-row">
                <Button
                  value={
                    <>
                      Contact {listing.rent ? "Landlord" : "Broker"} via{" "}
                      <AiFillPhone />
                    </>
                  }
                  className="bg-green-700 py-2 flex items-center gap-2 w-fit capitalize"
                  onClick={() => copyToClipboard(listing.creatorPhoneNo!)}
                  disabled={
                    currentUser?.data.user.phoneNo === listing.creatorPhoneNo
                  }
                />
                <Button
                  value={
                    <>
                      Contact {listing.rent ? "Landlord" : "Broker"} via{" "}
                      <GrMail />
                    </>
                  }
                  className="bg-red-700 py-2 flex items-center gap-2 w-fit capitalize"
                  onClick={() => mailTo(listing.creatorEmail!)}
                  disabled={
                    currentUser?.data.user.email === listing.creatorEmail
                  }
                />
              </section>
            )}

            <ReviewsSection
              handleReviewFormSubmit={handleReviewFormSubmit}
              eligibleToReview={
                currentUser.data.user.username !== listing.creatorUserName
              }
              yourReview={yourReview}
              setYourReview={setYourReview}
              searchInReview={searchInReview}
              handleSearchInReview={handleSearchInReview}
              initialReviews={initialReviews}
              currentUser={currentUser}
            />
          </section>
        </section>
      ) : (
        <ListingDetailsSkeleton />
      )}
    </>
  );
};
export default ListingsDetails;
