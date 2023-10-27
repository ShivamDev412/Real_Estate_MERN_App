import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselSettings } from "../utils/constant";

const Carousel = ({ imageUrl }: { imageUrl: string[] }) => {
  return (
    <div className="h-[12rem] w-full">
      <Slider {...carouselSettings}>
        {imageUrl?.length &&
          imageUrl?.map((url: string, index: number) => (
            <div className="h-[12rem] w-full" key={url}>
              <img
                key={index}
                src={url}
                alt="images"
                className="rounded-tl-lg rounded-tr-lg h-full w-full"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};
export default Carousel;
