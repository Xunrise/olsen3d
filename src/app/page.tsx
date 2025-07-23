"use client";
import Header from "@/app/shared/components/Header";
import Hero from "@/app/home/components/Hero";
import Services from "@/app/home/components/Services";
import Portfolio from "@/app/home/components/Portfolio";
import Contact from "@/app/home/components/Contact";
import Footer from "@/app/shared/components/Footer";
import { useEffect } from "react";
import { useHasMounted } from "@/app/hooks/useHasMounted";
import styles from "./page.module.css";
import HeroSwiper from "./home/components/HeroSwiper";
import { categories } from "@/data/projects";

export default function Home() {
  const hasMounted = useHasMounted();

  useEffect(() => {
    // Font Awesome CDN
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
    document.head.appendChild(link);
    // Scroll event for header
    const header = document.getElementById("header");
    const onScroll = () => {
      if (window.scrollY > 50) {
        header?.classList.add("scrolled");
      } else {
        header?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.head.removeChild(link);
    };
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Hero />
        <HeroSwiper categories={categories} />
        <div className={styles.servicesSection}>
          <Services />
        </div>
        <div className={styles.portfolioSection}>
          <Portfolio />
        </div>
        <div className={styles.contactSection}>
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  );
}
