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
}

interface ClickBurstPaw {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  rotation: number;
  scale: number;
}

interface CustomCursorProps {
  isModalOpen?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isModalOpen = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [contextLabel, setContextLabel] = useState<string>('');
  const [isClicking, setIsClicking] = useState(false);

  // Paw prints history (walking trail)
  const [pawSteps, setPawSteps] = useState<PawStep[]>([]);
  // Jumping paw prints on click (burst)
  const [clickBursts, setClickBursts] = useState<ClickBurstPaw[]>([]);
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
  const springConfig = { damping: 25, stiffness: 290, mass: 0.45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Helper to check if a screen coordinate is inside the hero radar or central circular portions
  const isPointInCircularPortion = (px: number, py: number): boolean => {
    try {
      // 1. Check DOM element at point
      const el = document.elementFromPoint(px, py) as HTMLElement | null;
      if (
        el &&
        el.closest(
          '#hero-circular-container, [data-no-paw-print], #hero-center-circular-disc, [data-circular-portion]'
        )
      ) {
        return true;
      }

      // 2. Geometric circle radius calculation (prevents pointer-events-none transparency leak)
      const circularTargets = document.querySelectorAll(
        '#hero-circular-container, [data-no-paw-print], #hero-center-circular-disc, [data-circular-portion]'
      );
      for (let i = 0; i < circularTargets.length; i++) {
        const target = circularTargets[i];
        const rect = target.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          // Radius with a safe perimeter buffer
          const radius = Math.max(rect.width, rect.height) / 2 + 10;
          const distance = Math.hypot(px - centerX, py - centerY);
          if (distance <= radius) {
            return true;
          }
        }
      }
    } catch {
      return false;
    }
    return false;
  };

  // Clear paw prints when a modal opens
  useEffect(() => {
    if (isModalOpen) {
      setPawSteps([]);
    }
  }, [isModalOpen]);

  // Clean up faded paw prints and click bursts automatically
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setPawSteps((prev) => {
        if (prev.length === 0) return prev;
        // Keep steps created within the last 650ms so old prints fade fast
        const filtered = prev.filter((p) => now - p.id < 650);
        return filtered.length === prev.length ? prev : filtered;
      });

      setClickBursts((prev) => {
        if (prev.length === 0) return prev;
        // Keep click bursts created within the last 700ms
        const filtered = prev.filter((b) => now - b.id < 700);
        return filtered.length === prev.length ? prev : filtered;
      });
    }, 50);

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

      // --- TARGET CHECK FOR RESTRICTING PAW PRINTS OVER CONTENT & BUTTONS ---
      const target = e.target as HTMLElement | null;

      // Helper function to check if a specific element or its ancestors are interactive elements or text/content
      const isElementContentOrButton = (el: HTMLElement | null): boolean => {
        if (!el) return false;
        // If the element is purely the EnterScreen background or html/body/main background container, allow paw prints
        if (
          el.id === 'enter-screen-bg' ||
          el.classList.contains('enter-screen-bg') ||
          el.tagName === 'HTML' ||
          el.tagName === 'BODY'
        ) {
          return false;
        }

        // Restrict if el is or is inside a button, link, input, card, dialog, header, footer, or text block
        const matched = el.closest(
          'button, [role="button"], a, input, textarea, select, ' +
          '[id*="-btn"], [id*="-card"], article, form, [role="dialog"], ' +
          'header, nav, footer, p, h1, h2, h3, h4, h5, h6, ' +
          'span, label, strong, em, b, i, img, svg, figure, ' +
          '[data-cursor], [data-content], [data-enter-content], ' +
          '[data-no-paw-print], [data-circular-portion], #hero-circular-container, #hero-center-circular-disc'
        );

        return Boolean(matched);
      };

      const isOverInteractiveOrContent = isElementContentOrButton(target);

      // --- PAW-PRINT TRAIL LOGIC ---
      const last = lastPawRef.current;

      // First initialization of mouse position
      if (last.x === -999) {
        lastPawRef.current = { x: curX, y: curY, time: now, stepCount: 0 };
      } else {
        const dx = curX - last.x;
        const dy = curY - last.y;
        const dist = Math.hypot(dx, dy);

        // Stride distance between individual paw footprints
        const STEP_DISTANCE = 32;

        if (dist >= STEP_DISTANCE) {
          // When moving faster, dist can be much larger than STEP_DISTANCE (e.g. 80px-300px per mouse event).
          // We calculate how many steps occurred along the travel path so fast movement produces
          // a full, unbroken trail of paw prints instead of skipping or choking.
          const numSteps = Math.min(Math.floor(dist / STEP_DISTANCE), 6);
          const movementAngleDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

          const newStepsToAdd: PawStep[] = [];
          let currentStepCount = last.stepCount;

          for (let i = 1; i <= numSteps; i++) {
            const fraction = i / numSteps;
            const interpX = last.x + dx * fraction;
            const interpY = last.y + dy * fraction;

            // Alternate left and right footfalls perpendicular to movement vector
            const isRight = currentStepCount % 2 === 1;
            const lateralOffset = 6;
            const perpAngle = Math.atan2(dy, dx) + (isRight ? Math.PI / 2 : -Math.PI / 2);
            const spawnX = interpX + Math.cos(perpAngle) * lateralOffset;
            const spawnY = interpY + Math.sin(perpAngle) * lateralOffset;

            currentStepCount++;

            // Strict check: paw print must only spawn if on open background, never over buttons, content, circular portions, or active modals
            const elemAtSpawn = document.elementFromPoint(spawnX, spawnY) as HTMLElement | null;
            const isSpawnOverContent =
              isModalOpen ||
              isElementContentOrButton(elemAtSpawn) ||
              isPointInCircularPortion(spawnX, spawnY);

            if (!isSpawnOverContent) {
              newStepsToAdd.push({
                id: now + i, // Unique timestamp key
                x: spawnX,
                y: spawnY,
                angle: movementAngleDeg, // Fingers and toes face the exact movement direction
                side: isRight ? 'right' : 'left',
                scale: 0.95 + Math.random() * 0.1,
              });
            }
          }

          // Advance reference to current mouse position
          lastPawRef.current = {
            x: curX,
            y: curY,
            time: now,
            stepCount: currentStepCount,
          };

          if (newStepsToAdd.length > 0) {
            setPawSteps((prev) => {
              const updated = [...prev, ...newStepsToAdd];
              // Keep up to 40 steps for a rich, continuous trail at any speed
              return updated.length > 40 ? updated.slice(updated.length - 40) : updated;
            });
          }
        }
      }

      // --- CONTEXT-AWARE HOVER DETECTION ---
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
        if (attrVal === 'Spin') {
          setMode('button');
          setContextLabel('Spin');
          return;
        }
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
        const hasCardRole = cardEl.getAttribute('id')?.includes('card') || cardEl.tagName === 'ARTICLE';
        if (hasCardRole) {
          setMode('card');
          setContextLabel('View');
          return;
        }
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

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);

      const clickX = e.clientX;
      const clickY = e.clientY;

      // Do NOT spawn click paw bursts over the circular portions or modals
      if (isPointInCircularPortion(clickX, clickY) || isModalOpen) {
        return;
      }

      // Spawn jumping light orange paw prints bursting outwards from click point
      const burstTimestamp = Date.now();

      // Create 5 paws jumping out in different directions
      const count = 5;
      const baseAngles = [ -75, -25, 25, 75, 180 ]; // fan out and upwards
      const newBursts: ClickBurstPaw[] = [];

      for (let i = 0; i < count; i++) {
        // distribute angles with slight organic variation
        const angleDeg = baseAngles[i] + (Math.random() * 20 - 10);
        const rad = (angleDeg * Math.PI) / 180;
        // distance to jump out: 35px to 60px
        const distance = 35 + Math.random() * 30;
        const targetX = Math.cos(rad) * distance;
        const targetY = Math.sin(rad) * distance;

        // Skip any burst particle if its landing point is inside the circular portion
        if (isPointInCircularPortion(clickX + targetX, clickY + targetY)) {
          continue;
        }

        newBursts.push({
          id: burstTimestamp + i,
          startX: clickX,
          startY: clickY,
          targetX,
          targetY,
          rotation: angleDeg + 90, // point paw forward in direction of jump
          scale: 0.85 + Math.random() * 0.35,
        });
      }

      if (newBursts.length > 0) {
        setClickBursts((prev) => [...prev.slice(-15), ...newBursts]);
      }
    };
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
    <>
      {/* 
        ============================================================
        PAW PRINT BACKGROUND LAYER:
        Rendered at z-[105] (above EnterScreen background canvas z-[100],
        but behind all interactive buttons, cards, text, and modals z-[110]+),
        ensuring footprints are clearly visible on the starting page background
        and main website background, but NEVER on buttons or text.
        ============================================================
      */}
      <div className="pointer-events-none fixed inset-0 z-[105] overflow-hidden select-none">
        <AnimatePresence>
          {pawSteps
            .filter((step) => !isPointInCircularPortion(step.x, step.y))
            .map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 0.92, scale: step.scale }}
              exit={{ opacity: 0, scale: step.scale * 0.95 }}
              transition={{
                opacity: { duration: 0.35, ease: 'easeOut' },
                scale: { duration: 0.08, ease: 'easeOut' },
              }}
              style={{
                position: 'fixed',
                left: step.x,
                top: step.y,
                x: '-50%',
                y: '-50%',
                rotate: step.angle,
              }}
              className="pointer-events-none text-[#A83806] origin-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4.5 h-4.5 text-[#B03C08] drop-shadow-[0_1.5px_3px_rgba(168,56,6,0.35)]"
                aria-hidden="true"
              >
                {/* 4 toe pads pointing toward the top (front) of the SVG */}
                <ellipse cx="6.5" cy="8" rx="1.8" ry="2.5" />
                <ellipse cx="11" cy="5.5" rx="1.9" ry="2.7" />
                <ellipse cx="15.5" cy="6" rx="1.8" ry="2.6" />
                <ellipse cx="19" cy="9.5" rx="1.6" ry="2.2" />
                {/* Main bottom pad */}
                <path d="M12 11.5c-3 0-5.4 2-5.1 5 .2 2 2 3.7 5.1 3.7s4.9-1.7 5.1-3.7c.3-3-2.1-5-5.1-5z" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 
        ============================================================
        CLICK BURST ANIMATION LAYER:
        When clicking on anything, light orange paw prints jump out
        in an energetic burst arc and gently fade away.
        ============================================================
      */}
      <div className="pointer-events-none fixed inset-0 z-[99998] overflow-hidden select-none">
        <AnimatePresence>
          {clickBursts.map((burst) => (
            <motion.div
              key={burst.id}
              initial={{
                opacity: 0.95,
                scale: 0.3,
                x: 0,
                y: 0,
                rotate: burst.rotation - 15,
              }}
              animate={{
                opacity: [0.95, 1, 0],
                scale: [0.3, burst.scale * 1.15, burst.scale * 0.9],
                x: burst.targetX,
                y: [0, burst.targetY - 14, burst.targetY], // arc trajectory upwards then landing
                rotate: [burst.rotation - 15, burst.rotation, burst.rotation + 10],
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1], // snappy jump out with smooth deceleration
                times: [0, 0.55, 1],
              }}
              style={{
                position: 'fixed',
                left: burst.startX,
                top: burst.startY,
                translateX: '-50%',
                translateY: '-50%',
              }}
              className="pointer-events-none origin-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-[#FDBA74] drop-shadow-[0_2px_4px_rgba(249,115,22,0.4)]"
                aria-hidden="true"
              >
                {/* 4 toe pads pointing toward top of paw */}
                <ellipse cx="6.5" cy="8" rx="1.8" ry="2.5" />
                <ellipse cx="11" cy="5.5" rx="1.9" ry="2.7" />
                <ellipse cx="15.5" cy="6" rx="1.8" ry="2.6" />
                <ellipse cx="19" cy="9.5" rx="1.6" ry="2.2" />
                {/* Main bottom pad */}
                <path d="M12 11.5c-3 0-5.4 2-5.1 5 .2 2 2 3.7 5.1 3.7s4.9-1.7 5.1-3.7c.3-3-2.1-5-5.1-5z" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 
        ============================================================
        CUSTOM CURSOR TOP LAYER:
        Always floats on top (z-[99999]) so mouse indicator and
        hover interactions are crisply visible over all content.
        ============================================================
      */}
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
          {/* Context-aware badge label */}
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
    </>
  );
};
