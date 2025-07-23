import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { mainSlider } from "../Services/EndPoint/slider";

export default function ImageSlider() {
  const { sarees, fetchSarees, loading, error } = mainSlider();

  useEffect(() => {
    fetchSarees();
  }, [fetchSarees]);

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading slider...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  if (!sarees.length) {
    return <div className="text-center mt-10">No slider images available</div>;
  }

  return (
    <div className="w-full h-screen relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        className="w-full h-full"
      >
        {sarees.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={item?.image?.url || 'https://via.placeholder.com/1200x600?text=No+Image'}
                alt={item?.title || `Slide ${index}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 px-4 py-3 rounded-lg max-w-[70%]">
                <h3 className="text-xl font-bold text-black">{item.title}</h3>
                {item.subtitle && (
                  <p className="text-sm text-gray-700">{item.subtitle}</p>
                )}
                {item.buttonText && (
                  <button className="mt-3 px-4 py-2 bg-pink-700 text-white rounded hover:bg-pink-800 transition text-sm">
                    {item.buttonText}
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
