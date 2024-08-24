import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index}>
          {value >= index + 1 ? (
            <FaStar />
          ) : value >= index + 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
      {text && <span className="ml-2 text-sm text-gray-600">{text}</span>}
    </div>
  );
};

export default Rating;
