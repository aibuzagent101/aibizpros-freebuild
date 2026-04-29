import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

export default function OpsFlowDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setAnimating(true);
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 8);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      title: 'Request Received',
      icon: '📞',
      data: { name: 'Sarah Johnson', phone: '480-555-0287', issue: 'AC not cooling', urgency: 'High Priority', time: 'Just now' }
    },
    {
      title: 'AI Reviewed',
      icon: '🤖',
      data: { action: 'Issue Analysis', result: 'Refrigerant/Compressor Issue', priority: 'High', estCost: '$400-800' }
    },
    {
      title: 'Database Checked',
      icon: '💾',
      data: { inventory: 'Capacitor Stock: 7 | Filter Stock: 12', availability: 'Part availability: Confirmed', technician: 'Tech available: Yes' }
    },
    {
      title: 'Team Notified',
      icon: '👥',
      data: { assigned: 'Marcus Thompson', dept: 'Field Service', status: 'Dispatch Alert Sent', eta: '20 minutes to contact' }
    },
    {
      title: 'Email Sent',
      icon: '📧',
      data: { to: 'sarah@email.com', subject: 'Your Appointment Confirmed - Today 2-5 PM', status: 'Delivered', preview: 'Technician Marcus will arrive between 2-5 PM...' }
    },
    {
      title: 'Calendar Updated',
      icon: '📅',
      data: { date: 'Today', time: '2:00 PM - 5:00 PM', address: '1847 Palm Ave, Phoenix AZ', status: 'Confirmed', assigned: 'Marcus Thompson' }
    },
    {
      title: 'Task Logged',
      icon: '✓',
      data: { jobID: 'JOB-2847-AC', status: 'Scheduled', customer: 'Sarah Johnson', notes: 'High priority cooling issue', nextStep: 'Technician callout' }
    },
    {
      title: 'Workflow Complete',
      icon: '🎯',
      data: { duration: '4 minutes 32 seconds', actions: '7 steps completed', result: 'Job captured, scheduled, and notified', revenue: '$550 avg value' }
    }
  ];

  const kpis = [
    { label: 'Requests Automated Today', value: '47', color: '#2563eb' },
    { label: 'Hours Saved', value: '12.5', color: '#16a34a' },
    { label: 'Response Time', value: '2m 18s', color: '#f97316' },
    { label: 'Tasks Completed', value: '156', color: '#8b5cf6' },
    { label: 'Revenue Protected', value: '$62,400', color: '#ec4899' },
  ];

  return (
    <>
      <Head>
        <title>OpsFlow AI - Operations Automation Demo</title>
        <meta name="description" content="See how AI automates service requests, inventory checks, team routing, and customer notifications in a complete workflow." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0f172a; color: #fff; }

        .container { max-width: 1400px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 50px; }
        .header h1 { font-size: 42px; font-weight: 800; margin-bottom: 12px; color: #fff; }
        .header p { font-size: 16px; color: #cbd5e1; max-width: 700px; margin: 0 auto; }
        .logo { font-size: 28px; font-weight: 700; color: #2563eb; margin-bottom: 16px; letter-spacing: -0.5px; }

        .demo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 60px; }

        .workflow-panel { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid #334155; border-radius: 16px; padding: 32px; }
        .panel-title { font-size: 18px; font-weight: 700; margin-bottom: 24px; color: #e2e8f0; }

        .timeline { display: flex; flex-direction: column; gap: 16px; }
        .timeline-item { padding: 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; cursor: pointer; transition: all 0.3s; }
        .timeline-item:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.16); }
        .timeline-item.active { background: #2563eb; border-color: #1d4ed8; }
        .timeline-item .step-number { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
        .timeline-item.active .step-number { color: #e0e7ff; }
        .timeline-item .step-title { font-size: 14px; font-weight: 600; color: #e2e8f0; }
        .timeline-item.active .step-title { color: #fff; }

        .detail-panel { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid #334155; border-radius: 16px; padding: 32px; }
        .detail-item { margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #334155; }
        .detail-item:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
        .detail-label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
        .detail-value { font-size: 15px; color: #e2e8f0; font-weight: 500; }
        .detail-highlight { color: #2563eb; font-weight: 600; }

        .incoming-request { background: linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%); border: 2px solid #2563eb; border-radius: 12px; padding: 24px; margin-bottom: 40px; }
        .request-header { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 16px; }
        .request-icon { font-size: 32px; }
        .request-info h3 { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .request-info p { font-size: 13px; color: #cbd5e1; margin: 2px 0; }
        .request-status { display: inline-block; background: #2563eb; color: white; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-top: 8px; }

        .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 60px; }
        .kpi-card { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid #334155; border-radius: 12px; padding: 24px; text-align: center; }
        .kpi-card .label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 12px; }
        .kpi-card .value { font-size: 32px; font-weight: 800; margin-bottom: 0; }
        .kpi-card.blue .value { color: #2563eb; }
        .kpi-card.green .value { color: #16a34a; }
        .kpi-card.orange .value { color: #f97316; }
        .kpi-card.purple .value { color: #8b5cf6; }
        .kpi-card.pink .value { color: #ec4899; }

        .workflow-step { text-align: center; margin-bottom: 16px; }
        .step-icon { font-size: 28px; margin-bottom: 8px; }
        .step-label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; }

        .data-flow { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid #334155; border-radius: 16px; padding: 32px; margin-bottom: 40px; }
        .data-flow .panel-title { margin-bottom: 20px; }
        .flow-step { display: flex; gap: 16px; margin-bottom: 20px; align-items: flex-start; }
        .flow-step:last-child { margin-bottom: 0; }
        .flow-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
        .flow-content { flex: 1; }
        .flow-label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
        .flow-text { font-size: 14px; color: #e2e8f0; line-height: 1.4; }

        @media (max-width: 768px) {
          .demo-grid { grid-template-columns: 1fr; gap: 24px; }
          .header h1 { font-size: 28px; }
          .kpi-grid { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
          .kpi-card { padding: 16px; }
          .kpi-card .value { font-size: 24px; }
          .container { padding: 24px 16px; }
        }
      `}</style>

      <div className="container">
        <div className="header">
          <div className="logo">🚀 OpsFlow AI</div>
          <h1>Complete Operations Automation</h1>
          <p>Watch how AI handles a service request from customer call to scheduled job in under 5 minutes.</p>
        </div>

        <div className="incoming-request">
          <div className="request-header">
            <div className="request-icon">📞</div>
            <div className="request-info">
              <h3>Sarah Johnson</h3>
              <p><strong>Phone:</strong> 480-555-0287</p>
              <p><strong>Issue:</strong> AC unit not cooling, 104°F outside</p>
              <p><strong>Location:</strong> Phoenix, AZ</p>
              <span className="request-status">HIGH PRIORITY</span>
            </div>
          </div>
        </div>

        <div className="demo-grid">
          <div className="workflow-panel">
            <div className="panel-title">Workflow Timeline</div>
            <div className="timeline">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`timeline-item ${activeStep === i ? 'active' : ''}`}
                  onClick={() => setActiveStep(i)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="step-number">Step {i + 1}</div>
                  <div className="step-title">{step.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-panel">
            <div className="panel-title">{steps[activeStep].title}</div>
            {Object.entries(steps[activeStep].data).map(([key, value]) => (
              <div key={key} className="detail-item">
                <div className="detail-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="detail-value">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="kpi-grid">
          {kpis.map((kpi, i) => {
            const colors = ['blue', 'green', 'orange', 'purple', 'pink'];
            return (
              <div key={i} className={`kpi-card ${colors[i % colors.length]}`}>
                <div className="label">{kpi.label}</div>
                <div className="value">{kpi.value}</div>
              </div>
            );
          })}
        </div>

        <div className="data-flow">
          <div className="panel-title">How It Works</div>
          <div className="flow-step">
            <div className="flow-icon">📞</div>
            <div className="flow-content">
              <div className="flow-label">Request Capture</div>
              <div className="flow-text">AI answers incoming call, captures customer name, issue, location, and urgency in natural conversation.</div>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-icon">🤖</div>
            <div className="flow-content">
              <div className="flow-label">Issue Analysis</div>
              <div className="flow-text">AI analyzes issue type, determines service category, estimates cost, and identifies required parts.</div>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-icon">💾</div>
            <div className="flow-content">
              <div className="flow-label">Database Integration</div>
              <div className="flow-text">System checks inventory availability, technician schedule, and customer history in real-time.</div>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-icon">👥</div>
            <div className="flow-content">
              <div className="flow-label">Intelligent Routing</div>
              <div className="flow-text">AI assigns to best available technician based on skills, location, and current load.</div>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-icon">📧</div>
            <div className="flow-content">
              <div className="flow-label">Automated Notifications</div>
              <div className="flow-text">Customer receives email confirmation. Technician receives dispatch alert with customer details and route.</div>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-icon">📅</div>
            <div className="flow-content">
              <div className="flow-label">Calendar & CRM Update</div>
              <div className="flow-text">Job automatically added to team calendar, CRM updated with all details, and follow-up reminders scheduled.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
