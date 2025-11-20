"use client";

import dynamic from 'next/dynamic';

// Dinamically import PWAInstallButton to ensure it runs on client-side only
const PWAInstallButton = dynamic(() => import('./PWAInstallButton'), {
  ssr: false,
  loading: () => null,
});

export default PWAInstallButton;