import { useState, useEffect, useRef } from 'react';

export default function DemoShell({ config }) {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [leadVisible, setLeadVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    setMessages([]);
    setTyping(false);
    setLeadVisible(false);
    setPlaying(false);
    setDone(false);
  }, [config.id]);

  const startDemo = () => {
    setMessages([]);
    setTyping(false);
    setLeadVisible(false);
    setDone(false);
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing) return;
    let cancelled = false;
    const timers = [];
    let delay = 500;

    config.conversation.forEach((msg, i) => {
      delay += i === 0 ? 0 : msg.from === 'bot' ? 1400 : 800;
      if (msg.from === 'bot') {
        timers.push(setTimeout(() => { if (!cancelled) setTyping(true); }, delay - 800));
      }
      timers.push(setTimeout(() => {
        if (cancelled) return;
        setTyping(false);
        setMessages(prev => [...prev, msg]);
      }, delay));
    });

    timers.push(setTimeout(() => {
      if (!cancelled) { setLeadVisible(true); setDone(true); setPlaying(false); }
    }, delay + 900));

    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [playing]);

  const c = config.color || '#2563eb';

  return (
    <div className="shell">
      {/* LEFT: Chat panel */}
      <div className="panel">
        <div className="chat-head" style={{ background: `linear-gradient(135deg, ${c}ee, ${c})` }}>
          <div className="bot-av">{config.botIcon}</div>
          <div className="bot-info">
            <strong>{config.botName}</strong>
            <span>Powered by AI · Available 24/7</span>
          </div>
          <div className="live-pill">
            <div className="pulse-dot" />
            Live
          </div>
        </div>

        <div className="msgs" ref={scrollRef}>
          {!playing && !done && (
            <div className="empty-state">
              <div className="empty-icon">{config.botIcon}</div>
              <p>Press <strong>Play Demo</strong> to watch this AI in action.</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.from}`}>
              {m.from === 'bot' && (
                <div className="msg-icon" style={{ background: c }}>AI</div>
              )}
              <div className={`bubble ${m.from === 'bot' ? 'bot-bubble' : 'user-bubble'}`}
                style={m.from === 'user' ? { background: c } : {}}>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="msg bot">
              <div className="msg-icon" style={{ background: c }}>AI</div>
              <div className="bubble bot-bubble typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        <div className="input-bar">
          <div className="fake-input">Type a message...</div>
          <div className="send-btn" style={{ background: c }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </div>
        </div>

        <div className="play-wrap">
          <button
            className="play-btn"
            onClick={startDemo}
            disabled={playing && !done}
            style={{ background: playing && !done ? '#94a3b8' : c }}
          >
            {!playing && !done ? '▶  Play Demo' : playing && !done ? '⏸  Playing...' : '↺  Replay'}
          </button>
        </div>
      </div>

      {/* RIGHT: Lead card + analytics + CTA */}
      <div className="right-col">
        <div className={`lead-card ${leadVisible ? 'show' : 'dim'}`}>
          <div className="lead-head">
            <span>📋 {config.leadTitle}</span>
            {leadVisible && <span className="live-badge">LIVE</span>}
          </div>
          <div className="lead-body">
            {config.leadFields.map((f, i) => (
              <div key={i}>
                {i > 0 && <div className="divider" />}
                <div className="lead-row">
                  <span className="lead-lbl">{f.label}</span>
                  <span className="lead-val" style={
                    f.highlight === 'red'   ? { background: '#fef2f2', color: '#dc2626', padding: '2px 8px', borderRadius: 4, fontWeight: 700, fontSize: 12 } :
                    f.highlight === 'green' ? { color: '#16a34a', fontWeight: 600 } :
                    f.highlight === 'blue'  ? { color: c, fontWeight: 700 } : {}
                  }>{f.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-head">Today's Performance</div>
          <div className="stats-body">
            {config.analytics.map((a, i) => (
              <div key={i} className="stat-row">
                <div className="stat-icon" style={{ background: a.color + '18' }}>{a.icon}</div>
                <div>
                  <div className="stat-val" style={{ color: a.color }}>{a.value}</div>
                  <div className="stat-lbl">{a.label}</div>
                  <div className="stat-sub">{a.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-box" style={{ background: `linear-gradient(135deg, ${c}cc, ${c})` }}>
          <h3>{config.ctaHeading}</h3>
          <p>{config.ctaBody}</p>
          <a href={config.ctaUrl} target="_blank" rel="noopener noreferrer" className="cta-btn">
            {config.ctaLabel} →
          </a>
        </div>
      </div>

      <style jsx>{`
        .shell {
          display: grid;
          grid-template-columns: 1fr 370px;
          gap: 28px;
          align-items: start;
        }
        .panel {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .chat-head {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .bot-av {
          width: 42px; height: 42px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .bot-info strong { color: white; font-size: 14px; display: block; }
        .bot-info span { color: rgba(255,255,255,0.75); font-size: 12px; }
        .live-pill {
          margin-left: auto;
          background: rgba(255,255,255,0.15);
          color: white; font-size: 11px; font-weight: 600;
          padding: 4px 10px; border-radius: 20px;
          display: flex; align-items: center; gap: 5px;
        }
        .pulse-dot {
          width: 7px; height: 7px;
          background: #4ade80; border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; } 50% { opacity: 0.4; }
        }
        .msgs {
          height: 420px;
          overflow-y: auto;
          padding: 20px;
          display: flex; flex-direction: column; gap: 12px;
          background: #f8fafc;
          scroll-behavior: smooth;
        }
        .empty-state {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px; color: #94a3b8; text-align: center; padding: 40px;
        }
        .empty-icon { font-size: 38px; }
        .empty-state p { font-size: 14px; }
        .msg {
          display: flex; align-items: flex-end; gap: 8px;
          animation: fadeUp 0.3s ease-out;
        }
        .msg.user { flex-direction: row-reverse; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .msg-icon {
          width: 30px; height: 30px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: white; flex-shrink: 0;
        }
        .bubble {
          max-width: 75%; padding: 11px 15px;
          border-radius: 18px; font-size: 14px; line-height: 1.55;
        }
        .bot-bubble {
          background: white; color: #1e293b;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .user-bubble {
          color: white;
          border-bottom-right-radius: 4px;
        }
        .typing { display: flex; gap: 4px; align-items: center; padding: 14px 15px; }
        .typing span {
          width: 7px; height: 7px;
          background: #94a3b8; border-radius: 50%;
          animation: blink 1.2s infinite;
        }
        .typing span:nth-child(2) { animation-delay: 0.2s; }
        .typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink {
          0%,60%,100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        .input-bar {
          padding: 14px 16px; border-top: 1px solid #e2e8f0;
          display: flex; gap: 10px; background: white;
        }
        .fake-input {
          flex: 1; padding: 10px 14px;
          border: 1px solid #e2e8f0; border-radius: 24px;
          font-size: 13.5px; color: #94a3b8; background: #f8fafc;
        }
        .send-btn {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          cursor: pointer;
        }
        .play-wrap {
          padding: 14px 20px; border-top: 1px solid #f1f5f9;
          text-align: center; background: white;
        }
        .play-btn {
          color: white; border: none; padding: 11px 32px;
          border-radius: 8px; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: opacity 0.2s;
        }
        .play-btn:hover:not(:disabled) { opacity: 0.88; }
        .play-btn:disabled { cursor: default; }

        /* RIGHT COLUMN */
        .right-col { display: flex; flex-direction: column; gap: 20px; }
        .lead-card {
          background: white; border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: opacity 0.5s;
        }
        .lead-card.dim { opacity: 0.25; }
        .lead-card.show { opacity: 1; }
        .lead-head {
          background: #0f172a; padding: 14px 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .lead-head span { color: white; font-size: 14px; font-weight: 600; }
        .live-badge {
          margin-left: auto; background: #16a34a; color: white;
          font-size: 10px; font-weight: 700; padding: 3px 8px;
          border-radius: 20px; letter-spacing: 0.05em;
        }
        .lead-body { padding: 18px 20px; display: flex; flex-direction: column; gap: 11px; }
        .lead-row { display: flex; justify-content: space-between; align-items: center; }
        .lead-lbl { font-size: 12px; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
        .lead-val { font-size: 14px; color: #0f172a; font-weight: 600; text-align: right; }
        .divider { height: 1px; background: #f1f5f9; }

        .stats-card {
          background: white; border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden;
        }
        .stats-head {
          padding: 14px 20px; border-bottom: 1px solid #f1f5f9;
          font-size: 12px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.06em;
        }
        .stats-body { padding: 16px 20px; display: flex; flex-direction: column; gap: 14px; }
        .stat-row { display: flex; align-items: center; gap: 14px; }
        .stat-icon {
          width: 42px; height: 42px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .stat-val { font-size: 22px; font-weight: 800; line-height: 1; }
        .stat-lbl { font-size: 12px; color: #64748b; margin-top: 2px; }
        .stat-sub { font-size: 11px; color: #94a3b8; margin-top: 1px; }

        .cta-box { border-radius: 16px; padding: 26px 24px; text-align: center; }
        .cta-box h3 { color: white; font-size: 17px; font-weight: 700; margin-bottom: 8px; }
        .cta-box p { color: rgba(255,255,255,0.82); font-size: 13px; margin-bottom: 16px; line-height: 1.5; }
        .cta-btn {
          display: inline-block; background: white; font-size: 14px;
          font-weight: 700; padding: 11px 24px; border-radius: 8px;
          text-decoration: none; transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.15); }

        @media (max-width: 800px) {
          .shell { grid-template-columns: 1fr; }
          .msgs { height: 340px; }
        }
      `}</style>
    </div>
  );
}
