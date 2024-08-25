"use client";
import React, { useState, useEffect } from "react";

// Define the product type
type Product = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

const Page = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    fetch(`http://localhost:3000/api/product`)
      .then((response) => response.json())
      .then((data) => {
        setProductList(data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <div className="flex-col flex gap-5 justify-center">
          <div className="loader"></div>
          <div className="text-gray-700 ">Loading products...</div>
        </div>
      ) : (
        <div
          className="container p-6 overflow-y-auto"
          style={{ height: "600px", width: "100%" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.map((ele, id) => (
              <div
                key={id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={ele.imageUrl}
                  alt={ele.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {ele.name}
                  </h2>
                  <p className="text-gray-600 mt-2">{ele.description}</p>
                  <p className="text-gray-900 font-bold mt-4">${ele.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
