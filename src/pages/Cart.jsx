import React from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, getCartTotal } = useCart();

  const totalPrice = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600">
          Add some products to your cart to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Your Shopping Cart
      </h1>

      <div className="max-w-6xl mx-auto space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-32 h-32 object-contain rounded-lg"
            />

            <div className="flex-1 flex flex-col md:flex-row md:justify-between items-start md:items-center w-full">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <p className="text-gray-800 font-medium">Qty: {item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-2">
              Total: <span className="text-[#CD2C58]">${totalPrice.toFixed(2)}</span>
            </p>
            <p className="text-sm text-gray-600">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} item(s) in cart
            </p>
          </div>
          <Link
            to="/checkout"
            className="mt-4 md:mt-0 bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#CD2C58] transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
