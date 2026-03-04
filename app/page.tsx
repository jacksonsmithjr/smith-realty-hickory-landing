'use client';

import Image from 'next/image';
import { useState, FormEvent } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    moveTimeline: '',
    budgetRange: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return false;
    if (!formData.lastName.trim()) return false;
    if (!formData.email.trim() || !formData.email.includes('@')) return false;
    if (!formData.phone.trim()) return false;
    if (!formData.moveTimeline) return false;
    if (!formData.budgetRange) return false;
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Google Ads - Hickory Relocation',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          moveTimeline: '',
          budgetRange: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-warmWhite">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
            alt="Couple finding their perfect home in Hickory, NC with help from local real estate experts"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-navy/70"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Moving to Hickory, NC? We&apos;ll Help You Find Home.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Local real estate experts specializing in relocation buyers and new construction — homes $350K and up in the Hickory, NC area.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-gold hover:bg-gold/90 text-navy font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
          >
            Get Your Free Relocation Guide
          </button>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="lead-form" className="py-16 px-4 bg-warmWhite">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-md mx-auto lg:max-w-lg lg:sticky lg:top-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-navy mb-6 text-center">
                Connect With a Local Expert
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="moveTimeline" className="block text-sm font-medium text-gray-700 mb-1">
                    Move Timeline *
                  </label>
                  <select
                    id="moveTimeline"
                    name="moveTimeline"
                    required
                    value={formData.moveTimeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                  >
                    <option value="">Select timeline</option>
                    <option value="Within 3 months">Within 3 months</option>
                    <option value="3–6 months">3–6 months</option>
                    <option value="6–12 months">6–12 months</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Range *
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    required
                    value={formData.budgetRange}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                  >
                    <option value="">Select budget</option>
                    <option value="$350K–$500K">$350K–$500K</option>
                    <option value="$500K–$750K">$500K–$750K</option>
                    <option value="$750K+">$750K+</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-navy hover:bg-navy/90 text-white font-semibold py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Connect With a Hickory Area Expert'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-600 text-sm text-center mt-2">
                    Thanks! A local Hickory expert will reach out within 1 business day.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-sm text-center mt-2">
                    Something went wrong. Please call us directly.
                  </p>
                )}
                <p className="text-xs text-gray-500 text-center mt-2">
                  No spam. No pressure. Just honest local guidance.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Relocate to Hickory Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            Why Relocate to Hickory, NC?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-warmWhite">
              <div className="text-4xl mb-4">🏫</div>
              <h3 className="text-xl font-semibold text-navy mb-3">Schools & Safety</h3>
              <p className="text-gray-700">
                Hickory&apos;s public schools consistently rank among the best in North Carolina, with strong academic programs and dedicated teachers. The area maintains low crime rates, making it an ideal place to raise a family with peace of mind.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-warmWhite">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-navy mb-3">Growing Job Market</h3>
              <p className="text-gray-700">
                The Hickory metro area is experiencing steady economic growth, with opportunities in manufacturing, healthcare, and technology sectors. Major employers continue to expand, creating new jobs and career advancement opportunities for relocating professionals.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-warmWhite">
              <div className="text-4xl mb-4">🏔️</div>
              <h3 className="text-xl font-semibold text-navy mb-3">Foothills Lifestyle & Affordability</h3>
              <p className="text-gray-700">
                Nestled in the beautiful Blue Ridge Foothills, Hickory offers stunning natural beauty with easy access to hiking, lakes, and outdoor recreation. You&apos;ll find exceptional value here, with more home for your dollar compared to larger metro areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-12 px-4 bg-navy">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-gold text-xl">★</span>
                ))}
              </div>
              <p className="text-sm italic mb-2">
                &quot;Moving to Hickory from Charlotte was the best decision we made. The team helped us find the perfect new construction home in a great neighborhood. Couldn&apos;t be happier!&quot;
              </p>
              <p className="text-xs text-white/80">— Sarah M., Relocated 2023</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-gold text-xl">★</span>
                ))}
              </div>
              <p className="text-sm italic mb-2">
                &quot;As a first-time homebuyer relocating to Hickory, I was nervous about the process. The expert guidance made everything smooth, and I found my dream home within budget.&quot;
              </p>
              <p className="text-xs text-white/80">— Michael R., Relocated 2024</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-gold text-xl">★</span>
                ))}
              </div>
              <p className="text-sm italic mb-2">
                &quot;The relocation guide was incredibly helpful, and the team understood exactly what we were looking for. Found a beautiful new construction home near Lake Hickory!&quot;
              </p>
              <p className="text-xs text-white/80">— Jennifer L., Relocated 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Construction Spotlight */}
      <section className="py-16 px-4 bg-warmWhite">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Interested in New Construction in Hickory?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            The Hickory and Catawba County area is experiencing exciting growth in new construction homes. From modern single-family homes to custom builds, discover brand-new properties that offer the latest features, energy efficiency, and move-in-ready convenience. Many new developments are located in desirable neighborhoods with excellent schools and convenient access to shopping, dining, and outdoor recreation.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-navy hover:bg-navy/90 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
          >
            See New Construction Listings
          </button>
        </div>
      </section>

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-navy shadow-lg">
        <div className="grid grid-cols-2 gap-2 p-4">
          <a
            href="tel:+1234567890"
            className="bg-gold hover:bg-gold/90 text-navy font-semibold py-3 px-4 rounded-lg text-center transition-colors"
          >
            Call Now
          </a>
          <button
            onClick={scrollToForm}
            className="bg-white hover:bg-gray-100 text-navy font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Get Free Guide
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy text-white py-12 px-4 pb-24 md:pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">Smith Realty Group</div>
              <p className="text-white/80 text-sm">
                Serving Hickory, Conover, Newton, and Claremont areas
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <p className="text-white/80 text-sm mb-1">
                <a href="tel:+1234567890" className="hover:text-gold transition-colors">
                  (123) 456-7890
                </a>
              </p>
              <p className="text-white/80 text-sm">
                <a href="mailto:info@smithrealty.com" className="hover:text-gold transition-colors">
                  info@smithrealty.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Service Areas</h3>
              <p className="text-white/80 text-sm">
                Hickory, NC<br />
                Conover, NC<br />
                Newton, NC<br />
                Claremont, NC
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8">
            <p className="text-white/60 text-xs text-center">
              © {new Date().getFullYear()} Smith Realty Group. All rights reserved.
            </p>
            <p className="text-white/60 text-xs text-center mt-2">
              Equal Housing Opportunity. All real estate advertised herein is subject to the Federal Fair Housing Act, which makes it illegal to advertise any preference, limitation, or discrimination because of race, color, religion, sex, handicap, familial status, or national origin, or intention to make any such preference, limitation, or discrimination.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
