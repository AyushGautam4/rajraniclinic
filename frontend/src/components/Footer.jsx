import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Clock, ExternalLink } from 'lucide-react';
import { footerServices, hospitalInfo, translations } from '../mockData';
import { AppContext } from '../App';
import HospitalLogo from './HospitalLogo';

const Footer = () => {
  const { darkMode, language } = useContext(AppContext);
  const t = translations[language];
  const pageLinks = [
    { to: '/', label: t.home },
    { to: '/services', label: t.services },
    { to: '/doctors', label: t.doctors },
    { to: '/diagnostics', label: t.diagnostics },
    { to: '/about', label: t.about },
    { to: '/contact', label: t.contact }
  ];
  const aboutCopy = language === 'hi'
    ? '\u0917\u0941\u0923\u0935\u0924\u094d\u0924\u093e\u092a\u0942\u0930\u094d\u0923 \u0938\u094d\u0935\u093e\u0938\u094d\u0925\u094d\u092f \u0938\u0947\u0935\u093e\u0964 \u0906\u092a\u0915\u0940 \u0938\u0947\u0939\u0924 \u0939\u092e\u093e\u0930\u0940 \u092a\u094d\u0930\u093e\u0925\u092e\u093f\u0915\u0924\u093e\u0964'
    : 'Quality healthcare. Your health is our priority.';
  const emergencyCopy = language === 'hi' ? '\u0907\u092e\u0930\u091c\u0947\u0902\u0938\u0940 24/7' : 'Emergency 24/7';
  const rightsCopy = language === 'hi' ? '\u0938\u0930\u094d\u0935\u093e\u0927\u093f\u0915\u093e\u0930 \u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924\u0964' : 'All rights reserved.';

  return (
    <footer className="relative bg-slate-950 text-slate-300">
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600" />
      <div className="container mx-auto px-3 py-5 sm:px-4 sm:py-6 md:py-8">
        <div className="grid gap-5 border-b border-white/10 pb-5 sm:gap-6 sm:pb-6 md:grid-cols-[1.1fr_0.75fr_1.15fr_1fr] md:gap-6">
          {/* About */}
          <div>
            <div className="mb-2 sm:mb-3 flex items-center gap-2">
              <HospitalLogo size="sm" />
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">{language === 'hi' ? hospitalInfo.nameHindi : hospitalInfo.name}</h3>
            </div>
            <p className="max-w-sm text-[11px] sm:text-[12px] md:text-[13px] leading-6 text-slate-400">{aboutCopy}</p>
            <div className="mt-3 sm:mt-4 flex gap-2">
              <a href={hospitalInfo.facebook} target="_blank" rel="noopener noreferrer" className="footer-social flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/10 bg-slate-800 backdrop-blur-sm transition-colors hover:bg-blue-600" data-testid="footer-facebook">
                <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a href={hospitalInfo.instagram} target="_blank" rel="noopener noreferrer" className="footer-social flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/10 bg-slate-800 backdrop-blur-sm transition-colors hover:bg-pink-600" data-testid="footer-instagram">
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading mb-2 sm:mb-2.5 text-[12px] sm:text-[13px] md:text-sm font-semibold text-white">{t.quickLinks}</h4>
            <ul className="grid gap-1 sm:grid-cols-2 md:grid-cols-1">
              {pageLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer-link inline-flex items-center gap-2 text-[12px] sm:text-[13px] md:text-sm leading-6 text-slate-300 hover:text-blue-400">
                    <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-blue-400/80" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="footer-heading mb-2 sm:mb-2.5 text-[12px] sm:text-[13px] md:text-sm font-semibold text-white">{t.availableServices || (language === 'hi' ? 'उपलब्ध सेवाएं' : 'Available Services')}</h4>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
              {footerServices.slice(0, 14).map((service) => (
                <li key={service.name} className="footer-link inline-flex items-center gap-2 text-[11px] sm:text-[12px] md:text-[13px] leading-6 text-slate-300">
                  <span className="text-cyan-300">•</span>
                  <span>{language === 'hi' ? service.nameHindi : service.name}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="footer-heading mb-2 sm:mb-2.5 text-[12px] sm:text-[13px] md:text-sm font-semibold text-white">{t.contactUs}</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                </span>
                <a href={hospitalInfo.googleMapsLink} target="_blank" rel="noopener noreferrer" className="footer-link allow-copy text-[12px] sm:text-[13px] md:text-sm leading-6 text-slate-300 hover:text-blue-400">
                  {language === 'hi' ? hospitalInfo.addressHindi : hospitalInfo.address}
                  <ExternalLink className="w-2 h-2 sm:w-2.5 sm:h-2.5 inline ml-0.5" />
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15">
                  <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                </span>
                <span onClick={() => window.location.href = `tel:${hospitalInfo.phone}`} className="footer-link allow-copy cursor-pointer text-[12px] sm:text-[13px] md:text-sm leading-6 text-slate-300 hover:text-blue-400">{hospitalInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15">
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                </span>
                <a href={`mailto:${hospitalInfo.email}`} className="footer-link allow-copy break-all text-[12px] sm:text-[13px] md:text-sm leading-6 text-slate-300 hover:text-blue-400">{hospitalInfo.email}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                </span>
                <span className="text-[12px] sm:text-[13px] md:text-sm leading-6 text-slate-300">{language === 'hi' ? hospitalInfo.workingHoursHindi : hospitalInfo.workingHours}</span>
              </li>
            </ul>
            <div className={`mt-3 sm:mt-4 rounded-lg sm:rounded-[1.2rem] border px-3 sm:px-3.5 py-2.5 sm:py-3 transition-shadow duration-300 hover:shadow-[0_0_0_4px_rgba(220,38,38,0.12)] ${darkMode ? 'border-red-800 bg-red-900/30' : 'border-red-500/25 bg-red-600'}`}>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-white/80">{emergencyCopy}</p>
              <span onClick={() => window.location.href = `tel:${hospitalInfo.emergency}`} className="footer-link allow-copy mt-1 inline-block cursor-pointer text-[13px] sm:text-[14px] md:text-base font-bold text-white">{hospitalInfo.emergency}</span>
              <a href={`tel:${hospitalInfo.emergencyAlt}`} className="footer-link allow-copy mt-1 inline-block text-[12px] sm:text-[13px] md:text-sm font-semibold text-white/90 hover:text-white">{hospitalInfo.emergencyAlt} <span className="text-[11px] opacity-80">(General)</span></a>
            </div>
          </div>
        </div>

        <div className="pt-3 sm:pt-4 text-center">
          <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-400">
            &copy; {new Date().getFullYear()} {language === 'hi' ? hospitalInfo.nameHindi : hospitalInfo.name}. {rightsCopy}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;