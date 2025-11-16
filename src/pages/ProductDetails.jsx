import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Toast from "../components/Toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(id);
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      setShowToast(true);
    }
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Loading product...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toast
        message="Added to cart"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex gap-6">
        {/* Product Image */}
        <div className="md:flex-1 flex items-center justify-center bg-gray-100 p-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="md:flex-1 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-gray-600 mt-4">{product.description}</p>
            <p className="mt-4 text-2xl font-semibold text-blue-600">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <span className="px-6 py-2 text-gray-800 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 bg-[#CD2C58] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#b0254a] transition-colors"
            >
              <FaShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
