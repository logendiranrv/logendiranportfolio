import React, { useState } from 'react';
import IntroSplash from './IntroSplash';
import Header from './header';
import Hero from './hero';
import About from './about';
import Projects from './projects';
import Experience from './experience';
import Certificates from './certificates';
import Contact from './contact';
import Footer from './footer';
import ScrollToTop from './ScrollToTop';

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <IntroSplash onFinish={() => setShowSplash(false)} />
      ) : (
        <div className="main-portfolio-content">
          <Header />
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Certificates />
          <Contact />
          <Footer />
          <ScrollToTop />
        </div>
      )}
    </>
  );
};

export default Home;
