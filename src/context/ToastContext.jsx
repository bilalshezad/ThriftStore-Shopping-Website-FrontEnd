import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion as Motion } from 'framer-motion';
import { ToastContext } from './ToastContextProvider';

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts }) => {
  return (
    <div className="fixed top-6 right-6 z-50 space-y-3">
      <AnimatePresence>
        {toasts.map(toast => (
          <Motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`px-6 py-3 rounded-lg text-white font-semibold shadow-lg ${
              toast.type === 'success'
                ? 'bg-green-500'
                : toast.type === 'error'
                ? 'bg-red-500'
                : 'bg-blue-500'
            }`}
          >
            {toast.message}
          </Motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
