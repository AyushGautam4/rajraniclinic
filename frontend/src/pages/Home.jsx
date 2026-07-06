import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
// import { 
//   Stethoscope, Ambulance, HeartPulse, TestTube, Heart, Baby, Bone, Scan, Monitor, Scissors,
//   Clock, Shield, ArrowRight, Phone, CheckCircle2, MapPin, Building2, MessageSquare, Camera
// } from 'lucide-react';

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
  Clock,
  Shield,
  Star,
  Users,
  ArrowRight,
  Phone,
  CheckCircle2,
  MapPin,
  Building2,
  MessageSquare,
  Camera
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { services, consultantDoctors as doctors, testimonials, diagnosticsInfo, hospitalInfo, translations } from '../mockData';
import { AppContext } from '../App';
import AppointmentModal from '../components/AppointmentModal';
import TestimonialCarousel from '../components/TestimonialCarousel';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { assetPath } from '../lib/assetPath';

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
      title: language === 'hi' ? 'अस्पताल की पहचान' : 'Hospital Story',
      description: language === 'hi'
        ? 'पुरानी कोंडली में परिवारों के भरोसे, साफ सलाह और जिम्मेदार इलाज की हमारी कहानी।'
        : 'A clear look at our care philosophy, facilities, and the trust families place in Rajrani Hospital.',
      points: language === 'hi'
        ? ['स्थापित भरोसा', 'मरीज-प्रथम सोच']
        : ['Established trust', 'Patient-first values'],
      path: '/about',
      cta: language === 'hi' ? 'अधिक जानें' : 'Explore About'
    },
    {
      icon: TestTube,
      title: language === 'hi' ? 'डायग्नोस्टिक्स और ऑफर' : 'Diagnostics & Offers',
      description: language === 'hi'
        ? 'टेस्ट ऑफर, पैकेज और रिपोर्ट सपोर्ट को एक साफ, आसान सेक्शन में देखें।'
        : 'Compare test offers, package options, and report support in one organized place.',
      points: language === 'hi'
        ? ['ऑफर टेस्ट', 'पैकेज कीमतें']
        : ['Offer tests', 'Package pricing'],
      path: '/diagnostics',
      cta: language === 'hi' ? 'डायग्नोस्टिक्स देखें' : 'Open Diagnostics'
    },
    {
      icon: MessageSquare,
      title: language === 'hi' ? 'सीधा संपर्क' : 'Talk To Us Fast',
      description: language === 'hi'
        ? 'कॉल, व्हाट्सऐप, लोकेशन और फॉर्म से सही टीम तक तुरंत पहुंचें।'
        : 'Reach the right desk quickly through call, WhatsApp, directions, and the enquiry form.',
      points: language === 'hi'
        ? ['सीधा सपोर्ट', 'कॉलबैक विकल्प']
        : ['Direct support', 'Callback options'],
      path: '/contact',
      cta: language === 'hi' ? 'संपर्क करें' : 'Go To Contact'
    }
  ];
  const helpfulHighlights = [
    language === 'hi' ? 'डॉक्टर टाइमिंग साफ दिखती है' : 'Doctor timings clearly listed',
    language === 'hi' ? 'टेस्ट ऑफर और पैकेज कीमतें उपलब्ध' : 'Offer tests and package prices visible',
    language === 'hi' ? 'कॉल, व्हाट्सऐप और दिशा एक टैप में' : 'Call, WhatsApp, and directions one tap away'
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
  const hospitalGallery = [
    { src: 'images/gallery/gallery-01.jpg', title: 'Hospital Exterior', titleHindi: 'अस्पताल बाहरी दृश्य' },
    { src: 'images/gallery/gallery-02.jpg', title: 'Reception Desk', titleHindi: 'रिसेप्शन डेस्क' },
    { src: 'images/gallery/gallery-04.jpg', title: 'Doctor Consultation', titleHindi: 'डॉक्टर कंसल्टेशन' },
    { src: 'images/gallery/gallery-05.jpg', title: 'Ultrasound Room', titleHindi: 'अल्ट्रासाउंड रूम' },
    { src: 'images/gallery/gallery-10.jpg', title: 'Echo / TMT Room', titleHindi: 'ईको / टीएमटी रूम' },
    { src: 'images/gallery/gallery-12.jpg', title: 'Labour Room', titleHindi: 'लेबर रूम' },
    { src: 'images/gallery/gallery-14.jpg', title: 'Operation Theatre', titleHindi: 'ऑपरेशन थिएटर' },
    { src: 'images/gallery/gallery-17.jpg', title: 'Patient Ward', titleHindi: 'मरीज वार्ड' }
  ];

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
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined;
    const elements = Array.from(document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
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
              <div className={`mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] ${darkMode ? 'bg-blue-500/15 text-blue-200 ring-1 ring-blue-500/30' : 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'}`}>
                Rajrani Hospital · Old Kondli
              </div>
              <Badge className={`mb-4 inline-flex ${darkMode ? 'border-blue-700 bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`} data-testid="hero-badge">
                <Shield className="w-3 h-3 mr-1" />
                {language === 'hi' ? 'हर परिवार के लिए भरोसेमंद देखभाल' : 'Trusted care for every family'}
              </Badge>
              
              <h1 className={`mb-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.55rem] ${darkMode ? 'text-white' : 'text-gray-900'}`} data-testid="hero-heading">
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
                  className="button-lift bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-4 py-4 sm:px-6 sm:py-5 text-xs sm:text-sm md:text-base shadow-lg"
                  data-testid="hero-book-appointment-btn"
                >
                  {appointmentLabel}
                  <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={handleEmergencyCall}
                  className={`button-lift px-4 py-4 sm:px-6 sm:py-5 text-xs sm:text-sm md:text-base border-2 ${
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
            <div className="relative mt-4 flex flex-col gap-3 sm:mt-6 lg:mt-0 lg:pl-4">
              <div className="hero-photo-enter relative min-h-[225px] overflow-hidden rounded-2xl shadow-2xl sm:min-h-[270px] lg:min-h-[330px]">
                <img 
                  src={assetPath('images/hospital/hospital-main.jpg')}
                  alt="Raj Rani Hospital building, Old Kondli New Delhi"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* NABL Accreditation Badge - Bottom Left */}
                <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-500 font-medium tracking-wide">NABL Accredited · CGHS Empanelled</p>
                  <p className="text-sm font-bold text-gray-900">{language === 'hi' ? 'पुरानी कोंडली, नई दिल्ली' : 'Old Kondli, New Delhi'}</p>
                </div>

                {/* Open 24 Hours Badge - Top Right */}
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg flex items-center gap-1">
                  ✓ {language === 'hi' ? '24 घंटे खुला' : 'Open 24 Hours'}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {diagnosticsHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className={`premium-card rounded-[1.35rem] border bg-gradient-to-br p-3 shadow-lg ${
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
                {language === 'hi' ? 'हर जरूरी जानकारी, एक भरोसेमंद रास्ते में' : 'Every important step, thoughtfully connected'}
              </h2>
              <p className={`mt-2 max-w-2xl text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'hi'
                  ? 'डॉक्टर, सुविधाएं, डायग्नोस्टिक ऑफर और संपर्क विकल्प इस तरह रखे गए हैं कि मरीज बिना उलझन सही कदम चुन सके।'
                  : 'Doctors, facilities, diagnostic offers, and contact options are arranged so patients can move from information to action without confusion.'}
              </p>
            </div>
            <Link to="/contact">
              <Button variant="outline" className={`button-lift ${darkMode ? 'border-slate-700 bg-slate-950/70 text-slate-100 hover:bg-slate-800' : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-100'}`}>
                {language === 'hi' ? 'जल्दी संपर्क करें' : 'Quick Contact'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-3.5 md:grid-cols-3">
            {exploreCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.path} className={`premium-card scroll-reveal rounded-[1.7rem] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
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

      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="mb-5 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className={`${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                <Camera className="mr-1.5 h-3.5 w-3.5" />
                {language === 'hi' ? 'अस्पताल गैलरी' : 'Hospital Gallery'}
              </Badge>
              <h2 className={`mt-3 text-xl font-bold sm:text-2xl md:text-3xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'hi' ? 'राजरानी हॉस्पिटल की असली झलक' : 'Real Photos From Rajrani Hospital'}
              </h2>
              <p className={`mt-2 max-w-2xl text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'hi'
                  ? 'रिसेप्शन, ओपीडी, डायग्नोस्टिक्स, ओटी, वार्ड और केयर एरिया की साफ तस्वीरें।'
                  : 'See the exterior, reception, OPD, diagnostics, OT, ward, and patient care areas in one place.'}
              </p>
            </div>
            <Link to="/about">
              <Button variant="outline" size="sm" className={`text-xs sm:text-sm ${darkMode ? 'border-slate-600 text-gray-300' : ''}`}>
                {language === 'hi' ? 'अस्पताल के बारे में' : 'More About Hospital'}
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="section-stagger grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {hospitalGallery.map((image, index) => (
              <div
                key={image.src}
                className={`scroll-reveal group overflow-hidden rounded-[1.25rem] border shadow-sm ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}
                style={{ '--stagger-index': index }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={assetPath(image.src)}
                    alt={language === 'hi' ? image.titleHindi : image.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3">
                    <p className="text-xs font-semibold text-white sm:text-sm">
                      {language === 'hi' ? image.titleHindi : image.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`px-3 py-8 sm:px-4 md:py-12 lg:py-14 sm:px-5 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          {/* What Makes Our Care Different */}
          <div className="mb-10 md:mb-14">
            <Badge className={`mb-3 ${darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
              {language === 'hi' ? 'हमारी विशेषता' : 'What Makes Us Different'}
            </Badge>
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {language === 'hi' ? 'क्या हमारी देखभाल को अलग बनाता है' : 'What makes our care feel different'}
            </h2>
            
            <div className="section-stagger grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Heart, title: language === 'hi' ? 'करुणा' : 'Compassion', desc: language === 'hi' ? 'सम्मानजनक, शांत और समझदार देखभाल।' : 'Respectful care with calm communication.', back: language === 'hi' ? 'हर मरीज को सुना और समझा जाता है।' : 'Every patient is heard, guided, and treated with dignity.', gradient: 'linear-gradient(135deg, #f43f5e 0%, #0f766e 100%)' },
                { icon: Shield, title: language === 'hi' ? 'भरोसा' : 'Trust', desc: language === 'hi' ? 'साफ सलाह, स्पष्ट फीस और जिम्मेदार इलाज।' : 'Clear advice, transparent fees, responsible care.', back: language === 'hi' ? 'हम उपचार से पहले जानकारी साफ रखते हैं।' : 'We keep the path clear before treatment begins.', gradient: 'linear-gradient(135deg, #2563eb 0%, #0f766e 100%)' },
                { icon: Star, title: language === 'hi' ? 'क्वालिटी' : 'Quality', desc: language === 'hi' ? 'डॉक्टर, डायग्नोस्टिक्स और फॉलो-अप एक साथ।' : 'Doctors, diagnostics, and follow-up in one flow.', back: language === 'hi' ? 'हर सुविधा मरीज की सुविधा के हिसाब से जुड़ी है।' : 'Each service connects naturally to the next step.', gradient: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)' },
                { icon: Users, title: language === 'hi' ? 'मरीज पहले' : 'Patient First', desc: language === 'hi' ? 'फैसले मरीज की जरूरत से शुरू होते हैं।' : 'Care decisions start with the patient’s need.', back: language === 'hi' ? 'हम जल्दी, साफ और व्यावहारिक मदद पर ध्यान देते हैं।' : 'We focus on fast, clear, practical support.', gradient: 'linear-gradient(135deg, #059669 0%, #1d4ed8 100%)' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="value-flip-card scroll-reveal"
                    style={{ '--stagger-index': idx }}
                  >
                    <div className="value-flip-inner">
                      <div className="value-flip-face text-white shadow-lg" style={{ background: item.gradient }}>
                        <div>
                          <Icon className="mb-4 h-8 w-8" />
                          <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                          <p className="text-sm leading-6 text-white/90">{item.desc}</p>
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">{language === 'hi' ? 'होवर करें' : 'Hover to view'}</p>
                      </div>
                      <div className={`value-flip-face value-flip-back border ${darkMode ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'}`}>
                        <div>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className={`mt-4 text-sm leading-7 ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>{item.back}</p>
                        </div>
                        <p className="text-sm font-semibold text-teal-500">{language === 'hi' ? 'राजरानी हॉस्पिटल' : 'Rajrani Hospital'}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

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

          <div className="section-stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {featuredServices.map((service, index) => {
              const Icon = getIcon(service.icon);
              return (
                <Card
                  key={service.id}
                  className={`scroll-reveal-left group service-hover-card service-swipe-card border ${
                    activeServiceId === service.id ? 'is-touch-active' : ''
                  } ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`}
                  style={{ '--stagger-index': index }}
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

          <div className="section-stagger grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {homeDoctors.map((doctor, index) => (
              <Card key={doctor.id} className={`scroll-reveal-right group overflow-hidden card-hover ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white'}`} style={{ '--stagger-index': index }}>
                <div className="relative mx-auto mt-4 h-28 w-28 overflow-hidden rounded-full ring-4 ring-blue-100 sm:h-36 sm:w-36 md:h-40 md:w-40 dark:ring-slate-700">
                  <img
                    src={assetPath(doctor.image)}
                    alt={language === 'hi' ? doctor.nameHindi : doctor.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = assetPath('images/doctors/doctor-01.jpg');
                    }}
                  />
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
          <div className="scroll-reveal">
            <TestimonialCarousel reviews={testimonials} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`relative overflow-hidden px-3 py-8 sm:px-4 md:py-12 lg:py-14 ${darkMode ? 'bg-slate-950' : 'bg-slate-900'}`}>
        <img src={assetPath('images/hospital/hospital-main.jpg')} alt="Rajrani Hospital exterior" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/92 via-slate-950/86 to-teal-950/88" />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">
            {language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Your Appointment'}
          </h2>
          <p className="text-xs sm:text-sm md:text-base mb-4 sm:mb-5 text-white/90 max-w-xl mx-auto">
            {language === 'hi' ? 'कॉल या व्हाट्सएप के जरिए तुरंत अपॉइंटमेंट के लिए हमसे जुड़ें' : 'Reach us instantly by call or WhatsApp for your appointment'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <Button size="lg" onClick={() => setShowAppointmentModal(true)} className="button-lift bg-white text-blue-600 hover:bg-gray-100 px-4 sm:px-5 py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base" data-testid="cta-book-appointment-btn">
              {appointmentLabel} <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.open(`https://wa.me/${hospitalInfo.whatsapp}`, '_blank')} className="button-lift border-2 border-white text-white hover:bg-white/10 px-4 sm:px-5 py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base" data-testid="cta-whatsapp-btn">
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
