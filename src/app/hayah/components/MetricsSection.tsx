'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

interface MetricItem {
  label: string;
  value: number;
  suffix: string;
  color: string;
  subLabel: string;
  barFill: number;
}

const METRICS: MetricItem[] = [
  {
    label: 'PROJECTS.DELIVERED',
    value: 47,
    suffix: '',
    color: 'var(--green)',
    subLabel: 'ACROSS 6 INDUSTRIES',
    barFill: 94,
  },
  {
    label: 'CLIENT.SATISFACTION',
    value: 98,
    suffix: '%',
    color: 'var(--cyan)',
    subLabel: 'NET PROMOTER SCORE',
    barFill: 98,
  },
  {
    label: 'AVG.DELIVERY.DAYS',
    value: 21,
    suffix: 'd',
    color: 'var(--amber)',
    subLabel: 'FROM BRIEF TO LAUNCH',
    barFill: 72,
  },
  {
    label: 'UPTIME.SLA',
    value: 99.8,
    suffix: '%',
    color: 'var(--green)',
    subLabel: 'MONITORED 24/7',
    barFill: 99,
  },
  {
    label: 'LINES.OF.CODE',
    value: 2.4,
    suffix: 'M',
    color: 'var(--cyan)',
    subLabel: 'SHIPPED TO PROD',
    barFill: 80,
  },
  {
    label: 'AUTOMATION.HOURS',
    value: 1200,
    suffix: 'h',
    color: 'var(--amber)',
    subLabel: 'SAVED FOR CLIENTS',
    barFill: 88,
  },
];

function AnimatedCounter({
  target,
  suffix,
  color,
  triggerRef,
}: {
  target: number;
  suffix: string;
  color: string;
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    const trigger = triggerRef.current;
    if (!el || !trigger) return;

    const isDecimal = target % 1 !== 0;
    const finalText = isDecimal ? target.toFixed(1) + suffix : Math.round(target) + suffix;

    if (prefersReducedMotion()) {
      el.textContent = finalText;
      return;
    }

    const obj = { val: 0 };
    let tween: gsap.core.Tween | null = null;
    const st = ScrollTrigger.create({
      trigger,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        tween = gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate() {
            if (elRef.current) {
              elRef.current.textContent = isDecimal
                ? obj.val.toFixed(1) + suffix
                : Math.round(obj.val) + suffix;
            }
          },
        });
      },
    });

    return () => {
      st.kill();
      tween?.kill();
    };
  }, [target, suffix, triggerRef]);

  const isDecimal = target % 1 !== 0;
  const initial = isDecimal ? `0.0${suffix}` : `0${suffix}`;

  return (
    <span
      ref={elRef}
      className="numeric-large glow-green"
      style={{ color, textShadow: `0 0 16px ${color}`, fontFamily: 'var(--font)' }}
    >
      {initial}
    </span>
  );
}

function SegBarFill({ fill, color, cells = 24 }: { fill: number; color: string; cells?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cellEls = el.querySelectorAll<HTMLDivElement>('.mc');
    const filled = Math.round((fill / 100) * cells);

    const applyFill = (cur: number) => {
      cellEls.forEach((c, i) => {
        c.style.background = i < cur ? color : 'rgba(0,255,65,0.06)';
        c.style.boxShadow = i < cur ? `0 0 3px ${color}` : 'none';
      });
    };

    if (prefersReducedMotion()) {
      applyFill(filled);
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
            duration: 1.5,
            ease: 'power2.out',
            onUpdate() {
              const p = this.progress();
              const cur = Math.round(p * filled);
              applyFill(cur);
            },
          }
        );
      },
    });

    return () => {
      st.kill();
      tween?.kill();
    };
  }, [fill, color, cells]);

  return (
    <div ref={ref} className="seg-bar-track" style={{ height: '8px' }}>
      {Array.from({ length: cells }).map((_, i) => (
        <div
          key={i}
          className="mc"
          style={{
            flex: 1,
            height: '100%',
            background: 'rgba(0,255,65,0.06)',
            border: '1px solid rgba(0,255,65,0.08)',
          }}
        />
      ))}
    </div>
  );
}

export default function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      gsap.set(section.querySelectorAll('.metric-card'), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.metric-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
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
      id="metrics"
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-12"
      style={{ borderTop: '1px solid var(--bezel)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2
            className="font-mono glow-amber"
            style={{
              color: 'var(--amber)',
              fontSize: 'clamp(1rem, 3.5vw, 2rem)',
              letterSpacing: '0.15em',
              fontWeight: 400,
            }}
          >
            PERFORMANCE.READOUT
          </h2>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="status-dot-amber" />
            <span style={{ color: 'rgba(255,179,0,0.6)', fontSize: '9px', letterSpacing: '0.2em' }}>
              LIVE DATA
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="metric-card hud-panel"
              style={{ borderColor: `${m.color}22`, opacity: 0 }}
            >
              <div className="hud-panel-inner">
                <div className="panel-label">
                  <span style={{ fontSize: '7px' }}>{m.label}</span>
                  <span
                    className="status-dot"
                    style={{ background: m.color, boxShadow: `0 0 5px ${m.color}` }}
                  />
                </div>

                <AnimatedCounter
                  target={m.value}
                  suffix={m.suffix}
                  color={m.color}
                  triggerRef={sectionRef}
                />

                <p
                  style={{
                    color: 'rgba(0,255,65,0.35)',
                    fontSize: '7px',
                    letterSpacing: '0.15em',
                    marginTop: '4px',
                    marginBottom: '10px',
                  }}
                >
                  {m.subLabel}
                </p>

                <SegBarFill fill={m.barFill} color={m.color} cells={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
