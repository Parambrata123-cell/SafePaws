import React from 'react';
import { motion } from 'motion/react';
import { Fingerprint, Share2, Scan, Sparkles, ArrowUpRight } from 'lucide-react';

interface FeaturesSectionProps {
  onOpenBiometric: () => void;
  onOpenNetwork: () => void;
  onOpenQrTags: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onOpenBiometric,
  onOpenNetwork,
  onOpenQrTags,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16">
      {/* Section Eyebrow */}
      <div className="flex items-center gap-2 mb-8 sm:mb-10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#DE6828] inline-block" />
        <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.12em] text-[#3F3127] uppercase">
          ONE PLACE TO KEEP THEM SAFE
        </span>
      </div>

      {/* 3 Bento-Style Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Card 1: Biometric AI */}
        <motion.div
          id="feature-card-biometric"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          onClick={onOpenBiometric}
          className="group relative bg-[#FDE8DC] rounded-[28px] p-7 sm:p-8 flex flex-col justify-between cursor-pointer border border-[#F4D3C2] transition-shadow hover:shadow-[0_16px_32px_rgba(222,104,40,0.12)] min-h-[290px]"
        >
          {/* Top Row: Icon + Badge */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#F8D4C1] text-[#422B1F] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Fingerprint className="w-6 h-6 stroke-[1.8]" />
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-[#3C2A1E] text-[11px] font-bold tracking-wider uppercase shadow-xs">
              COMING SOON
            </span>
          </div>

          {/* Content */}
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-sans font-semibold text-[22px] sm:text-[24px] text-[#241812] tracking-tight">
                Biometric AI
              </h3>
              <ArrowUpRight className="w-4 h-4 text-[#7A6458] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="mt-2.5 text-[14px] sm:text-[15px] leading-[1.55] text-[#5C4A3F]">
              Store the details that make your pet unmistakably yours. Identity verification is coming soon.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Sensor Network */}
        <motion.div
          id="feature-card-sensor-network"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          onClick={onOpenNetwork}
          className="group relative bg-[#ECE0D2] rounded-[28px] p-7 sm:p-8 flex flex-col justify-between cursor-pointer border border-[#E0D0BF] transition-shadow hover:shadow-[0_16px_32px_rgba(60,40,25,0.1)] min-h-[290px]"
        >
          {/* Top Row: Icon + Badge */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#DFCDBD] text-[#3D291E] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Share2 className="w-6 h-6 stroke-[1.8]" />
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-[#3C2A1E] text-[11px] font-bold tracking-wider uppercase shadow-xs">
              COMMUNITY POWERED
            </span>
          </div>

          {/* Content */}
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-sans font-semibold text-[22px] sm:text-[24px] text-[#241812] tracking-tight">
                Sensor Network
              </h3>
              <ArrowUpRight className="w-4 h-4 text-[#7A6458] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="mt-2.5 text-[14px] sm:text-[15px] leading-[1.55] text-[#5C4A3F]">
              A community-powered safety net that helps lost pets get noticed without expensive hardware.
            </p>
          </div>
        </motion.div>

        {/* Card 3: Smart QR Tags */}
        <motion.div
          id="feature-card-smart-qr"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          onClick={onOpenQrTags}
          className="group relative bg-[#D7ECEB] rounded-[28px] p-7 sm:p-8 flex flex-col justify-between cursor-pointer border border-[#C5E1DF] transition-shadow hover:shadow-[0_16px_32px_rgba(20,80,80,0.12)] min-h-[290px]"
        >
          {/* Top Row: Icon + Badge */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#C1E2E0] text-[#1E3B3A] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Scan className="w-6 h-6 stroke-[1.8]" />
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-[#213F3E] text-[11px] font-bold tracking-wider uppercase shadow-xs">
              ALWAYS AVAILABLE
            </span>
          </div>

          {/* Content */}
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-sans font-semibold text-[22px] sm:text-[24px] text-[#1E3B3A] tracking-tight">
                Smart QR Tags
              </h3>
              <ArrowUpRight className="w-4 h-4 text-[#356361] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="mt-2.5 text-[14px] sm:text-[15px] leading-[1.55] text-[#3D5B59]">
              Give every pet a scannable profile so a kind stranger can help them get home safely.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
