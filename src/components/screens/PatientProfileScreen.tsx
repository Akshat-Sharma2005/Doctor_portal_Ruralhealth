import React from 'react';
import { useApp } from '../../context/AppContext';

export const PatientProfileScreen: React.FC = () => {
  const {
    selectedPatientId,
    getPatientById,
    openNewReferral,
    openReferralDetail,
    setIsBookModalOpen,
    goBackToMain,
    patients,
  } = useApp();

  const patient = getPatientById(selectedPatientId || '') || patients[0];

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6 pb-24 md:pb-8">
      {/* Patient Header & Vitals Bento */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {/* Header Card */}
        <div className="md:col-span-8 bg-white border-2 border-[#CED4DA] rounded p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#001939] mb-1 font-bold">
                {patient.name}
              </h2>
              <p className="font-body-md text-body-md text-[#5b5f64] font-mono">
                {patient.age}{patient.sex} • ABHA: {patient.abhaId}
              </p>
              <p className="text-xs text-[#5b5f64] font-mono mt-0.5">
                Internal ID: {patient.id} • DOB: {patient.dob}
              </p>
            </div>
            <div className="bg-[#f3f4f5] p-3 rounded-full border border-[#CED4DA]">
              <span
                className="material-symbols-outlined text-4xl text-[#001939]"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                person
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => openNewReferral(patient.id)}
              className="bg-[#001939] hover:bg-[#002d5e] text-white font-label-caps text-label-caps px-6 py-3 rounded min-h-[48px] flex items-center gap-2 active:opacity-80 transition-colors cursor-pointer font-bold shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              Initiate Referral
            </button>

            <button
              onClick={() => setIsBookModalOpen(true)}
              className="bg-white text-[#001939] border-2 border-[#001939] hover:bg-[#f3f4f5] font-label-caps text-label-caps px-6 py-3 rounded min-h-[48px] flex items-center gap-2 active:opacity-80 transition-colors cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              Book Appointment
            </button>
          </div>
        </div>

        {/* Vitals Information */}
        <div className="md:col-span-4 bg-[#E9ECEF] border-2 border-[#CED4DA] rounded p-6 flex flex-col justify-center">
          <h3 className="font-label-caps text-label-caps text-[#5b5f64] mb-4 uppercase font-bold">
            Vital Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#001939]">local_hospital</span>
              <div>
                <p className="font-label-caps text-label-caps text-[#5b5f64] text-[12px] uppercase">
                  Home Facility
                </p>
                <p className="font-body-md text-body-md text-[#191c1d] font-semibold">
                  {patient.homeFacility}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#001939]">call</span>
              <div>
                <p className="font-label-caps text-label-caps text-[#5b5f64] text-[12px] uppercase">
                  Contact
                </p>
                <p className="font-body-md text-body-md text-[#191c1d] font-semibold font-mono">
                  {patient.contact}
                </p>
              </div>
            </div>

            {patient.alerts && patient.alerts.length > 0 ? (
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-[#B71C1C]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  warning
                </span>
                <div>
                  <p className="font-label-caps text-label-caps text-[#5b5f64] text-[12px] uppercase">
                    Alerts
                  </p>
                  <p className="font-body-md text-body-md text-[#B71C1C] font-bold">
                    {patient.alerts.join(', ')}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1E4620]">verified</span>
                <div>
                  <p className="font-label-caps text-label-caps text-[#5b5f64] text-[12px] uppercase">
                    Alerts
                  </p>
                  <p className="font-body-md text-body-md text-[#1E4620] font-semibold">
                    No critical risk flags
                  </p>
                </div>
              </div>
            )}

            {patient.vitals && (
              <div className="pt-2 border-t border-[#CED4DA] grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-[#5b5f64]">BP: </span>
                  <span className="font-bold">{patient.vitals.bp || '120/80'}</span>
                </div>
                <div>
                  <span className="text-[#5b5f64]">SpO2: </span>
                  <span className="font-bold">{patient.vitals.spo2 || '98%'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Referral History */}
      <section className="bg-white border-2 border-[#CED4DA] rounded overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#CED4DA] bg-[#f8f9fa] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#001939]">swap_horiz</span>
            <h3 className="font-headline-md text-headline-md text-[#001939] font-bold">
              Referral History
            </h3>
          </div>
          <button
            onClick={() => openNewReferral(patient.id)}
            className="text-xs font-label-caps text-[#002d5e] hover:underline font-bold"
          >
            + New Referral
          </button>
        </div>

        <div className="divide-y divide-[#CED4DA]">
          {patient.referrals && patient.referrals.length > 0 ? (
            patient.referrals.map((ref) => {
              const isAccepted = ref.status === 'Accepted';
              const isCompleted = ref.status === 'Completed';

              return (
                <div
                  key={ref.id}
                  className={`p-4 hover:bg-[#f3f4f5] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isAccepted ? 'border-l-4 border-l-[#001939] bg-[#f3f4f5]/60' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded font-status-badge text-status-badge border ${
                          isAccepted
                            ? 'bg-[#3e5f92]/20 text-[#244779] border-[#3e5f92]'
                            : isCompleted
                            ? 'bg-[#1E4620]/10 text-[#1E4620] border-[#1E4620]/30'
                            : 'bg-[#ffdad6] text-[#93000a] border-[#ffdad6]'
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {isCompleted ? 'check_circle' : 'sync'}
                        </span>
                        {ref.status}
                      </span>
                      <span className="font-body-md text-body-md text-[#5b5f64] font-mono text-sm">
                        {ref.date}
                      </span>
                    </div>
                    <p className="font-body-lg text-body-lg font-bold text-[#191c1d]">
                      {ref.title}
                    </p>
                    <p className="font-body-md text-body-md text-[#5b5f64] flex items-center gap-1 mt-1 font-medium">
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      {ref.targetFacility}
                    </p>
                  </div>

                  <button
                    onClick={() => openReferralDetail(ref.id)}
                    className="bg-white border border-[#CED4DA] px-4 py-2 rounded font-label-caps text-label-caps text-[#001939] hover:bg-[#f3f4f5] min-h-[48px] font-bold cursor-pointer transition-colors shadow-xs"
                  >
                    View Details
                  </button>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-[#5b5f64] font-body-md">
              No referral history recorded for this patient.
            </div>
          )}
        </div>
      </section>

      {/* Appointment History */}
      <section className="bg-white border-2 border-[#CED4DA] rounded overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#CED4DA] bg-[#f8f9fa] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#001939]">history</span>
            <h3 className="font-headline-md text-headline-md text-[#001939] font-bold">
              Appointment History
            </h3>
          </div>
          <button
            onClick={() => setIsBookModalOpen(true)}
            className="text-xs font-label-caps text-[#002d5e] hover:underline font-bold"
          >
            + Book Appointment
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {patient.appointments && patient.appointments.length > 0 ? (
            patient.appointments.map((apt) => (
              <div
                key={apt.id}
                className="border border-[#CED4DA] rounded p-4 hover:border-[#001939] transition-colors bg-[#f8f9fa] min-h-[48px]"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-label-caps text-label-caps text-[#5b5f64] font-bold">
                    {apt.date}
                  </span>
                  <span className="material-symbols-outlined text-[#5b5f64]">more_vert</span>
                </div>
                <p className="font-body-lg text-body-lg font-bold text-[#191c1d] mb-1">
                  {apt.title}
                </p>
                <p className="font-body-md text-sm text-[#43474f]">{apt.notes}</p>
                {apt.provider && (
                  <p className="text-xs font-mono text-[#5b5f64] mt-2 pt-2 border-t border-[#CED4DA]">
                    Provider: {apt.provider}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-3 p-6 text-center text-[#5b5f64]">
              No past appointments recorded.
            </div>
          )}
        </div>
      </section>

      {/* Back button link */}
      <div className="pt-2">
        <button
          onClick={goBackToMain}
          className="text-sm font-label-caps text-[#002d5e] hover:underline flex items-center gap-1 font-bold cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Patient Directory
        </button>
      </div>
    </main>
  );
};
