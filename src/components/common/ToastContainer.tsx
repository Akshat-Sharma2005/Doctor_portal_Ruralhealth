import React from 'react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 left-4 md:left-auto md:w-96 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const bgColors = {
          success: 'bg-[#1E4620] text-white border-[#1E4620]',
          info: 'bg-[#002d5e] text-white border-[#002d5e]',
          warning: 'bg-[#856404] text-white border-[#856404]',
          error: 'bg-[#B71C1C] text-white border-[#B71C1C]',
        };

        const icons = {
          success: 'check_circle',
          info: 'info',
          warning: 'warning',
          error: 'error',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded border-2 shadow-md ${bgColors[toast.type]} transition-all animate-fadeIn`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="material-symbols-outlined text-xl shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {icons[toast.type]}
              </span>
              <p className="text-sm font-body-md leading-tight">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/80 hover:text-white p-1 ml-2 shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};
