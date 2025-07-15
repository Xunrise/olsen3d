"use client";

import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { notFound } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { Project } from "../../data/projects";

interface SwiperComponentProps {
  project: Project;
}

function SwiperComponent({ project }: SwiperComponentProps) {
  if (!project) {
    notFound();
  }
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      modules={[Navigation, Pagination, Scrollbar]}
      style={{ height: "500px" }}
    >
      {project.images.map((imagePath, index) => (
        <SwiperSlide key={index} style={{ position: "relative" }}>
          <Image
            src={imagePath}
            alt={`${project.title}  image ${index + 1}`}
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperComponent;
