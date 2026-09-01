import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, ShieldCheck, QrCode, Phone, MapPin, AlertCircle, CheckCircle2, Heart, Sparkles, Upload } from 'lucide-react';
import { Pet } from '../../types';
import confetti from 'canvas-confetti';

interface PetProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  pets: Pet[];
  selectedPetId: string;
  onSelectPet: (petId: string) => void;
  onSavePet: (pet: Pet) => void;
  onOpenQrTag: (pet: Pet) => void;
  onTriggerLostAlert: (pet: Pet) => void;
}

export const PetProfileModal: React.FC<PetProfileModalProps> = ({
  isOpen,
  onClose,
  pets,
  selectedPetId,
  onSelectPet,
  onSavePet,
  onOpenQrTag,
  onTriggerLostAlert,
}) => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const selectedPet = pets.find((p) => p.id === selectedPetId) || pets[0];

  // New Pet Form State
  const [formData, setFormData] = useState({
    name: '',
    species: 'dog' as 'dog' | 'cat' | 'other',
    breed: '',
    color: '',
    age: '',
    weight: '',
    microchipId: '',
    ownerName: '',
    ownerPhone: '',
    neighborhood: 'Oakridge & Elm Hills',
    medicalNotes: '',
    distinctiveFeatures: '',
    photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.breed) return;

    const newPet: Pet = {
      id: `pet-${Date.now()}`,
      name: formData.name,
      species: formData.species,
      breed: formData.breed,
      color: formData.color || 'Standard',
      age: formData.age || '2 years',
      weight: formData.weight || '30 lbs',
      photoUrl: formData.photoUrl,
      microchipId: formData.microchipId,
      status: 'safe',
      ownerName: formData.ownerName || 'Verified Owner',
      ownerPhone: formData.ownerPhone || '+1 (555) 123-4567',
      neighborhood: formData.neighborhood,
      medicalNotes: formData.medicalNotes,
      distinctiveFeatures: formData.distinctiveFeatures ? formData.distinctiveFeatures.split(',').map((s) => s.trim()) : ['Very friendly'],
      qrTagId: `SP-${Math.floor(100 + Math.random() * 900)}-${formData.name.substring(0, 3).toUpperCase()}`,
    };

    onSavePet(newPet);
    onSelectPet(newPet.id);
    setIsCreatingNew(false);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#DE6828', '#F5E2BE', '#34A853'],
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-3xl bg-[#FAF6F0] rounded-[28px] border border-[#E9DCcb] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Top Header */}
          <div className="px-6 py-5 border-b border-[#E8DCce] flex items-center justify-between bg-[#F4EDE2]/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E8DAC8] flex items-center justify-center text-[#DE6828]">
                <ShieldCheck className="w-5 h-5 text-[#DE6828]" />
              </div>
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#241812] font-semibold">
                  {isCreatingNew ? 'Register New Companion' : 'Trusted Pet Profile'}
                </h2>
                <p className="text-xs text-[#6F5D52]">
                  {isCreatingNew
                    ? 'Join your local neighborhood safety net'
                    : 'SafePaws cryptographic profile & emergency network'}
                </p>
              </div>
            </div>

            <button
              id="close-profile-modal-btn"
              onClick={onClose}
              className="p-2 rounded-full text-[#6E5A4D] hover:bg-[#E5D7C7] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            
            {/* Pet Selector Tabs (when not creating new) */}
            {!isCreatingNew && (
              <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#EDE2D5]">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {pets.map((p) => (
                    <button
                      key={p.id}
                      id={`select-pet-${p.id}`}
                      onClick={() => onSelectPet(p.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                        selectedPet?.id === p.id
                          ? 'bg-[#27170E] text-white shadow-sm'
                          : 'bg-[#EFE4D6] text-[#4A3B31] hover:bg-[#E5D8C7]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.status === 'safe' ? '#34A853' : '#DE6828' }} />
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>

                <button
                  id="add-new-pet-btn"
                  onClick={() => setIsCreatingNew(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#DE6828] hover:bg-[#C9581B] text-white text-xs font-semibold shrink-0 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Pet</span>
                </button>
              </div>
            )}

            {isCreatingNew ? (
              /* New Pet Form */
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#453429] uppercase tracking-wider mb-1">
                      Pet Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Olive, Bailey, Cooper"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCCEC0] bg-white text-[#241812] text-sm focus:outline-none focus:ring-2 focus:ring-[#DE6828]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#453429] uppercase tracking-wider mb-1">
                      Species & Breed *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Golden Retriever, Tabby Cat"
                      value={formData.breed}
                      onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCCEC0] bg-white text-[#241812] text-sm focus:outline-none focus:ring-2 focus:ring-[#DE6828]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#453429] uppercase tracking-wider mb-1">
                      Coat Color & Markings
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Honey gold with white chest patch"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCCEC0] bg-white text-[#241812] text-sm focus:outline-none focus:ring-2 focus:ring-[#DE6828]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#453429] uppercase tracking-wider mb-1">
                      Age & Weight
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3 years old · 60 lbs"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCCEC0] bg-white text-[#241812] text-sm focus:outline-none focus:ring-2 focus:ring-[#DE6828]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#453429] uppercase tracking-wider mb-1">
                      Owner Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 234-5678"
                      value={formData.ownerPhone}
                      onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCCEC0] bg-white text-[#241812] text-sm focus:outline-none focus:ring-2 focus:ring-[#DE6828]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#453429] uppercase tracking-wider mb-1">
                      Microchip ID (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 985141004928172"
                      value={formData.microchipId}
                      onChange={(e) => setFormData({ ...formData, microchipId: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCCEC0] bg-white text-[#241812] text-sm focus:outline-none focus:ring-2 focus:ring-[#DE6828]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#453429] uppercase tracking-wider mb-1">
                    Special Medical or Behavioral Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Very friendly, loves treats. Sensitive to loud fireworks."
                    value={formData.medicalNotes}
                    onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-[#DCCEC0] bg-white text-[#241812] text-sm focus:outline-none focus:ring-2 focus:ring-[#DE6828]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DCce]">
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="px-5 py-2.5 rounded-full text-sm font-medium text-[#5E4C41] hover:bg-[#EAE0D3] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="save-new-pet-btn"
                    className="px-6 py-2.5 rounded-full bg-[#DE6828] hover:bg-[#C9581B] text-white text-sm font-semibold shadow-md cursor-pointer"
                  >
                    Complete Profile & Generate Tag
                  </button>
                </div>
              </form>
            ) : (
              /* Selected Pet Detail Card */
              selectedPet && (
                <div className="space-y-6">
                  {/* Hero card of selected pet */}
                  <div className="bg-white rounded-3xl p-6 border border-[#E9DFC] shadow-xs flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <div className="relative">
                      <img
                        src={selectedPet.photoUrl}
                        alt={selectedPet.name}
                        className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-[#FAF6F0] shadow-md"
                        referrerPolicy="no-referrer"
                      />
                      <span
                        className={`absolute -bottom-2 -right-2 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-sm ${
                          selectedPet.status === 'safe' ? 'bg-[#34A853]' : 'bg-[#DE6828]'
                        }`}
                      >
                        {selectedPet.status === 'safe' ? 'Safe at Home' : 'Lost Alert Active'}
                      </span>
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-3xl font-semibold text-[#241812]">
                            {selectedPet.name}
                          </h3>
                          <p className="text-sm font-medium text-[#7A6B61] mt-0.5">
                            {selectedPet.breed} · {selectedPet.age}
                          </p>
                        </div>

                        {/* Tag ID Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#E2D5C5] text-xs font-mono text-[#4E3D32]">
                          <QrCode className="w-3.5 h-3.5 text-[#DE6828]" />
                          <span>{selectedPet.qrTagId}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#F2ECE3] text-left">
                        <div>
                          <div className="text-[11px] font-bold text-[#8A7A70] uppercase">Owner</div>
                          <div className="text-sm font-medium text-[#2E2018]">{selectedPet.ownerName}</div>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-[#8A7A70] uppercase">Phone</div>
                          <div className="text-sm font-medium text-[#2E2018]">{selectedPet.ownerPhone}</div>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-[#8A7A70] uppercase">Neighborhood</div>
                          <div className="text-sm font-medium text-[#2E2018] truncate">{selectedPet.neighborhood}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Identification Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#F6EDE2] rounded-2xl p-4 border border-[#E8DCCE]">
                      <h4 className="text-xs font-bold text-[#453328] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#DE6828]" />
                        <span>Distinctive Features</span>
                      </h4>
                      <ul className="text-xs text-[#5C4A3F] space-y-1">
                        {selectedPet.distinctiveFeatures.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DE6828]" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#F6EDE2] rounded-2xl p-4 border border-[#E8DCCE]">
                      <h4 className="text-xs font-bold text-[#453328] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                        <span>Microchip & Safety Registry</span>
                      </h4>
                      <p className="text-xs text-[#5C4A3F] font-mono">
                        Chip ID: {selectedPet.microchipId || 'ISO 11784 Verified'}
                      </p>
                      <p className="text-xs text-[#7B6A60] mt-1">
                        SafePaws Biometric Hash: SP-998-SECURE
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      id="view-smart-qr-tag-btn"
                      onClick={() => onOpenQrTag(selectedPet)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#F2EAE0] border border-[#DECFBE] text-[#241812] font-semibold text-sm shadow-xs transition-colors cursor-pointer"
                    >
                      <QrCode className="w-4 h-4 text-[#DE6828]" />
                      <span>View Smart QR Collar Tag</span>
                    </button>

                    <button
                      id="trigger-lost-alert-btn"
                      onClick={() => onTriggerLostAlert(selectedPet)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#DE6828] hover:bg-[#C9581B] text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>Broadcast Lost Alert to Radar</span>
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
