// import style from "./MainSlider.module.css";

import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import banner1 from "../../assets/banner1.jpeg";
import banner2 from "../../assets/banner1.jpeg";
import Slider from "react-slick";

function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <>
      <div className="flex">
        <div className="w-3/4">
          <Slider {...settings}>
            <img
              src={slide1}
              className="w-full h-[400px] object-cover"
              alt=""
            />
            <img
              src={slide2}
              className="w-full h-[400px] object-cover"
              alt=""
            />
            <img
              src={slide3}
              className="w-full h-[400px] object-cover"
              alt=""
            />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={slide1} className="w-full h-[200px]" alt="" />
          <img src={slide2} className="w-full h-[200px]" alt="" />
        </div>
      </div>
    </>
  );
}

export default MainSlider;
