import React from 'react';
import { User, Bell, ShieldCheck } from 'lucide-react';

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
  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 lg:px-8 pt-3 pb-2 transition-all">
      {/* Outer floating realistic glass bar */}
      <div className="w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl bg-[#FAF6F0]/50 backdrop-blur-xl saturate-[180%] border border-white/60 shadow-[0_8px_32px_0_rgba(38,23,14,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.9),inset_0_-1px_2px_0_rgba(232,221,203,0.3)] transition-all duration-300">
        <div className="px-4 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between">
          {/* Brand Logo with frosted backing */}
          <div
            id="nav-brand-logo"
            className="flex items-center gap-2.5 cursor-pointer select-none group py-1 px-2.5 -ml-2 rounded-xl hover:bg-white/40 active:bg-white/60 transition-all duration-200"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-white/80 to-white/30 backdrop-blur-md border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] flex items-center justify-center text-[#26170E] transition-transform group-hover:scale-105">
              <PawIcon className="w-5 h-5 text-[#26170E]" />
            </div>
            <span className="font-semibold text-xl tracking-tight text-[#26170E] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              SafePaws
            </span>
          </div>

          {/* Center Nav Links - Glass Pill */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/35 backdrop-blur-lg border border-white/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_2px_6px_rgba(0,0,0,0.02)] text-[14.5px] font-medium text-[#2E2018]">
            <button
              id="nav-how-it-works-btn"
              onClick={onOpenHowItWorks}
              className="px-4 py-1.5 rounded-full text-[#2E2018] hover:text-[#DE6828] hover:bg-white/60 active:bg-white/80 transition-all duration-200 cursor-pointer"
            >
              How it works
            </button>
            <button
              id="nav-community-btn"
              onClick={onOpenCommunity}
              className="px-4 py-1.5 rounded-full text-[#2E2018] hover:text-[#DE6828] hover:bg-white/60 active:bg-white/80 transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <span>Community</span>
              {activeAlertCount > 0 && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DE6828] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DE6828]" />
                </span>
              )}
            </button>
            <button
              id="nav-features-btn"
              onClick={onOpenFeatures}
              className="px-4 py-1.5 rounded-full text-[#2E2018] hover:text-[#DE6828] hover:bg-white/60 active:bg-white/80 transition-all duration-200 cursor-pointer"
            >
              Features
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5">
            {/* Quick Alert Bell button with glass shine */}
            <button
              id="header-alert-bell-btn"
              onClick={onOpenAlerts}
              title="Neighborhood Lost Pet Radar"
              className="relative p-2.5 rounded-xl text-[#3D2C22] bg-white/40 hover:bg-white/70 active:bg-white/90 backdrop-blur-md border border-white/70 shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Lost Pet Alerts"
            >
              <Bell className="w-4.5 h-4.5 text-[#3D2C22]" />
              {activeAlertCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#DE6828] rounded-full border-2 border-white shadow-sm" />
              )}
            </button>

            {/* Profile Avatar Button with frosted acrylic finish */}
            <button
              id="header-profile-avatar-btn"
              onClick={onOpenProfile}
              title="My Pets & Profile"
              className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#E5D5C2]/80 to-[#E5D5C2]/40 hover:from-[#E5D5C2] hover:to-[#DAC7B0] backdrop-blur-md flex items-center justify-center text-[#423126] transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.8)] cursor-pointer border border-white/70"
              aria-label="User Profile"
            >
              <User className="w-4.5 h-4.5 fill-[#3F2E23] text-[#3F2E23]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
