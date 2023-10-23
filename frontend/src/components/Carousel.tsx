import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Carousel = ({ imageUrl }: { imageUrl: string[] }) => {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
    };
    return (
      <div className="h-[12rem] w-full">
        <Slider {...settings}>
          {imageUrl?.length && imageUrl?.map((url: string, index: number) => (
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