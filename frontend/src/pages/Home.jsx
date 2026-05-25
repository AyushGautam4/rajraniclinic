import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { 
  Stethoscope, Ambulance, HeartPulse, TestTube, Heart, Baby, Bone, Scan, Monitor, Scissors,
  Clock, Shield, ArrowRight, Phone, CheckCircle2, MapPin, Building2, MessageSquare
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { services, consultantDoctors as doctors, testimonials, diagnosticsInfo, hospitalInfo, translations } from '../mockData';
import { AppContext } from '../App';
import AppointmentModal from '../components/AppointmentModal';
import TestimonialCarousel from '../components/TestimonialCarousel';
import WhatsAppFloat from '../components/WhatsAppFloat';

const iconMap = { Stethoscope, Ambulance, HeartPulse, TestTube, Heart, Baby, Bone, Scan, Monitor, Scissors };

const Home = () => {
  const { darkMode, language } = useContext(AppContext);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [isTouchCardMode, setIsTouchCardMode] = useState(false);
  const t = translations[language];
  const appointmentLabel = language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment';
  const getIcon = (iconName) => iconMap[iconName] || Stethoscope;
  const featuredServices = services.filter((service) => service.featured).slice(0, 4);
  const homeDoctors = doctors.slice(0, 4);
  const exploreCards = [
    {
      icon: Building2,
      title: language === 'hi' ? 'Hospital Story' : 'Hospital Story',
      description: language === 'hi'
        ? 'हम कौन हैं, किस भरोसे पर काम करते हैं, और परिवार हमारे पास क्यों लौटते हैं।'
        : 'See who we are, how we work, and why local families trust Raj Rani Hospital.',
      points: language === 'hi'
        ? ['Established care identity', 'Trust-first values']
        : ['Established care identity', 'Trust-first values'],
      path: '/about',
      cta: language === 'hi' ? 'About देखें' : 'Explore About'
    },
    {
      icon: TestTube,
      title: language === 'hi' ? 'Diagnostics & Offers' : 'Diagnostics & Offers',
      description: language === 'hi'
        ? 'टेस्ट ऑफर, पैकेज, रेगुलर सपोर्ट और बुकिंग फ्लो एक ही जगह देखें।'
        : 'Review test offers, packages, regular support, and booking help in one place.',
      points: language === 'hi'
        ? ['Offer rate tests', 'Package pricing']
        : ['Offer rate tests', 'Package pricing'],
      path: '/diagnostics',
      cta: language === 'hi' ? 'Diagnostics खोलें' : 'Open Diagnostics'
    },
    {
      icon: MessageSquare,
      title: language === 'hi' ? 'Talk To Us Fast' : 'Talk To Us Fast',
      description: language === 'hi'
        ? 'कॉल, व्हाट्सऐप, लोकेशन और कॉन्टैक्ट फॉर्म से तुरंत सही टीम तक पहुंचें।'
        : 'Reach the right team quickly through call, WhatsApp, directions, and contact form.',
      points: language === 'hi'
        ? ['Direct support flow', 'Callback options']
        : ['Direct support flow', 'Callback options'],
      path: '/contact',
      cta: language === 'hi' ? 'Contact पर जाएं' : 'Go To Contact'
    }
  ];
  const helpfulHighlights = [
    language === 'hi' ? 'Doctor timings clearly listed' : 'Doctor timings clearly listed',
    language === 'hi' ? 'Offer tests and package prices visible' : 'Offer tests and package prices visible',
    language === 'hi' ? 'Call, WhatsApp, and directions one tap away' : 'Call, WhatsApp, and directions one tap away'
  ];
  const diagnosticsHighlights = diagnosticsInfo.featureHighlights.map((item) => ({
    ...item,
    icon: getIcon(item.icon),
    accent:
      item.title === 'Digital X-Ray'
        ? darkMode ? 'from-rose-500/20 to-orange-500/20' : 'from-rose-50 to-orange-50'
        : item.title === '2D Echo Available'
          ? darkMode ? 'from-blue-500/20 to-cyan-500/20' : 'from-blue-50 to-cyan-50'
          : darkMode ? 'from-violet-500/20 to-fuchsia-500/20' : 'from-violet-50 to-fuchsia-50',
    iconTone:
      item.title === 'Digital X-Ray'
        ? 'text-rose-500'
        : item.title === '2D Echo Available'
          ? 'text-blue-500'
          : 'text-violet-500'
  }));

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

  const handleEmergencyCall = () => {
    if (window.confirm(language === 'hi' ? 'इमरजेंसी कॉल करें?' : 'Make emergency call?')) {
      window.location.href = `tel:${hospitalInfo.emergency}`;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`page-hero-offset relative flex min-h-[75vh] items-center overflow-hidden px-3 pb-8 sm:px-4 sm:pb-10 md:min-h-[90vh] md:px-5 md:pb-14 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
          : 'bg-gradient-to-br from-blue-50 via-white to-teal-50'
      }`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-20 -left-20 w-64 md:w-80 h-64 md:h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob ${darkMode ? 'bg-blue-500' : 'bg-blue-300'}`}></div>
          <div className={`absolute top-1/2 -right-20 w-64 md:w-80 h-64 md:h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 ${darkMode ? 'bg-teal-500' : 'bg-teal-300'}`}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid items-center gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="text-center lg:pr-6 lg:text-left">
              <Badge className={`mb-4 inline-flex ${darkMode ? 'border-blue-700 bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`} data-testid="hero-badge">
                <Shield className="w-3 h-3 mr-1" />
                {language === 'hi' ? 'Trusted care for every family' : 'Trusted care for every family'}
              </Badge>
              
              <h1 className={`mb-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-[3rem] xl:text-[3.2rem] ${darkMode ? 'text-white' : 'text-gray-900'}`} data-testid="hero-heading">
                {language === 'hi' ? 'आपकी सेहत,' : 'Your Health,'}
                <span className={`block mt-1 ${darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600'}`}>
                  {language === 'hi' ? 'हमारी प्राथमिकता' : 'Our Priority'}
                </span>
              </h1>
              
              <p className={`mx-auto mb-6 max-w-2xl text-xs sm:text-sm md:text-base lg:text-[1rem] lg:mx-0 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'hi' 
                  ? 'अनुभवी डॉक्टरों, आधुनिक सुविधाओं और 24/7 देखभाल के साथ गुणवत्तापूर्ण स्वास्थ्य सेवा।'
                  : 'Quality healthcare with experienced doctors, modern facilities, and 24/7 care.'}
              </p>

              <div className="mb-6 flex flex-col justify-center gap-2 sm:gap-3 sm:flex-row lg:justify-start">
                <Button 
                  size="lg"
                  onClick={() => setShowAppointmentModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-4 py-4 sm:px-6 sm:py-5 text-xs sm:text-sm md:text-base shadow-lg"
                  data-testid="hero-book-appointment-btn"
                >
                  {appointmentLabel}
                  <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={handleEmergencyCall}
                  className={`px-4 py-4 sm:px-6 sm:py-5 text-xs sm:text-sm md:text-base border-2 ${
                    darkMode ? 'border-red-500/50 text-red-400 hover:bg-red-900/30' : 'border-red-500 text-red-600 hover:bg-red-50'
                  }`}
                  data-testid="hero-emergency-call-btn"
                >
                  <Phone className="mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                  {t.emergencyCall}
                </Button>
              </div>

              {/* Stats */}
              <div className="mx-auto grid max-w-sm grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:mx-0">
                {[
                  { value: hospitalInfo.yearsExperience, label: language === 'hi' ? 'वर्ष अनुभव' : 'Years Exp.' },
                  { value: hospitalInfo.patientsServed, label: language === 'hi' ? 'खुश मरीज' : 'Patients' },
                  { value: '24/7', label: language === 'hi' ? 'इमरजेंसी' : 'Emergency' }
                ].map((stat, idx) => (
                  <div key={idx} className={`text-center p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/80 shadow-sm'}`} data-testid={`hero-stat-${idx}`}>
                    <div className={`text-base sm:text-lg md:text-2xl font-bold ${idx === 0 ? 'text-blue-500' : idx === 1 ? 'text-teal-500' : 'text-blue-500'}`}>
                      {stat.value}
                    </div>
                    <div className={`text-[9px] sm:text-[10px] md:text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                {helpfulHighlights.map((item) => (
                  <span
                    key={item}
                    className={`rounded-full px-3 py-1.5 text-[11px] font-medium sm:text-xs ${
                      darkMode ? 'bg-slate-900/75 text-slate-200 ring-1 ring-slate-800' : 'bg-white/90 text-slate-700 ring-1 ring-slate-200'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right - Hospital Image */}
            <div className="relative mt-4 sm:mt-6 lg:mt-0 lg:pl-4">
              <div className="relative">
                <div className={`overflow-hidden rounded-[1.75rem] border shadow-2xl ${darkMode ? 'border-slate-800 shadow-blue-500/10' : 'border-white/60'}`}>
                  <img 
                    src="/images/about/hospital-main.jpg"
                    alt="Raj Rani Hospital" 
                    className="h-52 w-full object-cover object-center sm:h-60 md:h-72 lg:h-[25rem] lg:object-[50%_38%]"
                  />
                  <div className={`absolute inset-x-0 bottom-0 p-3 md:p-5 ${
                    darkMode ? 'bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent' : 'bg-gradient-to-t from-white via-white/90 to-transparent'
                  }`}>
                    <div className={`flex flex-wrap items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium ${
                        darkMode ? 'bg-slate-900/80 text-white' : 'bg-white/90 text-slate-800'
                      }`}>
                        <MapPin className="mr-1.5 h-3 w-3" />
                        {language === 'hi' ? 'Purani Kondli, New Delhi' : 'Old Kondli, New Delhi'}
                      </span>
                      <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
                        darkMode ? 'bg-red-950/80 text-red-100' : 'bg-red-50 text-red-700'
                      }`}>
                        Emergency 24/7
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {diagnosticsHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className={`rounded-[1.35rem] border bg-gradient-to-br p-3 shadow-lg ${
                        darkMode ? `border-slate-800 ${item.accent}` : `border-white/60 ${item.accent}`
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                          darkMode ? 'bg-slate-950/70' : 'bg-white/90'
                        }`}>
                          <Icon className={`h-5 w-5 ${item.iconTone}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            {language === 'hi' ? item.titleHindi : item.title}
                          </p>
                          <p className={`mt-1 text-[11px] leading-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {language === 'hi' ? item.subtitleHindi : item.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`px-3 py-7 sm:px-4 md:px-5 md:py-10 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto">
          <div className="mb-5 flex flex-col gap-3 md:mb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className={`${darkMode ? 'bg-slate-800 text-blue-200' : 'bg-white text-blue-700 ring-1 ring-blue-100'}`}>
                {language === 'hi' ? 'पूरा अस्पताल एक्सप्लोर करें' : 'Explore The Full Website'}
              </Badge>
              <h2 className={`mt-3 text-xl font-bold sm:text-2xl md:text-3xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'hi' ? 'सिर्फ होम तक मत रुकिए' : 'Don’t stop at the home page'}
              </h2>
              <p className={`mt-2 max-w-2xl text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'hi'
                  ? 'About, diagnostics और contact को इस तरह रखा गया है ताकि visitor तुरंत समझ सके कि अस्पताल में क्या-क्या support available है।'
                  : 'About, diagnostics, and contact are surfaced here so visitors can quickly understand the full hospital support flow.'}
              </p>
            </div>
            <Link to="/contact">
              <Button variant="outline" className={darkMode ? 'border-slate-700 bg-slate-950/70 text-slate-100 hover:bg-slate-800' : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-100'}>
                {language === 'hi' ? 'Quick Contact' : 'Quick Contact'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-3.5 md:grid-cols-3">
            {exploreCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.path} className={`premium-card rounded-[1.7rem] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  <CardContent className="p-4 sm:p-5">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${darkMode ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{card.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{card.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.points.map((point) => (
                        <span
                          key={point}
                          className={`rounded-full px-3 py-1 text-[11px] font-medium ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-700'}`}
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                    <Link to={card.path} className="mt-5 inline-flex items-center text-sm font-semibold text-blue-500">
                      {card.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`px-3 py-8 sm:px-4 md:py-12 lg:py-14 sm:px-5 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <div className="mb-5 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-10">
            <div>
              <Badge className={`mb-2 ${darkMode ? 'bg-teal-900/50 text-teal-300' : 'bg-teal-100 text-teal-700'}`}>{t.ourServices}</Badge>
              <h2 className={`text-lg sm:text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {language === 'hi' ? 'हमारी सेवाएं' : 'Our Services'}
              </h2>
            </div>
            <Link to="/services">
              <Button variant="outline" size="sm" className={`text-xs sm:text-sm ${darkMode ? 'border-slate-600 text-gray-300' : ''}`} data-testid="services-view-all">
                {t.viewAll} <ArrowRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {featuredServices.map((service) => {
              const Icon = getIcon(service.icon);
              return (
                <Card
                  key={service.id}
                  className={`group service-hover-card service-swipe-card border ${
                    activeServiceId === service.id ? 'is-touch-active' : ''
                  } ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={activeServiceId === service.id}
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
                  <CardContent className={`relative min-h-[200px] sm:min-h-[215px] p-3 sm:p-4 md:min-h-[235px] md:p-5 ${isTouchCardMode ? 'cursor-pointer' : ''}`}>
                    <div className="service-slide-front">
                      <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl md:mb-3 md:h-12 md:w-12 ${
                        darkMode ? 'bg-gradient-to-br from-blue-600/20 to-teal-600/20' : 'bg-gradient-to-br from-blue-100 to-teal-100'
                      }`}>
                        <Icon className={`h-5 w-5 md:h-6 md:w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      </div>
                      <h3 className={`mb-2 text-sm font-bold transition-colors group-hover:text-blue-500 md:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {language === 'hi' ? service.titleHindi : service.title}
                      </h3>
                      <p className={`line-clamp-3 text-xs leading-6 md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {language === 'hi' ? service.descriptionHindi : service.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(service.details || []).slice(0, 2).map((detail) => (
                          <span
                            key={detail}
                            className={`rounded-full px-2.5 py-1 text-[10px] font-medium md:text-[11px] ${
                              darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                      <div className={`mt-3 text-[11px] font-medium md:text-xs ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                        {service.availability}
                      </div>
                      {isTouchCardMode ? (
                        <div className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold md:text-xs ${darkMode ? 'bg-slate-900 text-blue-200' : 'bg-slate-100 text-blue-700'}`}>
                          {activeServiceId === service.id
                            ? language === 'hi' ? 'टैप करके बंद करें' : 'Tap to close'
                            : language === 'hi' ? 'टैप करके देखें' : 'Tap to view'}
                        </div>
                      ) : null}
                    </div>
                    <div className={`service-slide-detail rounded-xl p-4 md:p-5 ${darkMode ? 'bg-slate-900/95 text-slate-100' : 'bg-white text-slate-900'}`}>
                      <div className={`mb-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold md:text-xs ${darkMode ? 'bg-teal-500/20 text-teal-200' : 'bg-teal-100 text-teal-700'}`}>
                        {language === 'hi' ? 'मुख्य सुविधाएं' : 'Key highlights'}
                      </div>
                      <h3 className="text-sm font-bold md:text-base">{language === 'hi' ? service.titleHindi : service.title}</h3>
                      <ul className={`mt-3 space-y-2 text-xs leading-6 md:text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {(service.details || []).slice(0, 3).map((detail) => (
                          <li key={detail} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-teal-500" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <div className={`mt-3 inline-flex items-center gap-1 text-[10px] font-semibold md:text-xs ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                        <span>{language === 'hi' ? 'और जानें' : 'Explore more'}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className={`px-3 py-8 sm:px-4 md:py-12 lg:py-14 sm:px-5 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="mb-5 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-10">
            <div>
              <Badge className={`mb-2 ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>{t.ourDoctors}</Badge>
              <h2 className={`text-lg sm:text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {language === 'hi' ? 'हमारे डॉक्टर' : 'Our Doctors'}
              </h2>
            </div>
            <Link to="/doctors">
              <Button variant="outline" size="sm" className={`text-xs sm:text-sm ${darkMode ? 'border-slate-600 text-gray-300' : ''}`} data-testid="doctors-view-all">
                {t.viewAll} <ArrowRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {homeDoctors.map((doctor) => (
              <Card key={doctor.id} className={`group overflow-hidden card-hover ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white'}`}>
                <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <CardContent className="p-2 sm:p-3 md:p-4">
                  <h3 className={`text-xs sm:text-sm md:text-sm font-bold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'hi' ? doctor.nameHindi : doctor.name}
                  </h3>
                  <p className="text-blue-500 text-[9px] sm:text-[10px] md:text-xs font-medium truncate">{language === 'hi' ? doctor.specializationHindi : doctor.specialization}</p>
                  <Badge variant="secondary" className={`mt-1 text-[9px] sm:text-[10px] md:text-xs inline-block ${darkMode ? 'bg-teal-900/50 text-teal-300' : ''}`}>
                    {doctor.experience}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Auto Scroll Carousel */}
      <section className={`py-8 md:py-12 lg:py-14 px-3 sm:px-4 sm:px-5 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <div className="text-center mb-5 md:mb-10">
            <Badge className={`mb-2 ${darkMode ? 'bg-teal-900/50 text-teal-300' : 'bg-teal-100 text-teal-700'}`}>
              {language === 'hi' ? 'मरीजों की राय' : 'Testimonials'}
            </Badge>
            <h2 className={`text-lg sm:text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {language === 'hi' ? 'क्या कहते हैं मरीज' : 'Patient Reviews'}
            </h2>
          </div>
          <TestimonialCarousel reviews={testimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-8 md:py-12 lg:py-14 px-3 sm:px-4 sm:px-5 relative overflow-hidden ${
        darkMode ? 'bg-gradient-to-r from-blue-900 via-slate-900 to-teal-900' : 'bg-gradient-to-r from-blue-600 to-teal-600'
      }`}>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">
            {language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Your Appointment'}
          </h2>
          <p className="text-xs sm:text-sm md:text-base mb-4 sm:mb-5 text-white/90 max-w-xl mx-auto">
            {language === 'hi' ? 'कॉल या व्हाट्सएप के जरिए तुरंत अपॉइंटमेंट के लिए हमसे जुड़ें' : 'Reach us instantly by call or WhatsApp for your appointment'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <Button size="lg" onClick={() => setShowAppointmentModal(true)} className="bg-white text-blue-600 hover:bg-gray-100 px-4 sm:px-5 py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base" data-testid="cta-book-appointment-btn">
              {appointmentLabel} <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.open(`https://wa.me/${hospitalInfo.whatsapp}`, '_blank')} className="border-2 border-white text-white hover:bg-white/10 px-4 sm:px-5 py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base" data-testid="cta-whatsapp-btn">
              <svg viewBox="0 0 32 32" className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="currentColor"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.052 9.376L1.056 31.08l5.884-1.942A15.92 15.92 0 0016.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.606c-.39 1.1-2.282 2.108-3.168 2.17-.8.058-1.548.38-5.214-1.086-4.42-1.766-7.226-6.292-7.444-6.586-.218-.292-1.786-2.376-1.786-4.532 0-2.154 1.13-3.212 1.532-3.654.39-.43.862-.54 1.148-.54.286 0 .572.004.822.014.264.012.618-.1.968.738.36.862 1.226 2.984 1.334 3.202.11.218.182.474.036.766-.146.292-.218.474-.436.728-.218.256-.458.572-.654.768-.218.218-.446.454-.192.89.256.436 1.134 1.87 2.436 3.03 1.672 1.486 3.082 1.948 3.518 2.166.436.218.69.182.944-.11.256-.292 1.094-1.276 1.386-1.716.292-.436.582-.364.982-.218.398.146 2.532 1.194 2.966 1.412.436.218.726.328.834.508.11.182.11 1.04-.278 2.14z"/></svg>
              {t.whatsapp}
            </Button>
          </div>
          
          <div className="mt-5 sm:mt-7 md:mt-10 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-lg mx-auto">
            <span onClick={() => window.location.href = `tel:${hospitalInfo.phone}`} className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mx-auto mb-1 text-white" />
              <div className="font-semibold text-[10px] sm:text-xs text-white">{language === 'hi' ? 'कॉल' : 'Call'}</div>
            </span>
            <div className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mx-auto mb-1 text-white" />
              <div className="font-semibold text-[10px] sm:text-xs text-white">24/7</div>
            </div>
            <span onClick={() => window.open(hospitalInfo.googleMapsLink, '_blank')} className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mx-auto mb-1 text-white" />
              <div className="font-semibold text-[10px] sm:text-xs text-white">{language === 'hi' ? 'लोकेशन' : 'Location'}</div>
            </span>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
      <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
    </div>
  );
};

export default Home;
