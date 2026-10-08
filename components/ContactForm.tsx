'use client';

import { useState, type FormEvent } from 'react';
import { Icon } from './Icon';

const services = ['Website Development', 'AI Integration', 'Business Automation', 'E-commerce', 'UI/UX Design', 'SEO & Digital Growth', 'Cloud & Maintenance', 'Other'];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        setStatus({ type: 'error', message: result.message ?? 'Unable to send your message right now. Please try again.' });
        return;
      }
      form.reset();
      setStatus({ type: 'success', message: 'Thanks for reaching out. Your project enquiry has been sent.' });
    } catch {
      setStatus({ type: 'error', message: 'We could not connect. Please try again or contact us on WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-honeypot" aria-hidden="true">
        <label>Leave this field empty<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="form-grid">
        <label>Name <input name="name" autoComplete="name" required maxLength={120} placeholder="Your name" /></label>
        <label>Email <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label>
        <label>Phone <input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+234…" /></label>
        <label>Company <input name="company" autoComplete="organization" maxLength={160} placeholder="Company name" /></label>
        <label>Service <select name="service" defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service}>{service}</option>)}</select></label>
        <label>Budget range <select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>Under ₦500,000</option><option>₦500,000 – ₦2,000,000</option><option>₦2,000,000 – ₦5,000,000</option><option>₦5,000,000+</option><option>Not sure yet</option></select></label>
        <label>Timeline <select name="timeline" defaultValue=""><option value="" disabled>Select a timeline</option><option>As soon as possible</option><option>Within 1–2 months</option><option>Within 3–6 months</option><option>Exploring options</option></select></label>
        <label className="form-grid__full">Project description <textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="What would you like to build or improve?" /></label>
      </div>
      {status ? <p className={`form-status form-status--${status.type}`} role={status.type === 'error' ? 'alert' : 'status'} aria-live="polite">{status.message}</p> : null}
      <button className="button button--gold contact-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending enquiry…' : 'Start Your Project'}{!isSubmitting ? <Icon name="arrow" size={18} /> : null}</button>
      <p className="form-note">Your details are used to respond to this enquiry.</p>
    </form>
  );
}
