import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import FeaturedProjects from "./components/FeaturedProjects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <FeaturedProjects />
      <Contact />
      <Footer />
    </>
  );
}
