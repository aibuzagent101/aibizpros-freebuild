import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

// ── MOCK DATA ────────────────────────────────────────────────────────────────

const initialCalls = [
  { id: 1, name: 'Mike Torres',    phone: '602-555-0134', time: '2 min ago',  service: 'AC Repair',        city: 'Phoenix, AZ',    status: 'booked',      hot: false },
  { id: 2, name: 'Jennifer Walsh', phone: '480-555-0287', time: '9 min ago',  service: 'Furnace Issue',    city: 'Scottsdale, AZ', status: 'responded',   hot: false },
  { id: 3, name: 'Robert Kim',     phone: '623-555-0391', time: '15 min ago', service: 'Free Estimate',    city: 'Glendale, AZ',   status: 'booked',      hot: false },
  { id: 4, name: 'Amanda Cruz',    phone: '602-555-0156', time: '32 min ago', service: 'Emergency AC',     city: 'Phoenix, AZ',    status: 'booked',      hot: true  },
  { id: 5, name: 'David Peterson', phone: '480-555-0448', time: '51 min ago', service: 'Tune-Up',          city: 'Tempe, AZ',      status: 'completed',   hot: false },
];

const convos = {
  1: [
    { from: 'ai',  text: "Hi Mike! Sorry we missed your call. Need AC repair, heating service, or a free estimate? Reply and we'll get you scheduled fast! 🔧", time: '2:14 PM' },
    { from: 'cx',  text: "Yeah AC isn't working. It's 105 degrees here", time: '2:16 PM' },
    { from: 'ai',  text: "We're on it! Is this an emergency or can it wait until tomorrow? What's your address?", time: '2:16 PM' },
    { from: 'cx',  text: "Emergency! 4521 Desert Rose Lane Phoenix", time: '2:17 PM' },
    { from: 'ai',  text: "Got it - HIGH PRIORITY. Next available tech is today at 3 PM or 5 PM. Which works?", time: '2:17 PM' },
    { from: 'cx',  text: "3pm works great", time: '2:18 PM' },
    { from: 'ai',  text: "You're booked for 3 PM today! Your tech will call 30 min before. See you soon ✅", time: '2:18 PM' },
  ],
  2: [
    { from: 'ai',  text: "Hi Jennifer! Sorry we missed your call. Need AC repair, heating service, or a free estimate?", time: '1:52 PM' },
    { from: 'cx',  text: "My furnace keeps shutting off. Really worried about tonight", time: '1:55 PM' },
    { from: 'ai',  text: "We'll get that sorted! Is it not starting at all or shutting off mid-cycle? What's your address?", time: '1:55 PM' },
    { from: 'cx',  text: "Shuts off mid-cycle. 892 Camelback Rd Scottsdale", time: '1:57 PM' },
    { from: 'ai',  text: "Thanks Jennifer - sending this to our heating team now. Are you available this evening?", time: '1:57 PM' },
  ],
  3: [
    { from: 'ai',  text: "Hi Robert! Sorry we missed your call. Need AC repair, heating, or a free estimate?", time: '1:46 PM' },
    { from: 'cx',  text: "Estimate on a new AC unit for my 1800 sq ft home", time: '1:49 PM' },
    { from: 'ai',  text: "Happy to help! What's your address and when works for a free estimate?", time: '1:49 PM' },
    { from: 'cx',  text: "Monday morning - 4210 Oak Street Glendale", time: '1:52 PM' },
    { from: 'ai',  text: "Monday confirmed! Our estimator arrives 9–11 AM. See you then 📋", time: '1:52 PM' },
  ],
  4: [
    { from: 'ai',  text: "Hi Amanda! Sorry we missed your call. Need AC repair, heating service, or an estimate?", time: '1:29 PM' },
    { from: 'cx',  text: "AC completely stopped. Baby at home it's way too hot", time: '1:30 PM' },
    { from: 'ai',  text: "Flagging as EMERGENCY 🚨 What's your address? We'll get someone there today.", time: '1:30 PM' },
    { from: 'cx',  text: "3847 Sunridge Ave Phoenix 85032", time: '1:31 PM' },
    { from: 'ai',  text: "Help is on the way - tech arriving between 4–6 PM today. Confirmed ✅", time: '1:31 PM' },
  ],
  5: [
    { from: 'ai',  text: "Hi David! Sorry we missed your call. Need AC repair, heating service, or an estimate?", time: '10:09 AM' },
    { from: 'cx',  text: "Just need my annual tune-up done", time: '10:12 AM' },
    { from: 'ai',  text: "Great! We have Wednesday at 10 AM or Thursday at 2 PM available. Which works?", time: '10:12 AM' },
    { from: 'cx',  text: "Wednesday 10am is fine", time: '10:14 AM' },
    { from: 'ai',  text: "Booked! Wednesday 10 AM tune-up. Tech will confirm the night before. Thanks David 👍", time: '10:14 AM' },
  ],
};

const quals = {
  1: { issue: 'AC Not Working',       urgency: 'EMERGENCY', address: '4521 Desert Rose Ln, Phoenix', appt: '3:00 PM Today',     type: 'New Customer',      outcome: 'booked' },
  2: { issue: 'Furnace Mid-Cycle Fail', urgency: 'URGENT',  address: '892 Camelback Rd, Scottsdale', appt: 'Pending',           type: 'Returning',         outcome: 'pending' },
  3: { issue: 'New AC Unit Estimate',  urgency: 'STANDARD', address: '4210 Oak St, Glendale',         appt: 'Monday 9–11 AM',    type: 'New Customer',      outcome: 'booked' },
  4: { issue: 'AC Complete Failure',   urgency: 'EMERGENCY', address: '3847 Sunridge Ave, Phoenix',   appt: '4–6 PM Today',      type: 'New Customer',      outcome: 'booked' },
  5: { issue: 'Annual Tune-Up',        urgency: 'STANDARD', address: 'Tempe, AZ',                     appt: 'Wednesday 10 AM',   type: 'Returning',         outcome: 'booked' },
};

const pipeline = [
  { stage: 'Missed Call', color: '#64748b', bg: '#f8fafc', items: [
    { name: 'Lisa Adams',    service: 'AC Repair',   time: '5 min ago' },
    { name: 'Tom Reed',      service: 'Heating',     time: '11 min ago' },
  ]},
  { stage: 'AI Responded', color: '#f97316', bg: '#fff7ed', items: [
    { name: 'Jennifer W.',   service: 'Furnace',     time: '9 min ago' },
    { name: 'Carlos M.',     service: 'Estimate',    time: '24 min ago' },
  ]},
  { stage: 'Qualified', color: '#8b5cf6', bg: '#faf5ff', items: [
    { name: 'Robert Kim',    service: 'Estimate',    time: '15 min ago' },
    { name: 'Sarah L.',      service: 'Tune-Up',     time: '40 min ago' },
  ]},
  { stage: 'Booked ✓', color: '#22c55e', bg: '#f0fdf4', items: [
    { name: 'Mike Torres',   service: 'AC Repair',   time: '3 PM Today' },
    { name: 'Amanda Cruz',   service: 'Emergency',   time: '4 PM Today' },
    { name: 'Mark Evans',    service: 'Furnace',     time: 'Mon 10 AM' },
  ]},
  { stage: 'Completed', color: '#0ea5e9', bg: '#f0f9ff', items: [
    { name: 'D. Peterson',   service: 'Tune-Up',     time: '11:30 AM' },
    { name: 'P. Williams',   service: 'AC Repair',   time: '9:15 AM' },
    { name: 'K. Johnson',    service: 'Filter Chg',  time: '8:00 AM' },
  ]},
];

const todayBookings = [
  { time: '3:00 PM', name: 'Mike Torres',  service: 'AC Repair',     city: 'Phoenix',    tech: 'Jake M.',  confirmed: true },
  { time: '4:00 PM', name: 'Amanda Cruz',  service: 'Emergency AC',  city: 'Phoenix',    tech: 'Ray S.',   confirmed: true },
  { time: '6:30 PM', name: 'Lisa Adams',   service: 'Tune-Up',       city: 'Tempe',      tech: 'Jake M.',  confirmed: false },
];

const tmrBookings = [
  { time: '9:00 AM',  name: 'Robert Kim',   service: 'AC Estimate',    city: 'Glendale',   tech: 'Chris T.', confirmed: true },
  { time: '10:00 AM', name: 'Mark Evans',   service: 'Furnace Repair', city: 'Scottsdale', tech: 'Ray S.',   confirmed: true },
  { time: '2:00 PM',  name: 'Tom Reed',     service: 'Heating Svc',    city: 'Glendale',   tech: 'Jake M.',  confirmed: false },
];

const initNotifs = [
  { id: 1, dot: '#ef4444', text: 'New missed call - Mike Torres | AC Repair | Phoenix',          time: '2 min ago'  },
  { id: 2, dot: '#22c55e', text: 'Appointment booked - Mike Torres confirmed for 3 PM today',    time: '4 min ago'  },
  { id: 3, dot: '#f97316', text: 'Hot lead - Amanda Cruz | Emergency AC | Replied in 18 sec',   time: '8 min ago'  },
  { id: 4, dot: '#22c55e', text: 'Appointment booked - Robert Kim confirmed for Monday 9 AM',    time: '15 min ago' },
  { id: 5, dot: '#8b5cf6', text: 'AI responded to Jennifer Walsh in 31 seconds',                 time: '22 min ago' },
];

const newCallQueue = [
  { id: 6, name: 'Chris Hoffman',   phone: '602-555-0512', time: 'Just now', service: 'AC Not Cooling',  city: 'Phoenix, AZ', status: 'new', hot: false },
  { id: 7, name: 'Maria Gutierrez', phone: '480-555-0634', time: 'Just now', service: 'Emergency Repair', city: 'Mesa, AZ',   status: 'new', hot: true  },
];

const newNotifQueue = [
  { id: 6, dot: '#ef4444', text: 'New missed call - Chris Hoffman | AC Not Cooling | Phoenix', time: 'Just now' },
  { id: 7, dot: '#f97316', text: 'Hot lead - Maria Gutierrez | Emergency Repair | Mesa',       time: 'Just now' },
];

// ── COMPONENT ────────────────────────────────────────────────────────────────

export default function ServiceFlow() {
  const [calls, setCalls]           = useState(initialCalls);
  const [selected, setSelected]     = useState(1);
  const [notifs, setNotifs]         = useState(initNotifs);
  const [kpi, setKpi]               = useState({ recovered: 0, booked: 0, revenue: 0, respTime: 0 });
  const [newCallIdx, setNewCallIdx] = useState(0);
  const [newNotifIdx, setNewNotifIdx] = useState(0);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [workflowSteps, setWorkflowSteps] = useState([]);
  const [workflowKpi, setWorkflowKpi] = useState({ recovered: 14, booked: 6, revenue: 4200, respTime: 47 });
  const chatRef = useRef(null);
  const workflowChatRef = useRef(null);

  // KPI count-up
  useEffect(() => {
    const targets = { recovered: 14, booked: 6, revenue: 4200, respTime: 47 };
    const steps = 40;
    let i = 0;
    const t = setInterval(() => {
      i++;
      const p = i / steps;
      setKpi({
        recovered: Math.round(targets.recovered * p),
        booked:    Math.round(targets.booked * p),
        revenue:   Math.round(targets.revenue * p),
        respTime:  Math.round(targets.respTime * p),
      });
      if (i >= steps) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, []);

  // Trickle new calls
  useEffect(() => {
    if (newCallIdx >= newCallQueue.length) return;
    const t = setTimeout(() => {
      setCalls(prev => [newCallQueue[newCallIdx], ...prev]);
      setNewCallIdx(i => i + 1);
    }, 9000 + newCallIdx * 8000);
    return () => clearTimeout(t);
  }, [newCallIdx]);

  // Trickle new notifications
  useEffect(() => {
    if (newNotifIdx >= newNotifQueue.length) return;
    const t = setTimeout(() => {
      setNotifs(prev => [newNotifQueue[newNotifIdx], ...prev.slice(0, 7)]);
      setNewNotifIdx(i => i + 1);
    }, 11000 + newNotifIdx * 8000);
    return () => clearTimeout(t);
  }, [newNotifIdx]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [selected]);

  // Workflow animation
  useEffect(() => {
    if (!showWorkflow) return;
    const steps = [
      { delay: 500, side: 'left', type: 'system', text: 'Incoming call from 602-555-0198' },
      { delay: 2500, side: 'left', type: 'ai', text: 'Hi! We missed your call. How can we help?' },
      { delay: 4500, side: 'left', type: 'cx', text: 'AC not cooling' },
      { delay: 6500, side: 'left', type: 'ai', text: 'What time works best for a tech visit?' },
      { delay: 8500, side: 'left', type: 'cx', text: '3 PM today' },
      { delay: 10500, side: 'left', type: 'ai', text: 'Perfect! Booking your 3 PM appointment ✓' },
      { delay: 11000, side: 'right', type: 'metric', key: 'booked', value: 7 },
      { delay: 11200, side: 'right', type: 'appointment', name: 'New Customer', time: '3 PM', service: 'AC Not Cooling' },
      { delay: 12500, side: 'center', type: 'complete', text: 'Automation Complete' },
    ];
    setWorkflowSteps([]);
    steps.forEach(s => {
      const timer = setTimeout(() => {
        setWorkflowSteps(prev => [...prev, s]);
        if (s.type === 'metric') setWorkflowKpi(prev => ({ ...prev, [s.key]: s.value }));
        if (workflowChatRef.current && (s.type === 'ai' || s.type === 'cx' || s.type === 'system')) {
          workflowChatRef.current.scrollTop = workflowChatRef.current.scrollHeight;
        }
      }, s.delay);
      return () => clearTimeout(timer);
    });
    const closeTimer = setTimeout(() => setShowWorkflow(false), 13000);
    return () => clearTimeout(closeTimer);
  }, [showWorkflow]);

  const convo = convos[selected] || [];
  const qual  = quals[selected];

  const statusColor = { new: '#f97316', responded: '#8b5cf6', qualified: '#0ea5e9', booked: '#22c55e', completed: '#64748b' };
  const statusLabel = { new: 'New', responded: 'Responded', qualified: 'Qualified', booked: 'Booked', completed: 'Done' };
  const urgencyColor = { EMERGENCY: '#ef4444', URGENT: '#f97316', STANDARD: '#22c55e' };

  return (
    <>
      <Head>
        <title>ServiceFlow AI - Cool Air HVAC</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 14px; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f1f5f9;
          color: #1e293b;
          min-height: 100vh;
        }

        /* ── HEADER ── */
        .sf-header {
          background: #0f172a;
          padding: 0 24px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 1px 0 rgba(255,255,255,0.05);
        }
        .sf-logo {
          display: flex; align-items: center; gap: 10px;
        }
        .sf-logo-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }
        .sf-logo-text { font-size: 15px; font-weight: 700; color: white; }
        .sf-logo-text span { color: #f97316; }
        .sf-client {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 5px 12px;
          color: rgba(255,255,255,0.8);
          font-size: 13px;
          font-weight: 500;
        }
        .sf-header-right { display: flex; align-items: center; gap: 12px; }
        .live-badge {
          display: flex; align-items: center; gap: 5px;
          background: #052e16;
          border: 1px solid #16a34a;
          color: #4ade80;
          font-size: 11px; font-weight: 700;
          padding: 4px 10px; border-radius: 20px;
          letter-spacing: 0.05em;
        }
        .live-dot {
          width: 6px; height: 6px;
          background: #4ade80; border-radius: 50%;
          animation: livePulse 2s infinite;
        }
        @keyframes livePulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        .user-chip {
          width: 32px; height: 32px;
          background: #f97316; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: white;
        }

        /* ── LAYOUT ── */
        .sf-body { padding: 20px; max-width: 1440px; margin: 0 auto; }

        /* ── KPI CARDS ── */
        .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px; }
        .kpi-card {
          background: white; border-radius: 12px;
          padding: 18px 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          display: flex; align-items: center; gap: 14px;
          border-left: 3px solid transparent;
        }
        .kpi-icon {
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .kpi-value { font-size: 26px; font-weight: 800; line-height: 1; }
        .kpi-label { font-size: 12px; color: #64748b; margin-top: 3px; }
        .kpi-sub   { font-size: 11px; color: #94a3b8; margin-top: 2px; }

        /* ── MAIN GRID ── */
        .main-grid { display: grid; grid-template-columns: 340px 1fr; gap: 16px; margin-bottom: 16px; }

        /* ── CALLS FEED ── */
        .panel { background: white; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); overflow: hidden; }
        .panel-header {
          padding: 14px 16px; border-bottom: 1px solid #f1f5f9;
          display: flex; align-items: center; justify-content: space-between;
        }
        .panel-title { font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.06em; }
        .panel-badge {
          background: #fef3c7; color: #92400e;
          font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px;
        }
        .calls-list { overflow-y: auto; max-height: 420px; }
        .call-row {
          padding: 12px 16px; border-bottom: 1px solid #f8fafc;
          cursor: pointer; transition: background 0.15s;
          display: flex; flex-direction: column; gap: 4px;
        }
        .call-row:hover { background: #f8fafc; }
        .call-row.active { background: #fff7ed; border-left: 3px solid #f97316; }
        .call-row-top { display: flex; align-items: center; justify-content: space-between; }
        .call-name { font-size: 13.5px; font-weight: 700; color: #0f172a; }
        .call-phone { font-size: 11.5px; color: #94a3b8; margin-top: 1px; }
        .call-row-bottom { display: flex; align-items: center; justify-content: space-between; }
        .call-service { font-size: 12px; color: #64748b; }
        .call-city    { font-size: 11px; color: #94a3b8; }
        .call-time    { font-size: 11px; color: #94a3b8; }
        .status-pill {
          font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px;
          color: white; letter-spacing: 0.03em;
        }
        .new-badge {
          font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px;
          background: #fef2f2; color: #ef4444; border: 1px solid #fca5a5;
          animation: newPulse 1.5s infinite;
        }
        @keyframes newPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
        .hot-badge {
          font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px;
          background: #fff7ed; color: #f97316; border: 1px solid #fed7aa;
        }
        .call-new-row { animation: slideDown 0.4s ease-out; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        /* ── RESPONSE PANEL ── */
        .response-panel { display: flex; flex-direction: column; }
        .response-top { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 16px; flex: 1; }
        .chat-col { display: flex; flex-direction: column; gap: 10px; }
        .chat-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 4px; }
        .chat-box {
          background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;
          padding: 14px; height: 320px; overflow-y: auto;
          display: flex; flex-direction: column; gap: 10px;
        }
        .msg { display: flex; flex-direction: column; gap: 2px; }
        .msg.ai  { align-items: flex-start; }
        .msg.cx  { align-items: flex-end; }
        .msg-bubble {
          max-width: 85%; padding: 9px 13px;
          border-radius: 14px; font-size: 13px; line-height: 1.5;
          animation: bubbleIn 0.25s ease-out;
        }
        @keyframes bubbleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .msg.ai .msg-bubble  { background: white; color: #1e293b; border-bottom-left-radius: 3px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .msg.cx .msg-bubble  { background: #f97316; color: white; border-bottom-right-radius: 3px; }
        .msg-meta { font-size: 10.5px; color: #94a3b8; padding: 0 4px; }
        .msg-sender { font-size: 10.5px; font-weight: 600; color: #64748b; padding: 0 4px; }
        .ai-label  { color: #f97316; }

        /* ── QUALIFICATION CARD ── */
        .qual-col { display: flex; flex-direction: column; gap: 10px; }
        .qual-card { background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }
        .qual-head {
          background: #0f172a; padding: 12px 16px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .qual-head span { color: white; font-size: 12.5px; font-weight: 600; }
        .outcome-badge {
          font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 20px; color: white;
        }
        .qual-rows { padding: 14px 16px; display: flex; flex-direction: column; gap: 10px; }
        .qual-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
        .ql { font-size: 11px; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; flex-shrink: 0; }
        .qv { font-size: 13px; color: #0f172a; font-weight: 600; text-align: right; }
        .qdiv { height: 1px; background: #f1f5f9; }
        .urgency-tag { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; color: white; }

        /* ── PIPELINE ── */
        .pipeline-wrap { margin-bottom: 16px; }
        .pipeline-scroll { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        .pipe-col { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
        .pipe-head { padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; }
        .pipe-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
        .pipe-count { font-size: 11px; font-weight: 700; padding: 1px 7px; border-radius: 20px; }
        .pipe-items { padding: 8px 10px; display: flex; flex-direction: column; gap: 8px; min-height: 80px; }
        .pipe-card { background: #f8fafc; border-radius: 6px; padding: 8px 10px; border: 1px solid #e2e8f0; }
        .pipe-name { font-size: 12px; font-weight: 600; color: #0f172a; }
        .pipe-service { font-size: 11px; color: #64748b; }
        .pipe-time { font-size: 10.5px; color: #94a3b8; margin-top: 2px; }

        /* ── BOTTOM GRID ── */
        .bottom-grid { display: grid; grid-template-columns: 1fr 380px; gap: 16px; }

        /* ── BOOKINGS ── */
        .bookings-inner { padding: 0 16px 16px; }
        .booking-section-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #94a3b8; margin: 14px 0 10px; }
        .booking-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 0; border-bottom: 1px solid #f8fafc;
        }
        .booking-time { font-size: 13px; font-weight: 700; color: #0f172a; width: 60px; flex-shrink: 0; }
        .booking-info { flex: 1; }
        .booking-name { font-size: 13px; font-weight: 600; color: #0f172a; }
        .booking-detail { font-size: 11.5px; color: #64748b; margin-top: 1px; }
        .booking-tech { font-size: 11px; color: #94a3b8; }
        .confirmed-pill { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }

        /* ── NOTIFICATIONS ── */
        .notif-list { padding: 0 16px 16px; display: flex; flex-direction: column; gap: 1px; overflow-y: auto; max-height: 360px; }
        .notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f8fafc; animation: slideDown 0.3s ease-out; }
        .notif-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }
        .notif-text { font-size: 12.5px; color: #1e293b; line-height: 1.4; flex: 1; }
        .notif-time { font-size: 11px; color: #94a3b8; flex-shrink: 0; margin-top: 1px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .kpi-row { grid-template-columns: repeat(2, 1fr); }
          .main-grid { grid-template-columns: 1fr; }
          .pipeline-scroll { grid-template-columns: repeat(3, 1fr); }
          .bottom-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .sf-body { padding: 12px; }
          .kpi-row { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .pipeline-scroll { grid-template-columns: repeat(2, 1fr); }
          .response-top { grid-template-columns: 1fr; }
          .sf-client { display: none; }
        }

        /* ── WORKFLOW OVERLAY ── */
        .workflow-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7); z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .workflow-container {
          background: white; border-radius: 16px;
          width: 100%; max-width: 900px;
          height: 500px;
          display: grid; grid-template-columns: 1fr 1fr;
          overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .workflow-left {
          border-right: 1px solid #e2e8f0;
          padding: 24px; display: flex; flex-direction: column;
          background: #f8fafc;
        }
        .workflow-left-title {
          font-size: 14px; font-weight: 700; color: #64748b;
          margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em;
        }
        .workflow-chat {
          flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px;
          margin-bottom: 0;
        }
        .workflow-msg {
          padding: 12px 14px; border-radius: 10px;
          font-size: 13px; line-height: 1.5;
          animation: msgSlide 0.3s ease-out;
        }
        @keyframes msgSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .workflow-msg.system { background: #f1f5f9; color: #64748b; text-align: center; font-weight: 600; }
        .workflow-msg.ai { background: #e0f2fe; color: #0369a1; }
        .workflow-msg.cx { background: #dcfce7; color: #15803d; }
        .workflow-right {
          padding: 24px; display: flex; flex-direction: column;
          background: white;
        }
        .workflow-right-title {
          font-size: 14px; font-weight: 700; color: #64748b;
          margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em;
        }
        .workflow-right-content {
          flex: 1; display: flex; flex-direction: column; gap: 16px;
        }
        .workflow-metric {
          display: flex; gap: 12px;
          padding: 14px; background: #f8fafc; border-radius: 8px;
          animation: metricUpdate 0.4s ease-out;
        }
        @keyframes metricUpdate { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .workflow-metric-icon {
          font-size: 20px;
        }
        .workflow-metric-value {
          font-size: 24px; font-weight: 700; color: #f97316;
        }
        .workflow-metric-label {
          font-size: 12px; color: #64748b;
        }
        .workflow-appointment {
          padding: 14px; background: #f0fdf4; border-left: 3px solid #22c55e;
          border-radius: 6px; animation: msgSlide 0.3s ease-out;
        }
        .workflow-appointment-time {
          font-size: 13px; font-weight: 700; color: #22c55e;
        }
        .workflow-appointment-service {
          font-size: 12px; color: #64748b; margin-top: 4px;
        }
        .workflow-complete {
          text-align: center; padding: 20px; color: #22c55e;
          font-size: 16px; font-weight: 700;
          animation: msgSlide 0.5s ease-out;
        }
        @media (max-width: 768px) {
          .workflow-container { grid-template-columns: 1fr; height: auto; max-height: 80vh; }
          .workflow-left { border-right: none; border-bottom: 1px solid #e2e8f0; }
        }
      `}</style>

      {/* HEADER */}
      <header className="sf-header">
        <div className="sf-logo">
          <div className="sf-logo-icon">🔧</div>
          <div className="sf-logo-text">Service<span>Flow</span> AI</div>
        </div>
        <div className="sf-client">Cool Air HVAC Co. - Phoenix, AZ</div>
        <div className="sf-header-right">
          <div className="live-badge"><div className="live-dot" /> LIVE</div>
          <div className="user-chip">CA</div>
        </div>
      </header>

      <div className="sf-body">

        {/* Above Demo CTA */}
        <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#f97316', marginBottom: '6px' }}>See AI in Action</div>
          <div style={{ fontSize: '14px', color: '#d97706', marginBottom: '16px' }}>Watch how AI captures missed calls, qualifies leads, and books appointments automatically-in real time.</div>
          <button
            onClick={() => setShowWorkflow(true)}
            style={{
              background: '#f97316',
              color: 'white',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.background = '#ea580c'}
            onMouseLeave={(e) => e.target.style.background = '#f97316'}
          >
            ▶ Start Live Workflow Demo
          </button>
        </div>

        {/* Revenue Impact Card */}
        <div style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fffaf0 100%)', border: '2px solid #f97316', borderRadius: '12px', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>💰 Revenue Impact (Daily)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #fed7aa' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#f97316', marginBottom: '4px' }}>18</div>
              <div style={{ fontSize: '12px', color: '#d97706' }}>Missed Calls Saved</div>
            </div>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #fed7aa' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#f97316', marginBottom: '4px' }}>8</div>
              <div style={{ fontSize: '12px', color: '#d97706' }}>Appointments Booked</div>
            </div>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #fed7aa' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#f97316', marginBottom: '4px' }}>$12,000</div>
              <div style={{ fontSize: '12px', color: '#d97706' }}>Monthly Revenue Captured</div>
            </div>
          </div>
        </div>

        {/* WORKFLOW OVERLAY */}
        {showWorkflow && (
          <div className="workflow-overlay" onClick={() => setShowWorkflow(false)}>
            <div className="workflow-container" onClick={(e) => e.stopPropagation()}>
              <div className="workflow-left">
                <div className="workflow-left-title">📱 Customer Conversation</div>
                <div className="workflow-chat" ref={workflowChatRef}>
                  {workflowSteps.map((step, i) => (
                    step.type === 'system' ? (
                      <div key={i} className="workflow-msg system">{step.text}</div>
                    ) : step.type === 'ai' ? (
                      <div key={i} className="workflow-msg ai">🤖 {step.text}</div>
                    ) : step.type === 'cx' ? (
                      <div key={i} className="workflow-msg cx">👤 {step.text}</div>
                    ) : null
                  ))}
                </div>
              </div>
              <div className="workflow-right">
                <div className="workflow-right-title">📊 Live Updates</div>
                <div className="workflow-right-content">
                  {workflowSteps.find(s => s.type === 'metric') && (
                    <div className="workflow-metric">
                      <div className="workflow-metric-icon">📅</div>
                      <div>
                        <div className="workflow-metric-value">{workflowKpi.booked}</div>
                        <div className="workflow-metric-label">Appointments Booked Today</div>
                      </div>
                    </div>
                  )}
                  {workflowSteps.find(s => s.type === 'appointment') && (
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>Schedule Updated:</div>
                      <div className="workflow-appointment">
                        <div className="workflow-appointment-time">3:00 PM</div>
                        <div className="workflow-appointment-service">AC Not Cooling</div>
                      </div>
                    </div>
                  )}
                  {workflowSteps.find(s => s.type === 'complete') && (
                    <div className="workflow-complete">✓ Automation Complete</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KPI CARDS */}
        <div className="kpi-row">
          {[
            { icon: '📲', color: '#f97316', bg: '#fff7ed', value: kpi.recovered, label: 'Missed Calls Recovered', sub: 'Today', prefix: '', suffix: '' },
            { icon: '📅', color: '#22c55e', bg: '#f0fdf4', value: kpi.booked,    label: 'Jobs Booked',           sub: 'Confirmed today', prefix: '', suffix: '' },
            { icon: '💰', color: '#8b5cf6', bg: '#faf5ff', value: kpi.revenue,   label: 'Revenue Opportunity',   sub: 'Est. from leads', prefix: '$', suffix: '' },
            { icon: '⚡', color: '#0ea5e9', bg: '#f0f9ff', value: kpi.respTime,  label: 'Avg Response Time',     sub: 'AI first reply', prefix: '', suffix: 's' },
          ].map((k, i) => (
            <div key={i} className="kpi-card" style={{ borderLeftColor: k.color }}>
              <div className="kpi-icon" style={{ background: k.bg }}>{k.icon}</div>
              <div>
                <div className="kpi-value" style={{ color: k.color }}>{k.prefix}{k.value.toLocaleString()}{k.suffix}</div>
                <div className="kpi-label">{k.label}</div>
                <div className="kpi-sub">{k.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="main-grid">

          {/* CALLS FEED */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Live Missed Calls</span>
              <span className="panel-badge">{calls.length} Today</span>
            </div>
            <div className="calls-list">
              {calls.map(c => (
                <div
                  key={c.id}
                  className={`call-row ${selected === c.id ? 'active' : ''} ${c.status === 'new' ? 'call-new-row' : ''}`}
                  onClick={() => setSelected(c.id)}
                >
                  <div className="call-row-top">
                    <div>
                      <div className="call-name">{c.name}</div>
                      <div className="call-phone">{c.phone}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      {c.status === 'new'
                        ? <span className="new-badge">● NEW</span>
                        : <span className="status-pill" style={{ background: statusColor[c.status] }}>{statusLabel[c.status]}</span>
                      }
                      {c.hot && <span className="hot-badge">🔥 HOT</span>}
                    </div>
                  </div>
                  <div className="call-row-bottom" style={{ marginTop: 4 }}>
                    <span className="call-service">{c.service}</span>
                    <span className="call-city">{c.city}</span>
                    <span className="call-time">{c.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI RESPONSE PANEL */}
          <div className="panel response-panel">
            <div className="panel-header">
              <span className="panel-title">AI Response Center</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>
                Viewing: <strong>{calls.find(c => c.id === selected)?.name}</strong>
              </span>
            </div>
            <div className="response-top">
              {/* Chat */}
              <div className="chat-col">
                <div className="chat-label">SMS Conversation</div>
                <div className="chat-box" ref={chatRef}>
                  {convo.map((m, i) => (
                    <div key={i} className={`msg ${m.from}`}>
                      <div className="msg-sender">
                        {m.from === 'ai'
                          ? <span className="ai-label">ServiceFlow AI</span>
                          : calls.find(c => c.id === selected)?.name}
                      </div>
                      <div className="msg-bubble">{m.text}</div>
                      <div className="msg-meta">{m.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualification */}
              {qual && (
                <div className="qual-col">
                  <div className="chat-label">AI Qualification</div>
                  <div className="qual-card">
                    <div className="qual-head">
                      <span>📋 Lead Summary</span>
                      <span
                        className="outcome-badge"
                        style={{ background: qual.outcome === 'booked' ? '#22c55e' : '#f97316' }}
                      >
                        {qual.outcome === 'booked' ? 'BOOKED ✓' : 'IN PROGRESS'}
                      </span>
                    </div>
                    <div className="qual-rows">
                      {[
                        { l: 'Issue',          v: qual.issue },
                        { l: 'Urgency',        v: qual.urgency, isUrgency: true },
                        { l: 'Address',        v: qual.address },
                        { l: 'Appointment',    v: qual.appt },
                        { l: 'Customer Type',  v: qual.type },
                      ].map((r, i) => (
                        <div key={i}>
                          {i > 0 && <div className="qdiv" />}
                          <div className="qual-row">
                            <span className="ql">{r.l}</span>
                            {r.isUrgency
                              ? <span className="urgency-tag" style={{ background: urgencyColor[r.v] }}>{r.v}</span>
                              : <span className="qv">{r.v}</span>
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PIPELINE */}
        <div className="pipeline-wrap">
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Pipeline Board</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>Live - updates automatically</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div className="pipeline-scroll">
                {pipeline.map((col, i) => (
                  <div key={i} className="pipe-col" style={{ borderTop: `3px solid ${col.color}` }}>
                    <div className="pipe-head" style={{ background: col.bg }}>
                      <span className="pipe-title" style={{ color: col.color }}>{col.stage}</span>
                      <span className="pipe-count" style={{ background: col.color + '20', color: col.color }}>{col.items.length}</span>
                    </div>
                    <div className="pipe-items">
                      {col.items.map((item, j) => (
                        <div key={j} className="pipe-card">
                          <div className="pipe-name">{item.name}</div>
                          <div className="pipe-service">{item.service}</div>
                          <div className="pipe-time">{item.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div className="bottom-grid">

          {/* BOOKINGS */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Booking Center</span>
              <span className="panel-badge">{todayBookings.length + tmrBookings.length} Scheduled</span>
            </div>
            <div className="bookings-inner">
              <div className="booking-section-label">Today</div>
              {todayBookings.map((b, i) => (
                <div key={i} className="booking-item">
                  <div className="booking-time">{b.time}</div>
                  <div className="booking-info">
                    <div className="booking-name">{b.name}</div>
                    <div className="booking-detail">{b.service} · {b.city}</div>
                    <div className="booking-tech">Tech: {b.tech}</div>
                  </div>
                  <span
                    className="confirmed-pill"
                    style={b.confirmed
                      ? { background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' }
                      : { background: '#fff7ed', color: '#f97316', border: '1px solid #fed7aa' }}
                  >
                    {b.confirmed ? 'Confirmed' : 'Pending'}
                  </span>
                </div>
              ))}

              <div className="booking-section-label">Tomorrow</div>
              {tmrBookings.map((b, i) => (
                <div key={i} className="booking-item">
                  <div className="booking-time">{b.time}</div>
                  <div className="booking-info">
                    <div className="booking-name">{b.name}</div>
                    <div className="booking-detail">{b.service} · {b.city}</div>
                    <div className="booking-tech">Tech: {b.tech}</div>
                  </div>
                  <span
                    className="confirmed-pill"
                    style={b.confirmed
                      ? { background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' }
                      : { background: '#fff7ed', color: '#f97316', border: '1px solid #fed7aa' }}
                  >
                    {b.confirmed ? 'Confirmed' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Notifications</span>
              <span style={{ fontSize: 11, color: '#64748b' }}>Real-time</span>
            </div>
            <div className="notif-list">
              {notifs.map(n => (
                <div key={n.id} className="notif-item">
                  <div className="notif-dot" style={{ background: n.dot }} />
                  <div className="notif-text">{n.text}</div>
                  <div className="notif-time">{n.time}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Below Demo CTA */}
        <div style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fffaf0 100%)', border: '1px solid #fed7aa', borderRadius: '12px', padding: '32px 24px', marginTop: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#f97316', marginBottom: '8px' }}>Ready to Capture Every Missed Call?</div>
          <div style={{ fontSize: '14px', color: '#d97706', marginBottom: '20px', lineHeight: '1.5' }}>This demo shows what's possible with AI. Get a customized system built for your HVAC business's specific needs and service area.</div>
          <a href="https://calendly.com/kimmycombs" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#f97316', color: 'white', border: 'none', padding: '14px 36px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', textDecoration: 'none', transition: 'background 0.2s' }} onMouseEnter={(e) => e.target.style.background = '#ea580c'} onMouseLeave={(e) => e.target.style.background = '#f97316'}>📅 Book a Free Strategy Call</a>
        </div>
      </div>
    </>
  );
}
