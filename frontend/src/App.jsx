import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import PromoSection from "./components/PromoSection";
import WorkingProcess from "./components/WorkingProcess";
import Teams from "./components/Teams"
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <PromoSection />
      <WorkingProcess />
      <Teams />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
