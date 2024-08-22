import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = ( ) => {

  return (
    <div className="relative flex">
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
        />
      ))}
    </div>
  );
};

export default Rating;
