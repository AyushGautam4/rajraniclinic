import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Ambulance,
  ArrowRight,
  Award,
  Baby,
  Bone,
  Building2,
  Camera,
  CheckCircle2,
  Clock,
  Compass,
  Heart,
  HeartPulse,
  MapPin,
  MessageSquare,
  Monitor,
  Phone,
  Scan,
  Scissors,
  Shield,
  Star,
  Stethoscope,
  Tag,
  TestTube,
  Users,
  X,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { services, consultantDoctors as doctors, testimonials, diagnosticsInfo, hospitalInfo, translations } from '../mockData';
import { AppContext } from '../App';
import AppointmentModal from '../components/AppointmentModal';
import TestimonialCarousel from '../components/TestimonialCarousel';
import HospitalGallery from '../components/HospitalGallery';
import { assetPath } from '../lib/assetPath';

const iconMap = { Stethoscope, Ambulance, HeartPulse, TestTube, Heart, Baby, Bone, Scan, Monitor, Scissors };

const copy = {
  appointment: { en: 'Book Appointment', hi: 'Appointment Book Karein' },
  emergency: { en: 'Emergency Call', hi: 'Emergency Call' },
  heroBadge: { en: 'Trusted care for every family', hi: 'Har family ke liye trusted care' },
  heroTitle: { en: 'Your Health,', hi: 'Aapki Health,' },
  heroAccent: { en: 'Our Priority', hi: 'Hamari Priority' },
  heroText: {
    en: 'Quality healthcare with experienced doctors, modern facilities, diagnostics, and 24/7 emergency support.',
    hi: 'Experienced doctors, modern facilities, diagnostics aur 24/7 emergency support ke saath quality care.'
  }
};

const Home = () => {
  const { darkMode, language } = useContext(AppContext);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [isTouchCardMode, setIsTouchCardMode] = useState(false);
  const [detailModal, setDetailModal] = useState(null);
  const t = translations[language];
  const featuredServices = services.filter((service) => service.featured).slice(0, 4);
  const homeDoctors = doctors.slice(0, 8);
  const getIcon = (iconName) => iconMap[iconName] || Stethoscope;

  const helpfulHighlights = [
    'Doctor timings clearly listed',
    'Offer tests and package prices visible',
    'Call, WhatsApp, and directions one tap away'
  ];

  const trustPoints = [
    { icon: Shield, label: `${hospitalInfo.yearsExperience} years of community trust` },
    { icon: Users, label: `${hospitalInfo.patientsServed} patients served` },
    { icon: CheckCircle2, label: 'NABL-linked diagnostics on-site' }
  ];

  const popularSpecialities = [
    { title: 'Gynecology', icon: 'Heart', path: '/services' },
    { title: 'Orthopedics', icon: 'Bone', path: '/services' },
    { title: 'Pediatrics', icon: 'Baby', path: '/services' },
    { title: 'Emergency Care', icon: 'Ambulance', path: '/services' },
    { title: 'Diagnostic Lab', icon: 'TestTube', path: '/diagnostics' },
    { title: 'General Surgery', icon: 'Scissors', path: '/services' }
  ];

  const diagnosticsHighlights = diagnosticsInfo.featureHighlights.map((item) => ({
    ...item,
    icon: getIcon(item.icon),
    accent: item.title === 'Digital X-Ray'
      ? darkMode ? 'from-rose-500/20 to-orange-500/20' : 'from-rose-50 to-orange-50'
      : item.title === '2D Echo Available'
        ? darkMode ? 'from-blue-500/20 to-cyan-500/20' : 'from-blue-50 to-cyan-50'
        : darkMode ? 'from-violet-500/20 to-fuchsia-500/20' : 'from-violet-50 to-fuchsia-50',
    iconTone: item.title === 'Digital X-Ray' ? 'text-rose-500' : item.title === '2D Echo Available' ? 'text-blue-500' : 'text-violet-500'
  }));

  const topOfferTests = (diagnosticsInfo.offerCategories?.[0]?.tests || []).slice(0, 4);

  const aboutBullets = [
    `${hospitalInfo.yearsExperience} years of combined medical experience in Old Kondli`,
    `${hospitalInfo.accreditation}, led by ${hospitalInfo.managingDirector}`,
    'Multi-specialty OPD, 24/7 emergency and a fully equipped operation theatre',
    'Family-first communication — every treatment plan explained clearly before we begin'
  ];

  const diagnosticsBullets = [
    `${diagnosticsInfo.accreditation}`,
    'Digital X-Ray, 2D Echo and Colour Ultrasound available on-site',
    'Same-day reports for most routine blood tests',
    'Bundled full-body and fever packages at discounted rates'
  ];

  const accreditationCards = [
    {
      icon: Shield,
      title: 'Quality & Safety',
      badgeFile: 'nabh-badge.png',
      text: 'NABH-guided care standards, hygiene, and patient-first coordination across every department.',
      points: ['Sanitised OPD, wards & OT', 'Trained nursing staff on every shift', 'Clear infection-control protocol']
    },
    {
      icon: CheckCircle2,
      title: 'NABL Linked Diagnostics',
      badgeFile: 'nabl-badge.png',
      text: 'Diagnostics support with X-Ray, ECG, Echo, and ultrasound, run on calibrated, NABL-linked standards.',
      points: [
        'Calibrated equipment and validated testing methods',
        'Trained, competent technical staff on every shift',
        'Consistent, accurate results you can rely on'
      ]
    },
    {
      icon: Camera,
      title: 'Virtual Facility View',
      text: 'A real, unfiltered look inside Rajrani Hospital — reception, OPD, diagnostics, OT, and wards, exactly as patients see them.'
    }
  ];

  const accreditationImageDir = 'images/accreditation';

  const collagePhotos = ['01', '04', '02'];

  const differenceCards = [
    { icon: Heart, title: 'Compassion', desc: 'Respectful care with calm communication.', back: 'Every patient is heard, guided, and treated with dignity at each visit.', gradient: 'linear-gradient(135deg, #f43f5e 0%, #0f766e 100%)' },
    { icon: Shield, title: 'Trust', desc: 'Clear advice, transparent fees, responsible care.', back: 'We keep the care path clear and honest before treatment ever begins.', gradient: 'linear-gradient(135deg, #2563eb 0%, #0f766e 100%)' },
    { icon: Star, title: 'Quality', desc: 'Doctors, diagnostics, and follow-up in one flow.', back: 'Each service connects naturally to the next step in your care.', gradient: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)' },
    { icon: Users, title: 'Patient First', desc: 'Care decisions start with the patient need.', back: 'We focus on fast, clear, and practical support for every family.', gradient: 'linear-gradient(135deg, #059669 0%, #1d4ed8 100%)' }
  ];

  const excellenceAreas = services.slice(0, 8);

  const whyChooseUs = [
    `${hospitalInfo.yearsExperience} Years of Trusted Medical Service`,
    'Comprehensive Multi-Speciality Care Under One Roof',
    'Advanced Diagnostics — Digital X-Ray, 2D Echo, Colour Ultrasound',
    '24×7 Emergency, Ambulance & Pharmacy Access',
    'Transparent Fees — No Hidden Charges',
    'CGHS Empanelled & NABL-Linked Diagnostics'
  ];

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 1023px)');
    const sync = () => {
      setIsTouchCardMode(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setDetailModal(null);
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
    if (window.confirm('Make emergency call?')) {
      window.location.href = `tel:${hospitalInfo.emergency}`;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
      {/* ================= HERO ================= */}
      <section className={`page-hero-offset relative overflow-hidden px-3 pb-6 sm:px-4 md:px-5 md:pb-10 ${darkMode ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-blue-50 via-white to-teal-50'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -left-20 -top-20 h-64 w-64 rounded-full blur-3xl md:h-80 md:w-80 ${darkMode ? 'bg-blue-500/15' : 'bg-blue-300/25'}`} />
          <div className={`absolute -right-20 top-1/2 h-64 w-64 rounded-full blur-3xl md:h-80 md:w-80 ${darkMode ? 'bg-teal-500/15' : 'bg-teal-300/25'}`} />
        </div>

        <div className="container relative z-10 mx-auto">
          <div className="grid items-start gap-7 lg:grid-cols-[1fr_0.98fr] lg:gap-12">
            <div className="pt-2 text-center lg:pt-8 lg:text-left">
              <div className="mb-4 flex flex-col items-center justify-center gap-2 text-center xl:flex-row xl:justify-start xl:text-left">
                <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] ${darkMode ? 'bg-blue-500/15 text-blue-200 ring-1 ring-blue-500/30' : 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'}`}>
                  Rajrani Hospital | Old Kondli
                </span>
                <Badge className={`whitespace-nowrap ${darkMode ? 'border-blue-700 bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                  <Shield className="mr-1 h-3 w-3" />
                  {copy.heroBadge[language] || copy.heroBadge.en}
                </Badge>
              </div>

              <h1 className={`mb-4 overflow-visible pb-1 text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl lg:text-[4.35rem] ${darkMode ? 'text-white' : 'text-gray-950'}`}>
                {copy.heroTitle[language] || copy.heroTitle.en}
                <span className="mt-1 block overflow-visible bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text pb-2 text-transparent">
                  {copy.heroAccent[language] || copy.heroAccent.en}
                </span>
              </h1>
              <p className={`mx-auto mb-5 max-w-2xl text-sm leading-7 sm:text-base lg:mx-0 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {copy.heroText[language] || copy.heroText.en}
              </p>

              <div className="mb-5 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button size="lg" onClick={() => setShowAppointmentModal(true)} className="button-lift bg-gradient-to-r from-blue-600 to-teal-600 px-5 py-5 text-sm text-white shadow-lg hover:from-blue-700 hover:to-teal-700">
                  {copy.appointment[language] || copy.appointment.en}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={handleEmergencyCall} className={`button-lift border-2 px-5 py-5 text-sm ${darkMode ? 'border-red-500/50 text-red-300 hover:bg-red-900/30' : 'border-red-500 text-red-600 hover:bg-red-50'}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {copy.emergency[language] || copy.emergency.en}
                </Button>
              </div>

              <div className="mx-auto mb-4 grid max-w-sm grid-cols-3 gap-2 lg:mx-0">
                {[
                  { value: hospitalInfo.yearsExperience, label: 'Years Exp.' },
                  { value: hospitalInfo.patientsServed, label: 'Patients' },
                  { value: '24/7', label: 'Emergency' }
                ].map((stat) => (
                  <div key={stat.label} className={`rounded-xl p-3 text-center ${darkMode ? 'bg-slate-800/70' : 'bg-white/85 shadow-sm'}`}>
                    <div className="text-xl font-black text-blue-600 sm:text-2xl">{stat.value}</div>
                    <div className={`text-[10px] font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mb-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                {helpfulHighlights.map((item) => (
                  <span key={item} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold sm:text-xs ${darkMode ? 'bg-slate-900/80 text-slate-100 ring-1 ring-slate-700' : 'bg-white text-slate-700 shadow-sm ring-1 ring-slate-200'}`}>
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
                    {item}
                  </span>
                ))}
              </div>

              <div className={`mx-auto max-w-md rounded-2xl border p-3 lg:mx-0 lg:max-w-none ${darkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white/70 shadow-sm'}`}>
                <p className={`mb-2.5 px-1 text-[11px] font-bold uppercase tracking-[0.14em] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {language === 'hi' ? 'लोकप्रिय स्पेशलिटी' : 'Popular Specialities'}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {popularSpecialities.map((item) => {
                    const Icon = getIcon(item.icon);
                    return (
                      <Link
                        key={item.title}
                        to={item.path}
                        className={`hover-accent-row flex min-h-[76px] flex-col items-center justify-center gap-1.5 rounded-xl border px-1.5 py-3 text-center transition-colors ${darkMode ? 'border-slate-800 bg-slate-950/60 hover:border-teal-500/40' : 'border-slate-100 bg-slate-50 hover:border-teal-300'}`}
                      >
                        <Icon className="h-5 w-5 shrink-0 text-blue-600" />
                        <span className={`break-normal text-[10.5px] font-semibold leading-[1.25] ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className={`premium-card mx-auto mt-3 max-w-md overflow-hidden rounded-2xl border shadow-lg lg:mx-0 lg:max-w-none ${darkMode ? 'border-slate-800' : 'border-white/70'}`}>
                <div className={`flex items-center gap-2.5 border-b px-4 py-3 ${darkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-100 bg-gradient-to-r from-blue-50 to-teal-50'}`}>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${darkMode ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-100 text-teal-600'}`}>
                    <Shield className="h-4 w-4" />
                  </span>
                  <p className={`text-xs font-bold uppercase tracking-[0.14em] ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>
                    {language === 'hi' ? 'परिवार हम पर भरोसा क्यों करते हैं' : 'Why families trust us'}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2.5 p-4 sm:grid-cols-3">
                  {trustPoints.map((point) => {
                    const Icon = point.icon;
                    return (
                      <div key={point.label} className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-colors ${darkMode ? 'border-slate-800 bg-slate-900/70 hover:border-teal-500/40' : 'border-slate-100 bg-slate-50 hover:border-teal-200'}`}>
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${darkMode ? 'bg-blue-500/15' : 'bg-blue-100'}`}>
                          <Icon className="h-4 w-4 text-blue-600" />
                        </span>
                        <span className={`text-[11px] font-semibold leading-4 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{point.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={`mx-auto mt-3 max-w-md rounded-2xl border p-4 lg:mx-0 lg:max-w-none ${darkMode ? 'border-slate-800 bg-gradient-to-r from-blue-950/60 to-teal-950/40' : 'border-blue-100 bg-gradient-to-r from-blue-50 to-teal-50'}`}>
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row lg:items-center">
                  <div className="text-center sm:text-left">
                    <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {language === 'hi' ? 'तुरंत बात करनी है?' : 'Need to talk right now?'}
                    </p>
                    <p className={`mt-0.5 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {language === 'hi' ? 'रिसेप्शन कॉल, व्हाट्सएप या मैप — तीनों एक टैप में' : 'Reception call, WhatsApp, or directions — all one tap away'}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={() => window.location.href = `tel:${hospitalInfo.phone}`} className="button-lift flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700" aria-label="Call">
                      <Phone className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => window.open(`https://wa.me/${hospitalInfo.whatsapp}`, '_blank')} className="button-lift flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md hover:bg-[#20BD5A]" aria-label="WhatsApp">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => window.open(hospitalInfo.googleMapsLink, '_blank')} className="button-lift flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white shadow-md hover:bg-slate-800" aria-label="Directions">
                      <MapPin className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col gap-3 lg:self-start">
              <div className="relative min-h-[230px] overflow-hidden rounded-2xl shadow-2xl sm:min-h-[310px] lg:min-h-[390px]">
                <img src={assetPath('images/hospital/hospital-main.jpg')} alt="Rajrani Hospital building" className="h-full w-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex max-w-[80%] items-stretch overflow-hidden rounded-xl bg-white/95 shadow-lg backdrop-blur-sm">
                  <span className="w-1.5 shrink-0 bg-gradient-to-b from-blue-600 to-teal-500" />
                  <div className="px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal-700">NABL Accredited | CGHS Empanelled</p>
                    <p className="text-sm font-black text-gray-900">Old Kondli, New Delhi</p>
                  </div>
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-green-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  Open 24 Hours
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {diagnosticsHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className={`premium-card rounded-[1.25rem] border bg-gradient-to-br p-3 shadow-lg ${darkMode ? `border-slate-800 ${item.accent}` : `border-white/70 ${item.accent}`}`}>
                      <div className="flex items-start gap-3 sm:block lg:flex">
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${darkMode ? 'bg-slate-950/70' : 'bg-white/95'}`}>
                          <Icon className={`h-5 w-5 ${item.iconTone}`} />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                          <p className={`mt-1 text-[11px] leading-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item.subtitle}</p>
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

      {/* ================= ABOUT ================= */}
      <section className={`px-3 py-10 sm:px-4 md:px-5 md:py-14 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto">
          <div className="scroll-reveal-left grid gap-6 overflow-hidden rounded-[2rem] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[240px] overflow-hidden rounded-[1.75rem] shadow-xl lg:min-h-full">
              <img src={assetPath('images/about/story-01.jpg')} alt="Rajrani Hospital story" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
              <Badge className="absolute left-4 top-4 bg-white/90 text-blue-700 shadow-sm"><Building2 className="mr-1 h-3 w-3" />Our Story</Badge>
              <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-4 py-2.5 shadow-lg">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-blue-700">
                  {language === 'hi' ? `स्थापना ${hospitalInfo.established}` : `Established ${hospitalInfo.established}`}
                </p>
              </div>
            </div>
            <div className={`premium-card flex flex-col justify-center rounded-[1.75rem] border p-6 md:p-8 ${darkMode ? 'border-slate-800' : 'border-white/70'}`}>
              <Badge className={`w-fit ${darkMode ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>{language === 'hi' ? 'हमारी कहानी' : 'About the hospital'}</Badge>
              <h3 className={`mt-3 text-2xl font-black md:text-3xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>{language === 'hi' ? 'राजरानी हॉस्पिटल' : 'About Rajrani Hospital'}</h3>
              <p className={`mt-4 text-sm leading-7 md:text-[15px] ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'hi'
                  ? `${hospitalInfo.established} से पुरानी कोंडली में सेवारत। ${hospitalInfo.accreditationHindi}, patient-first देखभाल जो हर परिवार के लिए स्पष्ट और भरोसेमंद है। हमारी टीम हर मरीज को व्यक्तिगत ध्यान देती है, ताकि इलाज सिर्फ प्रक्रिया न लगे, बल्कि एक भरोसेमंद अनुभव लगे।`
                  : `Serving Old Kondli since ${hospitalInfo.established}. A multi-specialty hospital built around one idea: every patient deserves clear, honest guidance alongside quality treatment. Our team gives every patient individual attention, so care never feels like a transaction — it feels like a relationship built on trust.`}
              </p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {aboutBullets.map((point) => (
                  <li key={point} className={`flex items-start gap-2 text-sm leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className={`mt-6 grid grid-cols-3 gap-2 border-t pt-5 ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                {[
                  { value: hospitalInfo.yearsExperience, label: language === 'hi' ? 'साल का अनुभव' : 'Years Experience' },
                  { value: hospitalInfo.patientsServed, label: language === 'hi' ? 'मरीज' : 'Patients' },
                  { value: '24/7', label: language === 'hi' ? 'इमरजेंसी' : 'Emergency' }
                ].map((stat) => (
                  <div key={stat.label} className={`rounded-xl px-2 py-3 text-center ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                    <div className="text-lg font-black text-blue-600 sm:text-xl">{stat.value}</div>
                    <div className={`mt-0.5 text-[10px] font-semibold leading-tight ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="group mt-6 inline-flex w-fit items-center text-sm font-bold text-blue-600">
                Explore About<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DIAGNOSTICS ================= */}
      <section className={`px-3 py-10 sm:px-4 md:px-5 md:py-14 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="scroll-reveal-right grid gap-6 overflow-hidden rounded-[2rem] lg:grid-cols-[1.1fr_0.9fr]">
            <div className={`premium-card order-2 flex flex-col justify-center rounded-[1.75rem] border p-6 md:p-8 lg:order-1 ${darkMode ? 'border-slate-800' : 'border-white/70'}`}>
              <Badge className={`w-fit ${darkMode ? 'bg-teal-900/40 text-teal-200' : 'bg-teal-100 text-teal-700'}`}><Tag className="mr-1 h-3 w-3" />{language === 'hi' ? 'डायग्नोस्टिक्स और ऑफर' : 'Diagnostics & Offers'}</Badge>
              <h3 className={`mt-3 text-2xl font-black md:text-3xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>{language === 'hi' ? 'रिलैक्स डायग्नोस्टिक्स' : 'Relax Diagnostics Offers'}</h3>
              <p className={`mt-4 text-sm leading-7 md:text-[15px] ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'hi'
                  ? 'CBC, LFT, X-Ray, Echo और बंडल्ड हेल्थ पैकेज, कम रेट पर, सीधे राजरानी हॉस्पिटल से जुड़े हुए। हर टेस्ट के लिए साफ प्राइसिंग, ताकि बुकिंग से पहले ही आपको पूरी जानकारी मिले।'
                  : 'CBC, LFT, X-Ray, Echo, and bundled health packages, at reduced offer rates, linked directly with Rajrani Hospital. Transparent pricing on every test so you know exactly what to expect before you even walk in.'}
              </p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {diagnosticsBullets.map((point) => (
                  <li key={point} className={`flex items-start gap-2 text-sm leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link to="/diagnostics" className="group mt-6 inline-flex w-fit items-center text-sm font-bold text-teal-600">
                Open Diagnostics<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="order-1 flex flex-col gap-4 lg:order-2">
              <div className="relative min-h-[200px] overflow-hidden rounded-[1.75rem] shadow-xl">
                <img src={assetPath('images/about/story-02.jpg')} alt="Relax Diagnostics" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/5 to-transparent" />
                <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-teal-700 shadow-sm">
                  {topOfferTests.length ? `${topOfferTests.length}+ offer tests live` : 'Offers live'}
                </div>
              </div>
              <div className={`premium-card rounded-[1.5rem] border p-4 ${darkMode ? 'border-slate-800' : 'border-white/70'}`}>
                <p className={`mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>
                  <Zap className="h-3.5 w-3.5" />
                  {language === 'hi' ? 'सबसे ज़्यादा बुक होने वाले टेस्ट' : 'Most booked tests right now'}
                </p>
                <div className="space-y-1.5">
                  {topOfferTests.map((test) => (
                    <div
                      key={test.name}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold ${darkMode ? 'bg-slate-900/60 text-slate-200' : 'bg-slate-50 text-slate-700'}`}
                    >
                      <span>{test.name}</span>
                      <span>
                        <span className="mr-1.5 text-slate-400 line-through">₹{test.originalPrice}</span>
                        <span className="text-teal-600">₹{test.offerPrice}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACCREDITATION ================= */}
      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="mb-6 text-center">
            <Badge className={`${darkMode ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>Trust &amp; Recognition</Badge>
            <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>Our Accreditation</h2>
            <p className={`mx-auto mt-2 max-w-2xl text-sm leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'hi'
                ? 'NABH मानकों और NABL से जुड़ी डायग्नोस्टिक्स के साथ, हम हर विजिट को सुरक्षित और भरोसेमंद बनाते हैं।'
                : 'Backed by NABH-guided standards and NABL-linked diagnostics, every visit is built around safety and trust.'}
            </p>
          </div>
          <div className="section-stagger grid gap-4 md:grid-cols-3 md:items-stretch">
            {accreditationCards.map((item, index) => {
              const Icon = item.icon;
              const imgPath = item.badgeFile ? `${accreditationImageDir}/${item.badgeFile}` : null;
              const isLast = index === accreditationCards.length - 1;
              return (
                <div key={item.title} className={`accred-card scroll-reveal flex h-full flex-col rounded-2xl border p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${darkMode ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'}`} style={{ '--stagger-index': index }}>
                  {!isLast ? (
                    <>
                      <div className="accred-badge-ring mx-auto">
                        {imgPath ? (
                          <img
                            src={assetPath(imgPath)}
                            alt={item.title}
                            className="h-16 w-16 rounded-full object-contain"
                            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
                          />
                        ) : null}
                        <span className={`${imgPath ? 'hidden' : 'flex'} h-16 w-16 items-center justify-center rounded-full ${darkMode ? 'bg-blue-500/15' : 'bg-blue-50'}`}>
                          <Icon className="h-8 w-8 text-blue-600" />
                        </span>
                      </div>
                      <h3 className={`mt-4 text-lg font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{item.title}</h3>
                      <p className={`mx-auto mt-2 max-w-xs text-sm leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item.text}</p>
                      {item.points && (
                        <ul className="mt-4 flex-1 space-y-2 text-left">
                          {item.points.map((point) => (
                            <li key={point} className={`flex items-start gap-2 text-xs leading-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <>
                      <div className={`mb-4 flex items-center justify-center gap-2 self-start rounded-full px-3 py-1.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] ${darkMode ? 'bg-slate-800 text-teal-300' : 'bg-teal-50 text-teal-700'}`}>
                        <Camera className="h-3.5 w-3.5" />
                        {language === 'hi' ? 'लाइव फोटो' : 'Real photos'}
                      </div>
                      <h3 className={`mb-3 text-left text-lg font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{item.title}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-2 h-28 overflow-hidden rounded-xl">
                          <img src={assetPath(`images/gallery/gallery-${collagePhotos[0]}.jpg`)} alt="Hospital facility" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                        </div>
                        {collagePhotos.slice(1).map((id) => (
                          <div key={id} className="h-20 overflow-hidden rounded-xl">
                            <img src={assetPath(`images/gallery/gallery-${id}.jpg`)} alt="Hospital facility" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                          </div>
                        ))}
                      </div>
                      <p className={`mt-3 flex-1 text-left text-sm leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item.text}</p>
                      <a href="#hospital-gallery" className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-gradient-to-r from-blue-600 to-teal-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-transform hover:-translate-y-0.5">
                        <Compass className="h-3.5 w-3.5" />
                        {language === 'hi' ? 'गैलरी देखें' : 'Take a Tour'}
                      </a>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOSPITAL GALLERY ================= */}
      <div id="hospital-gallery">
        <HospitalGallery darkMode={darkMode} language={language} />
      </div>

      {/* ================= CENTRE OF EXCELLENCE ================= */}
      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto">
          <div className="mb-6 text-center">
            <Badge className={`${darkMode ? 'bg-indigo-900/50 text-indigo-200' : 'bg-indigo-100 text-indigo-700'}`}>Centre of Excellence</Badge>
            <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>Our Healthcare Specialities, Head to Toe</h2>
            <p className={`mx-auto mt-2 max-w-2xl text-sm leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'hi' ? 'हर विभाग एक स्पष्ट, अनुभवी टीम के साथ आपकी सेवा में तैयार है।' : 'Every department is staffed and ready — pick the area that matches your need.'}
            </p>
          </div>
          <div className="section-stagger grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {excellenceAreas.map((area, index) => {
              const Icon = getIcon(area.icon);
              return (
                <Link
                  key={area.id}
                  to="/services"
                  className={`scroll-reveal group relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}
                  style={{ '--stagger-index': index }}
                >
                  <div className="relative h-24 overflow-hidden sm:h-28">
                    <img src={assetPath(area.image)} alt={area.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                    <div className="absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-blue-600">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className={`p-2.5 text-center ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
                    <p className={`truncate text-[11px] font-bold sm:text-xs ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{language === 'hi' ? area.titleHindi : area.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-5 text-center">
            <Link to="/services"><Button variant="outline" size="sm">{language === 'hi' ? 'सभी विशेषताएं देखें' : 'View All Specialities'}<ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </section>

      {/* ================= WHAT MAKES US DIFFERENT ================= */}
      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <div className="mb-10">
            <Badge className={`${darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>What Makes Us Different</Badge>
            <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-gray-950'}`}>What makes our care feel different</h2>
            <div className="section-stagger mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {differenceCards.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`scroll-reveal value-flip-card ${isTouchCardMode ? 'value-flip-static' : ''}`}
                    style={{ '--stagger-index': index }}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (!isTouchCardMode) return;
                      setDetailModal({ title: item.title, icon: Icon, gradient: item.gradient, text: item.back });
                    }}
                    onKeyDown={(e) => {
                      if (!isTouchCardMode) return;
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setDetailModal({ title: item.title, icon: Icon, gradient: item.gradient, text: item.back });
                      }
                    }}
                  >
                    <div className="value-flip-inner">
                      <div className="value-flip-face text-white shadow-lg" style={{ background: item.gradient }}>
                        <div>
                          <Icon className="mb-5 h-8 w-8" />
                          <h3 className="text-xl font-black">{item.title}</h3>
                          <p className="mt-3 text-sm font-medium leading-7 opacity-90">{item.desc}</p>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] opacity-80">
                          {isTouchCardMode ? 'Tap to read more' : 'Hover to flip'}
                        </p>
                      </div>
                      <div className={`value-flip-face value-flip-back shadow-lg ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}`}>
                        <div>
                          <Icon className={`mb-5 h-8 w-8 ${darkMode ? 'text-teal-300' : 'text-teal-600'}`} />
                          <h3 className="text-xl font-black">{item.title}</h3>
                          <p className={`mt-3 text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item.back}</p>
                        </div>
                        <p className={`text-xs font-bold uppercase tracking-[0.16em] ${darkMode ? 'text-teal-300' : 'text-teal-600'}`}>
                          Move away to close
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge className={`${darkMode ? 'bg-teal-900/50 text-teal-300' : 'bg-teal-100 text-teal-700'}`}>{t.ourServices}</Badge>
              <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-gray-950'}`}>Our Services</h2>
            </div>
            <Link to="/services"><Button variant="outline" size="sm">View All <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
          </div>

          <div className="section-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service, index) => {
              const Icon = getIcon(service.icon);
              return (
                <Card
                  key={service.id}
                  className={`scroll-reveal-left service-hover-card ${isTouchCardMode ? '' : 'service-swipe-card'} border ${darkMode ? 'border-slate-700 bg-slate-800/60' : 'border-gray-200 bg-white'}`}
                  style={{ '--stagger-index': index }}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    if (!isTouchCardMode) return;
                    setDetailModal({ title: service.title, icon: Icon, gradient: 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)', list: service.details || [] });
                  }}
                >
                  <CardContent className="relative min-h-[14rem] sm:min-h-[17rem] p-5">
                    <div className={isTouchCardMode ? '' : 'service-slide-front'}>
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${darkMode ? 'bg-blue-600/20' : 'bg-blue-100'}`}><Icon className="h-6 w-6 text-blue-600" /></div>
                      <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-gray-950'}`}>{service.title}</h3>
                      <p className={`mt-3 text-sm leading-7 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">{(service.details || []).slice(0, 2).map((detail) => <span key={detail} className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>{detail}</span>)}</div>
                      <p className="mt-4 text-xs font-bold text-blue-600">{service.availability}</p>
                      {isTouchCardMode && <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${darkMode ? 'bg-slate-900 text-blue-200' : 'bg-blue-50 text-blue-700'}`}>Tap to view</span>}
                    </div>
                    {!isTouchCardMode && (
                      <div className={`service-slide-detail rounded-xl p-5 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'}`}>
                        <Badge className={`${darkMode ? 'bg-teal-500/20 text-teal-200' : 'bg-teal-100 text-teal-700'}`}>Key highlights</Badge>
                        <h3 className="mt-3 text-base font-black">{service.title}</h3>
                        <ul className={`mt-4 space-y-2 text-sm leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{(service.details || []).slice(0, 4).map((detail) => <li key={detail} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" /><span>{detail}</span></li>)}</ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= OUR DOCTORS ================= */}
      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge className={`${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>{t.ourDoctors}</Badge>
              <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-gray-950'}`}>Our Doctors</h2>
            </div>
            <Link to="/doctors"><Button variant="outline" size="sm">View All <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
          </div>
          <div className="section-stagger mobile-snap-row md:grid md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {homeDoctors.map((doctor, index) => (
              <div key={doctor.id} className={`premium-card scroll-reveal-right overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${darkMode ? 'border-slate-700' : 'border-slate-200'}`} style={{ '--stagger-index': index }}>
                <div className="relative">
                  <div className="h-16 bg-gradient-to-r from-blue-600 to-teal-600" />
                  <div className="relative -mt-11 flex justify-center">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md dark:border-slate-800">
                      <img src={assetPath(doctor.image)} alt={doctor.name} className="h-full w-full object-cover object-top" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = assetPath('images/doctors/doctor-01.jpg'); }} />
                    </div>
                  </div>
                  {doctor.onCall && (
                    <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-bold text-white shadow">On Call</span>
                  )}
                </div>
                <div className="px-4 pb-4 pt-2 text-center">
                  <h3 className={`whitespace-nowrap text-[15px] font-black ${darkMode ? 'text-white' : 'text-gray-950'}`}>{doctor.name}</h3>
                  <p className="mt-0.5 whitespace-nowrap text-xs font-semibold text-blue-500">{doctor.specialization}</p>
                  {doctor.specialties?.[0] && (
                    <span className={`mt-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold ${darkMode ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-50 text-teal-700'}`}>{doctor.specialties[0]}</span>
                  )}
                  <p className={`mt-2 text-[11.5px] leading-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{doctor.education}</p>
                  <div className={`mt-2.5 flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${darkMode ? 'bg-slate-950/60 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
                    <span className="flex items-center gap-1 whitespace-nowrap"><Clock className="h-3 w-3 shrink-0" />{doctor.timings?.[0]}</span>
                    <span className="whitespace-nowrap text-teal-600">{doctor.feeLabel}</span>
                  </div>
                  <Button size="sm" onClick={() => setShowAppointmentModal(true)} className="button-lift mt-3 w-full bg-gradient-to-r from-blue-600 to-teal-600 text-xs text-white">
                    {language === 'hi' ? 'बुक करें' : 'Book Visit'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className={`mt-3 text-center text-xs font-semibold md:hidden ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {language === 'hi' ? '← स्वाइप करें →' : '← Swipe to see more →'}
          </p>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <div className="container mx-auto">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="scroll-reveal-left order-2 lg:order-1">
              <Badge className={`${darkMode ? 'bg-emerald-900/50 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}><Zap className="mr-1 h-3.5 w-3.5" />Why Choose Us</Badge>
              <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                {language === 'hi' ? 'उन्नत तकनीक, अनुभवी टीम' : 'Advanced Technology, Expert Medical Team'}
              </h2>
              <p className={`mt-3 text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'hi'
                  ? `${hospitalInfo.yearsExperience} साल के अनुभव के साथ, राजरानी हॉस्पिटल हर परिवार के लिए भरोसेमंद, किफायती और उच्च-गुणवत्ता वाली स्वास्थ्य सेवा सुनिश्चित करता है।`
                  : `With ${hospitalInfo.yearsExperience} years of experience, Rajrani Hospital offers comprehensive multi-speciality care, advanced diagnostics, and round-the-clock emergency, pharmacy, and ambulance access — ensuring trusted, affordable, high-quality healthcare for every patient.`}
              </p>
              <ul className="mt-5 space-y-2.5">
                {whyChooseUs.map((point) => (
                  <li key={point} className={`flex items-start gap-2.5 text-sm font-medium leading-6 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => setShowAppointmentModal(true)} className="button-lift mt-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                {copy.appointment[language] || copy.appointment.en}<ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="scroll-reveal-right order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl">
                <img src={assetPath('images/about/trust-01.jpg')} alt="Rajrani Hospital medical team" className="h-72 w-full object-cover sm:h-80 lg:h-96" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[
                  { value: hospitalInfo.yearsExperience, label: 'Years' },
                  { value: hospitalInfo.patientsServed, label: 'Patients' },
                  { value: '20+', label: 'Doctors' },
                  { value: '24/7', label: 'Support' }
                ].map((stat) => (
                  <div key={stat.label} className={`rounded-xl p-3 text-center ${darkMode ? 'bg-slate-900' : 'bg-white shadow-sm'}`}>
                    <div className="text-lg font-black text-blue-600">{stat.value}</div>
                    <div className={`text-[10px] font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <div className="mb-6 text-center"><Badge className={`${darkMode ? 'bg-teal-900/50 text-teal-300' : 'bg-teal-100 text-teal-700'}`}>Testimonials</Badge><h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-gray-950'}`}>Patient Reviews</h2></div>
          <div className="scroll-reveal"><TestimonialCarousel reviews={testimonials} /></div>
        </div>
      </section>

      {/* ================= BOOK APPOINTMENT CTA ================= */}
      <section className={`relative overflow-hidden px-3 py-10 sm:px-4 md:px-5 md:py-14 ${darkMode ? 'bg-slate-950' : 'bg-slate-900'}`}>
        <img src={assetPath('images/hospital/hospital-main.jpg')} alt="Rajrani Hospital exterior" className="absolute inset-0 h-full w-full object-cover object-[center_25%] opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/92 via-slate-950/86 to-teal-950/88" />
        <div className="container relative z-10 mx-auto text-center">
          <Badge className="mb-3 border-0 bg-white/15 text-white">
            <Award className="mr-1 h-3.5 w-3.5" />
            {language === 'hi' ? 'गुणवत्ता में अंतर अनुभव करें' : 'Experience the Difference'}
          </Badge>
          <h2 className="text-2xl font-black text-white sm:text-3xl">Book Your Appointment</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/90">Reach us instantly by call or WhatsApp for your appointment.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={() => setShowAppointmentModal(true)} className="button-lift bg-white px-5 py-5 text-blue-600 hover:bg-gray-100">Book Appointment <ArrowRight className="ml-2 h-4 w-4" /></Button>
            <Button size="lg" variant="outline" onClick={() => window.open(`https://wa.me/${hospitalInfo.whatsapp}`, '_blank')} className="button-lift border-2 border-white px-5 py-5 text-white hover:bg-white/10">WhatsApp</Button>
          </div>
          <div className="mx-auto mt-7 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Phone, label: 'Call', action: () => window.location.href = `tel:${hospitalInfo.phone}` },
              { icon: MessageSquare, label: 'WhatsApp', action: () => window.open(`https://wa.me/${hospitalInfo.whatsapp}`, '_blank') },
              { icon: Clock, label: '24/7' },
              { icon: MapPin, label: 'Location', action: () => window.open(hospitalInfo.googleMapsLink, '_blank') }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} type="button" onClick={item.action} className="rounded-xl bg-white/10 p-4 text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                  <Icon className="mx-auto mb-1 h-5 w-5" />
                  <span className="text-xs font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {detailModal && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/60 px-0 backdrop-blur-sm sm:items-center sm:px-4" onClick={() => setDetailModal(null)}>
          <div
            className={`popover-pop-in w-full max-w-md overflow-hidden rounded-t-3xl sm:rounded-3xl shadow-2xl ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
            style={{ transformOrigin: 'bottom center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-white" style={{ background: detailModal.gradient }}>
              <div className="flex items-start justify-between">
                {detailModal.icon ? <detailModal.icon className="h-8 w-8" /> : <span />}
                <button type="button" onClick={() => setDetailModal(null)} aria-label="Close" className="rounded-full bg-white/15 p-1.5 hover:bg-white/25">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-4 text-xl font-black">{detailModal.title}</h3>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-5">
              {detailModal.text && (
                <p className={`text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{detailModal.text}</p>
              )}
              {detailModal.list && detailModal.list.length > 0 && (
                <ul className="space-y-2.5">
                  {detailModal.list.map((point) => (
                    <li key={point} className={`flex items-start gap-2 text-sm leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
    </div>
  );
};

export default Home;