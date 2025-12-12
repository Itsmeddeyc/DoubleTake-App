import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertCircle } from 'lucide-react';

interface ToastErrorProps {
  show: boolean;
  onClose: () => void;
  message?: string;
  duration?: number;
}

export function ToastError({
  show,
  onClose,
  message = 'Something went wrong. Please try again.',
  duration = 4000,
}: ToastErrorProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 left-0 right-0 z-50 flex justify-center"
        >
          <div className="mx-6 w-full md:max-w-[412px] bg-gradient-to-r from-red-50 to-amber-50 border-2 border-red-200 rounded-full px-6 py-4 shadow-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="flex-1 text-sm text-red-800">{message}</p>
            <button
              onClick={onClose}
              className="w-6 h-6 rounded-full hover:bg-red-100 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
