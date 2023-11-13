import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./skeleton.css";
function UserListingsSkeleton() {
  return (
    <SkeletonTheme baseColor="#a6a4a4" highlightColor="#c2c2c2">
      <section className="w-[90%] sm:w-[80%] mx-auto my-[3rem]">
        <Skeleton height={40} width={200} containerClassName="userListingFilter" count={2}/>
        <Skeleton containerClassName="userListingContainer" count={9} />
      </section>
    </SkeletonTheme>
  );
}

export default UserListingsSkeleton;
