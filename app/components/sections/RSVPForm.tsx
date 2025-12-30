'use client';

import { useState, FormEvent } from 'react';
import { weddingConfig } from '@/app/config/wedding.config';
import Container from '@/app/components/layout/Container';
import SectionTitle from '@/app/components/layout/SectionTitle';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import ScrollAnimationWrapper from '@/app/components/ui/ScrollAnimationWrapper';

interface FormData {
  name: string;
  email: string;
  attendance: 'attending' | 'declining' | '';
  guestCount: number;
  dietaryRestrictions: string;
  message: string;
}

export default function RSVPForm() {
  const { rsvp } = weddingConfig;
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    attendance: '',
    guestCount: 1,
    dietaryRestrictions: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Call the RSVP API endpoint
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit RSVP');
      }

      setSubmitStatus('success');

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        attendance: '',
        guestCount: 1,
        dietaryRestrictions: '',
        message: '',
      });
    } catch (error) {
      console.error('RSVP submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guestCount' ? parseInt(value) || 1 : value,
    }));
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-cream via-dark-cream to-cream" id="rsvp">
      <Container>
        <ScrollAnimationWrapper>
          <SectionTitle
            title="RSVP"
            subtitle={`Please respond by ${rsvp.deadline}`}
          />

          <div className="max-w-2xl mx-auto">
            <Card>
              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl font-serif text-charcoal mb-2">
                    Thank You!
                  </h3>
                  <p className="text-lg text-charcoal/70 font-sans">
                    We received your RSVP and can't wait to celebrate with you!
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-6"
                  >
                    Submit Another RSVP
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-sans uppercase tracking-wider text-charcoal mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors font-sans"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-sans uppercase tracking-wider text-charcoal mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors font-sans"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Attendance */}
                  <div>
                    <label className="block text-sm font-sans uppercase tracking-wider text-charcoal mb-3">
                      Will you be attending? *
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer flex-1">
                        <input
                          type="radio"
                          name="attendance"
                          value="attending"
                          checked={formData.attendance === 'attending'}
                          onChange={handleChange}
                          required
                          className="w-5 h-5 text-terracotta focus:ring-terracotta"
                        />
                        <span className="ml-3 font-sans text-charcoal">
                          Joyfully Accept
                        </span>
                      </label>
                      <label className="flex items-center cursor-pointer flex-1">
                        <input
                          type="radio"
                          name="attendance"
                          value="declining"
                          checked={formData.attendance === 'declining'}
                          onChange={handleChange}
                          required
                          className="w-5 h-5 text-terracotta focus:ring-terracotta"
                        />
                        <span className="ml-3 font-sans text-charcoal">
                          Regretfully Decline
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Guest Count */}
                  {formData.attendance === 'attending' && (
                    <div>
                      <label
                        htmlFor="guestCount"
                        className="block text-sm font-sans uppercase tracking-wider text-charcoal mb-2"
                      >
                        Number of Guests
                      </label>
                      <input
                        type="number"
                        id="guestCount"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        className="w-full px-4 py-3 rounded-lg border-2 border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors font-sans"
                      />
                    </div>
                  )}

                  {/* Dietary Restrictions */}
                  {formData.attendance === 'attending' && (
                    <div>
                      <label
                        htmlFor="dietaryRestrictions"
                        className="block text-sm font-sans uppercase tracking-wider text-charcoal mb-2"
                      >
                        Dietary Restrictions
                      </label>
                      <textarea
                        id="dietaryRestrictions"
                        name="dietaryRestrictions"
                        value={formData.dietaryRestrictions}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border-2 border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors font-sans resize-none"
                        placeholder="Let us know about any dietary restrictions or allergies"
                      />
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-sans uppercase tracking-wider text-charcoal mb-2"
                    >
                      Special Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border-2 border-charcoal/20 focus:border-terracotta focus:outline-none transition-colors font-sans resize-none"
                      placeholder="Send us your well wishes or any questions you may have"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                  </Button>

                  {submitStatus === 'error' && (
                    <p className="text-red-600 text-center font-sans">
                      There was an error submitting your RSVP. Please try again or contact us at {rsvp.email}
                    </p>
                  )}
                </form>
              )}
            </Card>
          </div>
        </ScrollAnimationWrapper>
      </Container>
    </section>
  );
}
