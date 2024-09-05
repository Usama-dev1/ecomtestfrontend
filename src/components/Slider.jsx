import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the CSS for carousel
import { useGetProductsQuery } from "../slices/productSlice";
import Spinner from "./Spinner";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();


  return (
    <div className="w-full flex justify-center">
      {isLoading&&<Spinner/>}
      {error&&error.data.message}
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        className="w-[40rem] m-2">
        {products.map((product) => (
          <div key={product.id}>
            <img
              alt={product.name || "Product image"}
              src={product.image || "/default-image.jpg"} // Provide a default image if not available
              className="w-full"
            />
            <p className="legend">{product.name}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
