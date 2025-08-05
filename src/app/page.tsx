"use client";
import Hero from "@/app/home/components/Hero/Hero";
import Services from "@/app/home/components/Services/Services";
import Contact from "@/app/home/components/Contact/Contact";
import { useEffect } from "react";
import { useHasMounted } from "@/app/hooks/useHasMounted";
import "./page.css";
import Header from "./shared/components/Header/Header";
import Footer from "./shared/components/Footer/Footer";

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
      <div className="grid-background"></div>
      <Header />
      <Hero />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
