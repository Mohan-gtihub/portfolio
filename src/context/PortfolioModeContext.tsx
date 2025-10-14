'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

type PortfolioMode = 'terminal' | 'regular';

interface PortfolioModeContextType {
  mode: PortfolioMode;
  toggleMode: () => void;
}

const PortfolioModeContext = createContext<PortfolioModeContextType | undefined>(undefined);

export const PortfolioModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PortfolioMode>('terminal');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'terminal' ? 'regular' : 'terminal'));
  };

  return (
    <PortfolioModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </PortfolioModeContext.Provider>
  );
};

export const usePortfolioMode = () => {
  const context = useContext(PortfolioModeContext);
  if (context === undefined) {
    throw new Error('usePortfolioMode must be used within a PortfolioModeProvider');
  }
  return context;
};
