import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const BookAppointmentModal: React.FC = () => {
  const { isBookModalOpen, setIsBookModalOpen, patients, bookQueueAppointment } = useApp();

  const [patientId, setPatientId] = useState(patients[0]?.id || 'RH-3042-M');
  const [time, setTime] = useState('10:30 AM');
  const [reason, setReason] = useState('General Consultation');

  if (!isBookModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPatient = patients.find((p) => p.id === patientId) || patients[0];

    bookQueueAppointment({
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      initials: selectedPatient.initials,
      time,
      reason,
      status: 'booked',
    });

    setIsBookModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#CED4DA] rounded max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-center pb-3 border-b border-[#CED4DA] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#001939]">calendar_month</span>
            <h3 className="font-headline-md text-headline-md text-[#001939] font-bold">
              Book Queue Appointment
            </h3>
          </div>
          <button
            onClick={() => setIsBookModalOpen(false)}
            className="text-[#5b5f64] hover:text-[#001939] p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
              Select Patient *
            </label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full h-12 px-3 border border-[#CED4DA] rounded bg-[#f8f9fa] font-body-md"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id}) — {p.homeFacility}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
              Time Slot *
            </label>
            <input
              type="text"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 10:30 AM"
              className="w-full h-12 px-4 border border-[#CED4DA] rounded bg-[#f8f9fa] font-body-md"
            />
          </div>

          <div>
            <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
              Reason for Visit *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-12 px-3 border border-[#CED4DA] rounded bg-[#f8f9fa] font-body-md"
            >
              <option value="General Checkup">General Checkup</option>
              <option value="Immunization">Immunization</option>
              <option value="Maternal Care">Maternal Care</option>
              <option value="Cardiology Follow-up">Cardiology Follow-up</option>
              <option value="TB Screening">TB Screening</option>
              <option value="Malaria Rapid Test">Malaria Rapid Test</option>
              <option value="Prescription Refill">Prescription Refill</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end pt-3 border-t border-[#CED4DA]">
            <button
              type="button"
              onClick={() => setIsBookModalOpen(false)}
              className="px-4 py-2 border border-[#CED4DA] rounded font-label-caps text-xs font-bold text-[#5b5f64]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#002d5e] hover:bg-[#001939] text-white rounded font-label-caps text-xs font-bold shadow-sm"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
