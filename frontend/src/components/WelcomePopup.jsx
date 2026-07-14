import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, X, ArrowRight } from 'lucide-react';
import HospitalLogo from './HospitalLogo';

const POPUP_KEY = 'rajrani-welcome-seen';

const WelcomePopup = () => {
  const [open, setOpen] = useState(false);
  const repeatRef = useRef(null);

  useEffect(() => {
    const firstVisit = sessionStorage.getItem(POPUP_KEY) !== 'true';
    const firstTimer = window.setTimeout(() => {
      if (firstVisit) {
        setOpen(true);
        sessionStorage.setItem(POPUP_KEY, 'true');
      }
    }, 1500);

    repeatRef.current = window.setInterval(() => {
      setOpen(true);
    }, 120000);

    return () => {
      window.clearTimeout(firstTimer);
      if (repeatRef.current) window.clearInterval(repeatRef.current);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm animate-fadeInBackdrop">
      <style>{`
        @keyframes fadeInPopup {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInPopup {
          animation: fadeInPopup 0.3s ease forwards;
        }
        .animate-fadeInBackdrop {
          animation: fadeInBackdrop 0.3s ease forwards;
        }
      `}</style>
      <div className="animate-fadeInPopup welcome-popup-card relative max-h-[90vh] w-full max-w-[420px] overflow-y-auto rounded-[20px] bg-white p-8 text-center shadow-2xl">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
          aria-label="Close appointment popup"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto flex justify-center">
          <HospitalLogo size="lg" />
        </div>
        <h2 className="mt-5 text-2xl font-extrabold text-slate-900">Book Your Appointment Today</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Call, WhatsApp, or fill the form - we respond within 2 hours
        </p>

        <div className="mt-6 space-y-3 text-left">
          <a href="tel:+919773626003" className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-teal-700 transition-all">
            <Phone className="h-4 w-4" />
             Call Now: +91-9773626003
          </a>
          <a href="https://wa.me/919560031001" target="_blank" rel="noreferrer" className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-green-700 transition-all">
            <MessageCircle className="h-4 w-4" />
             WhatsApp Us
          </a>
          <Link to="/contact" onClick={() => setOpen(false)} className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50 transition-all">
            Fill Enquiry Form
            <ArrowRight className="h-4 w-4" /> 
          </Link>    
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
