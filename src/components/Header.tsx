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
    <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-6 flex items-center justify-between">
      {/* Brand Logo */}
      <div
        id="nav-brand-logo"
        className="flex items-center gap-2.5 cursor-pointer select-none group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="text-[#26170E] transition-transform group-hover:scale-105">
          <PawIcon className="w-6 h-6 text-[#26170E]" />
        </div>
        <span className="font-semibold text-xl tracking-tight text-[#26170E]">
          SafePaws
        </span>
      </div>

      {/* Center Nav Links */}
      <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#2E2018]">
        <button
          id="nav-how-it-works-btn"
          onClick={onOpenHowItWorks}
          className="text-[#2E2018] hover:text-[#DE6828] transition-colors cursor-pointer py-1"
        >
          How it works
        </button>
        <button
          id="nav-community-btn"
          onClick={onOpenCommunity}
          className="text-[#2E2018] hover:text-[#DE6828] transition-colors cursor-pointer py-1 flex items-center gap-1.5"
        >
          <span>Community</span>
          {activeAlertCount > 0 && (
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#DE6828] animate-pulse" />
          )}
        </button>
        <button
          id="nav-features-btn"
          onClick={onOpenFeatures}
          className="text-[#2E2018] hover:text-[#DE6828] transition-colors cursor-pointer py-1"
        >
          Features
        </button>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Alert Bell button */}
        <button
          id="header-alert-bell-btn"
          onClick={onOpenAlerts}
          title="Neighborhood Lost Pet Radar"
          className="relative p-2.5 rounded-full text-[#453328] hover:bg-[#EFE5D8]/80 transition-all cursor-pointer"
          aria-label="Lost Pet Alerts"
        >
          <Bell className="w-5 h-5 text-[#3D2C22]" />
          {activeAlertCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#DE6828] rounded-full border-2 border-[#FAF6F0]" />
          )}
        </button>

        {/* Profile Avatar Button */}
        <button
          id="header-profile-avatar-btn"
          onClick={onOpenProfile}
          title="My Pets & Profile"
          className="w-10 h-10 rounded-full bg-[#E5D5C2] hover:bg-[#DAC7B0] flex items-center justify-center text-[#423126] transition-transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer border border-[#D8C5B0]"
          aria-label="User Profile"
        >
          <User className="w-5 h-5 fill-[#3F2E23] text-[#3F2E23]" />
        </button>
      </div>
    </header>
  );
};
