import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Bell, ShieldCheck, QrCode } from 'lucide-react';
import { PawIcon } from './Header';

interface HeroProps {
  onJoinClick: () => void;
  onOpenOliveProfile: () => void;
  onOpenLostAlert: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onJoinClick,
  onOpenOliveProfile,
  onOpenLostAlert,
}) => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography and Action */}
        <div className="lg:col-span-6 flex flex-col items-start z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[42px] sm:text-[56px] lg:text-[68px] leading-[1.08] tracking-[-0.02em] text-[#241812] font-normal"
          >
            When they <br />
            wander, we <br />
            <motion.span
              className="inline-block text-[#241812]"
              initial={{ x: -90, opacity: 0, filter: 'blur(8px)' }}
              animate={{
                x: [-90, -35, -6, 0],
                opacity: [0, 0.5, 0.85, 1],
                filter: ['blur(8px)', 'blur(2.5px)', 'blur(0.5px)', 'blur(0px)'],
              }}
              transition={{
                duration: 2.2,
                times: [0, 0.22, 0.68, 1],
                ease: [0.08, 0.82, 0.17, 1],
              }}
            >
              search together.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-7 text-[16px] sm:text-[17px] leading-[1.65] text-[#55463D] max-w-[460px]"
          >
            SafePaws is a community-powered safety net for pets. Create a trusted profile, stay connected to your neighborhood, and help bring every lost companion home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-9"
          >
            <button
              id="hero-join-community-btn"
              onClick={onJoinClick}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#DE6828] hover:bg-[#CA581B] active:bg-[#B54C14] text-white font-medium text-[15px] sm:text-[16px] shadow-[0_4px_18px_rgba(222,104,40,0.28)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Join the community</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Orbital Radar & Floating Interactive Cards */}
        <div className="lg:col-span-6 flex justify-center items-center relative min-h-[380px] sm:min-h-[460px] lg:min-h-[500px]">
          <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
            
            {/* Outer Circular Ring 1 */}
            <div className="absolute inset-0 rounded-full border border-[#E9DCcb] pointer-events-none" />
            
            {/* Middle Circular Ring 2 */}
            <div className="absolute inset-[14%] rounded-full border border-[#E6D7C3] pointer-events-none" />

            {/* Inner Circular Ring 3 */}
            <div className="absolute inset-[28%] rounded-full border border-[#E1CFB8] pointer-events-none" />

            {/* Subtle animated orbital scanning rings */}
            <div className="absolute inset-[8%] rounded-full border border-[#E27031]/15 animate-spin-slow pointer-events-none">
              {/* Little orbital dot marker */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#DE6828] shadow-[0_0_10px_rgba(222,104,40,0.6)]" />
            </div>

            {/* Counter-rotating subtle dashed ring with directional arrow */}
            <div className="absolute inset-[22%] rounded-full border border-dashed border-[#DE6828]/20 animate-spin-reverse-slow pointer-events-none">
              <div className="absolute bottom-1 right-[20%] w-2 h-2 rounded-full bg-[#E59360]" />
            </div>

            {/* Central Glow Disc */}
            <div className="relative w-[180px] sm:w-[210px] h-[180px] sm:h-[210px] rounded-full bg-gradient-to-br from-[#F5E2BE] via-[#F2DDB4] to-[#E9D1A2] shadow-[0_12px_32px_rgba(215,167,105,0.24)] flex items-center justify-center transition-transform hover:scale-105">
              {/* Inner highlight circle */}
              <div className="w-[140px] sm:w-[165px] h-[140px] sm:h-[165px] rounded-full bg-gradient-to-b from-[#F7E7C9] to-[#EBD3A7] flex items-center justify-center shadow-inner">
                {/* Solid Paw print matching the design */}
                <div className="text-[#55321D] drop-shadow-sm">
                  <PawIcon className="w-16 h-16 sm:w-20 sm:h-20 text-[#54321D]" />
                </div>
              </div>

              {/* Ambient gentle pulse around paw */}
              <div className="absolute inset-0 rounded-full bg-[#DE6828]/10 animate-pulse-ring pointer-events-none" />
            </div>

            {/* Floating Card 1: Top Right - Profile Protected (Olive · Golden retriever) */}
            <motion.div
              initial={{ opacity: 0, x: 25, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03, y: -2 }}
              onClick={onOpenOliveProfile}
              id="hero-badge-profile-protected"
              className="absolute -top-2 sm:top-4 right-0 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl border border-[#EDE4D8] shadow-[0_10px_30px_rgba(40,25,15,0.08)] flex items-center gap-3 cursor-pointer select-none transition-shadow hover:shadow-[0_14px_36px_rgba(40,25,15,0.12)] z-20"
            >
              {/* Green checkmark circle */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#34A853] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <div className="text-[13px] sm:text-[14px] font-bold text-[#241812] leading-tight flex items-center gap-1.5">
                  <span>Profile protected</span>
                </div>
                <div className="text-[11px] sm:text-[12px] font-medium text-[#7A6B61] leading-tight mt-0.5">
                  Olive · Golden retriever
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2: Bottom Left - Lost Pet Alert (Sent to 138 nearby neighbors) */}
            <motion.div
              initial={{ opacity: 0, x: -25, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03, y: -2 }}
              onClick={onOpenLostAlert}
              id="hero-badge-lost-pet-alert"
              className="absolute -bottom-2 sm:bottom-6 left-0 sm:-left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl border border-[#EDE4D8] shadow-[0_10px_30px_rgba(40,25,15,0.08)] flex items-center gap-3 cursor-pointer select-none transition-shadow hover:shadow-[0_14px_36px_rgba(40,25,15,0.12)] z-20"
            >
              {/* Amber bell circle */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F6D7BE] flex items-center justify-center text-[#B95217] shrink-0">
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#B95217] text-[#B95217]" />
              </div>
              <div className="text-left">
                <div className="text-[13px] sm:text-[14px] font-bold text-[#241812] leading-tight flex items-center gap-1.5">
                  <span>Lost pet alert</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DE6828] animate-ping" />
                </div>
                <div className="text-[11px] sm:text-[12px] font-medium text-[#7A6B61] leading-tight mt-0.5">
                  Sent to 138 nearby neighbors
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
