import Terminal from '@/components/terminal';
import BinaryRain from '@/components/binary-rain';

export default function Home() {
  return (
    <main className="relative container mx-auto p-4 flex items-center justify-center min-h-screen">
      <BinaryRain />
      <div className="relative z-10 w-full flex items-center justify-center">
        <Terminal />
      </div>
    </main>
  );
}
