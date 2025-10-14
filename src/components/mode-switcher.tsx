'use client';

import { usePortfolioMode } from '@/context/PortfolioModeContext';
import { Button } from './ui/button';
import { TerminalSquare, LayoutGrid } from 'lucide-react';

const ModeSwitcher = () => {
  const { mode, toggleMode } = usePortfolioMode();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button variant="outline" size="icon" onClick={toggleMode} aria-label="Toggle portfolio mode">
        {mode === 'terminal' ? <LayoutGrid className="h-5 w-5" /> : <TerminalSquare className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default ModeSwitcher;
