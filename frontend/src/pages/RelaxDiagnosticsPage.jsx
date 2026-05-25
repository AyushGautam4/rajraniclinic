import React, { useContext, useState } from 'react';
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
  ShieldCheck,
  Sparkles,
  Star,
  TestTube2
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { diagnosticsInfo, hospitalInfo, translations } from '../mockData';
import { AppContext } from '../App';
import WhatsAppFloat from '../components/WhatsAppFloat';

const featureIconMap = {
  Scan,
  HeartPulse,
  Monitor
};

const formatCurrency = (value) => `Rs. ${value}`;

const RelaxDiagnosticsPage = () => {
  const { darkMode, language } = useContext(AppContext);
  const [expandedPackages, setExpandedPackages] = useState({});
  const t = translations[language];

  const handleCall = () => window.location.href = `tel:${diagnosticsInfo.phone}`;
  const handleWhatsApp = () => {
    const msg = language === 'hi'
      ? 'नमस्ते! मुझे रिलैक्स डायग्नोस्टिक्स में टेस्ट या पैकेज बुक करना है।'
      : 'Hello! I want to book a diagnostic test or package at Relax Diagnostics.';
    window.open(`https://wa.me/91${diagnosticsInfo.phone.replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(msg)}`, '_blank');
  };
  const handleWhatsAppSupport = () => {
    const msg = language === 'hi'
      ? 'नमस्ते! मुझे रिलैक्स डायग्नोस्टिक्स में टेस्ट या पैकेज बुक करना है।'
      : 'Hello! I want to book a diagnostic test or package at Relax Diagnostics.';
    window.open(`https://wa.me/91${diagnosticsInfo.phone.replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const featureHighlights = diagnosticsInfo.featureHighlights.map((item) => ({
    ...item,
    icon: featureIconMap[item.icon] || Scan
  }));

  const totalOfferTests = diagnosticsInfo.offerCategories.reduce((total, category) => total + category.tests.length, 0);
  const totalPackages = diagnosticsInfo.packageCollections.reduce((total, collection) => total + collection.packages.length, 0);

  const regularSupportCards = [
    {
      title: language === 'hi' ? 'Routine pathology support' : 'Routine pathology support',
      description: language === 'hi'
        ? 'CBC, sugar, liver, kidney, thyroid, dengue, typhoid aur follow-up sample testing ke liye regular support available hai.'
        : 'Regular support is available for CBC, sugar, liver, kidney, thyroid, dengue, typhoid, and follow-up sample testing.',
      items: ['Daily sample collection', 'Same-day guidance', 'Report support']
    },
    {
      title: language === 'hi' ? 'Imaging and cardiac support' : 'Imaging and cardiac support',
      description: language === 'hi'
        ? 'Digital X-Ray, 2D Echo, Colour Ultrasound aur ECG linked hospital coordination ke saath available hain.'
        : 'Digital X-Ray, 2D Echo, Colour Ultrasound, and ECG are available with linked hospital coordination.',
      items: ['Digital X-Ray', '2D Echo', 'Colour Ultrasound']
    },
    {
      title: language === 'hi' ? 'Preventive and package desk' : 'Preventive and package desk',
      description: language === 'hi'
        ? 'Full body check-up, fever profiles, thyroid profile aur monitoring packages ke liye same diagnostics desk par booking hoti hai.'
        : 'Full body check-ups, fever profiles, thyroid profiles, and monitoring packages can all be booked from the same diagnostics desk.',
      items: ['Full body packages', 'Fever profiles', 'Monitoring panels']
    }
  ];

  const togglePackage = (packageCode) => {
    setExpandedPackages((current) => ({
      ...current,
      [packageCode]: !current[packageCode]
    }));
  };

  return (
    <div className={`page-shell min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
      <section className={`page-hero-offset relative overflow-hidden px-4 pb-8 ${
        darkMode ? 'bg-gradient-to-br from-slate-950 via-teal-950/25 to-slate-950' : 'bg-gradient-to-br from-teal-50 via-white to-blue-50'
      }`}>
        <div className={`pointer-events-none absolute left-0 top-14 h-40 w-40 rounded-full blur-3xl ${darkMode ? 'bg-teal-500/18' : 'bg-teal-300/40'}`}></div>
        <div className={`pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full blur-3xl ${darkMode ? 'bg-blue-500/18' : 'bg-blue-300/40'}`}></div>

        <div className="hero-surface-inner container relative z-10 mx-auto grid items-start gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6">
          <div>
            <Badge className={`glass-pill mb-4 border ${darkMode ? 'border-teal-800 bg-teal-900/40 text-teal-200' : 'border-teal-200 bg-white/80 text-teal-700'}`}>
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              {language === 'hi' ? 'Offer tests aur packages ab alag clear sections me' : 'Offer tests and packages now sit in clear separate sections'}
            </Badge>

            <h1 className={`text-4xl font-black tracking-tight sm:text-5xl md:text-6xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'hi' ? 'Relax Diagnostics' : diagnosticsInfo.name}
            </h1>
            <p className={`mt-5 max-w-2xl text-sm leading-7 md:text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'hi'
                ? 'Diagnostics page ko offer-board, package cards aur regular support flow me organize kiya gaya hai. Isse poster wali pricing aur regular booking support dono zyada clean tarah se samajh aate hain.'
                : 'The diagnostics page is now organized into offer-board tests, package cards, and regular support, so poster pricing and regular booking support feel easier to understand.'}
            </p>

            <div className="mt-6 flex items-center gap-2">
              {[...Array(5)].map((_, index) => (
                <Star key={index} className={`h-5 w-5 ${index < Math.round(parseFloat(diagnosticsInfo.rating)) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
              ))}
              <span className={`ml-2 text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{diagnosticsInfo.rating}/5 rating</span>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={handleCall} className="bg-gradient-to-r from-teal-600 to-blue-600 px-7 text-white shadow-xl hover:from-teal-700 hover:to-blue-700">
                <Phone className="mr-2 h-4 w-4" />
                {t.callNow}
              </Button>
              <Button size="lg" variant="outline" onClick={handleWhatsAppSupport} className={darkMode ? 'border-green-600/40 bg-slate-900/70 text-green-300 hover:bg-slate-800' : 'border-green-300 bg-white/80 text-green-700 hover:bg-green-50'}>
                <svg viewBox="0 0 32 32" className="mr-2 h-4 w-4" fill="currentColor"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.052 9.376L1.056 31.08l5.884-1.942A15.92 15.92 0 0016.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.606c-.39 1.1-2.282 2.108-3.168 2.17-.8.058-1.548.38-5.214-1.086-4.42-1.766-7.226-6.292-7.444-6.586-.218-.292-1.786-2.376-1.786-4.532 0-2.154 1.13-3.212 1.532-3.654.39-.43.862-.54 1.148-.54.286 0 .572.004.822.014.264.012.618-.1.968.738.36.862 1.226 2.984 1.334 3.202.11.218.182.474.036.766-.146.292-.218.474-.436.728-.218.256-.458.572-.654.768-.218.218-.446.454-.192.89.256.436 1.134 1.87 2.436 3.03 1.672 1.486 3.082 1.948 3.518 2.166.436.218.69.182.944-.11.256-.292 1.094-1.276 1.386-1.716.292-.436.582-.364.982-.218.398.146 2.532 1.194 2.966 1.412.436.218.726.328.834.508.11.182.11 1.04-.278 2.14z"/></svg>
                WhatsApp
              </Button>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {featureHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`rounded-[1.35rem] border p-3 ${darkMode ? 'border-slate-800 bg-slate-900/80 text-white' : 'border-white/70 bg-white/90 text-slate-900'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${darkMode ? 'bg-slate-950/70 text-teal-300' : 'bg-teal-50 text-teal-600'}`}>
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

          <div className="premium-card rounded-[2rem] p-4 md:p-5">
            <div className={`rounded-[1.55rem] border px-4 py-4 md:px-5 md:py-5 ${darkMode ? 'border-slate-700 bg-slate-900/75 text-white' : 'border-slate-200 bg-white text-slate-900'}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-sm font-semibold ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>
                    {language === 'hi' ? 'Diagnostics snapshot' : 'Diagnostics snapshot'}
                  </p>
                  <h2 className="mt-2 text-2xl font-black">
                    {language === 'hi' ? 'Offer board, packages aur booking support' : 'Offer board, packages, and booking support'}
                  </h2>
                </div>
                <div className={`rounded-2xl px-3 py-2 text-sm font-semibold ${darkMode ? 'bg-blue-500/15 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>
                  {totalPackages} packages
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { label: language === 'hi' ? 'Offer tests' : 'Offer tests', value: `${totalOfferTests}+` },
                  { label: language === 'hi' ? 'Package cards' : 'Package cards', value: `${totalPackages}` },
                  { label: language === 'hi' ? 'Working hours' : 'Working hours', value: '8 AM - 10 PM' }
                ].map((stat) => (
                  <div key={stat.label} className={`rounded-2xl border px-3 py-3 text-center ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`}>
                    <div className="text-lg font-black text-blue-500">{stat.value}</div>
                    <div className={`mt-1 text-[11px] ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2.5">
                {[
                  language === 'hi' ? diagnosticsInfo.accreditationHindi : diagnosticsInfo.accreditation,
                  diagnosticsInfo.email,
                  language === 'hi' ? diagnosticsInfo.workingHoursHindi : diagnosticsInfo.workingHours,
                  language === 'hi' ? `Connected support with ${hospitalInfo.name}` : `Connected support with ${hospitalInfo.name}`
                ].map((point) => (
                  <div key={point} className={`rounded-2xl border px-4 py-3 ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`}>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                      <p className={`text-xs leading-6 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{point}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[1.45rem] bg-gradient-to-r from-teal-500 to-blue-500 p-[1px]">
                <div className={`rounded-[1.4rem] px-4 py-4 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{diagnosticsInfo.comboOffer.title}</p>
                      <p className={`mt-1 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{diagnosticsInfo.comboOffer.note}</p>
                    </div>
                    <div className={`rounded-2xl px-3 py-2 text-xs font-semibold ${darkMode ? 'bg-teal-500/15 text-teal-200' : 'bg-teal-100 text-teal-700'}`}>
                      {diagnosticsInfo.comboOffer.tests.length} tests
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {diagnosticsInfo.comboOffer.tests.map((test) => (
                      <span key={test} className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
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

      <section className={`px-4 py-8 md:py-10 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className={darkMode ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-700'}>
                {language === 'hi' ? 'Offer rate tests' : 'Offer rate tests'}
              </Badge>
              <h2 className={`mt-3 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'hi' ? 'Poster wale discounted test offers' : 'Discounted test offers from the poster'}
              </h2>
            </div>
            <div className={`rounded-full px-4 py-2 text-sm font-semibold ${darkMode ? 'bg-slate-900 text-teal-300' : 'bg-teal-50 text-teal-700'}`}>
              {totalOfferTests}+ offer entries
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {diagnosticsInfo.offerCategories.map((category) => (
              <Card key={category.key} className="premium-card rounded-[1.8rem]">
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {language === 'hi' ? category.titleHindi : category.title}
                      </h3>
                      <p className={`mt-2 text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{category.description}</p>
                    </div>
                    <div className={`rounded-2xl px-3 py-2 text-xs font-semibold ${darkMode ? 'bg-teal-500/15 text-teal-200' : 'bg-teal-100 text-teal-700'}`}>
                      {category.tests.length} items
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {category.tests.map((test) => (
                      <div key={test.name} className={`hover-accent-row rounded-2xl border px-4 py-3 ${darkMode ? 'border-slate-700 bg-slate-950/65' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                            <div>
                              <p className={`text-sm font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                                {language === 'hi' ? test.nameHindi : test.name}
                              </p>
                              <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                {language === 'hi' ? 'Original rate and offer rate' : 'Original rate and offer rate'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-xs line-through ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{formatCurrency(test.originalPrice)}</p>
                            <p className="text-sm font-bold text-blue-500">{formatCurrency(test.offerPrice)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={`px-4 py-8 md:py-10 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className={darkMode ? 'bg-amber-900/30 text-amber-200' : 'bg-amber-100 text-amber-700'}>
                {language === 'hi' ? 'Package offers' : 'Package offers'}
              </Badge>
              <h2 className={`mt-3 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'hi' ? 'Packages with expandable included tests' : 'Packages with expandable included tests'}
              </h2>
            </div>
            <div className={`rounded-full px-4 py-2 text-sm font-semibold ${darkMode ? 'bg-slate-950 text-amber-300' : 'bg-white text-amber-700 shadow-sm'}`}>
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
                    <p className={`mt-2 max-w-3xl text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{collection.description}</p>
                  </div>
                  <div className={`rounded-2xl px-3 py-2 text-xs font-semibold ${darkMode ? 'bg-blue-500/15 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>
                    {collection.packages.length} cards
                  </div>
                </div>

                <div className="mt-5 grid gap-4 xl:grid-cols-3">
                  {collection.packages.map((pkg) => {
                    const isExpanded = Boolean(expandedPackages[pkg.code]);
                    const visibleTests = isExpanded ? pkg.testsIncluded : pkg.testsIncluded.slice(0, 5);

                    return (
                      <Card key={pkg.code} className={`rounded-[1.6rem] border ${darkMode ? 'border-slate-700 bg-slate-950/75' : 'border-slate-200 bg-white'}`}>
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <Badge className={darkMode ? 'bg-slate-800 text-teal-300' : 'bg-teal-100 text-teal-700'}>{pkg.code}</Badge>
                              <h4 className={`mt-3 text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                {language === 'hi' ? pkg.titleHindi : pkg.title}
                              </h4>
                              <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                {pkg.parameterCount} {language === 'hi' ? 'parameters / marker set' : 'parameters / marker set'}
                              </p>
                            </div>
                            <div className={`rounded-2xl px-3 py-2 text-right ${darkMode ? 'bg-blue-950/65 text-blue-200' : 'bg-blue-50 text-blue-700'}`}>
                              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">{language === 'hi' ? 'Price' : 'Price'}</p>
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
                              className={`mt-3 inline-flex items-center gap-2 text-sm font-semibold ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}
                            >
                              <span>
                                {isExpanded
                                  ? language === 'hi' ? 'Hide included tests' : 'Hide included tests'
                                  : language === 'hi' ? `Show all ${pkg.testsIncluded.length} included tests` : `Show all ${pkg.testsIncluded.length} included tests`}
                              </span>
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

      <section className={`px-4 py-8 md:py-10 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <Badge className={darkMode ? 'bg-teal-900/40 text-teal-200' : 'bg-teal-100 text-teal-700'}>
              {language === 'hi' ? 'Regular diagnostics support' : 'Regular diagnostics support'}
            </Badge>
            <h2 className={`mt-3 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'hi' ? 'Offer board se alag regular service support' : 'Regular service support separate from the offer board'}
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {regularSupportCards.map((card) => (
              <Card key={card.title} className="premium-card rounded-[1.8rem]">
                <CardContent className="p-5 md:p-6">
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{card.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{card.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.items.map((item) => (
                      <span key={item} className={`rounded-full px-3 py-1 text-[11px] font-medium ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={`px-4 py-8 md:py-10 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="premium-card rounded-[2rem]">
            <CardContent className="p-7">
              <Badge className={darkMode ? 'bg-teal-900/40 text-teal-200' : 'bg-teal-100 text-teal-700'}>
                {language === 'hi' ? 'Contact and visit' : 'Contact and visit'}
              </Badge>
              <h2 className={`mt-4 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'hi' ? 'Test aur package booking ke liye direct support' : 'Direct support for test and package booking'}
              </h2>

              <div className="mt-6 space-y-3">
                {[
                  { icon: MapPin, label: language === 'hi' ? diagnosticsInfo.addressHindi : diagnosticsInfo.address },
                  { icon: Phone, label: `${diagnosticsInfo.phone} | ${diagnosticsInfo.alternatePhone}` },
                  { icon: Clock, label: language === 'hi' ? diagnosticsInfo.workingHoursHindi : diagnosticsInfo.workingHours },
                  { icon: TestTube2, label: diagnosticsInfo.email }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className={`hover-accent-row rounded-2xl border px-4 py-4 ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-white'}`}>
                      <div className="flex items-start gap-3">
                        <div className={`rounded-2xl p-3 ${darkMode ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <p className={`allow-copy text-sm leading-7 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{item.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button onClick={handleCall} className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  {language === 'hi' ? 'अभी कॉल करें' : 'Call now'}
                </Button>
                <Button variant="outline" onClick={handleWhatsAppSupport} className={darkMode ? 'border-slate-700 text-slate-100 hover:bg-slate-800' : 'border-slate-200 text-slate-800 hover:bg-slate-50'}>
                  <TestTube2 className="mr-2 h-4 w-4" />
                  {language === 'hi' ? 'WhatsApp booking' : 'WhatsApp booking'}
                </Button>
                <a href={diagnosticsInfo.googleMapsLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className={darkMode ? 'border-slate-700 text-slate-100 hover:bg-slate-800' : 'border-slate-200 text-slate-800 hover:bg-slate-50'}>
                    <Navigation className="mr-2 h-4 w-4" />
                    {t.getDirections}
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card overflow-hidden rounded-[2rem]">
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
                  <p className="text-sm font-semibold">{language === 'hi' ? 'Location preview' : 'Location preview'}</p>
                  <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {language === 'hi' ? 'Tests aur packages ke liye direct visit location' : 'Direct visit location for tests and packages'}
                  </p>
                </div>
                <a href={diagnosticsInfo.googleMapsLink} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 text-sm font-semibold ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>
                  <MapPin className="h-4 w-4" />
                  Google Maps
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <WhatsAppFloat />
    </div>
  );
};

export default RelaxDiagnosticsPage;
