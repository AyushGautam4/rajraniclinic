import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Ambulance,
  Award,
  Users,
  Heart,
  HeartPulse,
  Shield,
  CheckCircle2,
  Star,
  Target,
  Eye,
  ArrowRight,
  Phone,
  Sparkles,
  Building2,
  Building,
  Stethoscope,
  Clock,
  Quote,
  Scan,
  Monitor,
  TestTube,
  Baby,
  Bone,
  Scissors,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { hospitalInfo, facilities, services, diagnosticsInfo, consultantDoctors as doctors, testimonials, translations } from '../mockData';
import { AppContext } from '../App';
import AppointmentModal from '../components/AppointmentModal';
import TestimonialCarousel from '../components/TestimonialCarousel';
import FlipInfoCard from '../components/FlipInfoCard';
import FlipCardCarousel from '../components/FlipCardCarousel';
import HospitalGallery from '../components/HospitalGallery';
import { assetPath } from '../lib/assetPath';

const facilityIconMap = { Award, Building, Clock, Scan, Monitor, TestTube, Heart, HeartPulse };
const serviceIconMap = { Stethoscope, Ambulance, HeartPulse, TestTube, Heart, Baby, Bone, Scan, Monitor, Scissors };

const AboutPage = () => {
  const { darkMode, language } = useContext(AppContext);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const t = translations[language];
  const appointmentLabel = language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment';
  const brandName = language === 'hi' ? 'राजरानी हॉस्पिटल' : hospitalInfo.name;
  const cardHint = language === 'hi' ? 'होवर या टैप करें' : 'Hover or tap for details';
  const detailLabel = language === 'hi' ? 'अधिक जानकारी' : 'More insight';
  const careLabel = language === 'hi' ? 'देखभाल का भरोसा' : 'Care advantage';

  const trustCardImages = [
    'images/about/trust-01.jpg',
    'images/about/trust-02.jpg',
    'images/hospital/hospital-main.jpg'
  ];
  const valueCardImages = [
    'images/about/value-01.jpg',
    'images/about/trust-01.jpg',
    'images/about/story-02.jpg',
    'images/about/story-03.jpg'
  ];

  const heroStats = [
    { value: hospitalInfo.yearsExperience, label: language === 'hi' ? 'वर्ष अनुभव' : 'Years of trust' },
    { value: hospitalInfo.patientsServed, label: language === 'hi' ? 'संतुष्ट मरीज' : 'Patients served' },
    { value: `${doctors.length}+`, label: language === 'hi' ? 'अनुभवी डॉक्टर' : 'Doctors available' },
    { value: '24/7', label: language === 'hi' ? 'इमरजेंसी सपोर्ट' : 'Emergency support' }
  ];

  const trustHighlights = [
    {
      icon: Shield,
      title: language === 'hi' ? 'भरोसेमंद देखभाल' : 'Trusted care system',
      description: language === 'hi'
        ? 'क्लिनिकल अनुशासन, साफ प्रक्रियाएं और परिवारों के लिए स्पष्ट मार्गदर्शन।'
        : 'Clinical discipline, clean processes, and clear guidance for families.',
      detail: language === 'hi'
        ? 'हर विजिट को व्यवस्थित, सुरक्षित और कम उलझन वाला बनाने पर फोकस रहता है, ताकि परिवारों को भरोसा महसूस हो।'
        : 'Every visit is designed to feel organized, safer, and less confusing so families feel confident from arrival to follow-up.',
      tone: 'blue'
    },
    {
      icon: Stethoscope,
      title: language === 'hi' ? 'अनुभवी चिकित्सक' : 'Experienced medical team',
      description: language === 'hi'
        ? 'जनरल मेडिसिन से लेकर सर्जरी और डायग्नोस्टिक्स तक मजबूत टीम सपोर्ट।'
        : 'Strong support across general medicine, surgery, and diagnostics.',
      detail: language === 'hi'
        ? 'डॉक्टर, डायग्नोस्टिक्स और सपोर्ट टीम के बीच बेहतर तालमेल से इलाज ज्यादा connected और भरोसेमंद लगता है।'
        : 'Doctors, diagnostics, and support staff work in sync so treatment feels more coordinated and dependable.',
      tone: 'teal'
    },
    {
      icon: Building2,
      title: language === 'hi' ? 'मॉडर्न सुविधाएं' : 'Modern facility ecosystem',
      description: language === 'hi'
        ? 'एक ही परिसर में परामर्श, जांच, इमरजेंसी और रिकवरी के लिए बेहतर व्यवस्था।'
        : 'Consultation, testing, emergency, and recovery support under one roof.',
      detail: language === 'hi'
        ? 'पेशेंट जर्नी को अलग-अलग टुकड़ों में नहीं, बल्कि एक smooth और premium healthcare flow की तरह पेश किया गया है।'
        : 'The patient journey is presented as one smooth, premium healthcare flow instead of disconnected service points.',
      tone: 'emerald'
    }
  ];

  const storyCards = [
    {
      icon: Eye,
      title: language === 'hi' ? 'हमारा विज़न' : 'Our vision',
      body: language === 'hi'
        ? 'पूर्वी दिल्ली की उन परिवारों की पहली पसंद बनना जो भरोसेमंद, किफायती और संवेदनशील इलाज चाहते हैं।'
        : 'To be the first choice for families across East Delhi seeking reliable, affordable, and compassionate care.',
      tone: 'teal'
    },
    {
      icon: Target,
      title: language === 'hi' ? 'हमारा मिशन' : 'Our mission',
      body: language === 'hi'
        ? 'अनुभवी डॉक्टरों, आधुनिक उपकरणों और पारदर्शी देखभाल के साथ मरीज-प्रथम सेवा देना।'
        : 'Deliver patient-first care through experienced doctors, modern equipment, and transparent support.',
      tone: 'blue'
    },
    {
      icon: Award,
      title: language === 'hi' ? 'हमारी पहचान' : 'Our promise',
      body: language === 'hi'
        ? 'हर विजिट को तेज, सम्मानजनक और भरोसेमंद अनुभव बनाना ताकि परिवार सुरक्षित महसूस करें।'
        : 'Make every visit feel faster, respectful, and dependable so families feel secure.',
      tone: 'emerald'
    }
  ];

  const storyGradients = [
    'linear-gradient(135deg, #0f766e 0%, #0e7490 100%)',
    'linear-gradient(135deg, #1d4ed8 0%, #0f766e 100%)',
    'linear-gradient(135deg, #7c3aed 0%, #1d4ed8 100%)'
  ];

  const valueCards = [
    {
      icon: Heart,
      title: language === 'hi' ? 'करुणा' : 'Compassion',
      desc: language === 'hi' ? 'देखभाल में गर्मजोशी' : 'Warmth in every interaction',
      detail: language === 'hi' ? 'मरीज को धैर्य से सुनना, साफ समझाना और सम्मान के साथ गाइड करना।' : 'Patients are heard patiently, informed clearly, and guided with dignity.',
      tone: 'blue'
    },
    {
      icon: Shield,
      title: language === 'hi' ? 'नैतिकता' : 'Ethics',
      desc: language === 'hi' ? 'ईमानदार और साफ निर्णय' : 'Clear and honest decision-making',
      detail: language === 'hi' ? 'सलाह हमेशा practical, पारदर्शी और जरूरत के हिसाब से रखी जाती है।' : 'Recommendations stay practical, transparent, and genuinely aligned with patient need.',
      tone: 'teal'
    },
    {
      icon: Star,
      title: language === 'hi' ? 'उत्कृष्टता' : 'Excellence',
      desc: language === 'hi' ? 'हर डिटेल पर ध्यान' : 'Attention to every detail',
      detail: language === 'hi' ? 'क्लिनिकल execution, स्पष्ट संवाद और follow-up को भी quality care का जरूरी हिस्सा माना जाता है।' : 'Clinical execution, clear communication, and follow-up are treated as essential parts of quality care.',
      tone: 'emerald'
    },
    {
      icon: Users,
      title: language === 'hi' ? 'मरीज पहले' : 'Patient first',
      desc: language === 'hi' ? 'हर योजना मरीज के लिए' : 'Care plans built around people',
      detail: language === 'hi' ? 'अगले कदम, सपोर्ट और निर्णय मरीज और परिवार की सुविधा को ध्यान में रखकर बनाए जाते हैं।' : 'Plans, next steps, and support are shaped around the patient and family experience.',
      tone: 'blue'
    }
  ];

  const departmentAreas = services.slice(0, 8);

  const safetyStandards = [
    {
      icon: ShieldCheck,
      title: language === 'hi' ? 'साफ-सफाई प्रोटोकॉल' : 'Infection-control protocol',
      desc: language === 'hi' ? 'OPD, वार्ड और OT में नियमित सैनिटाइजेशन शेड्यूल।' : 'Scheduled sanitisation across OPD, wards, and the operation theatre.'
    },
    {
      icon: Users,
      title: language === 'hi' ? 'प्रशिक्षित स्टाफ' : 'Trained nursing staff',
      desc: language === 'hi' ? 'हर शिफ्ट में प्रशिक्षित नर्सिंग और सपोर्ट टीम मौजूद।' : 'Trained nursing and support staff present on every shift, day and night.'
    },
    {
      icon: Ambulance,
      title: language === 'hi' ? 'इमरजेंसी रेडीनेस' : 'Emergency readiness',
      desc: language === 'hi' ? '24/7 इमरजेंसी टीम और एम्बुलेंस सपोर्ट तैयार।' : '24/7 emergency team and ambulance support ready to respond.'
    },
    {
      icon: CheckCircle2,
      title: language === 'hi' ? 'पारदर्शी फीस' : 'Transparent fees',
      desc: language === 'hi' ? 'हर सेवा की फीस विजिट से पहले साफ बताई जाती है।' : 'Consultation and test pricing is shared clearly before every visit.'
    }
  ];

  const leadershipPoints = [
    language === 'hi' ? 'हर मरीज की बात धैर्य से सुनी जाए' : 'Every patient is heard with patience, not rushed',
    language === 'hi' ? 'इलाज से पहले विकल्प साफ-साफ समझाए जाएं' : 'Treatment options are explained clearly before decisions are made',
    language === 'hi' ? 'फीस और प्रक्रिया में कोई छुपाव न हो' : 'Fees and procedures stay transparent, with nothing hidden'
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
      <section className={`page-hero-offset relative overflow-hidden px-3 pb-8 sm:px-4 sm:pb-8 md:px-5 md:pb-12 lg:pb-14 ${
        darkMode
          ? 'bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950'
          : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50'
      }`}>
        <div className={`pointer-events-none absolute -left-16 top-16 h-44 w-44 rounded-full blur-3xl ${darkMode ? 'bg-blue-500/20' : 'bg-blue-300/40'}`}></div>
        <div className={`pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full blur-3xl ${darkMode ? 'bg-teal-500/20' : 'bg-teal-300/40'}`}></div>

        <div className="hero-surface-inner container mx-auto relative z-10">
          <div className="grid items-start gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
            <div>
              <Badge className={`glass-pill mb-4 border ${darkMode ? 'border-blue-800 bg-blue-900/40 text-blue-200' : 'border-blue-200 bg-white/70 text-blue-700'}`}>
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                {language === 'hi' ? 'मरीज-प्रथम, समुदाय-केंद्रित देखभाल' : 'Patient-first, community-focused care'}
              </Badge>

              <h1 className={`max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'hi' ? 'विश्वास, अनुभव और आधुनिक देखभाल' : 'Trust, experience, and modern care'}
              </h1>

              <p className={`mt-4 sm:mt-5 md:mt-6 max-w-2xl text-xs sm:text-sm md:text-base lg:text-lg leading-6 md:leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'hi'
                  ? `${brandName} ${hospitalInfo.established} से ओल्ड कोंडली में परिवारों को भरोसेमंद उपचार, अनुभवी डॉक्टर और तेज़ डायग्नोस्टिक सपोर्ट दे रहा है।`
                  : `${brandName} has been serving families in Old Kondli since ${hospitalInfo.established} with dependable treatment, experienced doctors, and fast diagnostic support.`}
              </p>

              <div className="mt-5 sm:mt-6 md:mt-7 flex flex-col gap-2 sm:gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => setShowAppointmentModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 px-5 sm:px-6 md:px-7 py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:from-blue-700 hover:to-teal-700 hover:shadow-[0_18px_38px_rgba(37,99,235,0.25)] active:scale-[0.98]"
                >
                  {appointmentLabel}
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = `tel:${hospitalInfo.phone}`}
                  className={`px-5 sm:px-6 md:px-7 py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base ${darkMode ? 'border-slate-700 bg-slate-900/60 text-slate-100 hover:bg-slate-800' : 'border-slate-200 bg-white/80 text-slate-800 hover:bg-slate-50'}`}
                >
                  <Phone className="mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4" />
                  {hospitalInfo.phone}
                </Button>
              </div>

              <div className="mt-6 sm:mt-7 md:mt-8 grid grid-cols-2 gap-2 sm:gap-2 md:grid-cols-4 md:gap-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className={`premium-card rounded-2xl px-3 sm:px-3 md:px-4 py-3 sm:py-3 md:py-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black text-blue-500">{stat.value}</div>
                    <div className={`mt-1 text-[10px] sm:text-xs md:text-xs leading-4 md:leading-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="premium-card rounded-[2rem] p-3">
                <div className="group overflow-hidden rounded-[1.6rem]">
                  <img
                    src={assetPath('images/hospital/hospital-main.jpg')}
                    alt="Rajrani Hospital building"
                    className="h-[18rem] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045] sm:h-[22rem] md:h-[29rem] md:object-[50%_38%]"
                  />
                </div>
                <div className={`mt-3 flex items-center justify-between rounded-[1.3rem] px-4 py-4 ${
                  darkMode ? 'bg-slate-900/80 text-white' : 'bg-slate-50 text-slate-900'
                }`}>
                  <div>
                    <p className="text-sm font-semibold">{brandName}</p>
                    <p className={`mt-1 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {language === 'hi' ? 'ओल्ड कोंडली, नई दिल्ली' : 'Old Kondli, New Delhi'}
                    </p>
                  </div>
                  <div className={`rounded-2xl px-3 py-2 text-xs font-semibold ${
                    darkMode ? 'bg-blue-500/15 text-blue-200' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {language === 'hi' ? 'ISO Guided Care' : 'ISO Guided Care'}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className={`premium-card rounded-2xl px-3.5 py-3 md:px-4 md:py-4 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`rounded-2xl p-2 ${darkMode ? 'bg-teal-500/15' : 'bg-teal-100'}`}>
                      <Clock className={`h-5 w-5 ${darkMode ? 'text-teal-300' : 'text-teal-600'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{language === 'hi' ? '24/7 सपोर्ट' : '24/7 support'}</p>
                      <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {language === 'hi' ? 'इमरजेंसी और त्वरित सहायता' : 'Emergency and rapid assistance'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`premium-card rounded-2xl px-3.5 py-3 md:px-4 md:py-4 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`rounded-2xl p-2 ${darkMode ? 'bg-blue-500/15' : 'bg-blue-100'}`}>
                      <Award className={`h-5 w-5 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{language === 'hi' ? 'विश्वसनीय मानक' : 'Trusted standards'}</p>
                      <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {hospitalInfo.accreditation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY FAMILIES CHOOSE US ================= */}
      <section className={`px-3 py-8 sm:px-4 sm:py-8 md:px-5 md:py-12 lg:py-14 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto">
          <div className="mb-6 sm:mb-8 md:mb-10 text-center">
            <Badge className={darkMode ? 'bg-teal-900/50 text-teal-300' : 'bg-teal-100 text-teal-700'}>
              {language === 'hi' ? 'क्यों चुनते हैं परिवार' : 'Why families choose us'}
            </Badge>
            <h2 className={`mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'hi' ? 'सिर्फ इलाज नहीं, भरोसे का अनुभव' : 'More than treatment, a dependable experience'}
            </h2>
          </div>

          <div className="md:hidden">
            <FlipCardCarousel
              items={trustHighlights}
              darkMode={darkMode}
              autoPlay={false}
              getKey={(item) => item.title}
              renderItem={(item, index) => {
                const Icon = item.icon;
                return (
                  <FlipInfoCard
                    icon={Icon}
                    title={item.title}
                    frontText={item.description}
                    backText={item.detail}
                    backLabel={detailLabel}
                    tone={item.tone}
                    darkMode={darkMode}
                    image={trustCardImages[index % trustCardImages.length]}
                    imageAlt={`${item.title} healthcare insight`}
                    hintLabel={cardHint}
                    footerLabel={careLabel}
                  />
                );
              }}
            />
          </div>
          <div className="hidden md:grid md:auto-rows-fr md:grid-cols-3 md:gap-4">
            {trustHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <FlipInfoCard
                  key={item.title}
                  icon={Icon}
                  title={item.title}
                  frontText={item.description}
                  backText={item.detail}
                  backLabel={detailLabel}
                  tone={item.tone}
                  darkMode={darkMode}
                  image={trustCardImages[index % trustCardImages.length]}
                  imageAlt={`${item.title} healthcare insight`}
                  hintLabel={cardHint}
                  footerLabel={careLabel}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= VISION / MISSION / PROMISE (fixed: text no longer overflows the card) ================= */}
      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="mb-6 text-center md:mb-8">
            <Badge className={darkMode ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-700'}>
              {language === 'hi' ? 'हमारी दिशा' : 'Our direction'}
            </Badge>
            <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'hi' ? 'विज़न, मिशन और वादा' : 'Vision, mission, and our promise'}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {storyCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex min-h-[15rem] flex-col justify-between rounded-[1.75rem] p-6 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-7"
                  style={{ background: storyGradients[index % storyGradients.length] }}
                >
                  <div>
                    <Icon className="mb-4 h-8 w-8" />
                    <h3 className="text-xl font-black">{card.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-white/90">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= LEADERSHIP MESSAGE ================= */}
      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto">
          <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="scroll-reveal-left">
              <div className={`premium-card overflow-hidden rounded-[2rem] ${darkMode ? '' : ''}`}>
                <div className="relative h-64 sm:h-72">
                  <img
                    src={assetPath('images/about/trust-01.jpg')}
                    alt={language === 'hi' ? hospitalInfo.managingDirectorHindi : hospitalInfo.managingDirector}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-lg font-black">{language === 'hi' ? hospitalInfo.managingDirectorHindi : hospitalInfo.managingDirector}</p>
                    <p className="text-xs text-white/80">{language === 'hi' ? 'निदेशक, राजरानी हॉस्पिटल' : 'Managing Director, Rajrani Hospital'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="scroll-reveal-right">
              <Badge className={darkMode ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-700'}>
                {language === 'hi' ? 'नेतृत्व का संदेश' : 'A Message From Our Leadership'}
              </Badge>
              <div className="relative mt-4">
                <Quote className={`absolute -left-1 -top-2 h-9 w-9 ${darkMode ? 'text-blue-500/25' : 'text-blue-200'}`} />
                <p className={`pl-8 text-base leading-8 sm:text-lg sm:leading-9 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  {language === 'hi'
                    ? 'हमारा मकसद सिर्फ इलाज देना नहीं, बल्कि हर परिवार को यह भरोसा देना है कि उनकी देखभाल सही हाथों में है। हम चाहते हैं कि अस्पताल में आने वाला हर मरीज सुना हुआ महसूस करे और साफ जानकारी के साथ घर लौटे।'
                    : 'Our goal has never been just to treat illness — it is to give every family the confidence that their care is in the right hands. We want every patient who walks in to feel heard, informed, and genuinely looked after.'}
                </p>
              </div>
              <div className="mt-6 grid gap-2.5 sm:grid-cols-1">
                {leadershipPoints.map((point) => (
                  <div key={point} className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 ${darkMode ? 'border-slate-700 bg-slate-950/50' : 'border-slate-200 bg-white'}`}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                    <p className={`text-sm leading-6 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEPARTMENTS WE CARE FOR ================= */}
      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-8">
            <div>
              <Badge className={darkMode ? 'bg-indigo-900/40 text-indigo-200' : 'bg-indigo-100 text-indigo-700'}>
                {language === 'hi' ? 'विभाग जिनकी हम देखभाल करते हैं' : 'Departments We Care For'}
              </Badge>
              <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'hi' ? 'हर उम्र और जरूरत के लिए एक विभाग' : 'A department for every age and need'}
              </h2>
            </div>
            <Link to="/services"><Button variant="outline" size="sm">{language === 'hi' ? 'सभी सेवाएं देखें' : 'View All Services'}<ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {departmentAreas.map((dept, index) => {
              const Icon = serviceIconMap[dept.icon] || Stethoscope;
              const big = index === 0 || index === 5;
              return (
                <Link
                  key={dept.id}
                  to={`/services#speciality-${dept.id}`}
                  className={`group relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${darkMode ? 'border-slate-800' : 'border-slate-200'} ${big ? 'col-span-2 row-span-1' : ''}`}
                >
                  <div className={`relative ${big ? 'h-32 sm:h-36' : 'h-24 sm:h-28'} overflow-hidden`}>
                    <img src={assetPath(dept.image)} alt={dept.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
                    <div className="absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-blue-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="absolute bottom-2 left-11 right-2 truncate text-xs font-bold text-white sm:text-sm">
                      {language === 'hi' ? dept.titleHindi : dept.title}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= VALUES + INFRASTRUCTURE ================= */}
      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <Badge className={darkMode ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-700'}>
              {language === 'hi' ? 'हमारे मूल्य' : 'Our values'}
            </Badge>
            <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'hi' ? 'जो हमारे काम को अलग बनाता है' : 'What makes our care feel different'}
            </h2>
            <div className="mt-6 md:hidden">
              <FlipCardCarousel
                items={valueCards}
                darkMode={darkMode}
                autoPlay={false}
                getKey={(item) => item.title}
                renderItem={(value, index) => {
                  const Icon = value.icon;
                  return (
                    <FlipInfoCard
                      icon={Icon}
                      title={value.title}
                      frontText={value.desc}
                      backText={value.detail}
                      backLabel={detailLabel}
                      tone={value.tone}
                      darkMode={darkMode}
                      image={valueCardImages[index % valueCardImages.length]}
                      imageAlt={`${value.title} patient value`}
                      hintLabel={cardHint}
                      footerLabel={careLabel}
                    />
                  );
                }}
              />
            </div>
            <div className="mt-6 hidden md:grid md:auto-rows-fr md:grid-cols-2 md:gap-4">
              {valueCards.map((value, index) => {
                const Icon = value.icon;
                return (
                  <FlipInfoCard
                    key={value.title}
                    icon={Icon}
                    title={value.title}
                    frontText={value.desc}
                    backText={value.detail}
                    backLabel={detailLabel}
                    tone={value.tone}
                    darkMode={darkMode}
                    image={valueCardImages[index % valueCardImages.length]}
                    imageAlt={`${value.title} patient value`}
                    hintLabel={cardHint}
                    footerLabel={careLabel}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <Badge className={darkMode ? 'bg-teal-900/40 text-teal-200' : 'bg-teal-100 text-teal-700'}>
              {language === 'hi' ? 'फैसिलिटी हाइलाइट्स' : 'Facility highlights'}
            </Badge>
            <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'hi' ? 'इन्फ्रास्ट्रक्चर जो भरोसा बढ़ाए' : 'Infrastructure that reinforces trust'}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {facilities.map((facility) => {
                const Icon = facilityIconMap[facility.icon] || CheckCircle2;
                return (
                  <div key={facility.title} className="premium-card rounded-3xl p-5">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-2xl p-3 ${
                        darkMode ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-100 text-teal-600'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className={`text-base font-bold sm:text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {language === 'hi' ? facility.titleHindi : facility.title}
                        </h3>
                        <p className={`mt-2 text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {facility.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SAFETY & STANDARDS ================= */}
      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="mb-6 text-center md:mb-8">
            <Badge className={darkMode ? 'bg-emerald-900/40 text-emerald-200' : 'bg-emerald-100 text-emerald-700'}>
              <ShieldCheck className="mr-1 h-3.5 w-3.5" />
              {language === 'hi' ? 'सुरक्षा और मानक' : 'Safety & Standards'}
            </Badge>
            <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'hi' ? 'हर विजिट सुरक्षित और व्यवस्थित हो, यही कोशिश है' : 'Every visit is built to feel safe and organized'}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {safetyStandards.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`hover-accent-row rounded-2xl border p-5 text-center ${darkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'}`}>
                  <div className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl ${darkMode ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-600'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`mt-2 text-xs leading-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= DIAGNOSTICS PARTNERSHIP ================= */}
      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto">
          <div className={`premium-card grid gap-6 overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center`}>
            <div>
              <Badge className={darkMode ? 'bg-teal-900/40 text-teal-200' : 'bg-teal-100 text-teal-700'}>
                <Tag className="mr-1 h-3.5 w-3.5" />
                {language === 'hi' ? 'हमारा डायग्नोस्टिक पार्टनर' : 'Our Diagnostics Partner'}
              </Badge>
              <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'hi' ? diagnosticsInfo.nameHindi : diagnosticsInfo.name}
              </h2>
              <p className={`mt-3 text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {diagnosticsInfo.accreditation} — {language === 'hi'
                  ? 'रिपोर्ट, फॉलो-अप और इलाज एक ही सिस्टम में जुड़े रहते हैं, ताकि कहीं भी जानकारी बिखरे नहीं।'
                  : "reports, follow-up, and treatment stay connected in one system so nothing about your care gets lost in translation."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {diagnosticsInfo.featureHighlights.map((item) => (
                  <span key={item.title} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${darkMode ? 'bg-slate-800 text-slate-200' : 'bg-white text-slate-700 shadow-sm'}`}>
                    {item.title}
                  </span>
                ))}
              </div>
              <Link to="/diagnostics" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-teal-600">
                {language === 'hi' ? 'सभी ऑफर देखें' : 'View All Diagnostics Offers'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['05', '10', '14'].map((id, i) => (
                <div key={id} className={`overflow-hidden rounded-xl ${i === 0 ? 'col-span-3 h-28' : 'h-20'}`}>
                  <img src={assetPath(`images/gallery/gallery-${id}.jpg`)} alt="Diagnostics facility" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className={`px-3 py-8 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="mb-6 text-center md:mb-8">
            <Badge className={darkMode ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-700'}>
              {language === 'hi' ? 'रिव्यू और अनुभव' : 'Reviews and experiences'}
            </Badge>
            <h2 className={`mt-3 text-2xl font-black sm:text-3xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'hi' ? 'लोग हमारे बारे में क्या कहते हैं' : 'What people say after visiting us'}
            </h2>
          </div>
          <TestimonialCarousel reviews={testimonials} />
        </div>
      </section>

      {/* ================= HOSPITAL GALLERY (single instance — no duplicate) ================= */}
      <HospitalGallery darkMode={darkMode} language={language} />

      {/* ================= FINAL CTA ================= */}
      <section className={`relative overflow-hidden px-4 py-8 md:py-12 ${
        darkMode ? 'bg-gradient-to-r from-blue-900 via-slate-900 to-teal-900' : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600'
      }`}>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-black text-white md:text-4xl">
            {language === 'hi' ? 'जब संवाद स्पष्ट और देखभाल व्यवस्थित हो, भरोसा तेज़ी से बनता है' : 'When communication is clear and care feels organized, trust builds faster'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 md:text-base">
            {language === 'hi'
              ? 'यही वजह है कि हमने इस पेज को सिर्फ जानकारी देने के लिए नहीं, बल्कि मजबूत ब्रांड इंप्रेशन बनाने के लिए भी तैयार किया है।'
              : 'This page is designed not only to inform, but also to reassure families before their first visit.'}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={() => setShowAppointmentModal(true)} className="bg-white px-7 text-blue-700 hover:bg-slate-100">
              {appointmentLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = `tel:${hospitalInfo.phone}`}
              className="border-2 border-white text-white hover:bg-white/10"
            >
              <Phone className="mr-2 h-4 w-4" />
              {t.contactUs}
            </Button>
          </div>
        </div>
      </section>

      <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
    </div>
  );
};

export default AboutPage;