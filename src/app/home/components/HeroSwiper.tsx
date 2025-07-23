import { notFound } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import { Category } from "@/data/projects";
import Image from "next/image";
import { FreeMode } from "swiper/modules";

interface HeroSwiperProps {
  categories: Category[];
}

function HeroSwiper({ categories }: HeroSwiperProps) {
  if (!categories) {
    notFound();
  }

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      freeMode={true}
      style={{
        height: "40rem",
        width: "100%",
      }}
      modules={[FreeMode]}
    >
      {categories.map((category, index) => (
        <SwiperSlide
          key={index}
          className="flex h-full items-center justify-center overflow-hidden bg-cover"
        >
          <Image src={category.thumbnail} alt={category.title}  width={500} height={300} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroSwiper;
