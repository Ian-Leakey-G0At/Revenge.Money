'use client';

import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AntechamberModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutUrl?: string;
}

const GUY_FAWKES_IMAGES = Array.from({ length: 9 }, (_, i) => `/antechamber_images/guy-fawkes-${i + 1}.jpeg`);

export function AntechamberModal({ isOpen, onClose, checkoutUrl }: AntechamberModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % GUY_FAWKES_IMAGES.length);
    }, 3000); // Rotate every 3 seconds for smoother flow
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProceed = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
    onClose();
  };

  // The fingerprint path provided by the user
  const fingerprintPath = "M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41c-.24.13-.54.04-.68-.2a.506.506 0 0 1 .2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52c.25.13.34.43.21.67a.49.49 0 0 1-.44.28M3.5 9.72a.499.499 0 0 1-.41-.79c.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25a.5.5 0 0 1-.12.7c-.23.16-.54.11-.7-.12a9.4 9.4 0 0 0-3.39-2.94c-2.87-1.47-6.54-1.47-9.4.01c-1.36.7-2.5 1.7-3.4 2.96c-.08.14-.23.21-.39.21m6.25 12.07a.47.47 0 0 1-.35-.15c-.87-.87-1.34-1.43-2.01-2.64c-.69-1.23-1.05-2.73-1.05-4.34c0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39s-4.66 1.97-4.66 4.39c0 1.44.32 2.77.93 3.85c.64 1.15 1.08 1.64 1.85 2.42c.19.2.19.51 0 .71c-.11.1-.24.15-.37.15m7.17-1.85c-1.19 0-2.24-.3-3.1-.89c-1.49-1.01-2.38-2.65-2.38-4.39c0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56c.71.48 1.54.71 2.54.71c.24 0 .64-.03 1.04-.1c.27-.05.53.13.58.41c.05.27-.13.53-.41.58c-.57.11-1.07.12-1.21.12M14.91 22c-.04 0-.09-.01-.13-.02c-1.59-.44-2.63-1.03-3.72-2.1a7.3 7.3 0 0 1-2.17-5.22c0-1.62 1.38-2.94 3.08-2.94s3.08 1.32 3.08 2.94c0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83c-2.84 0-5.44 1.58-6.61 4.03c-.39.81-.59 1.76-.59 2.8c0 .78.07 2.01.67 3.61c.1.26-.03.55-.29.64c-.26.1-.55-.04-.64-.29a11.1 11.1 0 0 1-.73-3.96c0-1.2.23-2.29.68-3.24c1.33-2.79 4.28-4.6 7.51-4.6c4.55 0 8.25 3.51 8.25 7.83c0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51c.95.94 1.86 1.46 3.27 1.85c.27.07.42.35.35.61c-.05.23-.26.38-.47.38";

  // SVG Data URI for the mask
  const maskImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='${fingerprintPath}'/%3E%3C/svg%3E")`;

  return (
    <div className={cn(
      "fixed inset-0 z-[60] bg-void/95 backdrop-blur-xl flex flex-col items-center justify-center transition-opacity duration-500",
      isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}>

      {/* Upper Section: Fingerprint Mask (Reduced height) */}
      <div className="w-full h-[40%] flex items-end justify-center relative overflow-hidden pb-4">
        <div
          className="w-full h-full max-w-[320px] max-h-[320px] relative transition-all duration-1000"
          style={{
            maskImage: maskImage,
            WebkitMaskImage: maskImage,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center bottom',
            WebkitMaskPosition: 'center bottom',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
          }}
        >
          {GUY_FAWKES_IMAGES.map((src, index) => (
            <img
              key={src}
              src={src}
              alt="Security Pattern"
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] will-change-[opacity]",
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
          {/* Overlay gradient to blend with theme */}
          <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay pointer-events-none"></div>
        </div>
      </div>

      {/* Lower Section: Content (Expanded height) */}
      <div className="w-full h-[60%] flex flex-col items-center justify-start px-6 pt-2 max-w-[380px] text-center">

        {/* Header Icon */}
        <div className="w-10 h-10 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center mb-3 animate-pulse-slow">
          <Lock className="w-4 h-4 text-emerald-400" />
        </div>

        <h2 className="text-lg font-extrabold uppercase tracking-widest text-white mb-2">
          <span className="text-emerald-400">Secure</span> Gateway
        </h2>

        <div className="h-[1px] w-10 bg-amber-500 mx-auto mb-4"></div>

        <div className="text-[11px] text-gray-400 leading-relaxed mb-6 font-sans space-y-3">
          <p>
            To maintain the resilience of our platform, we have decoupled our payment processing from our content vault. All transactions are routed through a secure, public-facing gateway: <span className="text-white font-bold">VendettaMachine</span>.
          </p>
          <p>
            This architecture protects the community and ensures uninterrupted access to our materials.
          </p>
          <p>
            Simply complete the acquisition at the gallery. Our automated system will detect your payment and instantly forge your personal key, delivering it directly to your email.
          </p>
        </div>

        <div className="w-full mt-auto pb-12">
          <button
            onClick={handleProceed}
            className="w-full bg-white text-black font-bold h-12 rounded-lg hover:bg-vengeance-red hover:text-white transition-all duration-300 flex items-center justify-center gap-2 mb-6 uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] border border-white/20"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={onClose}
            className="text-[10px] text-gray-500 uppercase tracking-widest hover:text-white transition-colors py-2"
          >
            Abort Mission
          </button>
        </div>
      </div>
    </div>
  );
}
