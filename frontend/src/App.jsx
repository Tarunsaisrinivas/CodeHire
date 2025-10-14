import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import PromoSection from "./components/PromoSection";
import CaseStudies from "./components/CaseStudies";
import WorkingProcess from "./components/WorkingProcess";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import UserRoute from "./router/UserRoute"
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <PromoSection />
      <CaseStudies />
      <WorkingProcess />
      <Testimonials />
      <Contact />
      <Footer />
      {/* <UserRoute /> */}
    </>
  );
}

export default App;
