import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { FACILITIES } from '../../data/initialData';
import { NavTab } from '../../types';

export const MenuDrawer: React.FC = () => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    currentUser,
    logout,
    selectedFacility,
    setSelectedFacility,
    isOffline,
    toggleOffline,
    activeTab,
    setActiveTab,
    activeView,
    setActiveView,
    patients,
    queue,
    referrals,
    searchQuery,
    setSearchQuery,
    setIsNewPatientModalOpen,
    setIsScanAbhaModalOpen,
    setIsBookModalOpen,
    setIsHistoryModalOpen,
  } = useApp();

  const [drawerSearch, setDrawerSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, setIsMenuOpen]);

  if (!isMenuOpen) return null;

  const navigateTo = (tab: NavTab) => {
    setActiveTab(tab);
    setActiveView('main');
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (drawerSearch.trim()) {
      setSearchQuery(drawerSearch.trim());
      setActiveTab('patients');
      setActiveView('main');
      setIsMenuOpen(false);
    }
  };

  const waitingQueueCount = queue.filter((q) => q.status !== 'completed').length;
  const activeReferralsCount = referrals.filter((r) => r.state !== 'completed').length;

  return (
    <div className="fixed inset-0 z-50 flex justify-start">
      {/* Backdrop */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className="fixed inset-0 bg-[#001939]/60 backdrop-blur-[2px] transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#f8f9fa] h-full shadow-2xl flex flex-col z-10 border-r-2 border-[#CED4DA] text-[#191c1d] overflow-y-auto animate-in slide-in-from-left duration-200">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-white border-b-2 border-[#CED4DA] flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#001939] text-white flex items-center justify-center shadow-sm">
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                health_and_safety
              </span>
            </div>
            <div>
              <span className="font-headline-md text-lg text-[#001939] font-bold tracking-tight block">
                RuralHealth
              </span>
              <span className="text-[11px] font-mono text-[#5b5f64] uppercase tracking-wider block">
                Facility & Referral Portal
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="h-10 w-10 text-[#5b5f64] hover:text-[#001939] hover:bg-[#edeeef] active:scale-95 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Quick Search In Drawer */}
        <div className="p-4 bg-white border-b border-[#CED4DA]">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#5b5f64] text-xl pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search patients, ABHA ID..."
              value={drawerSearch}
              onChange={(e) => setDrawerSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-10 bg-[#f8f9fa] border border-[#CED4DA] rounded-lg text-sm text-[#191c1d] placeholder:text-[#5b5f64] focus:bg-white focus:border-[#002d5e] focus:outline-none transition-colors"
            />
            {drawerSearch && (
              <button
                type="button"
                onClick={() => setDrawerSearch('')}
                className="absolute right-3 text-[#5b5f64] hover:text-[#001939]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            )}
          </form>
        </div>

        {/* TOP BAR OPTIONS SECTION */}
        <div className="p-4 border-b border-[#CED4DA]">
          <div className="flex items-center justify-between mb-3 px-1">
            <p className="font-label-caps text-xs text-[#5b5f64] uppercase font-bold tracking-wider">
              Top Bar Navigation
            </p>
            <span className="text-[11px] font-mono text-[#5b5f64] bg-[#e1e3e4] px-1.5 py-0.5 rounded">
              4 Main Modules
            </span>
          </div>

          <div className="space-y-1.5">
            {/* 1. Dashboard Option */}
            <button
              onClick={() => navigateTo('dashboard')}
              className={`w-full text-left p-3 rounded-lg flex items-center justify-between border transition-all cursor-pointer ${
                activeTab === 'dashboard' && activeView === 'main'
                  ? 'bg-[#001939] text-white border-[#001939] shadow-sm'
                  : 'bg-white text-[#191c1d] border-[#CED4DA] hover:bg-[#edeeef] hover:border-[#b0b8c1]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-md flex items-center justify-center ${
                    activeTab === 'dashboard' && activeView === 'main'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#e1e3e4] text-[#001939]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{
                      fontVariationSettings:
                        activeTab === 'dashboard' && activeView === 'main'
                          ? "'FILL' 1"
                          : "'FILL' 0",
                    }}
                  >
                    dashboard
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">Dashboard</p>
                  <p
                    className={`text-xs mt-0.5 ${
                      activeTab === 'dashboard' && activeView === 'main'
                        ? 'text-white/80'
                        : 'text-[#5b5f64]'
                    }`}
                  >
                    Facility overview & analytics
                  </p>
                </div>
              </div>
              {activeTab === 'dashboard' && activeView === 'main' && (
                <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded font-label-caps uppercase text-white">
                  Active
                </span>
              )}
            </button>

            {/* 2. Patients Option */}
            <button
              onClick={() => navigateTo('patients')}
              className={`w-full text-left p-3 rounded-lg flex items-center justify-between border transition-all cursor-pointer ${
                activeTab === 'patients' && activeView === 'main'
                  ? 'bg-[#001939] text-white border-[#001939] shadow-sm'
                  : 'bg-white text-[#191c1d] border-[#CED4DA] hover:bg-[#edeeef] hover:border-[#b0b8c1]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-md flex items-center justify-center ${
                    activeTab === 'patients' && activeView === 'main'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#e1e3e4] text-[#001939]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{
                      fontVariationSettings:
                        activeTab === 'patients' && activeView === 'main'
                          ? "'FILL' 1"
                          : "'FILL' 0",
                    }}
                  >
                    group
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">Patients</p>
                  <p
                    className={`text-xs mt-0.5 ${
                      activeTab === 'patients' && activeView === 'main'
                        ? 'text-white/80'
                        : 'text-[#5b5f64]'
                    }`}
                  >
                    Directory & ABHA records
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    activeTab === 'patients' && activeView === 'main'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#e1e3e4] text-[#001939]'
                  }`}
                >
                  {patients.length} pts
                </span>
                {activeTab === 'patients' && activeView === 'main' && (
                  <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded font-label-caps uppercase text-white">
                    Active
                  </span>
                )}
              </div>
            </button>

            {/* 3. Queue Option */}
            <button
              onClick={() => navigateTo('queue')}
              className={`w-full text-left p-3 rounded-lg flex items-center justify-between border transition-all cursor-pointer ${
                activeTab === 'queue' && activeView === 'main'
                  ? 'bg-[#001939] text-white border-[#001939] shadow-sm'
                  : 'bg-white text-[#191c1d] border-[#CED4DA] hover:bg-[#edeeef] hover:border-[#b0b8c1]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-md flex items-center justify-center ${
                    activeTab === 'queue' && activeView === 'main'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#e1e3e4] text-[#001939]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{
                      fontVariationSettings:
                        activeTab === 'queue' && activeView === 'main'
                          ? "'FILL' 1"
                          : "'FILL' 0",
                    }}
                  >
                    hourglass_empty
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">Queue</p>
                  <p
                    className={`text-xs mt-0.5 ${
                      activeTab === 'queue' && activeView === 'main'
                        ? 'text-white/80'
                        : 'text-[#5b5f64]'
                    }`}
                  >
                    Waiting line & appointments
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    activeTab === 'queue' && activeView === 'main'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#d6e3ff] text-[#001b3d]'
                  }`}
                >
                  {waitingQueueCount} wait
                </span>
                {activeTab === 'queue' && activeView === 'main' && (
                  <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded font-label-caps uppercase text-white">
                    Active
                  </span>
                )}
              </div>
            </button>

            {/* 4. Referrals Option */}
            <button
              onClick={() => navigateTo('referrals')}
              className={`w-full text-left p-3 rounded-lg flex items-center justify-between border transition-all cursor-pointer ${
                activeTab === 'referrals' && activeView === 'main'
                  ? 'bg-[#001939] text-white border-[#001939] shadow-sm'
                  : 'bg-white text-[#191c1d] border-[#CED4DA] hover:bg-[#edeeef] hover:border-[#b0b8c1]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-md flex items-center justify-center ${
                    activeTab === 'referrals' && activeView === 'main'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#e1e3e4] text-[#001939]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{
                      fontVariationSettings:
                        activeTab === 'referrals' && activeView === 'main'
                          ? "'FILL' 1"
                          : "'FILL' 0",
                    }}
                  >
                    swap_horiz
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">Referrals</p>
                  <p
                    className={`text-xs mt-0.5 ${
                      activeTab === 'referrals' && activeView === 'main'
                        ? 'text-white/80'
                        : 'text-[#5b5f64]'
                    }`}
                  >
                    Incoming & outgoing transfers
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    activeTab === 'referrals' && activeView === 'main'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#ffdcc2] text-[#6e3900]'
                  }`}
                >
                  {activeReferralsCount} active
                </span>
                {activeTab === 'referrals' && activeView === 'main' && (
                  <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded font-label-caps uppercase text-white">
                    Active
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Quick Clinical Actions & Tools */}
        <div className="p-4 border-b border-[#CED4DA]">
          <p className="font-label-caps text-xs text-[#5b5f64] uppercase font-bold tracking-wider mb-2.5 px-1">
            Clinical Tools & Shortcuts
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsNewPatientModalOpen(true);
              }}
              className="p-3 bg-white hover:bg-[#edeeef] border border-[#CED4DA] rounded-lg text-left transition-colors flex flex-col gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#002d5e] text-xl">
                person_add
              </span>
              <span className="text-xs font-bold text-[#001939]">New Patient</span>
              <span className="text-[10px] text-[#5b5f64]">Register profile</span>
            </button>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsScanAbhaModalOpen(true);
              }}
              className="p-3 bg-white hover:bg-[#edeeef] border border-[#CED4DA] rounded-lg text-left transition-colors flex flex-col gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#002d5e] text-xl">
                qr_code_scanner
              </span>
              <span className="text-xs font-bold text-[#001939]">Scan ABHA</span>
              <span className="text-[10px] text-[#5b5f64]">Camera / Card</span>
            </button>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsBookModalOpen(true);
              }}
              className="p-3 bg-white hover:bg-[#edeeef] border border-[#CED4DA] rounded-lg text-left transition-colors flex flex-col gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#002d5e] text-xl">
                calendar_add_on
              </span>
              <span className="text-xs font-bold text-[#001939]">Book Visit</span>
              <span className="text-[10px] text-[#5b5f64]">Schedule slot</span>
            </button>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsHistoryModalOpen(true);
              }}
              className="p-3 bg-white hover:bg-[#edeeef] border border-[#CED4DA] rounded-lg text-left transition-colors flex flex-col gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#002d5e] text-xl">
                history
              </span>
              <span className="text-xs font-bold text-[#001939]">Audit Logs</span>
              <span className="text-[10px] text-[#5b5f64]">Recent changes</span>
            </button>
          </div>
        </div>

        {/* Facility Context Selector */}
        <div className="p-4 border-b border-[#CED4DA] bg-white">
          <label className="block font-label-caps text-xs text-[#5b5f64] uppercase font-bold tracking-wider mb-2">
            Active Health Facility
          </label>
          <div className="relative">
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="w-full h-11 px-3 pr-8 border border-[#CED4DA] rounded-lg bg-[#f8f9fa] font-body-md text-sm text-[#001939] font-bold focus:border-[#002d5e] focus:outline-none appearance-none cursor-pointer"
            >
              {FACILITIES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[#5b5f64] pointer-events-none text-xl">
              arrow_drop_down
            </span>
          </div>
        </div>

        {/* Connection Mode / Offline Sync */}
        <div className="p-4 border-b border-[#CED4DA] flex items-center justify-between bg-white">
          <div>
            <p className="font-label-caps text-xs uppercase font-bold text-[#001939]">
              Connection Mode
            </p>
            <p className="text-xs text-[#5b5f64] mt-0.5">
              {isOffline ? 'Offline cache active (no network)' : 'Online and synced with server'}
            </p>
          </div>
          <button
            onClick={toggleOffline}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-label-caps border flex items-center gap-1.5 transition-colors cursor-pointer ${
              isOffline
                ? 'bg-[#495057] text-white border-[#343a40]'
                : 'bg-[#e7f4e8] text-[#1e4620] border-[#a3d9a5]'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {isOffline ? 'cloud_off' : 'cloud_done'}
            </span>
            <span>{isOffline ? 'Offline' : 'Online'}</span>
          </button>
        </div>

        {/* Signed In User & Logout */}
        <div className="p-4 mt-auto bg-white border-t border-[#CED4DA] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d6e3ff] text-[#001b3d] flex items-center justify-center font-bold text-sm">
              {currentUser?.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .substring(0, 2) || 'ST'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-[#001939] truncate">
                {currentUser?.name || 'Dr. Samuel Tadesse'}
              </p>
              <p className="text-xs text-[#5b5f64] truncate">
                {currentUser?.role || 'Clinical Health Officer'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsMenuOpen(false);
              logout();
            }}
            className="w-full h-11 border-2 border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6]/50 active:scale-[0.99] rounded-lg font-label-caps text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            Sign Out of Portal
          </button>
        </div>

      </div>
    </div>
  );
};

