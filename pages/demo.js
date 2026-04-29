import Head from 'next/head';
import Link from 'next/link';

const demos = [
  {
    icon: '🔧',
    badge: 'HVAC',
    title: 'AI Chatbot Assistant',
    outcome: 'Answers Questions · Books Service Calls',
    tagline: 'A 24/7 AI assistant that qualifies leads and books HVAC appointments — even when your phones are closed.',
    href: '/hvac-demo',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
  },
  {
    icon: '📲',
    badge: 'HVAC',
    title: 'Missed Calls to Booked Jobs',
    outcome: 'Recover Leads · Book Jobs Automatically',
    tagline: 'Every missed call gets an instant AI text back. Leads are qualified and jobs get booked — no manual follow-up needed.',
    href: '/serviceflow',
    color: '#f97316',
    bg: '#fff7ed',
    border: '#fed7aa',
  },
  {
    icon: '🏠',
    badge: 'Home Care',
    title: 'Inquiries to Assessments',
    outcome: 'Capture Family Leads · Book In-Home Assessments',
    tagline: 'AI intake for home care agencies — qualifies families, identifies payor type, and books free assessments around the clock.',
    href: '/careflow',
    color: '#0d7a5f',
    bg: '#f0fdf8',
    border: '#6ee7b7',
  },
  {
    icon: '⚖️',
    badge: 'Law Firm',
    title: 'Leads to Consultations',
    outcome: 'Qualify Injury Cases · Book Consults',
    tagline: 'Personal injury intake AI — captures accident details, screens case value, and books consultations with your attorneys automatically.',
    href: '/caseflow',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
  },
  {
    icon: '🏠',
    badge: 'Roofing',
    title: 'Storm Leads to Inspections',
    outcome: 'Capture Storm Leads · Book Free Inspections',
    tagline: 'After every storm, AI reaches out to homeowners, identifies insurance leads, and books free roof inspections before your competition.',
    href: '/roofflow',
    color: '#e8a020',
    bg: '#fffbeb',
    border: '#fde68a',
  },
];

export default function DemoPage() {
  return (
    <>
      <Head>
        <title>Business Solution Demos — AI Business Professionals</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Live interactive demos of AI systems built for real businesses. See finished software that captures leads, books jobs, and recovers revenue automatically." />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f8fafc;
          color: #1e293b;
          line-height: 1.6;
        }

        .top-bar {
          background: #0f172a;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .top-bar-logo {
          font-size: 14px;
          font-weight: 700;
          color: white;
          text-decoration: none;
        }
        .top-bar-logo span { color: #a78bfa; }
        .top-bar-back {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.15s;
        }
        .top-bar-back:hover { color: white; }

        .hero {
          background: #0f172a;
          padding: 60px 24px 56px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .hero-badge {
          display: inline-block;
          background: rgba(167,139,250,0.15);
          color: #a78bfa;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 20px;
          border: 1px solid rgba(167,139,250,0.3);
          margin-bottom: 20px;
        }
        .hero h1 {
          font-size: 38px;
          font-weight: 800;
          color: white;
          line-height: 1.15;
          margin-bottom: 16px;
          max-width: 680px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero h1 span { color: #a78bfa; }
        .hero p {
          font-size: 17px;
          color: rgba(255,255,255,0.6);
          max-width: 560px;
          margin: 0 auto 32px;
        }
        .hero-trust {
          display: flex;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
        }
        .hero-trust-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
        }
        .hero-trust-item span { font-size: 15px; }

        .main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 52px 24px 80px;
        }
        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 24px;
        }

        .demos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-bottom: 72px;
        }

        .demo-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s, transform 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .demo-card:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }
        .demo-card-top {
          padding: 24px 24px 20px;
          flex: 1;
        }
        .demo-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .demo-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .demo-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 20px;
        }
        .demo-title {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
          margin-bottom: 6px;
        }
        .demo-outcome {
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .demo-tagline {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
        }

        .demo-card-footer {
          padding: 16px 24px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .live-dot-wrap {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: #64748b;
        }
        .live-dot {
          width: 7px; height: 7px;
          background: #22c55e; border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        .view-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 20px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          color: white;
          transition: opacity 0.15s, transform 0.15s;
        }
        .view-btn:hover { opacity: 0.88; transform: translateX(2px); }

        /* CTA SECTION */
        .cta-section {
          background: #0f172a;
          border-radius: 20px;
          padding: 56px 48px;
          text-align: center;
        }
        .cta-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 16px;
        }
        .cta-heading {
          font-size: 30px;
          font-weight: 800;
          color: white;
          line-height: 1.2;
          margin-bottom: 14px;
        }
        .cta-body {
          font-size: 16px;
          color: rgba(255,255,255,0.6);
          max-width: 500px;
          margin: 0 auto 32px;
        }
        .cta-btn {
          display: inline-block;
          background: #673de6;
          color: white;
          font-size: 15px;
          font-weight: 700;
          padding: 14px 36px;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.15s;
        }
        .cta-btn:hover { background: #5025d1; }
        .cta-sub {
          margin-top: 14px;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }

        footer {
          background: #0f172a;
          color: #64748b;
          text-align: center;
          padding: 28px 20px;
          font-size: 13px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        footer strong { color: white; }
        footer a { color: #a78bfa; text-decoration: none; }

        @media (max-width: 640px) {
          .hero h1 { font-size: 26px; }
          .hero { padding: 40px 20px 36px; }
          .main { padding: 36px 16px 60px; }
          .demos-grid { grid-template-columns: 1fr; gap: 16px; }
          .cta-section { padding: 36px 24px; }
          .cta-heading { font-size: 22px; }
          .hero-trust { gap: 16px; }
        }
      `}</style>

      {/* TOP BAR */}
      <div className="top-bar">
        <a href="/" className="top-bar-logo">The AI <span>Business</span> Professionals</a>
        <a href="/" className="top-bar-back">← Back to Site</a>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-badge">Business Solution Demos</div>
        <h1>Finished AI Systems Built for <span>Real Businesses</span></h1>
        <p>
          These aren't mockups or slides. Click any demo below to see a live, interactive
          AI system working exactly as it would for a real client.
        </p>
        <div className="hero-trust">
          <div className="hero-trust-item"><span>⚡</span> Responds in under 60 seconds</div>
          <div className="hero-trust-item"><span>📋</span> Captures leads automatically</div>
          <div className="hero-trust-item"><span>📅</span> Books appointments 24/7</div>
          <div className="hero-trust-item"><span>🚀</span> Deployed in under 2 weeks</div>
        </div>
      </div>

      <div className="main">
        <div className="section-label">Interactive Demos — Click to explore</div>

        <div className="demos-grid">
          {demos.map((d, i) => (
            <div key={i} className="demo-card">
              <div className="demo-card-top">
                <div className="demo-card-header">
                  <div className="demo-icon" style={{ background: d.bg }}>
                    {d.icon}
                  </div>
                  <span
                    className="demo-badge"
                    style={{ background: d.bg, color: d.color, border: `1px solid ${d.border}` }}
                  >
                    {d.badge}
                  </span>
                </div>
                <div className="demo-title">{d.title}</div>
                <div className="demo-outcome" style={{ color: d.color }}>{d.outcome}</div>
                <div className="demo-tagline">{d.tagline}</div>
              </div>
              <div className="demo-card-footer">
                <div className="live-dot-wrap">
                  <div className="live-dot" />
                  Live Demo
                </div>
                <a href={d.href} className="view-btn" style={{ background: d.color }}>
                  View Demo →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="cta-section">
          <div className="cta-label">Ready to build yours?</div>
          <div className="cta-heading">Want a System Like This for Your Business?</div>
          <div className="cta-body">
            We build and deploy custom AI systems for small businesses in under 2 weeks.
            Book a free strategy call and we'll map out exactly what yours would look like.
          </div>
          <a
            href="https://forms.gle/fjWE9GfZfx3wPGRj8"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            Book a Free Strategy Call
          </a>
          <div className="cta-sub">No pressure · 30 minutes · Specific to your business</div>
        </div>
      </div>

      <footer>
        Built by <strong>The AI Business Professionals</strong> · <a href="/">theaibizpros.com</a>
      </footer>
    </>
  );
}
