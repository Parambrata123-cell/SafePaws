import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PawIcon } from './Header';

interface EnterScreenProps {
  onEnter: () => void;
}

export const EnterScreen: React.FC<EnterScreenProps> = ({ onEnter }) => {
  // Stages: 'idle' (Press here to enter) -> 'animating' (Left-to-right logo intro) -> 'complete'
  const [stage, setStage] = useState<'idle' | 'animating'>('idle');

  const handleStartAnimation = () => {
    setStage('animating');
    // Allow the full choreographed logo animation sequence to play, then transition to website
    setTimeout(() => {
      onEnter();
    }, 2800);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(4px)',
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAF3EA] select-none overflow-hidden cursor-default"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #FAF3EA 0%, #F1E3D1 55%, #E8D5BF 100%)',
      }}
    >
      {/* Ambient warm lighting ripple */}
      <motion.div
        animate={{
          scale: stage === 'animating' ? [1, 1.3, 1.1] : [1, 1.15, 1],
          opacity: stage === 'animating' ? [0.3, 0.6, 0.4] : [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: stage === 'animating' ? 2.5 : 6,
          repeat: stage === 'animating' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#DE6828]/15 via-[#F3CEB4]/25 to-transparent blur-3xl pointer-events-none"
      />

      <AnimatePresence mode="wait">
        {stage === 'idle' ? (
          /* ========================================================
             STAGE 1: "Press here to enter" Clean Centered Screen
             ======================================================== */
          <motion.div
            key="idle-prompt"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.35 } }}
            className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
          >
            {/* Center Interactive Button */}
            <motion.button
              id="press-to-enter-btn"
              onClick={handleStartAnimation}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex items-center gap-3.5 px-8 py-4 rounded-full bg-white/70 hover:bg-white/95 active:bg-white backdrop-blur-xl border border-white/90 shadow-[0_8px_32px_rgba(61,44,34,0.08),inset_0_1px_2px_rgba(255,255,255,1)] hover:shadow-[0_12px_40px_rgba(222,104,40,0.2),inset_0_1px_2px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer"
            >
              {/* Subtle light sheen across button */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </div>

              <span className="font-serif text-xl sm:text-2xl text-[#2E2018] group-hover:text-[#DE6828] tracking-tight transition-colors duration-200">
                Press here to enter
              </span>

              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FAF4ED] group-hover:bg-[#DE6828] text-[#3D2C22] group-hover:text-white transition-colors duration-200 shadow-sm"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.button>

            {/* Soft bottom hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-6 text-xs sm:text-sm tracking-wider uppercase font-medium text-[#7D6B5F]"
            >
              SafePaws • Community Lost Pet Search
            </motion.p>
          </motion.div>
        ) : (
          /* ========================================================
             STAGE 2: Kinetic Left-to-Right Logo Reveal Animation
             Inspired by the reference video
             ======================================================== */
          <motion.div
            key="logo-reveal-animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-20 flex flex-col items-center justify-center w-full max-w-4xl px-4 select-none"
          >
            {/* 1. Kinetic Lead Particle Swooping across from Left to Right */}
            <motion.div
              initial={{ x: -280, y: -40, opacity: 0, scale: 0.5 }}
              animate={{
                x: [-280, -90, 80, 190, 165],
                y: [-40, -15, 25, -10, 0],
                opacity: [0, 0.9, 1, 0.9, 0],
                scale: [0.5, 1.2, 1, 1.3, 0.2],
              }}
              transition={{
                duration: 1.3,
                times: [0, 0.25, 0.55, 0.85, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute w-5 h-5 rounded-full bg-gradient-to-tr from-[#DE6828] to-[#F59E0B] shadow-[0_0_20px_rgba(222,104,40,0.8)] blur-[0.5px] pointer-events-none z-30"
            />

            {/* 2. Secondary orbiting particle circling around & docking */}
            <motion.div
              initial={{ x: 60, y: 120, opacity: 0, scale: 0 }}
              animate={{
                x: [60, 180, 210, 195],
                y: [120, 40, -20, 4],
                opacity: [0, 0.8, 1, 1],
                scale: [0, 1.4, 1, 1],
              }}
              transition={{
                delay: 0.7,
                duration: 1.1,
                times: [0, 0.45, 0.8, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute w-3.5 h-3.5 rounded-full bg-[#DE6828] shadow-[0_0_12px_rgba(222,104,40,0.9)] pointer-events-none z-30"
            />

            {/* Central Brand Unit: Logo Icon + "SafePaws" Typography */}
            <div className="relative flex items-center justify-center gap-4 sm:gap-5">
              
              {/* Logo Box with Ghost Motion Trails moving Left to Right */}
              <div className="relative flex items-center justify-center">
                {/* Ghost Trail 1 (Farthest left echo) */}
                <motion.div
                  initial={{ x: -180, opacity: 0, scale: 0.7 }}
                  animate={{
                    x: [-180, -35, 0],
                    opacity: [0, 0.25, 0],
                    scale: [0.7, 0.95, 1],
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute w-14 h-14 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#DE6828]/25 to-transparent backdrop-blur-sm border border-[#DE6828]/30 flex items-center justify-center"
                >
                  <PawIcon className="w-7 h-7 sm:w-9 sm:h-9 text-[#DE6828]/40" />
                </motion.div>

                {/* Ghost Trail 2 (Closer echo) */}
                <motion.div
                  initial={{ x: -110, opacity: 0, scale: 0.8 }}
                  animate={{
                    x: [-110, -18, 0],
                    opacity: [0, 0.45, 0],
                    scale: [0.8, 0.98, 1],
                  }}
                  transition={{
                    duration: 0.95,
                    delay: 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute w-14 h-14 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl bg-white/50 backdrop-blur-md border border-white/60 flex items-center justify-center"
                >
                  <PawIcon className="w-7 h-7 sm:w-9 sm:h-9 text-[#26170E]/30" />
                </motion.div>

                {/* Primary Solid Logo Icon (Sweeps from left and settles with spring physics) */}
                <motion.div
                  initial={{ x: -140, opacity: 0, scale: 0.82, rotate: -12 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    duration: 1.1,
                    ease: [0.12, 0.9, 0.24, 1],
                  }}
                  className="relative z-20 w-14 h-14 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/95 to-white/65 backdrop-blur-xl border border-white/90 shadow-[0_10px_35px_rgba(38,23,14,0.12),inset_0_1px_2px_rgba(255,255,255,1)] flex items-center justify-center text-[#26170E]"
                >
                  <PawIcon className="w-7 h-7 sm:w-9 sm:h-9 text-[#26170E]" />

                  {/* Specular light swipe across the paw card */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none"
                  >
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12" />
                  </motion.div>
                </motion.div>
              </div>

              {/* "SafePaws" Typography - Left-to-Right Wipe & Letter Reveal */}
              <div className="relative overflow-hidden py-1">
                <motion.div
                  initial={{ x: -60, opacity: 0, filter: 'blur(6px)' }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    delay: 0.35,
                    duration: 0.95,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center"
                >
                  <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#26170E] flex items-center">
                    SafePaws
                  </h1>
                </motion.div>
              </div>
            </div>

            {/* Subtitle / Tagline unrolling smoothly beneath */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
              className="mt-4 flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest text-[#786455] font-medium"
            >
              <span>Community Pet Recovery Network</span>
              <span className="w-1 h-1 rounded-full bg-[#DE6828]" />
              <span>Instant Alert Grid</span>
            </motion.div>

            {/* Glowing Accent Progress Line expanding from Left to Right */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 w-36 sm:w-48 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#DE6828]/60 to-transparent origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
