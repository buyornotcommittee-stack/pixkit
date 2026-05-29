'use client';
import { useEffect, useState } from 'react';

export default function EzoicAd({ placementId }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === 'undefined') return;

    window.ezstandalone = window.ezstandalone || {};
    window.ezstandalone.cmd = window.ezstandalone.cmd || [];

    window.ezstandalone.cmd.push(function() {
      if (window.ezstandalone.showAds) {
        window.ezstandalone.showAds(placementId);
      }
    });
  }, [mounted, placementId]);

  if (!mounted) return null;

  return (
    <div id={`ezoic-pub-ad-placeholder-${placementId}`} />
  );
}
