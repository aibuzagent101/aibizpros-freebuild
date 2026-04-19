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
  const [showAutoResponseDemo, setShowAutoResponseDemo] = useState(false);
  const [autoResponseStep, setAutoResponseStep] = useState(0);
  const [customerSupportType, setCustomerSupportType] = useState('refund');
  const [customerSupportResult, setCustomerSupportResult] = useState(null);

  const startAutoResponseDemo = () => {
    setAutoResponseStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step += 1;
      setAutoResponseStep(step);
      if (step >= 4) clearInterval(interval);
    }, 2500); // 2.5 seconds between steps
  };

  const runCustomerSupportDemo = () => {
    setCustomerSupportResult(customerSupportResponses[customerSupportType]);
  };

  // Chatbot Demo State
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // Automation Demo State
  const [showAutoFlow, setShowAutoFlow] = useState(false);
  const [autoStep, setAutoStep] = useState(0);

  const startAutomationDemo = () => {
    setAutoStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step += 1;
      setAutoStep(step);
      if (step >= 5) clearInterval(interval);
    }, 3000); // 3 seconds between steps
  };

  // Integrations Demo State
  const [selectedIntegrations, setSelectedIntegrations] = useState([]);
  const [integrationDemoStep, setIntegrationDemoStep] = useState(0);

  const startIntegrationDemo = () => {
    setIntegrationDemoStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step += 1;
      setIntegrationDemoStep(step);
      if (step >= 6) clearInterval(interval);
    }, 2200); // 2.2 seconds between steps
  };

  // Smart Forms Demo State
  const [formStep, setFormStep] = useState(0);
  const [formSize, setFormSize] = useState(null);
  const [formChallenge, setFormChallenge] = useState(null);

  // Video Modal State
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoPlayStep, setVideoPlayStep] = useState(0);

  const startFormDemo = () => {
    setFormStep(1);
    setFormSize(null);
    setFormChallenge(null);
    let step = 1;
    const interval = setInterval(() => {
      if (step === 1) {
        setFormSize('6-25'); // Simulate selection
      } else if (step === 2) {
        // Conditional fields already show via formSize
      } else if (step === 3) {
        setFormChallenge('email'); // Simulate selection
      }
      step += 1;
      setFormStep(step);
      if (step >= 5) clearInterval(interval);
    }, 2500); // 2.5 seconds between steps
  };

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

  const autoResponseEmail = {
    from: 'alex@techstartup.io',
    subject: 'Question about your service',
    body: 'Hi, I have a question about how your platform works. Can someone get back to me? Thanks!'
  };

  const autoResponseReply = 'Hi Alex! Thanks for reaching out. We received your email at 5:47 PM on Friday. Our team will review your message first thing Monday morning and get back to you within 24 hours. In the meantime, check out our FAQ at theaibizpros.com/help or reply with any urgent questions. We\'re here to help!';

  const customerSupportExamples = {
    refund: {
      from: 'jordan@company.com',
      subject: 'Refund Request',
      body: 'I\'d like to request a refund for my subscription. I don\'t think this is the right fit for my business. Can you process this?'
    },
    technical: {
      from: 'casey@smallbiz.com',
      subject: 'Integration not working',
      body: 'We tried connecting our CRM but it keeps failing. Error: "Authentication failed". We\'ve tried 3 times. Can you help troubleshoot?'
    },
    setup: {
      from: 'morgan@agency.io',
      subject: 'How do I get started?',
      body: 'We just signed up but I\'m not sure where to begin. Do you have setup documentation or a walkthrough video?'
    },
    billing: {
      from: 'sam@startup.co',
      subject: 'Billing Question',
      body: 'I was charged twice this month. Can you explain the charges and fix this? This is frustrating.'
    }
  };

  const customerSupportResponses = {
    refund: 'Hi Jordan! We\'d love to help make this work for you. Before we process a refund, can I ask a quick question—what part isn\'t working for your business? Often we can adjust setup or automation to fit your workflow better. If a refund is still the right call, our 30-day guarantee covers it. Let\'s chat briefly?',
    technical: 'Hi Casey! Error 403 usually means the API key expired or has wrong permissions. Here\'s the fix: 1) Go to your CRM settings, 2) Regenerate API key, 3) Re-paste it here. Takes 2 minutes. If that doesn\'t work, reply and I\'ll screen-share with you to debug. Let me know!',
    setup: 'Hi Morgan! Great question. Start here: theaibizpros.com/docs/getting-started (5 min read) → watch this 3-minute setup video: [link]. Then connect your first tool. If you get stuck anywhere, reply with a screenshot and I\'ll walk you through it step-by-step.',
    billing: 'Hi Sam! I sincerely apologize for the duplicate charge. Let me look into this right now. Can you send me the two charge dates? I\'ll refund the duplicate immediately and make sure this doesn\'t happen again. Thanks for flagging this.'
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

        /* Video Placeholder Styles */
        .video-placeholder {
          border-radius: 8px;
          overflow: hidden;
          margin: 0 auto 30px;
          border: 2px solid #ebe4ff;
          width: 200px;
        }

        .video-player {
          position: relative;
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px 8px 0 0;
        }

        .video-player::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(103, 61, 230, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%);
          pointer-events: none;
        }

        .video-play-button {
          width: 60px;
          height: 60px;
          background: #673de6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          z-index: 10;
          box-shadow: 0 8px 24px rgba(103, 61, 230, 0.4);
          border: none;
          padding: 0;
          position: relative;
        }

        .video-play-button:hover {
          background: #5025d1;
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(103, 61, 230, 0.6);
        }

        .video-play-button-icon {
          color: white;
          font-size: 32px;
          margin-left: 5px;
        }

        .video-info {
          padding: 20px;
          background: white;
        }

        .video-title {
          color: #1d1e20;
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 8px;
        }

        .video-description {
          color: #727586;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .video-duration {
          color: #673de6;
          font-weight: 600;
          font-size: 12px;
        }

        /* Video Modal */
        .video-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .video-modal-content {
          background: white;
          border-radius: 8px;
          width: 90%;
          max-width: 800px;
          overflow: hidden;
        }

        .video-modal-player {
          background: #1a1a2e;
          width: 100%;
          height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .video-modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
        }

        .video-modal-close:hover {
          background: white;
        }

        .video-modal-info {
          padding: 30px;
        }

        .video-modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #1d1e20;
          margin-bottom: 15px;
        }

        .video-modal-desc {
          color: #727586;
          line-height: 1.6;
          font-size: 14px;
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
              {/* Example Video Placeholder */}
              <div className="video-placeholder" style={{ marginBottom: '40px' }}>
                <div className="video-player">
                  <button
                    className="video-play-button"
                    onClick={() => {
                      setVideoModalOpen(true);
                      setVideoPlayStep(1);
                      let step = 1;
                      const interval = setInterval(() => {
                        step += 1;
                        setVideoPlayStep(step);
                        if (step >= 6) clearInterval(interval);
                      }, 2000);
                    }}
                    title="Play video"
                  >
                    <span className="video-play-button-icon">▶</span>
                  </button>
                </div>
                <div className="video-info">
                  <div className="video-title">Lead Qualification Automation In Action</div>
                  <div className="video-description">
                    Watch as incoming leads are automatically scored, qualified, and routed to the right team member. See how AI evaluates 50+ criteria in seconds and prioritizes hot leads.
                  </div>
                  <div className="video-duration">2:15 minutes</div>
                </div>
              </div>

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
              {/* Section 1: Prospect Responses */}
              <div className="demo-form" style={{ marginBottom: '40px' }}>
                <h3>Prospect Response Generator</h3>
                <p style={{ color: '#727586', marginBottom: '20px', fontSize: '14px' }}>AI drafts personalized responses to sales inquiries and concerns.</p>
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

                {emailResult && (
                  <div className="result-box" style={{ marginTop: '20px' }}>
                    <div className="ai-response">
                      <div className="ai-response-label">AI-GENERATED RESPONSE</div>
                      <div className="ai-response-text">{emailResult}</div>
                    </div>
                    <p style={{ color: '#727586', marginTop: '20px', fontSize: '13px' }}>
                      Your team can edit, send, or schedule. Learn your tone and style over time.
                    </p>
                  </div>
                )}

                {!emailResult && (
                  <div className="placeholder-box" style={{ marginTop: '20px' }}>
                    <p style={{ fontSize: '13px' }}>Click "Generate AI Response" to see AI draft a personalized reply</p>
                  </div>
                )}
              </div>

              {/* Section 2: 24/7 Auto-Response Demo */}
              <div style={{ marginBottom: '40px', paddingBottom: '30px', borderBottom: '2px solid #f2f3f6' }}>
                <h3 style={{ marginBottom: '15px', fontSize: '18px', color: '#1d1e20' }}>24/7 Auto-Response (When Closed)</h3>
                <p style={{ color: '#727586', marginBottom: '20px', fontSize: '14px' }}>Email arrives after hours? AI responds immediately while your team sleeps.</p>

                <button
                  className="demo-button"
                  onClick={startAutoResponseDemo}
                  style={{ marginBottom: '20px' }}
                >
                  {autoResponseStep === 0 ? '▶ Play 8-Second Demo' : 'Demo Running...'}
                </button>

                {autoResponseStep > 0 && (
                  <div>
                    {autoResponseStep >= 1 && (
                      <div style={{ marginBottom: '20px', padding: '15px', background: '#f2f3f6', borderRadius: '8px', animation: 'slideIn 0.5s ease-out' }}>
                        <div style={{ fontSize: '11px', color: '#673de6', fontWeight: '700', marginBottom: '8px' }}>📧 INCOMING (5:47 PM Friday)</div>
                        <div style={{ background: 'white', padding: '12px', borderRadius: '4px', fontSize: '12px', color: '#1d1e20', lineHeight: '1.5' }}>
                          <strong>From:</strong> {autoResponseEmail.from}<br/>
                          <strong>Subject:</strong> {autoResponseEmail.subject}<br/><br/>
                          {autoResponseEmail.body}
                        </div>
                      </div>
                    )}

                    {autoResponseStep >= 2 && (
                      <div style={{ marginBottom: '20px', padding: '15px', background: '#ebe4ff', borderRadius: '8px', animation: 'slideIn 0.5s ease-out', border: '2px solid #673de6' }}>
                        <div style={{ fontSize: '11px', color: '#673de6', fontWeight: '700', marginBottom: '8px' }}>🤖 AUTO-RESPONSE (sent instantly)</div>
                        <div style={{ background: 'white', padding: '12px', borderRadius: '4px', fontSize: '12px', color: '#1d1e20', lineHeight: '1.5' }}>
                          {autoResponseReply}
                        </div>
                      </div>
                    )}

                    {autoResponseStep >= 3 && (
                      <div style={{ padding: '15px', background: 'linear-gradient(135deg, #673de6 0%, #5025d1 100%)', borderRadius: '8px', color: 'white', animation: 'slideIn 0.5s ease-out' }}>
                        <div style={{ fontWeight: '700', marginBottom: '8px' }}>✓ TEAM NOTIFIED ON MONDAY</div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#d5dfff' }}>Customer got an immediate response. Team saw the email waiting Monday morning. Nobody missed a lead.</p>
                      </div>
                    )}
                  </div>
                )}

                {autoResponseStep === 0 && (
                  <div className="placeholder-box">
                    <p style={{ fontSize: '13px' }}>Click play to see AI respond to an email that arrives after business hours</p>
                  </div>
                )}
              </div>

              {/* Section 3: Customer Support */}
              <div className="demo-form">
                <h3>Customer Help & Support Handler</h3>
                <p style={{ color: '#727586', marginBottom: '20px', fontSize: '14px' }}>AI handles customer questions, refund requests, technical issues, setup help—intelligently.</p>
                <div className="demo-buttons">
                  <button
                    className={`secondary-button ${customerSupportType === 'refund' ? 'active' : ''}`}
                    onClick={() => { setCustomerSupportType('refund'); setCustomerSupportResult(null); }}
                  >
                    Refund Request
                  </button>
                  <button
                    className={`secondary-button ${customerSupportType === 'technical' ? 'active' : ''}`}
                    onClick={() => { setCustomerSupportType('technical'); setCustomerSupportResult(null); }}
                  >
                    Technical Issue
                  </button>
                  <button
                    className={`secondary-button ${customerSupportType === 'setup' ? 'active' : ''}`}
                    onClick={() => { setCustomerSupportType('setup'); setCustomerSupportResult(null); }}
                  >
                    Setup Help
                  </button>
                  <button
                    className={`secondary-button ${customerSupportType === 'billing' ? 'active' : ''}`}
                    onClick={() => { setCustomerSupportType('billing'); setCustomerSupportResult(null); }}
                  >
                    Billing Question
                  </button>
                </div>

                <div className="email-example">
                  <div className="email-from">From: {customerSupportExamples[customerSupportType].from}</div>
                  <div className="email-subject">Subject: {customerSupportExamples[customerSupportType].subject}</div>
                  <div className="email-body">{customerSupportExamples[customerSupportType].body}</div>
                </div>

                <button onClick={runCustomerSupportDemo} className="demo-button">
                  Generate Support Response
                </button>

                {customerSupportResult && (
                  <div className="result-box" style={{ marginTop: '20px' }}>
                    <div className="ai-response">
                      <div className="ai-response-label">AI SUPPORT RESPONSE</div>
                      <div className="ai-response-text">{customerSupportResult}</div>
                    </div>
                    <p style={{ color: '#727586', marginTop: '20px', fontSize: '13px' }}>
                      AI understands context: refund questions get empathetic help, technical issues get step-by-step fixes, angry customers get immediate acknowledgment.
                    </p>
                  </div>
                )}

                {!customerSupportResult && (
                  <div className="placeholder-box" style={{ marginTop: '20px' }}>
                    <p style={{ fontSize: '13px' }}>Click "Generate Support Response" to see AI handle customer issues intelligently</p>
                  </div>
                )}
              </div>
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
              <button
                className="demo-button"
                onClick={startFormDemo}
                style={{ marginBottom: '30px' }}
              >
                {formStep === 0 ? '▶ Play 10-Second Demo' : 'Demo Running...'}
              </button>

              {formStep > 0 && (
                <div>
                  {formStep >= 1 && (
                    <div style={{ marginBottom: '20px', padding: '20px', background: '#f2f3f6', borderRadius: '8px', animation: 'slideIn 0.5s ease-out' }}>
                      <h4 style={{ color: '#1d1e20', marginBottom: '15px', fontSize: '15px' }}>Question 1: How many employees do you have?</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        <button style={{ padding: '12px', background: formSize === '1-5' ? '#673de6' : 'white', color: formSize === '1-5' ? 'white' : '#1d1e20', border: `2px solid ${formSize === '1-5' ? '#673de6' : '#dadce0'}`, borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s' }}>1-5</button>
                        <button style={{ padding: '12px', background: formSize === '6-25' ? '#673de6' : 'white', color: formSize === '6-25' ? 'white' : '#1d1e20', border: `2px solid ${formSize === '6-25' ? '#673de6' : '#dadce0'}`, borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s' }}>6-25</button>
                        <button style={{ padding: '12px', background: formSize === '26-100' ? '#673de6' : 'white', color: formSize === '26-100' ? 'white' : '#1d1e20', border: `2px solid ${formSize === '26-100' ? '#673de6' : '#dadce0'}`, borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s' }}>26-100</button>
                        <button style={{ padding: '12px', background: formSize === '100+' ? '#673de6' : 'white', color: formSize === '100+' ? 'white' : '#1d1e20', border: `2px solid ${formSize === '100+' ? '#673de6' : '#dadce0'}`, borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s' }}>100+</button>
                      </div>
                      {formSize && <div style={{ marginTop: '10px', color: '#673de6', fontWeight: '600', fontSize: '13px' }}>✓ Selected: {formSize} employees</div>}
                    </div>
                  )}

                  {formStep >= 2 && formSize && (
                    <div style={{ marginBottom: '20px', padding: '20px', background: '#ebe4ff', borderRadius: '8px', animation: 'slideIn 0.5s ease-out', border: '2px solid #673de6' }}>
                      <div style={{ fontSize: '11px', color: '#673de6', fontWeight: '700', marginBottom: '8px' }}>🎯 FORM ADAPTED</div>
                      <p style={{ color: '#1d1e20', fontSize: '13px', marginBottom: '15px' }}>
                        Based on your company size, here are the most common challenges for {formSize === '1-5' ? 'micro' : 'small'} businesses:
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button style={{ padding: '12px', background: formChallenge === 'email' ? '#673de6' : 'white', color: formChallenge === 'email' ? 'white' : '#1d1e20', border: `2px solid ${formChallenge === 'email' ? '#673de6' : '#dadce0'}`, borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}>📧 Email management (responding to prospects)</button>
                        <button style={{ padding: '12px', background: formChallenge === 'lead' ? '#673de6' : 'white', color: formChallenge === 'lead' ? 'white' : '#1d1e20', border: `2px solid ${formChallenge === 'lead' ? '#673de6' : '#dadce0'}`, borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}>🎯 Lead qualification & follow-up</button>
                        <button style={{ padding: '12px', background: formChallenge === 'data' ? '#673de6' : 'white', color: formChallenge === 'data' ? 'white' : '#1d1e20', border: `2px solid ${formChallenge === 'data' ? '#673de6' : '#dadce0'}`, borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}>📋 Data entry & CRM updates</button>
                      </div>
                      {formChallenge && <div style={{ marginTop: '10px', color: '#673de6', fontWeight: '600', fontSize: '13px' }}>✓ Selected: {formChallenge === 'email' ? 'Email management' : formChallenge === 'lead' ? 'Lead qualification' : 'Data entry'}</div>}
                    </div>
                  )}

                  {formStep >= 4 && formSize && formChallenge && (
                    <div style={{ padding: '20px', background: 'linear-gradient(135deg, #ebe4ff 0%, #f2f3f6 100%)', borderRadius: '8px', border: '2px solid #673de6', animation: 'slideIn 0.5s ease-out' }}>
                      <div style={{ fontSize: '11px', color: '#673de6', fontWeight: '700', marginBottom: '12px' }}>🤖 AI RECOMMENDATIONS</div>
                      <p style={{ color: '#1d1e20', fontWeight: '600', marginBottom: '12px' }}>Based on your answers, we'd recommend:</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ padding: '10px', background: 'white', borderRadius: '4px', color: '#1d1e20', fontSize: '13px', borderLeft: '4px solid #673de6' }}>✓ AI Email Responder</div>
                        <div style={{ padding: '10px', background: 'white', borderRadius: '4px', color: '#1d1e20', fontSize: '13px', borderLeft: '4px solid #673de6' }}>✓ Lead Qualifier + Auto-follow-up</div>
                        <div style={{ padding: '10px', background: 'white', borderRadius: '4px', color: '#1d1e20', fontSize: '13px', borderLeft: '4px solid #673de6' }}>✓ CRM Integration (HubSpot/Salesforce)</div>
                      </div>
                      <p style={{ color: '#727586', fontSize: '12px', marginTop: '15px' }}>The form predicted your needs before you filled it out. Next, we'd ask about your specific tools and build a custom automation.</p>
                    </div>
                  )}

                  {formStep >= 5 && (
                    <div style={{ marginTop: '20px', padding: '20px', background: 'linear-gradient(135deg, #673de6 0%, #5025d1 100%)', borderRadius: '8px', color: 'white', textAlign: 'center', animation: 'slideIn 0.5s ease-out' }}>
                      <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>✓ COMPLETE IN ~10 SECONDS</div>
                      <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#d5dfff' }}>Smart form learned your situation → adapted questions → generated recommendations. No manual form filling. No wasted time.</p>
                    </div>
                  )}
                </div>
              )}

              {formStep === 0 && (
                <div className="placeholder-box">
                  <strong>Click play to see smart form adaptation in action</strong>
                  <p style={{ marginTop: '15px' }}>Answer one question → form adapts → shows only relevant options → generates recommendations. All based on what you tell it.</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 5: Automation */}
          {activeTab === 'automation' && (
            <div className="tab-content">
              <button
                className="demo-button"
                onClick={startAutomationDemo}
                style={{ marginBottom: '30px' }}
              >
                {autoStep === 0 ? '▶ Play 10-Second Demo' : 'Demo Running...'}
              </button>

              {autoStep > 0 && (
                <div>
                  {autoStep >= 1 && (
                    <div style={{ marginBottom: '20px', padding: '18px', background: '#f2f3f6', borderRadius: '8px', border: '2px solid #673de6', animation: 'slideIn 0.5s ease-out' }}>
                      <div style={{ fontSize: '11px', color: '#673de6', fontWeight: '700', marginBottom: '10px' }}>📧 INCOMING EMAIL</div>
                      <div style={{ background: 'white', padding: '12px', borderRadius: '4px', fontSize: '12px', color: '#1d1e20', lineHeight: '1.5' }}>
                        <strong>From:</strong> michael.johnson@techvision.io<br/>
                        <strong>Subject:</strong> Does this work with our CRM?<br/><br/>
                        We're interested in automating lead follow-ups. Do you integrate with HubSpot? We have 8 people on our sales team.
                      </div>
                    </div>
                  )}

                  {autoStep >= 2 && (
                    <div style={{ marginBottom: '20px', padding: '18px', background: '#ebe4ff', borderRadius: '8px', border: '2px solid #673de6', animation: 'slideIn 0.5s ease-out' }}>
                      <div style={{ fontSize: '11px', color: '#673de6', fontWeight: '700', marginBottom: '10px' }}>🤖 AI RESPONSE (auto-generated)</div>
                      <div style={{ background: 'white', padding: '12px', borderRadius: '4px', fontSize: '12px', color: '#1d1e20', lineHeight: '1.5' }}>
                        Hi Michael, absolutely! We integrate directly with HubSpot. For a team your size, we'd set up automated lead scoring and follow-up triggers in your CRM. Let's chat about your specific workflow. Available Thursday at 2 PM or Friday morning?
                      </div>
                    </div>
                  )}

                  {autoStep >= 3 && (
                    <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div style={{ padding: '15px', background: '#f0f0ff', borderRadius: '8px', border: '2px solid #673de6', animation: 'slideIn 0.5s ease-out', fontSize: '12px' }}>
                        <div style={{ color: '#673de6', fontWeight: '700', marginBottom: '8px' }}>✓ RESPONSE SENT</div>
                        <div style={{ color: '#1d1e20', fontWeight: '600' }}>michael.johnson@techvision.io</div>
                        <div style={{ color: '#727586', fontSize: '11px', marginTop: '5px' }}>Sent 2:47 PM</div>
                      </div>
                      <div style={{ padding: '15px', background: '#f0f0ff', borderRadius: '8px', border: '2px solid #673de6', animation: 'slideIn 0.5s ease-out', fontSize: '12px' }}>
                        <div style={{ color: '#673de6', fontWeight: '700', marginBottom: '8px' }}>✓ ASSIGNED TO</div>
                        <div style={{ color: '#1d1e20', fontWeight: '600' }}>Jessica Liu (AE)</div>
                        <div style={{ color: '#727586', fontSize: '11px', marginTop: '5px' }}>High Priority</div>
                      </div>
                    </div>
                  )}

                  {autoStep >= 4 && (
                    <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div style={{ padding: '15px', background: '#f0f0ff', borderRadius: '8px', border: '2px solid #673de6', animation: 'slideIn 0.5s ease-out', fontSize: '12px' }}>
                        <div style={{ color: '#673de6', fontWeight: '700', marginBottom: '8px' }}>📅 CALENDAR</div>
                        <div style={{ color: '#1d1e20', fontWeight: '600', fontSize: '11px' }}>M. Johnson Thu 2PM</div>
                        <div style={{ color: '#727586', fontSize: '11px', marginTop: '5px' }}>Added to Jessica's calendar</div>
                      </div>
                      <div style={{ padding: '15px', background: '#f0f0ff', borderRadius: '8px', border: '2px solid #673de6', animation: 'slideIn 0.5s ease-out', fontSize: '12px' }}>
                        <div style={{ color: '#673de6', fontWeight: '700', marginBottom: '8px' }}>💬 SLACK</div>
                        <div style={{ color: '#1d1e20', fontWeight: '600', fontSize: '11px' }}>#sales: New lead - TechVision</div>
                        <div style={{ color: '#727586', fontSize: '11px', marginTop: '5px' }}>Team notified</div>
                      </div>
                    </div>
                  )}

                  {autoStep >= 5 && (
                    <div style={{ padding: '20px', background: 'linear-gradient(135deg, #673de6 0%, #5025d1 100%)', borderRadius: '8px', color: 'white', textAlign: 'center', animation: 'slideIn 0.5s ease-out' }}>
                      <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>✓ COMPLETE IN ~10 SECONDS</div>
                      <p style={{ margin: '10px 0 0', fontSize: '12px', color: '#d5dfff' }}>Email received → Response sent → Task assigned → Calendar updated → Team alerted. No manual work.</p>
                    </div>
                  )}
                </div>
              )}

              {autoStep === 0 && (
                <div className="placeholder-box">
                  <strong>Click play to see a real workflow in action</strong>
                  <p style={{ marginTop: '15px' }}>Customer email arrives. AI responds. Task assigned. Calendar updated. Slack notified. All in ~10 seconds.</p>
                </div>
              )}
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
                <div style={{ marginTop: '30px' }}>
                  <div className="result-box" style={{ marginBottom: '30px' }}>
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
                  </div>

                  {/* Integration Setup Demo */}
                  <button
                    className="demo-button"
                    onClick={startIntegrationDemo}
                    style={{ marginBottom: '30px' }}
                  >
                    {integrationDemoStep === 0 ? '▶ See Setup Steps & Results' : 'Demo Running...'}
                  </button>

                  {integrationDemoStep > 0 && (
                    <div>
                      {integrationDemoStep >= 1 && (
                        <div style={{ marginBottom: '20px', padding: '18px', background: '#f2f3f6', borderRadius: '8px', border: '2px solid #673de6', animation: 'slideIn 0.5s ease-out' }}>
                          <div style={{ fontSize: '11px', color: '#673de6', fontWeight: '700', marginBottom: '10px' }}>📊 STEP 1: ANALYZING YOUR SETUP</div>
                          <div style={{ fontSize: '13px', color: '#1d1e20', fontWeight: '600', marginBottom: '8px' }}>Reading requirements from your {selectedIntegrations.length} selected tools:</div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {selectedIntegrations.slice(0, 4).map((tool) => (
                              <span key={tool} style={{ background: 'white', padding: '6px 10px', borderRadius: '4px', fontSize: '12px', color: '#1d1e20' }}>✓ {tool}</span>
                            ))}
                            {selectedIntegrations.length > 4 && <span style={{ background: 'white', padding: '6px 10px', borderRadius: '4px', fontSize: '12px', color: '#1d1e20' }}>+ {selectedIntegrations.length - 4} more</span>}
                          </div>
                        </div>
                      )}

                      {integrationDemoStep >= 2 && (
                        <div style={{ marginBottom: '20px', padding: '18px', background: '#ebe4ff', borderRadius: '8px', border: '2px solid #673de6', animation: 'slideIn 0.5s ease-out' }}>
                          <div style={{ fontSize: '11px', color: '#673de6', fontWeight: '700', marginBottom: '10px' }}>🔗 STEP 2: AUTHENTICATING & CONNECTING</div>
                          <div style={{ fontSize: '13px', color: '#1d1e20', marginBottom: '12px' }}>Securely connecting to each platform with API keys:</div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                            <div style={{ padding: '10px', background: 'white', borderRadius: '4px', fontSize: '12px', color: '#1d1e20' }}>✓ {selectedIntegrations[0] || 'Tool 1'}</div>
                            {selectedIntegrations[1] && <div style={{ padding: '10px', background: 'white', borderRadius: '4px', fontSize: '12px', color: '#1d1e20' }}>✓ {selectedIntegrations[1]}</div>}
                            {selectedIntegrations[2] && <div style={{ padding: '10px', background: 'white', borderRadius: '4px', fontSize: '12px', color: '#1d1e20' }}>✓ {selectedIntegrations[2]}</div>}
                            {selectedIntegrations[3] && <div style={{ padding: '10px', background: 'white', borderRadius: '4px', fontSize: '12px', color: '#1d1e20' }}>✓ {selectedIntegrations[3]}</div>}
                          </div>
                        </div>
                      )}

                      {integrationDemoStep >= 3 && (
                        <div style={{ marginBottom: '20px', padding: '18px', background: '#f2f3f6', borderRadius: '8px', border: '2px solid #673de6', animation: 'slideIn 0.5s ease-out' }}>
                          <div style={{ fontSize: '11px', color: '#673de6', fontWeight: '700', marginBottom: '10px' }}>⚙️ STEP 3: CONFIGURING DATA FLOW</div>
                          <div style={{ fontSize: '13px', color: '#1d1e20', marginBottom: '12px' }}>Setting up which data syncs between platforms:</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ padding: '10px', background: 'white', borderRadius: '4px', fontSize: '12px', color: '#1d1e20', borderLeft: '3px solid #673de6' }}>✓ Lead data → CRM updates automatically</div>
                            <div style={{ padding: '10px', background: 'white', borderRadius: '4px', fontSize: '12px', color: '#1d1e20', borderLeft: '3px solid #673de6' }}>✓ Calendar events → Slack notifications sent</div>
                            <div style={{ padding: '10px', background: 'white', borderRadius: '4px', fontSize: '12px', color: '#1d1e20', borderLeft: '3px solid #673de6' }}>✓ Email responses → Logged in database</div>
                          </div>
                        </div>
                      )}

                      {integrationDemoStep >= 4 && (
                        <div style={{ marginBottom: '20px', padding: '18px', background: '#ebe4ff', borderRadius: '8px', border: '2px solid #673de6', animation: 'slideIn 0.5s ease-out' }}>
                          <div style={{ fontSize: '11px', color: '#673de6', fontWeight: '700', marginBottom: '10px' }}>🤖 STEP 4: AUTOMATION RULES CONFIGURED</div>
                          <div style={{ fontSize: '13px', color: '#1d1e20', marginBottom: '12px' }}>AI sets up intelligent logic:</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ padding: '10px', background: 'white', borderRadius: '4px', fontSize: '12px', color: '#1d1e20' }}>→ If lead score &gt; 80, assign to Jessica (AE)</div>
                            <div style={{ padding: '10px', background: 'white', borderRadius: '4px', fontSize: '12px', color: '#1d1e20' }}>→ If customer email arrives, auto-respond + add to task list</div>
                            <div style={{ padding: '10px', background: 'white', borderRadius: '4px', fontSize: '12px', color: '#1d1e20' }}>→ If reply received, update CRM + schedule follow-up</div>
                          </div>
                        </div>
                      )}

                      {integrationDemoStep >= 5 && (
                        <div style={{ marginBottom: '20px', padding: '18px', background: '#f2f3f6', borderRadius: '8px', border: '2px solid #673de6', animation: 'slideIn 0.5s ease-out' }}>
                          <div style={{ fontSize: '11px', color: '#673de6', fontWeight: '700', marginBottom: '10px' }}>✓ STEP 5: TESTED & LIVE</div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '12px' }}>
                            <div style={{ padding: '12px', background: 'white', borderRadius: '4px', textAlign: 'center', fontSize: '12px', color: '#1d1e20' }}>
                              <div style={{ fontWeight: '700', color: '#673de6', marginBottom: '4px' }}>✓ Testing</div>
                              <div style={{ fontSize: '11px', color: '#727586' }}>Dry run complete</div>
                            </div>
                            <div style={{ padding: '12px', background: 'white', borderRadius: '4px', textAlign: 'center', fontSize: '12px', color: '#1d1e20' }}>
                              <div style={{ fontWeight: '700', color: '#673de6', marginBottom: '4px' }}>✓ Live</div>
                              <div style={{ fontSize: '11px', color: '#727586' }}>Running now</div>
                            </div>
                            <div style={{ padding: '12px', background: 'white', borderRadius: '4px', textAlign: 'center', fontSize: '12px', color: '#1d1e20' }}>
                              <div style={{ fontWeight: '700', color: '#673de6', marginBottom: '4px' }}>✓ Monitoring</div>
                              <div style={{ fontSize: '11px', color: '#727586' }}>24/7 active</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {integrationDemoStep >= 6 && (
                        <div style={{ padding: '20px', background: 'linear-gradient(135deg, #673de6 0%, #5025d1 100%)', borderRadius: '8px', color: 'white', textAlign: 'center', animation: 'slideIn 0.5s ease-out' }}>
                          <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>✓ COMPLETE & RUNNING</div>
                          <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#d5dfff' }}>{selectedIntegrations.length} platforms connected. Data flowing. Automations active. Zero manual handoffs.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {integrationDemoStep === 0 && (
                    <div className="placeholder-box">
                      <p style={{ fontSize: '13px' }}>Click "See Setup Steps & Results" to watch AI configure your integration stack</p>
                    </div>
                  )}
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

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="video-modal-overlay" onClick={() => setVideoModalOpen(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-player">
              <button className="video-modal-close" onClick={() => setVideoModalOpen(false)}>×</button>

              {/* Mock Video Content - Screen Recording Style */}
              <div style={{ width: '100%', height: '100%', position: 'relative', background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)', display: 'flex', flexDirection: 'column', padding: '20px', fontFamily: 'monospace', fontSize: '12px', color: '#333', overflow: 'hidden' }}>
                {/* Browser Chrome */}
                <div style={{ background: '#f0f0f0', padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '10px', borderRadius: '4px 4px 0 0' }}>
                  <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c940' }}></div>
                  </div>
                  <div style={{ color: '#666', fontSize: '11px' }}>Lead Qualification System — AI Processing</div>
                </div>

                {/* Screen Recording Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '20px', background: 'white' }}>
                  {videoPlayStep >= 1 && (
                    <div style={{ animation: 'fadeIn 0.5s', marginBottom: '15px' }}>
                      <div style={{ color: '#673de6', fontWeight: 'bold', marginBottom: '5px' }}>📧 NEW LEAD INCOMING</div>
                      <div style={{ color: '#666', marginLeft: '10px' }}>From: sarah@growthco.com</div>
                      <div style={{ color: '#666', marginLeft: '10px' }}>Subject: Lead generation solutions inquiry</div>
                    </div>
                  )}

                  {videoPlayStep >= 2 && (
                    <div style={{ animation: 'fadeIn 0.5s', marginBottom: '15px' }}>
                      <div style={{ color: '#673de6', fontWeight: 'bold', marginBottom: '5px' }}>🤖 AI ANALYZING...</div>
                      <div style={{ color: '#666', marginLeft: '10px' }}>✓ Budget: $50K+/year</div>
                      <div style={{ color: '#666', marginLeft: '10px' }}>✓ Timeline: This month (URGENT)</div>
                      <div style={{ color: '#666', marginLeft: '10px' }}>✓ Industry: Marketing (good fit)</div>
                    </div>
                  )}

                  {videoPlayStep >= 3 && (
                    <div style={{ animation: 'fadeIn 0.5s', marginBottom: '15px' }}>
                      <div style={{ color: '#28c940', fontWeight: 'bold', marginBottom: '5px' }}>✓ SCORE: 92/100 — HOT LEAD</div>
                      <div style={{ color: '#666', marginLeft: '10px' }}>Classification: Immediate follow-up required</div>
                    </div>
                  )}

                  {videoPlayStep >= 4 && (
                    <div style={{ animation: 'fadeIn 0.5s', marginBottom: '15px' }}>
                      <div style={{ color: '#673de6', fontWeight: 'bold', marginBottom: '5px' }}>➜ ROUTING TO TEAM</div>
                      <div style={{ color: '#666', marginLeft: '10px' }}>Assigned to: Jessica Liu (Account Executive)</div>
                      <div style={{ color: '#666', marginLeft: '10px' }}>Priority: HIGH</div>
                    </div>
                  )}

                  {videoPlayStep >= 5 && (
                    <div style={{ animation: 'fadeIn 0.5s' }}>
                      <div style={{ color: '#28c940', fontWeight: 'bold', marginBottom: '5px' }}>✓ COMPLETE</div>
                      <div style={{ color: '#666', marginLeft: '10px' }}>Lead qualified, assigned, and alerted in 2.3 seconds</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="video-modal-info">
              <div className="video-modal-title">Lead Qualification Automation</div>
              <div className="video-modal-desc">
                This shows how incoming leads are automatically scored based on budget, timeline, and fit. Hot leads are immediately routed to your team. No manual work required.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
