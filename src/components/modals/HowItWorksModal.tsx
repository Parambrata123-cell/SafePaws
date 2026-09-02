import React from 'react';
import { motion } from 'motion/react';
import { X, Shield, Smartphone, QrCode, Radio, CheckCircle2, ArrowRight } from 'lucide-react';
import { PawIcon } from '../Header';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onGetStarted,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-3xl bg-[#FAF6F0] rounded-[28px] border border-[#E9DCcb] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-[#E8DCce] flex items-center justify-between bg-[#F4EDE2]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E5D5C2] flex items-center justify-center text-[#241812]">
              <PawIcon className="w-5 h-5 text-[#DE6828]" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#241812] font-semibold">
                How SafePaws Works
              </h2>
              <p className="text-xs text-[#6F5D52]">
                A high-speed neighborhood safety net designed for immediate reunions
              </p>
            </div>
          </div>

          <button
            id="close-how-it-works-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-[#6E5A4D] hover:bg-[#E5D7C7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Step 1 */}
          <div className="flex gap-5 items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#FDE8DC] text-[#DE6828] font-serif text-2xl font-bold flex items-center justify-center shrink-0 border border-[#F5D2BE]">
              01
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#241812] mb-1">
                Create a Trusted Pet Profile & Link Smart QR
              </h3>
              <p className="text-sm text-[#5E4C41] leading-relaxed">
                Add your pet's photo, medical necessities, and your emergency contact. SafePaws generates an always-on Smart QR code you can attach to their collar tag.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-5 items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#ECE0D2] text-[#DE6828] font-serif text-2xl font-bold flex items-center justify-center shrink-0 border border-[#E0D0BF]">
              02
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#241812] mb-1">
                Stay Connected with Neighborhood Lookouts
              </h3>
              <p className="text-sm text-[#5E4C41] leading-relaxed">
                If your companion ever slips out, activate a one-tap Lost Alert. SafePaws immediately alerts verified neighbors, dog walkers, and local volunteers within a 2.5km search radius.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-5 items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#D7ECEB] text-[#1E3B3A] font-serif text-2xl font-bold flex items-center justify-center shrink-0 border border-[#C5E1DF]">
              03
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#241812] mb-1">
                Zero-Friction Finder Scan & Safe Reunion
              </h3>
              <p className="text-sm text-[#5E4C41] leading-relaxed">
                When a kind neighbor spots your pet, they simply scan the collar tag with any smartphone camera. No apps required — they can tap once to call you or send an exact GPS pin.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-[#27170E] text-white p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-xl font-bold">Ready to protect your companion?</h4>
              <p className="text-xs text-[#D8C7B8] mt-0.5">Free for all pet parents and community members.</p>
            </div>
            <button
              id="how-it-works-start-btn"
              onClick={() => {
                onClose();
                onGetStarted();
              }}
              className="px-6 py-3 rounded-full bg-[#DE6828] hover:bg-[#C9581B] text-white text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-md shrink-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
