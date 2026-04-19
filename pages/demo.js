import Head from 'next/head';
import { useState } from 'react';

export default function Demo() {
  const [activeTab, setActiveTab] = useState('lead-gen');

  // Lead Gen State
  const [leadData, setLeadData] = useState({
    leadName: '',
    email: '',
    company: '',
    industry: '',
    budget: '',
    timeline: '',
  });
  const [leadResult, setLeadResult] = useState(null);

  // Email Demo State
  const [emailType, setEmailType] = useState('inquiry');
  const [emailResult, setEmailResult] = useState(null);

  // Chatbot Demo State
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // Automation Demo State
  const [showAutoFlow, setShowAutoFlow] = useState(false);

  // Integrations Demo State
  const [selectedIntegrations, setSelectedIntegrations] = useState([]);

  const integrationTools = [
    { name: 'Make.com', category: 'Automation' },
    { name: 'Zapier', category: 'Automation' },
    { name: 'HubSpot', category: 'CRM' },
    { name: 'Salesforce', category: 'CRM' },
    { name: 'Gmail', category: 'Email' },
    { name: 'Outlook', category: 'Email' },
    { name: 'Slack', category: 'Communication' },
    { name: 'Google Calendar', category: 'Calendar' },
    { name: 'Calendly', category: 'Calendar' },
    { name: 'Stripe', category: 'Payment' },
    { name: 'Square', category: 'Payment' },
    { name: 'Airtable', category: 'Database' },
    { name: 'Google Sheets', category: 'Database' },
    { name: 'Shopify', category: 'E-commerce' },
    { name: 'WooCommerce', category: 'E-commerce' },
    { name: 'Custom APIs', category: 'API' },
  ];

  const toggleIntegration = (toolName) => {
    setSelectedIntegrations(prev =>
      prev.includes(toolName)
        ? prev.filter(t => t !== toolName)
        : [...prev, toolName]
    );
  };

  // Sample data
  const emailExamples = {
    inquiry: {
      from: 'sarah@growthco.com',
      subject: 'Looking for lead generation solutions',
      body: 'Hi, we\'re a growing marketing agency and we\'re looking for AI-powered lead qualification. Can you tell me more about your pricing and what\'s included?'
    },
    concern: {
      from: 'mike@techstartup.io',
      subject: 'Worried about implementation timeline',
      body: 'We\'re interested but worried about how long it takes to get set up. We need something fast. Is your system easy to integrate with our existing tools?'
    }
  };

  const emailResponses = {
    inquiry: 'Hi Sarah! Great question. Our lead qualification system automatically scores leads based on fit, budget, and timeline. Most clients see results within the first week. We offer three pricing tiers starting at just $297/month for ongoing optimization. Let\'s schedule a quick 15-minute call to see if it\'s a fit. When are you free?',
    concern: 'Hi Mike! I love this question because implementation speed is one of our biggest advantages. Most setups take 2-4 hours, not weeks. We integrate with Make.com, Zapier, and direct APIs—so we work with whatever tools you\'re already using. No complex migrations. Want me to walk you through a quick setup flow?'
  };

  const chatbotResponses = {
    'how much': 'Our pricing starts at $297/month for ongoing support and optimization. We also offer custom builds ranging from $1,500-$5,000 depending on complexity. Would you like to know more about a specific package?',
    'how long': 'Most clients see results within the first 2-4 weeks. Lead qualification typically works in days, while more complex automations take a bit longer. It really depends on what you\'re building.',
    'integration': 'We integrate with Make.com, Zapier, Google Workspace, Slack, most CRMs, and custom APIs. Pretty much any tool your team uses, we can work with.',
    'email': 'We can set up AI-powered email responses that draft, schedule, and send personalized emails. Perfect for lead follow-up, customer support, or outreach.',
    'chatbot': 'We build AI chatbots that handle FAQs, schedule appointments, and qualify leads automatically—24/7. They learn from your business and improve over time.',
    'automation': 'We automate workflows like lead capture → email → CRM update → task creation. Saves your team hours each week.',
    'default': 'Great question! We specialize in AI automations for small businesses. Our solutions include lead qualification, email automation, chatbots, and workflow streamlining. What are you most interested in?'
  };

  const handleLeadChange = (e) => {
    setLeadData({
      ...leadData,
      [e.target.name]: e.target.value,
    });
  };

  const runLeadDemo = (e) => {
    e.preventDefault();
    let score = 0;
    let reasons = [];

    if (leadData.budget === 'high') {
      score += 40;
      reasons.push('High budget');
    } else if (leadData.budget === 'medium') {
      score += 20;
      reasons.push('Medium budget');
    }

    if (leadData.timeline === 'urgent') {
      score += 35;
      reasons.push('Urgent timeline');
    } else if (leadData.timeline === 'soon') {
      score += 20;
      reasons.push('Near-term timeline');
    }

    if (leadData.industry && leadData.industry !== '') {
      score += 25;
      reasons.push(`${leadData.industry} industry match`);
    }

    setLeadResult({
      score,
      reasons,
      grade: score >= 80 ? 'Hot Lead' : score >= 60 ? 'Warm Lead' : 'Follow Up',
    });
  };

  const runEmailDemo = () => {
    setEmailResult(emailResponses[emailType]);
  };

  const sendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const userMsg = { type: 'user', text: chatInput };
    const newMessages = [...chatMessages, userMsg];

    // Find relevant response
    let botResponse = chatbotResponses.default;
    const inputLower = chatInput.toLowerCase();

    for (const [key, response] of Object.entries(chatbotResponses)) {
      if (key !== 'default' && inputLower.includes(key)) {
        botResponse = response;
        break;
      }
    }

    // Add bot response
    const botMsg = { type: 'bot', text: botResponse };
    setChatMessages([...newMessages, botMsg]);
    setChatInput('');
  };

  return (
    <>
      <Head>
        <title>AI Solutions Demo - AI Biz Pros</title>
        <meta name="description" content="See how we build custom AI automations for your business." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #1d1e20;
          background: #fff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header */
        header {
          background: white;
          padding: 20px 0;
          border-bottom: 1px solid #f2f3f6;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          height: 40px;
          width: auto;
        }

        header a {
          color: #1d1e20;
          text-decoration: none;
          margin-left: 30px;
          font-weight: 500;
          font-size: 14px;
        }

        /* Hero */
        .hero {
          background: linear-gradient(135deg, #673de6 0%, #5025d1 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
        }

        .hero h1 {
          font-size: 48px;
          margin-bottom: 20px;
          line-height: 1.2;
          font-weight: 700;
        }

        .hero p {
          font-size: 18px;
          max-width: 700px;
          margin: 0 auto;
          opacity: 0.95;
        }

        /* Demo Section */
        .demo-section {
          padding: 60px 20px;
        }

        /* Tabs */
        .tabs-nav {
          display: flex;
          gap: 10px;
          margin-bottom: 40px;
          overflow-x: auto;
          border-bottom: 2px solid #f2f3f6;
          padding-bottom: 0;
        }

        .tab-button {
          padding: 15px 20px;
          background: none;
          border: none;
          color: #727586;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          white-space: nowrap;
          transition: all 0.3s;
        }

        .tab-button:hover {
          color: #673de6;
          border-bottom-color: #673de6;
        }

        .tab-button.active {
          color: #673de6;
          border-bottom-color: #673de6;
        }

        .tab-content {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Form Styles */
        .demo-form {
          background: #f2f3f6;
          padding: 30px;
          border-radius: 8px;
          margin-bottom: 30px;
        }

        .demo-form h3 {
          color: #1d1e20;
          margin-bottom: 20px;
          font-size: 18px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          color: #36344d;
          font-weight: 500;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px;
          border: 1px solid #dadce0;
          border-radius: 4px;
          font-size: 14px;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #673de6;
          box-shadow: 0 0 0 3px rgba(103, 61, 230, 0.1);
        }

        .demo-button {
          width: 100%;
          background: linear-gradient(135deg, #673de6 0%, #5025d1 100%);
          color: white;
          padding: 12px;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .demo-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(103, 61, 230, 0.3);
        }

        /* Result Display */
        .result-box {
          background: white;
          padding: 30px;
          border-radius: 8px;
          border: 2px solid #ebe4ff;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .score-number {
          font-size: 60px;
          color: #673de6;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .score-grade {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 20px;
          padding: 10px;
          border-radius: 4px;
          background: #ebe4ff;
          color: #5025d1;
        }

        .score-reasons {
          text-align: left;
          background: #f2f3f6;
          padding: 20px;
          border-radius: 4px;
          margin-top: 20px;
        }

        .score-reasons h4 {
          color: #1d1e20;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .score-reasons li {
          color: #36344d;
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }

        .score-reasons li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #673de6;
          font-weight: bold;
        }

        /* Email Display */
        .email-example {
          background: #f2f3f6;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .email-from {
          color: #673de6;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .email-subject {
          color: #1d1e20;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .email-body {
          color: #36344d;
          line-height: 1.6;
        }

        .ai-response {
          background: white;
          padding: 20px;
          border-left: 4px solid #673de6;
          border-radius: 4px;
          margin-top: 20px;
        }

        .ai-response-label {
          color: #673de6;
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 12px;
        }

        .ai-response-text {
          color: #1d1e20;
          line-height: 1.6;
        }

        /* Chatbot Styles */
        .chat-container {
          background: white;
          border: 2px solid #ebe4ff;
          border-radius: 8px;
          height: 400px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .chat-message {
          padding: 12px 16px;
          border-radius: 8px;
          max-width: 80%;
          word-wrap: break-word;
        }

        .chat-message.user {
          align-self: flex-end;
          background: linear-gradient(135deg, #673de6 0%, #5025d1 100%);
          color: white;
          border-bottom-right-radius: 2px;
        }

        .chat-message.bot {
          align-self: flex-start;
          background: #f2f3f6;
          color: #1d1e20;
          border-bottom-left-radius: 2px;
        }

        .chat-form {
          border-top: 1px solid #f2f3f6;
          padding: 15px;
          display: flex;
          gap: 10px;
        }

        .chat-form input {
          flex: 1;
          padding: 10px;
          border: 1px solid #dadce0;
          border-radius: 4px;
          font-family: inherit;
        }

        .chat-form button {
          background: linear-gradient(135deg, #673de6 0%, #5025d1 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s;
        }

        .chat-form button:hover {
          transform: translateY(-2px);
        }

        /* Automation Flow */
        .automation-flow {
          display: flex;
          gap: 15px;
          justify-content: space-between;
          margin: 30px 0;
          flex-wrap: wrap;
        }

        .flow-step {
          flex: 1;
          min-width: 200px;
          background: #ebe4ff;
          padding: 25px;
          border-radius: 8px;
          text-align: center;
          border: 2px solid #673de6;
        }

        .flow-step-number {
          background: linear-gradient(135deg, #673de6 0%, #5025d1 100%);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          margin: 0 auto 15px;
        }

        .flow-step-title {
          color: #1d1e20;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .flow-step-desc {
          color: #36344d;
          font-size: 14px;
        }

        .flow-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #673de6;
          font-size: 24px;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #673de6 0%, #5025d1 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
          margin-top: 60px;
          border-radius: 8px;
        }

        .cta-section h2 {
          color: white;
          margin-bottom: 20px;
          font-size: 36px;
        }

        .cta-section p {
          color: #d5dfff;
          font-size: 16px;
          margin-bottom: 30px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          display: inline-block;
          background: white;
          color: #673de6;
          padding: 14px 40px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.2s, box-shadow 0.2s;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .placeholder-box {
          background: #ebe4ff;
          padding: 40px;
          border-radius: 8px;
          text-align: center;
        }

        .placeholder-box p {
          color: #2f1c6a;
          font-size: 16px;
          line-height: 1.6;
        }

        .demo-buttons {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .secondary-button {
          background: white;
          color: #673de6;
          padding: 10px 16px;
          border: 2px solid #673de6;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
          font-size: 14px;
        }

        .secondary-button:hover {
          background: #673de6;
          color: white;
        }

        .secondary-button.active {
          background: #673de6;
          color: white;
        }

        /* Integration Tools Grid */
        .integrations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 15px;
          margin: 30px 0;
        }

        .integration-tool {
          padding: 20px;
          border: 2px solid #dadce0;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          background: white;
        }

        .integration-tool:hover {
          border-color: #673de6;
          background: #f9f7ff;
        }

        .integration-tool.selected {
          border-color: #673de6;
          background: linear-gradient(135deg, rgba(103, 61, 230, 0.05) 0%, rgba(80, 37, 209, 0.05) 100%);
        }

        .integration-tool-name {
          color: #1d1e20;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .integration-tool-category {
          color: #727586;
          font-size: 12px;
        }

        .integration-tool.selected .integration-tool-name {
          color: #673de6;
        }

        .integration-tool.selected::before {
          content: '✓';
          color: #673de6;
          font-weight: bold;
          font-size: 18px;
          display: block;
          margin-bottom: 5px;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 28px;
          }

          .hero p {
            font-size: 15px;
          }

          .tabs-nav {
            gap: 5px;
          }

          .tab-button {
            padding: 12px 15px;
            font-size: 13px;
          }

          .demo-form {
            padding: 20px;
          }

          .result-box {
            padding: 20px;
          }

          .score-number {
            font-size: 48px;
          }

          .chat-container {
            height: 300px;
          }

          .automation-flow {
            flex-direction: column;
            gap: 10px;
          }

          .flow-step {
            min-width: 100%;
          }

          .flow-arrow {
            display: none;
          }

          .cta-section h2 {
            font-size: 24px;
          }

          .demo-buttons {
            flex-direction: column;
          }

          .secondary-button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .hero h1 {
            font-size: 22px;
          }

          .hero p {
            font-size: 13px;
          }

          .tabs-nav {
            gap: 0;
            padding-bottom: 5px;
          }

          .tab-button {
            padding: 10px 12px;
            font-size: 11px;
            border-bottom: none;
            border-right: 2px solid #f2f3f6;
          }

          .tab-button.active {
            border-right-color: #673de6;
            border-bottom: none;
          }

          .result-box {
            padding: 15px;
          }

          .score-number {
            font-size: 36px;
          }

          .chat-container {
            height: 250px;
          }

          .chat-message {
            max-width: 90%;
            font-size: 13px;
          }

          .flow-step {
            padding: 15px;
          }

          .demo-buttons {
            gap: 5px;
          }

          .secondary-button {
            padding: 8px 12px;
            font-size: 12px;
          }
        }
      `}</style>

      {/* Header */}
      <header>
        <div className="header-content">
          <svg viewBox="0 0 200 50" className="logo" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#673de6', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#5025d1', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="12" cy="25" r="8" fill="url(#logoGradient)" />
            <circle cx="25" cy="15" r="6" fill="#673de6" opacity="0.6" />
            <circle cx="25" cy="35" r="6" fill="#673de6" opacity="0.6" />
            <line x1="20" y1="25" x2="32" y2="25" stroke="#673de6" strokeWidth="1.5" />
            <line x1="25" y1="21" x2="25" y2="29" stroke="#673de6" strokeWidth="1.5" />
            <text x="45" y="32" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#1d1e20">
              AI Biz Pros
            </text>
          </svg>
          <nav>
            <a href="/">← Back to Home</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>Interactive Demo</h1>
          <p>Explore the AI capabilities we build for your business. Try lead qualification, email automation, chatbots, smart forms, integrations, and workflow automation.</p>
        </div>
      </section>

      {/* Demo Tabs */}
      <section className="demo-section">
        <div className="container">
          <div className="tabs-nav">
            <button
              className={`tab-button ${activeTab === 'lead-gen' ? 'active' : ''}`}
              onClick={() => setActiveTab('lead-gen')}
            >
              Lead Qualification
            </button>
            <button
              className={`tab-button ${activeTab === 'email' ? 'active' : ''}`}
              onClick={() => setActiveTab('email')}
            >
              Email Automation
            </button>
            <button
              className={`tab-button ${activeTab === 'chatbot' ? 'active' : ''}`}
              onClick={() => setActiveTab('chatbot')}
            >
              AI Chatbot
            </button>
            <button
              className={`tab-button ${activeTab === 'forms' ? 'active' : ''}`}
              onClick={() => setActiveTab('forms')}
            >
              Smart Forms
            </button>
            <button
              className={`tab-button ${activeTab === 'automation' ? 'active' : ''}`}
              onClick={() => setActiveTab('automation')}
            >
              Workflow Automation
            </button>
            <button
              className={`tab-button ${activeTab === 'integrations' ? 'active' : ''}`}
              onClick={() => setActiveTab('integrations')}
            >
              Custom Integrations
            </button>
          </div>

          {/* Tab 1: Lead Generation */}
          {activeTab === 'lead-gen' && (
            <div className="tab-content">
              <div className="demo-form">
                <h3>Evaluate a Lead in Seconds</h3>
                <p style={{ color: '#727586', marginBottom: '20px', fontSize: '14px' }}>Fill out a sample lead and see how our AI automatically prioritizes it for your team.</p>
                <form onSubmit={runLeadDemo}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div className="form-group">
                      <label>Lead Name</label>
                      <input type="text" name="leadName" placeholder="John Smith" value={leadData.leadName} onChange={handleLeadChange} />
                    </div>
                    <div className="form-group">
                      <label>Business Email</label>
                      <input type="email" name="email" placeholder="john@company.com" value={leadData.email} onChange={handleLeadChange} />
                    </div>
                    <div className="form-group">
                      <label>Company</label>
                      <input type="text" name="company" placeholder="ABC Marketing" value={leadData.company} onChange={handleLeadChange} />
                    </div>
                    <div className="form-group">
                      <label>Industry</label>
                      <select name="industry" value={leadData.industry} onChange={handleLeadChange}>
                        <option value="">Select industry...</option>
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Real Estate">Real Estate</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Budget</label>
                      <select name="budget" value={leadData.budget} onChange={handleLeadChange}>
                        <option value="">Select budget...</option>
                        <option value="high">$50K+/year</option>
                        <option value="medium">$10K–$50K/year</option>
                        <option value="low">Under $10K/year</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Timeline</label>
                      <select name="timeline" value={leadData.timeline} onChange={handleLeadChange}>
                        <option value="">Select timeline...</option>
                        <option value="urgent">This month</option>
                        <option value="soon">Next 1-3 months</option>
                        <option value="later">3+ months</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="demo-button" style={{ marginTop: '20px' }}>
                    Score This Lead
                  </button>
                </form>
              </div>

              {leadResult ? (
                <div className="result-box">
                  <div className="score-number">{leadResult.score}</div>
                  <div className="score-grade">{leadResult.grade}</div>
                  <p style={{ color: '#727586', marginBottom: '20px' }}>
                    This lead would be automatically classified and routed to the right team member.
                  </p>
                  <div className="score-reasons">
                    <h4>Why this score:</h4>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                      {leadResult.reasons.map((reason, idx) => (
                        <li key={idx}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="placeholder-box">
                  <strong>Fill out the form to see lead scoring in action</strong>
                  <p>
                    Our AI evaluates leads across dozens of criteria and gives you an instant priority score. Hot leads get reached out to immediately, while others are marked for follow-up. Fully customizable to your business.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Email Automation */}
          {activeTab === 'email' && (
            <div className="tab-content">
              <div className="demo-form">
                <h3>AI Email Response Generator</h3>
                <p style={{ color: '#727586', marginBottom: '20px', fontSize: '14px' }}>See how our AI drafts professional, personalized responses to prospect emails.</p>
                <div className="demo-buttons">
                  <button
                    className={`secondary-button ${emailType === 'inquiry' ? 'active' : ''}`}
                    onClick={() => { setEmailType('inquiry'); setEmailResult(null); }}
                  >
                    Prospect Inquiry
                  </button>
                  <button
                    className={`secondary-button ${emailType === 'concern' ? 'active' : ''}`}
                    onClick={() => { setEmailType('concern'); setEmailResult(null); }}
                  >
                    Prospect Concern
                  </button>
                </div>

                <div className="email-example">
                  <div className="email-from">From: {emailExamples[emailType].from}</div>
                  <div className="email-subject">Subject: {emailExamples[emailType].subject}</div>
                  <div className="email-body">{emailExamples[emailType].body}</div>
                </div>

                <button onClick={runEmailDemo} className="demo-button">
                  Generate AI Response
                </button>
              </div>

              {emailResult && (
                <div className="result-box">
                  <div className="ai-response">
                    <div className="ai-response-label">AI-GENERATED RESPONSE</div>
                    <div className="ai-response-text">{emailResult}</div>
                  </div>
                  <p style={{ color: '#727586', marginTop: '20px', fontSize: '13px' }}>
                    Your team can edit, send, or schedule this response. The more you use it, the smarter it gets.
                  </p>
                </div>
              )}

              {!emailResult && (
                <div className="placeholder-box">
                  <strong>Click "Generate AI Response" to see the magic</strong>
                  <p>
                    Our email automation learns your voice and business context. It can handle prospects asking questions, raising concerns, or requesting demos—all personalized and professional.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Chatbot */}
          {activeTab === 'chatbot' && (
            <div className="tab-content">
              <div className="demo-form">
                <h3>24/7 AI Customer Support Chatbot</h3>
                <p style={{ color: '#727586', marginBottom: '20px', fontSize: '14px' }}>Ask the chatbot any question about our services. It responds instantly, 24/7.</p>
              </div>

              <div className="chat-container">
                <div className="chat-messages">
                  {chatMessages.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#727586', marginTop: '80px' }}>
                      <p style={{ marginBottom: '10px' }}>👋 Start a conversation</p>
                      <p style={{ fontSize: '13px' }}>Ask about pricing, features, integrations, or how we work</p>
                    </div>
                  ) : (
                    chatMessages.map((msg, idx) => (
                      <div key={idx} className={`chat-message ${msg.type}`}>
                        {msg.text}
                      </div>
                    ))
                  )}
                </div>
                <form className="chat-form" onSubmit={sendChatMessage}>
                  <input
                    type="text"
                    placeholder="Ask a question..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            </div>
          )}

          {/* Tab 4: Smart Forms */}
          {activeTab === 'forms' && (
            <div className="tab-content">
              <div className="placeholder-box" style={{ marginBottom: '30px' }}>
                <strong>Smart Form Intelligence</strong>
                <p style={{ marginTop: '15px' }}>
                  Our intake forms adapt based on answers. Ask for company size first? The form asks about specific challenges for large vs. small companies. Pre-fill known data? It does that automatically. Skip unnecessary fields? Conditional logic handles it.
                </p>
              </div>

              <div className="demo-form">
                <h3>Sample: Adaptive Service Intake Form</h3>
                <div className="form-group">
                  <label>How many employees do you have?</label>
                  <select defaultValue="">
                    <option value="">Select...</option>
                    <option value="1-5">1-5 employees</option>
                    <option value="6-25">6-25 employees</option>
                    <option value="26-100">26-100 employees</option>
                    <option value="100+">100+ employees</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>What's your biggest workflow bottleneck?</label>
                  <select defaultValue="">
                    <option value="">Select...</option>
                    <option value="lead-qual">Lead qualification</option>
                    <option value="email">Email management</option>
                    <option value="support">Customer support</option>
                    <option value="data">Data entry / CRM updates</option>
                  </select>
                </div>
                <button className="demo-button">Continue to Next Step</button>
                <p style={{ color: '#727586', fontSize: '13px', marginTop: '15px' }}>
                  Forms continue to adapt based on answers. Skip irrelevant questions. Auto-populate from existing CRM data. Perfectly aligned to your prospect's situation.
                </p>
              </div>
            </div>
          )}

          {/* Tab 5: Automation */}
          {activeTab === 'automation' && (
            <div className="tab-content">
              <div className="placeholder-box" style={{ marginBottom: '40px' }}>
                <strong>Complete Workflow Automation</strong>
                <p style={{ marginTop: '15px' }}>
                  A customer inquiry comes in. Instantly, your AI generates a response, assigns it to the right team member, schedules a follow-up, and creates a task in your project tracker.
                </p>
              </div>

              <button
                className="demo-button"
                onClick={() => setShowAutoFlow(true)}
                style={{ marginBottom: '30px' }}
              >
                See Automation in Action
              </button>

              {showAutoFlow && (
                <div className="automation-flow">
                  <div className="flow-step">
                    <div className="flow-step-number">1</div>
                    <div className="flow-step-title">Customer Email</div>
                    <div className="flow-step-desc">Inquiry arrives in your inbox</div>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <div className="flow-step-number">2</div>
                    <div className="flow-step-title">AI Response</div>
                    <div className="flow-step-desc">Automatic reply drafted & sent</div>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <div className="flow-step-number">3</div>
                    <div className="flow-step-title">Team Assignment</div>
                    <div className="flow-step-desc">Routed to right team member</div>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <div className="flow-step-number">4</div>
                    <div className="flow-step-title">Task Created</div>
                    <div className="flow-step-desc">Follow-up scheduled in your tool</div>
                  </div>
                </div>
              )}

              <div className="result-box" style={{ marginTop: '30px' }}>
                <strong>Result: What used to take your team 30 minutes now happens in 30 seconds.</strong>
                <p style={{ color: '#727586', marginTop: '15px' }}>
                  We integrate with Make.com, Zapier, your CRM, Slack, email, Google Calendar—whatever tools you already use. The automation is seamless and customized to your exact workflow.
                </p>
              </div>
            </div>
          )}

          {/* Tab 6: Custom Integrations */}
          {activeTab === 'integrations' && (
            <div className="tab-content">
              <div className="placeholder-box" style={{ marginBottom: '30px' }}>
                <strong>Works With ANY Tool Your Team Uses</strong>
                <p style={{ marginTop: '15px' }}>
                  We integrate with 100+ business tools. CRM, email, calendar, payment processor, database—if it exists, we can connect it. Click tools below to see a sample setup.
                </p>
              </div>

              <div className="integrations-grid">
                {integrationTools.map((tool) => (
                  <div
                    key={tool.name}
                    className={`integration-tool ${selectedIntegrations.includes(tool.name) ? 'selected' : ''}`}
                    onClick={() => toggleIntegration(tool.name)}
                  >
                    <div className="integration-tool-name">{tool.name}</div>
                    <div className="integration-tool-category">{tool.category}</div>
                  </div>
                ))}
              </div>

              {selectedIntegrations.length > 0 && (
                <div className="result-box" style={{ marginTop: '30px' }}>
                  <strong>Your Integration Stack</strong>
                  <p style={{ marginTop: '15px', marginBottom: '15px' }}>
                    {selectedIntegrations.length} tool{selectedIntegrations.length !== 1 ? 's' : ''} selected:
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {selectedIntegrations.map((tool) => (
                      <span
                        key={tool}
                        style={{
                          background: '#ebe4ff',
                          color: '#673de6',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          fontSize: '13px',
                          fontWeight: '600'
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <p style={{ color: '#727586', fontSize: '13px' }}>
                    We'd connect all of these into one seamless automation. Lead comes in → AI processes it → updates your CRM → sends through email → schedules in calendar → creates task—all without you lifting a finger.
                  </p>
                </div>
              )}

              {selectedIntegrations.length === 0 && (
                <div className="placeholder-box" style={{ marginTop: '30px' }}>
                  <strong>Click tools above to build your custom stack</strong>
                  <p style={{ marginTop: '15px' }}>
                    Your current tools don't need to be replaced. We build custom connectors to make them work together smarter.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Build Your AI System?</h2>
          <p>
            These aren't theoretical. We build these exact systems for businesses just like yours. Small team? Large company? Any industry. We customize everything to fit how you work.
          </p>
          <a href="/#pricing" className="cta-button">
            See Our Pricing & Options
          </a>
        </div>
      </section>
    </>
  );
}
