import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = ( ) => {

  return (
    <div className="relative flex">
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar key={index}
        />
      ))}
    </div>
  );
};

export default Rating;
