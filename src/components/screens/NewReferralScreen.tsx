import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ReferralPriority } from '../../types';
import { FACILITIES } from '../../data/initialData';

export const NewReferralScreen: React.FC = () => {
  const {
    selectedPatientId,
    getPatientById,
    patients,
    initiateReferral,
    goBackToMain,
    currentUser,
  } = useApp();

  const preselectedPatient = selectedPatientId ? getPatientById(selectedPatientId) : undefined;

  const [patientSearch, setPatientSearch] = useState(
    preselectedPatient ? `${preselectedPatient.name} (ID: ${preselectedPatient.id})` : ''
  );
  const [chosenPatientId, setChosenPatientId] = useState(preselectedPatient?.id || '');
  const [chosenPatientName, setChosenPatientName] = useState(preselectedPatient?.name || '');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [originFacility] = useState(preselectedPatient?.homeFacility || currentUser?.facility || 'Shashemene Clinic');
  const [destinationFacility, setDestinationFacility] = useState('Hawassa Referral Hosp.');
  const [priority, setPriority] = useState<ReferralPriority>('normal');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [preliminaryDiagnosis, setPreliminaryDiagnosis] = useState('');

  const handlePatientSelect = (p: { id: string; name: string }) => {
    setChosenPatientId(p.id);
    setChosenPatientName(p.name);
    setPatientSearch(`${p.name} (ID: ${p.id})`);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chosenPatientName && !patientSearch) {
      alert('Please select or specify a patient.');
      return;
    }

    initiateReferral({
      patientId: chosenPatientId || 'RH-4920',
      patientName: chosenPatientName || patientSearch.split('(')[0].trim(),
      originFacility,
      destinationFacility,
      priority,
      clinicalNotes: clinicalNotes || 'Patient transfer requested for specialized clinical management.',
      preliminaryDiagnosis: preliminaryDiagnosis || 'General Clinical Evaluation',
    });

    goBackToMain();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-28">
      <main className="flex-grow px-4 md:px-8 py-6 max-w-lg mx-auto w-full flex flex-col gap-6">
        {/* Progress / State Tracker */}
        <section
          aria-label="Referral Status"
          className="bg-white border-2 border-[#CED4DA] rounded p-4 flex items-center justify-between shadow-sm"
        >
          {/* Step 1: Initiate (Active) */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-[#002d5e] text-white flex items-center justify-center mb-1 shadow-sm font-bold">
              <span
                className="material-symbols-outlined text-sm font-bold"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                add
              </span>
            </div>
            <span className="font-status-badge text-status-badge text-[#002d5e] font-bold">
              Initiate
            </span>
          </div>

          <div className="h-1 bg-[#CED4DA] flex-1 mx-2"></div>

          {/* Step 2: Pending */}
          <div className="flex flex-col items-center flex-1 opacity-50">
            <div className="w-8 h-8 rounded-full border-2 border-[#c3c6d0] bg-[#f3f4f5] text-[#43474f] flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-sm font-bold">schedule</span>
            </div>
            <span className="font-status-badge text-status-badge text-[#43474f]">
              Pending
            </span>
          </div>

          <div className="h-1 bg-[#CED4DA] flex-1 mx-2"></div>

          {/* Step 3: Accepted */}
          <div className="flex flex-col items-center flex-1 opacity-50">
            <div className="w-8 h-8 rounded-full border-2 border-[#c3c6d0] bg-[#f3f4f5] text-[#43474f] flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-sm font-bold">check</span>
            </div>
            <span className="font-status-badge text-status-badge text-[#43474f]">
              Accepted
            </span>
          </div>
        </section>

        {/* Form */}
        <form id="referral-form" className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Patient Selection */}
          <fieldset className="flex flex-col gap-2 relative">
            <label
              className="font-label-caps text-label-caps text-[#43474f] uppercase tracking-wider font-bold"
              htmlFor="patient-search"
            >
              Patient
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#747780]">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                id="patient-search"
                type="text"
                required
                value={patientSearch}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setPatientSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                placeholder="Search by ID or Name..."
                className="w-full pl-10 pr-4 h-12 bg-white border border-[#CED4DA] text-[#191c1d] font-body-lg focus:border-[#002d5e] focus:border-2 focus:ring-0 rounded placeholder:text-[#c3c6d0] transition-colors"
              />
            </div>

            {/* Autocomplete dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[#CED4DA] rounded shadow-lg z-30 max-h-48 overflow-y-auto divide-y divide-[#CED4DA]">
                {patients
                  .filter(
                    (p) =>
                      p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
                      p.id.toLowerCase().includes(patientSearch.toLowerCase())
                  )
                  .map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handlePatientSelect(p)}
                      className="p-3 hover:bg-[#f3f4f5] cursor-pointer flex justify-between items-center"
                    >
                      <div>
                        <p className="font-bold text-sm text-[#001939]">{p.name}</p>
                        <p className="text-xs text-[#5b5f64] font-mono">
                          ID: {p.id} • {p.age}{p.sex} • {p.homeFacility}
                        </p>
                      </div>
                      <span className="text-xs bg-[#e1e3e4] px-2 py-0.5 rounded font-mono">Select</span>
                    </div>
                  ))}
              </div>
            )}
          </fieldset>

          {/* Origin & Destination */}
          <div className="flex flex-col gap-4 p-4 bg-[#E9ECEF] border border-[#CED4DA] rounded relative">
            <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-[#CED4DA] z-0"></div>

            <fieldset className="flex flex-col gap-2 relative z-10">
              <label
                className="font-label-caps text-label-caps text-[#43474f] uppercase tracking-wider flex items-center gap-2 font-bold"
                htmlFor="origin-facility"
              >
                <span
                  className="material-symbols-outlined text-[#747780]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>{' '}
                Origin Facility
              </label>
              <input
                id="origin-facility"
                type="text"
                readOnly
                value={originFacility}
                className="w-full h-12 bg-[#f3f4f5] border border-[#CED4DA] text-[#43474f] font-body-lg rounded opacity-90 cursor-not-allowed px-4 font-medium"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2 relative z-10 mt-2">
              <label
                className="font-label-caps text-label-caps text-[#43474f] uppercase tracking-wider flex items-center gap-2 font-bold"
                htmlFor="destination-facility"
              >
                <span
                  className="material-symbols-outlined text-[#002d5e]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  domain
                </span>{' '}
                Destination Facility
              </label>
              <div className="relative">
                <select
                  id="destination-facility"
                  required
                  value={destinationFacility}
                  onChange={(e) => setDestinationFacility(e.target.value)}
                  className="w-full h-12 bg-white border border-[#CED4DA] text-[#191c1d] font-body-lg focus:border-[#002d5e] focus:border-2 focus:ring-0 rounded appearance-none pl-4 pr-10"
                >
                  <option value="" disabled>
                    Select receiving facility...
                  </option>
                  {FACILITIES.filter((f) => f !== originFacility).map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#747780]">
                  <span className="material-symbols-outlined">arrow_drop_down</span>
                </div>
              </div>
            </fieldset>
          </div>

          {/* Priority Level */}
          <fieldset className="flex flex-col gap-3">
            <legend className="font-label-caps text-label-caps text-[#43474f] uppercase tracking-wider font-bold">
              Priority Level
            </legend>
            <div className="grid grid-cols-3 gap-2">
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value="normal"
                  checked={priority === 'normal'}
                  onChange={() => setPriority('normal')}
                  className="peer sr-only"
                />
                <div
                  className={`h-12 flex flex-col items-center justify-center border-2 rounded transition-colors ${
                    priority === 'normal'
                      ? 'bg-[#dde0e6] border-[#5b5f64] text-[#181c21] font-bold'
                      : 'bg-white border-[#CED4DA] text-[#5b5f64] hover:bg-[#f3f4f5]'
                  }`}
                >
                  <span className="font-status-badge text-status-badge">Normal</span>
                </div>
              </label>

              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value="urgent"
                  checked={priority === 'urgent'}
                  onChange={() => setPriority('urgent')}
                  className="peer sr-only"
                />
                <div
                  className={`h-12 flex flex-col items-center justify-center border-2 rounded transition-colors ${
                    priority === 'urgent'
                      ? 'bg-[#FFF3CD] border-[#856404] text-[#856404] font-bold'
                      : 'bg-white border-[#CED4DA] text-[#5b5f64] hover:bg-[#f3f4f5]'
                  }`}
                >
                  <span className="font-status-badge text-status-badge">Urgent</span>
                </div>
              </label>

              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value="emergency"
                  checked={priority === 'emergency'}
                  onChange={() => setPriority('emergency')}
                  className="peer sr-only"
                />
                <div
                  className={`h-12 flex flex-col items-center justify-center border-2 rounded transition-colors ${
                    priority === 'emergency'
                      ? 'bg-[#ffdad6] border-[#B71C1C] text-[#B71C1C] font-bold'
                      : 'bg-white border-[#CED4DA] text-[#5b5f64] hover:bg-[#f3f4f5]'
                  }`}
                >
                  <span className="font-status-badge text-status-badge">Emergency</span>
                </div>
              </label>
            </div>
          </fieldset>

          {/* Preliminary Diagnosis */}
          <fieldset className="flex flex-col gap-2">
            <label
              className="font-label-caps text-label-caps text-[#43474f] uppercase tracking-wider font-bold"
              htmlFor="prelim-diag"
            >
              Preliminary Diagnosis / Service Needed
            </label>
            <input
              id="prelim-diag"
              type="text"
              value={preliminaryDiagnosis}
              onChange={(e) => setPreliminaryDiagnosis(e.target.value)}
              placeholder="e.g. Suspected severe pneumonia, Cardiology consult"
              className="w-full h-12 px-4 bg-white border border-[#CED4DA] text-[#191c1d] font-body-lg focus:border-[#002d5e] focus:border-2 focus:ring-0 rounded placeholder:text-[#c3c6d0]"
            />
          </fieldset>

          {/* Reason for Referral / Clinical Notes */}
          <fieldset className="flex flex-col gap-2">
            <label
              className="font-label-caps text-label-caps text-[#43474f] uppercase tracking-wider font-bold"
              htmlFor="clinical-notes"
            >
              Clinical Notes / Reason
            </label>
            <textarea
              id="clinical-notes"
              rows={4}
              required
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              placeholder="Enter symptoms, preliminary diagnosis, and specific reason for transfer..."
              className="w-full p-3 bg-white border border-[#CED4DA] text-[#191c1d] font-body-lg focus:border-[#002d5e] focus:border-2 focus:ring-0 rounded placeholder:text-[#c3c6d0] resize-none"
            ></textarea>
          </fieldset>
        </form>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-[#CED4DA] p-4 z-40 shadow-lg">
        <div className="max-w-lg mx-auto w-full flex gap-3">
          <button
            type="button"
            onClick={goBackToMain}
            className="h-12 px-5 border-2 border-[#CED4DA] text-[#5b5f64] font-label-caps rounded font-bold hover:bg-[#f3f4f5] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="referral-form"
            className="flex-1 h-12 bg-[#002d5e] hover:bg-[#001939] text-white font-headline-md text-headline-md rounded shadow-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-2 font-bold cursor-pointer"
          >
            <span className="material-symbols-outlined">send</span>
            INITIATE REFERRAL
          </button>
        </div>
      </div>
    </div>
  );
};
