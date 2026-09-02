import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PawIcon } from './Header';

interface EnterScreenProps {
  onEnter: () => void;
}

export const EnterScreen: React.FC<EnterScreenProps> = ({ onEnter }) => {
  // Stages:
  // 1. 'intro': Awesome opening sequence with ambient ripples, glowing trail, and paw imprint
  // 2. 'ready': "Press here to enter" button blooms in smoothly with magnetic light sheen
  // 3. 'animating': Kinetic brand reveal when clicked, then exits to main website
  const [stage, setStage] = useState<'intro' | 'ready' | 'animating'>('intro');
  const [introStep, setIntroStep] = useState(0);

  useEffect(() => {
    // Choreographed intro animation steps before showing "Press here to enter"
    const t1 = setTimeout(() => setIntroStep(1), 300);   // Aurora aura & golden trail ignite
    const t2 = setTimeout(() => setIntroStep(2), 900);   // Paw emblem stamps down with gentle shockwave
    const t3 = setTimeout(() => setIntroStep(3), 1600);  // Text typography unfolds
    const t4 = setTimeout(() => {
      setIntroStep(4);
      setStage('ready'); // Reveal the "Press here to enter" button
    }, 2300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleStartAnimation = () => {
    setStage('animating');
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
      id="enter-screen-bg"
      className="enter-screen-bg fixed inset-0 z-[100] flex items-center justify-center bg-[#FAF3EA] select-none overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #FAF3EA 0%, #F1E3D1 55%, #E8D5BF 100%)',
      }}
    >
      {/* Dynamic ambient energy orbs */}
      <motion.div
        animate={{
          scale: stage === 'animating' ? [1, 1.35, 1.1] : [1, 1.18, 1],
          opacity: stage === 'animating' ? [0.4, 0.7, 0.4] : [0.25, 0.5, 0.25],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          scale: { duration: stage === 'animating' ? 2.5 : 7, repeat: stage === 'animating' ? 0 : Infinity, ease: 'easeInOut' },
          opacity: { duration: stage === 'animating' ? 2.5 : 7, repeat: stage === 'animating' ? 0 : Infinity, ease: 'easeInOut' },
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
        }}
        className="absolute w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-[#DE6828]/20 via-[#F59E0B]/15 to-transparent blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full bg-[#DE6828]/15 blur-3xl pointer-events-none"
      />

      <AnimatePresence mode="wait">
        {/* =========================================================================
            STAGE 1 & 2: Awesome Pre-Button Intro & "Press here to enter" Presentation
            ========================================================================= */}
        {stage !== 'animating' ? (
          <motion.div
            key="pre-enter-container"
            data-enter-content="true"
            className="relative z-[120] flex flex-col items-center justify-center px-6 text-center"
          >
            {/* 1. Introductory Emblem & Ripple Wave Animation */}
            <div className="relative flex items-center justify-center mb-7">
              {/* Concentric expanding acoustic sonar rings */}
              <AnimatePresence>
                {introStep >= 1 && (
                  <>
                    <motion.div
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: [0.4, 1.8, 2.4], opacity: [0.8, 0.3, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute w-24 h-24 rounded-full border border-[#DE6828]/40 pointer-events-none"
                    />
                    <motion.div
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: [0.4, 1.5, 2.1], opacity: [0.7, 0.25, 0] }}
                      transition={{ duration: 2.4, delay: 0.6, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute w-24 h-24 rounded-full border border-[#F59E0B]/35 pointer-events-none"
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Orbiting Golden Star Particles during intro */}
              <AnimatePresence>
                {introStep >= 1 && (
                  <motion.div
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 270, opacity: 1 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute w-28 h-28 pointer-events-none"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#DE6828] shadow-[0_0_12px_#DE6828]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Central Glowing Icon with Spring Bounce - clean transparent icon with no opaque white box texture */}
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -25, y: -30 }}
                animate={{
                  scale: introStep >= 2 ? 1 : 0,
                  opacity: introStep >= 2 ? 1 : 0,
                  rotate: introStep >= 2 ? 0 : -25,
                  y: introStep >= 2 ? 0 : -30,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 22,
                  mass: 0.8,
                }}
                className="relative flex items-center justify-center text-[#DE6828]"
              >
                <PawIcon className="w-10 h-10 sm:w-12 sm:h-12 text-[#DE6828] drop-shadow-[0_4px_12px_rgba(222,104,40,0.3)]" />
              </motion.div>
            </div>

            {/* 2. Micro-Title & Tagline Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: introStep >= 3 ? 1 : 0,
                y: introStep >= 3 ? 0 : 15,
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center mb-6"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DE6828]/10 border border-[#DE6828]/20 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#DE6828]" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#DE6828]">
                  Lost & Found Pet Rescue
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2E2018]">
                SafePaws Portal
              </h2>
            </motion.div>

            {/* 3. The "Press here to enter" Button Bloom Transition */}
            <AnimatePresence>
              {stage === 'ready' && (
                <motion.div
                  key="button-wrapper"
                  initial={{ opacity: 0, y: 25, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 24,
                    mass: 0.7,
                  }}
                  className="flex flex-col items-center"
                >
                  <motion.button
                    id="press-to-enter-btn"
                    onClick={handleStartAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="group relative flex items-center gap-3.5 px-9 py-4.5 rounded-full bg-white/85 hover:bg-white active:bg-white backdrop-blur-xl border border-white shadow-[0_12px_36px_rgba(61,44,34,0.1),inset_0_1px_2px_rgba(255,255,255,1)] hover:shadow-[0_16px_46px_rgba(222,104,40,0.26),inset_0_1px_2px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer"
                  >
                    {/* Animated Light Sweep Bar */}
                    <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                      <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', repeatDelay: 1.5 }}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12"
                      />
                    </div>

                    <span className="font-serif text-xl sm:text-2xl text-[#2E2018] group-hover:text-[#DE6828] tracking-tight transition-colors duration-200">
                      Press here to enter
                    </span>

                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF4ED] group-hover:bg-[#DE6828] text-[#3D2C22] group-hover:text-white transition-colors duration-200 shadow-sm"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </motion.button>

                  {/* Gentle Footer Indicator */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-6 text-xs sm:text-sm tracking-wider uppercase font-medium text-[#7D6B5F]"
                  >
                    Community Lost Pet Search Network
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* =========================================================================
              STAGE 3: Kinetic Left-to-Right Logo Reveal Animation Sequence
             ========================================================================= */
          <motion.div
            key="logo-reveal-animation"
            data-enter-content="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-[120] flex flex-col items-center justify-center w-full max-w-4xl px-4 select-none"
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
                  className="absolute flex items-center justify-center pointer-events-none"
                >
                  <PawIcon className="w-7 h-7 sm:w-9 sm:h-9 text-[#DE6828]/25" />
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
                  className="absolute flex items-center justify-center pointer-events-none"
                >
                  <PawIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#DE6828]/30" />
                </motion.div>

                {/* Primary Solid Logo Icon (Sweeps from left and settles with spring physics) - clean transparent icon */}
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
                  className="relative z-20 flex items-center justify-center text-[#DE6828]"
                >
                  <PawIcon className="w-9 h-9 sm:w-11 sm:h-11 text-[#DE6828] drop-shadow-[0_4px_16px_rgba(222,104,40,0.35)]" />
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
