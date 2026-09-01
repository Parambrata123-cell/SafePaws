import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

export type CursorMode = 'default' | 'button' | 'text' | 'card' | 'input' | 'image' | 'link';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [contextLabel, setContextLabel] = useState<string>('');
  const [isClicking, setIsClicking] = useState(false);

  // Raw mouse coordinates: Instant tracking for the center dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fluid physics spring for the outer trailing circle
  const springConfig = { damping: 25, stiffness: 290, mass: 0.45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      const curX = e.clientX;
      const curY = e.clientY;

      mouseX.set(curX);
      mouseY.set(curY);

      // --- CONTEXT-AWARE HOVER DETECTION ---
      const target = e.target as HTMLElement | null;
      if (!target) {
        setMode('default');
        setContextLabel('');
        return;
      }

      // Explicit data-cursor attributes
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
          setContextLabel(customLabel || 'Photo');
          return;
        }
      }

      // 1. Interactive Buttons / Role buttons
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

      // 4. Cards & Articles
      const cardEl = target.closest('[id*="-card"], article') as HTMLElement | null;
      if (cardEl && !cardEl.closest('button')) {
        setMode('card');
        setContextLabel('View');
        return;
      }

      // 5. Images & Visual media
      const imgEl = target.closest('img, figure') as HTMLElement | null;
      if (imgEl) {
        setMode('image');
        setContextLabel('Photo');
        return;
      }

      // 6. Text Elements (headings, paragraphs, blockquotes)
      const textEl = target.closest(
        'h1, h2, h3, h4, h5, h6, p, span, li, strong, em, b, i, blockquote, label'
      ) as HTMLElement | null;
      if (textEl) {
        setMode('text');
        setContextLabel('');
        return;
      }

      // Default empty background area
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

  // Context-aware dynamic variants for the outer trailing follower
  const getOuterVariants = () => {
    switch (mode) {
      case 'button':
        return {
          width: 52,
          height: 52,
          scale: isClicking ? 0.86 : 1.2,
          borderColor: '#DE6828',
          borderWidth: 2,
          backgroundColor: 'rgba(222, 104, 40, 0.12)',
          borderRadius: 9999,
        };
      case 'card':
        return {
          width: 64,
          height: 64,
          scale: isClicking ? 0.9 : 1.1,
          borderColor: '#DE6828',
          borderWidth: 1.5,
          backgroundColor: 'rgba(222, 104, 40, 0.92)',
          borderRadius: 9999,
        };
      case 'image':
        return {
          width: 56,
          height: 56,
          scale: isClicking ? 0.88 : 1.05,
          borderColor: '#DE6828',
          borderWidth: 1.5,
          backgroundColor: 'rgba(222, 104, 40, 0.88)',
          borderRadius: 9999,
        };
      case 'link':
        return {
          width: 46,
          height: 46,
          scale: isClicking ? 0.85 : 1.25,
          borderColor: '#DE6828',
          borderWidth: 1.5,
          backgroundColor: 'rgba(222, 104, 40, 0.12)',
          borderRadius: 9999,
        };
      case 'text':
        return {
          width: 28,
          height: 28,
          scale: isClicking ? 0.8 : 1,
          borderColor: 'rgba(222, 104, 40, 0.4)',
          borderWidth: 1,
          backgroundColor: 'rgba(222, 104, 40, 0.04)',
          borderRadius: 9999,
        };
      case 'input':
        return {
          width: 32,
          height: 32,
          scale: 1,
          borderColor: '#DE6828',
          borderWidth: 1.5,
          backgroundColor: 'rgba(222, 104, 40, 0.08)',
          borderRadius: 9999,
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
          scale: isClicking ? 0.6 : 0.9,
          backgroundColor: '#DE6828',
          opacity: 0.9,
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
      {/* 1. Outer Context-Aware Trailing Ring & Morphing Surface */}
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
        {/* Context-aware badge label (e.g., "View" over cards, "Photo" over images, "Enter" over the portal trigger) */}
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

      {/* 2. Inner Pointer Dot: Responsive real-time tracking with hover morphing */}
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
