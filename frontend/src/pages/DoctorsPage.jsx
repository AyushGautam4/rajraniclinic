import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  GraduationCap,
  PhoneCall,
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

const DoctorsPage = () => {
  const { darkMode, language } = useContext(AppContext);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const t = translations[language];
  const appointmentLabel = 'Book Appointment';
  const callForAvailabilityLabel = 'Call For Availability';
  const onCallNote = 'On-call doctor comes after phone confirmation.';

  const getDoctorFee = (doctor) => doctor.feeLabel || (doctor.consultationFee != null ? `Rs.${doctor.consultationFee}` : 'Fee on call');
  const getVisitStatus = (doctor) => {
    if (doctor.onCall) {
      return 'On Call';
    }

    return doctor.availability?.toLowerCase().includes('daily') ? 'Daily OPD' : 'Scheduled Visit';
  };

  const quickFacts = [
    {
      icon: BadgeCheck,
      title: 'Govt. Recognised',
      description: 'Trusted multi-speciality hospital setup.'
    },
    {
      icon: GraduationCap,
      title: 'Qualified Doctors',
      description: 'Experienced consultants across departments.'
    },
    {
      icon: Wallet,
      title: 'Transparent Fee',
      description: 'Consultation fee visible before visit.'
    }
  ];

  const trustPoints = [
    { icon: BadgeCheck, title: 'Govt. Recognised', desc: 'Reliable local care setup' },
    { icon: GraduationCap, title: 'Qualified Doctors', desc: 'Experienced department panel' },
    { icon: CalendarClock, title: 'Clear OPD Timings', desc: 'Easy visit planning' },
    { icon: CheckCircle2, title: 'On-Call Support', desc: 'Call-first specialists marked' }
  ];

  const handleDoctorAction = () => {
    setShowAppointmentModal(true);
  };

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
              {language === 'hi' ? 'Consultant doctors you can review clearly' : 'Consultant doctors you can review clearly'}
            </h1>
            <p className={`mx-auto max-w-2xl text-sm leading-7 md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'hi'
                ? 'Doctor profile, degree, timing, fee, language aur visit support ko ab cleaner professional layout me rakha gaya hai taaki page ghich-pich na lage.'
                : 'Doctor profiles, degree, timings, fee, languages, and visit support now sit in a cleaner professional layout so the page feels easier to scan.'}
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
          <div className="grid gap-3.5 lg:grid-cols-3 xl:gap-4">
            {doctors.map((doctor) => (
              <Card
                key={doctor.id}
                className={`relative h-full overflow-hidden rounded-[1.7rem] border ${
                  darkMode
                    ? 'border-slate-800 bg-slate-900/92 shadow-[0_14px_26px_rgba(15,23,42,0.26)]'
                    : 'border-slate-200/90 bg-white shadow-[0_12px_24px_rgba(15,23,42,0.06)]'
                }`}
              >
                <div className={`absolute inset-x-0 top-0 h-20 ${darkMode ? 'bg-gradient-to-r from-blue-950/85 via-slate-900 to-teal-950/80' : 'bg-gradient-to-r from-blue-50 via-white to-teal-50'}`} />

                <CardContent className="relative flex h-full flex-col p-4 sm:p-[1.1rem]">
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <div className="h-[4.2rem] w-[4.2rem] overflow-hidden rounded-full bg-white ring-4 ring-white shadow-[0_10px_22px_rgba(15,23,42,0.12)] sm:h-[4.45rem] sm:w-[4.45rem]">
                        <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
                      </div>
                      <Badge className={`absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-1 text-[10px] shadow-sm ${doctor.onCall ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>
                        {doctor.onCall ? 'On Call' : doctor.availability}
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
                          <p className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>Fee</p>
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
                          {doctor.onCall ? 'Call first before visit' : doctor.availability}
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
                      {doctor.onCall ? 'Call first before doctor visit' : 'Walk in during the listed doctor timings'}
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
                    {language === 'hi' ? 'Need more help?' : 'Need more help?'}
                  </h3>
                  <p className={`mt-1 text-sm leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {language === 'hi'
                      ? `Aap hume ${hospitalInfo.phone} par call karke sahi doctor ke bare me pooch sakte hain.`
                      : `You can call us at ${hospitalInfo.phone} and we will guide you to the right doctor.`}
                  </p>
                </div>
              </div>

              <Link to="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700">
                  {language === 'hi' ? 'Contact Page' : 'Move to Contact'}
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
