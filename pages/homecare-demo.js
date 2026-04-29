import Head from 'next/head';
import DemoShell from '../components/DemoShell';

const config = {
  id: 'homecare',
  color: '#0d7a5f',
  botIcon: '🏠',
  botName: 'CareConnect Intake Assistant',
  leadTitle: 'Intake Qualification Summary',
  conversation: [
    { from: 'bot',  text: "Hi! I'm the CareConnect intake assistant. How can we help your family today?" },
    { from: 'user', text: "Hi, I'm looking for home care for my mother. She's 78 and needs help at home." },
    { from: 'bot',  text: "I'm so glad you reached out — we're here to help. What's your mother's name, and what city is she located in?" },
    { from: 'user', text: "Her name is Dorothy. She's in Indianapolis, Indiana." },
    { from: 'bot',  text: "Thank you. What types of support does Dorothy need? For example — bathing, dressing, meal prep, medication reminders, companionship, or transportation?" },
    { from: 'user', text: "She needs help with bathing and dressing. She also gets confused sometimes so we need someone trustworthy and patient." },
    { from: 'bot',  text: "Understood — personal care and cognitive support. When are you hoping to start services?" },
    { from: 'user', text: "As soon as possible. Our family is a bit overwhelmed right now." },
    { from: 'bot',  text: "I completely understand — we hear that a lot and we're here to make this easier. How will services be paid for? Private pay, Medicaid, VA benefits, or long-term care insurance?" },
    { from: 'user', text: "We're not sure yet. She might qualify for Medicaid but we haven't looked into it." },
    { from: 'bot',  text: "No problem at all — we can help you figure that out. What's the best phone number and email to reach you?" },
    { from: 'user', text: "My number is 317-555-0148 and my email is linda.harris@gmail.com" },
    { from: 'bot',  text: "Thank you, Linda. Dorothy sounds like a great fit for our services. I'm flagging this as urgent and a care coordinator will call you within the hour to schedule a free in-home assessment. You're in good hands. 💚" },
  ],
  leadFields: [
    { label: 'Contact',         value: 'Linda Harris' },
    { label: 'Phone / Email',   value: '317-555-0148' },
    { label: 'Care Recipient',  value: 'Dorothy, 78 — Indianapolis, IN' },
    { label: 'Services Needed', value: 'Personal Care + Cognitive Support' },
    { label: 'Start Date',      value: 'URGENT — ASAP', highlight: 'red' },
    { label: 'Payor Type',      value: 'Medicaid (Pending Verification)' },
    { label: 'Likely Fit',      value: 'HIGH MATCH ✓', highlight: 'green' },
    { label: 'Next Action',     value: 'Schedule Assessment →', highlight: 'blue' },
  ],
  analytics: [
    { icon: '📥', value: '11',   label: 'Inquiries Today',      sub: '3 flagged high urgency',       color: '#0d7a5f' },
    { icon: '📅', value: '4',    label: 'Assessments Booked',   sub: "From today's inquiries",       color: '#0891b2' },
    { icon: '📞', value: '7',    label: 'Missed Calls Saved',   sub: 'Would have gone to voicemail', color: '#d97706' },
  ],
  ctaHeading: 'Never Miss a Family in Need',
  ctaBody:    'We build and deploy AI intake systems for home care agencies in under 2 weeks.',
  ctaLabel:   'Book an AI Demo',
  ctaUrl:     'https://forms.gle/fjWE9GfZfx3wPGRj8',
};

export default function HomeCareDemoPage() {
  return (
    <>
      <Head>
        <title>AI Intake Demo for Home Care Agencies — AI Business Professionals</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f0fdf8;
          color: #1e293b;
          line-height: 1.6;
        }
        .top-banner {
          background: #0d7a5f;
          color: rgba(255,255,255,0.9);
          text-align: center;
          padding: 10px 20px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .top-banner strong { color: white; }
        .header {
          background: white;
          border-bottom: 1px solid #d1fae5;
          padding: 44px 20px 40px;
          text-align: center;
        }
        .badge {
          display: inline-block;
          background: #ecfdf5;
          color: #0d7a5f;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 20px;
          border: 1px solid #6ee7b7;
          margin-bottom: 16px;
        }
        .header h1 {
          font-size: 30px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .header p {
          font-size: 16px;
          color: #64748b;
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .trust-row {
          display: flex;
          justify-content: center;
          gap: 28px;
          margin-top: 22px;
          flex-wrap: wrap;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }
        .trust-item span { font-size: 15px; }
        .main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 20px 60px;
        }
        footer {
          background: #0f172a;
          color: #64748b;
          text-align: center;
          padding: 26px 20px;
          font-size: 13px;
        }
        footer strong { color: white; }
        footer a { color: #34d399; text-decoration: none; }
      `}</style>

      <div className="top-banner">
        <strong>Live Demo</strong> · AI Intake System for Home Care Agencies · Powered by The AI Business Professionals
      </div>

      <div className="header">
        <div className="badge">Interactive Demo</div>
        <h1>AI Intake Demo for Home Care Agencies</h1>
        <p>
          Capture private pay, Medicaid, VA, and family caregiver inquiries instantly —
          qualify leads, book assessments, and never miss a family in need.
        </p>
        <div className="trust-row">
          <div className="trust-item"><span>⏱</span> Responds in under 60 seconds</div>
          <div className="trust-item"><span>📋</span> Captures full intake details</div>
          <div className="trust-item"><span>📅</span> Books assessments automatically</div>
          <div className="trust-item"><span>🔒</span> HIPAA-conscious design</div>
        </div>
      </div>

      <div className="main">
        <DemoShell config={config} />
      </div>

      <footer>
        Built by <strong>The AI Business Professionals</strong> · <a href="/">theaibizpros.com</a>
      </footer>
    </>
  );
}
