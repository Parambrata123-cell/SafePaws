import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Bell, MapPin, Users, Send, CheckCircle2, MessageSquare, AlertTriangle, Radio } from 'lucide-react';
import { Pet, NeighborhoodAlert, CommunitySighting } from '../../types';
import confetti from 'canvas-confetti';

interface LostAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: Pet;
  alert: NeighborhoodAlert;
  sightings: CommunitySighting[];
  onAddSighting: (sighting: CommunitySighting) => void;
  onResolveAlert: (alertId: string) => void;
}

export const LostAlertModal: React.FC<LostAlertModalProps> = ({
  isOpen,
  onClose,
  pet,
  alert,
  sightings,
  onAddSighting,
  onResolveAlert,
}) => {
  const [reporterName, setReporterName] = useState('');
  const [sightingLocation, setSightingLocation] = useState('');
  const [sightingNote, setSightingNote] = useState('');
  const [isResolved, setIsResolved] = useState(alert.status === 'resolved');

  if (!isOpen) return null;

  const handleSightingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sightingLocation || !sightingNote) return;

    const newSighting: CommunitySighting = {
      id: `sight-${Date.now()}`,
      alertId: alert.id,
      reporterName: reporterName || 'Neighborhood Volunteer',
      location: sightingLocation,
      time: 'Just now',
      notes: sightingNote,
      confirmed: true,
    };

    onAddSighting(newSighting);
    setSightingLocation('');
    setSightingNote('');
  };

  const handleMarkFound = () => {
    setIsResolved(true);
    onResolveAlert(alert.id);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#DE6828', '#34A853', '#F5E2BE'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-3xl bg-[#FAF6F0] rounded-[28px] border border-[#E9DCcb] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-[#E8DCce] flex items-center justify-between bg-[#F4EDE2]/70">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isResolved ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FCE3D2] text-[#B95217]'
            }`}>
              {isResolved ? <CheckCircle2 className="w-5 h-5" /> : <Bell className="w-5 h-5 fill-current" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl text-[#241812] font-semibold">
                  {isResolved ? `${pet.name} is Safely Home!` : `Lost Pet Broadcast: ${pet.name}`}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  isResolved ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#DE6828] text-white animate-pulse'
                }`}>
                  {isResolved ? 'Resolved' : 'Live Broadcast'}
                </span>
              </div>
              <p className="text-xs text-[#6F5D52]">
                {isResolved
                  ? 'All neighbors notified of safe reunion'
                  : `Active radar pulse sent to ${alert.notifiedNeighborsCount} nearby neighbors within ${alert.broadcastRadiusKm} km`}
              </p>
            </div>
          </div>

          <button
            id="close-lost-alert-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-[#6E5A4D] hover:bg-[#E5D7C7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Top Broadcast Radar Summary Banner */}
          <div className="bg-[#27170E] text-white rounded-3xl p-6 relative overflow-hidden shadow-md">
            {/* Background radar rings effect */}
            <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-44 h-44 rounded-full border border-[#DE6828]/25 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={pet.photoUrl}
                  alt={pet.name}
                  className="w-18 h-18 rounded-2xl object-cover border-2 border-[#DE6828]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-bold text-[#DE6828] uppercase tracking-wider flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5" />
                    <span>Neighborhood Search Radar Active</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-white mt-0.5">
                    {pet.name} ({pet.breed})
                  </h3>
                  <div className="text-xs text-[#C5B3A6] mt-1 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#DE6828]" />
                    <span>Last seen: {alert.lastSeenAddress}</span>
                  </div>
                </div>
              </div>

              {/* Stats badges */}
              <div className="flex items-center gap-4 bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-xs border border-white/15">
                <div className="text-center">
                  <div className="text-lg font-bold text-white leading-none">{alert.notifiedNeighborsCount}</div>
                  <div className="text-[10px] text-[#D8C6B8] uppercase mt-1">Alerted</div>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="text-center">
                  <div className="text-lg font-bold text-[#34A853] leading-none">{sightings.length}</div>
                  <div className="text-[10px] text-[#D8C6B8] uppercase mt-1">Sightings</div>
                </div>
              </div>
            </div>

            {/* Found Button Action */}
            {!isResolved && (
              <div className="mt-4 pt-4 border-t border-white/15 flex justify-end">
                <button
                  id="mark-pet-found-btn"
                  onClick={handleMarkFound}
                  className="px-5 py-2 rounded-full bg-[#34A853] hover:bg-[#2E9447] text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark as Reunited & Found</span>
                </button>
              </div>
            )}
          </div>

          {/* Community Sightings Stream */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-[#3D2C22] uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#DE6828]" />
                <span>Live Sighting Reports ({sightings.length})</span>
              </h4>
              <span className="text-xs text-[#7B6A5E]">Updated in real-time</span>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {sightings.map((s) => (
                <div key={s.id} className="bg-white p-4 rounded-2xl border border-[#EBE0D2] shadow-xs">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#241812]">{s.reporterName}</span>
                    <span className="text-[#8C7B70]">{s.time}</span>
                  </div>
                  <div className="text-xs font-medium text-[#DE6828] flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3" />
                    <span>{s.location}</span>
                  </div>
                  <p className="text-xs text-[#524137]">{s.notes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add Sighting Form */}
          {!isResolved && (
            <form onSubmit={handleSightingSubmit} className="bg-[#F3E9DD] p-5 rounded-2xl border border-[#E3D3C1] space-y-3">
              <h4 className="text-xs font-bold text-[#3E2D22] uppercase tracking-wider">
                Spotted {pet.name}? Share a Quick Sighting
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (or Neighbor on 4th)"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#D5C4B2] text-xs text-[#241812] focus:outline-none focus:ring-1 focus:ring-[#DE6828]"
                />
                <input
                  type="text"
                  required
                  placeholder="Exact Location (e.g. Near park bench)"
                  value={sightingLocation}
                  onChange={(e) => setSightingLocation(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#D5C4B2] text-xs text-[#241812] focus:outline-none focus:ring-1 focus:ring-[#DE6828]"
                />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Details (e.g. Walking calmly toward garden, seems okay)"
                  value={sightingNote}
                  onChange={(e) => setSightingNote(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-[#D5C4B2] text-xs text-[#241812] focus:outline-none focus:ring-1 focus:ring-[#DE6828]"
                />
                <button
                  type="submit"
                  id="submit-sighting-btn"
                  className="px-5 py-2 rounded-xl bg-[#DE6828] hover:bg-[#C9581B] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </motion.div>
    </div>
  );
};
