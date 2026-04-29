import { useState, useEffect } from 'react';

const chatScript = [
  { from: 'user', text: "Hi, I'm looking for help with lead follow-up. We're missing too many inquiries." },
  { from: 'bot', text: "Hi! I can help with that. On average, how many new inquiries do you get per week?" },
  { from: 'user', text: "Around 30–40 per week, mostly from our website form." },
  { from: 'bot', text: "Got it. And right now, how fast does your team typically follow up?" },
  { from: 'user', text: "Honestly, sometimes 1–2 days. We get busy." },
  { from: 'bot', text: "That's a common pain point. Our AI follow-up system responds within 60 seconds — 24/7. Based on your volume, you could recover 8–12 leads per month that would otherwise go cold. Want me to send you a quick overview?" },
  { from: 'user', text: "Yes, that would be great." },
  { from: 'bot', text: "Perfect. What's the best email to send it to? I can also book you a 15-minute call with Kimberly if you'd like to talk through your setup." },
];

export default function DemoPreview() {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  const startDemo = () => {
    setVisibleMessages([]);
    setDone(false);
    setStarted(true);
    setTyping(false);
  };

  useEffect(() => {
    if (!started) return;
    if (visibleMessages.length >= chatScript.length) {
      setTyping(false);
      setDone(true);
      return;
    }

    const next = chatScript[visibleMessages.length];
    const delay = visibleMessages.length === 0 ? 400 : next.from === 'bot' ? 1600 : 900;

    const showTyping = next.from === 'bot';

    let typingTimer;
    let messageTimer;

    if (showTyping) {
      typingTimer = setTimeout(() => setTyping(true), delay - 800);
    }

    messageTimer = setTimeout(() => {
      setTyping(false);
      setVisibleMessages(prev => [...prev, next]);
    }, delay);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(messageTimer);
    };
  }, [visibleMessages, started]);

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #f0f2f5;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .label {
          font-size: 13px;
          font-weight: 600;
          color: #673de6;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .title {
          font-size: 28px;
          font-weight: 700;
          color: #1d1e20;
          margin-bottom: 8px;
          text-align: center;
        }

        .subtitle {
          font-size: 15px;
          color: #727586;
          margin-bottom: 32px;
          text-align: center;
        }

        /* Browser mockup frame */
        .browser-frame {
          width: 480px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          overflow: hidden;
        }

        .browser-bar {
          background: #f2f3f6;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid #e0e0e0;
        }

        .browser-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }

        .browser-url {
          flex: 1;
          background: white;
          border-radius: 4px;
          padding: 4px 10px;
          font-size: 12px;
          color: #727586;
          border: 1px solid #e0e0e0;
          margin-left: 8px;
        }

        /* Chat window */
        .chat-window {
          display: flex;
          flex-direction: column;
          height: 480px;
        }

        .chat-header {
          background: linear-gradient(135deg, #673de6, #5025d1);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .chat-avatar {
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .chat-header-text strong {
          display: block;
          color: white;
          font-size: 14px;
        }

        .chat-header-text span {
          color: rgba(255,255,255,0.75);
          font-size: 12px;
        }

        .online-dot {
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          display: inline-block;
          margin-right: 4px;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #fafafa;
        }

        .message {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          animation: fadeUp 0.3s ease-out;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .message.user {
          flex-direction: row-reverse;
        }

        .message-bubble {
          max-width: 78%;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 13.5px;
          line-height: 1.5;
        }

        .message.bot .message-bubble {
          background: white;
          color: #1d1e20;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        .message.user .message-bubble {
          background: #673de6;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .bot-icon {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #673de6, #5025d1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }

        .typing-indicator {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          animation: fadeUp 0.3s ease-out;
        }

        .typing-dots {
          background: white;
          padding: 10px 14px;
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .typing-dots span {
          width: 6px;
          height: 6px;
          background: #aaa;
          border-radius: 50%;
          animation: bounce 1.2s infinite;
        }

        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }

        .chat-input-bar {
          padding: 12px 16px;
          border-top: 1px solid #f0f0f0;
          display: flex;
          gap: 8px;
          background: white;
        }

        .chat-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 20px;
          font-size: 13px;
          color: #aaa;
          outline: none;
          background: #fafafa;
        }

        .chat-send {
          width: 34px;
          height: 34px;
          background: #673de6;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }

        /* Completion badge */
        .result-badge {
          margin: 0 16px 16px;
          background: #f0fdf4;
          border: 1px solid #86efac;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 12.5px;
          color: #166534;
          font-weight: 500;
          animation: fadeUp 0.4s ease-out;
        }

        /* CTA */
        .cta-area {
          margin-top: 28px;
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .btn-start {
          background: linear-gradient(135deg, #673de6, #5025d1);
          color: white;
          border: none;
          padding: 12px 28px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-start:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(103,61,230,0.3);
        }

        .note {
          margin-top: 16px;
          font-size: 13px;
          color: #aaa;
          text-align: center;
        }
      `}</style>

      <div className="label">Demo Preview — AI Chatbot</div>
      <h1 className="title">This is what your clients see</h1>
      <p className="subtitle">A 24/7 AI chatbot that qualifies leads and books calls — running on your website.</p>

      {/* Browser mockup */}
      <div className="browser-frame">
        <div className="browser-bar">
          <div className="browser-dot" style={{ background: '#ff5f57' }} />
          <div className="browser-dot" style={{ background: '#febc2e' }} />
          <div className="browser-dot" style={{ background: '#28c840' }} />
          <div className="browser-url">yourwebsite.com</div>
        </div>

        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">🤖</div>
            <div className="chat-header-text">
              <strong>AI Biz Pros Assistant</strong>
              <span><span className="online-dot" />Online · Replies instantly</span>
            </div>
          </div>

          <div className="chat-messages" id="chat-scroll">
            {!started && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px', color: '#aaa' }}>
                <div style={{ fontSize: '32px' }}>💬</div>
                <div style={{ fontSize: '14px' }}>Press Play to watch the demo</div>
              </div>
            )}

            {visibleMessages.map((msg, i) => (
              <div key={i} className={`message ${msg.from}`}>
                {msg.from === 'bot' && <div className="bot-icon">AI</div>}
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}

            {typing && (
              <div className="typing-indicator">
                <div className="bot-icon">AI</div>
                <div className="typing-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}

            {done && (
              <div className="result-badge">
                ✓ Lead captured · Follow-up email queued · Calendar link sent automatically
              </div>
            )}
          </div>

          <div className="chat-input-bar">
            <input className="chat-input" placeholder="Type a message..." disabled />
            <button className="chat-send">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="cta-area">
        <button className="btn-start" onClick={startDemo}>
          {started && !done ? '⏸ Playing...' : done ? '↺ Replay' : '▶ Play Demo'}
        </button>
      </div>
      <p className="note">This is one demo. Each service (lead gen, email automation, forms, etc.) gets its own.</p>
    </>
  );
}
