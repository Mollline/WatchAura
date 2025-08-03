"use client";

import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { Product } from "./components/product";
import Footer from "./components/footer";
import { BasketItem } from "@/types";

const images = [
  "https://res.cloudinary.com/djy2x9wmg/image/upload/v1753771512/watch3_jhktmq.jpg",
  "https://res.cloudinary.com/djy2x9wmg/image/upload/v1753771512/watch2_m3jt2k.jpg",
  "https://res.cloudinary.com/djy2x9wmg/image/upload/v1753771512/upscalemedia-transformed_3_ewopom.jpg",
];

export default function Home() {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsAnimating(false);
      }, 1000); // time for slide transition
    }, 6000); // total time per slide

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col z-10">
      {/* Background Container */}
      <div className="fixed inset-0 z-0 w-full h-screen overflow-hidden pointer-events-none">
        <div className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Slide ${i + 1}`}
              className={`w-full h-screen object-cover flex-shrink-0 transition-transform duration-[6000ms] ease-in-out ${
                currentIndex === i ? "scale-110" : "scale-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <Header basket={basket} setBasket={setBasket} />

      {/* Spacer */}
      <div className="h-screen" />

      {/* Thumbnails */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumb ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-16 h-16 rounded-lg object-cover cursor-pointer border-2 transition-transform duration-300 ${
              index === currentIndex
                ? "border-white scale-110"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          />
        ))}
      </div>

      {/* Product Section */}
      <main className="z-10 relative flex flex-wrap justify-center gap-4 max-w-7xl mx-auto mt-8 px-4 py-6 bg-white bg-opacity-90 backdrop-blur-md rounded-t-2xl shadow-lg">
        <Product />
      </main>

      {/* Footer */}
      <div className="z-10 relative">
        <Footer />
      </div>
    </div>
  );
}
