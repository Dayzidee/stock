import React, { useEffect, useRef } from 'react';
import { XIcon } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, title, children }) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close on escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      ></div>

      {/* Bottom Sheet Content */}
      <div
        ref={sheetRef}
        className="relative bg-white w-full max-w-md rounded-t-xl shadow-xl transform transition-transform duration-300 ease-out translate-y-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close bottom sheet"
          >
            <XIcon size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="pb-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
