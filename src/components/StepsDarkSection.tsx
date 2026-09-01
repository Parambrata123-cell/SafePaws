import React from 'react';
import { motion } from 'motion/react';

interface StepsDarkSectionProps {
  onStep1Click: () => void;
  onStep2Click: () => void;
  onStep3Click: () => void;
}

export const StepsDarkSection: React.FC<StepsDarkSectionProps> = ({
  onStep1Click,
  onStep2Click,
  onStep3Click,
}) => {
  return (
    <section className="w-full bg-[#27170E] text-[#FAF6F0] py-16 sm:py-20 lg:py-24 my-8">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 mb-10 sm:mb-12">
          <span className="w-2.5 h-2.5 rounded-full bg-[#DE6828] inline-block" />
          <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.12em] text-[#D8C7B8] uppercase">
            SIMPLE FROM DAY ONE
          </span>
        </div>

        {/* 3 Step Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          
          {/* Step 01 */}
          <div
            id="step-item-01"
            onClick={onStep1Click}
            className="group flex flex-col items-start cursor-pointer transition-transform hover:-translate-y-1"
          >
            <div className="flex items-baseline gap-3 mb-2.5">
              <span className="font-serif text-[32px] sm:text-[38px] text-[#DE6828] font-normal leading-none select-none">
                01
              </span>
              <h3 className="font-sans font-semibold text-[18px] sm:text-[20px] text-white tracking-tight group-hover:text-[#F39C6B] transition-colors">
                Create a profile
              </h3>
            </div>
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#B8A498] max-w-[320px]">
              Add your pet's connection and a few identifying details.
            </p>
          </div>

          {/* Step 02 */}
          <div
            id="step-item-02"
            onClick={onStep2Click}
            className="group flex flex-col items-start cursor-pointer transition-transform hover:-translate-y-1"
          >
            <div className="flex items-baseline gap-3 mb-2.5">
              <span className="font-serif text-[32px] sm:text-[38px] text-[#DE6828] font-normal leading-none select-none">
                02
              </span>
              <h3 className="font-sans font-semibold text-[18px] sm:text-[20px] text-white tracking-tight group-hover:text-[#F39C6B] transition-colors">
                Stay connected
              </h3>
            </div>
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#B8A498] max-w-[320px]">
              Join nearby neighbors who look out for pets together.
            </p>
          </div>

          {/* Step 03 */}
          <div
            id="step-item-03"
            onClick={onStep3Click}
            className="group flex flex-col items-start cursor-pointer transition-transform hover:-translate-y-1"
          >
            <div className="flex items-baseline gap-3 mb-2.5">
              <span className="font-serif text-[32px] sm:text-[38px] text-[#DE6828] font-normal leading-none select-none">
                03
              </span>
              <h3 className="font-sans font-semibold text-[18px] sm:text-[20px] text-white tracking-tight group-hover:text-[#F39C6B] transition-colors">
                Bring them home
              </h3>
            </div>
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#B8A498] max-w-[320px]">
              Share a clear alert when it matters most.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
