  import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
  import {
    ArrowRight,
    CheckCircle2,
    Clock,
    ExternalLink,
    HeartPulse,
    MapPin,
    Monitor,
    Navigation,
    Phone,
    Scan,
    Search,
    ShieldCheck,
    Sparkles,
    Star,
    Stethoscope,
    TestTube2,
    Mail,
    X
  } from 'lucide-react';
  import { Card, CardContent } from '../components/ui/card';
  import { Badge } from '../components/ui/badge';
  import { Button } from '../components/ui/button';
  import { diagnosticsInfo, hospitalInfo, translations } from '../mockData';
  import { AppContext } from '../App';
  // import WhatsAppFloat from '../components/WhatsAppFloat';

  const featureIconMap = {
    Scan,
    HeartPulse,
    Monitor
  };

  const formatCurrency = (value) => `Rs. ${value}`;

  /**
   * Lightweight scroll-reveal hook (self-contained, no dependency on any
   * global CSS/JS observer). Only used for sections BELOW the fold.
   * Above-the-fold content (hero) uses a plain load-triggered animation
   * instead, since a scroll observer never fires for content that is
   * already inside the viewport on page load.
   */
  const useReveal = (threshold = 0.15) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return undefined;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold, rootMargin: '0px 0px -60px 0px' }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, [threshold]);

    return [ref, visible];
  };

  const revealClass = (visible) =>
    `transition-all duration-700 ease-out ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`;

  const RelaxDiagnosticsPage = () => {
    const { darkMode, language } = useContext(AppContext);
    const [expandedPackages, setExpandedPackages] = useState({});
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [heroMounted, setHeroMounted] = useState(false);
    const t = translations[language];

    useEffect(() => {
      // Triggers the hero's load-in animation on first paint.
      const timer = requestAnimationFrame(() => setHeroMounted(true));
      return () => cancelAnimationFrame(timer);
    }, []);

    const handleCall = () => (window.location.href = `tel:${diagnosticsInfo.phone}`);
    const handleWhatsApp = () => {
      const msg =
        language === 'hi'
          ? 'नमस्ते! मुझे रिलैक्स डायग्नोस्टिक्स में टेस्ट या पैकेज बुक करना है।'
          : 'Hello! I want to book a diagnostic test or package at Relax Diagnostics.';
      window.open(
        `https://wa.me/91${diagnosticsInfo.phone.replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(msg)}`,
        '_blank'
      );
    };
    const handleWhatsAppSupport = handleWhatsApp;

    const featureHighlights = diagnosticsInfo.featureHighlights.map((item) => ({
      ...item,
      icon: featureIconMap[item.icon] || Scan
    }));

    const totalOfferTests = diagnosticsInfo.offerCategories.reduce(
      (total, category) => total + category.tests.length,
      0
    );
    const totalPackages = diagnosticsInfo.packageCollections.reduce(
      (total, collection) => total + collection.packages.length,
      0
    );

    const regularSupportCards = [
      {
        icon: Stethoscope,
        title: language === 'hi' ? 'रूटीन पैथोलॉजी सपोर्ट' : 'Routine pathology support',
        description:
          language === 'hi'
            ? 'सीबीसी, शुगर, लिवर, किडनी, थायरॉयड और बुखार से जुड़े टेस्ट के लिए रोजाना सैंपल और रिपोर्ट सपोर्ट उपलब्ध है। हमारी टीम हर सैंपल कलेक्शन को सावधानी से हैंडल करती है और रिपोर्ट समझने में भी मदद करती है।'
            : 'Daily sample and report support for CBC, sugar, liver, kidney, thyroid, and fever-related blood tests. Every sample is handled carefully, and our team helps you understand what the report means.',
        items:
          language === 'hi'
            ? ['रोजाना सैंपल', 'रिपोर्ट गाइडेंस', 'फॉलो-अप सपोर्ट']
            : ['Daily samples', 'Report guidance', 'Follow-up support']
      },
      {
        icon: HeartPulse,
        title: language === 'hi' ? 'इमेजिंग और कार्डियक सपोर्ट' : 'Imaging and cardiac support',
        description:
          language === 'hi'
            ? 'डिजिटल एक्स-रे, 2D ईको, कलर अल्ट्रासाउंड और ईसीजी के लिए अस्पताल से जुड़ा समन्वय मिलता है, ताकि इमेजिंग से लेकर कंसल्टेशन तक की पूरी प्रक्रिया एक ही जगह से मैनेज हो सके।'
            : 'Digital X-Ray, 2D Echo, Colour Ultrasound, and ECG are coordinated with hospital-linked support, so the entire journey from imaging to consultation can be managed from one place.',
        items:
          language === 'hi'
            ? ['डिजिटल एक्स-रे', '2D ईको', 'कलर अल्ट्रासाउंड']
            : ['Digital X-Ray', '2D Echo', 'Colour Ultrasound']
      },
      {
        icon: TestTube2,
        title: language === 'hi' ? 'प्रिवेंटिव और पैकेज डेस्क' : 'Preventive and package desk',
        description:
          language === 'hi'
            ? 'फुल बॉडी चेक-अप, फीवर प्रोफाइल, थायरॉयड और मॉनिटरिंग पैकेज के लिए एक ही डेस्क पर बुकिंग होती है, जिससे बार-बार अलग-अलग जगह जाने की जरूरत नहीं पड़ती।'
            : 'Full body check-ups, fever profiles, thyroid panels, and monitoring packages can all be booked from one desk, so there is no need to run between different counters.',
        items:
          language === 'hi'
            ? ['फुल बॉडी पैकेज', 'फीवर प्रोफाइल', 'मॉनिटरिंग पैनल']
            : ['Full body packages', 'Fever profiles', 'Monitoring panels']
      }
    ];

    const togglePackage = (packageCode) => {
      setExpandedPackages((current) => ({
        ...current,
        [packageCode]: !current[packageCode]
      }));
    };

    // Flattened, searchable list of every offer test across all categories.
    const searchResults = useMemo(() => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return null;

      const results = [];
      diagnosticsInfo.offerCategories.forEach((category) => {
        category.tests.forEach((test) => {
          const nameMatch = test.name.toLowerCase().includes(query);
          const nameHindiMatch = (test.nameHindi || '').toLowerCase().includes(query);
          if (nameMatch || nameHindiMatch) {
            results.push({
              ...test,
              categoryTitle: category.title,
              categoryTitleHindi: category.titleHindi
            });
          }
        });
      });

      diagnosticsInfo.packageCollections.forEach((collection) => {
        collection.packages.forEach((pkg) => {
          const titleMatch = pkg.title.toLowerCase().includes(query);
          const titleHindiMatch = (pkg.titleHindi || '').toLowerCase().includes(query);
          if (titleMatch || titleHindiMatch) {
            results.push({
              isPackage: true,
              name: pkg.title,
              nameHindi: pkg.titleHindi,
              price: pkg.price,
              code: pkg.code
            });
          }
        });
      });

      return results;
    }, [searchQuery]);

    // Reveal hooks for below-the-fold sections.
    const [offerRef, offerVisible] = useReveal();
    const [packagesRef, packagesVisible] = useReveal();
    const [supportRef, supportVisible] = useReveal();
    const [contactRef, contactVisible] = useReveal();

    return (
      <div className={`page-shell min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        {/* Local keyframes for the hero's load-in animation. Self-contained
            so it never depends on an external scroll-reveal script. */}
        <style>{`
          @keyframes diagFadeUp {
            from { opacity: 0; transform: translateY(22px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .diag-fade-up {
            opacity: 0;
            animation: diagFadeUp 0.7s ease-out forwards;
          }
          @keyframes diagFloatSlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .diag-float-slow {
            animation: diagFloatSlow 6s ease-in-out infinite;
          }
        `}</style>

        {/* Hero */}
        <section
          className={`relative overflow-hidden px-4 pb-8 pt-6 ${
            darkMode
              ? 'bg-gradient-to-br from-slate-950 via-teal-950/25 to-slate-950'
              : 'bg-gradient-to-br from-teal-50 via-white to-blue-50'
          }`}
        >
          <div
            className={`diag-float-slow pointer-events-none absolute left-0 top-14 h-40 w-40 rounded-full blur-3xl ${
              darkMode ? 'bg-teal-500/18' : 'bg-teal-300/40'
            }`}
          ></div>
          <div
            className={`diag-float-slow pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full blur-3xl ${
              darkMode ? 'bg-blue-500/18' : 'bg-blue-300/40'
            }`}
            style={{ animationDelay: '1.5s' }}
          ></div>

          <div className="hero-surface-inner container relative z-10 mx-auto grid items-start gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6">
            <div>
              <Badge
                className={`diag-fade-up glass-pill mb-4 border ${
                  darkMode ? 'border-teal-800 bg-teal-900/40 text-teal-200' : 'border-teal-200 bg-white/80 text-teal-700'
                }`}
                style={{ animationDelay: heroMounted ? '0.05s' : '0s' }}
              >
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                {language === 'hi'
                  ? 'ऑफर टेस्ट और पैकेज साफ सेक्शन में'
                  : 'Offer tests and packages now sit in clear separate sections'}
              </Badge>

              <h1
                className={`diag-fade-up text-4xl font-black tracking-tight sm:text-5xl md:text-6xl ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}
                style={{ animationDelay: '0.15s' }}
              >
                {diagnosticsInfo.name}
              </h1>
              <p
                className={`diag-fade-up mt-5 max-w-2xl text-sm leading-7 md:text-lg ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
                style={{ animationDelay: '0.25s' }}
              >
                {language === 'hi'
                  ? 'डायग्नोस्टिक्स पेज को ऑफर-बोर्ड टेस्ट, पैकेज कार्ड्स और रेगुलर सपोर्ट फ्लो में व्यवस्थित किया गया है, ताकि पोस्टर वाली प्राइसिंग और रेगुलर बुकिंग सपोर्ट दोनों आसानी से समझ आ सकें।'
                  : 'The diagnostics page is organized into offer-board tests, package cards, and regular support, so poster pricing and regular booking support feel easier to understand.'}
              </p>

              <div className="diag-fade-up mt-6 flex items-center gap-2" style={{ animationDelay: '0.32s' }}>
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-5 w-5 ${
                      index < Math.round(parseFloat(diagnosticsInfo.rating))
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
                <span className={`ml-2 text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  {diagnosticsInfo.rating}/5 rating
                </span>
              </div>

              <div className="diag-fade-up mt-7 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '0.4s' }}>
                <Button
                  size="lg"
                  onClick={handleCall}
                  className="button-lift bg-gradient-to-r from-teal-600 to-blue-600 px-7 text-white shadow-xl hover:from-teal-700 hover:to-blue-700"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {t.callNow}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleWhatsAppSupport}
                  className={`button-lift ${
                    darkMode
                      ? 'border-green-600/40 bg-slate-900/70 text-green-300 hover:bg-slate-800'
                      : 'border-green-300 bg-white/80 text-green-700 hover:bg-green-50'
                  }`}
                >
                  <svg viewBox="0 0 32 32" className="mr-2 h-4 w-4" fill="currentColor">
                    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.052 9.376L1.056 31.08l5.884-1.942A15.92 15.92 0 0016.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.606c-.39 1.1-2.282 2.108-3.168 2.17-.8.058-1.548.38-5.214-1.086-4.42-1.766-7.226-6.292-7.444-6.586-.218-.292-1.786-2.376-1.786-4.532 0-2.154 1.13-3.212 1.532-3.654.39-.43.862-.54 1.148-.54.286 0 .572.004.822.014.264.012.618-.1.968.738.36.862 1.226 2.984 1.334 3.202.11.218.182.474.036.766-.146.292-.218.474-.436.728-.218.256-.458.572-.654.768-.218.218-.446.454-.192.89.256.436 1.134 1.87 2.436 3.03 1.672 1.486 3.082 1.948 3.518 2.166.436.218.69.182.944-.11.256-.292 1.094-1.276 1.386-1.716.292-.436.582-.364.982-.218.398.146 2.532 1.194 2.966 1.412.436.218.726.328.834.508.11.182.11 1.04-.278 2.14z" />
                  </svg>
                  WhatsApp
                </Button>
              </div>

              <div className="diag-fade-up mt-7 grid gap-3 sm:grid-cols-3" style={{ animationDelay: '0.5s' }}>
                {featureHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className={`premium-card rounded-[1.35rem] border p-3 transition-all duration-300 hover:-translate-y-1 ${
                        darkMode ? 'border-slate-800 bg-slate-900/80 text-white' : 'border-white/70 bg-white/90 text-slate-900'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 hover:rotate-6 ${
                            darkMode ? 'bg-slate-950/70 text-teal-300' : 'bg-teal-50 text-teal-600'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{language === 'hi' ? item.titleHindi : item.title}</p>
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

            <div className="premium-card diag-fade-up rounded-[2rem] p-4 md:p-5" style={{ animationDelay: '0.2s' }}>
              <div
                className={`rounded-[1.55rem] border px-4 py-4 md:px-5 md:py-5 ${
                  darkMode ? 'border-slate-700 bg-slate-900/75 text-white' : 'border-slate-200 bg-white text-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`text-sm font-semibold ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>
                      Diagnostics snapshot
                    </p>
                    <h2 className="mt-2 text-2xl font-black">
                      {language === 'hi' ? 'ऑफर बोर्ड, पैकेज और बुकिंग सपोर्ट' : 'Offer board, packages, and booking support'}
                    </h2>
                  </div>
                  <div
                    className={`rounded-2xl px-3 py-2 text-sm font-semibold ${
                      darkMode ? 'bg-blue-500/15 text-blue-200' : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {totalPackages} packages
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    { label: 'Offer tests', value: `${totalOfferTests}+` },
                    { label: 'Package cards', value: `${totalPackages}` },
                    { label: 'Working hours', value: '8 AM - 10 PM' }
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className={`rounded-2xl border px-3 py-3 text-center transition-all duration-300 hover:-translate-y-0.5 ${
                        darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="text-lg font-black text-blue-500">{stat.value}</div>
                      <div className={`mt-1 text-[11px] ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-2.5">
                  {[
                    {
                      icon: ShieldCheck,
                      text: language === 'hi' ? diagnosticsInfo.accreditationHindi : diagnosticsInfo.accreditation
                    },
                    { icon: Mail, text: diagnosticsInfo.email },
                    {
                      icon: Clock,
                      text: language === 'hi' ? diagnosticsInfo.workingHoursHindi : diagnosticsInfo.workingHours
                    },
                    { icon: HeartPulse, text: `Connected support with ${hospitalInfo.name}` }
                  ].map((point) => {
                    const PointIcon = point.icon;
                    return (
                      <div
                        key={point.text}
                        className={`hover-accent-row rounded-2xl border px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 ${
                          darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <PointIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                          <p className={`text-xs leading-6 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{point.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-[1.45rem] bg-gradient-to-r from-teal-500 to-blue-500 p-[1px] transition-transform duration-300 hover:scale-[1.01]">
                  <div className={`rounded-[1.4rem] px-4 py-4 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{diagnosticsInfo.comboOffer.title}</p>
                        <p className={`mt-1 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {diagnosticsInfo.comboOffer.note}
                        </p>
                      </div>
                      <div
                        className={`rounded-2xl px-3 py-2 text-xs font-semibold ${
                          darkMode ? 'bg-teal-500/15 text-teal-200' : 'bg-teal-100 text-teal-700'
                        }`}
                      >
                        {diagnosticsInfo.comboOffer.tests.length} tests
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {diagnosticsInfo.comboOffer.tests.map((test) => (
                        <span
                          key={test}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {test}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search box for tests / packages */}
        <section className={`px-4 pt-6 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
          <div className="container mx-auto">
            <div
              className={`mx-auto flex max-w-2xl items-center gap-3 rounded-full border px-5 py-3 shadow-sm transition-all duration-300 focus-within:shadow-lg ${
                darkMode
                  ? 'border-slate-700 bg-slate-900/70 focus-within:border-teal-500/60'
                  : 'border-slate-200 bg-slate-50 focus-within:border-teal-400'
              }`}
            >
              <Search className={`h-4 w-4 shrink-0 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'टेस्ट या पैकेज खोजें, जैसे CBC, थायरॉयड, फुल बॉडी...'
                    : 'Search a test or package, e.g. CBC, Thyroid, Full Body...'
                }
                className={`w-full bg-transparent text-sm outline-none placeholder:text-slate-400 ${
                  darkMode ? 'text-white' : 'text-slate-800'
                }`}
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={`shrink-0 rounded-full p-1 transition-colors ${
                    darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-200'
                  }`}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            {searchResults ? (
              <div className="mx-auto mt-5 max-w-3xl">
                <p className={`mb-3 text-center text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {searchResults.length > 0
                    ? language === 'hi'
                      ? `${searchResults.length} नतीजे मिले`
                      : `${searchResults.length} result${searchResults.length > 1 ? 's' : ''} found`
                    : language === 'hi'
                      ? 'कोई टेस्ट या पैकेज नहीं मिला, रिसेप्शन पर पूछें'
                      : 'No matching test or package — please ask at reception'}
                </p>
                {searchResults.length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {searchResults.map((item, index) => (
                      <div
                        key={`${item.code || item.name}-${index}`}
                        className={`rounded-2xl border px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                          darkMode ? 'border-slate-700 bg-slate-900/70' : 'border-slate-200 bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className={`text-sm font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                              {language === 'hi' ? item.nameHindi || item.name : item.name}
                            </p>
                            <p className={`mt-1 text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              {item.isPackage
                                ? language === 'hi'
                                  ? 'पैकेज'
                                  : 'Package'
                                : language === 'hi'
                                  ? item.categoryTitleHindi
                                  : item.categoryTitle}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            {item.isPackage ? (
                              <p className="text-sm font-bold text-blue-500">{item.price}</p>
                            ) : (
                              <>
                                <p className={`text-xs line-through ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                  {formatCurrency(item.originalPrice)}
                                </p>
                                <p className="text-sm font-bold text-teal-500">{formatCurrency(item.offerPrice)}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </section>

        {/* Offer rate tests */}
        {!searchQuery && (
          <section
            ref={offerRef}
            className={`px-4 py-8 md:py-10 ${revealClass(offerVisible)} ${darkMode ? 'bg-slate-950' : 'bg-white'}`}
          >
            <div className="container mx-auto">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <Badge className={darkMode ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-700'}>
                    Offer rate tests
                  </Badge>
                  <h2 className={`mt-3 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {language === 'hi' ? 'पोस्टर वाले डिस्काउंटेड टेस्ट ऑफर' : 'Discounted test offers from the poster'}
                  </h2>
                  <p className={`mt-2 max-w-2xl text-sm leading-7 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {language === 'hi'
                      ? '"ऑफर" का मतलब है कि इन टेस्ट पर हमारे नियमित रेट से कम, प्रचार वाला डिस्काउंटेड रेट लागू होता है — यह हमारे रिसेप्शन पोस्टर पर लगी प्राइसिंग है, फाइनल बिल पर यही रेट लगेगा।'
                      : '"Offer" means these tests carry a promotional, discounted rate lower than our regular price — this is the same pricing displayed on our reception poster, and it is what appears on your final bill.'}
                  </p>
                </div>
                <div className={`rounded-full px-4 py-2 text-sm font-semibold ${darkMode ? 'bg-slate-900 text-teal-300' : 'bg-teal-50 text-teal-700'}`}>
                  {totalOfferTests}+ offer entries
                </div>
              </div>

              <div className="space-y-6">
                <div className="overflow-x-auto hide-scrollbar">
                  <div className="flex gap-2 md:gap-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                    {diagnosticsInfo.offerCategories.map((category, index) => (
                      <button
                        key={category.key}
                        onClick={() => setActiveTab(index)}
                        className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                          activeTab === index
                            ? 'scale-105 bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/30'
                            : darkMode
                              ? 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {language === 'hi' ? category.titleHindi : category.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {diagnosticsInfo.offerCategories[activeTab] && (
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3 mb-5">
                        <div>
                          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            {language === 'hi'
                              ? diagnosticsInfo.offerCategories[activeTab].titleHindi
                              : diagnosticsInfo.offerCategories[activeTab].title}
                          </h3>
                          <p className={`mt-2 text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {diagnosticsInfo.offerCategories[activeTab].description}
                          </p>
                        </div>
                        <div
                          className={`rounded-2xl px-3 py-2 text-xs font-semibold ${
                            darkMode ? 'bg-teal-500/15 text-teal-200' : 'bg-teal-100 text-teal-700'
                          }`}
                        >
                          {diagnosticsInfo.offerCategories[activeTab].tests.length} items
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        {diagnosticsInfo.offerCategories[activeTab].tests.map((test) => (
                          <div
                            key={test.name}
                            className={`group rounded-2xl border px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                              darkMode
                                ? 'border-slate-700 bg-slate-950/65 hover:border-teal-600/50 hover:bg-slate-900/80'
                                : 'border-slate-200 bg-slate-50 hover:border-teal-400 hover:bg-teal-50'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 flex-1">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500 transition-transform duration-300 group-hover:scale-110" />
                                <div className="min-w-0">
                                  <p className={`text-sm font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                                    {language === 'hi' ? test.nameHindi : test.name}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <p className={`text-xs line-through ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                  {formatCurrency(test.originalPrice)}
                                </p>
                                <p className="text-sm font-bold text-teal-500">{formatCurrency(test.offerPrice)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Packages */}
        {!searchQuery && (
          <section
            ref={packagesRef}
            className={`px-4 py-8 md:py-10 ${revealClass(packagesVisible)} ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}
          >
            <div className="container mx-auto">
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <Badge className={darkMode ? 'bg-amber-900/30 text-amber-200' : 'bg-amber-100 text-amber-700'}>
                    Package offers
                  </Badge>
                  <h2 className={`mt-3 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {language === 'hi' ? 'शामिल टेस्ट के साथ पैकेज' : 'Packages with expandable included tests'}
                  </h2>
                </div>
                <div
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    darkMode ? 'bg-slate-950 text-amber-300' : 'bg-white text-amber-700 shadow-sm'
                  }`}
                >
                  {totalPackages} package cards
                </div>
              </div>

              <div className="space-y-5">
                {diagnosticsInfo.packageCollections.map((collection) => (
                  <div key={collection.key} className="premium-card rounded-[2rem] p-4 md:p-5">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {language === 'hi' ? collection.titleHindi : collection.title}
                        </h3>
                        <p className={`mt-2 max-w-3xl text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {collection.description}
                        </p>
                      </div>
                      <div
                        className={`rounded-2xl px-3 py-2 text-xs font-semibold ${
                          darkMode ? 'bg-blue-500/15 text-blue-200' : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {collection.packages.length} cards
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 xl:grid-cols-3">
                      {collection.packages.map((pkg) => {
                        const isExpanded = Boolean(expandedPackages[pkg.code]);
                        const visibleTests = isExpanded ? pkg.testsIncluded : pkg.testsIncluded.slice(0, 5);

                        return (
                          <Card
                            key={pkg.code}
                            className={`group overflow-hidden rounded-[1.6rem] border-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                              darkMode
                                ? 'border-slate-700 bg-slate-950/75 hover:border-teal-500/40'
                                : 'border-slate-200 bg-white hover:border-teal-400/60'
                            }`}
                          >
                            <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <CardContent className="p-5">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <Badge className={darkMode ? 'bg-slate-800 text-teal-300' : 'bg-teal-100 text-teal-700'}>
                                    {pkg.code}
                                  </Badge>
                                  <h4 className={`mt-3 text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                    {language === 'hi' ? pkg.titleHindi : pkg.title}
                                  </h4>
                                  <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {pkg.parameterCount} parameters / marker set
                                  </p>
                                </div>
                                <div
                                  className={`rounded-2xl px-3 py-2 text-right transition-transform duration-300 group-hover:scale-105 ${
                                    darkMode ? 'bg-blue-950/65 text-blue-200' : 'bg-blue-50 text-blue-700'
                                  }`}
                                >
                                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Price</p>
                                  <p className="mt-1 text-sm font-bold">{pkg.price}</p>
                                </div>
                              </div>

                              <div className="mt-4 space-y-2">
                                {visibleTests.map((test) => (
                                  <div key={test} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                                    <span>{test}</span>
                                  </div>
                                ))}
                              </div>

                              {pkg.testsIncluded.length > 5 ? (
                                <button
                                  type="button"
                                  onClick={() => togglePackage(pkg.code)}
                                  className={`mt-3 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                                    darkMode ? 'text-teal-300 hover:text-teal-200' : 'text-teal-700 hover:text-teal-800'
                                  }`}
                                >
                                  <span>{isExpanded ? 'Hide included tests' : `Show all ${pkg.testsIncluded.length} included tests`}</span>
                                  <ArrowRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                </button>
                              ) : null}

                              {pkg.priceNote ? (
                                <p className={`mt-3 text-xs leading-6 ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>{pkg.priceNote}</p>
                              ) : null}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular support */}
        <section
          ref={supportRef}
          className={`px-4 py-8 md:py-10 ${revealClass(supportVisible)} ${darkMode ? 'bg-slate-950' : 'bg-white'}`}
        >
          <div className="container mx-auto">
            <div className="mb-8 text-center">
              <Badge className={darkMode ? 'bg-teal-900/40 text-teal-200' : 'bg-teal-100 text-teal-700'}>
                Regular diagnostics support
              </Badge>
              <h2 className={`mt-3 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'hi' ? 'ऑफर बोर्ड से अलग रेगुलर सेवा सपोर्ट' : 'Regular service support separate from the offer board'}
              </h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {regularSupportCards.map((card) => {
                const CardIcon = card.icon;
                return (
                  <Card key={card.title} className="premium-card group rounded-[1.8rem] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                    <CardContent className="p-5 md:p-6">
                      <div
                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6 ${
                          darkMode ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-100 text-teal-600'
                        }`}
                      >
                        <CardIcon className="h-6 w-6" />
                      </div>
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{card.title}</h3>
                      <p className={`mt-3 text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{card.description}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {card.items.map((item) => (
                          <span
                            key={item}
                            className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                              darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact and visit */}
        <section
          ref={contactRef}
          className={`px-4 py-8 md:py-10 ${revealClass(contactVisible)} ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}
        >
          <div className="container mx-auto grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="premium-card rounded-[2rem]">
              <CardContent className="p-7">
                <Badge className={darkMode ? 'bg-teal-900/40 text-teal-200' : 'bg-teal-100 text-teal-700'}>
                  Contact and visit
                </Badge>
                <h2 className={`mt-4 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {language === 'hi' ? 'टेस्ट और पैकेज बुकिंग के लिए सीधा सपोर्ट' : 'Direct support for test and package booking'}
                </h2>

                <div className="mt-6 space-y-3">
                  {[
                    { icon: MapPin, label: language === 'hi' ? diagnosticsInfo.addressHindi : diagnosticsInfo.address },
                    { icon: Phone, label: `${diagnosticsInfo.phone} | ${diagnosticsInfo.alternatePhone}` },
                    { icon: Clock, label: language === 'hi' ? diagnosticsInfo.workingHoursHindi : diagnosticsInfo.workingHours },
                    { icon: Mail, label: diagnosticsInfo.email }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className={`hover-accent-row group rounded-2xl border px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                          darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`rounded-2xl p-3 transition-transform duration-300 group-hover:scale-110 ${
                              darkMode ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-100 text-blue-600'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <p className={`allow-copy text-sm leading-7 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{item.label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button onClick={handleCall} className="button-lift bg-gradient-to-r from-teal-600 to-blue-600 text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    {language === 'hi' ? 'अभी कॉल करें' : 'Call now'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleWhatsAppSupport}
                    className={`button-lift ${
                      darkMode ? 'border-slate-700 text-slate-100 hover:bg-slate-800' : 'border-slate-200 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <TestTube2 className="mr-2 h-4 w-4" />
                    WhatsApp booking
                  </Button>
                  <a href={diagnosticsInfo.googleMapsLink} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className={`button-lift ${
                        darkMode ? 'border-slate-700 text-slate-100 hover:bg-slate-800' : 'border-slate-200 text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      {t.getDirections}
                      <ExternalLink className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card overflow-hidden rounded-[2rem] transition-transform duration-300 hover:scale-[1.01]">
              <CardContent className="p-0">
                <div className="relative h-[14rem] w-full md:h-[16rem]">
                  <iframe
                    src="https://maps.google.com/maps?q=Relax+Diagnostics+Kondli+Extension+New+Delhi+110096&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Relax Diagnostics Location"
                  />
                </div>
                <div className={`flex items-center justify-between gap-3 px-5 py-4 ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
                  <div>
                    <p className="text-sm font-semibold">Location preview</p>
                    <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Direct visit location for tests and packages
                    </p>
                  </div>
                  <a
                    href={diagnosticsInfo.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-semibold ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}
                  >
                    <MapPin className="h-4 w-4" />
                    Google Maps
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* <WhatsAppFloat /> */}
      </div>
    );
  };

  export default RelaxDiagnosticsPage;