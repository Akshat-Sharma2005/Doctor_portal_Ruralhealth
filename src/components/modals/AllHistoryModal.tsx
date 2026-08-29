import React from 'react';
import { useApp } from '../../context/AppContext';

export const AllHistoryModal: React.FC = () => {
  const { isHistoryModalOpen, setIsHistoryModalOpen, activities } = useApp();

  if (!isHistoryModalOpen) return null;

  const iconMap: Record<string, { icon: string; bg: string }> = {
    referral_accepted: { icon: 'check_circle', bg: 'bg-[#d6e3ff] text-[#001b3d]' },
    patient_registered: { icon: 'person', bg: 'bg-[#dde0e6] text-[#5f6369]' },
    stock_depleted: { icon: 'inventory_2', bg: 'bg-[#ffdad6] text-[#93000a]' },
    appointment_completed: { icon: 'task_alt', bg: 'bg-[#E8F5E9] text-[#1E4620]' },
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#CED4DA] rounded max-w-lg w-full max-h-[85vh] flex flex-col p-6 shadow-2xl">
        <div className="flex justify-between items-center pb-3 border-b border-[#CED4DA] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#001939]">history</span>
            <h3 className="font-headline-md text-headline-md text-[#001939] font-bold">
              Facility Audit & Activity Log
            </h3>
          </div>
          <button
            onClick={() => setIsHistoryModalOpen(false)}
            className="text-[#5b5f64] hover:text-[#001939] p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#CED4DA] pr-1">
          {activities.map((act) => {
            const styling = iconMap[act.type] || iconMap.referral_accepted;

            return (
              <div key={act.id} className="py-3 flex gap-3 items-start">
                <div className={`${styling.bg} rounded-full p-2 shrink-0 mt-0.5`}>
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {styling.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-body-md text-body-md font-bold text-[#001939]">
                      {act.title}
                    </p>
                    <span className="font-mono text-xs text-[#747780] shrink-0 ml-2">
                      {act.timeAgo}
                    </span>
                  </div>
                  <p className="font-body-md text-xs text-[#5b5f64] mt-0.5">
                    {act.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-[#CED4DA] flex justify-end">
          <button
            onClick={() => setIsHistoryModalOpen(false)}
            className="px-5 py-2 bg-[#002d5e] text-white rounded font-label-caps text-xs font-bold"
          >
            Close Log
          </button>
        </div>
      </div>
    </div>
  );
};
