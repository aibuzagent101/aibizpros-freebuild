import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

const initialLeads = [
  { id: 1, family: 'Linda Harris',      phone: '317-555-0148', recipient: 'Dorothy, 78',  city: 'Indianapolis, IN', source: 'Website Form',   time: '3 min ago',  status: 'qualified',   urgent: false },
  { id: 2, family: 'Marcus Webb',        phone: '614-555-0267', recipient: 'Ruth, 84',     city: 'Carmel, IN',       source: 'Phone Referral', time: '11 min ago', status: 'assessment',  urgent: false },
  { id: 3, family: 'Patricia Osei',      phone: '317-555-0391', recipient: 'James, 71',    city: 'Fishers, IN',      source: 'VA Referral',    time: '18 min ago', status: 'qualified',   urgent: true  },
  { id: 4, family: 'Tom & Janet Riley',  phone: '765-555-0478', recipient: 'Ellen, 89',    city: 'Noblesville, IN',  source: 'Social Worker',  time: '34 min ago', status: 'assessment',  urgent: false },
  { id: 5, family: 'Sandra Kim',         phone: '317-555-0523', recipient: 'George, 76',   city: 'Greenwood, IN',    source: 'Website Form',   time: '52 min ago', status: 'completed',   urgent: false },
];

const convos = {
  1: [
    { from: 'ai', text: "Hi! I'm the CareConnect intake assistant at Comfort at Home Care. How can I help your family today?", time: '10:42 AM' },
    { from: 'cx', text: "I'm looking for in-home care for my mother. She needs help with bathing and dressing.", time: '10:44 AM' },
    { from: 'ai', text: "I'm glad you reached out. How old is your mother and what city is she located in?", time: '10:44 AM' },
    { from: 'cx', text: "She's 78 and lives in Indianapolis.", time: '10:45 AM' },
    { from: 'ai', text: "Does she need help with bathing and dressing only, or also meal prep, medication reminders, or companionship?", time: '10:45 AM' },
    { from: 'cx', text: "All of those actually. She also gets confused sometimes which worries us.", time: '10:46 AM' },
    { from: 'ai', text: "Understood - personal care plus cognitive support. Approximately how many hours per week are you thinking?", time: '10:46 AM' },
    { from: 'cx', text: "Maybe 20–25 hours per week to start.", time: '10:47 AM' },
    { from: 'ai', text: "How will services be funded - private pay, Medicaid, VA benefits, or long-term care insurance?", time: '10:47 AM' },
    { from: 'cx', text: "We're not sure yet. She might qualify for Medicaid.", time: '10:48 AM' },
    { from: 'ai', text: "No problem - we can help you navigate that. What's the best phone and email to reach you?", time: '10:48 AM' },
    { from: 'cx', text: "317-555-0148 and linda.harris@gmail.com", time: '10:49 AM' },
    { from: 'ai', text: "Thank you Linda! This looks like a strong fit. A care coordinator will call within the hour to schedule your free in-home assessment. 💚", time: '10:49 AM' },
  ],
  2: [
    { from: 'ai', text: "Hi! I'm the CareConnect intake assistant. How can we help your family today?", time: '10:34 AM' },
    { from: 'cx', text: "My grandmother needs help. She's 84 and lives alone - we're in Ohio and can't be there every day.", time: '10:36 AM' },
    { from: 'ai', text: "I understand - that's a stressful situation. What city is she in and what kind of help does she need most?", time: '10:36 AM' },
    { from: 'cx', text: "She's in Carmel. Needs companionship mainly, and help with meals and getting around the house.", time: '10:38 AM' },
    { from: 'ai', text: "Carmel is in our coverage area. How many days per week are you thinking, and how will services be paid for?", time: '10:38 AM' },
    { from: 'cx', text: "Probably 4–5 days. She has a long-term care insurance policy.", time: '10:39 AM' },
    { from: 'ai', text: "Long-term care insurance works great with us. We'll verify benefits before the assessment. What's the best way to reach you?", time: '10:39 AM' },
  ],
  3: [
    { from: 'ai', text: "Hi! I'm the CareConnect intake assistant. How can we help today?", time: '10:27 AM' },
    { from: 'cx', text: "I'm calling for my dad - he's a veteran. He needs care after a fall and I was told you work with VA benefits.", time: '10:28 AM' },
    { from: 'ai', text: "Yes, we're VA-approved! How old is your father and what city is he in?", time: '10:28 AM' },
    { from: 'cx', text: "He's 71 and in Fishers. He fell last week and needs help right away.", time: '10:29 AM' },
    { from: 'ai', text: "Flagging this as URGENT - we prioritize post-fall placements. What services does he need? Personal care, mobility help, or medication reminders?", time: '10:29 AM' },
    { from: 'cx', text: "All of it - he can barely walk right now and lives alone.", time: '10:30 AM' },
    { from: 'ai', text: "Understood. We'll fast-track his VA authorization and schedule an urgent assessment within 24 hours. What's your number? 🇺🇸", time: '10:30 AM' },
  ],
  4: [
    { from: 'ai', text: "Hi! CareConnect intake assistant. How can we help your family today?", time: '10:11 AM' },
    { from: 'cx', text: "Our mother is 89 and her social worker recommended you. She was just discharged from rehab.", time: '10:13 AM' },
    { from: 'ai', text: "Post-discharge placements are our specialty. What city is she in and what level of care is she coming home to?", time: '10:13 AM' },
    { from: 'cx', text: "Noblesville. She needs full assistance - bathing, dressing, transfers, and 24-hour supervision.", time: '10:14 AM' },
    { from: 'ai', text: "That sounds like a full care plan. How soon does she need to be home and what's the payment situation - Medicaid or private pay?", time: '10:14 AM' },
    { from: 'cx', text: "She goes home Friday. She has Medicaid.", time: '10:15 AM' },
    { from: 'ai', text: "We'll move fast. I'm scheduling a priority assessment for Wednesday. Your social worker will get our care plan by Thursday. 📋", time: '10:15 AM' },
  ],
  5: [
    { from: 'ai', text: "Hi! CareConnect intake assistant. How can I help today?", time: '9:53 AM' },
    { from: 'cx', text: "Looking for care for my father-in-law. He's 76 and needs help a few days a week.", time: '9:55 AM' },
    { from: 'ai', text: "Happy to help! What city is he in and what services is he looking for?", time: '9:55 AM' },
    { from: 'cx', text: "Greenwood. He mainly needs help with meals and light housekeeping. He's pretty independent still.", time: '9:57 AM' },
    { from: 'ai', text: "That's a great fit for our companion care plan. Private pay works well for that level of service. An assessment is confirmed for next week. ✅", time: '9:57 AM' },
  ],
};

const quals = {
  1: { contact: 'Linda Harris - 317-555-0148', recipient: 'Dorothy, 78 - Indianapolis, IN', services: 'Personal Care + Cognitive Support', hours: '20–25 hrs/week', payor: 'Medicaid (Pending)', area: 'IN COVERAGE ✓', fit: 'HIGH MATCH', urgency: 'STANDARD' },
  2: { contact: 'Marcus Webb - 614-555-0267',  recipient: 'Ruth, 84 - Carmel, IN',          services: 'Companion + ADLs + Meals',         hours: '4–5 days/week',  payor: 'LTC Insurance',   area: 'IN COVERAGE ✓', fit: 'HIGH MATCH', urgency: 'STANDARD' },
  3: { contact: 'Patricia Osei - 317-555-0391', recipient: 'James, 71 - Fishers, IN',       services: 'Full Personal Care + Mobility',    hours: 'Full-time TBD',  payor: 'VA Benefits',     area: 'IN COVERAGE ✓', fit: 'HIGH MATCH', urgency: 'URGENT'   },
  4: { contact: 'Tom & Janet Riley - 765-555-0478', recipient: 'Ellen, 89 - Noblesville, IN', services: 'Full Care + 24hr Supervision',  hours: 'Full-time',      payor: 'Medicaid',        area: 'IN COVERAGE ✓', fit: 'HIGH MATCH', urgency: 'URGENT'   },
  5: { contact: 'Sandra Kim - 317-555-0523',   recipient: 'George, 76 - Greenwood, IN',     services: 'Companion + Meals + Housekeeping', hours: '2–3 days/week',  payor: 'Private Pay',     area: 'IN COVERAGE ✓', fit: 'GOOD FIT',   urgency: 'STANDARD' },
};

const pipeline = [
  { stage: 'New Lead',       color: '#64748b', bg: '#f8fafc', items: [{ name: 'L. Harris', detail: 'Personal Care', time: '3 min' }, { name: 'D. Thomas', detail: 'Companion', time: '7 min' }] },
  { stage: 'Qualified',      color: '#0d7a5f', bg: '#f0fdf8', items: [{ name: 'P. Osei', detail: 'VA Benefits', time: '18 min' }, { name: 'M. Webb', detail: 'LTC Ins.', time: '11 min' }] },
  { stage: 'Assessment Set', color: '#0891b2', bg: '#f0f9ff', items: [{ name: 'Ellen R.', detail: 'Friday 2pm', time: 'Noblesville' }, { name: 'Ruth W.', detail: 'Today 4:30', time: 'Carmel' }] },
  { stage: 'Start of Care',  color: '#8b5cf6', bg: '#faf5ff', items: [{ name: 'D. Peterson', detail: 'Starts Mon', time: 'Medicaid' }, { name: 'K. Brown', detail: 'Starts Wed', time: 'Private' }] },
  { stage: 'Active Client',  color: '#22c55e', bg: '#f0fdf4', items: [{ name: 'R. Johnson', detail: '24 hrs/wk', time: 'Active' }, { name: 'M. Davis', detail: '20 hrs/wk', time: 'Active' }, { name: 'P. Taylor', detail: '16 hrs/wk', time: 'Active' }, { name: 'H. Garcia', detail: '28 hrs/wk', time: 'Active' }] },
];

const todayAssessments = [
  { time: '2:00 PM', name: 'Dorothy H.',  city: 'Indianapolis', services: 'Personal Care',  coordinator: 'Tanya R.', confirmed: true  },
  { time: '4:30 PM', name: 'Ruth W.',     city: 'Carmel',       services: 'ADLs + Meals',   coordinator: 'Mike S.',  confirmed: true  },
  { time: '5:30 PM', name: 'Carl T.',     city: 'Avon',         services: 'Companion Care', coordinator: 'Tanya R.', confirmed: false },
];

const tmrAssessments = [
  { time: '10:00 AM', name: 'Ellen R.',   city: 'Noblesville',  services: 'Full Assessment', coordinator: 'Lisa P.', confirmed: true  },
  { time: '1:30 PM',  name: 'George K.',  city: 'Greenwood',    services: 'ADLs + Meals',    coordinator: 'Mike S.', confirmed: true  },
  { time: '3:00 PM',  name: 'James O.',   city: 'Fishers',      services: 'Post-Fall Care',  coordinator: 'Lisa P.', confirmed: false },
];

const initNotifs = [
  { id: 1, dot: '#ef4444', text: 'New inquiry - Linda Harris | Personal Care | Indianapolis, IN',             time: '3 min ago'  },
  { id: 2, dot: '#22c55e', text: 'Assessment booked - Dorothy H. confirmed for 2:00 PM today',               time: '5 min ago'  },
  { id: 3, dot: '#f97316', text: 'URGENT care request - Patricia Osei | Veteran, post-fall | Fishers, IN',   time: '9 min ago'  },
  { id: 4, dot: '#22c55e', text: 'Assessment booked - Ruth W. confirmed for 4:30 PM today',                  time: '14 min ago' },
  { id: 5, dot: '#0891b2', text: 'New private pay lead - Sandra Kim | Greenwood, IN',                        time: '22 min ago' },
];

const newLeadQueue = [
  { id: 6, family: 'Rachel Monroe', phone: '317-555-0601', recipient: 'Helen, 82', city: 'Plainfield, IN', source: 'Referral', time: 'Just now', status: 'new', urgent: false },
];
const newNotifQueue = [
  { id: 6, dot: '#ef4444', text: 'New inquiry - Rachel Monroe | Helen, 82 | Plainfield, IN', time: 'Just now' },
];

export default function CareFlow() {
  const [leads, setLeads]           = useState(initialLeads);
  const [selected, setSelected]     = useState(1);
  const [notifs, setNotifs]         = useState(initNotifs);
  const [kpi, setKpi]               = useState({ leads: 0, assessments: 0, privatePay: 0, missed: 0 });
  const [newLeadIdx, setNewLeadIdx] = useState(0);
  const [newNotifIdx, setNewNotifIdx] = useState(0);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [workflowSteps, setWorkflowSteps] = useState([]);
  const [workflowKpi, setWorkflowKpi] = useState({ assessments: 5 });
  const chatRef = useRef(null);
  const workflowChatRef = useRef(null);

  useEffect(() => {
    const targets = { leads: 12, assessments: 5, privatePay: 4, missed: 8 };
    const steps = 40; let i = 0;
    const t = setInterval(() => {
      i++; const p = i / steps;
      setKpi({ leads: Math.round(targets.leads * p), assessments: Math.round(targets.assessments * p), privatePay: Math.round(targets.privatePay * p), missed: Math.round(targets.missed * p) });
      if (i >= steps) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (newLeadIdx >= newLeadQueue.length) return;
    const t = setTimeout(() => { setLeads(prev => [newLeadQueue[newLeadIdx], ...prev]); setNewLeadIdx(i => i + 1); }, 10000);
    return () => clearTimeout(t);
  }, [newLeadIdx]);

  useEffect(() => {
    if (newNotifIdx >= newNotifQueue.length) return;
    const t = setTimeout(() => { setNotifs(prev => [newNotifQueue[newNotifIdx], ...prev.slice(0, 7)]); setNewNotifIdx(i => i + 1); }, 12000);
    return () => clearTimeout(t);
  }, [newNotifIdx]);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [selected]);

  useEffect(() => {
    if (!showWorkflow) return;
    const steps = [
      { delay: 500, side: 'left', type: 'system', text: 'Incoming inquiry from Linda Harris' },
      { delay: 2500, side: 'left', type: 'ai', text: 'Hi! I\'m the CareConnect intake assistant. How can we help?' },
      { delay: 4500, side: 'left', type: 'cx', text: 'My mother needs home care - she\'s 78' },
      { delay: 6500, side: 'left', type: 'ai', text: 'What services does she need?' },
      { delay: 8500, side: 'left', type: 'cx', text: 'Bathing, dressing, and someone patient for her confusion' },
      { delay: 10500, side: 'left', type: 'ai', text: 'Great fit for our services. Booking a free assessment now ✓' },
      { delay: 11000, side: 'right', type: 'metric', key: 'assessments', value: 5 },
      { delay: 11200, side: 'right', type: 'appointment', time: 'Tomorrow 10 AM', service: 'In-Home Assessment' },
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
  const statusColor = { new: '#64748b', qualified: '#0d7a5f', assessment: '#0891b2', completed: '#22c55e' };
  const statusLabel = { new: 'New', qualified: 'Qualified', assessment: 'Scheduled', completed: 'Done' };
  const urgencyColor = { URGENT: '#ef4444', STANDARD: '#22c55e' };

  return (
    <>
      <Head>
        <title>CareFlow AI - Comfort at Home Care</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 14px; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f0fdf8; color: #1e293b; min-height: 100vh; }
        .cf-header { background: #0a2318; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; box-shadow: 0 1px 0 rgba(255,255,255,0.05); }
        .cf-logo { display: flex; align-items: center; gap: 10px; }
        .cf-logo-icon { width: 32px; height: 32px; background: linear-gradient(135deg, #0d7a5f, #059669); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .cf-logo-text { font-size: 15px; font-weight: 700; color: white; }
        .cf-logo-text span { color: #34d399; }
        .cf-client { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 5px 12px; color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 500; }
        .cf-right { display: flex; align-items: center; gap: 12px; }
        .live-badge { display: flex; align-items: center; gap: 5px; background: #052e16; border: 1px solid #16a34a; color: #4ade80; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.05em; }
        .live-dot { width: 6px; height: 6px; background: #4ade80; border-radius: 50%; animation: lp 2s infinite; }
        @keyframes lp { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        .user-chip { width: 32px; height: 32px; background: #0d7a5f; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; }
        .cf-body { padding: 20px; max-width: 1440px; margin: 0 auto; }
        .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px; }
        .kpi-card { background: white; border-radius: 12px; padding: 18px 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); display: flex; align-items: center; gap: 14px; border-left: 3px solid transparent; }
        .kpi-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .kpi-value { font-size: 26px; font-weight: 800; line-height: 1; }
        .kpi-label { font-size: 12px; color: #64748b; margin-top: 3px; }
        .kpi-sub   { font-size: 11px; color: #94a3b8; margin-top: 2px; }
        .main-grid { display: grid; grid-template-columns: 340px 1fr; gap: 16px; margin-bottom: 16px; }
        .panel { background: white; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); overflow: hidden; }
        .panel-header { padding: 14px 16px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; }
        .panel-title { font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.06em; }
        .panel-badge { background: #dcfce7; color: #166534; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
        .leads-list { overflow-y: auto; max-height: 420px; }
        .lead-row { padding: 12px 16px; border-bottom: 1px solid #f8fafc; cursor: pointer; transition: background 0.15s; }
        .lead-row:hover { background: #f8fafc; }
        .lead-row.active { background: #f0fdf8; border-left: 3px solid #0d7a5f; }
        .lead-row.new-anim { animation: sld 0.4s ease-out; }
        @keyframes sld { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .lr-top { display: flex; align-items: center; justify-content: space-between; }
        .lr-family { font-size: 13.5px; font-weight: 700; color: #0f172a; }
        .lr-phone  { font-size: 11.5px; color: #94a3b8; margin-top: 1px; }
        .lr-mid { font-size: 12px; color: #0d7a5f; font-weight: 600; margin-top: 3px; }
        .lr-bot { display: flex; justify-content: space-between; margin-top: 3px; }
        .lr-city { font-size: 11px; color: #64748b; }
        .lr-src  { font-size: 11px; color: #94a3b8; }
        .lr-time { font-size: 11px; color: #94a3b8; }
        .status-pill { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; color: white; }
        .new-badge { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; background: #fef2f2; color: #ef4444; border: 1px solid #fca5a5; animation: np 1.5s infinite; }
        @keyframes np { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
        .urgent-badge { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; background: #fff7ed; color: #f97316; border: 1px solid #fed7aa; }
        .response-panel { display: flex; flex-direction: column; }
        .response-top { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 16px; }
        .chat-col { display: flex; flex-direction: column; gap: 10px; }
        .chat-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 4px; }
        .chat-box { background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; padding: 14px; height: 320px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
        .msg { display: flex; flex-direction: column; gap: 2px; }
        .msg.ai { align-items: flex-start; }
        .msg.cx { align-items: flex-end; }
        .msg-bubble { max-width: 85%; padding: 9px 13px; border-radius: 14px; font-size: 13px; line-height: 1.5; animation: bi 0.25s ease-out; }
        @keyframes bi { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .msg.ai .msg-bubble { background: white; color: #1e293b; border-bottom-left-radius: 3px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .msg.cx .msg-bubble { background: #0d7a5f; color: white; border-bottom-right-radius: 3px; }
        .msg-meta   { font-size: 10.5px; color: #94a3b8; padding: 0 4px; }
        .msg-sender { font-size: 10.5px; font-weight: 600; color: #64748b; padding: 0 4px; }
        .ai-lbl { color: #0d7a5f; }
        .qual-col { display: flex; flex-direction: column; gap: 10px; }
        .qual-card { background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }
        .qual-head { background: #0a2318; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; }
        .qual-head span { color: white; font-size: 12.5px; font-weight: 600; }
        .outcome-badge { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 20px; color: white; background: #0d7a5f; }
        .qual-rows { padding: 14px 16px; display: flex; flex-direction: column; gap: 10px; }
        .qual-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
        .ql { font-size: 11px; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; flex-shrink: 0; }
        .qv { font-size: 13px; color: #0f172a; font-weight: 600; text-align: right; }
        .qdiv { height: 1px; background: #f1f5f9; }
        .fit-tag { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
        .urgency-tag { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; color: white; }
        .pipeline-wrap { margin-bottom: 16px; }
        .pipeline-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        .pipe-col { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
        .pipe-head { padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; }
        .pipe-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
        .pipe-count { font-size: 11px; font-weight: 700; padding: 1px 7px; border-radius: 20px; }
        .pipe-items { padding: 8px 10px; display: flex; flex-direction: column; gap: 8px; min-height: 80px; }
        .pipe-card { background: #f8fafc; border-radius: 6px; padding: 8px 10px; border: 1px solid #e2e8f0; }
        .pipe-name    { font-size: 12px; font-weight: 600; color: #0f172a; }
        .pipe-detail  { font-size: 11px; color: #64748b; }
        .pipe-time    { font-size: 10.5px; color: #94a3b8; margin-top: 2px; }
        .bottom-grid { display: grid; grid-template-columns: 1fr 380px; gap: 16px; }
        .bookings-inner { padding: 0 16px 16px; }
        .book-section { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #94a3b8; margin: 14px 0 10px; }
        .book-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f8fafc; }
        .book-time { font-size: 13px; font-weight: 700; color: #0f172a; width: 60px; flex-shrink: 0; }
        .book-info { flex: 1; }
        .book-name   { font-size: 13px; font-weight: 600; color: #0f172a; }
        .book-detail { font-size: 11.5px; color: #64748b; margin-top: 1px; }
        .book-coord  { font-size: 11px; color: #94a3b8; }
        .conf-pill { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
        .notif-list { padding: 0 16px 16px; display: flex; flex-direction: column; gap: 1px; overflow-y: auto; max-height: 360px; }
        .notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f8fafc; animation: sld 0.3s ease-out; }
        .notif-dot  { width: 8px; height: 8px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }
        .notif-text { font-size: 12.5px; color: #1e293b; line-height: 1.4; flex: 1; }
        .notif-time { font-size: 11px; color: #94a3b8; flex-shrink: 0; margin-top: 1px; }
        @media (max-width: 1100px) { .kpi-row { grid-template-columns: repeat(2,1fr); } .main-grid { grid-template-columns: 1fr; } .pipeline-grid { grid-template-columns: repeat(3,1fr); } .bottom-grid { grid-template-columns: 1fr; } }
        @media (max-width: 640px)  { .cf-body { padding: 12px; } .kpi-row { grid-template-columns: repeat(2,1fr); gap: 10px; } .pipeline-grid { grid-template-columns: repeat(2,1fr); } .response-top { grid-template-columns: 1fr; } .cf-client { display: none; } }
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
        .workflow-metric-value { font-size: 24px; font-weight: 700; color: #0d7a5f; }
        .workflow-metric-label { font-size: 12px; color: #64748b; }
        .workflow-appointment { padding: 14px; background: #f0fdf4; border-left: 3px solid #22c55e; border-radius: 6px; animation: msgSlide 0.3s ease-out; }
        .workflow-appointment-time { font-size: 13px; font-weight: 700; color: #22c55e; }
        .workflow-appointment-service { font-size: 12px; color: #64748b; margin-top: 4px; }
        .workflow-complete { text-align: center; padding: 20px; color: #22c55e; font-size: 16px; font-weight: 700; animation: msgSlide 0.5s ease-out; }
        @media (max-width: 768px) { .workflow-container { grid-template-columns: 1fr; height: auto; max-height: 80vh; } .workflow-left { border-right: none; border-bottom: 1px solid #e2e8f0; } }
      `}</style>

      <header className="cf-header">
        <div className="cf-logo">
          <div className="cf-logo-icon">🏠</div>
          <div className="cf-logo-text">Care<span>Flow</span> AI</div>
        </div>
        <div className="cf-client">Comfort at Home Care - Indianapolis, IN</div>
        <div className="cf-right">
          <div className="live-badge"><div className="live-dot" /> LIVE</div>
          <div className="user-chip">CH</div>
        </div>
      </header>

      <div className="cf-body">
        {/* Above Demo CTA */}
        <div style={{ background: '#f0fdf8', border: '1px solid #d1fae5', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#0d7a5f', marginBottom: '6px' }}>See AI in Action</div>
          <div style={{ fontSize: '14px', color: '#047857', marginBottom: '16px' }}>Watch how AI captures family inquiries, qualifies leads, and books assessments automatically-in real time.</div>
          <button
            onClick={() => setShowWorkflow(true)}
            style={{ background: '#0d7a5f', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = '#0a5a4a'}
            onMouseLeave={(e) => e.target.style.background = '#0d7a5f'}
          >
            ▶ Start Live Workflow Demo
          </button>
        </div>
        {/* Revenue Impact Card */}
        <div style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf8 100%)', border: '2px solid #0d7a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0d7a5f', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>💰 Revenue Impact (Daily)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #d1fae5' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#0d7a5f', marginBottom: '4px' }}>12</div>
              <div style={{ fontSize: '12px', color: '#047857' }}>Leads Captured</div>
            </div>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #d1fae5' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#0d7a5f', marginBottom: '4px' }}>5</div>
              <div style={{ fontSize: '12px', color: '#047857' }}>Assessments Booked</div>
            </div>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #d1fae5' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#0d7a5f', marginBottom: '4px' }}>$8,400</div>
              <div style={{ fontSize: '12px', color: '#047857' }}>Monthly Opportunity</div>
            </div>
          </div>
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
                  {workflowSteps.find(s => s.type === 'metric') && <div className="workflow-metric"><div className="workflow-metric-icon">📅</div><div><div className="workflow-metric-value">{workflowKpi.assessments}</div><div className="workflow-metric-label">Assessments Booked Today</div></div></div>}
                  {workflowSteps.find(s => s.type === 'appointment') && <div><div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>Schedule Updated:</div><div className="workflow-appointment"><div className="workflow-appointment-time">Tomorrow 10 AM</div><div className="workflow-appointment-service">In-Home Assessment</div></div></div>}
                  {workflowSteps.find(s => s.type === 'complete') && <div className="workflow-complete">✓ Automation Complete</div>}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* KPIs */}
        <div className="kpi-row">
          {[
            { icon: '📥', color: '#0d7a5f', bg: '#f0fdf8', val: kpi.leads,       label: 'Leads Today',        sub: 'Family inquiries' },
            { icon: '📅', color: '#0891b2', bg: '#f0f9ff', val: kpi.assessments, label: 'Assessments Booked', sub: 'Confirmed today'  },
            { icon: '💳', color: '#8b5cf6', bg: '#faf5ff', val: kpi.privatePay,  label: 'Private Pay Leads',  sub: 'High value'       },
            { icon: '📞', color: '#f97316', bg: '#fff7ed', val: kpi.missed,      label: 'Missed Calls Saved', sub: 'Would be lost'    },
          ].map((k, i) => (
            <div key={i} className="kpi-card" style={{ borderLeftColor: k.color }}>
              <div className="kpi-icon" style={{ background: k.bg }}>{k.icon}</div>
              <div>
                <div className="kpi-value" style={{ color: k.color }}>{k.val}</div>
                <div className="kpi-label">{k.label}</div>
                <div className="kpi-sub">{k.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="main-grid">
          {/* Leads Feed */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">New Inquiries</span>
              <span className="panel-badge">{leads.length} Today</span>
            </div>
            <div className="leads-list">
              {leads.map(l => (
                <div key={l.id} className={`lead-row ${selected === l.id ? 'active' : ''} ${l.status === 'new' ? 'new-anim' : ''}`} onClick={() => setSelected(l.id)}>
                  <div className="lr-top">
                    <div>
                      <div className="lr-family">{l.family}</div>
                      <div className="lr-phone">{l.phone}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                      {l.status === 'new'
                        ? <span className="new-badge">● NEW</span>
                        : <span className="status-pill" style={{ background: statusColor[l.status] }}>{statusLabel[l.status]}</span>}
                      {l.urgent && <span className="urgent-badge">🚨 Urgent</span>}
                    </div>
                  </div>
                  <div className="lr-mid">For: {l.recipient}</div>
                  <div className="lr-bot">
                    <span className="lr-city">{l.city}</span>
                    <span className="lr-src">{l.source}</span>
                    <span className="lr-time">{l.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Panel */}
          <div className="panel response-panel">
            <div className="panel-header">
              <span className="panel-title">AI Intake Chat</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>Viewing: <strong>{leads.find(l => l.id === selected)?.family}</strong></span>
            </div>
            <div className="response-top">
              <div className="chat-col">
                <div className="chat-label">Intake Conversation</div>
                <div className="chat-box" ref={chatRef}>
                  {convo.map((m, i) => (
                    <div key={i} className={`msg ${m.from}`}>
                      <div className="msg-sender">{m.from === 'ai' ? <span className="ai-lbl">CareFlow AI</span> : leads.find(l => l.id === selected)?.family}</div>
                      <div className="msg-bubble">{m.text}</div>
                      <div className="msg-meta">{m.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {qual && (
                <div className="qual-col">
                  <div className="chat-label">Qualification Panel</div>
                  <div className="qual-card">
                    <div className="qual-head">
                      <span>📋 Intake Summary</span>
                      <span className="outcome-badge">{qual.fit === 'HIGH MATCH' ? 'HIGH MATCH ✓' : 'GOOD FIT ✓'}</span>
                    </div>
                    <div className="qual-rows">
                      {[
                        { l: 'Contact',     v: qual.contact },
                        { l: 'Recipient',   v: qual.recipient },
                        { l: 'Services',    v: qual.services },
                        { l: 'Hours/Week',  v: qual.hours },
                        { l: 'Payor Type',  v: qual.payor },
                        { l: 'Service Area', v: qual.area, green: true },
                        { l: 'Urgency',     v: qual.urgency, urgency: true },
                      ].map((r, i) => (
                        <div key={i}>
                          {i > 0 && <div className="qdiv" />}
                          <div className="qual-row">
                            <span className="ql">{r.l}</span>
                            {r.urgency
                              ? <span className="urgency-tag" style={{ background: urgencyColor[r.v] }}>{r.v}</span>
                              : <span className="qv" style={r.green ? { color: '#16a34a' } : {}}>{r.v}</span>}
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

        {/* Pipeline */}
        <div className="pipeline-wrap">
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Care Pipeline</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>Live - updates automatically</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div className="pipeline-grid">
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
                          <div className="pipe-detail">{item.detail}</div>
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

        {/* Bottom */}
        <div className="bottom-grid">
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Assessment Calendar</span>
              <span className="panel-badge">{todayAssessments.length + tmrAssessments.length} Scheduled</span>
            </div>
            <div className="bookings-inner">
              <div className="book-section">Today</div>
              {todayAssessments.map((b, i) => (
                <div key={i} className="book-item">
                  <div className="book-time">{b.time}</div>
                  <div className="book-info">
                    <div className="book-name">{b.name}</div>
                    <div className="book-detail">{b.services} · {b.city}</div>
                    <div className="book-coord">Coordinator: {b.coordinator}</div>
                  </div>
                  <span className="conf-pill" style={b.confirmed ? { background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' } : { background: '#fff7ed', color: '#f97316', border: '1px solid #fed7aa' }}>{b.confirmed ? 'Confirmed' : 'Pending'}</span>
                </div>
              ))}
              <div className="book-section">Tomorrow</div>
              {tmrAssessments.map((b, i) => (
                <div key={i} className="book-item">
                  <div className="book-time">{b.time}</div>
                  <div className="book-info">
                    <div className="book-name">{b.name}</div>
                    <div className="book-detail">{b.services} · {b.city}</div>
                    <div className="book-coord">Coordinator: {b.coordinator}</div>
                  </div>
                  <span className="conf-pill" style={b.confirmed ? { background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' } : { background: '#fff7ed', color: '#f97316', border: '1px solid #fed7aa' }}>{b.confirmed ? 'Confirmed' : 'Pending'}</span>
                </div>
              ))}
            </div>
          </div>

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
        <div style={{ background: 'linear-gradient(135deg, #f0fdf8 0%, #ecfdf5 100%)', border: '1px solid #d1fae5', borderRadius: '12px', padding: '32px 24px', marginTop: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#0d7a5f', marginBottom: '8px' }}>Ready to Automate Your Intake Process?</div>
          <div style={{ fontSize: '14px', color: '#047857', marginBottom: '20px', lineHeight: '1.5' }}>This demo shows what's possible with AI. Get a customized system built for your agency's unique workflows and requirements.</div>
          <a href="https://calendly.com/kimmycombs" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#0d7a5f', color: 'white', border: 'none', padding: '14px 36px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', textDecoration: 'none', transition: 'background 0.2s' }} onMouseEnter={(e) => e.target.style.background = '#0a5a4a'} onMouseLeave={(e) => e.target.style.background = '#0d7a5f'}>📅 Book a Free Strategy Call</a>
        </div>
      </div>
    </>
  );
}
