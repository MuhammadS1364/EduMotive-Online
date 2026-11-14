import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import { Toaster } from '@project/components/ui/sonner';
import { Button } from '@project/components/ui/button';
import { DataProvider, useData } from './lib/data';
import { applyTheme, watchSystemTheme } from './lib/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import AdSpot from './components/AdSpot';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticlePage from './pages/ArticlePage';
import Magazine from './pages/Magazine';
import { AuthorsList, AuthorProfile } from './pages/Authors';
import { Programs, Results } from './pages/ProgramsResults';
import About from './pages/About';
import Subscribe from './pages/Subscribe';
import Advertise from './pages/Advertise';
import Contact from './pages/Contact';
import News from './pages/News';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function PageTransition() {
  const loc = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={loc.pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

function SeoTags() {
  const { site } = useData();
  useEffect(() => {
    document.title = 'EduMotive — Student Magazine';
    const code = site?.settings.googleVerificationCode;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
    m.setAttribute('content', 'EduMotive is a student magazine of articles, campus voices, programs and results — read the latest issue online.');
    if (code && !document.querySelector('meta[name="google-site-verification"]')) {
      const g = document.createElement('meta'); g.name = 'google-site-verification'; g.content = code; document.head.appendChild(g);
    }
  }, [site]);
  return null;
}

function Layout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="liquid-bg"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <Header />
      <main className="flex-1"><PageTransition /></main>
      <Footer />
      <AdSpot />
      <SeoTags />
      <Toaster />
    </div>
  );
}

export default function App() {
  useEffect(() => { applyTheme(); return watchSystemTheme(); }, []);
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/magazine" element={<Magazine />} />
            <Route path="/magazine/:id" element={<Magazine />} />
            <Route path="/authors" element={<AuthorsList />} />
            <Route path="/authors/:id" element={<AuthorProfile />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/results" element={<Results />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/issues" element={<Magazine />} />
            <Route path="/issues/:id" element={<Magazine />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="*" element={<div className="py-24 text-center space-y-4"><h1 className="text-4xl font-black">Page not found</h1><Button asChild><Link to="/">Go to Home</Link></Button></div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
