'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

export default function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date()?.getFullYear()?.toString());
  }, []);

  return (
    <footer
      className="relative border-t"
      style={{ borderColor: 'var(--bezel)', background: 'var(--bg)' }}
    >
      <div className="beam-border-h" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo + name */}
        <div className="flex items-center gap-2">
          <AppLogo size={22} iconName="CommandLineIcon" className="text-hud-green" />
          <span
            className="font-mono text-xs tracking-[0.25em] uppercase"
            style={{ color: 'rgba(0,255,65,0.5)' }}
          >
            HAYAH
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {[
            { label: 'Services', href: '#services' },
            { label: 'Process', href: '#process' },
            { label: 'Contact', href: '#contact' },
          ]?.map((l) => (
            <Link key={l?.label} href={l?.href} className="nav-link" style={{ fontSize: '9px' }}>
              {l?.label}
            </Link>
          ))}
          <span style={{ color: 'var(--bezel)', fontSize: '9px' }}>·</span>
          <Link href="#" className="nav-link" style={{ fontSize: '9px' }}>
            Privacy
          </Link>
          <Link href="#" className="nav-link" style={{ fontSize: '9px' }}>
            Terms
          </Link>
        </div>

        {/* Copyright */}
        <span
          className="font-mono"
          style={{ color: 'rgba(0,255,65,0.25)', fontSize: '9px', letterSpacing: '0.15em' }}
        >
          © {year} HAYAH ENG. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
}
