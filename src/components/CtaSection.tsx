import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CtaSectionProps {
  onStartClick: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartClick }) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div className="max-w-4xl">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-[#DE6828] inline-block" />
          <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.12em] text-[#3F3127] uppercase">
            YOUR NEIGHBORHOOD, CONNECTED
          </span>
        </div>

        {/* Big Serif Heading */}
        <h2 className="font-serif text-[38px] sm:text-[54px] lg:text-[64px] leading-[1.1] tracking-[-0.02em] text-[#241812] font-normal mb-8 sm:mb-10">
          Because the best search party is the one that’s already there.
        </h2>

        {/* Action Button */}
        <div>
          <button
            id="cta-start-safepaws-btn"
            onClick={onStartClick}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#DE6828] hover:bg-[#CA581B] active:bg-[#B54C14] text-white font-medium text-[15px] sm:text-[16px] shadow-[0_4px_18px_rgba(222,104,40,0.28)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Start with SafePaws</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
