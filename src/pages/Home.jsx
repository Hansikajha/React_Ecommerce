import React, { useState, useEffect, useRef, useCallback } from "react";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import page1Image from "../assets/page 1.png";
import page2Image from "../assets/page 2.png";
import page3Image from "../assets/page 3.png";
import womenWearImage from "../assets/women-wear.jpg";
import menWearImage from "../assets/men-wear.jpg";
import bannerImage from "../assets/banner.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FullPageSkeleton from "../components/FullPageSkeleton";



export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const slideIntervalRef = useRef(null);
  const sliderRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(null);
  const activePointerIdRef = useRef(null);

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

  const handlePointerUp = useCallback(() => {
    if (sliderRef.current && activePointerIdRef.current !== null) {
      try {
        sliderRef.current.releasePointerCapture(activePointerIdRef.current);
      } catch (error) {
        // Ignore if capture was already released
      }
    }
    isDraggingRef.current = false;
    dragStartXRef.current = null;
    activePointerIdRef.current = null;
    setIsDragging(false);
  }, []);

  const handlePointerMove = useCallback(
    (deltaX) => {
      if (!isDraggingRef.current || dragStartXRef.current === null) return;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          goToPrevious();
        } else {
          goToNext();
        }
        handlePointerUp();
      }
    },
    [goToNext, goToPrevious, handlePointerUp]
  );

  const handlePointerDown = useCallback(
    (event) => {
      if (!sliderRef.current) return;
      isDraggingRef.current = true;
      dragStartXRef.current = event.clientX;
      activePointerIdRef.current = event.pointerId;
      sliderRef.current.setPointerCapture?.(event.pointerId);
      setIsDragging(true);
    },
    []
  );

  const handlePointerMoveEvent = useCallback(
    (event) => {
      if (!isDraggingRef.current || dragStartXRef.current === null) return;
      const deltaX = event.clientX - dragStartXRef.current;
      handlePointerMove(deltaX);
    },
    [handlePointerMove]
  );

  const handlePointerEndEvent = useCallback(
    () => {
      handlePointerUp();
    },
    [handlePointerUp]
  );

  if (loading) {
    return <FullPageSkeleton />;
  }

  const womenProducts = products.filter((product) =>
    product?.category?.toLowerCase().includes("women")
  );
  const womenProductsLimited = womenProducts.slice(0, 4);

  const menProducts = products.filter((product) =>
    product?.category?.toLowerCase().includes("men")
  );
  const menProductsLimited = menProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Slider */}
      <div
        ref={sliderRef}
        className={`relative w-full h-[400px] md:h-[500px] overflow-hidden select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMoveEvent}
        onPointerUp={handlePointerEndEvent}
        onPointerLeave={handlePointerEndEvent}
      >
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                  ? "bg-white w-8"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Women Collection Spotlight */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Image Column */}
          <div className="flex-1 flex overflow-hidden rounded-3xl shadow-lg">
            <img
              src={womenWearImage}
              alt="Women collection spotlight"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Column */}
          <div className="flex-1 flex flex-col w-full bg-white rounded-3xl shadow-lg border border-gray-100">
            <div className="flex-none flex items-center justify-center text-center px-6 py-10 border-b border-gray-100">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Women's Collection
              </h2>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-center">
              {womenProductsLimited.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {womenProductsLimited.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">
                  Women collection is currently unavailable.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page Banner */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <img
            src={bannerImage}
            alt="Seasonal promotion banner"
            className="w-full object-cover"
          />
        </div>
      </section>

      {/* Men's Collection Spotlight */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Products Column */}
          <div className="flex-1 flex flex-col w-full bg-white rounded-3xl shadow-lg border border-gray-100">
            <div className="flex-none flex items-center justify-center text-center px-6 py-10 border-b border-gray-100">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Men's Collection</h2>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-center">
              {menProductsLimited.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {menProductsLimited.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">Men collection is currently unavailable.</p>
              )}
            </div>
          </div>

          {/* Image Column */}
          <div className="flex-1 flex overflow-hidden rounded-3xl shadow-lg">
            <img src={menWearImage} alt="Men collection spotlight" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

    </div>
  );
}
