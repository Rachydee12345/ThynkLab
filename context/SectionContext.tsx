
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SectionContextType {
  activeLabel: string;
  setActiveLabel: (label: string) => void;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeLabel, setActiveLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  return (
    <SectionContext.Provider value={{ activeLabel, setActiveLabel, isVisible, setIsVisible }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
};
