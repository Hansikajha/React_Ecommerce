import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Toast from "./Toast";

export default function ProductCard({ product }) {      
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setShowToast(true);
  };

  return (
    <>
      <Toast
        message="Added to cart"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 flex flex-col group">
        
        {/* Product Image */}
        <div className="flex justify-center mb-4"> 
          <img
            src={product.image}
            alt={product.title}
            className="h-44 w-full object-contain rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <h2 className="text-md font-semibold text-gray-800 mb-1 line-clamp-2">
          {product.title}
        </h2>
        <p className="text-xl font-bold text-gray-900 mb-4">${product.price}</p>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          {/* View Details Button */}
          <Link
            to={`/product/${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium group-hover:text-[#CD2C58] group-hover:border-[#CD2C58]"
          >
            <FaEye className="group-hover:text-[#CD2C58] transition-colors" />
            <span className="group-hover:text-[#CD2C58] transition-colors">View</span>
          </Link>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg group-hover:bg-[#CD2C58] transition-colors text-sm font-medium"
          >
            <FaShoppingCart />
            Add
          </button>
        </div>
      </div>
    </>
  );
}
