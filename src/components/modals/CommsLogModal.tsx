import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const CommsLogModal: React.FC = () => {
  const {
    isCommsModalOpen,
    setIsCommsModalOpen,
    activeCommsReferral,
    addCommsMessage,
    currentUser,
  } = useApp();

  const [message, setMessage] = useState('');

  if (!isCommsModalOpen || !activeCommsReferral) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    addCommsMessage(
      activeCommsReferral.id,
      currentUser?.name || 'Dr. Samuel Tadesse',
      currentUser?.facility || 'Shashemene Clinic',
      message.trim()
    );

    setMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#CED4DA] rounded max-w-lg w-full max-h-[85vh] flex flex-col p-6 shadow-2xl">
        <div className="flex justify-between items-center pb-3 border-b border-[#CED4DA] mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#001939]">forum</span>
              <h3 className="font-headline-md text-headline-md text-[#001939] font-bold">
                Referral Communication Log
              </h3>
            </div>
            <p className="font-mono text-xs text-[#5b5f64] mt-0.5">
              Ref ID: {activeCommsReferral.id} • Patient: {activeCommsReferral.patientName}
            </p>
          </div>
          <button
            onClick={() => setIsCommsModalOpen(false)}
            className="text-[#5b5f64] hover:text-[#001939] p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-[#f8f9fa] border border-[#CED4DA] rounded mb-3 max-h-64">
          {activeCommsReferral.commsLog && activeCommsReferral.commsLog.length > 0 ? (
            activeCommsReferral.commsLog.map((log) => (
              <div key={log.id} className="bg-white border border-[#CED4DA] p-3 rounded shadow-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs text-[#001939]">
                    {log.author} <span className="font-normal text-[#5b5f64]">({log.facility})</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#747780]">{log.timestamp}</span>
                </div>
                <p className="text-sm font-body-md text-[#191c1d]">{log.message}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-center text-[#5b5f64] py-8">
              No communication recorded yet. Send a note to the collaborating team below.
            </p>
          )}
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message to destination/origin clinician..."
              className="flex-1 h-12 px-3 border border-[#CED4DA] rounded text-sm bg-white focus:border-[#002d5e] focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 px-5 bg-[#002d5e] hover:bg-[#001939] text-white rounded font-label-caps text-xs font-bold flex items-center gap-1 shrink-0"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
