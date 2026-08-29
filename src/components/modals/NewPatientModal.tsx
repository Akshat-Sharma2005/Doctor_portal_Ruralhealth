import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FACILITIES } from '../../data/initialData';

export const NewPatientModal: React.FC = () => {
  const { isNewPatientModalOpen, setIsNewPatientModalOpen, addPatient, openPatientProfile } = useApp();

  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(35);
  const [sex, setSex] = useState<'M' | 'F' | 'Other'>('M');
  const [dob, setDob] = useState('1988-06-15');
  const [abhaId, setAbhaId] = useState(`14-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [homeFacility, setHomeFacility] = useState(FACILITIES[0]);
  const [contact, setContact] = useState('+251 9');
  const [alerts, setAlerts] = useState('');
  const [bloodPressure, setBloodPressure] = useState('120/80 mmHg');

  if (!isNewPatientModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const alertList = alerts
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const created = addPatient({
      name: name.trim(),
      age: Number(age),
      sex,
      dob,
      abhaId,
      homeFacility,
      contact: contact.trim() || '+251 911 000 000',
      alerts: alertList,
      vitals: {
        bp: bloodPressure,
        spo2: '98%',
        temp: '36.8 °C',
        pulse: '72 bpm',
      },
    });

    setIsNewPatientModalOpen(false);
    openPatientProfile(created.id);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-2 border-[#CED4DA] rounded max-w-lg w-full p-6 shadow-xl my-8">
        <div className="flex justify-between items-center pb-3 border-b border-[#CED4DA] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#001939]">person_add</span>
            <h3 className="font-headline-md text-headline-md text-[#001939] font-bold">
              New Patient Registration
            </h3>
          </div>
          <button
            onClick={() => setIsNewPatientModalOpen(false)}
            className="text-[#5b5f64] hover:text-[#001939] p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-[#191c1d]">
          <div>
            <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dawit Tadesse"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-4 border border-[#CED4DA] rounded bg-[#f8f9fa] focus:border-[#002d5e] focus:outline-none font-body-md"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
                Age *
              </label>
              <input
                type="number"
                required
                min={0}
                max={120}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-12 px-3 border border-[#CED4DA] rounded bg-[#f8f9fa] font-body-md"
              />
            </div>

            <div>
              <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
                Sex *
              </label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as any)}
                className="w-full h-12 px-3 border border-[#CED4DA] rounded bg-[#f8f9fa] font-body-md"
              >
                <option value="M">Male (M)</option>
                <option value="F">Female (F)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
                DOB
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full h-12 px-2 border border-[#CED4DA] rounded bg-[#f8f9fa] text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
              ABHA ID (Ayushman Bharat / Health ID)
            </label>
            <input
              type="text"
              value={abhaId}
              onChange={(e) => setAbhaId(e.target.value)}
              className="w-full h-12 px-4 border border-[#CED4DA] rounded bg-[#f8f9fa] font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
                Home Facility *
              </label>
              <select
                value={homeFacility}
                onChange={(e) => setHomeFacility(e.target.value)}
                className="w-full h-12 px-3 border border-[#CED4DA] rounded bg-[#f8f9fa] text-sm"
              >
                {FACILITIES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
                Contact Phone
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+251 912 345 678"
                className="w-full h-12 px-4 border border-[#CED4DA] rounded bg-[#f8f9fa] font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
                Clinical Alerts (comma-separated)
              </label>
              <input
                type="text"
                value={alerts}
                onChange={(e) => setAlerts(e.target.value)}
                placeholder="e.g. Hypertension, Penicillin Allergy"
                className="w-full h-12 px-3 border border-[#CED4DA] rounded bg-[#f8f9fa] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
                Initial Blood Pressure
              </label>
              <input
                type="text"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                placeholder="120/80 mmHg"
                className="w-full h-12 px-3 border border-[#CED4DA] rounded bg-[#f8f9fa] text-sm font-mono"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-3 border-t border-[#CED4DA]">
            <button
              type="button"
              onClick={() => setIsNewPatientModalOpen(false)}
              className="px-5 py-2.5 border-2 border-[#CED4DA] text-[#5b5f64] rounded font-label-caps text-xs font-bold hover:bg-[#f3f4f5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#002d5e] hover:bg-[#001939] text-white rounded font-label-caps text-xs font-bold shadow-sm"
            >
              Register & View Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
