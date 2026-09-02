import React from 'react';
import { PawIcon } from './Header';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenGuidelines?: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenGuidelines,
  onOpenContact,
}) => {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-12 pt-8">
      {/* Subtle top divider line matching the design */}
      <div className="w-full h-px bg-[#E5D7C7] mb-8" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-[14px] text-[#4A3B31]">
        {/* Left: Brand */}
        <div
          id="footer-brand-logo"
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="SafePaws"
        >
          <PawIcon className="w-5 h-5 text-[#241812] transition-transform group-hover:scale-105" />
          <span className="font-semibold text-[17px] tracking-tight text-[#241812]">
            SafePaws
          </span>
        </div>

        {/* Center: Essential Links */}
        <div className="flex items-center gap-6 sm:gap-8 font-medium text-[14px]">
          <button
            id="footer-privacy-btn"
            onClick={onOpenPrivacy}
            className="hover:text-[#DE6828] transition-colors cursor-pointer text-[#4A3B31]"
          >
            Privacy
          </button>
          <button
            id="footer-guidelines-btn"
            onClick={onOpenGuidelines}
            className="hover:text-[#DE6828] transition-colors cursor-pointer text-[#4A3B31]"
          >
            Community guidelines
          </button>
          <button
            id="footer-contact-btn"
            onClick={onOpenContact}
            className="hover:text-[#DE6828] transition-colors cursor-pointer text-[#4A3B31]"
          >
            Contact
          </button>
        </div>

        {/* Right: Copyright */}
        <div className="text-[#6E5C52] text-[13px] sm:text-[14px] font-normal">
          © 2026 SafePaws
        </div>
      </div>
    </footer>
  );
};
