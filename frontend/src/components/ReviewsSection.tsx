import moment from "moment";
import { ReviewsType } from "../utils/constant";
import Button from "./Button";
import HighlightedText from "./HighlightedText";
import Input, { Textarea } from "./Input";
import NoData from "./noData";
import { CurrentUserType } from "../redux/slice/user/userSlice";

interface ReviewsSectionProps {
  handleReviewFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  yourReview: string;
  setYourReview: (value: string) => void;
  searchInReview: string;
  handleSearchInReview: (e: React.ChangeEvent<HTMLInputElement>) => void;
  initialReviews: Array<ReviewsType>;
  currentUser: CurrentUserType;
  eligibleToReview: boolean;
}
const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  handleReviewFormSubmit,
  yourReview,
  setYourReview,
  searchInReview,
  handleSearchInReview,
  initialReviews,
  currentUser,
  eligibleToReview,
}) => {
  return (
    <section className="mt-5 w-full md:w-1/2">
      {eligibleToReview && (
        <section>
          {" "}
          <h3 className="text-2xl font-semibold">Your review</h3>
          <form
            action=""
            className="mt-2 w-full"
            onSubmit={(e) => handleReviewFormSubmit(e)}
          >
            <Textarea
              id="your review"
              value={yourReview}
              onChange={(e) => setYourReview(e.target.value)}
            />
            <Button
              disabled={yourReview.length ? false : true}
              type="submit"
              value="Add review"
              className="bg-green-700 md:w-1/4 my-2 py-2 w-fit"
            />
          </form>
        </section>
      )}

      <form action="" className="my-4">
        <Input
          id="searchForReviews"
          value={searchInReview}
          type="text"
          onChange={(e) => handleSearchInReview(e)}
        />
      </form>
      <section className="w-full mt-4">
        <h4 className="text-lg font-semibold">Others' Reviews</h4>
        {initialReviews.length !== 0 && (
          <section className="bg-white w-full p-4 mt-4 rounded-lg h-[200px] overflow-y-auto shadow-md">
            {initialReviews.map((review: ReviewsType) => (
              <section key={review._id} className="mb-5 flex gap-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={review.profileImage}
                  alt={`${review.userName}_profile_pic`}
                />
                <section className="">
                  <p className="text-gray-600 mb-2">
                    <span className="text-slate-600 italic">
                      @{review.userName}{" "}
                      {review.userName === currentUser.data.user.username &&
                        "(you)"}{" "}
                    </span>
                    • {moment(review.createdAt).fromNow()}
                  </p>
                  <p className="text-gray-800">
                    {" "}
                    <HighlightedText
                      text={review.comment}
                      highlight={searchInReview}
                    />
                  </p>
                </section>
              </section>
            ))}
          </section>
        )}
        {initialReviews.length === 0 && searchInReview.trim().length === 0 && (
          <p className="text-gray-500 text-center my-4">
            No reviews yet. Be the first to leave a review!
          </p>
        )}
        {searchInReview.trim().length !== 0 && initialReviews.length === 0 && (
          <NoData title="reviews" styles="text-lg" />
        )}
      </section>
    </section>
  );
};
export default ReviewsSection;
