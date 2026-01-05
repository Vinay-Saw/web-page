
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import AIConsultant from './pages/AIConsultant';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { portfolio } from './data/portfolio';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Footer = () => (
  <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-center md:text-left">
        <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
          {portfolio.profile.firstName} <span className="text-primary">{portfolio.profile.lastName}</span>
        </span>
        <p className="text-slate-500 text-sm mt-2">{portfolio.profile.role} & IIT Madras Data Science Student.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold">
        <a href={portfolio.profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-slate-600 dark:text-slate-300">LinkedIn</a>
        <a href={`mailto:${portfolio.profile.email}`} className="hover:text-primary transition-colors text-slate-600 dark:text-slate-300">Email</a>
        <a href={portfolio.profile.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-slate-600 dark:text-slate-300">GitHub</a>
      </div>
      <p className="text-slate-400 text-xs text-center md:text-right">© {new Date().getFullYear()} {portfolio.profile.name}. Built with Gemini AI.</p>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white selection:bg-primary/20">
        <Navigation />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <AIConsultant />
      </div>
    </HashRouter>
  );
};

export default App;
