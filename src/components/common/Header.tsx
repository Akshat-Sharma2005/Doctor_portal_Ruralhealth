import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onOpenMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'RuralHealth',
  showBack = false,
  onBack,
  onOpenMenu,
}) => {
  const {
    activeTab,
    setActiveTab,
    goBackToMain,
    activeView,
    searchQuery,
    setSearchQuery,
    isOffline,
    toggleOffline,
    currentUser,
    logout,
    setIsMenuOpen,
  } = useApp();

  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleOpenMenu = () => {
    if (onOpenMenu) {
      onOpenMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBackToMain();
    }
  };

  return (
    <header className="bg-[#f8f9fa] w-full top-0 sticky border-b-2 border-[#CED4DA] z-40">
      <div className="flex items-center justify-between px-4 md:px-8 h-[64px] w-full max-w-7xl mx-auto">
        {/* Left Side: Back / Menu + Title */}
        <div className="flex items-center gap-2">
          {showBack || activeView !== 'main' ? (
            <div className="flex items-center gap-1">
              <button
                onClick={handleBack}
                aria-label="Go back"
                title="Go back"
                className="text-[#001939] hover:bg-[#f3f4f5] active:opacity-80 transition-opacity p-2 -ml-2 rounded flex items-center justify-center h-11 w-11 cursor-pointer"
              >
                <span className="material-symbols-outlined text-2xl font-bold">arrow_back</span>
              </button>
              <button
                onClick={handleOpenMenu}
                aria-label="Open navigation menu"
                title="Open navigation menu"
                className="text-[#001939] hover:bg-[#f3f4f5] active:opacity-80 transition-opacity h-11 w-11 flex items-center justify-center rounded cursor-pointer"
              >
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                  menu
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleOpenMenu}
              aria-label="Open navigation menu"
              title="Open navigation menu"
              className="text-[#001939] hover:bg-[#f3f4f5] active:opacity-80 transition-opacity h-11 w-11 flex items-center justify-center rounded cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                menu
              </span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <h1 className="font-headline-md text-headline-md text-[#001939] font-bold tracking-tight">
              {title}
            </h1>
            {isOffline && (
              <span className="hidden sm:inline-flex items-center gap-1 bg-[#495057] text-white text-xs font-bold px-2 py-0.5 rounded uppercase font-label-caps">
                Offline
              </span>
            )}
          </div>
        </div>

        {/* Center: Desktop Navigation Bar */}
        {activeView === 'main' && (
          <nav className="hidden md:flex items-center gap-1 h-full">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`h-full px-4 flex items-center justify-center font-label-caps text-label-caps transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'text-[#001939] border-b-4 border-[#001939] font-bold bg-[#edeeef]/60'
                  : 'text-[#5b5f64] hover:bg-[#f3f4f5] hover:text-[#001939]'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`h-full px-4 flex items-center justify-center font-label-caps text-label-caps transition-colors cursor-pointer ${
                activeTab === 'patients'
                  ? 'text-[#001939] border-b-4 border-[#001939] font-bold bg-[#edeeef]/60'
                  : 'text-[#5b5f64] hover:bg-[#f3f4f5] hover:text-[#001939]'
              }`}
            >
              Patients
            </button>
            <button
              onClick={() => setActiveTab('queue')}
              className={`h-full px-4 flex items-center justify-center font-label-caps text-label-caps transition-colors cursor-pointer ${
                activeTab === 'queue'
                  ? 'text-[#001939] border-b-4 border-[#001939] font-bold bg-[#edeeef]/60'
                  : 'text-[#5b5f64] hover:bg-[#f3f4f5] hover:text-[#001939]'
              }`}
            >
              Queue
            </button>
            <button
              onClick={() => setActiveTab('referrals')}
              className={`h-full px-4 flex items-center justify-center font-label-caps text-label-caps transition-colors cursor-pointer ${
                activeTab === 'referrals'
                  ? 'text-[#001939] border-b-4 border-[#001939] font-bold bg-[#edeeef]/60'
                  : 'text-[#5b5f64] hover:bg-[#f3f4f5] hover:text-[#001939]'
              }`}
            >
              Referrals
            </button>
          </nav>
        )}

        {/* Right Side: Search & Actions */}
        <div className="flex items-center gap-2">
          {showSearchInput ? (
            <div className="relative flex items-center">
              <input
                type="text"
                autoFocus
                placeholder="Search patient, ID, clinic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-3 pr-8 w-44 sm:w-64 bg-white border border-[#CED4DA] rounded text-sm text-[#191c1d] focus:border-[#002d5e] focus:outline-none"
              />
              <button
                onClick={() => {
                  setShowSearchInput(false);
                  setSearchQuery('');
                }}
                className="absolute right-2 text-[#5b5f64] hover:text-[#001939]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearchInput(true)}
              aria-label="Search"
              className="text-[#001939] hover:bg-[#f3f4f5] active:opacity-80 transition-opacity h-12 w-12 flex items-center justify-center rounded cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                search
              </span>
            </button>
          )}

          {/* Quick Offline Mode Toggle for Testing */}
          <button
            onClick={toggleOffline}
            title={isOffline ? 'Switch to Online Mode' : 'Simulate Offline Mode'}
            className={`hidden sm:flex items-center gap-1.5 h-9 px-2.5 rounded border text-xs font-label-caps transition-colors cursor-pointer ${
              isOffline
                ? 'bg-[#495057] text-white border-[#343a40]'
                : 'bg-white text-[#5b5f64] border-[#CED4DA] hover:bg-[#f3f4f5]'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {isOffline ? 'cloud_off' : 'cloud_done'}
            </span>
            <span className="font-mono uppercase">{isOffline ? 'Offline' : 'Online'}</span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="h-10 px-2.5 bg-[#e1e3e4] hover:bg-[#dde0e6] text-[#001939] rounded flex items-center gap-2 border border-[#CED4DA] cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_circle
              </span>
              <span className="hidden lg:inline text-xs font-bold truncate max-w-[120px]">
                {currentUser?.name || 'Dr. Samuel'}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-[#CED4DA] rounded shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-[#CED4DA]">
                  <p className="font-bold text-sm text-[#001939]">{currentUser?.name}</p>
                  <p className="text-xs text-[#5b5f64]">{currentUser?.role}</p>
                  <p className="text-xs text-[#5b5f64] font-mono mt-0.5">{currentUser?.facility}</p>
                </div>
                <div className="p-2 space-y-1">
                  <button
                    onClick={() => {
                      toggleOffline();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-[#191c1d] hover:bg-[#f3f4f5] rounded flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">
                      {isOffline ? 'cloud_done' : 'cloud_off'}
                    </span>
                    <span>{isOffline ? 'Go Online' : 'Simulate Offline'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-[#ba1a1a] hover:bg-[#ffdad6] rounded flex items-center gap-2 font-bold"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
