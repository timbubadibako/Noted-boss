'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SplashScreen } from '@/components/SplashScreen';

export default function SplashPage() {
  const router = useRouter();

  return (
    <SplashScreen
      autoDismissMs={0} // Stays until user clicks "Masuk Aplikasi"
      onComplete={() => router.push('/')}
    />
  );
}
