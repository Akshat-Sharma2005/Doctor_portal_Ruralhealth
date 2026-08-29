import React from 'react';
import { useApp } from '../../context/AppContext';

export const OfflineBanner: React.FC = () => {
  const { isOffline, toggleOffline } = useApp();

  if (!isOffline) return null;

  return (
    <div
      id="offline-banner"
      role="alert"
      className="bg-[#856404] text-white font-status-badge text-status-badge py-2 px-4 flex items-center justify-between gap-2 w-full z-50 sticky top-0 shadow-sm"
    >
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            cloud_off
          </span>
          <span className="font-semibold text-sm">Offline Mode: Showing Cached Data</span>
        </div>
        <button
          onClick={toggleOffline}
          className="text-xs bg-black/20 hover:bg-black/40 text-white px-2.5 py-1 rounded border border-white/30 font-label-caps transition-colors cursor-pointer"
        >
          Reconnect
        </button>
      </div>
    </div>
  );
};
