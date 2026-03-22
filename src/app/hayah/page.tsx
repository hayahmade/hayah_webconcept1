import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import MetricsSection from './components/MetricsSection';
import ProcessSection from './components/ProcessSection';
import ContactSection from './components/ContactSection';

export default function HayahPage() {
  return (
    <main
      className="min-h-screen grid-bg"
      style={{ background: 'var(--bg)', backgroundSize: '40px 40px' }}
    >
      {/* Ambient overlays */}
      <div className="grain-overlay" />
      <div className="scanlines-overlay" />

      <Header />

      <HeroSection />
      <ServicesSection />
      <MetricsSection />
      <ProcessSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
