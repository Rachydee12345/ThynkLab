import React, { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';
import { getFeatures, saveFeatures } from '../../config/features';

const DevTools = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [features, setFeatures] = useState(getFeatures());

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('dev') === 'true') {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const toggleFeature = (key: keyof typeof features) => {
    const updated = { ...features, [key]: !features[key] };
    setFeatures(updated);
    saveFeatures(updated);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg z-50 hover:bg-red-600"
      >
        <Settings size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-64 bg-slate-900 text-white p-4 rounded-xl shadow-2xl z-50 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm uppercase tracking-wider">Dev Controls</h3>
        <button onClick={() => setIsOpen(false)}><X size={16} /></button>
      </div>
      <div className="space-y-3">
        {Object.keys(features).map((key) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400">{key}</span>
            <button 
              onClick={() => toggleFeature(key as any)}
              className={`w-10 h-5 rounded-full relative transition-colors ${features[key as keyof typeof features] ? 'bg-green-500' : 'bg-slate-700'}`}
            >
              <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${features[key as keyof typeof features] ? 'translate-x-5' : ''}`} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-500">
        Changes reload app automatically.
      </div>
    </div>
  );
};

export default DevTools;