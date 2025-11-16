import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import carterLogo from "../assets/carter_logo.png";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // get current path
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-3 py-2 rounded-md font-medium transition-colors ${
      isActive(path) 
        ? "text-[#CD2C58]" 
        : "text-[#F2F2F2] hover:text-[#CD2C58]"
    }`;

  return (
    <nav className="bg-[#1E1E1E] shadow-md sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={carterLogo} 
                alt="Carter Logo" 
                className="h-10 w-auto"
              />
              <span className="text-white text-xl font-bold">Carter</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link to="/products" className={linkClass("/products")}>
              Products
            </Link>
            <Link to="/contact" className={linkClass("/contact")}>
              Contact
            </Link>
            {/* Cart Icon */}
            <Link
              to="/cart"
              className={`relative transition-colors ${
                isActive("/cart")
                  ? "text-[#CD2C58]"
                  : "text-[#F2F2F2] hover:text-[#CD2C58]"
              }`}
            >
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-[#F2F2F2] focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1E1E1E] shadow-md">
          <Link
            to="/"
            onClick={toggleMenu}
            className={`block px-4 py-2 ${
              isActive("/") ? "text-[#CD2C58]" : "text-[#F2F2F2] hover:text-[#CD2C58]"
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={toggleMenu}
            className={`block px-4 py-2 ${
              isActive("/products")
                ? "text-[#CD2C58]"
                : "text-[#F2F2F2] hover:text-[#CD2C58]"
            }`}
          >
            Products
          </Link>
          <Link
            to="/contact"
            onClick={toggleMenu}
            className={`block px-4 py-2 ${
              isActive("/contact")
                ? "text-[#CD2C58]"
                : "text-[#F2F2F2] hover:text-[#CD2C58]"
            }`}
          >
            Contact
          </Link>
          <Link
            to="/cart"
            onClick={toggleMenu}
            className={`flex items-center px-4 py-2 relative ${
              isActive("/cart")
                ? "text-[#CD2C58]"
                : "text-[#F2F2F2] hover:text-[#CD2C58]"
            }`}
          >
            <FaShoppingCart size={20} className="mr-2" />
            Cart
            {cartCount > 0 && (
              <span className="absolute top-2 right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}
