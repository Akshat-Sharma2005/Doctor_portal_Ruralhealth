import React from 'react';
import { useApp } from '../../context/AppContext';

export const DashboardScreen: React.FC = () => {
  const {
    setActiveTab,
    setIsNewPatientModalOpen,
    setIsScanAbhaModalOpen,
    setIsHistoryModalOpen,
    inventory,
    restockItem,
    activities,
    selectedFacility,
    patients,
    referrals,
  } = useApp();

  const pendingReferralsCount = referrals.filter((r) => r.state === 'initiated' || r.state === 'accepted').length;

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 pb-24 md:pb-8">
      {/* Welcome / Facility Context */}
      <section className="col-span-1 md:col-span-12 mb-2">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#001939] mb-1 font-bold">
          {selectedFacility}
        </h2>
        <p className="font-body-lg text-body-lg text-[#5b5f64]">Health Worker Dashboard</p>
      </section>

      {/* Quick Actions (High Priority) */}
      <section className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <button
          onClick={() => setIsNewPatientModalOpen(true)}
          className="h-24 bg-[#002d5e] hover:bg-[#001939] text-white flex items-center justify-center gap-4 rounded active:opacity-80 transition-opacity border-2 border-transparent hover:border-[#c3c6d0] cursor-pointer shadow-sm"
        >
          <span
            className="material-symbols-outlined text-[32px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            person_add
          </span>
          <span className="font-headline-md text-headline-md font-bold tracking-tight">
            New Patient
          </span>
        </button>

        <button
          onClick={() => setIsScanAbhaModalOpen(true)}
          className="h-24 bg-white text-[#001939] flex items-center justify-center gap-4 rounded active:opacity-80 transition-opacity border-2 border-[#CED4DA] hover:bg-[#f3f4f5] cursor-pointer shadow-sm"
        >
          <span
            className="material-symbols-outlined text-[32px]"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            qr_code_scanner
          </span>
          <span className="font-headline-md text-headline-md font-bold tracking-tight">
            Scan ABHA
          </span>
        </button>
      </section>

      {/* Summary Stats (Bento Grid) */}
      <section className="col-span-1 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Patients Today */}
        <div
          onClick={() => setActiveTab('patients')}
          className="bg-white border-2 border-[#CED4DA] rounded p-4 md:p-5 flex flex-col justify-between min-h-[140px] cursor-pointer hover:border-[#002d5e] transition-colors"
        >
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-[#5b5f64] uppercase">
              Patients Today
            </span>
            <span
              className="material-symbols-outlined text-[#001939]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              groups
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-[48px] leading-none font-bold text-[#001939] tracking-tight">
              {patients.length > 0 ? 42 : 0}
            </span>
            <span className="font-body-md text-body-md text-[#1E4620] font-bold flex items-center">
              <span className="material-symbols-outlined text-[18px] mr-0.5">trending_up</span> +5
            </span>
          </div>
        </div>

        {/* Pending Referrals */}
        <div
          onClick={() => setActiveTab('referrals')}
          className="bg-white border-2 border-[#CED4DA] border-l-4 border-l-[#856404] rounded p-4 md:p-5 flex flex-col justify-between min-h-[140px] cursor-pointer hover:border-[#856404] transition-colors"
        >
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-[#5b5f64] uppercase">
              Pending Referrals
            </span>
            <span
              className="material-symbols-outlined text-[#856404]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              swap_horiz
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-[48px] leading-none font-bold text-[#001939] tracking-tight">
              {pendingReferralsCount > 0 ? pendingReferralsCount : 12}
            </span>
            <span className="font-body-md text-body-md text-[#856404] font-bold flex items-center">
              Action Required
            </span>
          </div>
        </div>

        {/* Low Inventory Alerts */}
        <div className="bg-white border-2 border-[#B71C1C] rounded p-4 md:p-5 flex flex-col justify-between min-h-[140px] sm:col-span-2 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-label-caps text-[#B71C1C] uppercase font-bold">
              Low Inventory Alerts
            </span>
            <span
              className="material-symbols-outlined text-[#B71C1C]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warning
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2.5">
            {inventory.slice(0, 2).map((item, idx) => (
              <div
                key={item.id}
                className={`flex justify-between items-center ${
                  idx === 0 ? 'border-b border-[#CED4DA] pb-2' : 'pb-1'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-body-md text-body-md font-bold text-[#001939]">
                    {item.item}
                  </span>
                  <button
                    onClick={() => restockItem(item.id, 50)}
                    title="Restock +50 units"
                    className="text-xs text-[#002d5e] hover:underline font-label-caps cursor-pointer"
                  >
                    [Restock]
                  </button>
                </div>
                <span className="font-status-badge text-status-badge bg-[#ffdad6] text-[#93000a] px-2.5 py-1 rounded font-bold border border-[#ffdad6]">
                  {item.unitsLeft && item.unitsLeft > 0
                    ? `${item.unitsLeft} Units Left`
                    : 'Out of Stock'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity List */}
      <section className="col-span-1 md:col-span-4 flex flex-col gap-3">
        <h3 className="font-headline-md text-headline-md text-[#001939] font-bold">
          Recent Activity
        </h3>
        <div className="bg-white border-2 border-[#CED4DA] rounded overflow-hidden shadow-sm">
          {activities.slice(0, 3).map((act, index) => {
            const iconMap = {
              referral_accepted: {
                icon: 'check_circle',
                bg: 'bg-[#d6e3ff] text-[#001b3d]',
              },
              patient_registered: {
                icon: 'person',
                bg: 'bg-[#dde0e6] text-[#5f6369]',
              },
              stock_depleted: {
                icon: 'inventory_2',
                bg: 'bg-[#ffdad6] text-[#93000a]',
              },
              appointment_completed: {
                icon: 'task_alt',
                bg: 'bg-[#E8F5E9] text-[#1E4620]',
              },
            };

            const styling = iconMap[act.type] || iconMap.referral_accepted;

            return (
              <div
                key={act.id}
                className={`p-4 ${
                  index < 2 ? 'border-b border-[#CED4DA]' : ''
                } flex gap-4 items-start hover:bg-[#f3f4f5] transition-colors min-h-[64px]`}
              >
                <div className={`${styling.bg} rounded-full p-2 flex-shrink-0 mt-0.5`}>
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {styling.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body-md text-body-md font-bold text-[#001939]">
                    {act.title}
                  </p>
                  <p className="font-body-md text-sm text-[#5b5f64] truncate">
                    {act.description}
                  </p>
                  <p className="font-label-caps text-label-caps text-[#747780] mt-1 uppercase text-xs">
                    {act.timeAgo}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setIsHistoryModalOpen(true)}
          className="w-full h-12 border-2 border-[#CED4DA] text-[#001939] font-headline-md text-headline-md rounded hover:bg-[#f3f4f5] transition-colors mt-1 font-semibold flex items-center justify-center cursor-pointer"
        >
          View All History
        </button>
      </section>
    </main>
  );
};
