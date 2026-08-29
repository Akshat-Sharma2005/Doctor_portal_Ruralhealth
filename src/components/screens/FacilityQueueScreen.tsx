import React from 'react';
import { useApp } from '../../context/AppContext';

export const FacilityQueueScreen: React.FC = () => {
  const {
    queue,
    checkInQueueItem,
    openPatientProfile,
    setIsBookModalOpen,
    searchQuery,
  } = useApp();

  const filteredQueue = queue.filter(
    (item) =>
      item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalToday = queue.length > 0 ? 12 : 0;
  const completedCount = queue.filter((q) => q.status === 'completed').length || 3;
  const waitingCount = queue.filter((q) => q.status === 'checked-in').length || 4;

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-6 pb-28 md:pb-8">
      {/* Queue Header & Actions */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-[#001939] font-bold">
            Facility Queue
          </h2>
          <p className="font-body-md text-body-md text-[#43474f] mt-1">
            Today's Scheduled Appointments
          </p>
        </div>
        <button
          onClick={() => setIsBookModalOpen(true)}
          className="hidden md:flex items-center h-12 px-6 bg-[#002d5e] hover:bg-[#001939] text-white font-label-caps text-label-caps active:scale-95 transition-all rounded font-bold cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined mr-2">add</span>
          Book Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Queue List */}
        <div className="md:col-span-8 space-y-3">
          {filteredQueue.length === 0 ? (
            <div className="bg-white border-2 border-[#CED4DA] p-8 text-center rounded">
              <span className="material-symbols-outlined text-4xl text-[#5b5f64] mb-2">
                event_busy
              </span>
              <p className="font-headline-md text-headline-md text-[#001939]">
                No Appointments in Queue
              </p>
              <p className="text-sm text-[#5b5f64] mt-1">
                Book a new appointment or clear search filter.
              </p>
            </div>
          ) : (
            filteredQueue.map((item) => {
              const isCheckedIn = item.status === 'checked-in';
              const isCompleted = item.status === 'completed';

              return (
                <div
                  key={item.id}
                  className={`bg-white border-2 border-[#CED4DA] p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors group ${
                    isCheckedIn
                      ? 'border-l-[6px] border-l-[#001939]'
                      : isCompleted
                      ? 'opacity-60 border-l-[6px] border-l-[#1E4620]'
                      : 'hover:bg-[#f3f4f5]'
                  } rounded`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full font-headline-md text-headline-md font-bold ${
                        isCheckedIn
                          ? 'bg-[#d6e3ff] text-[#001b3d]'
                          : isCompleted
                          ? 'bg-[#E8F5E9] text-[#1E4620]'
                          : 'bg-[#e7e8e9] text-[#43474f]'
                      }`}
                    >
                      {item.initials}
                    </div>

                    <div>
                      <h3
                        onClick={() => openPatientProfile(item.patientId)}
                        className="font-headline-md text-headline-md text-[#191c1d] group-hover:text-[#001939] transition-colors font-bold cursor-pointer hover:underline"
                      >
                        {item.patientName}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 mt-1 text-[#43474f]">
                        <div className="flex items-center gap-1 font-body-md text-body-md">
                          <span className="material-symbols-outlined text-lg">schedule</span>
                          {item.time}
                        </div>
                        <span className="hidden sm:inline text-[#CED4DA]">|</span>
                        <div className="flex items-center gap-1 font-body-md text-body-md">
                          <span className="material-symbols-outlined text-lg">stethoscope</span>
                          {item.reason}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#CED4DA]">
                    {isCheckedIn ? (
                      <div className="inline-flex items-center px-2.5 py-1 bg-[#E8F5E9] text-[#1E4620] font-status-badge text-status-badge rounded border border-[#1E4620] font-bold">
                        <span
                          className="material-symbols-outlined text-sm mr-1"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        Checked-in
                      </div>
                    ) : isCompleted ? (
                      <div className="inline-flex items-center px-2.5 py-1 bg-[#f3f4f5] text-[#5b5f64] font-status-badge text-status-badge rounded border border-[#CED4DA] font-bold">
                        <span className="material-symbols-outlined text-sm mr-1">task_alt</span>
                        Completed
                      </div>
                    ) : (
                      <div className="inline-flex items-center px-2.5 py-1 bg-[#e7e8e9] text-[#43474f] font-status-badge text-status-badge rounded border border-[#c3c6d0] font-bold">
                        <span className="material-symbols-outlined text-sm mr-1">event</span>
                        Booked
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {!isCheckedIn && !isCompleted && (
                        <button
                          onClick={() => checkInQueueItem(item.id)}
                          className="h-10 px-4 bg-[#002d5e] text-white hover:bg-[#001939] font-label-caps text-label-caps rounded font-bold cursor-pointer transition-colors"
                        >
                          Check-in
                        </button>
                      )}

                      <button
                        onClick={() => openPatientProfile(item.patientId)}
                        className="h-10 px-4 border border-[#CED4DA] font-label-caps text-label-caps text-[#001939] hover:bg-[#f3f4f5] transition-colors rounded cursor-pointer font-bold"
                      >
                        View File
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Stats/Summary Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="bg-[#E9ECEF] border border-[#CED4DA] p-5 rounded">
            <h3 className="font-label-caps text-label-caps text-[#5b5f64] mb-4 uppercase font-bold">
              Queue Status
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-headline-lg text-headline-lg text-[#001939] font-bold">
                  {totalToday}
                </p>
                <p className="font-body-md text-body-md text-[#43474f]">Total Today</p>
              </div>
              <div>
                <p className="font-headline-lg text-headline-lg text-[#1E4620] font-bold">
                  {completedCount}
                </p>
                <p className="font-body-md text-body-md text-[#43474f]">Completed</p>
              </div>
              <div>
                <p className="font-headline-lg text-headline-lg text-[#856404] font-bold">
                  {waitingCount}
                </p>
                <p className="font-body-md text-body-md text-[#43474f]">Waiting</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAB (Mobile Only) */}
      <button
        onClick={() => setIsBookModalOpen(true)}
        className="md:hidden fixed bottom-24 right-4 h-14 px-6 bg-[#002d5e] text-white rounded-full shadow-lg flex items-center justify-center font-label-caps text-label-caps active:scale-95 transition-transform z-40 cursor-pointer font-bold"
      >
        <span className="material-symbols-outlined mr-2">add</span>
        Book
      </button>
    </main>
  );
};
