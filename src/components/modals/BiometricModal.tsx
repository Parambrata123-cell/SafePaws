import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Fingerprint, Sparkles, Check, Scan, Eye, Camera, RefreshCw } from 'lucide-react';
import { Pet } from '../../types';

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: Pet;
}

export const BiometricModal: React.FC<BiometricModalProps> = ({
  isOpen,
  onClose,
  pet,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<'idle' | 'analyzing' | 'complete'>('idle');

  if (!isOpen) return null;

  const handleStartScan = () => {
    setIsScanning(true);
    setScanStep('analyzing');
    setTimeout(() => {
      setScanStep('complete');
      setIsScanning(false);
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-2xl bg-[#FAF6F0] rounded-[28px] border border-[#E9DCcb] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#E8DCce] flex items-center justify-between bg-[#F4EDE2]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FDE8DC] flex items-center justify-center text-[#DE6828]">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl text-[#241812] font-semibold">
                  Biometric AI Verification
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-white text-[#3C2A1E] text-[10px] font-bold uppercase tracking-wider border border-[#E2D5C6]">
                  Preview
                </span>
              </div>
              <p className="text-xs text-[#6F5D52]">
                Unique canine & feline snout ridges, coat whorls, and facial geometry
              </p>
            </div>
          </div>

          <button
            id="close-biometric-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-[#6E5A4D] hover:bg-[#E5D7C7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Interactive AI Scanner View */}
          <div className="relative bg-[#27170E] rounded-3xl p-6 text-white overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
            {/* Background Pet Photo with Overlaid Scanning Grid */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-white/20">
              <img
                src={pet.photoUrl}
                alt={pet.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Scanning Ray / Grid Animation */}
              {scanStep === 'analyzing' && (
                <div className="absolute inset-0 bg-[#DE6828]/20 flex flex-col items-center justify-center">
                  <div className="w-full h-1 bg-[#DE6828] shadow-[0_0_15px_#DE6828] animate-pulse" />
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 border border-[#DE6828]/40" />
                </div>
              )}

              {/* Verified Geometric Vector Points when complete */}
              {scanStep === 'complete' && (
                <div className="absolute inset-0 bg-[#34A853]/15 flex items-center justify-center pointer-events-none">
                  {/* Facial landmarks points */}
                  <div className="absolute top-[35%] left-[38%] w-2 h-2 rounded-full bg-[#34A853] shadow-[0_0_8px_#34A853]" />
                  <div className="absolute top-[35%] right-[38%] w-2 h-2 rounded-full bg-[#34A853] shadow-[0_0_8px_#34A853]" />
                  <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#DE6828] shadow-[0_0_10px_#DE6828]" />
                  <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-dashed border-[#34A853]" />
                </div>
              )}
            </div>

            {/* Status indicator below photo */}
            <div className="mt-4 text-center">
              {scanStep === 'idle' && (
                <p className="text-xs text-[#D8C7BA]">
                  Ready to map {pet.name}’s biometric print. Click below to analyze.
                </p>
              )}
              {scanStep === 'analyzing' && (
                <div className="flex items-center gap-2 text-[#DE6828] text-xs font-bold animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Extracting 128-point snout & facial biometric vectors...</span>
                </div>
              )}
              {scanStep === 'complete' && (
                <div className="flex items-center gap-1.5 text-[#34A853] text-xs font-bold">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Biometric ID Hash Verified: 99.8% Match Certainty</span>
                </div>
              )}
            </div>
          </div>

          {/* Biometric Analysis Markers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-[#E9DCcb]">
              <div className="text-[11px] font-bold text-[#7E6D62] uppercase">Snout Ridge Print</div>
              <div className="text-sm font-semibold text-[#241812] mt-0.5">Unique As Human Fingerprint</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-[#E9DCcb]">
              <div className="text-[11px] font-bold text-[#7E6D62] uppercase">Facial Geometry</div>
              <div className="text-sm font-semibold text-[#241812] mt-0.5">128 Landmark Points</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-[#E9DCcb]">
              <div className="text-[11px] font-bold text-[#7E6D62] uppercase">Tamper-Proof</div>
              <div className="text-sm font-semibold text-[#241812] mt-0.5">Cryptographic On-Device</div>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              id="run-biometric-scan-btn"
              onClick={handleStartScan}
              disabled={isScanning}
              className="px-6 py-3 rounded-full bg-[#DE6828] hover:bg-[#C9581B] text-white text-sm font-semibold inline-flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4" />
              <span>{scanStep === 'complete' ? 'Re-Run Biometric Analysis' : 'Run Biometric Analysis'}</span>
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
