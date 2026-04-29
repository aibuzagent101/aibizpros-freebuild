import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

// ── MOCK DATA ────────────────────────────────────────────────────────────────

const initialLeads = [
  { id: 1, name: 'Brian Calloway',   phone: '214-555-0142', time: '4 min ago',  damage: 'Hail + Wind',      city: 'Plano, TX',       status: 'booked',    insurance: true  },
  { id: 2, name: 'Michelle Okafor',  phone: '972-555-0267', time: '11 min ago', damage: 'Missing Shingles', city: 'Frisco, TX',      status: 'responded', insurance: true  },
  { id: 3, name: 'Gary Hutchinson',  phone: '469-555-0388', time: '18 min ago', damage: 'Full Roof Damage', city: 'McKinney, TX',    status: 'booked',    insurance: false },
  { id: 4, name: 'Rachel Simmons',   phone: '214-555-0411', time: '35 min ago', damage: 'Storm Damage',     city: 'Allen, TX',       status: 'booked',    insurance: true  },
  { id: 5, name: 'James Peralta',    phone: '972-555-0534', time: '52 min ago', damage: 'Leak + Damage',    city: 'Richardson, TX',  status: 'completed', insurance: false },
];

const convos = {
  1: [
    { from: 'ai', text: "Hi Brian! We saw your area was hit by yesterday's storm. SkyLine Roofing here — we're offering FREE storm damage inspections. Interested?", time: '9:16 AM' },
    { from: 'cx', text: "Yes definitely! There's hail damage all over my roof and part of a shingle blew off", time: '9:19 AM' },
    { from: 'ai', text: "That's exactly what we handle. Do you have homeowner's insurance? We work with all major carriers for storm claims.", time: '9:19 AM' },
    { from: 'cx', text: "Yes I have State Farm. Do you help file the claim?", time: '9:21 AM' },
    { from: 'ai', text: "Absolutely — our team guides you through the entire claim process. What's your address so we can schedule your free inspection?", time: '9:21 AM' },
    { from: 'cx', text: "4812 Stonecrest Dr, Plano TX 75024", time: '9:22 AM' },
    { from: 'ai', text: "You're in our priority zone! Next available inspection is TODAY at 2 PM or tomorrow at 10 AM. Which works?", time: '9:22 AM' },
    { from: 'cx', text: "Today at 2 works great!", time: '9:23 AM' },
    { from: 'ai', text: "Confirmed! Free inspection TODAY at 2 PM. Our inspector will document everything for your State Farm claim. See you soon ✅", time: '9:23 AM' },
  ],
  2: [
    { from: 'ai', text: "Hi Michelle! SkyLine Roofing here — your neighborhood was in the storm path. We're offering FREE damage inspections. Can we help?", time: '9:09 AM' },
    { from: 'cx', text: "Yes please. I can see 3-4 shingles are missing from my back roof", time: '9:12 AM' },
    { from: 'ai', text: "That's very common after this storm. Do you have homeowner's insurance? Missing shingles are typically covered.", time: '9:13 AM' },
    { from: 'cx', text: "I have Allstate. Is it worth filing a claim?", time: '9:15 AM' },
    { from: 'ai', text: "In most cases yes — storm damage is usually fully covered minus your deductible. What's your address?", time: '9:15 AM' },
    { from: 'cx', text: "7231 Ridgecrest Blvd, Frisco TX 75033", time: '9:17 AM' },
    { from: 'ai', text: "Perfect — we're already inspecting in Frisco today. Sending this to our scheduling team now. Are you available this afternoon?", time: '9:17 AM' },
  ],
  3: [
    { from: 'ai', text: "Hi Gary! SkyLine Roofing here — the storm hit McKinney hard. We're doing FREE inspections in your area today.", time: '9:02 AM' },
    { from: 'cx', text: "I need more than an inspection. My roof has major damage — there's a tarp on part of it already", time: '9:06 AM' },
    { from: 'ai', text: "Emergency tarping is smart — we can make that permanent ASAP. Full replacement or major repair is something we specialize in. What's your address?", time: '9:06 AM' },
    { from: 'cx', text: "1508 Creekside Way McKinney TX 75070", time: '9:08 AM' },
    { from: 'ai', text: "Flagging as PRIORITY 🚨 We can have an estimator there today. Do you have homeowner's insurance?", time: '9:08 AM' },
    { from: 'cx', text: "No insurance, just need a price", time: '9:10 AM' },
    { from: 'ai', text: "Got it — cash/card pricing available. Inspection TODAY at 4 PM, free written estimate included. Confirmed ✅", time: '9:10 AM' },
  ],
  4: [
    { from: 'ai', text: "Hi Rachel! SkyLine Roofing — free storm inspections in Allen today. Can we schedule yours?", time: '8:45 AM' },
    { from: 'cx', text: "Yes — we got hit pretty bad. Lots of shingle damage from the hail", time: '8:48 AM' },
    { from: 'ai', text: "Hail damage is our specialty. Do you have homeowner's insurance? We handle all the paperwork.", time: '8:48 AM' },
    { from: 'cx', text: "Yes, Farmers Insurance. My neighbor used you guys last year and said you were great", time: '8:50 AM' },
    { from: 'ai', text: "That's wonderful to hear! What's your address? We'll get you on the schedule today.", time: '8:50 AM' },
    { from: 'cx', text: "3394 Lakewood Ln Allen TX 75002", time: '8:51 AM' },
    { from: 'ai', text: "Booked! Tomorrow at 10 AM — our inspector works directly with Farmers. You're in great hands 👍", time: '8:51 AM' },
  ],
  5: [
    { from: 'ai', text: "Hi James! SkyLine Roofing — free storm inspections today in Richardson. Interested?", time: '8:18 AM' },
    { from: 'cx', text: "I have a leak in my garage and noticed some dark spots on a couple shingles", time: '8:21 AM' },
    { from: 'ai', text: "Leaks + dark spots after a storm usually means cracked or missing shingles. We can fix that same week. Address?", time: '8:21 AM' },
    { from: 'cx', text: "6127 Campbell Rd Richardson TX 75080", time: '8:23 AM' },
    { from: 'ai', text: "Do you have homeowner's insurance or looking for an out-of-pocket estimate?", time: '8:23 AM' },
    { from: 'cx', text: "No insurance. Looking for a price on the repair", time: '8:24 AM' },
    { from: 'ai', text: "Free estimate tomorrow at 11 AM — our estimator will check the leak source and quote the repair. Confirmed ✅", time: '8:24 AM' },
  ],
};

const quals = {
  1: { damage: 'Hail + Wind Damage',    urgency: 'PRIORITY',  address: '4812 Stonecrest Dr, Plano',    appt: 'Today 2:00 PM',      insurance: 'State Farm',    outcome: 'booked' },
  2: { damage: 'Missing Shingles',      urgency: 'STANDARD',  address: '7231 Ridgecrest Blvd, Frisco', appt: 'Pending',            insurance: 'Allstate',      outcome: 'pending' },
  3: { damage: 'Major Roof Damage',     urgency: 'EMERGENCY', address: '1508 Creekside Way, McKinney',  appt: 'Today 4:00 PM',      insurance: 'No Insurance',  outcome: 'booked' },
  4: { damage: 'Hail + Shingle Damage', urgency: 'STANDARD',  address: '3394 Lakewood Ln, Allen',       appt: 'Tomorrow 10:00 AM',  insurance: 'Farmers',       outcome: 'booked' },
  5: { damage: 'Leak + Shingle Cracks', urgency: 'STANDARD',  address: '6127 Campbell Rd, Richardson',  appt: 'Tomorrow 11:00 AM',  insurance: 'No Insurance',  outcome: 'booked' },
};

const pipeline = [
  { stage: 'New Lead', color: '#64748b', bg: '#f8fafc', items: [
    { name: 'David Ortiz',   damage: 'Hail Damage',    time: '2 min ago' },
    { name: 'Karen Wells',   damage: 'Storm Damage',   time: '8 min ago' },
  ]},
  { stage: 'Qualified', color: '#e8a020', bg: '#fffbeb', items: [
    { name: 'Michelle O.',   damage: 'Missing Shingles', time: '11 min ago' },
    { name: 'Tom Briggs',    damage: 'Leak + Wind',    time: '28 min ago' },
  ]},
  { stage: 'Inspection Set', color: '#8b5cf6', bg: '#faf5ff', items: [
    { name: 'Gary H.',       damage: 'Major Damage',   time: '4 PM Today' },
    { name: 'Brian C.',      damage: 'Hail + Wind',    time: '2 PM Today' },
  ]},
  { stage: 'Estimate Sent', color: '#0ea5e9', bg: '#f0f9ff', items: [
    { name: 'Rachel S.',     damage: 'Shingle Damage', time: 'Tmrw 10 AM' },
    { name: 'Carol Burke',   damage: 'Full Replace',   time: 'Tmrw 9 AM' },
  ]},
  { stage: 'Won ✓', color: '#22c55e', bg: '#f0fdf4', items: [
    { name: 'James P.',      damage: 'Leak Repair',    time: 'Mon 8 AM' },
    { name: 'P. Harris',     damage: 'Full Roof',      time: 'Mon 1 PM' },
    { name: 'L. Martinez',   damage: 'Hail Damage',    time: 'Tue 10 AM' },
  ]},
];

const todayInspections = [
  { time: '2:00 PM', name: 'Brian Calloway',  damage: 'Hail + Wind',    city: 'Plano',     inspector: 'Marcus W.', confirmed: true  },
  { time: '4:00 PM', name: 'Gary Hutchinson', damage: 'Major Damage',   city: 'McKinney',  inspector: 'Darnell K.', confirmed: true  },
  { time: '5:30 PM', name: 'Karen Wells',     damage: 'Storm Damage',   city: 'Frisco',    inspector: 'Marcus W.', confirmed: false },
];

const tmrInspections = [
  { time: '9:00 AM',  name: 'Carol Burke',   damage: 'Full Replace',   city: 'Allen',      inspector: 'Darnell K.', confirmed: true  },
  { time: '10:00 AM', name: 'Rachel Simmons', damage: 'Hail Damage',   city: 'Allen',      inspector: 'Marcus W.', confirmed: true  },
  { time: '11:00 AM', name: 'James Peralta',  damage: 'Leak Repair',   city: 'Richardson', inspector: 'Darnell K.', confirmed: true  },
];

const initNotifs = [
  { id: 1, dot: '#ef4444', text: 'New storm lead — Brian Calloway | Hail + Wind | Plano',               time: '4 min ago'  },
  { id: 2, dot: '#22c55e', text: 'Inspection booked — Brian Calloway confirmed for 2 PM today',          time: '6 min ago'  },
  { id: 3, dot: '#e8a020', text: 'Insurance lead — Rachel Simmons | Farmers | Allen — HIGH VALUE',       time: '9 min ago'  },
  { id: 4, dot: '#8b5cf6', text: 'Estimate requested — Gary Hutchinson | Full Roof | McKinney',          time: '18 min ago' },
  { id: 5, dot: '#22c55e', text: 'Inspection booked — Rachel Simmons confirmed for tomorrow 10 AM',      time: '35 min ago' },
];

const newLeadQueue = [
  { id: 6, name: 'Sandra Pierce',   phone: '214-555-0618', time: 'Just now', damage: 'Hail Damage',    city: 'Plano, TX',   status: 'new', insurance: true  },
  { id: 7, name: 'Victor Nguyen',   phone: '972-555-0745', time: 'Just now', damage: 'Wind + Shingles', city: 'Frisco, TX', status: 'new', insurance: false },
];

const newNotifQueue = [
  { id: 6, dot: '#ef4444', text: 'New storm lead — Sandra Pierce | Hail Damage | Plano — Insurance Lead',  time: 'Just now' },
  { id: 7, dot: '#e8a020', text: 'New storm lead — Victor Nguyen | Wind + Shingles | Frisco',              time: 'Just now' },
];

// ── COMPONENT ────────────────────────────────────────────────────────────────

export default function RoofFlow() {
  const [leads, setLeads]             = useState(initialLeads);
  const [selected, setSelected]       = useState(1);
  const [notifs, setNotifs]           = useState(initNotifs);
  const [kpi, setKpi]                 = useState({ leads: 0, inspections: 0, insurance: 0, revenue: 0 });
  const [newLeadIdx, setNewLeadIdx]   = useState(0);
  const [newNotifIdx, setNewNotifIdx] = useState(0);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [workflowSteps, setWorkflowSteps] = useState([]);
  const [workflowKpi, setWorkflowKpi] = useState({ insurance: 12 });
  const chatRef = useRef(null);
  const workflowChatRef = useRef(null);

  // KPI count-up
  useEffect(() => {
    const targets = { leads: 18, inspections: 7, insurance: 11, revenue: 62000 };
    const steps = 40;
    let i = 0;
    const t = setInterval(() => {
      i++;
      const p = i / steps;
      setKpi({
        leads:       Math.round(targets.leads * p),
        inspections: Math.round(targets.inspections * p),
        insurance:   Math.round(targets.insurance * p),
        revenue:     Math.round(targets.revenue * p),
      });
      if (i >= steps) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, []);

  // Trickle new leads
  useEffect(() => {
    if (newLeadIdx >= newLeadQueue.length) return;
    const t = setTimeout(() => {
      setLeads(prev => [newLeadQueue[newLeadIdx], ...prev]);
      setNewLeadIdx(i => i + 1);
    }, 9000 + newLeadIdx * 8000);
    return () => clearTimeout(t);
  }, [newLeadIdx]);

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

  useEffect(() => {
    if (!showWorkflow) return;
    const steps = [
      { delay: 500, side: 'left', type: 'system', text: 'Incoming storm lead from Sarah Chen' },
      { delay: 2500, side: 'left', type: 'ai', text: 'Hi Sarah. I\'m helping with your roof damage claim. What happened?' },
      { delay: 4500, side: 'left', type: 'cx', text: 'Hail storm hit. Multiple shingles damaged. Missing pieces.' },
      { delay: 6500, side: 'left', type: 'ai', text: 'Do you have homeowner\'s insurance?' },
      { delay: 8500, side: 'left', type: 'cx', text: 'Yes, State Farm' },
      { delay: 10500, side: 'left', type: 'ai', text: 'Excellent! HIGH VALUE insurance lead. Booking your free inspection ✓' },
      { delay: 11000, side: 'right', type: 'metric', key: 'insurance', value: 12 },
      { delay: 11200, side: 'right', type: 'appointment', time: 'Today 3 PM', service: 'Free Roof Inspection' },
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

  const statusColor = { new: '#e8a020', responded: '#8b5cf6', qualified: '#0ea5e9', booked: '#22c55e', completed: '#64748b' };
  const statusLabel = { new: 'New', responded: 'Responded', qualified: 'Qualified', booked: 'Booked', completed: 'Done' };
  const urgencyColor = { EMERGENCY: '#ef4444', PRIORITY: '#e8a020', STANDARD: '#22c55e' };

  return (
    <>
      <Head>
        <title>RoofFlow AI — SkyLine Roofing</title>
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
        .rf-header {
          background: #1a1a2e;
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
        .rf-logo { display: flex; align-items: center; gap: 10px; }
        .rf-logo-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, #e8a020, #b45309);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }
        .rf-logo-text { font-size: 15px; font-weight: 700; color: white; }
        .rf-logo-text span { color: #e8a020; }
        .rf-client {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 5px 12px;
          color: rgba(255,255,255,0.8);
          font-size: 13px;
          font-weight: 500;
        }
        .rf-header-right { display: flex; align-items: center; gap: 12px; }
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
          background: #e8a020; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: white;
        }

        /* ── LAYOUT ── */
        .rf-body { padding: 20px; max-width: 1440px; margin: 0 auto; }

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

        /* ── LEADS FEED ── */
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
        .leads-list { overflow-y: auto; max-height: 420px; }
        .lead-row {
          padding: 12px 16px; border-bottom: 1px solid #f8fafc;
          cursor: pointer; transition: background 0.15s;
          display: flex; flex-direction: column; gap: 4px;
        }
        .lead-row:hover { background: #f8fafc; }
        .lead-row.active { background: #fffbeb; border-left: 3px solid #e8a020; }
        .lead-row-top { display: flex; align-items: center; justify-content: space-between; }
        .lead-name  { font-size: 13.5px; font-weight: 700; color: #0f172a; }
        .lead-phone { font-size: 11.5px; color: #94a3b8; margin-top: 1px; }
        .lead-row-bottom { display: flex; align-items: center; justify-content: space-between; }
        .lead-damage { font-size: 12px; color: #64748b; }
        .lead-city   { font-size: 11px; color: #94a3b8; }
        .lead-time   { font-size: 11px; color: #94a3b8; }
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
        .ins-badge {
          font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px;
          background: #fffbeb; color: #e8a020; border: 1px solid #fde68a;
        }
        .lead-new-row { animation: slideDown 0.4s ease-out; }
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
        .msg.ai .msg-bubble { background: white; color: #1e293b; border-bottom-left-radius: 3px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .msg.cx .msg-bubble { background: #e8a020; color: white; border-bottom-right-radius: 3px; }
        .msg-meta   { font-size: 10.5px; color: #94a3b8; padding: 0 4px; }
        .msg-sender { font-size: 10.5px; font-weight: 600; color: #64748b; padding: 0 4px; }
        .ai-label   { color: #e8a020; }

        /* ── QUALIFICATION CARD ── */
        .qual-col { display: flex; flex-direction: column; gap: 10px; }
        .qual-card { background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }
        .qual-head {
          background: #1a1a2e; padding: 12px 16px;
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
        .pipe-name    { font-size: 12px; font-weight: 600; color: #0f172a; }
        .pipe-service { font-size: 11px; color: #64748b; }
        .pipe-time    { font-size: 10.5px; color: #94a3b8; margin-top: 2px; }

        /* ── BOTTOM GRID ── */
        .bottom-grid { display: grid; grid-template-columns: 1fr 380px; gap: 16px; }

        /* ── INSPECTIONS ── */
        .inspections-inner { padding: 0 16px 16px; }
        .inspection-section-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #94a3b8; margin: 14px 0 10px; }
        .inspection-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 0; border-bottom: 1px solid #f8fafc;
        }
        .inspection-time { font-size: 13px; font-weight: 700; color: #0f172a; width: 60px; flex-shrink: 0; }
        .inspection-info { flex: 1; }
        .inspection-name   { font-size: 13px; font-weight: 600; color: #0f172a; }
        .inspection-detail { font-size: 11.5px; color: #64748b; margin-top: 1px; }
        .inspection-tech   { font-size: 11px; color: #94a3b8; }
        .confirmed-pill { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }

        /* ── NOTIFICATIONS ── */
        .notif-list { padding: 0 16px 16px; display: flex; flex-direction: column; gap: 1px; overflow-y: auto; max-height: 360px; }
        .notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f8fafc; animation: slideDown 0.3s ease-out; }
        .notif-dot  { width: 8px; height: 8px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }
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
          .rf-body { padding: 12px; }
          .kpi-row { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .pipeline-scroll { grid-template-columns: repeat(2, 1fr); }
          .response-top { grid-template-columns: 1fr; }
          .rf-client { display: none; }
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
        .workflow-right { padding: 24px; display: flex; flex-direction: column; background: white; }
        .workflow-right-title { font-size: 14px; font-weight: 700; color: #64748b; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em; }
        .workflow-right-content { flex: 1; display: flex; flex-direction: column; gap: 16px; }
        .workflow-metric { display: flex; gap: 12px; padding: 14px; background: #f8fafc; border-radius: 8px; animation: metricUpdate 0.4s ease-out; }
        @keyframes metricUpdate { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .workflow-metric-icon { font-size: 20px; }
        .workflow-metric-value { font-size: 24px; font-weight: 700; color: #e8a020; }
        .workflow-metric-label { font-size: 12px; color: #64748b; }
        .workflow-appointment { padding: 14px; background: #f0fdf4; border-left: 3px solid #22c55e; border-radius: 6px; animation: msgSlide 0.3s ease-out; }
        .workflow-appointment-time { font-size: 13px; font-weight: 700; color: #22c55e; }
        .workflow-appointment-service { font-size: 12px; color: #64748b; margin-top: 4px; }
        .workflow-complete { text-align: center; padding: 20px; color: #22c55e; font-size: 16px; font-weight: 700; animation: msgSlide 0.5s ease-out; }
        @media (max-width: 768px) { .workflow-container { grid-template-columns: 1fr; height: auto; max-height: 80vh; } .workflow-left { border-right: none; border-bottom: 1px solid #e2e8f0; } }
      `}</style>

      {/* HEADER */}
      <header className="rf-header">
        <div className="rf-logo">
          <div className="rf-logo-icon">🏠</div>
          <div className="rf-logo-text">Roof<span>Flow</span> AI</div>
        </div>
        <div className="rf-client">SkyLine Roofing — Dallas, TX</div>
        <div className="rf-header-right">
          <div className="live-badge"><div className="live-dot" /> LIVE</div>
          <div className="user-chip">SR</div>
        </div>
      </header>

      <div className="rf-body">
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => setShowWorkflow(true)} style={{ background: '#e8a020', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e) => e.target.style.background = '#d89010'} onMouseLeave={(e) => e.target.style.background = '#e8a020'}>▶ Start Live Workflow Demo</button>
        </div>
        {showWorkflow && (
          <div className="workflow-overlay" onClick={() => setShowWorkflow(false)}>
            <div className="workflow-container" onClick={(e) => e.stopPropagation()}>
              <div className="workflow-left">
                <div className="workflow-left-title">📱 Customer Conversation</div>
                <div className="workflow-chat" ref={workflowChatRef}>
                  {workflowSteps.map((step, i) => (
                    step.type === 'system' ? <div key={i} className="workflow-msg system">{step.text}</div> : step.type === 'ai' ? <div key={i} className="workflow-msg ai">🤖 {step.text}</div> : step.type === 'cx' ? <div key={i} className="workflow-msg cx">👤 {step.text}</div> : null
                  ))}
                </div>
              </div>
              <div className="workflow-right">
                <div className="workflow-right-title">📊 Live Updates</div>
                <div className="workflow-right-content">
                  {workflowSteps.find(s => s.type === 'metric') && <div className="workflow-metric"><div className="workflow-metric-icon">🏠</div><div><div className="workflow-metric-value">{workflowKpi.insurance}</div><div className="workflow-metric-label">Insurance Leads</div></div></div>}
                  {workflowSteps.find(s => s.type === 'appointment') && <div><div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>Schedule Updated:</div><div className="workflow-appointment"><div className="workflow-appointment-time">Today 3 PM</div><div className="workflow-appointment-service">Free Roof Inspection</div></div></div>}
                  {workflowSteps.find(s => s.type === 'complete') && <div className="workflow-complete">✓ Automation Complete</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KPI CARDS */}
        <div className="kpi-row">
          {[
            { icon: '⛈️',  color: '#e8a020', bg: '#fffbeb', value: kpi.leads,       label: 'Storm Leads Today',     sub: 'After last night\'s storm', prefix: '',  suffix: ''  },
            { icon: '📋',  color: '#22c55e', bg: '#f0fdf4', value: kpi.inspections, label: 'Inspections Booked',    sub: 'Confirmed this week',       prefix: '',  suffix: ''  },
            { icon: '🏦',  color: '#8b5cf6', bg: '#faf5ff', value: kpi.insurance,   label: 'Insurance Leads',       sub: 'Homeowners w/ coverage',    prefix: '',  suffix: ''  },
            { icon: '💰',  color: '#0ea5e9', bg: '#f0f9ff', value: kpi.revenue,     label: 'Revenue Opportunity',   sub: 'Est. pipeline value',       prefix: '$', suffix: ''  },
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

          {/* STORM LEADS FEED */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Storm Lead Feed</span>
              <span className="panel-badge">{leads.length} Today</span>
            </div>
            <div className="leads-list">
              {leads.map(l => (
                <div
                  key={l.id}
                  className={`lead-row ${selected === l.id ? 'active' : ''} ${l.status === 'new' ? 'lead-new-row' : ''}`}
                  onClick={() => setSelected(l.id)}
                >
                  <div className="lead-row-top">
                    <div>
                      <div className="lead-name">{l.name}</div>
                      <div className="lead-phone">{l.phone}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      {l.status === 'new'
                        ? <span className="new-badge">● NEW</span>
                        : <span className="status-pill" style={{ background: statusColor[l.status] }}>{statusLabel[l.status]}</span>
                      }
                      {l.insurance && <span className="ins-badge">🏦 Insurance</span>}
                    </div>
                  </div>
                  <div className="lead-row-bottom" style={{ marginTop: 4 }}>
                    <span className="lead-damage">{l.damage}</span>
                    <span className="lead-city">{l.city}</span>
                    <span className="lead-time">{l.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI RESPONSE PANEL */}
          <div className="panel response-panel">
            <div className="panel-header">
              <span className="panel-title">AI Outreach Center</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>
                Viewing: <strong>{leads.find(l => l.id === selected)?.name}</strong>
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
                          ? <span className="ai-label">RoofFlow AI</span>
                          : leads.find(l => l.id === selected)?.name}
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
                  <div className="chat-label">Lead Summary</div>
                  <div className="qual-card">
                    <div className="qual-head">
                      <span>🏠 Damage Report</span>
                      <span
                        className="outcome-badge"
                        style={{ background: qual.outcome === 'booked' ? '#22c55e' : '#e8a020' }}
                      >
                        {qual.outcome === 'booked' ? 'BOOKED ✓' : 'IN PROGRESS'}
                      </span>
                    </div>
                    <div className="qual-rows">
                      {[
                        { l: 'Damage Type',  v: qual.damage },
                        { l: 'Priority',     v: qual.urgency, isUrgency: true },
                        { l: 'Address',      v: qual.address },
                        { l: 'Inspection',   v: qual.appt },
                        { l: 'Insurance',    v: qual.insurance },
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
              <span style={{ fontSize: 12, color: '#64748b' }}>Live — updates automatically</span>
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
                          <div className="pipe-service">{item.damage}</div>
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

          {/* INSPECTIONS */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Inspection Schedule</span>
              <span className="panel-badge">{todayInspections.length + tmrInspections.length} Scheduled</span>
            </div>
            <div className="inspections-inner">
              <div className="inspection-section-label">Today</div>
              {todayInspections.map((b, i) => (
                <div key={i} className="inspection-item">
                  <div className="inspection-time">{b.time}</div>
                  <div className="inspection-info">
                    <div className="inspection-name">{b.name}</div>
                    <div className="inspection-detail">{b.damage} · {b.city}</div>
                    <div className="inspection-tech">Inspector: {b.inspector}</div>
                  </div>
                  <span
                    className="confirmed-pill"
                    style={b.confirmed
                      ? { background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' }
                      : { background: '#fffbeb', color: '#e8a020', border: '1px solid #fde68a' }}
                  >
                    {b.confirmed ? 'Confirmed' : 'Pending'}
                  </span>
                </div>
              ))}

              <div className="inspection-section-label">Tomorrow</div>
              {tmrInspections.map((b, i) => (
                <div key={i} className="inspection-item">
                  <div className="inspection-time">{b.time}</div>
                  <div className="inspection-info">
                    <div className="inspection-name">{b.name}</div>
                    <div className="inspection-detail">{b.damage} · {b.city}</div>
                    <div className="inspection-tech">Inspector: {b.inspector}</div>
                  </div>
                  <span
                    className="confirmed-pill"
                    style={b.confirmed
                      ? { background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' }
                      : { background: '#fffbeb', color: '#e8a020', border: '1px solid #fde68a' }}
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
      </div>
    </>
  );
}
