import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const problemCards = [
    { id: 1, icon: '📞', title: 'I Miss Calls After Hours', route: '/serviceflow', color: '#f97316' },
    { id: 2, icon: '📥', title: 'I Need More Leads', route: '/demo', color: '#2563eb' },
    { id: 3, icon: '📋', title: 'I Need Intake Automation', route: '/careflow', color: '#0d7a5f' },
    { id: 4, icon: '⚡', title: 'I Need Faster Follow-Up', route: '/demo', color: '#8b5cf6' },
    { id: 5, icon: '📅', title: 'I Need More Booked Appointments', route: '/demo', color: '#ec4899' },
    { id: 6, icon: '⚖️', title: 'I Need High-Value Lead Qualification', route: '/caseflow', color: '#1e3a5f' },
  ];

  const whyUsCards = [
    { icon: '✓', title: 'Real Working Systems', desc: 'Not theory or slideshows. Every demo is a live, working system deployed for real businesses.' },
    { icon: '💰', title: 'Built for Revenue Growth', desc: 'Every system we build has one goal: capture more leads and convert them to revenue.' },
    { icon: '🔧', title: 'Custom Built for Your Business', desc: 'We don\'t sell off-the-shelf. Every system is built specifically for your workflows and metrics.' },
  ];

  return (
    <>
      <Head>
        <title>The AI Business Professionals - Live AI Automation Demos</title>
        <meta name="description" content="See real working AI systems that recover missed leads, book appointments, and automate workflows. Interactive demos for HVAC, home care, law firms, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif; color: #0f172a; background: #ffffff; }
        a { color: inherit; text-decoration: none; }

        .navbar { background: white; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 100; }
        .nav-container { max-width: 1200px; margin: 0 auto; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { font-size: 18px; font-weight: 700; color: #1e3a5f; }
        .nav-links { display: flex; gap: 32px; align-items: center; }
        .nav-links a { font-size: 14px; color: #64748b; transition: color 0.2s; }
        .nav-links a:hover { color: #1e3a5f; }
        .nav-cta { background: #2563eb; color: white; padding: 8px 20px; border-radius: 6px; font-size: 13px; font-weight: 600; transition: background 0.2s; }
        .nav-cta:hover { background: #1d4ed8; }

        .hero { background: linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%); padding: 80px 20px; text-align: center; }
        .hero-container { max-width: 900px; margin: 0 auto; }
        .hero h1 { font-size: 48px; font-weight: 800; color: #0f172a; margin-bottom: 16px; line-height: 1.2; }
        .hero p { font-size: 18px; color: #475569; margin-bottom: 32px; line-height: 1.6; max-width: 700px; margin-left: auto; margin-right: auto; }
        .hero-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .btn-primary { background: #2563eb; color: white; padding: 14px 36px; border-radius: 8px; font-size: 15px; font-weight: 600; border: none; cursor: pointer; transition: background 0.2s; }
        .btn-primary:hover { background: #1d4ed8; }
        .btn-secondary { background: white; color: #2563eb; padding: 14px 36px; border-radius: 8px; font-size: 15px; font-weight: 600; border: 2px solid #2563eb; cursor: pointer; transition: all 0.2s; }
        .btn-secondary:hover { background: #f0f9ff; }

        .problems-section { max-width: 1200px; margin: 80px auto; padding: 0 20px; }
        .section-title { font-size: 36px; font-weight: 800; color: #0f172a; text-align: center; margin-bottom: 48px; }
        .problems-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }
        .problem-card { background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 28px; text-align: center; cursor: pointer; transition: all 0.3s; }
        .problem-card:hover { border-color: currentColor; box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-4px); }
        .problem-card.hover1 { color: #f97316; }
        .problem-card.hover2 { color: #2563eb; }
        .problem-card.hover3 { color: #0d7a5f; }
        .problem-card.hover4 { color: #8b5cf6; }
        .problem-card.hover5 { color: #ec4899; }
        .problem-card.hover6 { color: #1e3a5f; }
        .problem-icon { font-size: 40px; margin-bottom: 12px; }
        .problem-title { font-size: 16px; font-weight: 700; margin-bottom: 12px; }
        .problem-arrow { font-size: 14px; margin-top: 12px; opacity: 0; transition: opacity 0.3s, transform 0.3s; transform: translateX(-4px); }
        .problem-card:hover .problem-arrow { opacity: 1; transform: translateX(0); }

        .featured-section { background: #f8fafc; padding: 60px 20px; }
        .featured-container { max-width: 1200px; margin: 0 auto; }
        .featured-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .featured-image { background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); border-radius: 12px; height: 300px; display: flex; align-items: center; justify-content: center; font-size: 56px; }
        .featured-content h3 { font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 16px; }
        .featured-content p { font-size: 15px; color: #475569; margin-bottom: 24px; line-height: 1.6; }
        .featured-content .btn-primary { align-self: flex-start; }

        .why-us-section { max-width: 1200px; margin: 80px auto; padding: 0 20px; }
        .why-us-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; margin-top: 48px; }
        .why-us-card { padding: 32px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center; transition: all 0.3s; }
        .why-us-card:hover { border-color: #cbd5e1; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
        .why-us-icon { font-size: 32px; margin-bottom: 16px; }
        .why-us-card h3 { font-size: 18px; font-weight: 700; margin-bottom: 12px; color: #0f172a; }
        .why-us-card p { font-size: 14px; color: #64748b; line-height: 1.6; }

        .final-cta-section { background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8c 100%); padding: 80px 20px; text-align: center; color: white; }
        .final-cta-container { max-width: 900px; margin: 0 auto; }
        .final-cta-section h2 { font-size: 40px; font-weight: 800; margin-bottom: 16px; }
        .final-cta-section p { font-size: 16px; margin-bottom: 32px; opacity: 0.9; }
        .final-cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .btn-white { background: white; color: #1e3a5f; padding: 14px 36px; border-radius: 8px; font-size: 15px; font-weight: 600; border: none; cursor: pointer; transition: background 0.2s; }
        .btn-white:hover { background: #f0f9ff; }
        .btn-outline { background: transparent; color: white; padding: 14px 36px; border-radius: 8px; font-size: 15px; font-weight: 600; border: 2px solid white; cursor: pointer; transition: all 0.2s; }
        .btn-outline:hover { background: white; color: #1e3a5f; }

        .footer { background: #0f172a; color: white; padding: 48px 20px; }
        .footer-container { max-width: 1200px; margin: 0 auto; }
        .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
        .footer-brand { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
        .footer-desc { font-size: 13px; color: #cbd5e1; line-height: 1.6; }
        .footer-col h4 { font-size: 13px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; letter-spacing: 0.05em; }
        .footer-col a { display: block; font-size: 13px; color: #cbd5e1; margin-bottom: 8px; transition: color 0.2s; }
        .footer-col a:hover { color: white; }
        .footer-divider { height: 1px; background: #1e293b; margin-bottom: 20px; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #64748b; }

        @media (max-width: 768px) {
          .hero h1 { font-size: 32px; }
          .hero p { font-size: 16px; }
          .nav-links { display: none; }
          .problems-grid { grid-template-columns: 1fr; }
          .featured-grid { grid-template-columns: 1fr; }
          .why-us-grid { grid-template-columns: 1fr; }
          .final-cta-section h2 { font-size: 28px; }
          .hero-buttons { flex-direction: column; align-items: center; }
          .btn-primary, .btn-secondary, .btn-white, .btn-outline { width: 100%; }
          .footer-top { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">🤖 AI Business Pros</div>
          <div className="nav-links">
            <a href="#demos">See Demos</a>
            <a href="#why">Why Us</a>
            <a href="https://calendly.com/kimmycombs" target="_blank" rel="noopener noreferrer" className="nav-cta">Book Call</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-container">
          <h1>See AI Systems That Recover Leads, Book Appointments, and Automate Workflows</h1>
          <p>Interactive demos built for real businesses. Choose your biggest problem and see the solution live.</p>
          <div className="hero-buttons">
            <a href="#demos" className="btn-primary">View Live Demos</a>
            <a href="https://calendly.com/kimmycombs" target="_blank" rel="noopener noreferrer" className="btn-secondary">Book Strategy Call</a>
          </div>
        </div>
      </section>

      {/* Problem Selector */}
      <section id="demos" className="problems-section">
        <h2 className="section-title">What Do You Need Help With?</h2>
        <div className="problems-grid">
          {problemCards.map((card) => (
            <a href={card.route} key={card.id}>
              <div className={`problem-card hover${card.id}`} onMouseEnter={() => setHoveredCard(card.id)} onMouseLeave={() => setHoveredCard(null)}>
                <div className="problem-icon">{card.icon}</div>
                <h3 className="problem-title">{card.title}</h3>
                <div className="problem-arrow">→</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Demo */}
      <section className="featured-section">
        <div className="featured-container">
          <h2 className="section-title">See It Live</h2>
          <div className="featured-grid">
            <div className="featured-image">📞 HVAC AI Bot</div>
            <div className="featured-content">
              <h3>Watch AI Answer Customer Questions & Book Appointments</h3>
              <p>This AI chatbot answers customer questions 24/7, qualifies leads, and books appointments automatically. No more missed calls. No more manual follow-up.</p>
              <a href="/hvac-demo" className="btn-primary">Watch Live Demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why" className="why-us-section">
        <h2 className="section-title">Why Work With Us</h2>
        <div className="why-us-grid">
          {whyUsCards.map((card, i) => (
            <div key={i} className="why-us-card">
              <div className="why-us-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="final-cta-container">
          <h2>Want This Built for Your Business?</h2>
          <p>Schedule a 20-minute strategy call. We'll map your workflows and show you exactly what's possible.</p>
          <div className="final-cta-buttons">
            <a href="https://calendly.com/kimmycombs" target="_blank" rel="noopener noreferrer" className="btn-white">Book Free Call</a>
            <a href="#demos" className="btn-outline">See All Demos</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div>
              <div className="footer-brand">The AI Business Professionals</div>
              <p className="footer-desc">Building AI systems that capture leads, book appointments, and automate workflows for growing businesses.</p>
            </div>
            <div className="footer-col">
              <h4>Demos</h4>
              <a href="/serviceflow">HVAC Recovery</a>
              <a href="/careflow">Home Care Intake</a>
              <a href="/caseflow">Law Firm Intake</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#why">Why Us</a>
              <a href="https://calendly.com/kimmycombs" target="_blank" rel="noopener noreferrer">Book Call</a>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <a href="mailto:hello@aibizpros.com">hello@aibizpros.com</a>
              <a href="https://calendly.com/kimmycombs" target="_blank" rel="noopener noreferrer">Schedule Call</a>
            </div>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-bottom">
            <span>&copy; 2026 The AI Business Professionals. All rights reserved.</span>
            <span>Premium AI Automation Systems</span>
          </div>
        </div>
      </footer>
    </>
  );
}
