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
  FlaskConical
} from 'lucide-react';
import { services, hospitalInfo, diagnosticsInfo, translations } from '../mockData';
import { AppContext } from '../App';
import AppointmentModal from '../components/AppointmentModal';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { assetPath } from '../lib/assetPath';

const iconMap = { Stethoscope, Ambulance, HeartPulse, TestTube, Heart, Baby, Bone, Scan, Monitor, Scissors };

const ServicesPage = () => {
  const { darkMode, language } = useContext(AppContext);
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [isTouchCardMode, setIsTouchCardMode] = useState(false);
  const appointmentLabel = language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment';

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

  const categories = [
    { id: 'All', label: language === 'hi' ? 'सभी' : 'All' },
    { id: 'Featured', label: language === 'hi' ? 'फ़ीचर्ड' : 'Featured' },
    { id: 'Diagnostic', label: language === 'hi' ? 'डायग्नोस्टिक' : 'Diagnostic' },
    { id: 'Specialty', label: language === 'hi' ? 'विशेषता' : 'Specialty' }
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

  return (
    <div className={`page-shell min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
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

      <section
        className={`relative overflow-hidden px-3 py-8 sm:px-4 sm:py-10 md:py-14 ${
          darkMode ? 'bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950' : 'bg-gradient-to-br from-teal-50 via-white to-blue-50'
        }`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute left-10 top-20 h-72 w-72 rounded-full blur-3xl animate-blob ${darkMode ? 'bg-teal-500' : 'bg-teal-300'}`} />
        </div>

        <div className="container mx-auto relative z-10 text-center">
          <Badge className={`mb-2 sm:mb-3 text-xs sm:text-sm ${darkMode ? 'bg-teal-900/50 text-teal-300' : 'bg-teal-100 text-teal-700'}`}>{t.ourServices}</Badge>
          <h1 className={`mb-3 sm:mb-4 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {language === 'hi' ? ' हमारी   ' : 'Our '}
            <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              {language === 'hi' ? 'सेवाएँ ' : 'Services'}
            </span>
          </h1>
          <p className={`mx-auto mb-5 sm:mb-6 max-w-2xl text-xs sm:text-sm md:text-base lg:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'hi'
              ? 'अनुभवी डॉक्टरों के साथ पूरी नैदानिक और उपचारात्मक सुविधाएँ, अब एक सफाई और अधिक कॉम्पैक्ट प्रीमियम कार्ड फ्लो में।'
              : 'Complete diagnostic and therapeutic facilities with experienced doctors, now in a cleaner and more compact premium card flow.'}
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
        </div>
      </section>

      <section className={`px-3 py-8 sm:px-4 sm:py-12 md:py-16 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {filteredServices.map((service) => {
              const Icon = getIcon(service.icon);
              const isActive = activeServiceId === service.id;

              return (
                <Card
                  key={service.id}
                  className={`group service-hover-card service-swipe-card overflow-hidden border shadow-lg ${
                    isActive ? 'is-touch-active' : ''
                  } ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white'}`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
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
                  <CardContent className={`relative min-h-[22.5rem] p-0 ${isTouchCardMode ? 'cursor-pointer' : ''}`}>
                    <div className="service-slide-front">
                      <div className="relative h-44 overflow-hidden md:h-48">
                        <img
                          src={assetPath(service.image)}
                          alt={language === 'hi' ? service.titleHindi : service.title}
                          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = assetPath('images/services/service-emergency.jpg');
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
                          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${darkMode ? 'bg-slate-950/70 text-white' : 'bg-white/90 text-blue-600'}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          {service.featured ? (
                            <Badge className="bg-yellow-400 text-[10px] text-yellow-900">{language === 'hi' ? 'मुख्य' : 'Featured'}</Badge>
                          ) : null}
                        </div>
                        <div className="absolute inset-x-4 bottom-4 text-white">
                          <h3 className="text-lg font-bold leading-tight md:text-xl">
                            {language === 'hi' ? service.titleHindi : service.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-4 md:p-5">
                        <p className={`line-clamp-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {language === 'hi' ? service.descriptionHindi : service.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className={`flex items-center text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <Clock className="mr-1 h-3 w-3" />
                            {service.availability}
                          </div>
                          {service.consultationFee > 0 ? (
                            <div className="text-sm font-semibold text-teal-500">Rs.{service.consultationFee}</div>
                          ) : (
                            <div className="text-sm font-semibold text-teal-500">{language === 'hi' ? 'टेस्ट आधारित' : 'Test based'}</div>
                          )}
                        </div>

                        {isTouchCardMode ? (
                          <div className={`mt-4 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${darkMode ? 'bg-slate-900 text-teal-200' : 'bg-slate-100 text-teal-700'}`}>
                            {isActive
                              ? language === 'hi' ? 'टैप करें बंद करने के लिए' : 'Tap to close'
                              : language === 'hi' ? 'टैप करें विवरण देखने के लिए' : 'Tap to view details'}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className={`service-slide-detail p-5 md:p-6 ${darkMode ? 'bg-slate-900/95 text-slate-100' : 'bg-white text-slate-900'}`}>
                      <div className={`mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${darkMode ? 'bg-teal-500/20 text-teal-200' : 'bg-teal-100 text-teal-700'}`}>
                        {language === 'hi' ? 'मुख्य बिंदु' : 'Key highlights'}
                      </div>
                      <h3 className="text-lg font-bold md:text-xl">{language === 'hi' ? service.titleHindi : service.title}</h3>
                      <p className={`mt-2 text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {language === 'hi' ? service.descriptionHindi : service.description}
                      </p>

                      <ul className="mt-4 space-y-2.5">
                        {service.details.slice(0, 3).map((detail, idx) => (
                          <li key={idx} className={`flex items-start text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className={`mt-5 flex items-center justify-between border-t pt-4 ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                        <div className={`flex items-center text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <Clock className="mr-1 h-3 w-3" />
                          {service.availability}
                        </div>
                        {service.consultationFee > 0 ? (
                          <div className="text-sm font-semibold text-teal-500">Rs.{service.consultationFee}</div>
                        ) : (
                          <div className="text-sm font-semibold text-teal-500">{language === 'hi' ? 'मूल्य के बारे में पूछें' : 'Ask for pricing'}</div>
                        )}
                      </div>

                      <Button
                        className="button-lift mt-4 w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600"
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
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {false && (
        <section
          className={`px-4 py-12 md:py-16 ${
            darkMode ? 'bg-gradient-to-r from-teal-900 via-slate-900 to-blue-900' : 'bg-gradient-to-r from-teal-600 to-blue-600'
          }`}
        >
          <div className="container mx-auto text-center">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{language === 'hi' ? 'हमारी सेवाएँ चाहिए?' : 'Need Our Services?'}</h2>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" onClick={() => setShowAppointmentModal(true)}className="bg-white px-6 text-teal-600 hover:bg-gray-100 md:px-8">
                {appointmentLabel}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.location.href = `tel:${hospitalInfo.emergency}`} className="border-2 border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                {hospitalInfo.phone}
              </Button>
            </div>
          </div>
        </section>
      )}

      <WhatsAppFloat />
      <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
    </div>
  );
};

export default ServicesPage;
