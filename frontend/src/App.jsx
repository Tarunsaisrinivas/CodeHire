import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
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
      <Features />
      <WorkingProcess />
      <Testimonials />
      <Contact />
      <Footer />
      {/* <UserRoute /> */}
    </>
  );
}

export default App;
