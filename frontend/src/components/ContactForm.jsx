import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject line is required';
    if (!formData.message.trim()) {
      errs.message = 'Please include a message';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await api.sendMessage(formData);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF2E63', '#FF5E2B', '#22D3EE', '#FACC15'],
      });
    } catch (err) {
      // If backend isn't running locally yet, still provide clean feedback or error
      if (err.message === 'Failed to fetch') {
        setSubmitStatus('error');
      } else {
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Success Notification */}
      {submitStatus === 'success' && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-start gap-3 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Thank you! Your message has been received.</p>
            <p className="text-xs mt-0.5 opacity-90">
              I will review your message and get back to you shortly.
            </p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {submitStatus === 'error' && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Unable to dispatch message right now.</p>
            <p className="text-xs mt-0.5 opacity-90">
              Please reach out directly via email at <span className="font-mono">lavan.kumar@example.com</span>.
            </p>
          </div>
        </div>
      )}

      {/* Name Input */}
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1.5"
        >
          Your Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Alex Morgan"
          disabled={isSubmitting}
          className={`w-full px-4 py-3 rounded-xl border bg-light-secondary dark:bg-dark-secondary/60 text-light-heading dark:text-dark-heading placeholder-light-body/50 dark:placeholder-dark-body/50 text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.name
              ? 'border-rose-500 focus:ring-rose-500/30'
              : 'border-light-border dark:border-dark-border focus:border-[#FF2E63] dark:focus:border-[#FF2E63] focus:ring-[#FF2E63]/20'
          }`}
        />
        {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
      </div>

      {/* Email Input */}
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1.5"
        >
          Email Address <span className="text-rose-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="alex@company.com"
          disabled={isSubmitting}
          className={`w-full px-4 py-3 rounded-xl border bg-light-secondary dark:bg-dark-secondary/60 text-light-heading dark:text-dark-heading placeholder-light-body/50 dark:placeholder-dark-body/50 text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.email
              ? 'border-rose-500 focus:ring-rose-500/30'
              : 'border-light-border dark:border-dark-border focus:border-[#FF2E63] dark:focus:border-[#FF2E63] focus:ring-[#FF2E63]/20'
          }`}
        />
        {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
      </div>

      {/* Subject Input */}
      <div>
        <label
          htmlFor="subject"
          className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1.5"
        >
          Subject <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Full Stack Opportunity / Project Collaboration"
          disabled={isSubmitting}
          className={`w-full px-4 py-3 rounded-xl border bg-light-secondary dark:bg-dark-secondary/60 text-light-heading dark:text-dark-heading placeholder-light-body/50 dark:placeholder-dark-body/50 text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.subject
              ? 'border-rose-500 focus:ring-rose-500/30'
              : 'border-light-border dark:border-dark-border focus:border-[#FF2E63] dark:focus:border-[#FF2E63] focus:ring-[#FF2E63]/20'
          }`}
        />
        {errors.subject && <p className="mt-1 text-xs text-rose-500">{errors.subject}</p>}
      </div>

      {/* Message Textarea */}
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1.5"
        >
          Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Hello Lavan, I came across your portfolio and would like to discuss..."
          disabled={isSubmitting}
          className={`w-full px-4 py-3 rounded-xl border bg-light-secondary dark:bg-dark-secondary/60 text-light-heading dark:text-dark-heading placeholder-light-body/50 dark:placeholder-dark-body/50 text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
            errors.message
              ? 'border-rose-500 focus:ring-rose-500/30'
              : 'border-light-border dark:border-dark-border focus:border-[#FF2E63] dark:focus:border-[#FF2E63] focus:ring-[#FF2E63]/20'
          }`}
        />
        {errors.message && <p className="mt-1 text-xs text-rose-500">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white font-bold uppercase tracking-wider text-xs sm:text-sm shadow-[0_0_22px_rgba(255,46,99,0.4)] hover:shadow-[0_0_30px_rgba(255,46,99,0.6)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
};

