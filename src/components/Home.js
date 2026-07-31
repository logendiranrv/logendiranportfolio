import React from 'react';
import Header from './header';
import Hero from './hero';
import About from './about';
import Skills from './skills';
import Education from './education';
import Experience from './experience';
import Certificates from './certificates';
import Projects from './projects';
import Contact from './contact';
import Footer from './footer';
import ScrollToTop from './ScrollToTop';
import Background3D from './Background3D';

const Home = () => {
  return (
    <>
      <Background3D />
      <Header />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Certificates />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Home;
