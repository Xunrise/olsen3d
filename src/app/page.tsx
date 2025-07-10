"use client";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useHasMounted } from "./hooks/useHasMounted";

export default function Home() {
  const hasMounted = useHasMounted();

  useEffect(() => {
    // Font Awesome CDN
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
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
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
}
