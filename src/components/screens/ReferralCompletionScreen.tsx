import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ReferralCompletionScreen: React.FC = () => {
  const {
    selectedReferralId,
    getReferralById,
    completeReferral,
    goBackToMain,
    referrals,
    currentUser,
  } = useApp();

  const ref = getReferralById(selectedReferralId || '') || referrals[0];

  const [arrivalStatus, setArrivalStatus] = useState('Arrived - Evaluated');
  const [clinicalNotes, setClinicalNotes] = useState(
    ref.outcome?.finalTreatment ||
      'Patient arrived at facility in stable vitals. Comprehensive clinical evaluation performed, nebulization & oral antibiotic treatment course administered. Discharge clearance approved with follow-up in 14 days.'
  );
  const [officerName, setOfficerName] = useState(
    ref.outcome?.receivingOfficer || currentUser?.name || 'Dr. S. Mulugeta'
  );
  const [confirmed, setConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!arrivalStatus) {
      setErrorMsg('Please select an Arrival Status.');
      return;
    }
    if (!clinicalNotes.trim()) {
      setErrorMsg('Please enter Final Treatment / Clinical notes.');
      return;
    }
    if (!officerName.trim()) {
      setErrorMsg('Please enter Receiving Officer Name.');
      return;
    }
    if (!confirmed) {
      setErrorMsg('Please check the confirmation box to verify clinical evaluation.');
      return;
    }

    completeReferral(ref.id, {
      arrivalStatus,
      finalTreatment: clinicalNotes,
      receivingOfficer: officerName,
    });

    goBackToMain();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24 text-[#191c1d]">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6 md:grid md:grid-cols-12 md:gap-6 md:space-y-0">
        {/* Status Tracker (Full Width) */}
        <div className="md:col-span-12 bg-white border-2 border-[#CED4DA] rounded p-4 shadow-sm">
          <h2 className="font-label-caps text-label-caps text-[#5b5f64] mb-4 uppercase font-bold">
            Referral Status
          </h2>
          <div className="flex items-center justify-between relative">
            {/* Base Line */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-[#CED4DA] -translate-y-1/2 -z-10"></div>
            {/* Progress Line */}
            <div className="absolute top-1/2 left-4 w-full h-1 bg-[#002d5e] -translate-y-1/2 -z-10"></div>

            {/* Step 1: Initiated */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#002d5e] text-white flex items-center justify-center mb-2 z-10 border-2 border-[#002d5e]">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              </div>
              <span className="font-status-badge text-status-badge text-[#191c1d]">
                Initiated
              </span>
            </div>

            {/* Step 2: Accepted */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#002d5e] text-white flex items-center justify-center mb-2 z-10 border-2 border-[#002d5e]">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              </div>
              <span className="font-status-badge text-status-badge text-[#191c1d]">
                Accepted
              </span>
            </div>

            {/* Step 3: Completed (Active) */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-[#002d5e] text-[#002d5e] flex items-center justify-center mb-2 z-10">
                <div className="w-3 h-3 bg-[#002d5e] rounded-full"></div>
              </div>
              <span className="font-status-badge text-status-badge text-[#002d5e] font-bold">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-8 space-y-6">
          {/* Patient Summary Card */}
          <section className="bg-white border-2 border-[#CED4DA] rounded p-4 flex flex-col md:flex-row md:items-center justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="material-symbols-outlined text-[#002d5e]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  person
                </span>
                <h2 className="font-headline-md text-headline-md text-[#191c1d] font-bold">
                  {ref.patientName}
                </h2>
              </div>
              <p className="font-body-md text-body-md text-[#5b5f64] font-mono text-sm font-bold">
                ID: {ref.id} • {ref.patientAge}{ref.patientSex}
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex gap-2">
              <div className="px-3 py-1 bg-[#e1e3e4] text-[#43474f] rounded font-status-badge text-status-badge flex items-center gap-1 border border-[#CED4DA] font-bold">
                <span className="material-symbols-outlined text-sm">monitor_heart</span>
                {ref.priority.toUpperCase()}
              </div>
            </div>
          </section>

          {/* Outcome Documentation */}
          <section className="bg-white border-2 border-[#CED4DA] rounded p-6 border-l-[4px] border-l-[#002d5e] shadow-sm">
            <h3 className="font-headline-md text-headline-md text-[#191c1d] mb-6 border-b border-[#CED4DA] pb-2 font-bold">
              Outcome Documentation
            </h3>

            {errorMsg && (
              <div className="mb-4 p-3 bg-[#ffdad6] text-[#93000a] text-sm rounded border border-[#B71C1C] font-bold">
                {errorMsg}
              </div>
            )}

            <form id="outcome-form" onSubmit={handleComplete} className="space-y-6">
              {/* Arrival Status */}
              <div>
                <label
                  className="block font-label-caps text-label-caps text-[#5b5f64] mb-2 uppercase font-bold"
                  htmlFor="arrival-status"
                >
                  Arrival Status *
                </label>
                <div className="relative">
                  <select
                    id="arrival-status"
                    required
                    value={arrivalStatus}
                    onChange={(e) => setArrivalStatus(e.target.value)}
                    className="w-full h-12 border border-[#CED4DA] rounded bg-[#f8f9fa] focus:border-2 focus:border-[#002d5e] focus:ring-0 font-body-md text-body-md text-[#191c1d] px-4 appearance-none"
                  >
                    <option value="">Select status...</option>
                    <option value="Arrived - Evaluated">Arrived - Evaluated</option>
                    <option value="No-Show">No-Show</option>
                    <option value="Transferred Further">Transferred Further</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#5b5f64]">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Clinical Notes */}
              <div>
                <label
                  className="block font-label-caps text-label-caps text-[#5b5f64] mb-2 uppercase font-bold"
                  htmlFor="clinical-notes"
                >
                  Final Treatment / Disposition *
                </label>
                <textarea
                  id="clinical-notes"
                  rows={4}
                  required
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="Enter clinical notes, final diagnosis, or discharge instructions here..."
                  className="w-full border border-[#CED4DA] rounded bg-[#f8f9fa] focus:border-2 focus:border-[#002d5e] focus:ring-0 font-body-md text-body-md text-[#191c1d] p-4"
                ></textarea>
              </div>

              {/* Facility Signature */}
              <div>
                <label
                  className="block font-label-caps text-label-caps text-[#5b5f64] mb-2 uppercase font-bold"
                  htmlFor="officer-name"
                >
                  Receiving Officer Name *
                </label>
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-[#5b5f64]"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    edit_document
                  </span>
                  <input
                    id="officer-name"
                    type="text"
                    required
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    placeholder="Dr. S. Mulugeta"
                    className="w-full h-12 border border-[#CED4DA] rounded bg-[#f8f9fa] focus:border-2 focus:border-[#002d5e] focus:ring-0 font-body-md text-body-md text-[#191c1d] px-4 font-semibold"
                  />
                </div>
              </div>

              {/* Confirmation Checkbox */}
              <div className="flex items-start gap-3 mt-4">
                <div className="flex items-center h-12">
                  <input
                    id="confirm-check"
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="w-6 h-6 border-2 border-[#CED4DA] rounded-sm text-[#002d5e] focus:ring-0 cursor-pointer"
                  />
                </div>
                <label
                  htmlFor="confirm-check"
                  className="font-body-md text-body-md text-[#191c1d] pt-3 cursor-pointer select-none font-medium"
                >
                  I confirm that the patient has been evaluated and the referral process is
                  complete at this facility.
                </label>
              </div>
            </form>
          </section>
        </div>

        {/* Sidebar / Action Area */}
        <div className="md:col-span-4 space-y-6">
          {/* Reference Info */}
          <div className="bg-[#E9ECEF] border border-[#CED4DA] rounded p-4">
            <h4 className="font-label-caps text-label-caps text-[#5b5f64] mb-3 uppercase border-b border-[#CED4DA] pb-2 font-bold">
              Referral Origin
            </h4>
            <div className="space-y-3">
              <div>
                <span className="block font-label-caps text-[12px] text-[#5b5f64]">
                  Initiating Facility
                </span>
                <span className="font-body-md text-[#191c1d] font-semibold">
                  {ref.originFacility || 'Gode Health Center'}
                </span>
              </div>
              <div>
                <span className="block font-label-caps text-[12px] text-[#5b5f64]">
                  Referring Clinician
                </span>
                <span className="font-body-md text-[#191c1d]">
                  {ref.referringProvider || 'Nurse K. Tadesse'}
                </span>
              </div>
              <div>
                <span className="block font-label-caps text-[12px] text-[#5b5f64]">
                  Date Initiated
                </span>
                <span className="font-body-md text-[#191c1d] font-mono text-sm">
                  {ref.dateInitiated || '12 Oct 2023, 08:45'}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Action */}
          <button
            type="submit"
            form="outcome-form"
            className="w-full h-12 bg-[#002d5e] hover:bg-[#001939] text-white font-headline-md text-headline-md rounded flex items-center justify-center gap-2 active:opacity-80 transition-opacity font-bold cursor-pointer shadow-sm"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              task_alt
            </span>
            MARK AS COMPLETED
          </button>

          <p className="text-center font-body-md text-[14px] text-[#5b5f64] mt-2">
            This action cannot be undone and will notify the originating facility.
          </p>
        </div>
      </main>
    </div>
  );
};
