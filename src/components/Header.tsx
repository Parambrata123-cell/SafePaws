import React, { useState } from 'react';
import { User, Bell, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  onOpenHowItWorks: () => void;
  onOpenCommunity: () => void;
  onOpenFeatures: () => void;
  onOpenProfile: () => void;
  onOpenAlerts: () => void;
  activeAlertCount?: number;
}

export const PawIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    {/* 4 toe pads */}
    <ellipse cx="6.5" cy="8" rx="2" ry="2.8" />
    <ellipse cx="11" cy="5.5" rx="2.1" ry="3" />
    <ellipse cx="15.5" cy="6" rx="2" ry="2.9" />
    <ellipse cx="19" cy="9.5" rx="1.8" ry="2.5" />
    {/* main pad */}
    <path d="M12 11.5c-3.2 0-5.8 2.2-5.5 5.5.2 2.2 2.2 4 5.5 4s5.3-1.8 5.5-4c.3-3.3-2.3-5.5-5.5-5.5z" />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  onOpenHowItWorks,
  onOpenCommunity,
  onOpenFeatures,
  onOpenProfile,
  onOpenAlerts,
  activeAlertCount = 1,
}) => {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navItems = [
    { id: 'how-it-works', label: 'How it works', action: onOpenHowItWorks },
    { id: 'community', label: 'Community', action: onOpenCommunity, hasBadge: true },
    { id: 'features', label: 'Features', action: onOpenFeatures },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 lg:px-8 pt-4 pb-2 transition-all">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div
          id="nav-brand-logo"
          className="flex items-center gap-2.5 cursor-pointer select-none group py-1.5 px-3 rounded-2xl hover:bg-[#FAF3EA]/80 transition-all duration-200"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 rounded-xl bg-white border border-[#E8DEC8]/80 shadow-[0_2px_8px_rgba(38,23,14,0.06)] flex items-center justify-center text-[#26170E] transition-transform group-hover:scale-105">
            <PawIcon className="w-5 h-5 text-[#26170E]" />
          </div>
          <span className="font-semibold text-xl tracking-tight text-[#26170E]">
            SafePaws
          </span>
        </div>

        {/* Center Nav Links - Inside small oval pill */}
        <nav
          onMouseLeave={() => setHoveredNav(null)}
          className="hidden md:flex items-center gap-2 py-1.5 px-6 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_2px_12px_rgba(38,23,14,0.05),inset_0_1px_2px_rgba(255,255,255,0.9)] text-[14.5px] font-medium"
        >
          {navItems.map((item) => {
            const isHovered = hoveredNav === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}-btn`}
                onClick={item.action}
                onMouseEnter={() => setHoveredNav(item.id)}
                className="relative px-5 py-2 rounded-full cursor-pointer transition-colors duration-200 select-none"
              >
                {/* Sliding Glass Background Pill */}
                {isHovered && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-white/95 to-white/75 backdrop-blur-md border border-white shadow-[0_4px_16px_rgba(222,104,40,0.12),inset_0_1px_1px_rgba(255,255,255,1)]"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32,
                    }}
                  />
                )}

                {/* Button Content */}
                <span
                  className={`relative z-10 flex items-center gap-2 transition-all duration-200 ${
                    isHovered
                      ? 'text-[#DE6828] font-semibold translate-y-[-0.5px]'
                      : 'text-[#2E2018]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasBadge && activeAlertCount > 0 && (
                    <span className="relative flex h-2 w-2">
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full bg-[#DE6828] ${
                          isHovered ? 'animate-ping opacity-90 scale-125' : 'animate-ping opacity-75'
                        }`}
                      />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DE6828] shadow-[0_0_6px_rgba(222,104,40,0.8)]" />
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick Alert Bell button */}
          <motion.button
            id="header-alert-bell-btn"
            onClick={onOpenAlerts}
            title="Neighborhood Lost Pet Radar"
            whileHover="hover"
            whileTap={{ scale: 0.92 }}
            className="relative p-2.5 rounded-xl text-[#3D2C22] bg-white/70 hover:bg-white active:bg-white backdrop-blur-md border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_4px_20px_rgba(222,104,40,0.18)] transition-all duration-300 cursor-pointer group"
            aria-label="Lost Pet Alerts"
          >
            {/* Dynamic light sheen reflection on hover */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            </div>

            {/* Animated Chime Bell Icon */}
            <motion.div
              variants={{
                hover: {
                  rotate: [0, -14, 12, -8, 4, 0],
                  transition: { duration: 0.55, ease: 'easeInOut' },
                },
              }}
              className="relative z-10 origin-top"
            >
              <Bell className="w-4.5 h-4.5 text-[#3D2C22] group-hover:text-[#DE6828] transition-colors duration-200" />
            </motion.div>

            {/* Notification Badge */}
            {activeAlertCount > 0 && (
              <motion.span
                variants={{
                  hover: { scale: 1.25 },
                }}
                className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#DE6828] group-hover:bg-[#E85514] rounded-full border-2 border-white shadow-[0_0_8px_rgba(222,104,40,0.6)] z-20 transition-colors"
              />
            )}
          </motion.button>

          {/* Profile Avatar Button */}
          <motion.button
            id="header-profile-avatar-btn"
            onClick={onOpenProfile}
            title="My Pets & Profile"
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.94 }}
            className="relative w-10 h-10 rounded-xl bg-gradient-to-b from-[#EFE3D3] to-[#E0CEB7] hover:from-[#FAF2E8] hover:to-[#E8D9C5] backdrop-blur-md flex items-center justify-center text-[#423126] transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.85)] hover:shadow-[0_6px_22px_rgba(38,23,14,0.12)] hover:ring-2 hover:ring-[#DE6828]/25 cursor-pointer border border-white/70 hover:border-white group overflow-hidden"
            aria-label="User Profile"
          >
            {/* Glass sheen flash on hover */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </div>

            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            >
              <User className="w-4.5 h-4.5 fill-[#3F2E23] text-[#3F2E23] group-hover:fill-[#DE6828] group-hover:text-[#DE6828] transition-colors duration-200" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
