import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { assetPath } from '../lib/assetPath';

const FlipInfoCard = ({
  icon: Icon,
  title,
  frontText,
  backText,
  backLabel,
  tone = 'blue',
  darkMode,
  footerLabel,
  image,
  imageAlt,
  hintLabel
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const hoverMedia = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');

    const sync = () => {
      setSupportsHover(hoverMedia.matches);
    };

    sync();
    hoverMedia.addEventListener('change', sync);

    return () => {
      hoverMedia.removeEventListener('change', sync);
    };
  }, []);

  const toneStyles = {
    blue: {
      icon: darkMode ? 'bg-blue-500/20 text-blue-200' : 'bg-blue-100 text-blue-700',
      badge: darkMode ? 'bg-blue-500/20 text-blue-100' : 'bg-blue-100 text-blue-800',
      text: darkMode ? 'text-blue-100' : 'text-blue-800',
      border: darkMode ? 'border-blue-500/40' : 'border-blue-200/60'
    },
    teal: {
      icon: darkMode ? 'bg-teal-500/20 text-teal-200' : 'bg-teal-100 text-teal-700',
      badge: darkMode ? 'bg-teal-500/20 text-teal-100' : 'bg-teal-100 text-teal-800',
      text: darkMode ? 'text-teal-100' : 'text-teal-800',
      border: darkMode ? 'border-teal-500/40' : 'border-teal-200/60'
    },
    emerald: {
      icon: darkMode ? 'bg-emerald-500/20 text-emerald-200' : 'bg-emerald-100 text-emerald-700',
      badge: darkMode ? 'bg-emerald-500/20 text-emerald-100' : 'bg-emerald-100 text-emerald-800',
      text: darkMode ? 'text-emerald-100' : 'text-emerald-800',
      border: darkMode ? 'border-emerald-500/40' : 'border-emerald-200/60'
    }
  }[tone];

  const cardHint = hintLabel || (supportsHover ? 'Hover to explore' : 'Tap to reveal');
  const imageSrc = assetPath(image || 'images/hospital/hospital-main.jpg');
  const imageLabel = imageAlt || title;

  const handleCardClick = () => {
    if (!supportsHover) {
      setIsOpen((current) => !current);
    }
  };

  const handleKeyDown = (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !supportsHover) {
      event.preventDefault();
      setIsOpen((current) => !current);
    }
  };

  return (
    <div
      className={`slide-reveal-card group h-full ${toneStyles.border} ${isOpen ? 'is-open' : ''}`}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      <div className="slide-reveal-track">
        <div className="slide-reveal-front">
          <div className="slide-reveal-media">
            <img
              src={imageSrc}
              alt={imageLabel}
              loading="lazy"
              className="slide-reveal-image h-full w-full object-cover"
            />
            <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-slate-950/96 via-slate-950/50 to-slate-950/12' : 'bg-gradient-to-t from-slate-950/82 via-slate-950/30 to-transparent'}`} />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white md:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className={`inline-flex rounded-2xl p-3 shadow-lg ${toneStyles.icon}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className={`glass-pill rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.06em] ${
                darkMode
                  ? 'border-white/10 bg-slate-900/45 text-slate-100'
                  : 'border-white/35 bg-white/25 text-white'
              }`}>
                {cardHint}
              </div>
            </div>

            <div className="max-w-[14rem]">
              <h3 className="text-xl font-black leading-tight md:text-[1.7rem]">{title}</h3>
              <div className={`mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] ${
                darkMode ? 'text-slate-200' : 'text-white/90'
              }`}>
                <span>Reveal details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>

        <div className={`slide-reveal-detail ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          <div className={`flex h-full flex-col justify-between p-5 md:p-6 ${
            darkMode
              ? 'bg-slate-950'
              : 'bg-white'
          }`}>
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className={`inline-flex rounded-2xl p-3 shadow-sm ${toneStyles.icon}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneStyles.badge}`}>{backLabel}</div>
              </div>

              <h3 className={`mt-5 max-w-[15rem] text-2xl font-black leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {title}
              </h3>

              {frontText ? (
                <p className={`mt-4 text-sm font-semibold leading-6 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                  {frontText}
                </p>
              ) : null}
              <p className={`mt-3 text-sm leading-7 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                {backText}
              </p>
            </div>

            <div className={`mt-5 flex items-center gap-2 text-sm font-semibold ${toneStyles.text}`}>
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              <span>{footerLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipInfoCard;
