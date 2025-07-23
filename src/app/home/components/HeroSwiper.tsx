import { notFound } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Category } from "@/data/projects";
import Image from "next/image";
import { FreeMode, Pagination } from "swiper/modules";
import styles from "./Hero.module.css";

interface HeroSwiperProps {
  categories: Category[];
}

function HeroSwiper({ categories }: HeroSwiperProps) {
  if (!categories) {
    notFound();
  }

  return (
    <div className={styles.heroSwiperContainer}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[FreeMode, Pagination]}
        className={styles.swiper}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <div className={styles.slideContent}>
              <div className={styles.slideImageWrapper}>
                <Image 
                  src={category.thumbnail} 
                  alt={category.title}  
                  width={500} 
                  height={300} 
                  className={styles.slideImage}
                />
              </div>
              <div className={styles.slideText}>
                <h3>{category.title}</h3>
                <p>{category.summary}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSwiper;
