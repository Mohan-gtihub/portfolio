'use client';

import Terminal from '@/components/terminal';
import BinaryRain from '@/components/binary-rain';
import RegularPortfolio from '@/components/regular-portfolio';
import ModeSwitcher from '@/components/mode-switcher';
import { usePortfolioMode } from '@/context/PortfolioModeContext';

export default function Home() {
  const { mode } = usePortfolioMode();

  return (
    <main className="relative min-h-screen">
      {mode === 'terminal' ? (
        <>
          <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
            <BinaryRain />
            <div className="relative z-10 w-full flex items-center justify-center">
              <Terminal />
            </div>
          </div>
        </>
      ) : (
        <RegularPortfolio />
      )}
      <ModeSwitcher />
    </main>
  );
}
