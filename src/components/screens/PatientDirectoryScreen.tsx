import React from 'react';
import { useApp } from '../../context/AppContext';

export const PatientDirectoryScreen: React.FC = () => {
  const {
    patients,
    openPatientProfile,
    setIsNewPatientModalOpen,
    setIsFilterModalOpen,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const filteredPatients = patients.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.homeFacility.toLowerCase().includes(q) ||
      p.abhaId.toLowerCase().includes(q)
    );
  });

  return (
    <main className="flex-1 px-4 md:px-8 py-6 md:py-8 mb-24 md:mb-8 max-w-7xl mx-auto w-full">
      {/* Search & Filter Area */}
      <section className="mb-6 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5b5f64]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, ID, or facility..."
            className="w-full h-14 pl-12 pr-4 bg-white border border-[#CED4DA] rounded text-[#191c1d] font-body-lg text-body-lg focus:outline-none focus:border-2 focus:border-[#002d5e] transition-all placeholder:text-[#747780]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5b5f64] hover:text-[#191c1d]"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>

        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="h-14 px-6 border-2 border-[#CED4DA] text-[#191c1d] font-label-caps text-label-caps rounded flex items-center justify-center gap-2 hover:bg-[#e1e3e4] transition-colors min-w-[120px] font-bold cursor-pointer"
        >
          <span className="material-symbols-outlined">tune</span>
          FILTERS
        </button>

        <button
          onClick={() => setIsNewPatientModalOpen(true)}
          className="h-14 px-6 bg-[#002d5e] hover:bg-[#001939] text-white border-none font-label-caps text-label-caps rounded flex items-center justify-center gap-2 transition-colors min-w-[160px] font-bold cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined">add</span>
          NEW PATIENT
        </button>
      </section>

      {/* Stats/Summary Bento */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-white border-2 border-[#CED4DA] rounded p-4 md:p-6 flex flex-col">
          <span className="font-label-caps text-label-caps text-[#5b5f64] mb-2 font-bold uppercase">
            TOTAL PATIENTS
          </span>
          <span className="font-headline-lg text-headline-lg text-[#191c1d] font-bold">
            4,821
          </span>
        </div>

        <div className="bg-white border-2 border-[#CED4DA] rounded p-4 md:p-6 flex flex-col">
          <span className="font-label-caps text-label-caps text-[#5b5f64] mb-2 font-bold uppercase">
            SEEN TODAY
          </span>
          <span className="font-headline-lg text-headline-lg text-[#191c1d] font-bold">
            142
          </span>
        </div>

        <div className="bg-white border-2 border-[#856404] rounded p-4 md:p-6 flex flex-col">
          <span className="font-label-caps text-label-caps text-[#856404] mb-2 font-bold uppercase">
            PENDING FOLLOW-UP
          </span>
          <span className="font-headline-lg text-headline-lg text-[#191c1d] font-bold">
            38
          </span>
        </div>

        <div className="bg-white border-2 border-[#CED4DA] rounded p-4 md:p-6 flex flex-col">
          <span className="font-label-caps text-label-caps text-[#5b5f64] mb-2 font-bold uppercase">
            ACTIVE REFERRALS
          </span>
          <span className="font-headline-lg text-headline-lg text-[#191c1d] font-bold">
            12
          </span>
        </div>
      </section>

      {/* Patient List */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-headline-md text-headline-md text-[#191c1d] font-bold">
            Patient Records
          </h2>
          <span className="font-mono text-xs text-[#5b5f64]">
            Showing {filteredPatients.length} of {patients.length} records
          </span>
        </div>

        {/* List Header (Desktop Only) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b-2 border-[#CED4DA] text-[#5b5f64] font-label-caps text-label-caps font-bold">
          <div className="col-span-4 uppercase">PATIENT NAME & ID</div>
          <div className="col-span-2 uppercase">DEMOGRAPHICS</div>
          <div className="col-span-3 uppercase">HOME FACILITY</div>
          <div className="col-span-3 text-right uppercase">ACTIONS</div>
        </div>

        {filteredPatients.map((patient) => {
          const hasFollowUp = patient.needsFollowUp || patient.id === 'RH-1102-X';

          return (
            <div
              key={patient.id}
              className={`bg-white rounded hover:bg-[#f3f4f5] transition-all ${
                hasFollowUp
                  ? 'border-l-4 border-l-[#856404] border-t border-r border-b border-[#CED4DA]'
                  : 'border border-[#CED4DA] hover:border-[#002d5e]'
              }`}
            >
              <div className="p-4 md:px-6 md:py-4 flex flex-col md:grid md:grid-cols-12 md:items-center gap-4">
                {/* Name & ID */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#e1e3e4] rounded flex items-center justify-center text-[#43474f] font-headline-md text-headline-md border border-[#c3c6d0] shrink-0 font-bold">
                    {patient.initials}
                  </div>
                  <div>
                    <div className="font-headline-md text-headline-md text-[#191c1d] font-bold">
                      {patient.name}
                    </div>
                    <div className="font-body-md text-body-md text-[#5b5f64] flex items-center gap-2 font-mono text-sm">
                      ID: {patient.id}
                      {hasFollowUp && (
                        <span className="inline-flex items-center gap-1 bg-[#FFF3CD] text-[#856404] px-2 py-0.5 rounded font-status-badge text-status-badge border border-[#856404] text-xs font-bold">
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}
                          >
                            warning
                          </span>{' '}
                          Follow-up
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Demographics */}
                <div className="col-span-2 grid grid-cols-2 md:block gap-2 text-[#191c1d] font-body-lg text-body-lg">
                  <span className="md:hidden text-[#5b5f64]">Age/Sex:</span>
                  <span className="font-medium">
                    {patient.age}
                    {patient.sex}
                  </span>
                </div>

                {/* Home Facility */}
                <div className="col-span-3 grid grid-cols-2 md:block gap-2">
                  <span className="md:hidden text-[#5b5f64] font-body-lg text-body-lg">Facility:</span>
                  <div className="flex items-center gap-2 text-[#191c1d] font-body-lg text-body-lg font-medium">
                    <span
                      className="material-symbols-outlined text-[#5b5f64]"
                      style={{ fontSize: '20px' }}
                    >
                      local_hospital
                    </span>
                    {patient.homeFacility}
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-3 flex justify-end">
                  <button
                    onClick={() => openPatientProfile(patient.id)}
                    className="h-12 w-full md:w-auto px-6 border-2 border-[#002d5e] text-[#002d5e] font-label-caps text-label-caps rounded flex items-center justify-center gap-2 hover:bg-[#001939] hover:text-white transition-colors cursor-pointer font-bold"
                  >
                    VIEW RECORDS
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};
