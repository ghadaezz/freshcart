"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductCarousel({
  images,
}: {
  images: string[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <>

    <div className="content">
      <Swiper 
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images.map((img) => {
          return (
            <SwiperSlide key={img}>
              <Image
                alt=""
                width={600}
                height={600}
                src={img}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Swiper 
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images.map((img) => {
          return (
            <SwiperSlide key={img}>
              <Image
                alt=""
                width={600}
                height={600}
                src={img}
              />
            </SwiperSlide>
          );
        })}
      </Swiper></div>
    </>
  );
}