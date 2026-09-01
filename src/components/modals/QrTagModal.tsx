import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, QrCode, Phone, MapPin, Heart, Shield, Share2, Check, Download, Eye, ExternalLink } from 'lucide-react';
import { Pet } from '../../types';
import { PawIcon } from '../Header';

interface QrTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: Pet;
  onReportSighting?: (location: string, note: string) => void;
}

export const QrTagModal: React.FC<QrTagModalProps> = ({
  isOpen,
  onClose,
  pet,
  onReportSighting,
}) => {
  const [activeTab, setActiveTab] = useState<'tag' | 'stranger_preview'>('tag');
  const [gpsSent, setGpsSent] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleShareGps = () => {
    setGpsSent(true);
    if (onReportSighting) {
      onReportSighting('Current Mobile GPS · Near Elm St & 5th Ave', 'Kind neighbor scanned QR collar badge');
    }
    setTimeout(() => {
      alert(`Location sent! ${pet.ownerName} has received your current GPS pin and a notification.`);
    }, 400);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://safepaws.app/tag/${pet.qrTagId}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-2xl bg-[#FAF6F0] rounded-[28px] border border-[#E9DCcb] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#E8DCce] flex items-center justify-between bg-[#F4EDE2]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D7ECEB] flex items-center justify-center text-[#1E3B3A]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#241812] font-semibold">
                Smart QR Collar Tag
              </h2>
              <p className="text-xs text-[#6F5D52]">
                Instant contact with no app download required for rescuers
              </p>
            </div>
          </div>

          <button
            id="close-qrtag-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-[#6E5A4D] hover:bg-[#E5D7C7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="px-6 pt-4 flex gap-2 border-b border-[#E9DEC]">
          <button
            id="tab-collar-tag-btn"
            onClick={() => setActiveTab('tag')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'tag'
                ? 'border-[#DE6828] text-[#DE6828]'
                : 'border-transparent text-[#7B685C] hover:text-[#241812]'
            }`}
          >
            Collar Tag Preview
          </button>
          <button
            id="tab-stranger-preview-btn"
            onClick={() => setActiveTab('stranger_preview')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'stranger_preview'
                ? 'border-[#DE6828] text-[#DE6828]'
                : 'border-transparent text-[#7B685C] hover:text-[#241812]'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Simulate Finder/Stranger Scan</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {activeTab === 'tag' ? (
            /* Collar Tag Print / Preview */
            <div className="flex flex-col items-center text-center space-y-6">
              
              {/* The Physical Tag Replica */}
              <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-[#F5E6D3] via-[#E8D4BE] to-[#D7BFA5] p-2.5 shadow-xl border-4 border-white/80 flex items-center justify-center">
                {/* Hole punch for collar ring */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#34241B] shadow-inner border border-[#ECCEB1]" />

                {/* Inner Tag Disc */}
                <div className="w-full h-full rounded-full bg-[#FAF6F0] p-4 flex flex-col items-center justify-center border border-[#E3D1BE]">
                  <div className="flex items-center gap-1 text-[#241812] mb-1">
                    <PawIcon className="w-4 h-4 text-[#DE6828]" />
                    <span className="font-bold text-xs tracking-tight">SafePaws</span>
                  </div>

                  {/* Simulated QR Code Canvas */}
                  <div className="p-2 bg-white rounded-xl shadow-xs border border-[#E0D0BD] my-1">
                    {/* SVG Stylized QR code */}
                    <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#241812]">
                      <rect x="5" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="4" />
                      <rect x="13" y="13" width="12" height="12" fill="currentColor" rx="2" />
                      <rect x="67" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="4" />
                      <rect x="75" y="13" width="12" height="12" fill="currentColor" rx="2" />
                      <rect x="5" y="67" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="4" />
                      <rect x="13" y="75" width="12" height="12" fill="currentColor" rx="2" />
                      
                      {/* Grid Pattern Dots */}
                      <rect x="42" y="8" width="6" height="6" fill="currentColor" />
                      <rect x="52" y="18" width="6" height="6" fill="currentColor" />
                      <rect x="42" y="28" width="6" height="6" fill="currentColor" />
                      <rect x="8" y="42" width="6" height="6" fill="currentColor" />
                      <rect x="18" y="52" width="6" height="6" fill="currentColor" />
                      <rect x="42" y="42" width="16" height="16" fill="#DE6828" rx="3" />
                      <rect x="67" y="42" width="6" height="6" fill="currentColor" />
                      <rect x="78" y="52" width="6" height="6" fill="currentColor" />
                      <rect x="42" y="67" width="6" height="6" fill="currentColor" />
                      <rect x="54" y="78" width="6" height="6" fill="currentColor" />
                      <rect x="67" y="78" width="8" height="8" fill="currentColor" />
                      <rect x="85" y="85" width="6" height="6" fill="currentColor" />
                    </svg>
                  </div>

                  <div className="font-bold text-sm text-[#241812] tracking-tight">{pet.name}</div>
                  <div className="text-[10px] font-mono text-[#8C7B70] tracking-wider">{pet.qrTagId}</div>
                  <div className="text-[9px] text-[#DE6828] font-bold uppercase mt-0.5">Scan to help me home</div>
                </div>
              </div>

              <div className="max-w-md">
                <h3 className="font-semibold text-lg text-[#241812]">
                  Tag Linked to {pet.name} ({pet.breed})
                </h3>
                <p className="text-sm text-[#6E5A4D] mt-1">
                  When scanned with any smartphone camera, the finder instantly sees your emergency contact number and can send you their exact location.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                <button
                  id="tag-copy-link-btn"
                  onClick={handleCopyLink}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-[#F0E6D8] border border-[#DECFBD] text-sm font-semibold text-[#241812] inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-[#34A853]" /> : <Share2 className="w-4 h-4 text-[#DE6828]" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Web Tag URL'}</span>
                </button>

                <button
                  id="simulate-scan-trigger-btn"
                  onClick={() => setActiveTab('stranger_preview')}
                  className="px-6 py-2.5 rounded-full bg-[#DE6828] hover:bg-[#C9581B] text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  <span>Test Finder Scan View</span>
                </button>
              </div>
            </div>
          ) : (
            /* Stranger / Finder Scan Landing Page */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DCcb] shadow-sm space-y-6">
              <div className="text-center pb-4 border-b border-[#F0E6D8]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7ECEB] text-[#1E3B3A] text-xs font-bold uppercase tracking-wider mb-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span>SafePaws Emergency Tag Scanned</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#241812] font-semibold">
                  You found {pet.name}!
                </h3>
                <p className="text-sm text-[#6E5A4D] mt-1">
                  Thank you for helping! {pet.ownerName} is waiting for {pet.name} to come home safely.
                </p>
              </div>

              {/* Pet Quick Info */}
              <div className="flex items-center gap-4 bg-[#FAF6F0] p-4 rounded-2xl border border-[#EBE0D2]">
                <img
                  src={pet.photoUrl}
                  alt={pet.name}
                  className="w-20 h-20 rounded-xl object-cover border border-[#E2D4C3]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-lg text-[#241812]">{pet.name}</div>
                  <div className="text-xs text-[#7A6A5E]">{pet.breed} · {pet.color}</div>
                  <div className="text-xs text-[#2E7D32] font-semibold mt-1">
                    Home Base: {pet.neighborhood}
                  </div>
                </div>
              </div>

              {/* Medical / Care Notes */}
              {pet.medicalNotes && (
                <div className="p-3.5 rounded-xl bg-[#FFF8E1] border border-[#FFE082] text-xs text-[#795548] leading-relaxed">
                  <span className="font-bold">Care Notice:</span> {pet.medicalNotes}
                </div>
              )}

              {/* 1-Tap Finder Actions */}
              <div className="space-y-3">
                <a
                  href={`tel:${pet.ownerPhone}`}
                  id="finder-call-owner-btn"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#34A853] hover:bg-[#2E9447] text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-md transition-colors"
                >
                  <Phone className="w-5 h-5 fill-white" />
                  <span>Call Owner ({pet.ownerPhone})</span>
                </a>

                <button
                  id="finder-share-gps-btn"
                  onClick={handleShareGps}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer border ${
                    gpsSent
                      ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]'
                      : 'bg-[#DE6828] hover:bg-[#C9581B] text-white border-transparent shadow-md'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span>{gpsSent ? 'GPS Location Shared with Owner!' : 'Send My GPS Pin to Owner'}</span>
                </button>
              </div>

              <div className="text-center text-xs text-[#8A796E]">
                SafePaws protects your privacy. No personal data is stored on public devices.
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
