import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed left-4 top-20 z-50 animate-slide-in-left">
      <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 border-l-4 border-[#CD2C58] min-w-[250px]">
        <FaCheckCircle className="text-[#CD2C58] text-xl" />
        <span className="text-gray-800 font-medium">{message}</span>
      </div>
    </div>
  );
}

