import React from 'react';
import { useApp } from '../../context/AppContext';
import { Referral } from '../../types';

export const ReferralTrackingScreen: React.FC = () => {
  const {
    referrals,
    openNewReferral,
    openReferralDetail,
    openReferralCompletion,
    archiveReferral,
    setIsCommsModalOpen,
    setActiveCommsReferral,
    searchQuery,
  } = useApp();

  const filteredReferrals = referrals.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.patientName.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      r.destinationFacility.toLowerCase().includes(q) ||
      r.originFacility.toLowerCase().includes(q)
    );
  });

  const outgoing = filteredReferrals.filter((r) => r.direction === 'outgoing' || r.state !== 'completed');
  const incoming = filteredReferrals.filter((r) => r.direction === 'incoming' || r.state === 'completed');

  const handleViewComms = (ref: Referral) => {
    setActiveCommsReferral(ref);
    setIsCommsModalOpen(true);
  };

  return (
    <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full pb-24 md:pb-8">
      {/* Header & Quick Action */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#001939] font-bold">
          Referral Tracking
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => openNewReferral()}
            className="h-12 px-4 bg-[#002d5e] hover:bg-[#001939] text-white flex items-center justify-center font-label-caps text-label-caps rounded transition-opacity font-bold cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined mr-2">add</span>
            NEW REFERRAL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Outgoing Referrals Section */}
        <section className="bg-white border-2 border-[#CED4DA] rounded p-4 md:p-6 shadow-sm">
          <h3 className="font-headline-md text-headline-md text-[#001939] mb-4 flex items-center font-bold">
            <span className="material-symbols-outlined mr-2">north_east</span>
            Outgoing
          </h3>

          <div className="space-y-4">
            {outgoing.length === 0 ? (
              <p className="text-sm text-[#5b5f64] p-4 text-center">No active outgoing referrals.</p>
            ) : (
              outgoing.map((ref) => {
                const isUrgent = ref.priority === 'urgent' || ref.priority === 'emergency';
                const isInitiated = ref.state === 'initiated';
                const isAccepted = ref.state === 'accepted';
                const isCompleted = ref.state === 'completed';

                return (
                  <div
                    key={ref.id}
                    className={`p-4 bg-[#f8f9fa] rounded flex flex-col md:flex-row gap-4 justify-between transition-all ${
                      isUrgent
                        ? 'border-l-4 border-l-[#B71C1C] border-t-2 border-r-2 border-b-2 border-[#CED4DA]'
                        : 'border-2 border-[#CED4DA]'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-body-md text-body-md text-[#5b5f64] font-mono text-sm font-bold">
                          Ref ID: {ref.id}
                        </p>
                        {isUrgent && (
                          <span className="bg-[#FFCDD2] text-[#B71C1C] px-2 py-0.5 rounded font-status-badge text-status-badge flex items-center font-bold border border-[#B71C1C] text-xs">
                            <span
                              className="material-symbols-outlined text-[14px] mr-1"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              warning
                            </span>
                            {ref.priority.toUpperCase()}
                          </span>
                        )}
                      </div>

                      <h4
                        onClick={() => openReferralDetail(ref.id)}
                        className="font-headline-md text-headline-md text-[#191c1d] mb-2 font-bold cursor-pointer hover:underline"
                      >
                        {ref.patientName}
                      </h4>

                      <div className="flex items-center text-[#5b5f64] font-body-md text-sm mb-1">
                        <span className="material-symbols-outlined text-[18px] mr-1">storefront</span>
                        From: {ref.originFacility}
                      </div>
                      <div className="flex items-center text-[#5b5f64] font-body-md text-sm">
                        <span className="material-symbols-outlined text-[18px] mr-1">local_hospital</span>
                        To: {ref.destinationFacility}
                      </div>
                    </div>

                    <div className="flex-1 min-w-[200px] border-l-0 md:border-l-2 border-[#CED4DA] pl-0 md:pl-4 pt-4 md:pt-0 flex flex-col justify-between">
                      {/* State Tracker */}
                      <div className="flex items-center justify-between mb-2">
                        {/* Step 1: Initiated */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                              isInitiated
                                ? 'bg-[#002d5e] text-white border-[#002d5e]'
                                : 'bg-[#1E4620] text-white border-[#1E4620]'
                            }`}
                          >
                            <span
                              className="material-symbols-outlined text-[16px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              {isInitiated ? 'radio_button_checked' : 'check'}
                            </span>
                          </div>
                          <span
                            className={`font-status-badge text-status-badge mt-1 ${
                              isInitiated ? 'text-[#001939]' : 'text-[#1E4620]'
                            }`}
                          >
                            Initiated
                          </span>
                        </div>

                        <div
                          className={`flex-1 h-1 mx-1 ${
                            isAccepted || isCompleted ? 'bg-[#1E4620]' : 'bg-[#CED4DA]'
                          }`}
                        ></div>

                        {/* Step 2: Accepted */}
                        <div
                          className={`flex flex-col items-center ${
                            !isAccepted && !isCompleted ? 'opacity-50' : ''
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                              isAccepted
                                ? 'bg-[#002d5e] text-white border-[#002d5e]'
                                : isCompleted
                                ? 'bg-[#1E4620] text-white border-[#1E4620]'
                                : 'bg-[#e1e3e4] text-[#5b5f64] border-[#CED4DA]'
                            }`}
                          >
                            <span
                              className="material-symbols-outlined text-[16px]"
                              style={{ fontVariationSettings: isAccepted ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              {isAccepted ? 'radio_button_checked' : isCompleted ? 'check' : 'radio_button_unchecked'}
                            </span>
                          </div>
                          <span
                            className={`font-status-badge text-status-badge mt-1 ${
                              isAccepted ? 'text-[#001939]' : isCompleted ? 'text-[#1E4620]' : 'text-[#5b5f64]'
                            }`}
                          >
                            Accepted
                          </span>
                        </div>

                        <div
                          className={`flex-1 h-1 mx-1 ${
                            isCompleted ? 'bg-[#1E4620]' : 'bg-[#CED4DA]'
                          }`}
                        ></div>

                        {/* Step 3: Completed */}
                        <div className={`flex flex-col items-center ${!isCompleted ? 'opacity-50' : ''}`}>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                              isCompleted
                                ? 'bg-[#1E4620] text-white border-[#1E4620]'
                                : 'bg-[#e1e3e4] text-[#5b5f64] border-[#CED4DA]'
                            }`}
                          >
                            <span
                              className="material-symbols-outlined text-[16px]"
                              style={{ fontVariationSettings: isCompleted ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              check_circle
                            </span>
                          </div>
                          <span
                            className={`font-status-badge text-status-badge mt-1 ${
                              isCompleted ? 'text-[#1E4620]' : 'text-[#5b5f64]'
                            }`}
                          >
                            Completed
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-4 flex justify-end gap-2">
                        {isAccepted ? (
                          <>
                            <button
                              onClick={() => handleViewComms(ref)}
                              className="h-10 px-4 bg-[#002d5e] hover:bg-[#001939] text-white font-label-caps text-label-caps rounded font-bold cursor-pointer shadow-xs"
                            >
                              VIEW COMMS
                            </button>
                            <button
                              onClick={() => openReferralCompletion(ref.id)}
                              className="h-10 px-4 border-2 border-[#002d5e] text-[#002d5e] hover:bg-[#f3f4f5] font-label-caps text-label-caps rounded font-bold cursor-pointer"
                            >
                              COMPLETE
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => openReferralDetail(ref.id)}
                            className="h-10 px-4 border-2 border-[#CED4DA] text-[#001939] hover:bg-[#f3f4f5] font-label-caps text-label-caps rounded font-bold cursor-pointer"
                          >
                            UPDATE
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Incoming Referrals Section */}
        <section className="bg-white border-2 border-[#CED4DA] rounded p-4 md:p-6 shadow-sm">
          <h3 className="font-headline-md text-headline-md text-[#001939] mb-4 flex items-center font-bold">
            <span className="material-symbols-outlined mr-2">south_west</span>
            Incoming
          </h3>

          <div className="space-y-4">
            {incoming.length === 0 ? (
              <p className="text-sm text-[#5b5f64] p-4 text-center">No incoming referrals right now.</p>
            ) : (
              incoming.map((ref) => {
                const isCompleted = ref.state === 'completed';

                return (
                  <div
                    key={ref.id}
                    className={`border-2 border-[#CED4DA] p-4 bg-[#f8f9fa] rounded flex flex-col md:flex-row gap-4 justify-between transition-all ${
                      isCompleted ? 'opacity-85' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-body-md text-body-md text-[#5b5f64] mb-1 font-mono text-sm font-bold">
                        Ref ID: {ref.id}
                      </p>
                      <h4
                        onClick={() => openReferralDetail(ref.id)}
                        className="font-headline-md text-headline-md text-[#191c1d] mb-2 font-bold cursor-pointer hover:underline"
                      >
                        {ref.patientName}
                      </h4>
                      <div className="flex items-center text-[#5b5f64] font-body-md text-sm mb-1">
                        <span className="material-symbols-outlined text-[18px] mr-1">storefront</span>
                        From: {ref.originFacility}
                      </div>
                      <div className="flex items-center text-[#5b5f64] font-body-md text-sm">
                        <span className="material-symbols-outlined text-[18px] mr-1">local_hospital</span>
                        To: {ref.destinationFacility}
                      </div>
                    </div>

                    <div className="flex-1 min-w-[200px] border-l-0 md:border-l-2 border-[#CED4DA] pl-0 md:pl-4 pt-4 md:pt-0 flex flex-col justify-between">
                      {/* State Tracker */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#1E4620] text-white flex items-center justify-center border-2 border-[#1E4620]">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </div>
                          <span className="font-status-badge text-status-badge text-[#1E4620] mt-1">
                            Initiated
                          </span>
                        </div>

                        <div className="flex-1 h-1 bg-[#1E4620] mx-1"></div>

                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#1E4620] text-white flex items-center justify-center border-2 border-[#1E4620]">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </div>
                          <span className="font-status-badge text-status-badge text-[#1E4620] mt-1">
                            Accepted
                          </span>
                        </div>

                        <div className="flex-1 h-1 bg-[#1E4620] mx-1"></div>

                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#1E4620] text-white flex items-center justify-center border-2 border-[#1E4620]">
                            <span
                              className="material-symbols-outlined text-[16px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                          </div>
                          <span className="font-status-badge text-status-badge text-[#1E4620] mt-1">
                            Completed
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          onClick={() => openReferralDetail(ref.id)}
                          className="h-10 px-3 border border-[#CED4DA] text-[#001939] font-label-caps text-xs rounded hover:bg-[#f3f4f5] cursor-pointer"
                        >
                          DETAILS
                        </button>
                        <button
                          onClick={() => archiveReferral(ref.id)}
                          className="h-10 px-4 border-2 border-[#CED4DA] text-[#5b5f64] font-label-caps text-label-caps rounded hover:bg-[#f3f4f5] transition-colors cursor-pointer font-bold"
                        >
                          ARCHIVE
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </main>
  );
};
