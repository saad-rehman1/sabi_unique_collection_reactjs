import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useCategoryStore } from '../Services/EndPoint/shopebycategory';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Optional icon lib, or use any SVG

export default function ShopeByCategory() {
  const { categories, fetchCategories, loading, error } = useCategoryStore();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="w-full px-4 py-16 bg-gradient-to-br from-pink-50 to-pink-100 relative">
      <h2 className="text-4xl font-extrabold text-center text-pink-900 mb-4">
        Shop By Category
      </h2>
      <p className="text-center text-pink-800 mb-12 text-lg">
        Explore styles handpicked for every occasion and mood.
      </p>

      {loading ? (
        <div className="text-center text-lg text-pink-900">Loading categories...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : categories.length === 0 ? (
        <div className="text-center text-gray-500">No categories found.</div>
      ) : (
        <div className="relative">
          {/* Custom Arrows */}
          <button
            ref={prevRef}
            className="absolute z-20 left-[-15px] top-1/2 transform -translate-y-1/2 bg-white text-pink-900 border border-pink-200 rounded-full p-2 shadow-md hover:bg-pink-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            ref={nextRef}
            className="absolute z-20 right-[-15px] top-1/2 transform -translate-y-1/2 bg-white text-pink-900 border border-pink-200 rounded-full p-2 shadow-md hover:bg-pink-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay, Navigation]}
            className="w-full"
          >
            {categories.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img
                    src={item.image?.url}
                    alt={item.name}
                    className="w-full h-[280px] object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10 flex flex-col justify-end p-6">
                    <h3 className="text-white text-2xl font-bold mb-3 drop-shadow-md">
                      {item.name}
                    </h3>
                    <a
                      href={`#/${item.slug}`}
                      className="w-20 px-3 py-1 text-pink-950 bg-white hover:bg-white hover:text-pink-700 border border-white rounded-full font-semibold transition-all duration-300"
                    >
                      Explore
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
