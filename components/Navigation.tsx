
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Small threshold to trigger the visual "grounding" of the header
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path 
    ? "text-primary font-black" 
    : "text-slate-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary";

  // Using Fixed instead of Sticky for better mobile compatibility
  // Solid background from the start to prevent transparency flickering on Home hero blurs
  const headerStyles = isScrolled 
    ? 'bg-background-light dark:bg-background-dark border-gray-200 dark:border-gray-800 shadow-lg' 
    : 'bg-background-light dark:bg-background-dark border-transparent shadow-none';

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] w-full h-20 border-b transition-all duration-300 ease-in-out ${headerStyles}`}>
      <div className="container mx-auto max-w-[1200px] h-full px-4 md:px-6">
        <div className="flex h-full items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => navigate('/')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-2xl font-bold">analytics</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              Vinay<span className="text-primary">Saw</span>
            </h1>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 justify-center gap-10">
            {navItems.map(item => (
              <Link key={item.path} to={item.path} className={`text-base font-semibold transition-colors ${isActive(item.path)}`}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              aria-label="Toggle Mobile Menu"
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white"
            >
              <span className="material-symbols-outlined text-2xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Sidebar/Menu */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[300px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}`}>
        <div className="flex flex-col gap-6 px-6">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold ${isActive(item.path)}`}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
