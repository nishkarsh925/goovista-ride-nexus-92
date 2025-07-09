import React from 'react';
import InteractiveHero from '@/components/ui/hero-section-nexus';
import BookingForm from '@/components/BookingForm';
import AboutSection from '@/components/AboutSection';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';
import ChatbotWidget from '@/components/ChatbotWidget';

const Index = () => {
  return (
    <div className="min-h-screen">
      <InteractiveHero />
      <section id="book">
        <BookingForm />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <ChatbotWidget />
    </div>
  );
};

export default Index;
