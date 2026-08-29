import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavTab } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, activeView, setActiveView } = useApp();

  const handleTabClick = (tab: NavTab) => {
    setActiveTab(tab);
    if (activeView !== 'main') {
      setActiveView('main');
    }
  };

  return (
    <nav className="md:hidden bg-[#f8f9fa] fixed bottom-0 w-full z-50 h-20 border-t-2 border-[#CED4DA] flex justify-around items-center px-2">
      {/* Active/Inactive Tab: Dashboard */}
      <button
        onClick={() => handleTabClick('dashboard')}
        className={`flex flex-col items-center justify-center pt-1 h-full min-w-[64px] flex-1 active:scale-95 transition-transform cursor-pointer ${
          activeTab === 'dashboard' && activeView === 'main'
            ? 'text-[#001939] border-t-4 border-[#001939] bg-[#e1e3e4]/40'
            : 'text-[#5b5f64] hover:bg-[#e1e3e4]'
        }`}
      >
        <span
          className="material-symbols-outlined mb-1"
          style={{
            fontVariationSettings: activeTab === 'dashboard' && activeView === 'main' ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          dashboard
        </span>
        <span className="font-label-caps text-[10px] sm:text-label-caps uppercase">
          Dashboard
        </span>
      </button>

      {/* Tab: Patients */}
      <button
        onClick={() => handleTabClick('patients')}
        className={`flex flex-col items-center justify-center pt-1 h-full min-w-[64px] flex-1 active:scale-95 transition-transform cursor-pointer ${
          activeTab === 'patients' && activeView === 'main'
            ? 'text-[#001939] border-t-4 border-[#001939] bg-[#e1e3e4]/40'
            : 'text-[#5b5f64] hover:bg-[#e1e3e4]'
        }`}
      >
        <span
          className="material-symbols-outlined mb-1"
          style={{
            fontVariationSettings: activeTab === 'patients' && activeView === 'main' ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          group
        </span>
        <span className="font-label-caps text-[10px] sm:text-label-caps uppercase">
          Patients
        </span>
      </button>

      {/* Tab: Queue */}
      <button
        onClick={() => handleTabClick('queue')}
        className={`flex flex-col items-center justify-center pt-1 h-full min-w-[64px] flex-1 active:scale-95 transition-transform cursor-pointer ${
          activeTab === 'queue' && activeView === 'main'
            ? 'text-[#001939] border-t-4 border-[#001939] bg-[#e1e3e4]/40'
            : 'text-[#5b5f64] hover:bg-[#e1e3e4]'
        }`}
      >
        <span
          className="material-symbols-outlined mb-1"
          style={{
            fontVariationSettings: activeTab === 'queue' && activeView === 'main' ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          hourglass_empty
        </span>
        <span className="font-label-caps text-[10px] sm:text-label-caps uppercase">
          Queue
        </span>
      </button>

      {/* Tab: Referrals */}
      <button
        onClick={() => handleTabClick('referrals')}
        className={`flex flex-col items-center justify-center pt-1 h-full min-w-[64px] flex-1 active:scale-95 transition-transform cursor-pointer ${
          activeTab === 'referrals' && activeView === 'main'
            ? 'text-[#001939] border-t-4 border-[#001939] bg-[#e1e3e4]/40'
            : 'text-[#5b5f64] hover:bg-[#e1e3e4]'
        }`}
      >
        <span
          className="material-symbols-outlined mb-1"
          style={{
            fontVariationSettings: activeTab === 'referrals' && activeView === 'main' ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          swap_horiz
        </span>
        <span className="font-label-caps text-[10px] sm:text-label-caps uppercase">
          Referrals
        </span>
      </button>
    </nav>
  );
};
