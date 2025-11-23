'use client';

import { Crosshair, Layers, Fingerprint } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const navRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === '/') setActiveTab('home');
    else if (pathname.startsWith('/courses')) setActiveTab('courses');
    else if (pathname.startsWith('/profile')) setActiveTab('profile');
  }, [pathname]);

  useEffect(() => {
    const updateHighlight = () => {
      const activeBtn = document.querySelector(`[data-target="${activeTab}"]`) as HTMLElement;
      if (activeBtn && highlightRef.current && navRef.current) {
        const rect = activeBtn.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        const left = rect.left - navRect.left + rect.width / 2 - 16; // Center 32px highlight
        highlightRef.current.style.left = `${left}px`;
        highlightRef.current.style.opacity = '1';
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(updateHighlight, 50);
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [activeTab]);

  const handleNav = (target: string, path: string) => {
    setActiveTab(target);
    router.push(path);
  };

  // Hide nav on course details page if desired, or keep it. 
  // The prototype hides it on details page: "nav.style.transform = 'translateY(150%)';"
  // For now, we'll keep it visible unless explicitly told to hide, or we can check path depth.
  const isDetailsPage = pathname.startsWith('/courses/') && pathname.split('/').length > 2;

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed bottom-6 left-6 right-6 z-40 transition-transform duration-300",
        isDetailsPage ? "translate-y-[150%]" : "translate-y-0"
      )}
    >
      <div className="glass-card h-16 rounded-full flex items-center justify-between px-8 shadow-hud relative overflow-hidden bg-void/80 backdrop-blur-xl border border-white/10">
        <div
          ref={highlightRef}
          className="absolute bottom-0 h-[3px] w-8 bg-gradient-to-r from-brand-purple to-vengeance-red shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-300 ease-out left-0 opacity-0 rounded-t-full"
        />

        <button
          onClick={() => handleNav('home', '/')}
          className={cn(
            "nav-btn group flex flex-col items-center gap-1 transition-opacity duration-300",
            activeTab === 'home' ? "opacity-100" : "opacity-50 hover:opacity-100"
          )}
          data-target="home"
        >
          <Crosshair className="w-5 h-5 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={() => handleNav('courses', '/courses')}
          className={cn(
            "nav-btn group flex flex-col items-center gap-1 transition-opacity duration-300",
            activeTab === 'courses' ? "opacity-100" : "opacity-50 hover:opacity-100"
          )}
          data-target="courses"
        >
          <Layers className="w-5 h-5 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={() => handleNav('profile', '/profile')}
          className={cn(
            "nav-btn group flex flex-col items-center gap-1 transition-opacity duration-300",
            activeTab === 'profile' ? "opacity-100" : "opacity-50 hover:opacity-100"
          )}
          data-target="profile"
        >
          <Fingerprint className="w-5 h-5 group-hover:text-white transition-colors" />
        </button>
      </div>
    </nav>
  );
}
