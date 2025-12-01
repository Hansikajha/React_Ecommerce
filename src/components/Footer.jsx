import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import carterLogo from "../assets/carter_logo.png";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand Section */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <img
              src={carterLogo}
              alt="Carter Logo"
              className="h-10 w-auto"
            />
          </Link>
          <p className="text-gray-400 text-sm">
            Quality products, delivered to your doorstep. Shop with confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-[#CD2C58] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-[#CD2C58] transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#CD2C58] transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#CD2C58] transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

       

        {/* Social / Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-8 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Carter. All rights reserved.
      </div>
    </footer>
  );
}
