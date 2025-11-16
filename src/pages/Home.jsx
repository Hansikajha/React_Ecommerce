import React, { useState, useEffect, useRef } from "react";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import page1Image from "../assets/page 1.png";
import page2Image from "../assets/page 2.png";
import page3Image from "../assets/page 3.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideIntervalRef = useRef(null);

  const slides = [
    {
      image: page1Image,
    },
    {
      image: page2Image,
    },
    {
      image: page3Image,
    },
  ];

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      slideIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    };

    startAutoSlide();

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    // Reset auto-slide timer when manually navigating
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const goToPrevious = () => {
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    goToSlide(newIndex);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Slider */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        {/* Slides Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-full relative"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-800 p-3 rounded-full transition-all duration-300 z-20 shadow-lg"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-xl" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-800 p-3 rounded-full transition-all duration-300 z-20 shadow-lg"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-xl" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white w-8"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
       <div className="text-center mb-12">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 relative inline-block">
    Our Products
    {/* Decorative underline */}
    <span className="block w-20 h-1 bg-[#CD2C58] mx-auto mt-2 rounded-full"></span>
  </h2>
  <p className="text-gray-500 text-sm md:text-base">
    Browse our curated selection of high-quality products
  </p>
</div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      
    </div>
  );
}
