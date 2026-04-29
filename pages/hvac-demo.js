import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

const conversation = [
  { from: 'bot',  text: "Hi! I'm the Cool Air HVAC assistant. How can I help you today?" },
  { from: 'user', text: "Hey, my AC stopped working and it's really hot in here." },
  { from: 'bot',  text: "I'm sorry to hear that! We can get that fixed fast. What's your name?" },
  { from: 'user', text: "Sarah Johnson" },
  { from: 'bot',  text: "Hi Sarah! What city are you located in?" },
  { from: 'user', text: "Phoenix, AZ" },
  { from: 'bot',  text: "Got it. Can you describe the issue? For example - not cooling, making noise, or not turning on at all?" },
  { from: 'user', text: "It's running but blowing hot air. It's 104 degrees outside." },
  { from: 'bot',  text: "Understood - that sounds like a refrigerant or compressor issue. How urgent is this for you?" },
  { from: 'user', text: "Pretty urgent, I have two kids at home." },
  { from: 'bot',  text: "Marking this as high priority. Our next available slot is today between 2–5 PM. Does that work?" },
  { from: 'user', text: "Yes, that works perfectly!" },
  { from: 'bot',  text: "Great! I've sent your appointment request to our dispatch team. A technician will call you within 20 minutes to confirm. You'll also get a text with their name and photo. Is there anything else you need?" },
  { from: 'user', text: "No that's everything, thank you!" },
  { from: 'bot',  text: "You're welcome Sarah! Stay cool - help is on the way. 🏠❄️" },
];

const analytics = [
  { label: 'Leads Captured Today', value: '14', sub: '+3 from after hours', color: '#2563eb' },
  { label: 'Missed Calls Saved', value: '9',  sub: 'Would have gone to voicemail', color: '#16a34a' },
  { label: 'Revenue Opportunity', value: '$5,600', sub: 'Based on avg ticket $400', color: '#9333ea' },
];

export default function HvacDemo() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [leadVisible, setLeadVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [workflowSteps, setWorkflowSteps] = useState([]);
  const scrollRef = useRef(null);
  const workflowChatRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    if (!showWorkflow) return;
    const steps = [
      { delay: 500, type: 'system', text: 'Incoming call from 480-555-0287' },
      { delay: 2500, type: 'ai', text: "Hi! I'm the Cool Air HVAC assistant. How can I help?" },
      { delay: 4500, type: 'cx', text: 'AC stopped working, it\'s over 100 degrees' },
      { delay: 6500, type: 'ai', text: 'I\'m sorry to hear that! We can fix that fast. What\'s your name?' },
      { delay: 8500, type: 'cx', text: 'Jennifer Walsh' },
      { delay: 10500, type: 'ai', text: 'Jennifer, what city are you in?' },
      { delay: 12500, type: 'cx', text: 'Scottsdale, Arizona' },
      { delay: 14500, type: 'ai', text: 'Got it. Marking as high priority. Tech available today 2–5 PM?' },
      { delay: 16500, type: 'cx', text: 'Perfect, yes' },
      { delay: 18500, type: 'ai', text: 'Confirmed! Tech will call in 20 min with their name & photo. Stay cool ✓' },
      { delay: 19500, type: 'complete', text: 'Lead Captured & Appointment Booked' },
    ];
    setWorkflowSteps([]);
    steps.forEach(s => {
      const timer = setTimeout(() => {
        setWorkflowSteps(prev => [...prev, s]);
        if (workflowChatRef.current && (s.type === 'ai' || s.type === 'cx' || s.type === 'system')) {
          workflowChatRef.current.scrollTop = workflowChatRef.current.scrollHeight;
        }
      }, s.delay);
      return () => clearTimeout(timer);
    });
    const closeTimer = setTimeout(() => setShowWorkflow(false), 20000);
    return () => clearTimeout(closeTimer);
  }, [showWorkflow]);

  const startDemo = () => {
    if (started) {
      setMessages([]);
      setLeadVisible(false);
      setStarted(false);
      setTimeout(() => setStarted(true), 100);
    } else {
      setStarted(true);
    }
  };

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    const timers = [];

    const run = async () => {
      let delay = 600;
      for (let i = 0; i < conversation.length; i++) {
        const msg = conversation[i];
        const wait = i === 0 ? delay : msg.from === 'bot' ? 1800 : 1000;
        delay += wait;

        if (msg.from === 'bot') {
          timers.push(setTimeout(() => { if (!cancelled) setTyping(true); }, delay - 1000));
        }

        timers.push(setTimeout(() => {
          if (cancelled) return;
          setTyping(false);
          setMessages(prev => [...prev, msg]);
        }, delay));
      }

      timers.push(setTimeout(() => {
        if (!cancelled) setLeadVisible(true);
      }, delay + 600));
    };

    run();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [started]);

  return (
    <>
      <Head>
        <title>HVAC AI Chatbot Demo - AI Business Professionals</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f1f5f9;
          color: #1e293b;
          line-height: 1.6;
        }

        /* TOP BANNER */
        .top-banner {
          background: #2563eb;
          color: white;
          text-align: center;
          padding: 10px 20px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.03em;
        }

        /* HEADER */
        .header {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 28px 20px 24px;
          text-align: center;
        }
        .demo-badge {
          display: inline-block;
          background: #eff6ff;
          color: #2563eb;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 20px;
          border: 1px solid #bfdbfe;
          margin-bottom: 14px;
        }
        .header h1 {
          font-size: 30px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 10px;
          line-height: 1.2;
        }
        .header p {
          font-size: 16px;
          color: #64748b;
          max-width: 580px;
          margin: 0 auto;
        }

        /* MAIN LAYOUT */
        .main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 36px 20px;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 28px;
          align-items: start;
        }

        /* CHAT PANEL */
        .chat-panel {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .chat-top-bar {
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .bot-avatar {
          width: 42px; height: 42px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .bot-info strong { color: white; font-size: 15px; display: block; }
        .bot-info span { color: rgba(255,255,255,0.75); font-size: 12px; }
        .online-pill {
          margin-left: auto;
          background: rgba(255,255,255,0.15);
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          display: flex; align-items: center; gap: 5px;
        }
        .pulse {
          width: 7px; height: 7px;
          background: #4ade80; border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; } 50% { opacity: 0.4; }
        }

        .chat-messages {
          height: 420px;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f8fafc;
        }
        .chat-empty {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px; color: #94a3b8; padding: 40px;
          text-align: center;
        }
        .chat-empty .big-icon { font-size: 40px; }

        .msg { display: flex; align-items: flex-end; gap: 8px; animation: fadeUp 0.3s ease-out; }
        .msg.user { flex-direction: row-reverse; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .msg-icon {
          width: 30px; height: 30px;
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: white;
          flex-shrink: 0;
        }
        .bubble {
          max-width: 75%; padding: 11px 15px;
          border-radius: 18px; font-size: 14px; line-height: 1.55;
        }
        .msg.bot .bubble {
          background: white; color: #1e293b;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .msg.user .bubble {
          background: #2563eb; color: white;
          border-bottom-right-radius: 4px;
        }
        .typing-wrap { display: flex; align-items: flex-end; gap: 8px; animation: fadeUp 0.3s ease-out; }
        .typing-bubble {
          background: white; padding: 12px 16px;
          border-radius: 18px; border-bottom-left-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          display: flex; gap: 4px; align-items: center;
        }
        .dot {
          width: 7px; height: 7px;
          background: #94a3b8; border-radius: 50%;
          animation: blink 1.2s infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink {
          0%,60%,100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        .chat-input-row {
          padding: 14px 16px;
          border-top: 1px solid #e2e8f0;
          display: flex; gap: 10px; background: white;
        }
        .fake-input {
          flex: 1; padding: 10px 14px;
          border: 1px solid #e2e8f0; border-radius: 24px;
          font-size: 13.5px; color: #94a3b8; background: #f8fafc;
        }
        .send-btn {
          width: 38px; height: 38px;
          background: #2563eb; border: none; border-radius: 50%;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background 0.2s;
        }
        .send-btn:hover { background: #1d4ed8; }

        /* RIGHT COLUMN */
        .right-col { display: flex; flex-direction: column; gap: 20px; }

        /* LEAD CARD */
        .lead-card {
          background: white; border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: opacity 0.5s, transform 0.5s;
        }
        .lead-card.hidden { opacity: 0.25; }
        .lead-card.visible { opacity: 1; }
        .lead-card-header {
          background: #0f172a; padding: 14px 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .lead-card-header span { color: white; font-size: 14px; font-weight: 600; }
        .live-badge {
          margin-left: auto;
          background: #16a34a; color: white;
          font-size: 10px; font-weight: 700;
          padding: 3px 8px; border-radius: 20px;
          letter-spacing: 0.05em;
        }
        .lead-rows { padding: 18px 20px; display: flex; flex-direction: column; gap: 12px; }
        .lead-row { display: flex; justify-content: space-between; align-items: center; }
        .lead-label { font-size: 12px; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
        .lead-value { font-size: 14px; color: #0f172a; font-weight: 600; text-align: right; }
        .urgent-tag {
          background: #fef2f2; color: #dc2626;
          font-size: 12px; font-weight: 700;
          padding: 3px 8px; border-radius: 4px;
        }
        .divider { height: 1px; background: #f1f5f9; }

        /* ANALYTICS */
        .analytics-card {
          background: white; border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .analytics-header { padding: 14px 20px; border-bottom: 1px solid #f1f5f9; }
        .analytics-header span { font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.06em; }
        .analytics-grid { padding: 16px 20px; display: flex; flex-direction: column; gap: 14px; }
        .stat-row { display: flex; align-items: center; gap: 14px; }
        .stat-icon {
          width: 42px; height: 42px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .stat-value { font-size: 22px; font-weight: 800; line-height: 1; }
        .stat-label { font-size: 12px; color: #64748b; margin-top: 2px; }

        /* CTA */
        .cta-section {
          background: linear-gradient(135deg, #1e40af, #2563eb);
          border-radius: 16px; padding: 28px 24px; text-align: center;
          box-shadow: 0 4px 24px rgba(37,99,235,0.25);
        }
        .cta-section h3 { color: white; font-size: 18px; font-weight: 700; margin-bottom: 8px; }
        .cta-section p { color: rgba(255,255,255,0.8); font-size: 13.5px; margin-bottom: 18px; line-height: 1.5; }
        .cta-btn {
          display: inline-block; background: white; color: #2563eb;
          font-size: 14px; font-weight: 700; padding: 12px 26px;
          border-radius: 8px; border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s; text-decoration: none;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.15); }

        /* PLAY BTN */
        .play-wrap { text-align: center; padding: 16px 20px; border-top: 1px solid #f1f5f9; background: white; }
        .play-btn {
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          color: white; border: none; padding: 11px 28px;
          border-radius: 8px; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
        }
        .play-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(37,99,235,0.3); }
        .play-btn:disabled { opacity: 0.6; cursor: default; transform: none; }

        /* FOOTER */
        footer {
          background: #0f172a; color: #94a3b8;
          text-align: center; padding: 24px 20px;
          font-size: 13px; margin-top: 0;
        }
        footer strong { color: white; }

        /* RESPONSIVE */
        @media (max-width: 780px) {
          .main { grid-template-columns: 1fr; }
          .header h1 { font-size: 22px; }
          .chat-messages { height: 340px; }
        }
        .workflow-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .workflow-container { background: white; border-radius: 16px; width: 100%; max-width: 900px; height: 500px; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .workflow-left { border-right: 1px solid #e2e8f0; padding: 24px; display: flex; flex-direction: column; background: #f8fafc; }
        .workflow-left-title { font-size: 14px; font-weight: 700; color: #64748b; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em; }
        .workflow-chat { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
        .workflow-msg { padding: 12px 14px; border-radius: 10px; font-size: 13px; line-height: 1.5; animation: msgSlide 0.3s ease-out; }
        @keyframes msgSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .workflow-msg.system { background: #f1f5f9; color: #64748b; text-align: center; font-weight: 600; }
        .workflow-msg.ai { background: #e0f2fe; color: #0369a1; }
        .workflow-msg.cx { background: #dcfce7; color: #15803d; }
        .workflow-right { padding: 24px; display: flex; flex-direction: column; background: white; justify-content: center; align-items: center; text-align: center; }
        .workflow-complete { color: #22c55e; font-size: 18px; font-weight: 700; animation: msgSlide 0.5s ease-out; }
        @media (max-width: 768px) { .workflow-container { grid-template-columns: 1fr; height: auto; max-height: 80vh; } .workflow-left { border-right: none; border-bottom: 1px solid #e2e8f0; } }
      `}</style>

      <div className="top-banner">
        Live Demo · AI Customer Service Chatbot · Built for HVAC Businesses
      </div>

      <div className="header">
        <div className="demo-badge">Interactive Demo</div>
        <h1>AI Chatbot Demo for HVAC Businesses</h1>
        <p>
          This bot answers questions 24/7, captures lead details, and books appointments - so you never miss a call again.
        </p>
      </div>

      {/* Above Demo CTA */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', textAlign: 'center', marginTop: '20px' }}>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#2563eb', marginBottom: '6px' }}>See AI in Action</div>
        <div style={{ fontSize: '14px', color: '#1e40af', marginBottom: '16px' }}>Watch the bot answer customer questions, qualify leads, and book appointments-all in real time.</div>
        <button
          onClick={() => setShowWorkflow(true)}
          style={{ background: '#2563eb', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.background = '#2563eb'}
        >
          ▶ Start Live Workflow Demo
        </button>
      </div>

      {/* Revenue Impact Card */}
      <div style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f3f8ff 100%)', border: '2px solid #2563eb', borderRadius: '12px', padding: '24px', marginBottom: '24px', textAlign: 'center', marginTop: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>💰 Revenue Impact (Monthly)</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb', marginBottom: '4px' }}>180+</div>
            <div style={{ fontSize: '12px', color: '#1e40af' }}>Inbound Leads</div>
          </div>
          <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb', marginBottom: '4px' }}>65</div>
            <div style={{ fontSize: '12px', color: '#1e40af' }}>Bookings Captured</div>
          </div>
          <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb', marginBottom: '4px' }}>$24,700</div>
            <div style={{ fontSize: '12px', color: '#1e40af' }}>Revenue Generated</div>
          </div>
        </div>
      </div>

      {showWorkflow && (
        <div className="workflow-overlay" onClick={() => setShowWorkflow(false)}>
          <div className="workflow-container" onClick={(e) => e.stopPropagation()}>
            <div className="workflow-left">
              <div className="workflow-left-title">📱 Customer Call</div>
              <div className="workflow-chat" ref={workflowChatRef}>
                {workflowSteps.map((step, i) => (
                  step.type === 'system' ? <div key={i} className="workflow-msg system">{step.text}</div> : step.type === 'ai' ? <div key={i} className="workflow-msg ai">🤖 {step.text}</div> : step.type === 'cx' ? <div key={i} className="workflow-msg cx">👤 {step.text}</div> : null
                ))}
              </div>
            </div>
            <div className="workflow-right">
              {workflowSteps.find(s => s.type === 'complete') && <div className="workflow-complete">✓ {workflowSteps.find(s => s.type === 'complete')?.text}</div>}
            </div>
          </div>
        </div>
      )}

      <div className="main">
        {/* LEFT - Chat */}
        <div>
          <div className="chat-panel">
            <div className="chat-top-bar">
              <div className="bot-avatar">❄️</div>
              <div className="bot-info">
                <strong>Cool Air HVAC Assistant</strong>
                <span>Powered by AI · Available 24/7</span>
              </div>
              <div className="online-pill">
                <div className="pulse" />
                Live
              </div>
            </div>

            <div className="chat-messages" id="chat-box" ref={scrollRef}>
              {!started && (
                <div className="chat-empty">
                  <div className="big-icon">❄️</div>
                  <p>Press <strong>Play Demo</strong> below to watch a real customer interaction.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.from}`}>
                  {m.from === 'bot' && <div className="msg-icon">AI</div>}
                  <div className="bubble">{m.text}</div>
                </div>
              ))}
              {typing && (
                <div className="typing-wrap">
                  <div className="msg-icon">AI</div>
                  <div className="typing-bubble">
                    <div className="dot" /><div className="dot" /><div className="dot" />
                  </div>
                </div>
              )}
            </div>

            <div className="play-wrap">
              <button
                className="play-btn"
                onClick={startDemo}
                disabled={started && !leadVisible}
              >
                {!started ? '▶ Play Demo' : !leadVisible ? '⏸ Playing...' : '↺ Replay'}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT - Lead Card + Analytics + CTA */}
        <div className="right-col">
          <div className={`lead-card ${leadVisible ? 'visible' : 'hidden'}`}>
            <div className="lead-card-header">
              <span>📋 Lead Captured</span>
              {leadVisible && <div className="live-badge">LIVE</div>}
            </div>
            <div className="lead-rows">
              <div className="lead-row">
                <span className="lead-label">Name</span>
                <span className="lead-value">Sarah Johnson</span>
              </div>
              <div className="divider" />
              <div className="lead-row">
                <span className="lead-label">Location</span>
                <span className="lead-value">Phoenix, AZ</span>
              </div>
              <div className="divider" />
              <div className="lead-row">
                <span className="lead-label">Service Needed</span>
                <span className="lead-value">AC Repair – No Cool Air</span>
              </div>
              <div className="divider" />
              <div className="lead-row">
                <span className="lead-label">Urgency</span>
                <span className="urgent-tag">HIGH PRIORITY</span>
              </div>
              <div className="divider" />
              <div className="lead-row">
                <span className="lead-label">Appointment</span>
                <span className="lead-value">Today, 2–5 PM</span>
              </div>
              <div className="divider" />
              <div className="lead-row">
                <span className="lead-label">Status</span>
                <span className="lead-value" style={{ color: '#16a34a' }}>Dispatched ✓</span>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <div className="analytics-header">
              <span>Today's Performance</span>
            </div>
            <div className="analytics-grid">
              {analytics.map((a, i) => (
                <div key={i} className="stat-row">
                  <div className="stat-icon" style={{ background: a.color + '18' }}>
                    {i === 0 ? '📥' : i === 1 ? '📞' : '💰'}
                  </div>
                  <div>
                    <div className="stat-value" style={{ color: a.color }}>{a.value}</div>
                    <div className="stat-label">{a.label}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{a.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cta-section">
            <h3>Ready to Automate Your Lead Capture?</h3>
            <p>This demo shows what's possible. Get a customized AI chatbot built for your HVAC business in 2 weeks.</p>
            <a href="https://calendly.com/kimmycombs" target="_blank" rel="noopener noreferrer" className="cta-btn">
              📅 Book a Free Strategy Call →
            </a>
          </div>
        </div>
      </div>

      <footer>
        Built by <strong>The AI Business Professionals</strong> · theaibizpros.com
      </footer>
    </>
  );
}
