import React, { useContext, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Ambulance, ArrowRight, Award, Baby, Bone, Building2, Camera, CalendarClock, ChevronDown, Clock, Globe, Heart, HeartPulse, Menu, MapPin, Monitor,
  Phone, Scan, Scissors, Stethoscope, Tag, TestTube, X, Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { consultantDoctors as doctors, diagnosticsInfo, hospitalInfo, services, translations } from '../mockData';
import { AppContext } from '../App';
import AppointmentModal from './AppointmentModal';
import HospitalLogo from './HospitalLogo';
import { assetPath } from '../lib/assetPath';

const specialityIconMap = { Stethoscope, Ambulance, HeartPulse, TestTube, Heart, Baby, Bone, Scan, Monitor, Scissors };
const diagnosticsIconMap = { Scan, HeartPulse, Monitor };
const NAV_DROPDOWN_PATHS = ['/services', '/doctors', '/diagnostics', '/about'];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const headerRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const scrolledStateRef = useRef(false);
  const hiddenStateRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const { darkMode, language, toggleLanguage } = useContext(AppContext);
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
      const nextScrolledState = currentScrollY > 80;
      const goingDown = currentScrollY > lastScrollYRef.current + 6;
      const goingUp = currentScrollY < lastScrollYRef.current - 6;
      let nextHiddenState = hiddenStateRef.current;

      if (scrolledStateRef.current !== nextScrolledState) {
        scrolledStateRef.current = nextScrolledState;
        setIsScrolled(nextScrolledState);
      }

      // Show header near the top always. Hide only after scrolling down
      // past the header itself, and always reveal again on scroll-up.
      if (currentScrollY < 120) {
        nextHiddenState = false;
      } else if (goingDown) {
        nextHiddenState = true;
      } else if (goingUp) {
        nextHiddenState = false;
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

  const topDoctors = doctors.slice(0, 6);
  const diagnosticsQuickLinks = diagnosticsInfo.offerCategories.slice(0, 4);
  const topOffer = diagnosticsInfo.offerCategories?.[0]?.tests?.[0] || null;

  const renderDropdownContent = (path, onLinkClick, showPromo) => {
    if (path === '/services') {
      const list = (
        <>
          <p className={`mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.14em] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {language === 'hi' ? 'सभी स्पेशलिटी' : 'All Specialities'}
          </p>
          <div className="grid grid-cols-2 gap-1">
            {services.map((service) => {
              const Icon = specialityIconMap[service.icon] || Stethoscope;
              return (
                <Link
                  key={service.id}
                  to={`/services#speciality-${service.id}`}
                  onClick={onLinkClick}
                  className={`flex items-center gap-2 rounded-xl px-2.5 py-2 transition-colors ${
                    darkMode ? 'hover:bg-slate-800' : 'hover:bg-blue-50'
                  }`}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${darkMode ? 'bg-blue-500/15' : 'bg-blue-50'}`}>
                    <Icon className="h-3.5 w-3.5 text-blue-500" />
                  </span>
                  <span className="min-w-0">
                    <span className={`block truncate text-xs font-bold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{language === 'hi' ? service.titleHindi : service.title}</span>
                    <span className={`block truncate text-[10px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      {service.consultationFee > 0 ? `Rs.${service.consultationFee}` : (language === 'hi' ? 'टेस्ट आधारित' : 'Test based')}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </>
      );
      const promo = (
        <div className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 p-4 text-white">
          <div>
            <Ambulance className="h-6 w-6" />
            <p className="mt-3 text-sm font-black leading-tight">{language === 'hi' ? 'इमरजेंसी 24/7' : 'Emergency Care, 24/7'}</p>
            <p className="mt-1.5 text-[11px] leading-5 text-white/85">{language === 'hi' ? 'हर समय तत्काल मदद उपलब्ध' : 'Immediate help, any time you need it'}</p>
          </div>
          <a
            href={`tel:${hospitalInfo.emergency}`}
            onClick={onLinkClick}
            className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-white/15 px-3 py-2 text-xs font-bold hover:bg-white/25"
          >
            <Phone className="h-3.5 w-3.5" />
            {language === 'hi' ? 'अभी कॉल करें' : 'Call Now'}
          </a>
        </div>
      );
      return { list, promo };
    }

    if (path === '/doctors') {
      const list = (
        <>
          <p className={`mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.14em] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {language === 'hi' ? 'हमारे डॉक्टर' : 'Meet Our Doctors'}
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {topDoctors.map((doctor) => (
              <Link
                key={doctor.id}
                to="/doctors"
                onClick={onLinkClick}
                className={`flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors ${
                  darkMode ? 'hover:bg-slate-800' : 'hover:bg-blue-50'
                }`}
              >
                <span className="h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white/60">
                  <img
                    src={assetPath(doctor.image)}
                    alt={doctor.name}
                    className="h-full w-full object-cover object-top"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assetPath('images/doctors/doctor-01.jpg'); }}
                  />
                </span>
                <span className="min-w-0">
                  <span className={`block truncate text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{doctor.name}</span>
                  <span className="block truncate text-[10.5px] text-blue-500">{doctor.specialization}</span>
                </span>
              </Link>
            ))}
          </div>
          <Link
            to="/doctors"
            onClick={onLinkClick}
            className={`mt-2 flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-bold ${
              darkMode ? 'bg-slate-800 text-teal-300 hover:bg-slate-700' : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
            }`}
          >
            {language === 'hi' ? 'सभी डॉक्टर देखें' : 'View All Doctors'}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </>
      );
      const promo = (
        <div className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-blue-600 to-teal-600 p-4 text-white">
          <div>
            <CalendarClock className="h-6 w-6" />
            <p className="mt-3 text-sm font-black leading-tight">{language === 'hi' ? 'सही डॉक्टर तय नहीं?' : 'Not sure who to see?'}</p>
            <p className="mt-1.5 text-[11px] leading-5 text-white/85">{language === 'hi' ? 'हम आपको सही डॉक्टर और समय बताएंगे' : "We'll guide you to the right doctor and time"}</p>
          </div>
          <button
            type="button"
            onClick={() => { onLinkClick?.(); setShowAppointmentModal(true); }}
            className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-white/15 px-3 py-2 text-xs font-bold hover:bg-white/25"
          >
            <ArrowRight className="h-3.5 w-3.5" />
            {language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}
          </button>
        </div>
      );
      return { list, promo };
    }

    if (path === '/diagnostics') {
      const list = (
        <>
          <p className={`mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.14em] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {language === 'hi' ? 'डायग्नोस्टिक हाइलाइट्स' : 'Diagnostics Highlights'}
          </p>
          <div className="mb-2 grid grid-cols-3 gap-1.5">
            {diagnosticsInfo.featureHighlights.map((item) => {
              const Icon = diagnosticsIconMap[item.icon] || Scan;
              return (
                <Link
                  key={item.title}
                  to="/diagnostics"
                  onClick={onLinkClick}
                  className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-center transition-colors ${
                    darkMode ? 'bg-slate-800/60 hover:bg-slate-800' : 'bg-slate-50 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="h-4 w-4 text-blue-500" />
                  <span className={`text-[10px] font-semibold leading-tight ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{item.title}</span>
                </Link>
              );
            })}
          </div>
          <p className={`mb-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.14em] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {language === 'hi' ? 'ऑफर कैटेगरी' : 'Offer Categories'}
          </p>
          <div className="space-y-1">
            {diagnosticsQuickLinks.map((cat) => (
              <Link
                key={cat.key}
                to="/diagnostics"
                onClick={onLinkClick}
                className={`flex items-start gap-2.5 rounded-xl px-2.5 py-2 transition-colors ${
                  darkMode ? 'hover:bg-slate-800' : 'hover:bg-blue-50'
                }`}
              >
                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${darkMode ? 'bg-teal-500/15' : 'bg-teal-50'}`}>
                  <Tag className="h-3.5 w-3.5 text-teal-600" />
                </span>
                <span className="min-w-0">
                  <span className={`flex items-center gap-1.5 text-xs font-bold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                    {cat.title}
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{cat.tests.length}</span>
                  </span>
                  <span className={`mt-0.5 block truncate text-[10.5px] leading-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{cat.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </>
      );
      const promo = topOffer ? (
        <div className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-700 p-4 text-white">
          <div>
            <Tag className="h-6 w-6" />
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/75">{language === 'hi' ? 'आज का ऑफर' : "Today's Offer"}</p>
            <p className="mt-1 text-sm font-black leading-tight">{topOffer.name}</p>
            <p className="mt-1.5 text-xs">
              <span className="mr-1.5 text-white/60 line-through">₹{topOffer.originalPrice}</span>
              <span className="text-base font-black">₹{topOffer.offerPrice}</span>
            </p>
          </div>
          <Link
            to="/diagnostics"
            onClick={onLinkClick}
            className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-white/15 px-3 py-2 text-xs font-bold hover:bg-white/25"
          >
            <ArrowRight className="h-3.5 w-3.5" />
            {language === 'hi' ? 'सभी ऑफर देखें' : 'View All Offers'}
          </Link>
        </div>
      ) : null;
      return { list, promo };
    }

    // /about
    const aboutLinks = [
      { icon: Building2, label: language === 'hi' ? 'हमारी कहानी' : 'Our Story', to: '/about' },
      { icon: Zap, label: language === 'hi' ? 'हमें क्यों चुनें' : 'Why Choose Us', to: '/#why-choose-us' },
      { icon: Award, label: language === 'hi' ? 'मान्यता' : 'Our Accreditation', to: '/#accreditation' },
      { icon: Stethoscope, label: language === 'hi' ? 'सेंटर ऑफ एक्सीलेंस' : 'Centre of Excellence', to: '/#centre-of-excellence' },
      { icon: Camera, label: language === 'hi' ? 'हॉस्पिटल गैलरी' : 'Hospital Gallery', to: '/#hospital-gallery' },
      { icon: Phone, label: language === 'hi' ? 'संपर्क करें' : 'Contact Us', to: '/contact' }
    ];
    const list = (
      <>
        <p className={`mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.14em] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          {language === 'hi' ? 'हमारे बारे में' : 'About Rajrani Hospital'}
        </p>
        <div className="grid grid-cols-2 gap-1">
          {aboutLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={onLinkClick}
                className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold transition-colors ${
                  darkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-blue-50'
                }`}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${darkMode ? 'bg-blue-500/15' : 'bg-blue-50'}`}>
                  <Icon className="h-3.5 w-3.5 text-blue-500" />
                </span>
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </>
    );
    const promo = (
      <div className="flex h-full flex-col overflow-hidden rounded-2xl text-white">
        <div className="relative h-20">
          <img src={assetPath('images/hospital/hospital-main.jpg')} alt="Rajrani Hospital" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 to-slate-950/10" />
        </div>
        <div className="flex flex-1 flex-col justify-between bg-gradient-to-br from-slate-800 to-slate-900 p-3">
          <p className="text-[11px] leading-5 text-white/85">
            {language === 'hi' ? `${hospitalInfo.yearsExperience} साल से पुरानी कोंडली की सेवा में` : `${hospitalInfo.yearsExperience} years serving Old Kondli`}
          </p>
          <a
            href={hospitalInfo.googleMapsLink}
            target="_blank"
            rel="noreferrer"
            onClick={onLinkClick}
            className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-white/15 px-3 py-2 text-xs font-bold hover:bg-white/25"
          >
            <MapPin className="h-3.5 w-3.5" />
            {language === 'hi' ? 'दिशा-निर्देश' : 'Get Directions'}
          </a>
        </div>
      </div>
    );
    return { list, promo };
  };

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
            className={`group relative overflow-visible rounded-[1.9rem] border px-3 py-2.5 shadow-[0_14px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-200 sm:px-4 lg:px-5 ${
              isScrolled 
                ? darkMode
                  ? 'border-slate-700/80 bg-slate-950/98 shadow-[0_20px_40px_rgba(15,23,42,0.3)]'
                  : 'border-slate-200/60 bg-white/98 shadow-[0_20px_40px_rgba(15,23,42,0.15)]'
                : darkMode
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
                {navLinks.map((link) => {
                  const hasDropdown = NAV_DROPDOWN_PATHS.includes(link.path);
                  const groupWrapClass = {
                    '/services': 'group/navservices relative',
                    '/doctors': 'group/navdoctors relative',
                    '/diagnostics': 'group/navdiagnostics relative',
                    '/about': 'group/navabout relative'
                  }[link.path];
                  const groupPanelClass = {
                    '/services': 'group-hover/navservices:visible group-hover/navservices:translate-y-2 group-hover/navservices:opacity-100',
                    '/doctors': 'group-hover/navdoctors:visible group-hover/navdoctors:translate-y-2 group-hover/navdoctors:opacity-100',
                    '/diagnostics': 'group-hover/navdiagnostics:visible group-hover/navdiagnostics:translate-y-2 group-hover/navdiagnostics:opacity-100',
                    '/about': 'group-hover/navabout:visible group-hover/navabout:translate-y-2 group-hover/navabout:opacity-100'
                  }[link.path];
                  const linkEl = (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) => `relative rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? darkMode
                            ? 'text-teal-300'
                            : 'text-teal-600'
                          : darkMode
                            ? 'text-gray-300 hover:text-white'
                            : 'text-gray-700 hover:text-blue-700'
                      }`}
                      data-testid={`nav-${link.path.replace('/', '') || 'home'}`}
                    >
                      {({ isActive }) => (
                        <>
                          {link.name}
                          <span
                            aria-hidden="true"
                            className={`absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-teal-500 transition-all duration-300 ${
                              isActive ? 'scale-x-100 opacity-100' : 'scale-x-95 opacity-0'
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  );

                  if (!hasDropdown) return linkEl;

                  const { list, promo } = renderDropdownContent(link.path, undefined, true);

                  return (
                    <div key={link.path} className={groupWrapClass}>
                      {linkEl}
                      <div
                        className={`invisible absolute left-1/2 top-full z-30 w-[32rem] -translate-x-1/2 translate-y-1 overflow-hidden rounded-2xl border opacity-0 shadow-2xl transition-all duration-200 ${groupPanelClass} ${
                          darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600" />
                        <div className="grid grid-cols-[1fr_11.5rem] gap-3 p-3">
                          <div className="min-w-0">{list}</div>
                          <div className="min-w-0">{promo}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                  className={`rounded-full p-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  data-testid="mobile-menu-btn"
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {isMobileMenuOpen && (
              <div className={`mt-3 rounded-[1.5rem] border p-3 lg:hidden overflow-hidden slide-down-animation ${
                darkMode ? 'border-slate-800 bg-slate-900/95' : 'border-slate-200 bg-slate-50/95'
              }`}
              style={{
                animation: 'slideDown 0.3s ease forwards'
              }}>
                <style>{`
                  @keyframes slideDown {
                    from {
                      opacity: 0;
                      transform: translateY(-10px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
                <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white/60 px-3 py-3 dark:bg-slate-950/80">
                  <HospitalLogo size="md" />
                  <div>
                    <p className="text-sm font-bold">{language === 'hi' ? hospitalInfo.nameHindi : hospitalInfo.name}</p>
                    <p className={`mt-1 text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {language === 'hi' ? hospitalInfo.taglineHindi : hospitalInfo.tagline}
                    </p>
                  </div>
                </div>

                {navLinks.map((link) => {
                  const hasDropdown = NAV_DROPDOWN_PATHS.includes(link.path);

                  if (!hasDropdown) {
                    return (
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
                    );
                  }

                  const isOpen = openMobileDropdown === link.path;

                  return (
                    <div key={link.path}>
                      <div className="flex items-center justify-between rounded-xl px-1">
                        <NavLink
                          to={link.path}
                          className={({ isActive }) => `flex-1 rounded-xl px-2 py-3 text-sm font-medium transition-colors ${
                            isActive
                              ? darkMode ? 'text-blue-300' : 'text-blue-700'
                              : darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.name}
                        </NavLink>
                        <button
                          type="button"
                          onClick={() => setOpenMobileDropdown((current) => (current === link.path ? null : link.path))}
                          aria-label={`Toggle ${link.name}`}
                          className={`rounded-full p-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {isOpen && (
                        <div className="ml-2 space-y-2 pb-3 pl-2 pt-1">
                          {(() => {
                            const { list, promo } = renderDropdownContent(link.path, () => setIsMobileMenuOpen(false), true);
                            return (
                              <>
                                {list}
                                {promo && <div className="h-24">{promo}</div>}
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  );
                })}

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