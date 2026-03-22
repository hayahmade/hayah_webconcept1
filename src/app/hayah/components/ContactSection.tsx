'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      gsap.set(section.querySelectorAll('.contact-panel'), { opacity: 1, y: 0 });
      if (terminalRef.current) {
        gsap.set(terminalRef.current.querySelectorAll('.t-line'), { opacity: 1, x: 0 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-panel',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );

      // Terminal lines type in
      if (terminalRef.current) {
        const lines = terminalRef.current.querySelectorAll('.t-line');
        gsap.fromTo(
          lines,
          { opacity: 0, x: -8 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-12"
      style={{ borderTop: '1px solid var(--bezel)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3">
          {/* Left — Terminal info panel */}
          <div
            className="contact-panel hud-panel md:col-span-5"
            style={{ borderColor: 'rgba(255,23,68,0.25)', opacity: 0 }}
          >
            <div className="hud-panel-inner">
              <div className="panel-label">
                <span>COMMS.TERMINAL</span>
                <span className="status-dot-red" />
              </div>

              <h2
                className="font-mono glow-red mb-3 sm:mb-4"
                style={{
                  color: 'var(--red)',
                  fontSize: 'clamp(1.1rem, 4vw, 2rem)',
                  letterSpacing: '0.1em',
                  fontWeight: 400,
                }}
              >
                INITIATE
                <br />
                MISSION
              </h2>

              <p
                className="font-mono mb-6 sm:mb-8"
                style={{
                  color: 'rgba(0,255,65,0.5)',
                  fontSize: 'clamp(10px, 1.8vw, 11px)',
                  lineHeight: '1.9',
                  letterSpacing: '0.05em',
                }}
              >
                Ready to build something engineered to last? Transmit your project brief and receive
                a scoped proposal within 48 hours.
              </p>

              {/* Terminal log */}
              <div
                ref={terminalRef}
                className="font-mono"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(0,255,65,0.1)',
                  padding: '12px 14px',
                  marginBottom: '20px',
                }}
              >
                {[
                  { prefix: '>', text: 'HAYAH.ENG COMMS ONLINE', color: 'var(--green)' },
                  { prefix: '>', text: 'ENCRYPTION: AES-256 ACTIVE', color: 'var(--cyan)' },
                  { prefix: '>', text: 'RESPONSE TIME: <48H', color: 'var(--amber)' },
                  { prefix: '>', text: 'AWAITING TRANSMISSION...', color: 'var(--red)' },
                ].map((line, i) => (
                  <div
                    key={i}
                    className="t-line"
                    style={{
                      color: line.color,
                      fontSize: 'clamp(9px, 1.8vw, 10px)',
                      letterSpacing: '0.12em',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ color: 'rgba(0,255,65,0.3)', marginRight: '8px' }}>
                      {line.prefix}
                    </span>
                    {line.text}
                  </div>
                ))}
              </div>

              {/* Contact info */}
              <div className="flex flex-col gap-2 sm:gap-3">
                {[
                  { label: 'CHANNEL', val: 'hello@hayah.dev', color: 'var(--cyan)' },
                  { label: 'TIMEZONE', val: 'UTC+0 / REMOTE', color: 'var(--green)' },
                  { label: 'RESPONSE', val: '<48 HOURS', color: 'var(--amber)' },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3 sm:gap-4">
                    <span
                      style={{
                        color: 'rgba(0,255,65,0.35)',
                        fontSize: '8px',
                        letterSpacing: '0.2em',
                        width: '64px',
                      }}
                    >
                      {c.label}
                    </span>
                    <span
                      style={{
                        color: c.color,
                        fontSize: 'clamp(10px, 2vw, 11px)',
                        letterSpacing: '0.08em',
                        textShadow: `0 0 6px ${c.color}`,
                      }}
                    >
                      {c.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div
            className="contact-panel hud-panel md:col-span-7"
            style={{ borderColor: 'rgba(0,255,65,0.2)', opacity: 0 }}
          >
            <div className="hud-panel-inner">
              <div className="panel-label">
                <span>TRANSMISSION.FORM</span>
                <div className="flex items-center gap-2">
                  <span style={{ color: 'rgba(0,255,65,0.4)', fontSize: '8px' }}>SECURE</span>
                  <span className="status-dot" />
                </div>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-4">
                  <div
                    className="font-mono glow-green"
                    style={{
                      color: 'var(--green)',
                      fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                      letterSpacing: '0.2em',
                    }}
                  >
                    TRANSMISSION RECEIVED
                  </div>
                  <p
                    style={{
                      color: 'rgba(0,255,65,0.5)',
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                    }}
                  >
                    RESPONSE INCOMING WITHIN 48 HOURS
                  </p>
                  <span className="status-dot" style={{ width: '10px', height: '10px' }} />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
                  <div>
                    <label
                      style={{
                        color: 'rgba(0,255,65,0.4)',
                        fontSize: '9px',
                        letterSpacing: '0.25em',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      OPERATOR.NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="YOUR NAME"
                      className="terminal-input"
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        color: 'rgba(0,255,65,0.4)',
                        fontSize: '9px',
                        letterSpacing: '0.25em',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      COMMS.CHANNEL
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="YOUR EMAIL"
                      className="terminal-input"
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        color: 'rgba(0,255,65,0.4)',
                        fontSize: '9px',
                        letterSpacing: '0.25em',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      MISSION.BRIEF
                    </label>
                    <textarea
                      required
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      placeholder="DESCRIBE YOUR PROJECT..."
                      rows={4}
                      className="terminal-input"
                      style={{
                        resize: 'none',
                        background: 'transparent',
                        border: '1px solid rgba(0,255,65,0.2)',
                        padding: '10px',
                        width: '100%',
                        color: 'var(--green)',
                        fontFamily: 'var(--font)',
                        fontSize: '12px',
                        outline: 'none',
                        letterSpacing: '0.05em',
                      }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-3 sm:gap-4 items-center mt-1 sm:mt-2">
                    <button type="submit" className="btn-red-cta">
                      <span>⬛ TRANSMIT BRIEF</span>
                    </button>
                    <span
                      style={{
                        color: 'rgba(0,255,65,0.3)',
                        fontSize: '9px',
                        letterSpacing: '0.15em',
                      }}
                    >
                      ENCRYPTED · SECURE · CONFIDENTIAL
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom alert strip */}
        <div
          className="hud-panel mt-2 sm:mt-3"
          style={{ padding: '8px 14px', borderColor: 'rgba(255,23,68,0.2)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="status-dot-red" />
              <span
                style={{
                  color: 'var(--red)',
                  fontSize: '9px',
                  letterSpacing: '0.25em',
                  textShadow: '0 0 6px var(--red)',
                }}
              >
                HIGH PRIORITY — LIMITED SLOTS AVAILABLE
              </span>
            </div>
            <span
              style={{ color: 'rgba(0,255,65,0.35)', fontSize: '9px', letterSpacing: '0.15em' }}
            >
              NEXT AVAILABLE SLOT: Q2 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
