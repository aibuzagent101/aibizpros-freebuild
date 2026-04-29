import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

const initialLeads = [
  { id: 1, name: 'James Carter',   phone: '312-555-0134', type: 'Car Accident',      date: 'Yesterday',  state: 'Illinois', source: 'Google Ad',  time: '4 min ago',  status: 'priority', hot: true  },
  { id: 2, name: 'Maria Santos',   phone: '708-555-0287', type: 'Slip & Fall',        date: '3 days ago', state: 'Illinois', source: 'Referral',   time: '12 min ago', status: 'review',   hot: false },
  { id: 3, name: 'Robert Chen',    phone: '312-555-0391', type: 'Truck Accident',     date: '1 week ago', state: 'Illinois', source: 'Website',    time: '20 min ago', status: 'consult',  hot: true  },
  { id: 4, name: 'Amanda Brooks',  phone: '847-555-0156', type: 'Work Injury',        date: '2 wks ago',  state: 'Illinois', source: 'Facebook Ad',time: '38 min ago', status: 'review',   hot: false },
  { id: 5, name: 'Kevin Park',     phone: '773-555-0448', type: 'Motorcycle Accident',date: 'Yesterday',  state: 'Illinois', source: 'Google Ad',  time: '55 min ago', status: 'consult',  hot: false },
];

const convos = {
  1: [
    { from: 'ai', text: "Hi! I'm the CaseFlow intake assistant at Rivera & Associates. I'll help determine if you have a strong case. What type of accident were you in?", time: '2:11 PM' },
    { from: 'cx', text: "I was rear-ended at a stoplight yesterday. The other driver ran a red light.", time: '2:13 PM' },
    { from: 'ai', text: "I'm sorry to hear that. Have you received any medical treatment for your injuries?", time: '2:13 PM' },
    { from: 'cx', text: "Yes, went to the ER last night. Back and neck pain. They took X-rays.", time: '2:14 PM' },
    { from: 'ai', text: "Important to document all of that. Was a police report filed at the scene?", time: '2:14 PM' },
    { from: 'cx', text: "Yes, the officer came and filed a report. I have the report number.", time: '2:15 PM' },
    { from: 'ai', text: "Strong documentation. Has the other driver's insurance contacted you yet?", time: '2:15 PM' },
    { from: 'cx', text: "Yes, they called me this morning asking for a recorded statement.", time: '2:16 PM' },
    { from: 'ai', text: "Do NOT give them a statement before speaking with our attorney. Have you hired anyone else yet?", time: '2:16 PM' },
    { from: 'cx', text: "No, I was going to call around today.", time: '2:17 PM' },
    { from: 'ai', text: "Good timing. Clear liability, ER treatment, police report - this is a strong case. Attorney James Rivera will call you within 30 minutes. ⚖️", time: '2:17 PM' },
  ],
  2: [
    { from: 'ai', text: "Hi! CaseFlow intake assistant at Rivera & Associates. What type of accident or injury are you calling about?", time: '2:03 PM' },
    { from: 'cx', text: "I slipped and fell at a grocery store 3 days ago. My ankle is fractured.", time: '2:05 PM' },
    { from: 'ai', text: "I'm sorry to hear that. Did the store have any wet floor signs posted where you fell?", time: '2:05 PM' },
    { from: 'cx', text: "No signs at all. I have photos from right after it happened.", time: '2:06 PM' },
    { from: 'ai', text: "Photos are excellent evidence. Did you file an incident report with the store?", time: '2:06 PM' },
    { from: 'cx', text: "Yes, the manager filled one out and gave me a copy.", time: '2:07 PM' },
    { from: 'ai', text: "Very strong documentation. Were there any witnesses?", time: '2:07 PM' },
    { from: 'cx', text: "Yes, two other shoppers helped me. I got one of their phone numbers.", time: '2:08 PM' },
    { from: 'ai', text: "Excellent. One of our slip and fall attorneys will review your case and call within 2 hours. 📋", time: '2:08 PM' },
  ],
  3: [
    { from: 'ai', text: "Hi! CaseFlow intake assistant. What type of accident are you calling about?", time: '1:55 PM' },
    { from: 'cx', text: "I was hit by an 18-wheeler a week ago. I'm still in the hospital.", time: '1:57 PM' },
    { from: 'ai', text: "I'm so sorry - we'll make sure you have expert representation. What injuries did you sustain?", time: '1:57 PM' },
    { from: 'cx', text: "Broken leg, two broken ribs, and a concussion. I'll need surgery.", time: '1:58 PM' },
    { from: 'ai', text: "This is a serious case - trucking accidents often involve significant compensation. Has the trucking company contacted you?", time: '1:58 PM' },
    { from: 'cx', text: "Their insurance company called my wife asking her to sign something.", time: '1:59 PM' },
    { from: 'ai', text: "Do not sign anything. I'm flagging this as HIGH VALUE - Attorney Rivera will call within 15 minutes. We handle everything while you recover. 🚨", time: '1:59 PM' },
  ],
  4: [
    { from: 'ai', text: "Hi! CaseFlow intake assistant. What type of injury or accident are you calling about?", time: '1:37 PM' },
    { from: 'cx', text: "I hurt my back at work 2 weeks ago. They're saying it's not that serious but I can barely move.", time: '1:39 PM' },
    { from: 'ai', text: "Did you report the injury to your employer the same day it happened?", time: '1:39 PM' },
    { from: 'cx', text: "Yes, I filled out an incident report and HR has a copy.", time: '1:40 PM' },
    { from: 'ai', text: "Good. Have you seen a doctor and do you have medical documentation?", time: '1:40 PM' },
    { from: 'cx', text: "I saw the company doctor. They said minor strain but I'm in a lot of pain.", time: '1:41 PM' },
    { from: 'ai', text: "We recommend getting an independent evaluation. An attorney will call to walk you through your options. ⚖️", time: '1:41 PM' },
  ],
  5: [
    { from: 'ai', text: "Hi! CaseFlow intake assistant at Rivera & Associates. What type of accident are you calling about?", time: '1:20 PM' },
    { from: 'cx', text: "Motorcycle accident yesterday. Car turned left in front of me.", time: '1:22 PM' },
    { from: 'ai', text: "Were you injured and did police respond to the scene?", time: '1:22 PM' },
    { from: 'cx', text: "Road rash and a sprained wrist. Police came and filed a report.", time: '1:23 PM' },
    { from: 'ai', text: "Police report is key. Do you have photos of the accident scene and your injuries?", time: '1:23 PM' },
    { from: 'cx', text: "Yes, took photos at the scene and went to urgent care.", time: '1:24 PM' },
    { from: 'ai', text: "Great documentation. An attorney will call today to evaluate your case and advise on next steps. 🏍️", time: '1:24 PM' },
  ],
};

const quals = {
  1: { type: 'Rear-End Collision',     injury: 'Back & Neck - ER Treated', police: 'Yes - Report Filed', insurance: 'Calling for Statement', hired: 'No', urgency: 'HIGH', priority: 'HIGH VALUE', status: 'Consult Booked' },
  2: { type: 'Slip & Fall',            injury: 'Fractured Ankle', police: 'Incident Report Filed', insurance: 'Not Yet', hired: 'No', urgency: 'STANDARD', priority: 'NEEDS REVIEW', status: 'In Progress' },
  3: { type: 'Commercial Truck Accident', injury: 'Broken Leg, Ribs, Concussion', police: 'Yes - Filed', insurance: 'Pushing for Settlement', hired: 'No', urgency: 'HIGH', priority: 'HIGH VALUE', status: 'Priority Review' },
  4: { type: 'Workplace Injury',       injury: 'Back Injury (Independent Eval Needed)', police: 'HR Incident Report', insurance: 'Workers Comp', hired: 'No', urgency: 'STANDARD', priority: 'NEEDS REVIEW', status: 'In Progress' },
  5: { type: 'Motorcycle Accident',    injury: 'Road Rash + Sprained Wrist', police: 'Yes - Filed', insurance: 'Pending', hired: 'No', urgency: 'STANDARD', priority: 'NEEDS REVIEW', status: 'In Progress' },
};

const pipeline = [
  { stage: 'New Lead',    color: '#64748b', bg: '#f8fafc', items: [{ name: 'D. Wilson', detail: 'Car Accident', time: '6 min ago' }, { name: 'P. Torres', detail: 'Slip & Fall', time: '14 min ago' }] },
  { stage: 'Qualified',   color: '#2563eb', bg: '#eff6ff', items: [{ name: 'James C.', detail: 'Car Accident', time: '4 min ago' }, { name: 'Maria S.',  detail: 'Slip & Fall', time: '12 min ago' }] },
  { stage: 'Consult Set', color: '#8b5cf6', bg: '#faf5ff', items: [{ name: 'Robert C.', detail: '2 PM Today', time: 'Truck Acc.' }, { name: 'Kevin P.',  detail: '4 PM Today', time: 'Motorcycle' }] },
  { stage: 'Signed',      color: '#22c55e', bg: '#f0fdf4', items: [{ name: 'S. Johnson', detail: 'Signed Today', time: 'Car Acc.' }, { name: 'M. Evans',  detail: 'Signed Today', time: 'Work Inj.' }] },
  { stage: 'Active Case', color: '#0ea5e9', bg: '#f0f9ff', items: [{ name: 'L. Garcia',  detail: 'Depo Set', time: 'Truck Acc.' }, { name: 'T. Brown',   detail: 'Settlement', time: 'Slip & Fall' }, { name: 'R. Davis',  detail: 'Discovery', time: 'Car Acc.' }, { name: 'A. Kim',    detail: 'Demand Ltr', time: 'Moto Acc.' }] },
];

const todayConsults = [
  { time: '2:00 PM', name: 'James Carter',  type: 'Car Accident',       format: 'Phone Consult', atty: 'J. Rivera', confirmed: true  },
  { time: '4:00 PM', name: 'Robert Chen',   type: 'Truck Accident',     format: 'Video Call',    atty: 'J. Rivera', confirmed: true  },
  { time: '5:00 PM', name: 'Maria Santos',  type: 'Slip & Fall',        format: 'In Person',     atty: 'A. Lopez',  confirmed: false },
];

const tmrConsults = [
  { time: '10:00 AM', name: 'Kevin Park',   type: 'Motorcycle Accident', format: 'Phone Consult', atty: 'J. Rivera', confirmed: true  },
  { time: '1:00 PM',  name: 'Amanda Brooks',type: 'Work Injury',         format: 'Video Call',    atty: 'A. Lopez',  confirmed: true  },
  { time: '3:00 PM',  name: 'D. Wilson',    type: 'Car Accident',        format: 'Phone Consult', atty: 'J. Rivera', confirmed: false },
];

const initNotifs = [
  { id: 1, dot: '#ef4444', text: 'New lead - James Carter | Car Accident | Chicago, IL',                    time: '4 min ago'  },
  { id: 2, dot: '#8b5cf6', text: 'HIGH VALUE - Robert Chen | Truck Accident | Est. $80K+',                  time: '8 min ago'  },
  { id: 3, dot: '#22c55e', text: 'Consultation booked - James Carter confirmed for 2:00 PM today',           time: '10 min ago' },
  { id: 4, dot: '#ef4444', text: 'URGENT - James Carter: insurance requesting recorded statement',            time: '12 min ago' },
  { id: 5, dot: '#2563eb', text: 'New lead - Kevin Park | Motorcycle Accident | Chicago, IL',               time: '18 min ago' },
];

const newLeadQueue = [
  { id: 6, name: 'Denise Wilson', phone: '312-555-0612', type: 'Pedestrian Hit', date: 'Today', state: 'Illinois', source: 'Google Ad', time: 'Just now', status: 'new', hot: true },
];
const newNotifQueue = [
  { id: 6, dot: '#ef4444', text: 'New lead - Denise Wilson | Pedestrian Accident | HIGH PRIORITY', time: 'Just now' },
];

export default function CaseFlow() {
  const [leads, setLeads]           = useState(initialLeads);
  const [selected, setSelected]     = useState(1);
  const [notifs, setNotifs]         = useState(initNotifs);
  const [kpi, setKpi]               = useState({ leads: 0, consults: 0, highValue: 0, caseValue: 0 });
  const [newLeadIdx, setNewLeadIdx] = useState(0);
  const [newNotifIdx, setNewNotifIdx] = useState(0);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [workflowSteps, setWorkflowSteps] = useState([]);
  const [workflowKpi, setWorkflowKpi] = useState({ highValue: 4 });
  const chatRef = useRef(null);
  const workflowChatRef = useRef(null);

  useEffect(() => {
    const targets = { leads: 9, consults: 4, highValue: 3, caseValue: 285000 };
    const steps = 40; let i = 0;
    const t = setInterval(() => {
      i++; const p = i / steps;
      setKpi({ leads: Math.round(targets.leads * p), consults: Math.round(targets.consults * p), highValue: Math.round(targets.highValue * p), caseValue: Math.round(targets.caseValue * p) });
      if (i >= steps) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (newLeadIdx >= newLeadQueue.length) return;
    const t = setTimeout(() => { setLeads(prev => [newLeadQueue[newLeadIdx], ...prev]); setNewLeadIdx(i => i + 1); }, 9000);
    return () => clearTimeout(t);
  }, [newLeadIdx]);

  useEffect(() => {
    if (newNotifIdx >= newNotifQueue.length) return;
    const t = setTimeout(() => { setNotifs(prev => [newNotifQueue[newNotifIdx], ...prev.slice(0, 7)]); setNewNotifIdx(i => i + 1); }, 11000);
    return () => clearTimeout(t);
  }, [newNotifIdx]);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [selected]);

  useEffect(() => {
    if (!showWorkflow) return;
    const steps = [
      { delay: 500, side: 'left', type: 'system', text: 'New injury lead from Marcus Johnson' },
      { delay: 2500, side: 'left', type: 'ai', text: 'Hi Marcus. I\'m helping with your injury case. What happened?' },
      { delay: 4500, side: 'left', type: 'cx', text: 'Car accident. Back injury. Been getting physical therapy.' },
      { delay: 6500, side: 'left', type: 'ai', text: 'Do you have insurance coverage from the other driver?' },
      { delay: 8500, side: 'left', type: 'cx', text: 'Yes, they admitted fault' },
      { delay: 10500, side: 'left', type: 'ai', text: 'Excellent. Flagging as HIGH VALUE case. Booking your consultation ✓' },
      { delay: 11000, side: 'right', type: 'metric', key: 'highValue', value: 4 },
      { delay: 11200, side: 'right', type: 'appointment', time: 'Tomorrow 2 PM', service: 'Injury Consultation' },
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
  const statusColor = { new: '#ef4444', priority: '#8b5cf6', review: '#f97316', consult: '#22c55e', completed: '#0ea5e9' };
  const statusLabel = { new: 'New', priority: 'Priority', review: 'Review', consult: 'Consult Set', completed: 'Done' };
  const priorityColor = { 'HIGH VALUE': '#8b5cf6', 'NEEDS REVIEW': '#f97316', 'LOW FIT': '#94a3b8' };
  const urgencyColor  = { 'HIGH': '#ef4444', 'STANDARD': '#22c55e' };

  return (
    <>
      <Head>
        <title>CaseFlow AI - Rivera & Associates Law</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 14px; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f0f4ff; color: #1e293b; min-height: 100vh; }
        .cs-header { background: #0f1e3a; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; box-shadow: 0 1px 0 rgba(255,255,255,0.05); }
        .cs-logo { display: flex; align-items: center; gap: 10px; }
        .cs-logo-icon { width: 32px; height: 32px; background: linear-gradient(135deg, #2563eb, #1d4ed8); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .cs-logo-text { font-size: 15px; font-weight: 700; color: white; }
        .cs-logo-text span { color: #60a5fa; }
        .cs-client { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 5px 12px; color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 500; }
        .cs-right { display: flex; align-items: center; gap: 12px; }
        .live-badge { display: flex; align-items: center; gap: 5px; background: #1e3a5f; border: 1px solid #2563eb; color: #93c5fd; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.05em; }
        .live-dot { width: 6px; height: 6px; background: #60a5fa; border-radius: 50%; animation: lp 2s infinite; }
        @keyframes lp { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        .user-chip { width: 32px; height: 32px; background: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; }
        .cs-body { padding: 20px; max-width: 1440px; margin: 0 auto; }
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
        .panel-badge { background: #eff6ff; color: #1d4ed8; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
        .leads-list { overflow-y: auto; max-height: 420px; }
        .lead-row { padding: 12px 16px; border-bottom: 1px solid #f8fafc; cursor: pointer; transition: background 0.15s; }
        .lead-row:hover { background: #f8fafc; }
        .lead-row.active { background: #eff6ff; border-left: 3px solid #2563eb; }
        .lead-row.new-anim { animation: sld 0.4s ease-out; }
        @keyframes sld { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .lr-top { display: flex; align-items: center; justify-content: space-between; }
        .lr-name  { font-size: 13.5px; font-weight: 700; color: #0f172a; }
        .lr-phone { font-size: 11.5px; color: #94a3b8; margin-top: 1px; }
        .lr-type  { font-size: 12px; color: #2563eb; font-weight: 600; margin-top: 3px; }
        .lr-bot { display: flex; justify-content: space-between; margin-top: 3px; }
        .lr-meta { font-size: 11px; color: #64748b; }
        .lr-time { font-size: 11px; color: #94a3b8; }
        .status-pill { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; color: white; }
        .new-badge { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; background: #fef2f2; color: #ef4444; border: 1px solid #fca5a5; animation: np 1.5s infinite; }
        @keyframes np { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
        .hot-badge { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; background: #faf5ff; color: #8b5cf6; border: 1px solid #d8b4fe; }
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
        .msg.cx .msg-bubble { background: #2563eb; color: white; border-bottom-right-radius: 3px; }
        .msg-meta   { font-size: 10.5px; color: #94a3b8; padding: 0 4px; }
        .msg-sender { font-size: 10.5px; font-weight: 600; color: #64748b; padding: 0 4px; }
        .ai-lbl { color: #2563eb; }
        .qual-col { display: flex; flex-direction: column; gap: 10px; }
        .qual-card { background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }
        .qual-head { background: #0f1e3a; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; }
        .qual-head span { color: white; font-size: 12.5px; font-weight: 600; }
        .priority-badge { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 20px; color: white; }
        .qual-rows { padding: 14px 16px; display: flex; flex-direction: column; gap: 10px; }
        .qual-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
        .ql { font-size: 11px; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; flex-shrink: 0; }
        .qv { font-size: 13px; color: #0f172a; font-weight: 600; text-align: right; }
        .qdiv { height: 1px; background: #f1f5f9; }
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
        .book-time { font-size: 13px; font-weight: 700; color: #0f172a; width: 65px; flex-shrink: 0; }
        .book-info { flex: 1; }
        .book-name   { font-size: 13px; font-weight: 600; color: #0f172a; }
        .book-detail { font-size: 11.5px; color: #64748b; margin-top: 1px; }
        .book-atty   { font-size: 11px; color: #94a3b8; }
        .conf-pill { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
        .notif-list { padding: 0 16px 16px; display: flex; flex-direction: column; gap: 1px; overflow-y: auto; max-height: 360px; }
        .notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f8fafc; animation: sld 0.3s ease-out; }
        .notif-dot  { width: 8px; height: 8px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }
        .notif-text { font-size: 12.5px; color: #1e293b; line-height: 1.4; flex: 1; }
        .notif-time { font-size: 11px; color: #94a3b8; flex-shrink: 0; margin-top: 1px; }
        @media (max-width: 1100px) { .kpi-row { grid-template-columns: repeat(2,1fr); } .main-grid { grid-template-columns: 1fr; } .pipeline-grid { grid-template-columns: repeat(3,1fr); } .bottom-grid { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .cs-body { padding: 12px; } .kpi-row { grid-template-columns: repeat(2,1fr); gap: 10px; } .pipeline-grid { grid-template-columns: repeat(2,1fr); } .response-top { grid-template-columns: 1fr; } .cs-client { display: none; } }
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
        .workflow-metric-value { font-size: 24px; font-weight: 700; color: #1e3a5f; }
        .workflow-metric-label { font-size: 12px; color: #64748b; }
        .workflow-appointment { padding: 14px; background: #f0fdf4; border-left: 3px solid #22c55e; border-radius: 6px; animation: msgSlide 0.3s ease-out; }
        .workflow-appointment-time { font-size: 13px; font-weight: 700; color: #22c55e; }
        .workflow-appointment-service { font-size: 12px; color: #64748b; margin-top: 4px; }
        .workflow-complete { text-align: center; padding: 20px; color: #22c55e; font-size: 16px; font-weight: 700; animation: msgSlide 0.5s ease-out; }
        @media (max-width: 768px) { .workflow-container { grid-template-columns: 1fr; height: auto; max-height: 80vh; } .workflow-left { border-right: none; border-bottom: 1px solid #e2e8f0; } }
      `}</style>

      <header className="cs-header">
        <div className="cs-logo">
          <div className="cs-logo-icon">⚖️</div>
          <div className="cs-logo-text">Case<span>Flow</span> AI</div>
        </div>
        <div className="cs-client">Rivera & Associates Law - Chicago, IL</div>
        <div className="cs-right">
          <div className="live-badge"><div className="live-dot" /> LIVE</div>
          <div className="user-chip">RA</div>
        </div>
      </header>

      <div className="cs-body">
        {/* Above Demo CTA */}
        <div style={{ background: '#f0f4f9', border: '1px solid #c7d9ed', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#1e3a5f', marginBottom: '6px' }}>See AI in Action</div>
          <div style={{ fontSize: '14px', color: '#2d5a8c', marginBottom: '16px' }}>Watch how AI qualifies injury cases, identifies high-value leads, and books consultations automatically-in real time.</div>
          <button
            onClick={() => setShowWorkflow(true)}
            style={{ background: '#1e3a5f', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = '#152a45'}
            onMouseLeave={(e) => e.target.style.background = '#1e3a5f'}
          >
            ▶ Start Live Workflow Demo
          </button>
        </div>
        {/* Revenue Impact Card */}
        <div style={{ background: 'linear-gradient(135deg, #f0f4f9 0%, #f5f8fc 100%)', border: '2px solid #1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e3a5f', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>💰 Revenue Impact (Daily)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #c7d9ed' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e3a5f', marginBottom: '4px' }}>6</div>
              <div style={{ fontSize: '12px', color: '#2d5a8c' }}>Cases Qualified</div>
            </div>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #c7d9ed' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e3a5f', marginBottom: '4px' }}>4</div>
              <div style={{ fontSize: '12px', color: '#2d5a8c' }}>High-Value Cases</div>
            </div>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #c7d9ed' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e3a5f', marginBottom: '4px' }}>$45,000</div>
              <div style={{ fontSize: '12px', color: '#2d5a8c' }}>Monthly Pipeline Value</div>
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
                  {workflowSteps.find(s => s.type === 'metric') && <div className="workflow-metric"><div className="workflow-metric-icon">⚖️</div><div><div className="workflow-metric-value">{workflowKpi.highValue}</div><div className="workflow-metric-label">High Value Cases</div></div></div>}
                  {workflowSteps.find(s => s.type === 'appointment') && <div><div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>Schedule Updated:</div><div className="workflow-appointment"><div className="workflow-appointment-time">Tomorrow 2 PM</div><div className="workflow-appointment-service">Injury Consultation</div></div></div>}
                  {workflowSteps.find(s => s.type === 'complete') && <div className="workflow-complete">✓ Automation Complete</div>}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="kpi-row">
          {[
            { icon: '⚖️', color: '#2563eb', bg: '#eff6ff', val: kpi.leads,     label: 'Leads Today',         sub: 'Inbound inquiries' },
            { icon: '📅', color: '#22c55e', bg: '#f0fdf4', val: kpi.consults,  label: 'Consultations Booked', sub: 'Confirmed today'   },
            { icon: '🔥', color: '#8b5cf6', bg: '#faf5ff', val: kpi.highValue, label: 'High Value Cases',     sub: 'Priority review'   },
            { icon: '💰', color: '#f97316', bg: '#fff7ed', val: `$${kpi.caseValue >= 1000 ? Math.round(kpi.caseValue/1000) + 'K' : kpi.caseValue}`, label: 'Est. Case Value', sub: 'From qualified leads', noCount: true },
          ].map((k, i) => (
            <div key={i} className="kpi-card" style={{ borderLeftColor: k.color }}>
              <div className="kpi-icon" style={{ background: k.bg }}>{k.icon}</div>
              <div>
                <div className="kpi-value" style={{ color: k.color }}>{k.noCount ? k.val : k.val}</div>
                <div className="kpi-label">{k.label}</div>
                <div className="kpi-sub">{k.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="main-grid">
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">New Case Leads</span>
              <span className="panel-badge">{leads.length} Today</span>
            </div>
            <div className="leads-list">
              {leads.map(l => (
                <div key={l.id} className={`lead-row ${selected === l.id ? 'active' : ''} ${l.status === 'new' ? 'new-anim' : ''}`} onClick={() => setSelected(l.id)}>
                  <div className="lr-top">
                    <div>
                      <div className="lr-name">{l.name}</div>
                      <div className="lr-phone">{l.phone}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                      {l.status === 'new'
                        ? <span className="new-badge">● NEW</span>
                        : <span className="status-pill" style={{ background: statusColor[l.status] }}>{statusLabel[l.status]}</span>}
                      {l.hot && <span className="hot-badge">⚡ Priority</span>}
                    </div>
                  </div>
                  <div className="lr-type">{l.type}</div>
                  <div className="lr-bot">
                    <span className="lr-meta">{l.state} · {l.source}</span>
                    <span className="lr-time">{l.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel response-panel">
            <div className="panel-header">
              <span className="panel-title">AI Intake Chat</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>Viewing: <strong>{leads.find(l => l.id === selected)?.name}</strong></span>
            </div>
            <div className="response-top">
              <div className="chat-col">
                <div className="chat-label">Intake Conversation</div>
                <div className="chat-box" ref={chatRef}>
                  {convo.map((m, i) => (
                    <div key={i} className={`msg ${m.from}`}>
                      <div className="msg-sender">{m.from === 'ai' ? <span className="ai-lbl">CaseFlow AI</span> : leads.find(l => l.id === selected)?.name}</div>
                      <div className="msg-bubble">{m.text}</div>
                      <div className="msg-meta">{m.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {qual && (
                <div className="qual-col">
                  <div className="chat-label">Lead Priority Panel</div>
                  <div className="qual-card">
                    <div className="qual-head">
                      <span>📋 Case Summary</span>
                      <span className="priority-badge" style={{ background: priorityColor[qual.priority] || '#64748b' }}>{qual.priority}</span>
                    </div>
                    <div className="qual-rows">
                      {[
                        { l: 'Case Type',  v: qual.type },
                        { l: 'Injury',     v: qual.injury },
                        { l: 'Police Rpt', v: qual.police },
                        { l: 'Insurance',  v: qual.insurance },
                        { l: 'Atty Hired', v: qual.hired },
                        { l: 'Urgency',    v: qual.urgency, urgency: true },
                        { l: 'Status',     v: qual.status, green: qual.status.includes('Booked') },
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

        <div className="pipeline-wrap">
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Case Pipeline</span>
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

        <div className="bottom-grid">
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Consultation Calendar</span>
              <span className="panel-badge">{todayConsults.length + tmrConsults.length} Scheduled</span>
            </div>
            <div className="bookings-inner">
              <div className="book-section">Today</div>
              {todayConsults.map((b, i) => (
                <div key={i} className="book-item">
                  <div className="book-time">{b.time}</div>
                  <div className="book-info">
                    <div className="book-name">{b.name}</div>
                    <div className="book-detail">{b.type} · {b.format}</div>
                    <div className="book-atty">Attorney: {b.atty}</div>
                  </div>
                  <span className="conf-pill" style={b.confirmed ? { background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' } : { background: '#fff7ed', color: '#f97316', border: '1px solid #fed7aa' }}>{b.confirmed ? 'Confirmed' : 'Pending'}</span>
                </div>
              ))}
              <div className="book-section">Tomorrow</div>
              {tmrConsults.map((b, i) => (
                <div key={i} className="book-item">
                  <div className="book-time">{b.time}</div>
                  <div className="book-info">
                    <div className="book-name">{b.name}</div>
                    <div className="book-detail">{b.type} · {b.format}</div>
                    <div className="book-atty">Attorney: {b.atty}</div>
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
        <div style={{ background: 'linear-gradient(135deg, #f0f4f9 0%, #f5f8fc 100%)', border: '1px solid #c7d9ed', borderRadius: '12px', padding: '32px 24px', marginTop: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e3a5f', marginBottom: '8px' }}>Ready to Scale Your Personal Injury Practice?</div>
          <div style={{ fontSize: '14px', color: '#2d5a8c', marginBottom: '20px', lineHeight: '1.5' }}>This demo shows what's possible with AI. Get a customized system built for your law firm's intake process and case qualification.</div>
          <a href="https://calendly.com/kimmycombs" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#1e3a5f', color: 'white', border: 'none', padding: '14px 36px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', textDecoration: 'none', transition: 'background 0.2s' }} onMouseEnter={(e) => e.target.style.background = '#152a45'} onMouseLeave={(e) => e.target.style.background = '#1e3a5f'}>📅 Book a Free Strategy Call</a>
        </div>
      </div>
    </>
  );
}
