import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FACILITIES } from '../../data/initialData';

export const FiltersModal: React.FC = () => {
  const { isFilterModalOpen, setIsFilterModalOpen, addToast } = useApp();

  const [selectedFacility, setSelectedFacility] = useState('All');
  const [onlyFollowUps, setOnlyFollowUps] = useState(false);
  const [onlyAlerts, setOnlyAlerts] = useState(false);

  if (!isFilterModalOpen) return null;

  const handleApply = () => {
    addToast(
      `Filters applied: ${selectedFacility}${onlyFollowUps ? ', Follow-ups only' : ''}${
        onlyAlerts ? ', With risk alerts' : ''
      }`,
      'info'
    );
    setIsFilterModalOpen(false);
  };

  const handleReset = () => {
    setSelectedFacility('All');
    setOnlyFollowUps(false);
    setOnlyAlerts(false);
    addToast('Filters reset', 'info');
    setIsFilterModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#CED4DA] rounded max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-center pb-3 border-b border-[#CED4DA] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#001939]">tune</span>
            <h3 className="font-headline-md text-headline-md text-[#001939] font-bold">
              Filter Patient Directory
            </h3>
          </div>
          <button
            onClick={() => setIsFilterModalOpen(false)}
            className="text-[#5b5f64] hover:text-[#001939] p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-4 text-[#191c1d]">
          <div>
            <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
              Home Facility
            </label>
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="w-full h-12 px-3 border border-[#CED4DA] rounded bg-[#f8f9fa] font-body-md"
            >
              <option value="All">All Facilities</option>
              {FACILITIES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#CED4DA]">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyFollowUps}
                onChange={(e) => setOnlyFollowUps(e.target.checked)}
                className="w-5 h-5 border-2 border-[#CED4DA] text-[#002d5e] rounded"
              />
              <span className="text-sm font-body-md font-medium">Pending Follow-up Only</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyAlerts}
                onChange={(e) => setOnlyAlerts(e.target.checked)}
                className="w-5 h-5 border-2 border-[#CED4DA] text-[#002d5e] rounded"
              />
              <span className="text-sm font-body-md font-medium">Patients with Risk Alerts Only</span>
            </label>
          </div>

          <div className="flex gap-2 justify-between pt-4 border-t border-[#CED4DA]">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-label-caps text-[#5b5f64] hover:underline"
            >
              Reset Filters
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-4 py-2 border border-[#CED4DA] rounded font-label-caps text-xs font-bold text-[#5b5f64]"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-6 py-2 bg-[#002d5e] hover:bg-[#001939] text-white rounded font-label-caps text-xs font-bold shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
