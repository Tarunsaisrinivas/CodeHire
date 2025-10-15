import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import PromoSection from "./PromoSection";
import ServicesSection from "./Services";
import TeamSection from "./Teams";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Footer from "./Footer";
import WorkingProcess from "./WorkingProcess";

const Main = () => {
  return <div className="bg-white">
    <Navbar />
    <Hero />
    <PromoSection />
    <WorkingProcess />
    <ServicesSection />
    <TeamSection />
    <Testimonials />
    <Contact />
    <Footer />
  </div>;
};

export default Main;
