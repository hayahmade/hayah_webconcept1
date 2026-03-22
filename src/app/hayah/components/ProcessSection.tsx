'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    id: '01',
    label: 'PHASE.ALPHA',
    title: 'BRIEF & SCOPE',
    desc: 'Deep-dive discovery session. Requirements captured with engineering precision. No ambiguity — every deliverable defined before a single line of code.',
    duration: '2–3 DAYS',
    color: 'var(--cyan)',
    status: 'COMPLETE',
  },
  {
    id: '02',
    label: 'PHASE.BETA',
    title: 'ARCHITECTURE',
    desc: 'System design, tech stack selection, database schema, API contracts. Blueprint reviewed and signed off before build commences.',
    duration: '3–5 DAYS',
    color: 'var(--green)',
    status: 'COMPLETE',
  },
  {
    id: '03',
    label: 'PHASE.GAMMA',
    title: 'BUILD & ITERATE',
    desc: 'Agile sprints with weekly demos. You see progress every 7 days — no black-box development. Feedback loops built in.',
    duration: '2–8 WEEKS',
    color: 'var(--amber)',
    status: 'ACTIVE',
  },
  {
    id: '04',
    label: 'PHASE.DELTA',
    title: 'QA & DEPLOY',
    desc: 'Automated test suites, performance benchmarks, security audit. Zero-downtime deployment to your infrastructure of choice.',
    duration: '3–5 DAYS',
    color: 'var(--green)',
    status: 'STANDBY',
  },
  {
    id: '05',
    label: 'PHASE.OMEGA',
    title: 'HANDOFF & SUPPORT',
    desc: 'Full documentation, codebase walkthrough, 30-day post-launch support included. You own everything — no lock-in.',
    duration: 'ONGOING',
    color: 'var(--cyan)',
    status: 'STANDBY',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      gsap.set(section.querySelectorAll('.phase-card'), { opacity: 1, y: 0 });
      const connector = section.querySelector('.process-connector');
      if (connector) {
        gsap.set(connector, { scaleX: 1, transformOrigin: 'left center' });
      }
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.phase-card',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      // Animate the connecting line
      gsap.fromTo(
        '.process-connector',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-12"
      style={{ borderTop: '1px solid var(--bezel)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2
            className="font-mono glow-cyan"
            style={{
              color: 'var(--cyan)',
              fontSize: 'clamp(1rem, 3.5vw, 2rem)',
              letterSpacing: '0.15em',
              fontWeight: 400,
            }}
          >
            MISSION.PROTOCOL
          </h2>
          <div className="flex items-center gap-2">
            <span className="status-dot-cyan" />
            <span style={{ color: 'rgba(0,255,255,0.5)', fontSize: '9px', letterSpacing: '0.2em' }}>
              5 PHASES
            </span>
          </div>
        </div>

        {/* Horizontal connector line (desktop only) */}
        <div className="hidden lg:block relative mb-2" style={{ height: '1px' }}>
          <div
            className="process-connector"
            style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              right: '10%',
              height: '1px',
              background:
                'linear-gradient(to right, var(--cyan), var(--green), var(--amber), var(--green), var(--cyan))',
              opacity: 0.3,
            }}
          />
        </div>

        {/* Phase cards — 1 col mobile, 2 col tablet, 5 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {PHASES?.map((phase) => (
            <div
              key={phase?.id}
              className="phase-card hud-panel process-step"
              style={{ borderColor: `${phase?.color}33`, opacity: 0 }}
            >
              <div className="hud-panel-inner">
                <div className="panel-label">
                  <span style={{ fontSize: '8px' }}>{phase?.label}</span>
                  <span
                    style={{
                      fontSize: '7px',
                      letterSpacing: '0.15em',
                      color:
                        phase?.status === 'ACTIVE'
                          ? 'var(--amber)'
                          : phase?.status === 'COMPLETE'
                            ? 'var(--green)'
                            : 'rgba(0,255,65,0.3)',
                      textShadow: phase?.status === 'ACTIVE' ? '0 0 6px var(--amber)' : 'none',
                    }}
                  >
                    {phase?.status}
                  </span>
                </div>

                <div
                  className="font-mono mb-1"
                  style={{
                    color: phase?.color,
                    fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                    textShadow: `0 0 10px ${phase?.color}`,
                    letterSpacing: '0.05em',
                  }}
                >
                  {phase?.id}
                </div>

                <h3
                  className="font-mono mb-2 sm:mb-3"
                  style={{
                    color: 'var(--green)',
                    fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)',
                    letterSpacing: '0.12em',
                  }}
                >
                  {phase?.title}
                </h3>

                <p
                  className="font-mono mb-3 sm:mb-4"
                  style={{
                    color: 'rgba(0,255,65,0.45)',
                    fontSize: 'clamp(9px, 1.6vw, 10px)',
                    lineHeight: '1.7',
                    letterSpacing: '0.04em',
                  }}
                >
                  {phase?.desc}
                </p>

                <hr className="hud-divider" />
                <div className="flex items-center gap-2 mt-2">
                  <span
                    style={{ color: 'rgba(0,255,65,0.3)', fontSize: '8px', letterSpacing: '0.1em' }}
                  >
                    DURATION
                  </span>
                  <span
                    style={{
                      color: phase?.color,
                      fontSize: '9px',
                      letterSpacing: '0.1em',
                      textShadow: `0 0 6px ${phase?.color}`,
                    }}
                  >
                    {phase?.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
