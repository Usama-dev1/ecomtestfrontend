import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdDiscount } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { IoIosReturnLeft } from "react-icons/io";

const Banner = () => {
  return (
    <>
      <div className="container-fluid mx-auto w-full border-b-2">
        <div className="grid gird-cols-1 md:grid-cols-4 gap-2 p-10 justify-items-center text-center text-gray-600 ">
          <div className="flex flex-col items-center">
            <CiDeliveryTruck className="text-4xl" />
            <h3>
              <b>Free Shipping</b>
              <br /> Order today, receive tomorrow
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <IoIosReturnLeft className="text-4xl" />
            <h3>
              <b>Hassle-free exchange</b> <br />
              Receive a slip for exchanges
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <MdDiscount className="text-4xl" />
            <h3>
              <b>Price-match guarantee</b> <br />
              Safe money when ordering with us
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <FaRegStar className="text-4xl" />
            <h3>
              <b>4.5+ Reviews</b>
              <br />
              Customer Satisfaction #1 priority
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
