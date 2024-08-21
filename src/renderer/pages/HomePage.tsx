import React from 'react';
import ToggleTheme from '@/renderer/components/ToggleTheme';

export default function HomePage() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <ToggleTheme />
      </div>
    </>
  );
}
