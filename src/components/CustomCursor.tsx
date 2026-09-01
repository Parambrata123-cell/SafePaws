import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

export type CursorMode = 'default' | 'button' | 'text' | 'card' | 'input' | 'image' | 'link';

interface PawStep {
  id: number;
  x: number;
  y: number;
  angle: number; // degrees
  side: 'left' | 'right';
  scale: number;
  opacity: number;
}

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [contextLabel, setContextLabel] = useState<string>('');
  const [isClicking, setIsClicking] = useState(false);

  // Paw prints history
  const [pawSteps, setPawSteps] = useState<PawStep[]>([]);
  const lastPawRef = useRef<{ x: number; y: number; time: number; stepCount: number }>({
    x: -999,
    y: -999,
    time: 0,
    stepCount: 0,
  });

  // Raw mouse coordinates: Instant tracking for the center dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fluid physics spring for the outer trailing circle
  const springConfig = { damping: 26, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Clean up faded paw prints on intervals or requestAnimationFrame
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setPawSteps((prev) => {
        if (prev.length === 0) return prev;
        // Keep steps created within the last 1400ms
        const filtered = prev.filter((p) => now - p.id < 1400);
        return filtered.length === prev.length ? prev : filtered;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      const curX = e.clientX;
      const curY = e.clientY;
      const now = Date.now();

      mouseX.set(curX);
      mouseY.set(curY);

      // --- PAW TRAIL LOGIC ---
      const last = lastPawRef.current;
      const dx = curX - last.x;
      const dy = curY - last.y;
      const dist = Math.hypot(dx, dy);

      // Natural paw stride spacing: spawn every ~36-42px of movement
      const MIN_STRIDE = 38;
      if (dist >= MIN_STRIDE && (now - last.time) > 45) {
        // Calculate movement direction in degrees (standard paw icon points upward at 0 deg)
        // Math.atan2 gives angle from positive X axis (+90deg turns it to align with SVG pointing up)
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

        // Alternate slightly left and right paw footfalls for a natural animal stride
        const isRight = last.stepCount % 2 === 1;
        const lateralOffset = 7; // pixels perpendicular to movement
        const perpAngle = (Math.atan2(dy, dx) + (isRight ? Math.PI / 2 : -Math.PI / 2));
        const spawnX = curX - (dx / dist) * 18 + Math.cos(perpAngle) * lateralOffset;
        const spawnY = curY - (dy / dist) * 18 + Math.sin(perpAngle) * lateralOffset;

        const newStep: PawStep = {
          id: now,
          x: spawnX,
          y: spawnY,
          angle: angle + (isRight ? 6 : -6), // subtle natural outward toe flare
          side: isRight ? 'right' : 'left',
          scale: 0.9 + Math.random() * 0.15,
          opacity: 0.75,
        };

        lastPawRef.current = {
          x: curX,
          y: curY,
          time: now,
          stepCount: last.stepCount + 1,
        };

        setPawSteps((prev) => {
          // Limit to at most 18 steps to keep rendering extremely lightweight
          const updated = [...prev, newStep];
          return updated.length > 18 ? updated.slice(updated.length - 18) : updated;
        });
      }

      // --- CONTEXT AWARE ELEMENT DETECTION ---
      const target = e.target as HTMLElement | null;
      if (!target) {
        setMode('default');
        setContextLabel('');
        return;
      }

      const cursorAttrEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorAttrEl) {
        const attrVal = cursorAttrEl.getAttribute('data-cursor');
        const customLabel = cursorAttrEl.getAttribute('data-cursor-label') || '';
        if (attrVal === 'card') {
          setMode('card');
          setContextLabel(customLabel || 'View');
          return;
        }
        if (attrVal === 'image') {
          setMode('image');
          setContextLabel(customLabel || 'Zoom');
          return;
        }
      }

      // 1. Interactive Button / Enter Trigger
      const buttonEl = target.closest('button, [role="button"], [id*="-btn"]') as HTMLElement | null;
      if (buttonEl) {
        setMode('button');
        const btnText = (buttonEl.textContent || '').trim().toLowerCase();
        if (btnText.includes('enter')) {
          setContextLabel('Enter');
        } else {
          setContextLabel('');
        }
        return;
      }

      // 2. Links
      const linkEl = target.closest('a') as HTMLElement | null;
      if (linkEl) {
        setMode('link');
        setContextLabel('');
        return;
      }

      // 3. Inputs & Textareas
      const inputEl = target.closest('input, textarea, select') as HTMLElement | null;
      if (inputEl) {
        setMode('input');
        setContextLabel('');
        return;
      }

      // 4. Pet / Feature / Story Cards
      const cardEl = target.closest('[id*="-card"], article, .group') as HTMLElement | null;
      if (cardEl && !cardEl.closest('button')) {
        const hasCardRole = cardEl.getAttribute('id')?.includes('card') || cardEl.tagName === 'ARTICLE';
        if (hasCardRole) {
          setMode('card');
          setContextLabel('View');
          return;
        }
      }

      // 5. Images / Avatars
      const imgEl = target.closest('img, figure') as HTMLElement | null;
      if (imgEl) {
        setMode('image');
        setContextLabel('Photo');
        return;
      }

      // 6. Text Elements
      const textEl = target.closest(
        'h1, h2, h3, h4, h5, h6, p, span, li, strong, em, b, i, blockquote, label'
      ) as HTMLElement | null;
      if (textEl) {
        setMode('text');
        setContextLabel('');
        return;
      }

      // Default idle area
      setMode('default');
      setContextLabel('');
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  // Context-aware animation properties based on current mode
  const getOuterVariants = () => {
    switch (mode) {
      case 'button':
        return {
          width: 50,
          height: 50,
          scale: isClicking ? 0.85 : 1.15,
          borderColor: '#DE6828',
          borderWidth: 2,
          backgroundColor: 'rgba(222, 104, 40, 0.12)',
          borderRadius: 9999,
        };
      case 'card':
        return {
          width: 62,
          height: 62,
          scale: isClicking ? 0.9 : 1.1,
          borderColor: '#DE6828',
          borderWidth: 1.5,
          backgroundColor: 'rgba(222, 104, 40, 0.92)',
          borderRadius: 9999,
        };
      case 'image':
        return {
          width: 54,
          height: 54,
          scale: isClicking ? 0.88 : 1.05,
          borderColor: '#DE6828',
          borderWidth: 1.5,
          backgroundColor: 'rgba(222, 104, 40, 0.88)',
          borderRadius: 9999,
        };
      case 'link':
        return {
          width: 44,
          height: 44,
          scale: isClicking ? 0.85 : 1.25,
          borderColor: '#DE6828',
          borderWidth: 1.5,
          backgroundColor: 'rgba(222, 104, 40, 0.1)',
          borderRadius: 9999,
        };
      case 'text':
        return {
          width: 4,
          height: 24,
          scale: isClicking ? 0.8 : 1,
          borderColor: '#DE6828',
          borderWidth: 1.5,
          backgroundColor: '#DE6828',
          borderRadius: 2,
        };
      case 'input':
        return {
          width: 2,
          height: 22,
          scale: 1,
          borderColor: '#DE6828',
          borderWidth: 1,
          backgroundColor: '#DE6828',
          borderRadius: 1,
        };
      default:
        return {
          width: 32,
          height: 32,
          scale: isClicking ? 0.75 : 1,
          borderColor: 'rgba(222, 104, 40, 0.45)',
          borderWidth: 1,
          backgroundColor: 'transparent',
          borderRadius: 9999,
        };
    }
  };

  const getInnerVariants = () => {
    switch (mode) {
      case 'button':
      case 'link':
        return {
          scale: isClicking ? 0.7 : 1.3,
          backgroundColor: '#DE6828',
          opacity: 1,
        };
      case 'card':
      case 'image':
        return {
          scale: 0,
          backgroundColor: '#ffffff',
          opacity: 0,
        };
      case 'text':
      case 'input':
        return {
          scale: 0,
          backgroundColor: '#DE6828',
          opacity: 0,
        };
      default:
        return {
          scale: isClicking ? 0.6 : 1,
          backgroundColor: '#F4A261',
          opacity: 1,
        };
    }
  };

  const outerAnim = getOuterVariants();
  const innerAnim = getInnerVariants();

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* 
        ============================================================
        PAW PRINT TRAIL:
        Spawns along mouse path, rotated with movement vector, 
        smoothly appearing with a gentle imprint scale, then fading out.
        ============================================================
      */}
      <AnimatePresence>
        {pawSteps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.68, scale: step.scale }}
            exit={{ opacity: 0, scale: step.scale * 0.75 }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeOut' },
              scale: { duration: 0.25, ease: 'backOut' },
            }}
            style={{
              left: step.x,
              top: step.y,
              transform: `translate(-50%, -50%) rotate(${step.angle}deg)`,
            }}
            className="fixed pointer-events-none text-[#DE6828]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-[#DE6828]/70 drop-shadow-[0_1px_2px_rgba(222,104,40,0.15)]"
              aria-hidden="true"
            >
              {/* 4 toe pads */}
              <ellipse cx="6.5" cy="8" rx="1.8" ry="2.5" />
              <ellipse cx="11" cy="5.5" rx="1.9" ry="2.7" />
              <ellipse cx="15.5" cy="6" rx="1.8" ry="2.6" />
              <ellipse cx="19" cy="9.5" rx="1.6" ry="2.2" />
              {/* main pad */}
              <path d="M12 11.5c-3 0-5.4 2-5.1 5 .2 2 2 3.7 5.1 3.7s4.9-1.7 5.1-3.7c.3-3-2.1-5-5.1-5z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 1. Outer Context-Aware Follower Container */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: outerAnim.width,
          height: outerAnim.height,
          scale: outerAnim.scale,
          borderColor: outerAnim.borderColor,
          borderWidth: outerAnim.borderWidth,
          backgroundColor: outerAnim.backgroundColor,
          borderRadius: outerAnim.borderRadius,
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 25,
          mass: 0.4,
        }}
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none"
      >
        {/* Context badge label (e.g. "View" on cards, "Photo" on images, "Enter" on entry button) */}
        <AnimatePresence>
          {contextLabel && (mode === 'card' || mode === 'image') && (
            <motion.span
              key={contextLabel}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-semibold text-white tracking-wider uppercase select-none pointer-events-none"
            >
              {contextLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 2. Inner Center Ball: Tracks mouse directly, morphs or dissolves depending on context */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: innerAnim.scale,
          backgroundColor: innerAnim.backgroundColor,
          opacity: innerAnim.opacity,
        }}
        transition={{
          duration: 0.14,
          ease: 'easeOut',
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none"
      />
    </div>
  );
};
