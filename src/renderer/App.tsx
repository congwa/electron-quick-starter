import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage';
import BaseLayout from './layouts/BaseLayout';
import { syncThemeWithLocal } from '@/renderer/helpers/theme_helpers';
import { AppSettingsProvider } from '@/renderer/context';

export default function App() {
  useEffect(() => {
    syncThemeWithLocal();
  }, []);

  return (
    <AppSettingsProvider>
      <BaseLayout>
        <HomePage />
      </BaseLayout>
    </AppSettingsProvider>
  );
}

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
