import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { assetPath } from '../lib/assetPath';

const galleryImages = [
  { id: '01', title: 'Hospital Exterior', titleHi: 'अस्पताल बाहरी दृश्य' },
  { id: '02', title: 'Reception Desk', titleHi: 'रिसेप्शन डेस्क' },
  { id: '04', title: 'Consultation Room', titleHi: 'कंसल्टेशन रूम' },
  { id: '05', title: 'Ultrasound Room', titleHi: 'अल्ट्रासाउंड रूम' },
  { id: '06', title: 'OPD Room', titleHi: 'ओपीडी रूम' },
  { id: '07', title: 'Doctor Cabin', titleHi: 'डॉक्टर केबिन' },
  { id: '09', title: 'Physiotherapy Room', titleHi: 'फिजियोथेरेपी रूम' },
  { id: '10', title: 'Echo / TMT Room', titleHi: 'ईको / टीएमटी रूम' },
  { id: '12', title: 'Labour Room', titleHi: 'लेबर रूम' },
  { id: '14', title: 'Operation Theatre', titleHi: 'ऑपरेशन थिएटर' },
  { id: '17', title: 'Patient Ward', titleHi: 'पेशेंट वार्ड' }
];

const HospitalGallery = ({ darkMode, language }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!galleryRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') handlePrevImage();
      if (event.key === 'ArrowRight') handleNextImage();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, selectedImageIndex]);

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const selectedImage = galleryImages[selectedImageIndex];

  return (
    <>
      <section
        ref={galleryRef}
        className={`translate-y-8 px-3 py-8 opacity-0 transition-all duration-700 sm:px-4 md:px-5 md:py-12 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto mb-6 max-w-2xl text-center md:mb-8">
            <span className={`mb-2 inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${darkMode ? 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200' : 'border-cyan-200 bg-cyan-50 text-cyan-700'}`}>
              {language === 'hi' ? 'असली हॉस्पिटल फोटो' : 'Real Hospital Photos'}
            </span>
            <h2 className={`text-2xl font-black tracking-tight sm:text-3xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>
              {language === 'hi' ? 'राजरानी हॉस्पिटल के अंदर' : 'Inside Rajrani Hospital'}
            </h2>
            <p className={`mt-2 text-sm leading-6 sm:text-base ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'hi'
                ? 'हर तस्वीर सीधे हमारे हॉस्पिटल से — असली रिसेप्शन, डॉक्टर रूम, डायग्नोस्टिक्स, वार्ड और ऑपरेशन थिएटर, बिना किसी फिल्टर के जैसा सब कुछ रोज़ दिखता है।'
                : 'Every photo here is straight from our own building — real reception, doctor cabins, diagnostics, wards and the OT, exactly as patients see them every day.'}
            </p>
          </div>

          <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => openLightbox(index)}
                className="group w-full max-w-[10.5rem] text-center"
                aria-label={`Open ${image.title}`}
              >
                <span className={`relative mx-auto block aspect-square overflow-hidden rounded-full border-4 shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-white bg-white'}`}>
                  <img
                    src={assetPath(`images/gallery/gallery-${image.id}.jpg`)}
                    alt={language === 'hi' ? image.titleHi : image.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-950/0 transition-colors duration-300 group-hover:bg-slate-950/35">
                    <ZoomIn className="h-6 w-6 scale-90 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                  </span>
                </span>
                <span className={`mt-3 block truncate text-xs font-bold sm:text-[13px] ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                  {language === 'hi' ? image.titleHi : image.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxOpen && selectedImage && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 px-4 py-8">
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={handlePrevImage}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <img
            src={assetPath(`images/gallery/gallery-${selectedImage.id}.jpg`)}
            alt={language === 'hi' ? selectedImage.titleHi : selectedImage.title}
            className="max-h-[84vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
          />

          <button
            type="button"
            onClick={handleNextImage}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white">
            {selectedImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
};

export default HospitalGallery;