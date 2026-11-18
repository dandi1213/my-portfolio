import React, { useState } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  CheckCircle2,
  AlertCircle,
  Send,
  ExternalLink,
} from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';
import { Card3d } from './Card3d';

interface ContactProps {
  personal: PersonalInfo;
  onShowToast: (msg: string) => void;
}

export function Contact({ personal, onShowToast }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateContactForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = 'Please enter a brief subject.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please write a message of at least 10 characters.';
    }
    return errors;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateContactForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      onShowToast('Message sent! I will get back to you within 24 hours.');
    }, 650);
  };

  const directChannels = [
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      href: `mailto:${personal.email}`,
      isExternal: false,
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: Github,
      href: personal.socials.github,
      isExternal: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      href: personal.socials.linkedin,
      isExternal: true,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: Instagram,
      href: personal.socials.instagram,
      isExternal: true,
    },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 relative border-t border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            title="Let's Work"
            highlight="Together!"
            subtitle="Punya ide produk, peluang kerja di bidang rekayasa, atau tantangan desain? Kirim pesan dan mari berdiskusi tentang cara mewujudkannya."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 3D Direct Channels Card (Compact Vertical List) */}
          <Reveal delay={80} className="lg:col-span-5 space-y-5">
            <Card3d
              maxTilt={7}
              className="rounded-3xl bg-[#111114] border border-white/[0.1] p-6 sm:p-7 space-y-5 shadow-2xl shadow-black/80"
            >
              <div style={{ transform: 'translateZ(20px)' }}>
                <h3 className="text-lg font-bold text-zinc-100">Direct Channels</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Hubungi saya secara langsung melalui email maupun jaringan profesional di bawah ini.
                </p>
              </div>

              {/* Compact Vertical List */}
              <div
                className="space-y-2.5"
                style={{ transform: 'translateZ(15px)' }}
              >
                {directChannels.map((channel) => {
                  const IconComponent = channel.icon;
                  return (
                    <a
                      key={channel.id}
                      href={channel.href}
                      target={channel.isExternal ? '_blank' : undefined}
                      rel={channel.isExternal ? 'noopener noreferrer' : undefined}
                      className="group p-3 rounded-2xl bg-[#09090B] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.035] transition-all flex items-center justify-between gap-3 shadow-inner"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.07] text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                          {channel.label}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0" />
                    </a>
                  );
                })}
              </div>
            </Card3d>
          </Reveal>

          {/* Right Column: 3D Perspective Contact Form */}
          <Reveal delay={140} className="lg:col-span-7">
            <Card3d
              maxTilt={6}
              className="rounded-3xl bg-[#111114] border border-white/[0.1] p-6 sm:p-8 shadow-2xl shadow-black/80"
            >
              <form onSubmit={handleContactSubmit} noValidate className="space-y-5" style={{ transform: 'translateZ(15px)' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full px-4 py-3 rounded-xl bg-[#09090B] border text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-colors ${
                        formErrors.name
                          ? 'border-red-500/60 focus:border-red-400'
                          : 'border-white/[0.09] focus:border-white/30'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{formErrors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#09090B] border text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-colors ${
                        formErrors.email
                          ? 'border-red-500/60 focus:border-red-400'
                          : 'border-white/[0.09] focus:border-white/30'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className={`w-full px-4 py-3 rounded-xl bg-[#09090B] border text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-colors ${
                      formErrors.subject
                        ? 'border-red-500/60 focus:border-red-400'
                        : 'border-white/[0.09] focus:border-white/30'
                    }`}
                  />
                  {formErrors.subject && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{formErrors.subject}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your product requirements, role description, or idea..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#09090B] border text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-colors resize-none ${
                      formErrors.message
                        ? 'border-red-500/60 focus:border-red-400'
                        : 'border-white/[0.09] focus:border-white/30'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{formErrors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-zinc-950 bg-zinc-100 hover:bg-white transition-all shadow-xl shadow-white/5 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {submitSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}
              </form>
            </Card3d>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
