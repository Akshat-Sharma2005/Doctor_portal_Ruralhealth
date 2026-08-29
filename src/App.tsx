/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { OfflineBanner } from './components/common/OfflineBanner';
import { ToastContainer } from './components/common/ToastContainer';

import { LoginScreen } from './components/screens/LoginScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { FacilityQueueScreen } from './components/screens/FacilityQueueScreen';
import { PatientDirectoryScreen } from './components/screens/PatientDirectoryScreen';
import { PatientProfileScreen } from './components/screens/PatientProfileScreen';
import { ReferralTrackingScreen } from './components/screens/ReferralTrackingScreen';
import { NewReferralScreen } from './components/screens/NewReferralScreen';
import { IncomingReferralDetailScreen } from './components/screens/IncomingReferralDetailScreen';
import { ReferralCompletionScreen } from './components/screens/ReferralCompletionScreen';

import { NewPatientModal } from './components/modals/NewPatientModal';
import { ScanAbhaModal } from './components/modals/ScanAbhaModal';
import { BookAppointmentModal } from './components/modals/BookAppointmentModal';
import { FiltersModal } from './components/modals/FiltersModal';
import { AllHistoryModal } from './components/modals/AllHistoryModal';
import { CommsLogModal } from './components/modals/CommsLogModal';
import { MenuDrawer } from './components/modals/MenuDrawer';

const AppContent: React.FC = () => {
  const { isAuthenticated, activeView, activeTab } = useApp();

  // If not authenticated or on login screen, show the LoginScreen
  if (!isAuthenticated || activeView === 'login') {
    return (
      <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">
        <OfflineBanner />
        <LoginScreen />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex flex-col font-body-md antialiased selection:bg-[#d6e3ff] selection:text-[#001b3d]">
      <OfflineBanner />
      <Header />

      {/* Main Screen Router */}
      <div className="flex-1 flex flex-col">
        {activeView === 'main' && (
          <>
            {activeTab === 'dashboard' && <DashboardScreen />}
            {activeTab === 'patients' && <PatientDirectoryScreen />}
            {activeTab === 'queue' && <FacilityQueueScreen />}
            {activeTab === 'referrals' && <ReferralTrackingScreen />}
          </>
        )}

        {activeView === 'patient-profile' && <PatientProfileScreen />}
        {activeView === 'new-referral' && <NewReferralScreen />}
        {activeView === 'incoming-referral-detail' && <IncomingReferralDetailScreen />}
        {activeView === 'referral-completion' && <ReferralCompletionScreen />}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Interactive Modals & Drawers */}
      <NewPatientModal />
      <ScanAbhaModal />
      <BookAppointmentModal />
      <FiltersModal />
      <AllHistoryModal />
      <CommsLogModal />
      <MenuDrawer />

      {/* Toast Feedback */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
