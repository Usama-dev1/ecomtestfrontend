import Shoppingcard from "./Shoppingcard";
import { useState } from "react";
import { useGetProductsQuery } from "../slices/productSlice";
import Spinner from "./Spinner";
import Error from "./Error";
const ProductArea = ({items}) => {
const{data:products,isLoading,error}=useGetProductsQuery()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = items||4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToShow = products?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
    {error?(<Error>{error.message||error.error}</Error>):isLoading?(<Spinner/>):(
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-500 mb-4 text-center px-4">
          Our Products
        </h2>
        <div className="grid grid-rows-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center justify-center">
          {itemsToShow?.map((product) => (
            <Shoppingcard product={product} key={product._id} />
          ))}
        </div>
        <div className="flex justify-center flex-wrap items-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2 rounded text-white bg-gray-600 disabled:opacity-50"
            aria-label="Previous Page">
            Previous
          </button>
          <span className="text-center text-md bg-white py-2 px-2 rounded-sm border border-black">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-9 py-2 rounded text-white bg-gray-600 disabled:opacity-50"
            aria-label="Next Page">
            Next
          </button>
        </div>
      </div>
      )}
    </>
  );
};

export default ProductArea;
