'use client';

import { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from 'react';
import Image from 'next/image';

const decorativeDots = Array.from({ length: 12 }, (_, index) => ({
  top: `${8 + (index * 11) % 84}%`,
  left: `${12 + (index * 17) % 78}%`,
  duration: `${2 + (index % 4) * 0.75}s`,
  delay: `${index * 0.15}s`,
}));

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedServiceIndex, setExpandedServiceIndex] = useState<number | null>(null);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const statsSectionRef = useRef<HTMLElement | null>(null);
  const hasAnimatedStatsRef = useRef(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactStatus, setContactStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const targets = [25, 12, 99, 24];
    const duration = 1600;

    const runAnimation = () => {
      if (hasAnimatedStatsRef.current) {
        return;
      }
      hasAnimatedStatsRef.current = true;

      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setAnimatedStats(targets.map((target) => Math.floor(target * progress)));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runAnimation();
          }
        });
      },
      { threshold: 0.35 }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleContactInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingContact(true);
    setContactStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setContactStatus({
          type: 'error',
          message: result.message ?? 'Unable to send your message right now. Please try again.',
        });
        return;
      }

      setContactStatus({ type: 'success', message: 'Message sent successfully. We will contact you shortly.' });
      setContactForm({ name: '', email: '', message: '' });
    } catch {
      setContactStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const services = [
    {
      icon: '🤖',
      title: 'AI Integration',
      description: 'Connect powerful AI tools like ChatGPT and Gemini directly into your business.',
      features: ['AI Chatbots', 'AI Agents', 'Workflow Automation', 'Knowledge Bases'],
      buttonLabel: 'Learn More'
    },
    {
      icon: '💻',
      title: 'Website Development',
      description: 'Modern, responsive websites designed to convert visitors into customers.',
      features: ['Business Websites', 'Corporate Websites', 'Landing Pages', 'E-commerce Stores'],
      buttonLabel: 'View Projects'
    },
    {
      icon: '⚡',
      title: 'Business Automation',
      description: 'Reduce manual work and automate repetitive business processes.',
      features: ['CRM Integration', 'Email Automation', 'WhatsApp Automation', 'Appointment Booking'],
      buttonLabel: 'Discover More'
    },
    {
      icon: '📈',
      title: 'SEO & Growth',
      description: 'Get found on Google and generate consistent leads.',
      features: ['SEO Optimization', 'Google Business Profile', 'Analytics', 'Performance Reports'],
      buttonLabel: 'Learn More'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful interfaces designed for exceptional user experience.',
      features: ['Wireframes', 'Interactive Prototypes', 'Mobile Responsive', 'Brand Identity'],
      buttonLabel: 'Learn More'
    },
    {
      icon: '☁️',
      title: 'Cloud & Maintenance',
      description: 'We keep your website secure, updated, and running at peak performance.',
      features: ['Hosting', 'Security', 'Daily Backups', 'Monitoring'],
      buttonLabel: 'Learn More'
    }
  ];

  const whyChooseUs = [
    {
      icon: '🧠',
      title: 'AI-First Approach',
      description: 'We design every website around automation, performance and measurable business growth.'
    },
    {
      icon: '⏱️',
      title: 'Rapid Development',
      description: 'Launch your business website in days instead of months.'
    },
    {
      icon: '📈',
      title: 'Built to Generate Leads',
      description: 'Every page is engineered to convert visitors into paying customers.'
    },
    {
      icon: '🎧',
      title: 'Long-Term Partnership',
      description: 'We don’t disappear after launch. We continuously improve your digital presence.'
    }
  ];

  const projects = [
    {
      image: '🏢',
      title: 'E-Commerce Platform',
      description: 'AI-powered product recommendations increasing sales by 45%',
      category: 'E-Commerce'
    },
    {
      image: '📱',
      title: 'SaaS Dashboard',
      description: 'Intelligent analytics platform with real-time data processing',
      category: 'SaaS'
    },
    {
      image: '🏥',
      title: 'Healthcare Portal',
      description: 'HIPAA-compliant patient management system with AI diagnostics',
      category: 'Healthcare'
    }
  ];

  const testimonials = [
    {
      name: 'Amina Bello',
      role: 'CEO, TechVenture Inc',
      content: 'JimTech transformed our online presence. The AI integration increased our conversions by 60% in just 3 months!',
      rating: 5
    },
    {
      name: 'Chinedu Okafor',
      role: 'Marketing Director, Growth Co',
      content: 'Exceptional service and attention to detail. The team understood our vision and delivered beyond expectations.',
      rating: 5
    },
    {
      name: 'Tolulope Adeyemi',
      role: 'Founder, StartupHub',
      content: 'The most professional development team we\'ve worked with. Highly recommended for any AI-powered project.',
      rating: 5
    }
  ];

  return (
    <div className="w-full bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b' 
          : 'bg-white shadow-sm border-b'
      }`} style={{ borderBottomColor: '#D4AF37' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0">
              <Image
                src="/jimtech-ai-logo.png"
                alt="JimTech AI Studio Logo"
                height={80}
                width={250}
                className="h-[80px] w-auto"
              />
            </div>

            <div className="hidden md:flex items-center gap-8">
              {['Services', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-slate-800 font-semibold hover:text-blue-600 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </a>
              ))}
              <a
                href="https://wa.me/2347030425544"
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-md border border-yellow-500/30"
              >
                Get Started
              </a>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pt-40 pb-28 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0">
          <Image
            src="/hero section.png.jpeg"
            alt="JimTech AI Studio Hero"
            fill
            sizes="100vw"
            className="object-cover object-center scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.18),transparent_30%)]" />
        </div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/15 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
          {decorativeDots.map((dot, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 rounded-full bg-white opacity-30 animate-ping"
              style={{
                top: dot.top,
                left: dot.left,
                animationDuration: dot.duration,
                animationDelay: dot.delay,
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex min-h-[calc(100vh-8rem)] items-center">
          <div className="max-w-3xl space-y-8 px-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur border border-white/20 rounded-full shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span className="text-sm font-bold text-white/90">Enterprise AI Solutions</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight max-w-2xl">
                We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-yellow-200">Intelligent Websites</span> That Grow Businesses 24/7
              </h1>

              <p className="text-xl text-slate-200 leading-relaxed max-w-xl">
                Empower your brand with enterprise-grade AI solutions and high-performance web architecture. We bridge the gap between complex technology and seamless user experiences to drive 24/7 growth for forward-thinking companies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-500 text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-blue-400 transition-all shadow-xl hover:shadow-blue-900/30 transform hover:-translate-y-1 border-b-4 border-blue-800/80">
                  Get Free Consultation
                </button>
                <button className="bg-white/90 text-slate-900 px-8 py-5 rounded-xl font-bold text-lg hover:bg-white transition-all shadow-md border border-white/30 transform hover:-translate-y-1">
                  View Our Portfolio
                </button>
              </div>

          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={statsSectionRef} className="py-16 px-4 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Projects Delivered', prefix: '', suffix: '+' },
              { label: 'Industries Served', prefix: '', suffix: '' },
              { label: 'Clients Satisfaction', prefix: '', suffix: '%' },
              { label: 'Technical Support', prefix: '', suffix: '/7' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center rounded-2xl bg-slate-50 p-8 border border-slate-100">
                <p className="text-4xl sm:text-5xl font-black text-blue-600 mb-2">
                  {stat.prefix}
                  {animatedStats[index]}
                  {stat.suffix}
                </p>
                <p className="text-sm font-bold text-slate-700 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Our Services</h2>
            <p className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">Innovative AI Solutions for Every Business Need</p>
            <div className="h-1.5 w-24 bg-yellow-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index}>
              <div 
                className="group p-10 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
                <button
                  type="button"
                  onClick={() => setExpandedServiceIndex(expandedServiceIndex === index ? null : index)}
                  className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all"
                >
                  {service.buttonLabel} <span>→</span>
                </button>
                {expandedServiceIndex === index ? (
                  <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                    <p className="text-sm font-bold text-slate-900 mb-2">Features</p>
                    <ul className="space-y-1.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-sm text-slate-700">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Updated */}
      <section className="py-24 px-4 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">Why Choose JimTech AI Studio?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We combine engineering excellence with AI innovation to provide a competitive edge in an evolving digital landscape.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Featured Work</h2>
              <p className="text-slate-600">Explore how we help global brands leverage intelligent design and AI automation to dominate their markets.</p>
            </div>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition shadow-lg">
              View All Projects
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className="h-64 bg-slate-100 flex items-center justify-center text-6xl group-hover:scale-105 transition duration-500">
                  {project.image}
                </div>
                <div className="p-8 bg-white">
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-3">{project.title}</h3>
                  <p className="text-slate-600 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 bg-[#0b1f3b]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white">What Our Partners Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex gap-1 mb-6 text-yellow-400">
                  {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
                </div>
                    <p className="text-slate-700 italic mb-8 leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-blue-600 font-medium">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-600 rounded-[3rem] p-8 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10">Start Your AI Transformation</h2>
            <p className="text-blue-100 text-lg mb-10 relative z-10">Ready to build something extraordinary? Fill out the form below and we&apos;ll reach out within 24 hours.</p>
            
            <form onSubmit={handleContactSubmit} className="space-y-4 max-w-lg mx-auto relative z-10">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={contactForm.name}
                  onChange={handleContactInputChange}
                  required
                  className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/60 focus:bg-white focus:text-slate-900 outline-none transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={handleContactInputChange}
                  required
                  className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/60 focus:bg-white focus:text-slate-900 outline-none transition"
                />
              </div>
              <textarea
                name="message"
                placeholder="Tell us about your vision..."
                rows={4}
                value={contactForm.message}
                onChange={handleContactInputChange}
                required
                className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/60 focus:bg-white focus:text-slate-900 outline-none transition resize-none"
              ></textarea>
              {contactStatus.type ? (
                <p className={`text-sm font-medium ${contactStatus.type === 'success' ? 'text-green-200' : 'text-yellow-200'}`}>
                  {contactStatus.message}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={isSubmittingContact}
                className="w-full bg-yellow-400 text-slate-900 px-8 py-5 rounded-xl font-black text-xl hover:bg-yellow-300 transition shadow-xl border-b-4 border-yellow-600 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmittingContact ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 mt-16">
            {[
              { icon: '📧', label: 'Email', text: 'jimtechai30@gmail.com' },
              { icon: '📱', label: 'Phone', text: '+2347030425544' },
              { icon: '📍', label: 'Location', text: 'Lagos, Nigeria' }
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-bold text-slate-900">{item.label}</p>
                <p className="text-slate-600 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <Image src="/jimtech-ai-logo.png" alt="Logo" height={50} width={150} className="mb-6" />
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Empowering businesses worldwide with AI-driven digital experiences. We turn complex data into profitable outcomes.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">AI Integration</a></li>
                <li><a href="#" className="hover:text-blue-400">Web Architecture</a></li>
                <li><a href="#" className="hover:text-blue-400">Brand Strategy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Use</a></li>
                <li><a href="#" className="hover:text-blue-400">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} JimTech AI Studio. Designed for the Future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}  