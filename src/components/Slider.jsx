import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the CSS for carousel
import { useGetProductsQuery } from "../slices/productSlice";
import Spinner from "./Spinner";
const ProductCarousel = () => {
  const { data = [], isLoading, error } = useGetProductsQuery();
  console.log(data)

  if (isLoading) return <Spinner />;
  if (error) return <div>{error.data?.message || "An error occurred"}</div>;

  return (
    <div className="w-full flex justify-center">
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        className="w-[40rem] m-2">
        {data.length > 0 ? (
          data.map((product) => (
            <div key={product?._id}>
              <img
                alt={product?.name || "Product image"}
                src={product?.image || "/default-image.jpg"} // Provide a default image if not available
                className="w-full"
              />
              <p className="legend">{product?.name}</p>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
