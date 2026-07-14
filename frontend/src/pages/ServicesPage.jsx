import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Stethoscope,
  Ambulance,
  HeartPulse,
  TestTube,
  Heart,
  Baby,
  Bone,
  Scan,
  Monitor,
  Scissors,
  CheckCircle2,
  ArrowRight,
  Clock,
  Phone,
  FlaskConical,
  Sparkles,
  X,
  CalendarCheck
} from 'lucide-react';
import { services, hospitalInfo, diagnosticsInfo, translations } from '../mockData';
import { AppContext } from '../App';
import AppointmentModal from '../components/AppointmentModal';
import { assetPath } from '../lib/assetPath';

const iconMap = { Stethoscope, Ambulance, HeartPulse, TestTube, Heart, Baby, Bone, Scan, Monitor, Scissors };

const ServicesPage = () => {
  const { darkMode, language } = useContext(AppContext);
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [isTouchCardMode, setIsTouchCardMode] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 1023px)');
    const sync = () => {
      setIsTouchCardMode(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setActiveServiceId(null);
      }
    };

    sync();
    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.hash) return undefined;
    const id = window.location.hash.replace('#', '');
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-teal-400/60');
        window.setTimeout(() => el.classList.remove('ring-4', 'ring-teal-400/60'), 1600);
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'All', label: language === 'hi' ? 'सभी' : 'All' },
    { id: 'Featured', label: language === 'hi' ? 'फ़ीचर्ड' : 'Featured' },
    { id: 'Diagnostic', label: language === 'hi' ? 'डायग्नोस्टिक' : 'Diagnostic' },
    { id: 'Specialty', label: language === 'hi' ? 'स्पेशलिटी' : 'Specialities' }
  ];

  const getIcon = (iconName) => iconMap[iconName] || Stethoscope;

  const getCategoryServices = () => {
    if (selectedCategory === 'All') return services;
    if (selectedCategory === 'Featured') return services.filter((service) => service.featured);
    if (selectedCategory === 'Diagnostic') {
      return services.filter((service) => ['Diagnostic Lab', 'X-Ray & Radiology', 'Ultrasound'].includes(service.title));
    }
    return services.filter((service) => !service.featured && !['Diagnostic Lab', 'X-Ray & Radiology', 'Ultrasound'].includes(service.title));
  };

  const filteredServices = getCategoryServices();

  const handleKnowMore = () => {
    window.location.href = `tel:${hospitalInfo.phone}`;
  };

  const closeCard = (event) => {
    event.stopPropagation();
    setActiveServiceId(null);
  };

  const jumpToSpeciality = (service) => {
    setSelectedCategory('All');
    setActiveServiceId(null);
    window.setTimeout(() => {
      const el = document.getElementById(`speciality-${service.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-teal-400/60');
        window.setTimeout(() => el.classList.remove('ring-4', 'ring-teal-400/60'), 1600);
      }
    }, 60);
  };

  return (
    <div className={`page-shell min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Diagnostics quick banner */}
      <section className={`px-3 py-3 sm:px-4 sm:py-4 ${darkMode ? 'bg-gradient-to-r from-teal-900/40 via-slate-900 to-blue-900/40' : 'bg-gradient-to-r from-teal-50 to-blue-50'}`}>
        <div className="container mx-auto">
          <Link
            to="/diagnostics"
            className={`flex items-center justify-between rounded-lg sm:rounded-xl border p-2 sm:p-3 md:p-4 transition-all hover:scale-[1.01] ${
              darkMode ? 'border-teal-700/30 bg-slate-800/80 hover:border-teal-500/50' : 'border-teal-200 bg-white shadow-md hover:shadow-lg'
            }`}
            data-testid="relax-diagnostics-banner"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-lg sm:rounded-xl ${darkMode ? 'bg-teal-500/20' : 'bg-teal-100'}`}>
                <FlaskConical className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
              </div>
              <div>
                <h3 className={`text-xs sm:text-sm font-bold md:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'hi' ? diagnosticsInfo.nameHindi : diagnosticsInfo.name}
                </h3>
                <p className={`text-[9px] sm:text-[10px] md:text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'hi' ? 'ब्लड टेस्ट, एक्स-रे, अल्ट्रासाउंड और अधिक' : 'Blood Tests, X-Ray, Ultrasound & More'}
                </p>
              </div>
            </div>
            <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section
        className={`relative overflow-hidden px-3 py-8 sm:px-4 sm:py-10 md:py-14 ${
          darkMode ? 'bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950' : 'bg-gradient-to-br from-teal-50 via-white to-blue-50'
        }`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute left-10 top-20 h-72 w-72 rounded-full blur-3xl animate-blob ${darkMode ? 'bg-teal-500' : 'bg-teal-300'}`} />
        </div>

        <div className="container mx-auto relative z-10 text-center">
          <Badge className={`mb-2 sm:mb-3 text-xs sm:text-sm ${darkMode ? 'bg-teal-900/50 text-teal-300' : 'bg-teal-100 text-teal-700'}`}>{language === 'hi' ? 'स्पेशलिटीज़' : 'Specialities'}</Badge>
          <h1 className={`mb-3 sm:mb-4 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {language === 'hi' ? 'हमारी ' : 'Our '}
            <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              {language === 'hi' ? 'सेवाएँ' : 'Specialities & Services'}
            </span>
          </h1>
          <p className={`mx-auto mb-5 sm:mb-6 max-w-2xl text-xs sm:text-sm md:text-base lg:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'hi'
              ? 'चाहे आप मरीज़ हों या साथ आए विज़िटर — हर विभाग, समय और फीस साफ़-साफ़ यहाँ मिलेगी।'
              : 'Whether you are the patient or a visitor booking on their behalf — every department, timing, and fee is laid out clearly here.'}
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`button-lift text-xs sm:text-sm ${
                  selectedCategory === category.id
                    ? 'border-0 bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                    : darkMode
                      ? 'border-slate-600 text-gray-300 hover:bg-slate-800'
                      : ''
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Browse by Speciality — quick-jump chip strip (hover on desktop reveals full list via scroll) */}
          <div className="mx-auto mt-6 max-w-4xl">
            <p className={`mb-2 text-[11px] font-bold uppercase tracking-[0.14em] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              {language === 'hi' ? 'स्पेशलिटी से खोजें' : 'Browse by Speciality'}
            </p>
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              {services.map((service) => {
                const Icon = getIcon(service.icon);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => jumpToSpeciality(service)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                      darkMode ? 'border-slate-700 bg-slate-900 text-slate-200 hover:border-teal-500/50' : 'border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 text-teal-500" />
                    {language === 'hi' ? service.titleHindi : service.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className={`px-3 py-8 sm:px-4 sm:py-12 md:py-16 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => {
              const Icon = getIcon(service.icon);
              const isOpen = activeServiceId === service.id;

              const frontHoverClass = isTouchCardMode ? '' : ' group-hover:translate-y-8 group-hover:opacity-0';
              const panelHoverClass = isTouchCardMode ? '' : ' group-hover:translate-y-0';

              return (
                <Card
                  key={service.id}
                  id={`speciality-${service.id}`}
                  className={`group relative overflow-hidden rounded-3xl border-2 shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${
                    darkMode ? 'border-slate-800 hover:border-teal-500/40' : 'border-slate-200 hover:border-teal-400/60'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => {
                    if (isTouchCardMode) {
                      setActiveServiceId((current) => (current === service.id ? null : service.id));
                    }
                  }}
                  onKeyDown={(event) => {
                    if (!isTouchCardMode) return;
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setActiveServiceId((current) => (current === service.id ? null : service.id));
                    }
                  }}
                >
                  <CardContent className="relative h-[24rem] overflow-hidden rounded-[1.4rem] p-0">
                    <div className="absolute inset-0">
                      <img
                        src={assetPath(service.image)}
                        alt={language === 'hi' ? service.titleHindi : service.title}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = assetPath('images/services/service-emergency.jpg');
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" />
                    </div>

                    <div
                      className={`absolute inset-x-4 top-4 z-10 flex items-start justify-between gap-3 transition-opacity duration-300 ${
                        isOpen ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-lg ring-1 ring-black/5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
                        <Icon className="h-5 w-5" />
                      </div>
                      {service.featured ? (
                        <Badge className="border-0 bg-gradient-to-r from-amber-400 to-yellow-400 text-[10px] font-bold text-amber-900 shadow">
                          {language === 'hi' ? 'मुख्य' : 'Featured'}
                        </Badge>
                      ) : null}
                    </div>

                    <div
                      className={`absolute inset-x-0 bottom-0 z-10 p-5 text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
                      }${frontHoverClass}`}
                    >
                      <h3 className="text-lg font-bold leading-tight drop-shadow-sm md:text-xl">
                        {language === 'hi' ? service.titleHindi : service.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-white/85 md:text-sm">
                        {language === 'hi' ? service.descriptionHindi : service.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[11px] text-white/80">
                          <Clock className="h-3.5 w-3.5" />
                          {service.availability}
                        </div>
                        <div className="text-sm font-bold text-teal-300">
                          {service.consultationFee > 0
                            ? `Rs.${service.consultationFee}`
                            : language === 'hi' ? 'टेस्ट आधारित' : 'Test based'}
                        </div>
                      </div>
                      <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-teal-300">
                        <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                        {isTouchCardMode
                          ? (language === 'hi' ? 'विवरण देखने के लिए टैप करें' : 'Tap for details')
                          : (language === 'hi' ? 'विवरण देखने के लिए होवर करें' : 'Hover for details')}
                      </div>
                    </div>

                    <div
                      className={`absolute inset-0 z-20 overflow-y-auto rounded-[1.4rem] shadow-[0_-12px_32px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        darkMode ? 'bg-slate-900' : 'bg-white'
                      } ${isOpen ? 'translate-y-0' : 'translate-y-full'}${panelHoverClass}`}
                    >
                      <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500" />
                      <button
                        type="button"
                        onClick={closeCard}
                        aria-label={language === 'hi' ? 'बंद करें' : 'Close details'}
                        className="flex w-full cursor-pointer justify-center py-2"
                      >
                        <span className={`h-1 w-10 rounded-full transition-colors ${darkMode ? 'bg-slate-700 hover:bg-slate-500' : 'bg-slate-200 hover:bg-slate-400'}`} />
                      </button>

                      <button
                        type="button"
                        onClick={closeCard}
                        aria-label={language === 'hi' ? 'बंद करें' : 'Close'}
                        className={`absolute right-3 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                          darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <div className="p-5 pt-1 md:p-6 md:pt-1">
                        <div className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${darkMode ? 'bg-teal-500/20 text-teal-200' : 'bg-teal-100 text-teal-700'}`}>
                          <Sparkles className="h-3 w-3" />
                          {language === 'hi' ? 'मुख्य बिंदु' : 'Key highlights'}
                        </div>
                        <h3 className={`text-lg font-bold md:text-xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {language === 'hi' ? service.titleHindi : service.title}
                        </h3>

                        <ul className="mt-3 space-y-2">
                          {(service.details || []).slice(0, 4).map((detail) => (
                            <li
                              key={detail}
                              className={`flex items-start gap-2 text-sm leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>

                        <div className={`mt-4 flex items-center justify-between rounded-xl border px-3 py-2.5 ${darkMode ? 'border-slate-700 bg-slate-950/60' : 'border-slate-100 bg-slate-50'}`}>
                          <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <Clock className="h-3.5 w-3.5" />
                            {service.availability}
                          </div>
                          <div className="text-sm font-bold text-teal-500">
                            {service.consultationFee > 0
                              ? `Rs.${service.consultationFee}`
                              : language === 'hi' ? 'मूल्य के बारे में पूछें' : 'Ask for pricing'}
                          </div>
                        </div>

                        <Button
                          className="button-lift mt-4 w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md hover:from-teal-600 hover:to-blue-600"
                          size="sm"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleKnowMore();
                          }}
                          data-testid={`service-query-btn-${service.id}`}
                        >
                          {t.knowMore}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA — need more services / contact hospital */}
      <section className={`px-3 py-10 sm:px-4 md:py-14 ${darkMode ? 'bg-gradient-to-r from-teal-900 via-slate-900 to-blue-900' : 'bg-gradient-to-r from-teal-600 to-blue-600'}`}>
        <div className="container mx-auto text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <CalendarCheck className="h-7 w-7 text-white" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            {language === 'hi' ? 'और सेवाएँ चाहिए? हमसे सीधे संपर्क करें' : 'Need More Services? Contact the Hospital Directly'}
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-sm leading-7 text-white/85 md:text-base">
            {language === 'hi'
              ? 'यहाँ लिस्ट न मिली किसी सेवा के लिए भी, कॉल करें या अपॉइंटमेंट बुक करें — हमारी टीम आपकी मदद करेगी।'
              : "Didn't find what you need in the list? Call us or book an appointment directly — our team will guide you to the right department."}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={() => setShowAppointmentModal(true)}
              className="bg-white px-6 text-teal-600 shadow-lg hover:bg-gray-100 md:px-8"
            >
              <CalendarCheck className="mr-2 h-5 w-5" />
              {language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { window.location.href = `tel:${hospitalInfo.phone}`; }}
              className="border-2 border-white text-white hover:bg-white/10"
            >
              <Phone className="mr-2 h-5 w-5" />
              {hospitalInfo.phone}
            </Button>
          </div>
        </div>
      </section>

      <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
    </div>
  );
};

export default ServicesPage;