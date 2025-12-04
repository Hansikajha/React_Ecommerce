import React, { useState } from "react";
import sweater from "../assets/sweater.jpg";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Order placed successfully!");

    // Clear cart
    clearCart();

    // Clear form
    setForm({
      name: "",
      email: "",
      address: "",
      city: "",
      country: "",
      zip: "",
    });
  };

  return (
    <div className="min-h-800 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Checkout
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Billing Details */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-xl space-y-4 max-h-[550px] overflow-y-auto"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Billing Details
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP / Postal Code"
                value={form.zip}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-gray-800 text-white font-semibold py-3 rounded-xl hover:bg-[#CD2C58] transition-colors"
            >
              Place Order
            </button>
          </div>
        </form>

        {/* Right Side Image */}
        <div className="flex justify-center items-center h-[550px]">
          <img
            src={sweater}
            alt="Image"
            className="rounded-2xl shadow-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
