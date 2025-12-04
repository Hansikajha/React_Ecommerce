import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Toast from "../components/Toast";
import { CiLocationOn } from "react-icons/ci";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiHandCoins } from "react-icons/pi";
import { MdAutorenew } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const { addToCart } = useCart();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(id);
      setProduct(data);

      // Initialize rating if available
      if (data?.rating?.rate) {
        setUserRating(data.rating.rate);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      setShowToast(true);
    }
  };

  const handleAddComment = () => {
    if (comment.trim() === "") return;

    setComments((prev) => [...prev, comment]);
    setComment(""); // clear input
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

      <div className="max-w-6xl mx-auto space-y-12">


        {/*        SECTION 1          */}

        <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT: IMAGE */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-6">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[350px] object-contain"
            />
          </div>

          {/* MIDDLE: PRODUCT DETAILS */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

              <p className="mt-1 text-gray-500 text-sm">
                Brand:
                <span className="font-medium text-gray-700 ml-1">
                  {product.brand || "Unknown Brand"}
                </span>
              </p>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1">
                <p className="text-gray-500 text-sm">Rating:</p>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={`text-xl cursor-pointer ${star <= userRating ? "text-yellow-400" : "text-gray-300"
                      }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="mt-3 text-2xl font-semibold text-[#CD2C58]">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 bg-gray-200"
                >
                  -
                </button>

                <span className="px-6 py-2">{quantity}</span>

                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2 bg-gray-200"
                >
                  +
                </button>
              </div>

              <button className="flex items-center gap-2 bg-[#CD2C58] text-white px-6 py-3 rounded-lg"
                onClick={handleAddToCart}>
                <FaShoppingCart />
                Add to Cart
              </button>
            </div>
          </div>

          {/* RIGHT: DELIVERY OPTIONS */}
          <div className=" bg-gray-50 rounded-lg p-4 flex flex-col justify-start h-full">

            <h2 className="text-gray-800 font-semibold text-sm mb-3 mt-4">
              Delivery Options
            </h2>

            {/* Location */}
            <div className="flex items-start gap-2 text-sm text-gray-700 mb-3">
              <CiLocationOn className="text-gray-500 text-lg" />
              <div>
                Bagmati, Kathmandu <br />
                <span className="text-blue-600 text-xs cursor-pointer">Change</span>
              </div>
            </div>

            {/* Standard Delivery */}
            <div className="flex items-start gap-2 text-sm text-gray-700 mb-3">
              <LiaShippingFastSolid className="text-gray-500 text-lg" />
              <div>
                Standard Delivery
                <div className="text-gray-500 text-xs">Rs. 83</div>
              </div>
            </div>

            {/* Cash On Delivery */}
            <div className="flex items-start gap-2 text-sm text-gray-700 mb-3">
              <PiHandCoins className="text-gray-500 text-lg" />
              <p>Cash on Delivery Available</p>
            </div>

            {/* Return & Warranty */}
            <h2 className="text-gray-800 font-semibold text-sm mt-15 mb-3">
              Return & Warranty
            </h2>

            <div className="flex items-start gap-2 text-sm text-gray-700 mt-2 mb-2">
              <MdAutorenew className="text-gray-500 text-lg" />
              <p>14 Days Free Returns</p>
            </div>

            <div className="flex items-start gap-2 text-sm text-gray-700">
              <RiErrorWarningLine className="text-gray-500 text-lg" />
              <p>Warranty not available</p>
            </div>

          </div>

        </div>

        {/*        SECTION 2          */}

        <div className="bg-white rounded-xl shadow-md p-6 min-h-[300px]">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>
          </div>
        </div>


        {/*        SECTION 3          */}

        <div className="bg-white rounded-xl shadow-md p-6 min-h-[300px]">
          <h2 className="text-xl font-semibold mb-4">Reviews & Comments</h2>

          {/* Comment Input */}
          <div className="flex gap-2 mb-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              className="w-full h-15 border border-gray-400 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              rows="3"
            ></textarea>

            <button
              onClick={handleAddComment}
              className="bg-[#CD2C58] text-white px-4 py-2 rounded-lg hover:bg-[#b0254a] transition"
            >
              Post
            </button>
          </div>

          {/* Comment List */}
          <div className="space-y-3">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-sm">No comments yet. Be the first!</p>
            ) : (
              comments.map((c, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-md p-3 text-sm text-gray-700"
                >
                  {c}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
