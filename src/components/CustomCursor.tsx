import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const [isOverNav, setIsOverNav] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth trailing outer ring
  const springConfig = { damping: 24, stiffness: 200, mass: 0.6 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show on devices with mouse pointer
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        // Check if hovering header/navbar
        const inNav = Boolean(target.closest('header, nav, [id*="nav-"], [id*="header-"]'));
        setIsOverNav(inNav);

        // Check if hovering interactive elements
        const isInteractive = Boolean(
          target.closest('button, a, input, textarea, select, [role="button"], [id*="-btn"], [id*="-card"], .cursor-pointer')
        );
        setIsPointer(isInteractive);

        // Check if hovering textual elements
        const textContainer = target.closest('p, h1, h2, h3, h4, h5, h6, span, label, li, strong, em, b, i, blockquote, small, article, figcaption');
        const hasTextDirectly = Array.from(target.childNodes).some(
          (node) => node.nodeType === Node.TEXT_NODE && (node.textContent || '').trim().length > 0
        );
        const isText = Boolean((textContainer || hasTextDirectly) && !isInteractive);
        setIsOverText(isText);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* 1. Outer Ring: Smooth trailing spring motion without blur distortion */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
        }}
        animate={{
          scale: isMouseDown ? 0.8 : isPointer ? 1.45 : (isOverText || isOverNav) ? 1.15 : 1,
          borderColor: isPointer
            ? '#C84E0C'
            : (isOverText || isOverNav)
            ? 'rgba(238, 140, 78, 0.55)'
            : 'rgba(244, 162, 97, 0.45)',
          backgroundColor: isPointer
            ? 'rgba(200, 78, 12, 0.15)'
            : (isOverText || isOverNav)
            ? 'transparent'
            : 'rgba(244, 162, 97, 0.08)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border shadow-[0_0_12px_rgba(244,162,97,0.15)] pointer-events-none"
      />

      {/* 2. Inner Dot / Ball: Real-time immediate mouse tracking */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isMouseDown ? 0.6 : isPointer ? 1.3 : (isOverText || isOverNav) ? 0.95 : 1,
          backgroundColor: isPointer ? '#C84E0C' : '#F49E5D',
        }}
        transition={{ duration: 0.12 }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#F49E5D] shadow-[0_1px_4px_rgba(200,78,12,0.25)] pointer-events-none"
      />
    </div>
  );
};
