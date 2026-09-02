import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Users, MapPin, Shield, Radio, Heart, Bell, CheckCircle2, UserCheck } from 'lucide-react';
import { Pet, NeighborhoodAlert } from '../../types';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: NeighborhoodAlert[];
  pets: Pet[];
  onOpenAlert: (alert: NeighborhoodAlert) => void;
}

export const CommunityModal: React.FC<CommunityModalProps> = ({
  isOpen,
  onClose,
  alerts,
  pets,
  onOpenAlert,
}) => {
  const [isVolunteer, setIsVolunteer] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-3xl bg-[#FAF6F0] rounded-[28px] border border-[#E9DCcb] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-[#E8DCce] flex items-center justify-between bg-[#F4EDE2]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ECE0D2] flex items-center justify-center text-[#3D291E]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#241812] font-semibold">
                Neighborhood Safety Network
              </h2>
              <p className="text-xs text-[#6F5D52]">
                Oakridge, Elm Hills & Surrounding Districts
              </p>
            </div>
          </div>

          <button
            id="close-community-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-[#6E5A4D] hover:bg-[#E5D7C7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Top Community Stats Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E9DCcb] shadow-xs">
              <div className="flex items-center gap-2 text-[#DE6828] mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Connected Neighbors</span>
              </div>
              <div className="text-2xl font-bold font-serif text-[#241812]">138</div>
              <div className="text-xs text-[#7A6A5E] mt-0.5">Active in your 2.5km zone</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E9DCcb] shadow-xs">
              <div className="flex items-center gap-2 text-[#34A853] mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Protected Pets</span>
              </div>
              <div className="text-2xl font-bold font-serif text-[#241812]">246</div>
              <div className="text-xs text-[#7A6A5E] mt-0.5">Equipped with SafePaws Smart QR</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E9DCcb] shadow-xs">
              <div className="flex items-center gap-2 text-[#DE6828] mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Reunion Rate</span>
              </div>
              <div className="text-2xl font-bold font-serif text-[#241812]">98.4%</div>
              <div className="text-xs text-[#7A6A5E] mt-0.5">Average reunion under 3 hours</div>
            </div>
          </div>

          {/* Active Neighborhood Pet Alerts */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#3E2D22] uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-[#DE6828]" />
                <span>Active Search Broadcasts</span>
              </h3>
              <span className="text-xs text-[#7A6A5E]">{alerts.length} active in area</span>
            </div>

            {alerts.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl border border-[#E9DCcb] text-center text-sm text-[#7A6A5E]">
                No missing pet alerts active right now in your neighborhood. All companions are safe!
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.map((al) => (
                  <div
                    key={al.id}
                    onClick={() => onOpenAlert(al)}
                    className="bg-white p-4 rounded-2xl border border-[#E9DCcb] hover:border-[#DE6828] transition-all flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center gap-3.5 w-full sm:w-auto">
                      <img
                        src={al.photoUrl}
                        alt={al.petName}
                        className="w-14 h-14 rounded-xl object-cover border border-[#E3D3C1]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-[#241812]">{al.petName}</span>
                          <span className="text-xs text-[#7A6A5E]">({al.breed})</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#FCE3D2] text-[#B95217] text-[10px] font-bold uppercase">
                            Missing
                          </span>
                        </div>
                        <p className="text-xs text-[#524137] mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#DE6828]" />
                          <span>Last seen: {al.lastSeenAddress} ({al.timeAgo})</span>
                        </p>
                      </div>
                    </div>

                    <button
                      id={`view-broadcast-btn-${al.id}`}
                      className="px-4 py-2 rounded-full bg-[#DE6828] hover:bg-[#C9581B] text-white text-xs font-bold shrink-0 transition-colors"
                    >
                      View Search Radar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Volunteer Status Toggle */}
          <div className="bg-[#EDE0D2] p-5 rounded-2xl border border-[#DCCEC0] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#241812]">
                <UserCheck className="w-5 h-5 text-[#DE6828]" />
              </div>
              <div>
                <div className="font-bold text-sm text-[#241812]">Neighborhood Volunteer Responder</div>
                <div className="text-xs text-[#625146]">Receive notifications when a neighbor loses a pet within 3km</div>
              </div>
            </div>

            <button
              id="volunteer-toggle-btn"
              onClick={() => setIsVolunteer(!isVolunteer)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isVolunteer
                  ? 'bg-[#34A853] text-white shadow-xs'
                  : 'bg-white text-[#4A392F] border border-[#C5B5A5]'
              }`}
            >
              {isVolunteer ? '✓ Active Volunteer' : 'Join as Volunteer'}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
