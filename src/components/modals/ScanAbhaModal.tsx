import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ScanAbhaModal: React.FC = () => {
  const { isScanAbhaModalOpen, setIsScanAbhaModalOpen, patients, openPatientProfile, addToast } = useApp();

  const [simulatedAbha, setSimulatedAbha] = useState('14-8930-2819-4820');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<any>(null);

  if (!isScanAbhaModalOpen) return null;

  const handleSimulateScan = (abha?: string) => {
    const targetAbha = abha || simulatedAbha;
    setIsScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      setIsScanning(false);
      const found = patients.find(
        (p) => p.abhaId.replace(/-/g, '') === targetAbha.replace(/-/g, '') || p.id === targetAbha
      );

      if (found) {
        setScannedResult(found);
        addToast(`ABHA Verified: ${found.name} (ABHA: ${found.abhaId})`, 'success');
      } else {
        addToast('No match found for this ABHA ID. You can register as new patient.', 'warning');
      }
    }, 1200);
  };

  const handleOpenPatient = (id: string) => {
    setIsScanAbhaModalOpen(false);
    openPatientProfile(id);
  };

  return (
    <div className="fixed inset-0 bg-black/65 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#CED4DA] rounded max-w-md w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center pb-3 border-b border-[#CED4DA] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#001939]">qr_code_scanner</span>
            <h3 className="font-headline-md text-headline-md text-[#001939] font-bold">
              Scan ABHA Health ID
            </h3>
          </div>
          <button
            onClick={() => setIsScanAbhaModalOpen(false)}
            className="text-[#5b5f64] hover:text-[#001939] p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Viewfinder simulation */}
        <div className="relative bg-[#191c1d] rounded aspect-video overflow-hidden flex flex-col items-center justify-center text-white mb-4 border-2 border-[#CED4DA]">
          {isScanning ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              <p className="font-mono text-xs text-[#a9c7ff] animate-pulse">
                DECODING ABHA QR CODE...
              </p>
            </div>
          ) : scannedResult ? (
            <div className="text-center p-4">
              <span className="material-symbols-outlined text-4xl text-[#1E4620] bg-white rounded-full p-1 mb-2">
                check_circle
              </span>
              <p className="font-bold text-base">{scannedResult.name}</p>
              <p className="text-xs font-mono text-[#a9c7ff]">ABHA: {scannedResult.abhaId}</p>
            </div>
          ) : (
            <div className="relative w-48 h-32 border-2 border-dashed border-[#a9c7ff] rounded flex flex-col items-center justify-center p-2">
              <span className="material-symbols-outlined text-3xl text-[#a9c7ff] mb-1">
                center_focus_strong
              </span>
              <p className="text-[11px] font-mono text-center text-white/80">
                Align QR Code or ABHA Card inside frame
              </p>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500 animate-bounce"></div>
            </div>
          )}
        </div>

        {/* Quick Test Presets */}
        <div className="mb-4">
          <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
            Simulate Scanning Patient Card:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setSimulatedAbha('14-8930-2819-4820');
                handleSimulateScan('14-8930-2819-4820');
              }}
              className="text-left p-2 border border-[#CED4DA] rounded text-xs hover:bg-[#f3f4f5] cursor-pointer"
            >
              <p className="font-bold text-[#001939]">Abebe Bikila</p>
              <p className="font-mono text-[10px] text-[#5b5f64]">14-8930-2819-4820</p>
            </button>
            <button
              onClick={() => {
                setSimulatedAbha('22-4190-7812-3341');
                handleSimulateScan('22-4190-7812-3341');
              }}
              className="text-left p-2 border border-[#CED4DA] rounded text-xs hover:bg-[#f3f4f5] cursor-pointer"
            >
              <p className="font-bold text-[#001939]">Amina Ouedraogo</p>
              <p className="font-mono text-[10px] text-[#5b5f64]">22-4190-7812-3341</p>
            </button>
          </div>
        </div>

        {/* Manual Input Fallback */}
        <div className="space-y-3">
          <label className="block text-xs font-label-caps text-[#5b5f64] mb-1 uppercase font-bold">
            Or Enter ABHA / Patient ID Manually:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={simulatedAbha}
              onChange={(e) => setSimulatedAbha(e.target.value)}
              placeholder="e.g. 14-8930-2819-4820"
              className="flex-1 h-12 px-3 border border-[#CED4DA] rounded font-mono text-sm bg-[#f8f9fa]"
            />
            <button
              onClick={() => handleSimulateScan()}
              className="px-5 bg-[#002d5e] hover:bg-[#001939] text-white font-label-caps text-xs font-bold rounded cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        {scannedResult && (
          <div className="mt-4 p-3 bg-[#E8F5E9] border border-[#1E4620] rounded flex justify-between items-center">
            <div>
              <p className="font-bold text-sm text-[#1E4620]">{scannedResult.name}</p>
              <p className="text-xs text-[#5b5f64]">{scannedResult.homeFacility}</p>
            </div>
            <button
              onClick={() => handleOpenPatient(scannedResult.id)}
              className="px-3 py-1.5 bg-[#1E4620] text-white text-xs font-bold rounded font-label-caps cursor-pointer hover:opacity-90"
            >
              Open File &rarr;
            </button>
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-[#CED4DA] flex justify-end">
          <button
            onClick={() => setIsScanAbhaModalOpen(false)}
            className="px-4 py-2 border border-[#CED4DA] rounded font-label-caps text-xs font-bold text-[#5b5f64]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
