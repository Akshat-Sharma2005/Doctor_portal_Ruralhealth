import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const IncomingReferralDetailScreen: React.FC = () => {
  const {
    selectedReferralId,
    getReferralById,
    updateReferralState,
    openReferralCompletion,
    goBackToMain,
    referrals,
    setIsCommsModalOpen,
    setActiveCommsReferral,
  } = useApp();

  const ref = getReferralById(selectedReferralId || '') || referrals[0];
  const [showRerouteModal, setShowRerouteModal] = useState(false);
  const [rerouteFacility, setRerouteFacility] = useState('Addis Ababa Gen.');

  const isInitiated = ref.state === 'initiated';
  const isAccepted = ref.state === 'accepted';
  const isCompleted = ref.state === 'completed';

  const handleAccept = () => {
    updateReferralState(ref.id, 'accepted');
  };

  const handleDecline = () => {
    updateReferralState(ref.id, 'declined');
    setShowRerouteModal(false);
    goBackToMain();
  };

  const handleOpenComms = () => {
    setActiveCommsReferral(ref);
    setIsCommsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24 text-[#191c1d]">
      <main className="max-w-lg mx-auto px-4 md:px-6 pt-4 space-y-6">
        {/* Referral State Tracker */}
        <section
          aria-label="Referral Status"
          className="bg-white border-2 border-[#CED4DA] rounded p-4 shadow-sm"
        >
          <div className="flex items-center justify-between relative">
            {/* Background line */}
            <div className="absolute top-1/2 left-6 right-6 h-1 bg-[#CED4DA] -translate-y-1/2 z-0"></div>
            {/* Active filled line */}
            <div
              className={`absolute top-1/2 left-6 h-1 bg-[#1E4620] -translate-y-1/2 z-0 transition-all ${
                isCompleted ? 'w-[calc(100%-48px)]' : isAccepted ? 'w-1/2' : 'w-0'
              }`}
            ></div>

            {/* Initiated Node */}
            <div className="flex flex-col items-center z-10 bg-white px-2">
              <div className="w-8 h-8 rounded-full bg-[#1E4620] flex items-center justify-center border-2 border-[#1E4620]">
                <span
                  className="material-symbols-outlined text-white text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              </div>
              <span className="font-label-caps text-label-caps text-[#43474f] mt-2 text-xs">
                Initiated
              </span>
            </div>

            {/* Accepted Node */}
            <div className="flex flex-col items-center z-10 bg-white px-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  isAccepted
                    ? 'bg-white border-[#001939] text-[#001939]'
                    : isCompleted
                    ? 'bg-[#1E4620] border-[#1E4620] text-white'
                    : 'bg-white border-[#CED4DA] text-[#747780]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: isCompleted ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {isCompleted ? 'check' : 'pending'}
                </span>
              </div>
              <span
                className={`font-label-caps text-label-caps mt-2 text-xs ${
                  isAccepted ? 'text-[#001939] font-bold' : isCompleted ? 'text-[#1E4620]' : 'text-[#747780]'
                }`}
              >
                Accepted
              </span>
            </div>

            {/* Completed Node */}
            <div className="flex flex-col items-center z-10 bg-white px-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  isCompleted
                    ? 'bg-[#1E4620] border-[#1E4620] text-white'
                    : 'bg-white border-[#CED4DA] text-[#c3c6d0]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: isCompleted ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {isCompleted ? 'check_circle' : 'circle'}
                </span>
              </div>
              <span
                className={`font-label-caps text-label-caps mt-2 text-xs ${
                  isCompleted ? 'text-[#1E4620] font-bold' : 'text-[#c3c6d0]'
                }`}
              >
                Completed
              </span>
            </div>
          </div>
        </section>

        {/* Patient Summary Card */}
        <section
          aria-label="Patient Summary"
          className="bg-white border-2 border-[#CED4DA] rounded overflow-hidden shadow-sm"
        >
          <div className="bg-[#f3f4f5] p-4 border-b border-[#CED4DA] flex justify-between items-start">
            <div>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-[#191c1d] font-bold">
                {ref.patientName}
              </h2>
              <p className="font-body-lg text-body-lg text-[#43474f] mt-1 font-medium font-mono text-sm">
                {ref.patientAge}{ref.patientSex} • DOB: {ref.patientDob}
              </p>
            </div>
            <div className="bg-[#e1e3e4] px-3 py-1 rounded-full border border-[#CED4DA] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#5b5f64]">tag</span>
              <span className="font-label-caps text-label-caps text-[#5b5f64] font-bold">
                {ref.id.replace('#', '')}
              </span>
            </div>
          </div>
        </section>

        {/* Clinical Context */}
        <section
          aria-label="Clinical Context"
          className="bg-white border-2 border-[#CED4DA] rounded p-4 space-y-4 shadow-sm"
        >
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-headline-md text-headline-md text-[#191c1d] font-bold">
              Clinical Context
            </h3>
            <div
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border-2 font-bold ${
                ref.priority === 'emergency' || ref.priority === 'urgent'
                  ? 'bg-[#ffdad6] text-[#93000a] border-[#B71C1C]'
                  : 'bg-[#e1e3e4] text-[#191c1d] border-[#CED4DA]'
              }`}
            >
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                warning
              </span>
              <span className="font-status-badge text-status-badge uppercase">
                {ref.priority}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-label-caps text-label-caps text-[#43474f] mb-1 font-bold">
              Reason for Referral
            </h4>
            <p className="font-body-lg text-body-lg text-[#191c1d] bg-[#f8f9fa] p-3 rounded border border-[#CED4DA]">
              {ref.clinicalNotes}
            </p>
          </div>

          <div>
            <h4 className="font-label-caps text-label-caps text-[#43474f] mb-1 font-bold">
              Preliminary Diagnosis
            </h4>
            <p className="font-body-lg text-body-lg text-[#191c1d] bg-[#f8f9fa] p-3 rounded border border-[#CED4DA]">
              {ref.preliminaryDiagnosis}
            </p>
          </div>
        </section>

        {/* Origin Facility Info */}
        <section
          aria-label="Origin Facility"
          className="bg-white border-2 border-[#CED4DA] rounded p-4 shadow-sm"
        >
          <h3 className="font-headline-md text-headline-md text-[#191c1d] mb-3 flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined text-[#5b5f64]">local_hospital</span>
            Origin Facility
          </h3>
          <div className="bg-[#f8f9fa] p-3 rounded border border-[#CED4DA] flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-label-caps text-label-caps text-[#43474f] font-bold">
                Facility Name:
              </span>
              <span className="font-body-lg text-body-lg font-bold text-[#191c1d]">
                {ref.originFacility}
              </span>
            </div>
            <div className="h-px bg-[#CED4DA] w-full"></div>
            <div className="flex justify-between items-center">
              <span className="font-label-caps text-label-caps text-[#43474f] font-bold">
                Referring Provider:
              </span>
              <span className="font-body-lg text-body-lg text-[#191c1d]">
                {ref.referringProvider}
              </span>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section aria-label="Referral Actions" className="flex flex-col gap-3 pt-2">
          {isInitiated && (
            <button
              onClick={handleAccept}
              type="button"
              className="w-full bg-[#002d5e] hover:bg-[#001939] text-white flex items-center justify-center gap-2 h-12 rounded font-label-caps text-label-caps active:scale-95 transition-all font-bold cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined">check_circle</span>
              ACCEPT REFERRAL
            </button>
          )}

          {isAccepted && (
            <button
              onClick={() => openReferralCompletion(ref.id)}
              type="button"
              className="w-full bg-[#002d5e] hover:bg-[#001939] text-white flex items-center justify-center gap-2 h-12 rounded font-label-caps text-label-caps active:scale-95 transition-all font-bold cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined">task_alt</span>
              PROCEED TO OUTCOME DOCUMENTATION &rarr;
            </button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleOpenComms}
              type="button"
              className="w-full bg-white text-[#001939] border-2 border-[#CED4DA] hover:bg-[#f3f4f5] flex items-center justify-center gap-2 h-12 rounded font-label-caps text-label-caps font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              COMMS LOG ({ref.commsLog?.length || 0})
            </button>

            <button
              onClick={() => setShowRerouteModal(true)}
              type="button"
              className="w-full bg-white text-[#191c1d] border-2 border-[#CED4DA] hover:bg-[#f3f4f5] flex items-center justify-center gap-2 h-12 rounded font-label-caps text-label-caps font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">route</span>
              RE-ROUTE
            </button>
          </div>
        </section>
      </main>

      {/* Reroute / Decline Modal */}
      {showRerouteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#CED4DA] p-6 rounded max-w-md w-full">
            <h3 className="font-headline-md text-headline-md text-[#001939] mb-2 font-bold">
              Decline or Re-Route Referral
            </h3>
            <p className="font-body-md text-sm text-[#5b5f64] mb-4">
              Specify alternative destination clinic or reason for facility transfer denial.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
                  Alternative Facility
                </label>
                <select
                  value={rerouteFacility}
                  onChange={(e) => setRerouteFacility(e.target.value)}
                  className="w-full h-12 px-3 border border-[#CED4DA] bg-white rounded font-body-md"
                >
                  <option value="Addis Ababa Gen.">Addis Ababa Gen. (Tertiary ICU)</option>
                  <option value="Awassa Health Center">Awassa Health Center</option>
                  <option value="Bale Goba Hospital">Bale Goba Hospital</option>
                </select>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowRerouteModal(false)}
                  className="px-4 py-2 border border-[#CED4DA] rounded font-label-caps text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDecline}
                  className="px-4 py-2 bg-[#B71C1C] text-white rounded font-label-caps text-xs font-bold"
                >
                  Confirm Re-Route
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
