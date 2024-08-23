import React, { useState } from "react";
import Shoppingcard from "./Shoppingcard";

const dummyProducts = [
  {
    id: 1,
    name: "Minimalist Watch",
    price: 99.99,
    imageUrl: "https://via.placeholder.com/400x320?text=Rayban+Sunglasses",
  },
  {
    id: 2,
    name: "Leather Wallet",
    price: 49.99,
    imageUrl: "https://via.placeholder.com/400x320?text=Cap",
  },
  {
    id: 3,
    name: "Sunglasses",
    price: 79.99,
    imageUrl: "https://via.placeholder.com/400x320?text=Pajamas",
  },
  {
    id: 4,
    name: "Canvas Backpack",
    price: 59.99,
    imageUrl: "https://via.placeholder.com/400x320?text=Chrismas+tree",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 129.99,
    imageUrl: "https://via.placeholder.com/400x320?text=Shoe+Vans",
  },
  {
    id: 6,
    name: "Notebook Set",
    price: 19.99,
    imageUrl: "https://via.placeholder.com/400x320?text=Elegant+clock",
  },
  {
    id: 7,
    name: "Elegant Timepiece",
    price: 89.99,
    imageUrl: "https://via.placeholder.com/400x320?text=Elegant+dess",
  },
  {
    id: 8,
    name: "Vintage Leather Wallet",
    price: 39.99,
    imageUrl: "https://via.placeholder.com/400x320?text=Vintage+Leather+Wallet",
  },
  {
    id: 9,
    name: "Classic Aviators",
    price: 69.99,
    imageUrl: "https://via.placeholder.com/400x320?text=Classic+Aviators",
  },
  {
    id: 10,
    name: "Urban Canvas Backpack",
    price: 49.99,
    imageUrl: "https://via.placeholder.com/400x320?text=Urban+Canvas+Backpack",
  },
  {
    id: 11,
    name: "Bluetooth Earbuds",
    price: 119.99,
    imageUrl: "https://via.placeholder.com/400x320?text=Bluetooth+Earbuds",
  },
  {
    id: 12,
    name: "Leather Notebook Set",
    price: 29.99,
    imageUrl: "https://via.placeholder.com/400x320?text=Leather+Notebook+Set",
  },
];

const ProductArea = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToShow = dummyProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dummyProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-500 mb-4 text-center px-4">
        Our Products
      </h2>
      <div className="grid grid-rows-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center justify-center">
        {itemsToShow.map((product) => (
          <Shoppingcard
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
      <div className="flex justify-center flex-wrap items-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-5 py-2 rounded text-white   bg-gray-600 disabled:opacity-50"
          aria-label="Previous Page">
          Previous
        </button>
        <span className="text-center text-md bg-white py-2 px-2 rounded-sm border border-black">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-8 py-2 rounded text-white bg-gray-600 disabled:opacity-50"
          aria-label="Next Page">
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductArea;
