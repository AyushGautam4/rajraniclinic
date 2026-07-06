import React, { useContext } from 'react';
import { hospitalInfo } from '../mockData';
import { AppContext } from '../App';

const WhatsAppFloat = () => {
  const { language } = useContext(AppContext);

  const handleWhatsApp = () => {
    const msg = language === 'hi'
      ? "नमस्ते! मुझे राजरानी हॉस्पिटल के बारे में जानकारी चाहिए।"
      : "Hello! I need information about Rajrani Hospital.";
    window.open(`https://wa.me/${hospitalInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="whatsapp-float-wrap fixed bottom-5 right-5 z-[120] sm:bottom-6 sm:right-6">
      <button
        onClick={handleWhatsApp}
        className="whatsapp-float flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-[1.04] hover:bg-[#20BD5A] md:h-14 md:w-14"
        data-testid="whatsapp-float-btn"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 32 32" className="h-[1.375rem] w-[1.375rem] md:h-7 md:w-7" fill="white">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.052 9.376L1.056 31.08l5.884-1.942A15.92 15.92 0 0016.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.606c-.39 1.1-2.282 2.108-3.168 2.17-.8.058-1.548.38-5.214-1.086-4.42-1.766-7.226-6.292-7.444-6.586-.218-.292-1.786-2.376-1.786-4.532 0-2.154 1.13-3.212 1.532-3.654.39-.43 .862-.54 1.148-.54.286 0 .572.004.822.014.264.012.618-.1.968.738.36.862 1.226 2.984 1.334 3.202.11.218.182.474.036.766-.146.292-.218.474-.436.728-.218.256-.458.572-.654.768-.218.218-.446.454-.192.89.256.436 1.134 1.87 2.436 3.03 1.672 1.486 3.082 1.948 3.518 2.166.436.218.69.182.944-.11.256-.292 1.094-1.276 1.386-1.716.292-.436.582-.364.982-.218.398.146 2.532 1.194 2.966 1.412.436.218.726.328.834.508.11.182.11 1.04-.278 2.14z"/>
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppFloat;
