'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now?.getHours())?.padStart(2, '0');
      const m = String(now?.getMinutes())?.padStart(2, '0');
      const s = String(now?.getSeconds())?.padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,12,10,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid #1a2a1a' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      {/* top beam */}
      <div className="beam-border-h" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <AppLogo
            size={28}
            iconName="CommandLineIcon"
            className="text-hud-green"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          <span
            className="glow-green font-mono text-sm tracking-[0.22em] uppercase font-semibold"
            style={{ color: 'var(--green-readable)' }}
          >
            HAYAH
          </span>
          <span
            className="hidden sm:block tracking-widest ml-2 font-mono"
            style={{ color: 'rgba(180, 255, 200, 0.55)', fontSize: '11px' }}
          >
            ENG.STUDIO
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {['SERVICES', 'METRICS', 'PROCESS', 'CONTACT']?.map((item) => (
            <Link key={item} href={`#${item?.toLowerCase()}`} className="nav-link">
              {item}
            </Link>
          ))}
        </nav>

        {/* Clock + CTA */}
        <div className="flex items-center gap-6">
          <span
            className="hidden sm:block font-mono glow-amber tabular-nums"
            style={{
              color: 'var(--amber-readable)',
              fontSize: '13px',
              letterSpacing: '0.12em',
              textShadow: '0 0 1px rgba(0,0,0,0.85)',
            }}
          >
            {time}
          </span>
          <a href="#contact" className="btn-red-cta">
            <span>ENGAGE</span>
          </a>
        </div>
      </div>
    </header>
  );
}
