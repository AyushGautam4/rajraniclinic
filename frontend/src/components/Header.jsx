import React, { useContext, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Clock, Globe, Menu, Moon, Phone, Sun, X } from 'lucide-react';
import { Button } from './ui/button';
import { hospitalInfo, translations } from '../mockData';
import { AppContext } from '../App';
import AppointmentModal from './AppointmentModal';
import HospitalLogo from './HospitalLogo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const headerRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const scrolledStateRef = useRef(false);
  const hiddenStateRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const { darkMode, toggleDarkMode, language, toggleLanguage } = useContext(AppContext);
  const t = translations[language];
  const workingHoursLabel = language === 'hi' ? hospitalInfo.workingHoursHindi : hospitalInfo.workingHours;
  const emergencyLabel = 'Emergency 24/7';
  const appointmentLabel = language === 'hi' ? 'Appointment Book Karein' : 'Book Appointment';
  const languageToggleLabel = language === 'en' ? 'Hindi' : 'EN';

  React.useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty('--site-header-height', `${headerRef.current.offsetHeight}px`);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [language, isMobileMenuOpen]);

  React.useEffect(() => {
    const syncScrolledState = () => {
      scrollFrameRef.current = null;
      const currentScrollY = window.scrollY;
      const nextScrolledState = currentScrollY > 18;
      const goingDown = currentScrollY > lastScrollYRef.current + 8;
      const goingUp = currentScrollY < lastScrollYRef.current - 8;
      let nextHiddenState = hiddenStateRef.current;

      if (scrolledStateRef.current !== nextScrolledState) {
        scrolledStateRef.current = nextScrolledState;
        setIsScrolled(nextScrolledState);
      }

      if (isMobileMenuOpen || currentScrollY < 56 || goingUp) {
        nextHiddenState = false;
      } else if (currentScrollY > 140 && goingDown) {
        nextHiddenState = true;
      }

      if (hiddenStateRef.current !== nextHiddenState) {
        hiddenStateRef.current = nextHiddenState;
        setIsHeaderHidden(nextHiddenState);
      }

      lastScrollYRef.current = currentScrollY;
    };

    const handleScroll = () => {
      if (scrollFrameRef.current != null) {
        return;
      }

      scrollFrameRef.current = window.requestAnimationFrame(syncScrolledState);
    };

    lastScrollYRef.current = window.scrollY;
    syncScrolledState();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (scrollFrameRef.current != null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [isMobileMenuOpen]);

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      hiddenStateRef.current = false;
      setIsHeaderHidden(false);
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: t.home, path: '/' },
    { name: t.services, path: '/services' },
    { name: t.doctors, path: '/doctors' },
    { name: t.diagnostics, path: '/diagnostics' },
    { name: t.about, path: '/about' },
    { name: t.contact, path: '/contact' }
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ${
          isHeaderHidden ? '-translate-y-[calc(100%+0.5rem)]' : 'translate-y-0'
        }`}
      >
        <div
          className={`hidden overflow-hidden px-4 py-1.5 text-xs transition-colors duration-300 md:block ${
            darkMode
              ? 'bg-gradient-to-r from-blue-900 via-slate-900 to-teal-900 text-gray-200'
              : 'bg-gradient-to-r from-blue-600 to-teal-600 text-white'
          }`}
        >
          <div className="container mx-auto flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => window.location.href = `tel:${hospitalInfo.phone}`}
                className="topbar-pill transition-all duration-300 hover:-translate-y-0.5 hover:opacity-100"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{hospitalInfo.phone}</span>
              </button>
              <div className="topbar-pill">
                <Clock className="h-3.5 w-3.5" />
                <span>{workingHoursLabel}</span>
              </div>
            </div>

            <div className="topbar-pill topbar-pill-emergency">
              <Clock className="h-3.5 w-3.5" />
              <span>{emergencyLabel}</span>
            </div>
          </div>
        </div>

        <nav className="container mx-auto px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
          <div
            className={`group relative overflow-hidden rounded-[1.9rem] border px-3 py-2.5 shadow-[0_14px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-200 sm:px-4 lg:px-5 ${
              darkMode
                ? 'border-slate-800 bg-slate-950/96 text-white hover:border-blue-500/30 hover:shadow-[0_18px_34px_rgba(15,23,42,0.24)]'
                : 'border-white/75 bg-white/96 text-slate-900 hover:border-blue-100 hover:shadow-[0_18px_34px_rgba(15,23,42,0.12)]'
            } ${isScrolled ? 'shadow-[0_16px_28px_rgba(15,23,42,0.12)]' : ''}`}
          >
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent opacity-80" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-teal-400/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <Link to="/" className="group/logo flex min-w-0 items-center gap-3" data-testid="logo-link">
                <HospitalLogo size="lg" className="transition-transform duration-300 group-hover/logo:scale-[1.03]" />
                <div className="min-w-0">
                  <p className={`truncate text-base font-bold sm:text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {language === 'hi' ? hospitalInfo.nameHindi : hospitalInfo.name}
                  </p>
                  <p className={`hidden text-xs md:block ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {language === 'hi' ? hospitalInfo.taglineHindi : hospitalInfo.tagline}
                  </p>
                </div>
              </Link>

              <div className="hidden items-center gap-2 xl:gap-2.5 lg:flex">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => `nav-link-underline rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? darkMode
                          ? 'nav-link-active bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.28)]'
                          : 'nav-link-active bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.2)]'
                        : darkMode
                          ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                    data-testid={`nav-${link.path.replace('/', '') || 'home'}`}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <div className="hidden items-center gap-2.5 lg:flex">
                <button
                  onClick={toggleLanguage}
                  className={`flex items-center gap-1 rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 ${
                    darkMode ? 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="language-toggle"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {languageToggleLabel}
                </button>
                <button
                  onClick={toggleDarkMode}
                  className={`rounded-full p-2 transition-all duration-300 ${
                    darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="dark-mode-toggle"
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <Button
                  onClick={() => setShowAppointmentModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 px-5 text-sm text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-teal-700 hover:shadow-[0_16px_34px_rgba(37,99,235,0.25)]"
                  data-testid="book-appointment-btn"
                >
                  {appointmentLabel}
                </Button>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <button
                  onClick={toggleLanguage}
                  className={`rounded-full p-2 ${darkMode ? 'bg-slate-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  <Globe className="h-4 w-4" />
                </button>
                <button
                  onClick={toggleDarkMode}
                  className={`rounded-full p-2 ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <button
                  className={`rounded-full p-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  data-testid="mobile-menu-btn"
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {isMobileMenuOpen && (
              <div className={`mt-3 rounded-[1.5rem] border p-3 lg:hidden ${
                darkMode ? 'border-slate-800 bg-slate-900/95' : 'border-slate-200 bg-slate-50/95'
              }`}>
                <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white/60 px-3 py-3 dark:bg-slate-950/80">
                  <HospitalLogo size="md" />
                  <div>
                    <p className="text-sm font-bold">{language === 'hi' ? hospitalInfo.nameHindi : hospitalInfo.name}</p>
                    <p className={`mt-1 text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {language === 'hi' ? hospitalInfo.taglineHindi : hospitalInfo.tagline}
                    </p>
                  </div>
                </div>

                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => `block rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? darkMode
                          ? 'bg-slate-800 text-blue-300'
                          : 'bg-blue-50 text-blue-700'
                        : darkMode
                          ? 'text-gray-300 hover:bg-slate-800'
                          : 'text-gray-700 hover:bg-white'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}

                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowAppointmentModal(true);
                  }}
                  className="mt-3 w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white"
                >
                  {appointmentLabel}
                </Button>
              </div>
            )}
          </div>
        </nav>
      </header>
      <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
    </>
  );
};

export default Header;
