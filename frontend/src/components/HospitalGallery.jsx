import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { assetPath } from '../lib/assetPath';

const HospitalGallery = ({ darkMode, language }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const galleryRef = useRef(null);

  const galleryImages = [
    { id: '01', alt: language === 'hi' ? 'हॉस्पिटल बिल्डिंग एक्सटीरियर' : 'Hospital Building Exterior' },
    { id: '02', alt: language === 'hi' ? 'रिसेप्शन डेस्क' : 'Reception Desk' },
    { id: '03', alt: language === 'hi' ? 'रिसेप्शन (साइड व्यू)' : 'Reception (Side View)' },
    { id: '04', alt: language === 'hi' ? 'डॉक्टर परामर्श' : 'Doctor Consultation' },
    { id: '05', alt: language === 'hi' ? 'डायग्नोस्टिक रूम' : 'Diagnostic Room' },
    { id: '06', alt: language === 'hi' ? 'ओपीडी रूम' : 'OPD Room' },
    { id: '07', alt: language === 'hi' ? 'डॉक्टर कैबिन' : "Doctor's Cabin" },
    { id: '08', alt: language === 'hi' ? 'डॉक्टर कैबिन' : "Doctor's Cabin" },
    { id: '09', alt: language === 'hi' ? 'फिजियोथेरेपी रूम' : 'Physiotherapy Room' },
    { id: '10', alt: language === 'hi' ? 'इको टीएमटी रूम' : 'Echo TMT Room' },
    { id: '11', alt: language === 'hi' ? 'फिजियोथेरेपी बेड्स' : 'Physiotherapy Beds' },
    { id: '12', alt: language === 'hi' ? 'लेबर रूम' : 'Labour Room' },
    { id: '13', alt: language === 'hi' ? 'ओटी कॉम्प्लेक्स' : 'OT Complex' },
    { id: '14', alt: language === 'hi' ? 'ऑपरेशन थिएटर' : 'Operation Theatre' },
    { id: '15', alt: language === 'hi' ? 'पेशेंट कॉरिडोर' : 'Patient Corridor' },
    { id: '16', alt: language === 'hi' ? 'ऑपरेशन थिएटर एंट्रेंस' : 'Operation Theatre Entrance' },
    { id: '17', alt: language === 'hi' ? 'पेशेंट वार्ड रूम' : 'Patient Ward Room' }
  ];

  useEffect(() => {
    // Scroll animation on mount
    if (galleryRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-700');
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(galleryRef.current);
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section ref={galleryRef} className={`opacity-0 translate-y-8 px-3 py-8 sm:px-4 sm:py-10 md:px-5 md:py-14 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="mb-5 flex flex-col gap-2 md:mb-8">
            <h2 className={`text-xl font-bold sm:text-2xl md:text-3xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'hi' ? 'राजरानी हॉस्पिटल के अंदर' : 'Inside Rajrani Hospital'}
            </h2>
            <p className={`max-w-2xl text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'hi' ? 'रिसेप्शन, डॉक्टर रूम, डायग्नोस्टिक्स, वार्ड और ऑपरेशन थिएटर की वास्तविक तस्वीरें।' : 'Real views of reception, consultation rooms, diagnostics, wards, and operation theatre areas.'}
            </p>
          </div>

          {/* Masonry Gallery */}
          <div 
            className="gallery-masonry"
            style={{
              columnCount: 'auto',
              columnWidth: 'auto',
              gap: '12px'
            }}
          >
            <style>{`
              @media (max-width: 640px) {
                .gallery-masonry {
                  columns: 2;
                }
              }
              @media (min-width: 641px) and (max-width: 1024px) {
                .gallery-masonry {
                  columns: 3;
                }
              }
              @media (min-width: 1025px) {
                .gallery-masonry {
                  columns: 4;
                }
              }
              .gallery-item {
                break-inside: avoid;
                margin-bottom: 12px;
              }
            `}</style>
            {galleryImages.map((image, index) => (
              <div 
                key={image.id}
                className="gallery-item group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className={`relative aspect-[4/3] overflow-hidden rounded-lg border ${
                  darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                }`}>
                  <img
                    src={assetPath(`images/gallery/gallery-${image.id}.jpg`)}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <ZoomIn className="text-white h-8 w-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Main Image */}
          <div className="flex items-center justify-center px-4 py-8">
            <img
              src={assetPath(`images/gallery/gallery-${galleryImages[selectedImageIndex].id}.jpg`)}
              alt={galleryImages[selectedImageIndex].alt}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {selectedImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
};

export default HospitalGallery;
