import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  Patient,
  QueueItem,
  Referral,
  InventoryAlert,
  ActivityItem,
  NavTab,
  AppView,
  ReferralState,
  ReferralPriority,
} from '../types';
import {
  INITIAL_PATIENTS,
  INITIAL_QUEUE,
  INITIAL_REFERRALS,
  INITIAL_INVENTORY,
  INITIAL_ACTIVITIES,
} from '../data/initialData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  // Auth
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;

  // Navigation
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  selectedPatientId: string | null;
  setSelectedPatientId: (id: string | null) => void;
  selectedReferralId: string | null;
  setSelectedReferralId: (id: string | null) => void;

  // View Navigation Helpers
  openPatientProfile: (patientId: string) => void;
  openNewReferral: (patientId?: string) => void;
  openReferralDetail: (referralId: string) => void;
  openReferralCompletion: (referralId: string) => void;
  goBackToMain: () => void;

  // Data & Mutators
  patients: Patient[];
  addPatient: (patient: Omit<Patient, 'id' | 'initials'>) => Patient;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  getPatientById: (id: string) => Patient | undefined;

  queue: QueueItem[];
  checkInQueueItem: (id: string) => void;
  bookAppointment: (item: {
    patientId: string;
    patientName: string;
    time: string;
    reason: string;
    doctor?: string;
    room?: string;
  }) => void;
  completeQueueItem: (id: string) => void;

  referrals: Referral[];
  initiateReferral: (data: {
    patientId: string;
    patientName: string;
    originFacility?: string;
    destinationFacility: string;
    priority: ReferralPriority;
    clinicalNotes: string;
    preliminaryDiagnosis?: string;
  }) => Referral;
  updateReferralState: (id: string, state: ReferralState) => void;
  completeReferral: (id: string, outcome: {
    arrivalStatus: string;
    finalTreatment: string;
    receivingOfficer: string;
  }) => void;
  archiveReferral: (id: string) => void;
  addReferralComms: (referralId: string, text: string) => void;
  getReferralById: (id: string) => Referral | undefined;

  inventory: InventoryAlert[];
  restockItem: (id: string, amount: number) => void;

  activities: ActivityItem[];

  // Offline Simulation
  isOffline: boolean;
  toggleOffline: () => void;

  // Modals & Drawers
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isNewPatientModalOpen: boolean;
  setIsNewPatientModalOpen: (open: boolean) => void;
  isScanAbhaModalOpen: boolean;
  setIsScanAbhaModalOpen: (open: boolean) => void;
  isBookModalOpen: boolean;
  setIsBookModalOpen: (open: boolean) => void;
  isFilterModalOpen: boolean;
  setIsFilterModalOpen: (open: boolean) => void;
  isHistoryModalOpen: boolean;
  setIsHistoryModalOpen: (open: boolean) => void;
  isCommsModalOpen: boolean;
  setIsCommsModalOpen: (open: boolean) => void;
  activeCommsReferral: Referral | null;
  setActiveCommsReferral: (ref: Referral | null) => void;

  // Global Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFacility: string;
  setSelectedFacility: (fac: string) => void;

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Start on login page as explicitly instructed by user: "start from the login page then continue going on"
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [activeView, setActiveView] = useState<AppView>('login');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedReferralId, setSelectedReferralId] = useState<string | null>(null);

  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [queue, setQueue] = useState<QueueItem[]>(INITIAL_QUEUE);
  const [referrals, setReferrals] = useState<Referral[]>(INITIAL_REFERRALS);
  const [inventory, setInventory] = useState<InventoryAlert[]>(INITIAL_INVENTORY);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);

  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFacility, setSelectedFacility] = useState<string>('District Hospital Alpha');

  // Modals
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [isScanAbhaModalOpen, setIsScanAbhaModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isCommsModalOpen, setIsCommsModalOpen] = useState(false);
  const [activeCommsReferral, setActiveCommsReferral] = useState<Referral | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 't-' + Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleOffline = () => {
    setIsOffline((prev) => {
      const next = !prev;
      addToast(
        next ? 'Offline Mode enabled: working with local cached records' : 'Online Mode active: local records synced to server',
        next ? 'warning' : 'success'
      );
      return next;
    });
  };

  const login = (email: string, _pass: string) => {
    const user: User = {
      email: email || 'provider@ruralhealth.org',
      name: 'Dr. Samuel Tadesse',
      role: 'Clinical Health Officer',
      facility: 'District Hospital Alpha',
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
    setActiveView('main');
    setActiveTab('dashboard');
    addToast('Welcome back, Dr. Samuel Tadesse. Session established.', 'success');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveView('login');
    addToast('Logged out of RuralHealth provider portal.', 'info');
  };

  const openPatientProfile = (patientId: string) => {
    setSelectedPatientId(patientId);
    setActiveView('patient-profile');
  };

  const openNewReferral = (patientId?: string) => {
    if (patientId) {
      setSelectedPatientId(patientId);
    }
    setActiveView('new-referral');
  };

  const openReferralDetail = (referralId: string) => {
    setSelectedReferralId(referralId);
    setActiveView('incoming-referral-detail');
  };

  const openReferralCompletion = (referralId: string) => {
    setSelectedReferralId(referralId);
    setActiveView('referral-completion');
  };

  const goBackToMain = () => {
    setActiveView('main');
  };

  const addPatient = (patientData: Omit<Patient, 'id' | 'initials'>): Patient => {
    const initials = patientData.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'PT';

    const id = `RH-${Math.floor(1000 + Math.random() * 9000)}-${patientData.name[0] || 'X'}`;
    const newPatient: Patient = {
      ...patientData,
      id,
      initials,
      referrals: patientData.referrals || [],
      appointments: patientData.appointments || [],
      alerts: patientData.alerts || [],
    };

    setPatients((prev) => [newPatient, ...prev]);

    // Also add activity
    const newAct: ActivityItem = {
      id: 'act-' + Date.now(),
      type: 'patient_registered',
      title: 'Patient Registered',
      description: `${newPatient.name} added to records`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
    };
    setActivities((prev) => [newAct, ...prev]);

    addToast(`Patient ${newPatient.name} (ID: ${newPatient.id}) registered successfully!`, 'success');
    return newPatient;
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    addToast('Patient records updated.', 'info');
  };

  const getPatientById = (id: string) => {
    return patients.find((p) => p.id === id || p.abhaId === id);
  };

  const checkInQueueItem = (id: string) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'checked-in' as const } : item
      )
    );
    const item = queue.find((q) => q.id === id);
    if (item) {
      addToast(`${item.patientName} has been checked-in.`, 'success');
      // Add activity
      setActivities((prev) => [
        {
          id: 'act-' + Date.now(),
          type: 'patient_registered',
          title: 'Patient Checked In',
          description: `${item.patientName} is now in waiting queue`,
          timeAgo: 'Just now',
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  };

  const bookAppointment = (itemData: {
    patientId: string;
    patientName: string;
    time: string;
    reason: string;
    doctor?: string;
    room?: string;
  }) => {
    const initials = itemData.patientName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'PT';

    const newItem: QueueItem = {
      id: 'q-' + Date.now(),
      patientId: itemData.patientId,
      patientName: itemData.patientName,
      initials,
      time: itemData.time || '11:00 AM',
      reason: itemData.reason,
      status: 'booked',
      doctor: itemData.doctor || 'Dr. Samuel Tadesse',
      room: itemData.room || 'Room 1',
    };

    setQueue((prev) => [...prev, newItem]);
    addToast(`Appointment booked for ${itemData.patientName} at ${newItem.time}.`, 'success');
  };

  const completeQueueItem = (id: string) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'completed' as const } : item
      )
    );
    const item = queue.find((q) => q.id === id);
    if (item) {
      addToast(`Visit concluded for ${item.patientName}.`, 'success');
      setActivities((prev) => [
        {
          id: 'act-' + Date.now(),
          type: 'appointment_completed',
          title: 'Appointment Concluded',
          description: `${item.doctor || 'Provider'} completed consultation for ${item.patientName}`,
          timeAgo: 'Just now',
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  };

  const initiateReferral = (data: {
    patientId: string;
    patientName: string;
    originFacility?: string;
    destinationFacility: string;
    priority: ReferralPriority;
    clinicalNotes: string;
    preliminaryDiagnosis?: string;
  }): Referral => {
    const targetPatient = patients.find((p) => p.id === data.patientId || p.name === data.patientName);
    const refNum = Math.floor(4920 + Math.random() * 100);
    const refId = `#R-${refNum}`;

    const newReferral: Referral = {
      id: refId,
      patientId: data.patientId || targetPatient?.id || 'RH-TEMP',
      patientName: data.patientName || targetPatient?.name || 'Unknown Patient',
      patientAge: targetPatient?.age || 40,
      patientSex: targetPatient?.sex || 'M',
      patientDob: targetPatient?.dob || '01-01-1980',
      originFacility: data.originFacility || currentUser?.facility || 'Shashemene Clinic',
      referringProvider: currentUser?.name || 'Dr. Samuel Tadesse',
      destinationFacility: data.destinationFacility,
      direction: 'outgoing',
      priority: data.priority,
      state: 'initiated',
      dateInitiated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      clinicalNotes: data.clinicalNotes,
      preliminaryDiagnosis: data.preliminaryDiagnosis || 'Clinical referral evaluation',
      commsLog: [
        {
          id: 'c-' + Date.now(),
          sender: `${currentUser?.name || 'Dr. Samuel Tadesse'} (Origin Facility)`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Referral initiated with ${data.priority.toUpperCase()} priority to ${data.destinationFacility}. Notes: ${data.clinicalNotes.substring(0, 100)}...`,
        },
      ],
    };

    setReferrals((prev) => [newReferral, ...prev]);

    // Update patient referral history if patient exists
    if (targetPatient) {
      setPatients((prev) =>
        prev.map((p) => {
          if (p.id === targetPatient.id) {
            return {
              ...p,
              referrals: [
                {
                  id: refId.replace('#', ''),
                  title: `${data.preliminaryDiagnosis || 'Specialist Consult'}`,
                  targetFacility: data.destinationFacility,
                  date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                  status: 'Initiated',
                },
                ...(p.referrals || []),
              ],
            };
          }
          return p;
        })
      );
    }

    // Add activity
    setActivities((prev) => [
      {
        id: 'act-' + Date.now(),
        type: 'referral_accepted',
        title: 'Referral Initiated',
        description: `Patient ${newReferral.patientName} referred to ${newReferral.destinationFacility}`,
        timeAgo: 'Just now',
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);

    addToast(`Referral ${newReferral.id} initiated for ${newReferral.patientName}!`, 'success');
    return newReferral;
  };

  const updateReferralState = (id: string, newState: ReferralState) => {
    setReferrals((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const logEntry = {
            id: 'c-' + Date.now(),
            sender: `${currentUser?.name || 'Health Provider'}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: `Status transitioned to: ${newState.toUpperCase()}`,
          };
          return {
            ...r,
            state: newState,
            commsLog: [...(r.commsLog || []), logEntry],
          };
        }
        return r;
      })
    );
    addToast(`Referral ${id} status updated to ${newState}.`, 'success');
  };

  const completeReferral = (id: string, outcome: {
    arrivalStatus: string;
    finalTreatment: string;
    receivingOfficer: string;
  }) => {
    setReferrals((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const completedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            ...r,
            state: 'completed',
            outcome: {
              ...outcome,
              completedDate,
            },
            commsLog: [
              ...(r.commsLog || []),
              {
                id: 'c-' + Date.now(),
                sender: outcome.receivingOfficer || 'Receiving Officer',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: `Referral concluded. Arrival: ${outcome.arrivalStatus}. Treatment notes documented.`,
              },
            ],
          };
        }
        return r;
      })
    );

    // Add activity
    setActivities((prev) => [
      {
        id: 'act-' + Date.now(),
        type: 'referral_accepted',
        title: 'Referral Completed',
        description: `Referral ${id} completed by ${outcome.receivingOfficer}`,
        timeAgo: 'Just now',
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);

    addToast(`Referral ${id} marked as completed!`, 'success');
  };

  const archiveReferral = (id: string) => {
    setReferrals((prev) => prev.filter((r) => r.id !== id));
    addToast(`Referral ${id} archived from active view.`, 'info');
  };

  const addReferralComms = (referralId: string, text: string) => {
    setReferrals((prev) =>
      prev.map((r) => {
        if (r.id === referralId) {
          const newEntry = {
            id: 'c-' + Date.now(),
            sender: `${currentUser?.name || 'Dr. Samuel Tadesse'} (${currentUser?.facility || 'District Hospital Alpha'})`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text,
          };
          return {
            ...r,
            commsLog: [...(r.commsLog || []), newEntry],
          };
        }
        return r;
      })
    );
    addToast('Communication note appended to referral thread.', 'success');
  };

  const getReferralById = (id: string) => {
    return referrals.find((r) => r.id === id || r.id === `#${id}` || r.id.replace('#', '') === id.replace('#', ''));
  };

  const restockItem = (id: string, amount: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newUnits = (item.unitsLeft || 0) + amount;
          return {
            ...item,
            unitsLeft: newUnits,
            status: newUnits > 25 ? 'low' : newUnits > 0 ? 'low' : 'out-of-stock',
          };
        }
        return item;
      })
    );
    addToast(`Inventory restocked (+${amount} units).`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        activeTab,
        setActiveTab,
        activeView,
        setActiveView,
        selectedPatientId,
        setSelectedPatientId,
        selectedReferralId,
        setSelectedReferralId,
        openPatientProfile,
        openNewReferral,
        openReferralDetail,
        openReferralCompletion,
        goBackToMain,
        patients,
        addPatient,
        updatePatient,
        getPatientById,
        queue,
        checkInQueueItem,
        bookAppointment,
        completeQueueItem,
        referrals,
        initiateReferral,
        updateReferralState,
        completeReferral,
        archiveReferral,
        addReferralComms,
        getReferralById,
        inventory,
        restockItem,
        activities,
        isOffline,
        toggleOffline,
        isMenuOpen,
        setIsMenuOpen,
        isNewPatientModalOpen,
        setIsNewPatientModalOpen,
        isScanAbhaModalOpen,
        setIsScanAbhaModalOpen,
        isBookModalOpen,
        setIsBookModalOpen,
        isFilterModalOpen,
        setIsFilterModalOpen,
        isHistoryModalOpen,
        setIsHistoryModalOpen,
        isCommsModalOpen,
        setIsCommsModalOpen,
        activeCommsReferral,
        setActiveCommsReferral,
        searchQuery,
        setSearchQuery,
        selectedFacility,
        setSelectedFacility,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
