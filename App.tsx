
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portal from './pages/Portal';
import UnitPlans from './pages/UnitPlans';
import DesignCycles from './pages/DesignCycles';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Gateway from './pages/Gateway';
import PasswordProtect from './components/PasswordProtect';
import { SectionProvider } from './context/SectionContext';
import StickySectionLabel from './components/StickySectionLabel';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isHome && <StickySectionLabel />}
      <main className="flex-grow pt-[60px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem('thynk_preview_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return <div className="min-h-screen bg-white" />;
  }

  if (!isAuthenticated) {
    return <PasswordProtect onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <SectionProvider>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/digital-makerspace" element={<Portal />} />
            <Route path="/unit-plans" element={<UnitPlans />} />
            <Route path="/design-cycles" element={<DesignCycles />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gateway" element={<Gateway />} />
          </Routes>
        </Layout>
      </HashRouter>
    </SectionProvider>
  );
};

export default App;
