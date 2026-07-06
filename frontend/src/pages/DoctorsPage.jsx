import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  GraduationCap,
  PhoneCall,
  Search,
  Sparkles,
  Wallet
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { consultantDoctors as doctors, hospitalInfo, translations } from '../mockData';
import { AppContext } from '../App';
import AppointmentModal from '../components/AppointmentModal';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { assetPath } from '../lib/assetPath';

const DoctorsPage = () => {
  const { darkMode, language } = useContext(AppContext);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const t = translations[language];
  const appointmentLabel = language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment';
  const callForAvailabilityLabel = language === 'hi' ? 'उपलब्धता के लिए कॉल करें' : 'Call For Availability';
  const onCallNote = language === 'hi'
    ? 'ऑन-कॉल डॉक्टर के लिए आने से पहले फोन पर पुष्टि जरूरी है।'
    : 'For on-call doctors, please confirm by phone before visiting.';

  const getDoctorFee = (doctor) => doctor.feeLabel || (doctor.consultationFee != null ? `Rs.${doctor.consultationFee}` : 'Fee on call');
  const getVisitStatus = (doctor) => {
    if (doctor.onCall) {
      return language === 'hi' ? 'ऑन कॉल' : 'On Call';
    }

    return doctor.availability?.toLowerCase().includes('daily')
      ? language === 'hi' ? 'रोजाना ओपीडी' : 'Daily OPD'
      : language === 'hi' ? 'तय समय पर विजिट' : 'Scheduled Visit';
  };

  const quickFacts = [
    {
      icon: BadgeCheck,
      title: language === 'hi' ? 'सरकारी मान्यता' : 'Govt. Recognised',
      description: language === 'hi' ? 'भरोसेमंद मल्टी-स्पेशियलिटी अस्पताल व्यवस्था।' : 'Trusted multi-speciality hospital setup.'
    },
    {
      icon: GraduationCap,
      title: language === 'hi' ? 'योग्य डॉक्टर' : 'Qualified Doctors',
      description: language === 'hi' ? 'विभिन्न विभागों में अनुभवी कंसल्टेंट।' : 'Experienced consultants across departments.'
    },
    {
      icon: Wallet,
      title: language === 'hi' ? 'स्पष्ट फीस' : 'Transparent Fee',
      description: language === 'hi' ? 'विजिट से पहले परामर्श शुल्क साफ दिखाई देता है।' : 'Consultation fee visible before visit.'
    }
  ];

  const trustPoints = [
    { icon: BadgeCheck, title: language === 'hi' ? 'सरकारी मान्यता' : 'Govt. Recognised', desc: language === 'hi' ? 'भरोसेमंद स्थानीय देखभाल' : 'Reliable local care setup' },
    { icon: GraduationCap, title: language === 'hi' ? 'योग्य डॉक्टर' : 'Qualified Doctors', desc: language === 'hi' ? 'अनुभवी विभागीय पैनल' : 'Experienced department panel' },
    { icon: CalendarClock, title: language === 'hi' ? 'साफ ओपीडी टाइमिंग' : 'Clear OPD Timings', desc: language === 'hi' ? 'विजिट प्लान करना आसान' : 'Easy visit planning' },
    { icon: CheckCircle2, title: language === 'hi' ? 'ऑन-कॉल सपोर्ट' : 'On-Call Support', desc: language === 'hi' ? 'कॉल-फर्स्ट डॉक्टर स्पष्ट' : 'Call-first specialists marked' }
  ];

  const handleDoctorAction = () => {
    setShowAppointmentModal(true);
  };

  const filters = ['All', ...Array.from(new Set(doctors.map((doctor) => doctor.specialization)))];
  const getFilterLabel = (filter) => {
    if (filter === 'All') return language === 'hi' ? 'सभी' : 'All';
    const doctor = doctors.find((item) => item.specialization === filter);
    return language === 'hi' ? doctor?.specializationHindi || filter : filter;
  };
  const filteredDoctors = doctors.filter((doctor) => {
    const text = `${doctor.name} ${doctor.specialization} ${doctor.education} ${doctor.specialties?.join(' ')}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (activeFilter === 'All' || doctor.specialization === activeFilter);
  });

  return (
    <div className={`page-shell min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
      <section
        className={`relative overflow-hidden px-3 pb-6 pt-5 sm:px-4 sm:pb-8 sm:pt-6 md:px-5 md:pb-10 md:pt-7 ${
          darkMode ? 'bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950' : 'bg-gradient-to-br from-blue-50 via-white to-teal-50'
        }`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute right-8 top-14 h-56 w-56 rounded-full blur-3xl animate-blob ${darkMode ? 'bg-blue-500' : 'bg-blue-300'}`} />
        </div>

        <div className="container relative z-10 mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className={`mb-2 ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>{t.ourDoctors}</Badge>
            <h1 className={`mb-3 text-2xl font-bold sm:text-3xl md:text-4xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {language === 'hi' ? 'अपनी जरूरत के अनुसार सही डॉक्टर चुनें' : 'Choose the right doctor for your concern'}
            </h1>
            <p className={`mx-auto max-w-2xl text-sm leading-7 md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'hi'
                ? 'स्पेशियलिटी, डिग्री, टाइमिंग और फीस देखकर अपनी समस्या के लिए कॉल या अपॉइंटमेंट बुक करें।'
                : 'Review each doctor’s specialty, degree, timing, and fee, then call or book an appointment for your specific health concern.'}
            </p>
          </div>

          <div className="mx-auto mt-5 grid max-w-4xl gap-3 sm:grid-cols-3">
            {quickFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.title}
                  className={`rounded-[1.4rem] border p-4 text-left shadow-sm ${
                    darkMode ? 'border-slate-800 bg-slate-900/75 text-white' : 'border-white/70 bg-white/90 text-slate-900'
                  }`}
                >
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-2xl ${darkMode ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h2 className="text-sm font-bold">{fact.title}</h2>
                  <p className={`mt-1 text-xs leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{fact.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`px-3 py-5 sm:px-4 md:px-5 md:py-6 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <div className={`sticky top-0 z-10 mb-5 rounded-2xl border p-3 backdrop-blur md:static ${darkMode ? 'border-slate-800 bg-slate-950/92' : 'border-slate-200 bg-white/92'}`}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={language === 'hi' ? 'डॉक्टर, विभाग या टाइमिंग खोजें...' : 'Search doctor, department, timing...'}
                className={`min-h-[44px] w-full rounded-xl border pl-10 pr-4 text-sm outline-none ${darkMode ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'}`}
              />
            </div>
            <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto whitespace-nowrap pb-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`min-h-[40px] rounded-full px-4 text-sm font-semibold transition-colors ${activeFilter === filter ? 'bg-teal-600 text-white' : darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-700'}`}
                >
                  {getFilterLabel(filter)}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-4">
            {filteredDoctors.map((doctor, index) => (
              <Card
                key={doctor.id}
                className={`relative h-full overflow-hidden rounded-[1.7rem] border opacity-0 translate-y-7 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:border-teal-500 ${
                  darkMode
                    ? 'border-slate-800 bg-slate-900/92 shadow-[0_14px_26px_rgba(15,23,42,0.26)] hover:border-slate-700'
                    : 'border-slate-200/90 bg-white shadow-[0_12px_24px_rgba(15,23,42,0.06)]'
                }`}
                style={{
                  animation: `fadeUpStagger 0.5s ease forwards`,
                  animationDelay: `${index * 100}ms`
                }}
              >
                <style>{`
                  @keyframes fadeUpStagger {
                    from {
                      opacity: 0;
                      transform: translateY(30px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
                
                <div className={`absolute inset-x-0 top-0 h-20 ${darkMode ? 'bg-gradient-to-r from-blue-950/85 via-slate-900 to-teal-950/80' : 'bg-gradient-to-r from-blue-50 via-white to-teal-50'}`} />

                <CardContent className="relative flex h-full flex-col p-4 sm:p-[1.1rem]">
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <div className="h-[4.2rem] w-[4.2rem] overflow-hidden rounded-full bg-white ring-4 ring-white shadow-[0_10px_22px_rgba(15,23,42,0.12)] sm:h-[4.45rem] sm:w-[4.45rem]">
                        <img
                          src={assetPath(doctor.image)}
                          alt={language === 'hi' ? doctor.nameHindi : doctor.name}
                          className="h-full w-full object-cover object-top"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = assetPath('images/doctors/doctor-01.jpg');
                          }}
                        />
                      </div>
                      <Badge className={`absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-1 text-[10px] shadow-sm ${doctor.onCall ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>
                        {doctor.onCall ? (language === 'hi' ? 'ऑन कॉल' : 'On Call') : doctor.availability}
                      </Badge>
                    </div>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className={`text-[1.02rem] font-bold leading-tight sm:text-[1.12rem] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            {language === 'hi' ? doctor.nameHindi : doctor.name}
                          </h2>
                          <p className="mt-1 text-sm font-medium leading-5 text-blue-500">
                            {language === 'hi' ? doctor.specializationHindi : doctor.specialization}
                          </p>
                          <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{getVisitStatus(doctor)}</p>
                        </div>

                        <div className={`shrink-0 rounded-[1rem] px-3 py-2 text-right ${darkMode ? 'bg-blue-950/70 ring-1 ring-blue-900/50' : 'bg-white/95 ring-1 ring-blue-100'}`}>
                          <p className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>{language === 'hi' ? 'फीस' : 'Fee'}</p>
                          <p className="mt-1 text-sm font-bold text-blue-500">{getDoctorFee(doctor)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-4 rounded-[1.15rem] px-3.5 py-3 ${darkMode ? 'bg-slate-950/60 ring-1 ring-slate-800' : 'bg-slate-50 ring-1 ring-slate-200/80'}`}>
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                        <p className={`text-sm leading-6 ${darkMode ? 'text-slate-100' : 'text-slate-700'}`}>{doctor.education}</p>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                        <div className="space-y-1">
                          {doctor.timings.map((timing) => (
                            <p key={timing} className={`text-sm leading-6 ${darkMode ? 'text-slate-100' : 'text-slate-700'}`}>{timing}</p>
                          ))}
                        </div>
                      </div>

                      {doctor.onCall ? (
                        <p className={`pl-6 text-xs leading-5 ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                          {onCallNote}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {doctor.specialties.slice(0, 1).map((spec) => (
                      <Badge
                        key={spec}
                        variant="secondary"
                        className={`rounded-full px-3 py-1 text-[11px] ${
                          darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  <div className={`mt-3 flex items-center justify-between rounded-[1rem] px-3.5 py-3 ${darkMode ? 'bg-slate-950/55 ring-1 ring-slate-800' : 'bg-slate-50 ring-1 ring-slate-200/80'}`}>
                    <div className="flex items-center gap-2">
                      <PhoneCall className="h-4 w-4 shrink-0 text-teal-500" />
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-slate-100' : 'text-slate-700'}`}>
                          {doctor.onCall ? (language === 'hi' ? 'विजिट से पहले कॉल करें' : 'Call first before visit') : doctor.availability}
                        </p>
                        <p className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{doctor.languages.join(', ')}</p>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-blue-500">
                      {getDoctorFee(doctor)}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pt-3">
                    <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {doctor.onCall
                        ? language === 'hi' ? 'डॉक्टर विजिट से पहले फोन पर पुष्टि करें' : 'Call first before doctor visit'
                        : language === 'hi' ? 'दिए गए समय में अस्पताल आ सकते हैं' : 'Walk in during the listed doctor timings'}
                    </div>

                    <Button
                      onClick={handleDoctorAction}
                      className="w-full rounded-[1rem] bg-gradient-to-r from-blue-600 to-teal-600 px-5 py-2.5 text-[13px] text-white hover:from-blue-700 hover:to-teal-700"
                    >
                      {doctor.onCall ? callForAvailabilityLabel : appointmentLabel}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={`px-3 py-4 sm:px-4 md:px-5 md:py-6 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
            {trustPoints.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`rounded-[1.35rem] p-4 text-center ${darkMode ? 'bg-slate-800/60 text-white' : 'bg-gray-50 text-slate-900'}`}>
                  <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ${
                    darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-xs font-semibold sm:text-sm">{item.title}</h3>
                  <p className={`mt-1 text-[11px] leading-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`px-3 pb-6 sm:px-4 md:px-5 md:pb-10 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className={`premium-card rounded-[1.7rem] px-4 py-4 sm:px-5 sm:py-5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div className={`rounded-2xl p-3 ${darkMode ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold md:text-lg">
                    {language === 'hi' ? 'सही डॉक्टर चुनने में मदद चाहिए?' : 'Need help choosing a doctor?'}
                  </h3>
                  <p className={`mt-1 text-sm leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {language === 'hi'
                      ? `आप ${hospitalInfo.phone} पर कॉल करके अपनी समस्या के लिए सही डॉक्टर और टाइमिंग पूछ सकते हैं।`
                      : `Call ${hospitalInfo.phone} and our team will guide you to the right doctor and visit timing.`}
                  </p>
                </div>
              </div>

              <Link to="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700">
                  {language === 'hi' ? 'संपर्क पेज' : 'Move to Contact'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
      <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
    </div>
  );
};

export default DoctorsPage;
