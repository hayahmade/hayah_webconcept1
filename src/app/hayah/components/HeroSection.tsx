'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/motion';

/* ── Segmented arc (speedometer-style) ── */
function SpeedArc({ value = 72, color = 'var(--green)' }: { value?: number; color?: string }) {
  const total = 20;
  const filled = Math.round((value / 100) * total);
  return (
    <div className="flex flex-col gap-1">
      {/* horizontal bars staggered like a curved sweep */}
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i < filled;
        const w = 20 + (i / total) * 60; // widths grow → arc illusion
        return (
          <div
            key={i}
            className="seg-arc-bar"
            style={{
              height: '3px',
              width: `${w}px`,
              background: isActive ? color : 'rgba(0,255,65,0.08)',
              boxShadow: isActive ? `0 0 4px ${color}` : 'none',
              borderRadius: '1px',
              transition: 'background 0.05s',
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Small segmented bar ── */
function SegBar({
  cells = 16,
  filled = 10,
  color = 'var(--green)',
}: {
  cells?: number;
  filled?: number;
  color?: string;
}) {
  return (
    <div className="seg-bar-track" style={{ height: '10px' }}>
      {Array.from({ length: cells }).map((_, i) => (
        <div
          key={i}
          className="seg-bar-cell"
          style={i < filled ? { background: color, boxShadow: `0 0 3px ${color}` } : {}}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bootTextRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      const panels = panelRefs.current.filter(Boolean);
      gsap.set(panels, { opacity: 1, scaleY: 1 });
      if (bootTextRef.current) {
        gsap.set(bootTextRef.current.querySelectorAll('.boot-line'), { opacity: 1, x: 0 });
      }
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 1, y: 0, filter: 'none' });
      }
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 1, y: 0 });
      }
      gsap.set(root, { filter: 'brightness(1)' });
      if (arcRef.current) {
        gsap.set(arcRef.current.querySelectorAll('.seg-arc-bar'), {
          opacity: 1,
          scaleX: 1,
          transformOrigin: 'left',
        });
      }
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // 1. Panels boot in sequence — faster on mobile
      tl.fromTo(
        panelRefs.current.filter(Boolean),
        { opacity: 0, scaleY: 0.7, transformOrigin: 'top center' },
        { opacity: 1, scaleY: 1, duration: 0.35, stagger: 0.1 }
      );

      // 2. Boot text types in
      if (bootTextRef.current) {
        const lines = bootTextRef.current.querySelectorAll('.boot-line');
        tl.fromTo(
          lines,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.2, stagger: 0.14 },
          '-=0.15'
        );
      }

      // 3. Title blasts in
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 16, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6 },
        '-=0.1'
      );

      // 4. CTA appears
      tl.fromTo(ctaRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');

      // 5. Scanline flicker on load — subtler
      tl.fromTo(
        sectionRef.current,
        { filter: 'brightness(0.4)' },
        { filter: 'brightness(1)', duration: 0.12, yoyo: true, repeat: 2 },
        0
      );

      // 6. Arc value animation
      if (arcRef.current) {
        const bars = arcRef.current.querySelectorAll('.seg-arc-bar');
        tl.fromTo(
          bars,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.05, stagger: 0.035, transformOrigin: 'left' },
          0.5
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setPanelRef = (el: HTMLDivElement | null, i: number) => {
    panelRefs.current[i] = el;
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-12 crt-flicker"
      style={{ background: 'var(--bg)' }}
    >
      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(0,255,65,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full">
        {/* ── TOP ROW: 3 panels — mobile: stacked, tablet: 2-col, desktop: 3-col ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 mb-2 sm:mb-3">
          {/* Panel B — Main Title (first on mobile for hierarchy) */}
          <div
            ref={(el) => setPanelRef(el, 1)}
            className="hud-panel md:col-span-6 md:order-2 order-1"
            style={{ borderColor: 'rgba(0,255,65,0.25)', borderWidth: '1px' }}
          >
            <div className="hud-panel-inner">
              <div className="panel-label">
                <span>IDENT.SIGNAL / CH.01</span>
                <div className="flex items-center gap-2">
                  <span className="status-dot-red" />
                  <span style={{ color: 'var(--red)', fontSize: '9px', letterSpacing: '0.2em' }}>
                    LIVE
                  </span>
                </div>
              </div>

              {/* Boot log — hidden on smallest screens to save space */}
              <div
                ref={bootTextRef}
                className="mb-4 sm:mb-6 hidden xs:block"
                style={{ minHeight: '48px' }}
              >
                {[
                  'HAYAH.ENG v2.6.0 — INIT SEQUENCE',
                  'MODULES: WEB · MOBILE · AUTO · API',
                  'STATUS: ALL SYSTEMS NOMINAL',
                  'READY FOR MISSION INPUT ▸',
                ].map((line, i) => (
                  <div
                    key={i}
                    className="boot-line"
                    style={{
                      color: i === 3 ? 'var(--cyan)' : 'rgba(0,255,65,0.55)',
                      fontSize: 'clamp(8px, 1.8vw, 10px)',
                      letterSpacing: '0.15em',
                      marginBottom: '3px',
                      fontFamily: 'var(--font)',
                    }}
                  >
                    {i === 3 ? '> ' : '  '}
                    {line}
                  </div>
                ))}
              </div>

              {/* Main headline */}
              <h1
                ref={titleRef}
                className="glow-green font-mono leading-none mb-2"
                style={{
                  color: 'var(--green)',
                  fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                  letterSpacing: '0.08em',
                  fontWeight: 400,
                }}
              >
                HAYAH
              </h1>
              <p
                className="font-mono mb-4 sm:mb-6"
                style={{
                  color: 'var(--cyan)',
                  fontSize: 'clamp(0.65rem, 2.5vw, 1rem)',
                  letterSpacing: '0.25em',
                  textShadow: '0 0 8px var(--cyan)',
                }}
              >
                FROM CONCEPT TO REALITY
              </p>
              <p
                className="font-mono mb-6 sm:mb-8"
                style={{
                  color: 'rgba(0,255,65,0.55)',
                  fontSize: 'clamp(10px, 2vw, 12px)',
                  letterSpacing: '0.08em',
                  maxWidth: '440px',
                  lineHeight: '1.8',
                }}
              >
                Custom websites · Android &amp; iOS apps · Automation pipelines · API integrations.
                Precision-engineered digital products for startups and growing businesses.
              </p>

              {/* CTAs */}
              <div ref={ctaRef} className="flex flex-wrap gap-3 sm:gap-4 items-center">
                <a href="#contact" className="btn-red-cta">
                  <span>⬛ INITIATE PROJECT</span>
                </a>
                <a href="#services" className="btn-ghost">
                  VIEW SYSTEMS
                </a>
              </div>
            </div>
          </div>

          {/* Panel A — Speed Arc / System Status */}
          <div
            ref={(el) => setPanelRef(el, 0)}
            className="hud-panel md:col-span-3 md:order-1 order-2"
            style={{ borderColor: 'rgba(0,255,65,0.2)' }}
          >
            <div className="hud-panel-inner">
              <div className="panel-label">
                <span>SYS.STATUS</span>
                <span className="status-dot" />
              </div>
              <div ref={arcRef} className="flex gap-3 sm:gap-4 items-end mb-3 sm:mb-4">
                <SpeedArc value={78} color="var(--green)" />
                <div>
                  <div
                    className="numeric-display glow-green"
                    style={{ color: 'var(--green)', fontSize: 'clamp(2rem, 5vw, 2.8rem)' }}
                  >
                    78
                  </div>
                  <div
                    style={{ color: 'rgba(0,255,65,0.4)', fontSize: '9px', letterSpacing: '0.2em' }}
                  >
                    LOAD.IDX
                  </div>
                </div>
              </div>
              <hr className="hud-divider" />
              <div className="flex flex-col gap-2 mt-3">
                {[
                  { label: 'CPU', val: 12, color: 'var(--green)' },
                  { label: 'MEM', val: 9, color: 'var(--cyan)' },
                  { label: 'NET', val: 14, color: 'var(--amber)' },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-2 sm:gap-3">
                    <span
                      style={{
                        color: 'rgba(0,255,65,0.5)',
                        fontSize: '9px',
                        width: '28px',
                        letterSpacing: '0.15em',
                      }}
                    >
                      {r.label}
                    </span>
                    <SegBar cells={16} filled={r.val} color={r.color} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel C — Readouts */}
          <div
            ref={(el) => setPanelRef(el, 2)}
            className="hud-panel md:col-span-3 md:order-3 order-3"
            style={{ borderColor: 'rgba(0,255,255,0.2)' }}
          >
            <div className="hud-panel-inner">
              <div className="panel-label">
                <span>READOUT.CH</span>
                <span className="status-dot-cyan" />
              </div>

              {/* Numeric readouts — 3-col on mobile for compactness */}
              <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-0 md:flex md:flex-col md:gap-4">
                {[
                  { label: 'PROJECTS', val: '047', color: 'var(--cyan)' },
                  { label: 'CLIENTS', val: '031', color: 'var(--green)' },
                  { label: 'UPTIME', val: '99.8', color: 'var(--amber)' },
                ].map((r) => (
                  <div key={r.label}>
                    <div
                      style={{
                        color: 'rgba(0,255,65,0.4)',
                        fontSize: '8px',
                        letterSpacing: '0.2em',
                        marginBottom: '2px',
                      }}
                    >
                      {r.label}
                    </div>
                    <div
                      className="numeric-display"
                      style={{
                        color: r.color,
                        textShadow: `0 0 10px ${r.color}`,
                        fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
                      }}
                    >
                      {r.val}
                    </div>
                    <hr className="hud-divider" />
                  </div>
                ))}
              </div>

              {/* Temp / pressure bars — hidden on mobile to reduce clutter */}
              <div className="hidden md:flex mt-2 flex-col gap-2">
                {[
                  { label: 'TEMP.SV', val: 8, color: 'var(--amber)' },
                  { label: 'PRESS.OK', val: 13, color: 'var(--green)' },
                  { label: 'AMP', val: 6, color: 'var(--cyan)' },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-2">
                    <span
                      style={{
                        color: 'rgba(0,255,65,0.35)',
                        fontSize: '8px',
                        width: '52px',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {r.label}
                    </span>
                    <SegBar cells={16} filled={r.val} color={r.color} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM ROW: status strip ── */}
        <div
          ref={(el) => setPanelRef(el, 3)}
          className="hud-panel"
          style={{ borderColor: 'rgba(0,255,65,0.12)', padding: '8px 14px' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              {[
                { label: 'SIGNAL', val: 'STRONG', color: 'var(--green)' },
                { label: 'PROTOCOL', val: 'HTTPS/2', color: 'var(--cyan)' },
                { label: 'REGION', val: 'GLOBAL', color: 'var(--amber)' },
                { label: 'BUILD', val: 'v2.6.0', color: 'var(--green)' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1 sm:gap-2">
                  <span
                    style={{
                      color: 'rgba(0,255,65,0.35)',
                      fontSize: '8px',
                      letterSpacing: '0.2em',
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    style={{
                      color: s.color,
                      fontSize: '9px',
                      letterSpacing: '0.1em',
                      textShadow: `0 0 6px ${s.color}`,
                    }}
                  >
                    {s.val}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="status-dot" />
              <span
                style={{ color: 'rgba(0,255,65,0.5)', fontSize: '8px', letterSpacing: '0.2em' }}
              >
                ALL SYSTEMS NOMINAL
              </span>
            </div>
          </div>
          <div className="beam-border-h" />
        </div>
      </div>
    </section>
  );
}
