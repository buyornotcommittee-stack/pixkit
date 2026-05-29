'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EzoicPageRefresh() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === 'undefined') return;
    if (!window.ezstandalone) return;

    window.ezstandalone.cmd = window.ezstandalone.cmd || [];
    window.ezstandalone.cmd.push(function() {
      if (window.ezstandalone.destroyAll) {
        window.ezstandalone.destroyAll();
      }
      if (window.ezstandalone.showAds) {
        window.ezstandalone.showAds();
      }
    });
  }, [mounted, pathname]);

  return null;
}
