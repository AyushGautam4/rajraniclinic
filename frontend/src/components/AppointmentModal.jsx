import React, { useContext } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { Button } from './ui/button';
import { hospitalInfo, translations } from '../mockData';
import { AppContext } from '../App';
import HospitalLogo from './HospitalLogo';

const AppointmentModal = ({ isOpen, onClose }) => {
  const { darkMode, language } = useContext(AppContext);
  const t = translations[language];
  const appointmentLabel = language === 'hi' ? 'Appointment Book Karein' : 'Book Appointment';
  const chooseMethodLabel = language === 'hi' ? 'Method choose karein' : 'Choose a method';
  const whatsappText = language === 'hi'
    ? 'Namaste! Mujhe Raj Rani Hospital me appointment book karni hai.'
    : 'Hello! I would like to book an appointment at Raj Rani Hospital.';

  if (!isOpen) return null;

  const handleCall = () => window.location.href = `tel:${hospitalInfo.phone}`;
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${hospitalInfo.whatsapp}?text=${encodeURIComponent(whatsappText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className={`relative w-full max-w-sm rounded-2xl shadow-2xl animate-in zoom-in-95 ${
          darkMode ? 'border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-white'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute right-2 top-2 rounded-full p-1 transition-colors sm:right-3 sm:top-3 sm:p-1.5 ${
            darkMode ? 'text-gray-400 hover:bg-slate-700' : 'text-gray-500 hover:bg-gray-100'
          }`}
          data-testid="close-modal-btn"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <div className="p-4 sm:p-5 md:p-6">
          <div className="mb-4 text-center sm:mb-5 md:mb-6">
            <div className="mb-2 flex justify-center sm:mb-3">
              <HospitalLogo size="xl" />
            </div>
            <h2 className={`text-lg font-bold sm:text-xl md:text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>{appointmentLabel}</h2>
            <p className={`mt-1 text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{chooseMethodLabel}</p>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <Button
              onClick={handleCall}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-4 text-xs text-white shadow-lg sm:py-5 sm:text-sm md:py-6 md:text-base"
              data-testid="call-appointment-btn"
            >
              <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {t.callNow}
              <span className="ml-2 text-[10px] opacity-80 sm:text-xs">{hospitalInfo.phone}</span>
            </Button>
            <Button
              onClick={handleWhatsApp}
              className="w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 py-4 text-xs text-white shadow-lg sm:py-5 sm:text-sm md:py-6 md:text-base"
              data-testid="whatsapp-appointment-btn"
            >
              <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {t.whatsapp}
              <span className="ml-2 text-[10px] opacity-80 sm:text-xs">Message</span>
            </Button>
          </div>

          <div className={`mt-3 rounded-xl border p-2 text-center sm:mt-4 sm:p-2.5 md:p-3 ${
            darkMode ? 'border-red-800 bg-red-900/30' : 'border-red-200 bg-red-50'
          }`}>
            <p className={`text-[10px] font-semibold sm:text-xs ${darkMode ? 'text-red-300' : 'text-red-700'}`}>Emergency: 24/7</p>
            <a href={`tel:${hospitalInfo.emergency}`} className={`mt-1 block text-[10px] sm:text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
              {hospitalInfo.emergency}
            </a>
            <a href={`tel:${hospitalInfo.emergencyAlt}`} className={`mt-1 block text-[10px] sm:text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
              {hospitalInfo.emergencyAlt} <span className="font-semibold">(General Call)</span>
            </a>
          </div>

          <div className={`mt-2 text-center text-[10px] sm:mt-3 sm:text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            <p>Raj Rani Hospital</p>
            <p>Old Kondli, New Delhi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
