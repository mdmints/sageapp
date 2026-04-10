import { createContext, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface ToastState {
  message: string;
  visible: boolean;
}

interface ToastContextValue {
  toast: ToastState;
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });
  const timeoutRef = useRef<number | null>(null);

  function showToast(message: string) {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setToast({ message, visible: true });

    timeoutRef.current = window.setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 2600);
  }

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
