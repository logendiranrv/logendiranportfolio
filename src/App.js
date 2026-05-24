import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import './components/components.css';
import Header from './components/header';
import Hero from './components/hero';
import About from './components/about';
import Skills from './components/skills';
import Education from './components/education';
import Experience from './components/experience';
import Projects from './components/projects';
import Contact from './components/contact';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import Background3D from './components/Background3D';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);
  return (
    <div className="App">
      <Background3D />
      <Header />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;