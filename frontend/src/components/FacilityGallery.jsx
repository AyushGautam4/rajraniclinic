import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { assetPath } from '../lib/assetPath';

const galleryImages = [
  ['gallery-01.jpg', 'Hospital Building Exterior'],
  ['gallery-02.jpg', 'Reception Desk'],
  ['gallery-03.jpg', 'Reception Side View'],
  ['gallery-04.jpg', 'Doctor Consultation Room'],
  ['gallery-05.jpg', 'Ultrasound Diagnostic Room'],
  ['gallery-06.jpg', 'OPD Room with Staff'],
  ['gallery-07.jpg', "Doctor Cabin Angle 1"],
  ['gallery-08.jpg', "Doctor Cabin Angle 2"],
  ['gallery-09.jpg', 'Physiotherapy Room'],
  ['gallery-10.jpg', 'Echo TMT Room'],
  ['gallery-11.jpg', 'Physiotherapy Beds Room'],
  ['gallery-12.jpg', 'Labour Room'],
  ['gallery-13.jpg', 'OT Complex Signage'],
  ['gallery-14.jpg', 'Operation Theatre Inside'],
  ['gallery-15.jpg', 'Hospital Corridor'],
  ['gallery-16.jpg', 'Operation Theatre Entrance'],
  ['gallery-17.jpg', 'Patient Ward Room'],
].map(([file, label]) => ({ src: `images/gallery/${file}`, label }));

const FacilityGallery = ({ darkMode }) => {
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(el);
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (active == null) return undefined;
    const handle = (event) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') setActive((current) => (current + 1) % galleryImages.length);
      if (event.key === 'ArrowLeft') setActive((current) => (current - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener('keydown', handle);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handle);
      document.body.style.overflow = '';
    };
  }, [active]);

  const go = (direction) => {
    setActive((current) => (current + direction + galleryImages.length) % galleryImages.length);
  };

  return (
    <section ref={sectionRef} className={`px-4 py-10 md:py-14 ${darkMode ? 'bg-slate-950' : 'bg-white'} scroll-reveal ${visible ? 'is-visible' : ''}`}>
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <h2 className={`text-3xl font-black md:text-4xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>Our Facility</h2>
          <p className={`mt-3 text-sm md:text-base ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>A look inside Raj Rani Hospital</p>
        </div>

        <div className="facility-gallery">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(index)}
              className="facility-gallery-item group relative w-full overflow-hidden rounded-xl bg-slate-100 text-left shadow-sm"
            >
              <img src={assetPath(image.src)} alt={image.label} className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" loading="lazy" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                <ZoomIn className="h-8 w-8 text-white" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-xs font-semibold text-white">{image.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active != null && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/90 p-4">
          <button type="button" onClick={() => setActive(null)} className="absolute right-5 top-5 text-white" aria-label="Close gallery">
            <X className="h-8 w-8" />
          </button>
          <button type="button" onClick={() => go(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20" aria-label="Previous image">
            <ChevronLeft className="h-8 w-8" />
          </button>
          <img src={assetPath(galleryImages[active].src)} alt={galleryImages[active].label} className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain" />
          <button type="button" onClick={() => go(1)} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20" aria-label="Next image">
            <ChevronRight className="h-8 w-8" />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
            {galleryImages[active].label}
          </p>
        </div>
      )}
    </section>
  );
};

export default FacilityGallery;
