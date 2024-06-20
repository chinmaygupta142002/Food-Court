import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageWithDescription from './ImageWithDescription';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", right: "10px" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", left: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
}

// Main Slide Component
function Slide() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <Slider {...settings}>
      <div>
        <ImageWithDescription location="Images/image1.png"/>
      </div>
      <div>
        <ImageWithDescription location="Images/image2.png"/>
      </div>
      <div>
        <ImageWithDescription location="Images/image3.png"/>
      </div>
      <div>
        <ImageWithDescription location="Images/image4.png"/>
      </div>
      <div>
        <ImageWithDescription location="Images/image5.png"/>
      </div>
    </Slider>
  );
}

export default Slide;


