"use client";

import { CheckCircle, X } from "lucide-react";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  details: Record<string, string>;
}

export default function ReceiptModal({ isOpen, onClose, title, details }: ReceiptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
      
        <div className="bg-green-50 p-6 flex flex-col items-center border-b border-green-100 relative sticky top-0 z-20">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
          {/* ✅ Checkmark will now show properly */}
          <CheckCircle className="w-16 h-16 text-green-500 mb-4 mt-15" />
          <h2 className="text-2xl font-bold text-gray-900">{title} Confirmed</h2>
          <p className="text-gray-600 mt-1">Your booking has been successfully simulated.</p>
        </div>
        
        {/* Body (scrollable content) */}
        <div className="p-6 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Receipt Details
          </h3>
          <div className="space-y-3">
            {Object.entries(details).map(([key, value]) => (
              <div 
                key={key} 
                className="flex justify-between items-start border-b border-gray-100 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-gray-600 font-medium">{key}</span>
                <span className="text-gray-900 font-semibold text-right max-w-[200px] break-words">
                  {value}
                </span>
              </div>
            ))}
          </div>
          
          {/* Footer button */}
          <button 
            onClick={onClose}
            className="w-full mt-8 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
