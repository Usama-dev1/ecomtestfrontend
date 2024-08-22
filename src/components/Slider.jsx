import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the CSS for carousel

export default () => (
  <div className="w-full flex justify-center">
    <Carousel
      autoPlay
      infiniteLoop
      showArrows={true}
      showThumbs={false}
      showStatus={false}
      className="w-[60rem] m-2 ">
      <div>
        <img
          alt="Vintage Leather Wallet"
          src="https://via.placeholder.com/1200x600?text=Leather+belt"
          className="w-full"
        />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img
          alt="Cat Image 1"
          src="https://via.placeholder.com/1200x600?text=Vintage+Leather+Wallet"
          className="w-full"
        />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img
          alt="Cat Image 2"
          src="https://via.placeholder.com/1200x600?text=Leather+Shoes"
          className="w-full"
        />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  </div>
);
