'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative"
      style={{
        background: 'var(--bg)',
        color: 'var(--green)',
        fontFamily: 'var(--font)',
      }}
    >
      <div className="grain-overlay" />
      <div className="text-center max-w-lg relative z-10">
        <p
          className="font-mono mb-2"
          style={{ color: 'var(--amber)', fontSize: '10px', letterSpacing: '0.35em' }}
        >
          SYS.ERR / 404
        </p>
        <h1
          className="font-mono glow-green mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 5rem)', letterSpacing: '0.2em' }}
        >
          404
        </h1>
        <h2
          className="font-mono mb-3"
          style={{ fontSize: '1rem', letterSpacing: '0.15em', color: 'var(--cyan)' }}
        >
          SIGNAL LOST
        </h2>
        <p
          className="font-mono mb-8"
          style={{ color: 'rgba(0,255,65,0.45)', fontSize: '12px', lineHeight: 1.7 }}
        >
          The requested route is not in this sector. Return to mission control or go back.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-ghost"
            style={{ borderColor: 'rgba(0,255,65,0.35)' }}
          >
            ← BACK
          </button>
          <Link href="/hayah" className="btn-red-cta">
            <span>HOME / HAYAH</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
