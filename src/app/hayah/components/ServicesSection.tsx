'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  id: string;
  label: string;
  ch: string;
  title: string;
  desc: string;
  metrics: { label: string; val: number; max: number; color: string }[];
  tags: string[];
  accentColor: string;
}

const SERVICES: ServiceData[] = [
  {
    id: 'web',
    label: 'MODULE.01',
    ch: 'CH-WEB',
    title: 'CUSTOM WEBSITES',
    desc: 'High-performance web applications engineered from the ground up. No templates. No compromise. Full-stack precision.',
    metrics: [
      { label: 'PERF', val: 97, max: 100, color: 'var(--green)' },
      { label: 'SEO', val: 94, max: 100, color: 'var(--cyan)' },
      { label: 'SPEED', val: 99, max: 100, color: 'var(--amber)' },
    ],
    tags: ['React', 'Next.js', 'ASP.NET', 'TypeScript'],
    accentColor: 'var(--green)',
  },
  {
    id: 'mobile',
    label: 'MODULE.02',
    ch: 'CH-MOB',
    title: 'ANDROID & iOS APPS',
    desc: 'Native-quality cross-platform mobile applications. Ship once, run everywhere — without sacrificing performance.',
    metrics: [
      { label: 'NATIVE', val: 92, max: 100, color: 'var(--cyan)' },
      { label: 'UX', val: 96, max: 100, color: 'var(--green)' },
      { label: 'STORE', val: 100, max: 100, color: 'var(--amber)' },
    ],
    tags: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
    accentColor: 'var(--cyan)',
  },
  {
    id: 'auto',
    label: 'MODULE.03',
    ch: 'CH-AUTO',
    title: 'AUTOMATION',
    desc: 'Eliminate repetitive workflows. Custom automation pipelines that save 40+ hours per month — measured, not estimated.',
    metrics: [
      { label: 'SAVE', val: 87, max: 100, color: 'var(--amber)' },
      { label: 'UPTIME', val: 99, max: 100, color: 'var(--green)' },
      { label: 'ROI', val: 94, max: 100, color: 'var(--cyan)' },
    ],
    tags: ['Python', 'n8n', 'Zapier', 'Bash'],
    accentColor: 'var(--amber)',
  },
  {
    id: 'api',
    label: 'MODULE.04',
    ch: 'CH-API',
    title: 'APIs & INTEGRATIONS',
    desc: 'Connect your stack. RESTful and GraphQL APIs built to scale. Third-party integrations that just work.',
    metrics: [
      { label: 'LATENCY', val: 98, max: 100, color: 'var(--green)' },
      { label: 'SECURE', val: 100, max: 100, color: 'var(--red)' },
      { label: 'SCALE', val: 95, max: 100, color: 'var(--cyan)' },
    ],
    tags: ['REST', 'GraphQL', 'WebSockets', 'OAuth'],
    accentColor: 'var(--red)',
  },
];

function SegBarAnimated({
  cells = 20,
  targetFilled,
  color,
  delay = 0,
}: {
  cells?: number;
  targetFilled: number;
  color: string;
  delay?: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const cellEls = el.querySelectorAll<HTMLDivElement>('.seg-cell');
    const filledCount = Math.round((targetFilled / 100) * cells);

    const applyFill = (count: number) => {
      cellEls.forEach((cell, i) => {
        if (i < count) {
          cell.style.background = color;
          cell.style.boxShadow = `0 0 3px ${color}`;
        } else {
          cell.style.background = 'rgba(0,255,65,0.06)';
          cell.style.boxShadow = 'none';
        }
      });
    };

    if (prefersReducedMotion()) {
      applyFill(filledCount);
      return;
    }

    let tween: gsap.core.Tween | null = null;
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        tween = gsap.to(
          {},
          {
            duration: 1.2,
            delay,
            onUpdate() {
              const progress = this.progress();
              const current = Math.round(progress * filledCount);
              applyFill(current);
            },
          }
        );
      },
    });

    return () => {
      st.kill();
      tween?.kill();
    };
  }, [cells, targetFilled, color, delay]);

  return (
    <div ref={barRef} className="seg-bar-track" style={{ height: '10px' }}>
      {Array.from({ length: cells }).map((_, i) => (
        <div
          key={i}
          className="seg-cell seg-bar-cell"
          style={{
            flex: 1,
            height: '100%',
            background: 'rgba(0,255,65,0.06)',
            border: '1px solid rgba(0,255,65,0.1)',
            transition: 'background 0.05s',
          }}
        />
      ))}
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      gsap.set(section.querySelectorAll('.service-panel'), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-panel',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className="hud-panel mb-4 sm:mb-6"
          style={{ padding: '10px 14px', borderColor: 'rgba(0,255,65,0.15)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <span style={{ color: 'var(--amber)', fontSize: '9px', letterSpacing: '0.3em' }}>
                SYSTEM.MODULES
              </span>
              <div
                className="beam-border-v"
                style={{
                  position: 'relative',
                  height: '16px',
                  width: '1px',
                  background: 'rgba(0,255,65,0.2)',
                }}
              />
              <span
                className="hidden sm:inline"
                style={{ color: 'rgba(0,255,65,0.4)', fontSize: '9px', letterSpacing: '0.2em' }}
              >
                4 MODULES ONLINE
              </span>
            </div>
            <span className="status-dot" />
          </div>
        </div>

        <h2
          className="font-mono glow-green mb-6 sm:mb-8"
          style={{
            color: 'var(--green)',
            fontSize: 'clamp(1.1rem, 4vw, 2.2rem)',
            letterSpacing: '0.15em',
            fontWeight: 400,
          }}
        >
          SERVICE MODULES
        </h2>

        {/* 2×2 bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {SERVICES.map((svc, idx) => (
            <div
              key={svc.id}
              className="service-panel hud-panel"
              style={{ borderColor: `${svc.accentColor}33`, opacity: 0 }}
            >
              <div className="hud-panel-inner">
                <div className="panel-label">
                  <span>{svc.label}</span>
                  <div className="flex items-center gap-2">
                    <span style={{ color: 'rgba(0,255,65,0.4)', fontSize: '8px' }}>{svc.ch}</span>
                    <span
                      className="status-dot"
                      style={{
                        background: svc.accentColor,
                        boxShadow: `0 0 6px ${svc.accentColor}`,
                      }}
                    />
                  </div>
                </div>

                <h3
                  className="font-mono mb-2 sm:mb-3"
                  style={{
                    color: svc.accentColor,
                    fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
                    letterSpacing: '0.12em',
                    textShadow: `0 0 10px ${svc.accentColor}`,
                  }}
                >
                  {svc.title}
                </h3>

                <p
                  className="font-mono mb-4 sm:mb-5"
                  style={{
                    color: 'rgba(0,255,65,0.55)',
                    fontSize: 'clamp(10px, 1.8vw, 11px)',
                    lineHeight: '1.8',
                    letterSpacing: '0.05em',
                  }}
                >
                  {svc.desc}
                </p>

                {/* Metrics bars */}
                <div className="flex flex-col gap-2 sm:gap-3 mb-4 sm:mb-5">
                  {svc.metrics.map((m, mi) => (
                    <div key={m.label}>
                      <div className="flex justify-between mb-1">
                        <span
                          style={{
                            color: 'rgba(0,255,65,0.4)',
                            fontSize: '8px',
                            letterSpacing: '0.2em',
                          }}
                        >
                          {m.label}
                        </span>
                        <span
                          style={{
                            color: m.color,
                            fontSize: '10px',
                            textShadow: `0 0 6px ${m.color}`,
                          }}
                        >
                          {m.val}
                        </span>
                      </div>
                      <SegBarAnimated
                        cells={20}
                        targetFilled={m.val}
                        color={m.color}
                        delay={idx * 0.08 + mi * 0.06}
                      />
                    </div>
                  ))}
                </div>

                <hr className="hud-divider" />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono"
                      style={{
                        border: `1px solid ${svc.accentColor}44`,
                        color: svc.accentColor,
                        fontSize: '8px',
                        letterSpacing: '0.15em',
                        padding: '3px 8px',
                        textShadow: `0 0 6px ${svc.accentColor}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
