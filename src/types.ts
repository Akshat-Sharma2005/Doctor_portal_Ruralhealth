export interface User {
  email: string;
  name: string;
  role: string;
  facility: string;
}

export interface Patient {
  id: string;
  abhaId: string;
  initials: string;
  name: string;
  age: number;
  sex: 'M' | 'F' | 'Other';
  dob: string;
  homeFacility: string;
  contact: string;
  needsFollowUp?: boolean;
  alerts: string[];
  referrals?: {
    id: string;
    title: string;
    targetFacility: string;
    date: string;
    status: 'Initiated' | 'Accepted' | 'Completed' | 'Declined';
  }[];
  appointments?: {
    id: string;
    date: string;
    title: string;
    notes: string;
    provider?: string;
  }[];
  vitals?: {
    bp?: string;
    temp?: string;
    pulse?: string;
    spo2?: string;
    weight?: string;
  };
}

export type QueueStatus = 'checked-in' | 'booked' | 'in-consult' | 'completed';

export interface QueueItem {
  id: string;
  patientId: string;
  patientName: string;
  initials: string;
  time: string;
  reason: string;
  status: QueueStatus;
  doctor?: string;
  room?: string;
}

export type ReferralPriority = 'normal' | 'urgent' | 'emergency';
export type ReferralState = 'initiated' | 'accepted' | 'completed' | 'declined';
export type ReferralDirection = 'outgoing' | 'incoming';

export interface Referral {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientSex: 'M' | 'F' | 'Other';
  patientDob: string;
  originFacility: string;
  referringProvider: string;
  destinationFacility: string;
  direction: ReferralDirection;
  priority: ReferralPriority;
  state: ReferralState;
  dateInitiated: string;
  clinicalNotes: string;
  preliminaryDiagnosis: string;
  outcome?: {
    arrivalStatus: string;
    finalTreatment: string;
    receivingOfficer: string;
    completedDate: string;
  };
  commsLog?: {
    id: string;
    sender: string;
    time: string;
    text: string;
  }[];
}

export interface InventoryAlert {
  id: string;
  item: string;
  unit: string;
  status: 'low' | 'out-of-stock';
  unitsLeft?: number;
}

export interface ActivityItem {
  id: string;
  type: 'referral_accepted' | 'patient_registered' | 'stock_depleted' | 'appointment_completed';
  title: string;
  description: string;
  timeAgo: string;
  timestamp: string;
}

export type NavTab = 'dashboard' | 'patients' | 'queue' | 'referrals';
export type AppView = 
  | 'login'
  | 'main'
  | 'patient-profile'
  | 'new-referral'
  | 'incoming-referral-detail'
  | 'referral-completion';
