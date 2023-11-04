import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function ListingDetailsSkeleton() {
  return (
    <SkeletonTheme baseColor="#a6a4a4" highlightColor="#c2c2c2">
      <Skeleton
        count={1}
        className="h-[13rem] sm:h-[20rem] lg:h-[30rem] w-full"
      />
      <section className="flex flex-col gap-4 mt-10 w-[80%] mx-auto">
        <Skeleton className="h-[3rem] " />
        <Skeleton className="h-5" style={{ width: "20%" }} />
        <Skeleton className="h-5" />
        <Skeleton className="h-5" count={5} />
        <Skeleton className="w-[150px] xs:w-[47%] sm:w-[23%] lg:w-[18%] xl:w-[15%] h-[5rem]" />
      </section>
    </SkeletonTheme>
  );
}

export default ListingDetailsSkeleton;
