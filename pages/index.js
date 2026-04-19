import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [demoData, setDemoData] = useState({
    leadName: '',
    company: '',
    industry: '',
    budget: '',
    timeline: '',
  });

  const [demoResult, setDemoResult] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    companyName: '',
    contactName: '',
    title: '',
    email: '',
    phone: '',
    industry: '',
    employeeCount: '',
    annualRevenue: '',
    primaryPainPoint: '',
    currentVolume: '',
    currentProcess: '',
    toolsUsed: '',
    timeSpentMonthly: '',
    costImpact: '',
    successMetric: '',
    decisionTimeline: '',
    budget: '',
    additionalContext: '',
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const handleDemoChange = (e) => {
    setDemoData({
      ...demoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuoteChange = (e) => {
    setQuoteFormData({
      ...quoteFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to your backend or email service
    console.log('Quote request:', quoteFormData);
    setQuoteSubmitted(true);
    // Redirect to demo page after 1.5 seconds
    setTimeout(() => {
      window.location.href = '/demo';
    }, 1500);
  };

  const closeQuoteModal = () => {
    setShowQuoteModal(false);
  };

  const runDemo = (e) => {
    e.preventDefault();

    // Simple scoring logic for demo
    let score = 0;
    let reasons = [];

    if (demoData.budget === 'high') {
      score += 40;
      reasons.push('High budget');
    } else if (demoData.budget === 'medium') {
      score += 20;
      reasons.push('Medium budget');
    }

    if (demoData.timeline === 'urgent') {
      score += 35;
      reasons.push('Urgent timeline');
    } else if (demoData.timeline === 'soon') {
      score += 20;
      reasons.push('Near-term timeline');
    }

    if (demoData.industry && demoData.industry !== '') {
      score += 25;
      reasons.push(`${demoData.industry} industry match`);
    }

    setDemoResult({
      score,
      reasons,
      grade: score >= 80 ? 'Hot Lead' : score >= 60 ? 'Warm Lead' : 'Follow Up',
    });
  };

  return (
    <>
      <Head>
        <title>AI Automation for Small Business - AI Biz Pros</title>
        <meta name="description" content="Custom AI automation built for SMBs. Lead qualification, intake forms, email workflows, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #1d1e20;
          background: #fff;
        }

        .container {
          max-width: 1000px;
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
          max-width: 1000px;
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

        header nav a {
          color: #1d1e20;
          text-decoration: none;
          margin-left: 30px;
          font-weight: 500;
          font-size: 14px;
          transition: color 0.2s;
        }

        header nav a:hover {
          color: #673de6;
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, #673de6 0%, #5025d1 100%);
          color: white;
          padding: 100px 20px;
          text-align: center;
        }

        .hero h1 {
          font-size: 56px;
          margin-bottom: 20px;
          line-height: 1.2;
          font-weight: 700;
        }

        .hero p {
          font-size: 20px;
          max-width: 700px;
          margin: 0 auto 40px;
          opacity: 0.95;
          line-height: 1.6;
        }

        .hero-ctas {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-block;
          padding: 14px 32px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.2s;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .btn-primary {
          background: white;
          color: #673de6;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border-color: white;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.1);
        }

        /* Section */
        section {
          padding: 80px 20px;
          border-bottom: 1px solid #f2f3f6;
        }

        section h2 {
          font-size: 42px;
          color: #1d1e20;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 700;
        }

        section .subtitle {
          font-size: 18px;
          color: #727586;
          text-align: center;
          max-width: 700px;
          margin: 0 auto 50px;
        }

        /* Services Grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin: 50px 0;
        }

        .service-card {
          background: #f2f3f6;
          padding: 40px;
          border-radius: 8px;
          border-left: 4px solid #673de6;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(103, 61, 230, 0.1);
        }

        .service-card h3 {
          font-size: 22px;
          color: #673de6;
          margin-bottom: 12px;
          margin-top: 0;
        }

        .service-card p {
          color: #36344d;
          margin: 0;
          line-height: 1.7;
        }

        /* Pricing Cards */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin: 50px 0;
        }

        .pricing-card {
          background: white;
          border: 2px solid #f2f3f6;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          transition: all 0.2s;
          position: relative;
        }

        .pricing-card.featured {
          border-color: #673de6;
          box-shadow: 0 10px 30px rgba(103, 61, 230, 0.15);
          transform: scale(1.05);
        }

        .pricing-card.featured::before {
          content: 'MOST POPULAR';
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #673de6;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .pricing-card h3 {
          font-size: 24px;
          color: #1d1e20;
          margin: 20px 0 10px;
        }

        .pricing-card .price {
          font-size: 48px;
          color: #673de6;
          font-weight: 700;
          margin: 20px 0;
        }

        .pricing-card .price-sub {
          color: #727586;
          font-size: 14px;
          margin-bottom: 30px;
        }

        .pricing-card ul {
          list-style: none;
          text-align: left;
          margin: 30px 0;
        }

        .pricing-card li {
          padding: 10px 0;
          color: #36344d;
          border-bottom: 1px solid #f2f3f6;
        }

        .pricing-card li:last-child {
          border-bottom: none;
        }

        .pricing-card li::before {
          content: '✓ ';
          color: #673de6;
          font-weight: bold;
          margin-right: 8px;
        }

        /* Process */
        .process-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin: 50px 0;
        }

        .step {
          position: relative;
          padding: 30px;
          background: #f2f3f6;
          border-radius: 8px;
          text-align: center;
        }

        .step-number {
          display: inline-block;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #673de6 0%, #5025d1 100%);
          color: white;
          border-radius: 50%;
          line-height: 50px;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .step h3 {
          color: #1d1e20;
          margin: 15px 0;
          font-size: 20px;
        }

        .step p {
          color: #727586;
          margin: 0;
        }

        /* Two Column */
        .two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
          margin: 50px 0;
        }

        .two-column h3 {
          font-size: 28px;
          color: #1d1e20;
          margin-bottom: 20px;
        }

        .two-column p {
          color: #36344d;
          margin-bottom: 15px;
          line-height: 1.8;
        }

        .two-column ul {
          list-style: none;
          margin: 20px 0;
        }

        .two-column li {
          padding: 10px 0 10px 30px;
          position: relative;
          color: #36344d;
        }

        .two-column li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #673de6;
          font-weight: bold;
        }

        /* FAQ */
        .faq-item {
          background: #f2f3f6;
          padding: 25px;
          margin: 20px 0;
          border-radius: 6px;
          border-left: 4px solid #673de6;
        }

        .faq-item strong {
          color: #673de6;
          display: block;
          margin-bottom: 10px;
          font-size: 16px;
        }

        .faq-item p {
          margin: 0;
          color: #36344d;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #673de6 0%, #5025d1 100%);
          color: white;
          text-align: center;
          padding: 80px 20px;
        }

        .cta-section h2 {
          color: white;
          margin-bottom: 20px;
        }

        .cta-section p {
          color: #d5dfff;
          font-size: 18px;
          max-width: 700px;
          margin: 0 auto 40px;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Demo Section */
        .demo-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
          margin: 50px 0;
        }

        .demo-form {
          background: #f2f3f6;
          padding: 30px;
          border-radius: 8px;
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
          padding: 10px;
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

        .demo-result {
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

        .score-display {
          background: white;
          padding: 30px;
          border-radius: 8px;
          text-align: center;
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

        @media (max-width: 768px) {
          .demo-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          overflow-y: auto;
        }

        .modal-content {
          background: white;
          border-radius: 8px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: modalSlideIn 0.3s ease-out;
          max-height: 90vh;
          overflow-y: auto;
          margin: auto;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #f2f3f6;
          padding-bottom: 20px;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 28px;
          color: #1d1e20;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #727586;
          transition: color 0.2s;
        }

        .modal-close:hover {
          color: #1d1e20;
        }

        .quote-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .quote-form-full {
          grid-column: 1 / -1;
        }

        .quote-form-group {
          display: flex;
          flex-direction: column;
        }

        .quote-form-group label {
          color: #36344d;
          font-weight: 500;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .quote-form-group input,
        .quote-form-group select,
        .quote-form-group textarea {
          padding: 10px;
          border: 1px solid #dadce0;
          border-radius: 4px;
          font-size: 14px;
          font-family: inherit;
        }

        .quote-form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .quote-form-group input:focus,
        .quote-form-group select:focus,
        .quote-form-group textarea:focus {
          outline: none;
          border-color: #673de6;
          box-shadow: 0 0 0 3px rgba(103, 61, 230, 0.1);
        }

        .quote-submit {
          grid-column: 1 / -1;
          background: linear-gradient(135deg, #673de6 0%, #5025d1 100%);
          color: white;
          padding: 14px;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .quote-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(103, 61, 230, 0.3);
        }

        .quote-success {
          text-align: center;
          padding: 40px;
        }

        .quote-success-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .quote-success h3 {
          color: #673de6;
          margin-bottom: 10px;
        }

        .quote-success p {
          color: #727586;
        }

        /* Footer */
        footer {
          background: #1d1e20;
          color: white;
          padding: 50px 20px;
        }

        .footer-content {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }

        footer h3 {
          margin-bottom: 15px;
        }

        footer p {
          color: #727586;
          margin: 8px 0;
        }

        footer a {
          color: #673de6;
          text-decoration: none;
          margin: 0 15px;
          transition: color 0.2s;
        }

        footer a:hover {
          color: #8c85ff;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 32px;
            margin-bottom: 15px;
          }

          .hero p {
            font-size: 15px;
            line-height: 1.5;
          }

          section h2 {
            font-size: 28px;
            margin-bottom: 15px;
          }

          section .subtitle {
            font-size: 15px;
            margin-bottom: 30px;
          }

          .two-column {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .pricing-card.featured {
            transform: scale(1);
          }

          header nav {
            display: none;
          }

          .hero-ctas {
            flex-direction: column;
            gap: 12px;
          }

          .btn {
            width: 100%;
            padding: 12px 24px;
            font-size: 15px;
          }

          .cta-buttons {
            flex-direction: column;
            gap: 12px;
          }

          .cta-button {
            width: 100%;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .process-steps {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .pricing-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .demo-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .modal-content {
            padding: 25px;
            max-width: 95vw;
            max-height: 95vh;
          }

          .modal-header {
            margin-bottom: 20px;
            padding-bottom: 15px;
          }

          .modal-header h2 {
            font-size: 22px;
          }

          .quote-form {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .quote-form-full {
            grid-column: 1;
          }

          .quote-form-group input,
          .quote-form-group select,
          .quote-form-group textarea {
            font-size: 16px;
            padding: 12px;
          }

          section {
            padding: 40px 20px;
          }

          .faq-item {
            padding: 15px;
            margin: 12px 0;
          }

          .demo-form {
            padding: 20px;
          }

          .form-group input,
          .form-group select {
            padding: 12px;
            font-size: 16px;
          }

          .score-display {
            padding: 20px;
          }

          .score-number {
            font-size: 48px;
          }

          .header-content {
            flex-direction: column;
            gap: 15px;
          }

          header nav a {
            margin-left: 15px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .hero h1 {
            font-size: 24px;
            margin-bottom: 12px;
          }

          .hero p {
            font-size: 14px;
          }

          section h2 {
            font-size: 22px;
          }

          .container {
            padding: 0 15px;
          }

          section {
            padding: 30px 15px;
          }

          .modal-content {
            padding: 20px;
          }

          .btn {
            padding: 12px 20px;
            font-size: 14px;
          }

          .quote-form-group label {
            font-size: 13px;
          }

          .quote-submit {
            padding: 12px;
            font-size: 14px;
          }

          .services-grid {
            gap: 15px;
          }

          .service-card {
            padding: 25px;
          }

          .service-card h3 {
            font-size: 18px;
          }

          .pricing-card h3 {
            font-size: 20px;
          }

          .pricing-card .price {
            font-size: 36px;
          }

          .demo-button {
            padding: 12px;
            font-size: 14px;
          }

          .faq-item {
            padding: 12px;
          }

          .faq-item strong {
            font-size: 14px;
          }

          .step-number {
            width: 36px;
            height: 36px;
            line-height: 36px;
            font-size: 16px;
          }

          .step h3 {
            font-size: 16px;
          }

          .two-column h3 {
            font-size: 22px;
          }
        }
      `}</style>

      {/* Header */}
      <header>
        <div className="header-content">
          <svg
            viewBox="0 0 200 50"
            className="logo"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Icon - geometric AI symbol */}
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#673de6', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#5025d1', stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            {/* Geometric AI icon */}
            <circle cx="12" cy="25" r="8" fill="url(#logoGradient)" />
            <circle cx="25" cy="15" r="6" fill="#673de6" opacity="0.6" />
            <circle cx="25" cy="35" r="6" fill="#673de6" opacity="0.6" />
            <line x1="20" y1="25" x2="32" y2="25" stroke="#673de6" strokeWidth="1.5" />
            <line x1="25" y1="21" x2="25" y2="29" stroke="#673de6" strokeWidth="1.5" />

            {/* Text */}
            <text x="45" y="32" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#1d1e20">
              AI Biz Pros
            </text>
          </svg>
          <nav>
            <a href="#services">Services</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>Custom AI Automation Built for Your Business</h1>
          <p>
            We build AI systems that actually work in your operation. Lead qualification, smart forms, email automation, workflow streamlining—all customized to how you run your business.
          </p>
          <div className="hero-ctas">
            <a href="#pricing" className="btn btn-primary">Explore Pricing</a>
            <a href="#contact" className="btn btn-secondary">Schedule a Consultation</a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services">
        <div className="container">
          <h2>What We Build</h2>
          <p className="subtitle">
            Custom AI systems designed around your actual business needs, not generic templates.
          </p>

          <div className="services-grid">
            <div className="service-card">
              <h3>AI Lead Qualification</h3>
              <p>
                Automatically score and prioritize inbound leads based on fit. Spend time on the ones that matter.
              </p>
            </div>

            <div className="service-card">
              <h3>Smart Intake Forms</h3>
              <p>
                Collect client info, set expectations, and trigger workflows—all without manual follow-up.
              </p>
            </div>

            <div className="service-card">
              <h3>AI Email Drafting</h3>
              <p>
                Generate on-brand responses to common inquiries in seconds. Your voice, automated.
              </p>
            </div>

            <div className="service-card">
              <h3>Workflow Automation</h3>
              <p>
                Connect your tools and eliminate repetitive tasks. Hours of manual work, gone.
              </p>
            </div>

            <div className="service-card">
              <h3>Custom Integrations</h3>
              <p>
                We build systems that talk to your existing tools—CRM, email, calendar, databases.
              </p>
            </div>

            <div className="service-card">
              <h3>Ongoing Optimization</h3>
              <p>
                Systems improve over time. We monitor, adjust, and scale as your business grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works">
        <div className="container">
          <h2>How We Work</h2>
          <p className="subtitle">A straightforward process from discovery to launch.</p>

          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Discovery Call</h3>
              <p>
                We understand your bottlenecks, workflow, and goals. 30 minutes, no pressure.
              </p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>Design & Build</h3>
              <p>
                We design your system, build it, and walk you through how it works.
              </p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Launch & Support</h3>
              <p>
                Your system goes live. We support you through implementation and beyond.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '60px', padding: '30px', background: '#f2f3f6', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ margin: 0, color: '#36344d', fontSize: '16px' }}>
              <strong>Timeline:</strong> Most builds are complete in 2–4 weeks, depending on complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section style={{ background: '#f2f3f6' }}>
        <div className="container">
          <h2>See It In Action</h2>
          <p className="subtitle">
            Here's how our AI lead qualification system works. Fill out a sample lead and watch the AI score it.
          </p>

          <div className="demo-container">
            <div className="demo-form">
              <h3>Sample Lead</h3>
              <form onSubmit={runDemo}>
                <div className="form-group">
                  <label>Lead Name</label>
                  <input
                    type="text"
                    name="leadName"
                    placeholder="John Smith"
                    value={demoData.leadName}
                    onChange={handleDemoChange}
                  />
                </div>

                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="ABC Marketing"
                    value={demoData.company}
                    onChange={handleDemoChange}
                  />
                </div>

                <div className="form-group">
                  <label>Industry</label>
                  <select
                    name="industry"
                    value={demoData.industry}
                    onChange={handleDemoChange}
                  >
                    <option value="">Select an industry...</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Budget</label>
                  <select
                    name="budget"
                    value={demoData.budget}
                    onChange={handleDemoChange}
                  >
                    <option value="">Select budget...</option>
                    <option value="high">$50K+/year</option>
                    <option value="medium">$10K–$50K/year</option>
                    <option value="low">Under $10K/year</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Timeline</label>
                  <select
                    name="timeline"
                    value={demoData.timeline}
                    onChange={handleDemoChange}
                  >
                    <option value="">Select timeline...</option>
                    <option value="urgent">This month</option>
                    <option value="soon">Next 1-3 months</option>
                    <option value="later">3+ months</option>
                  </select>
                </div>

                <button type="submit" className="demo-button">
                  Score This Lead
                </button>
              </form>
            </div>

            <div>
              {demoResult ? (
                <div className="demo-result score-display">
                  <div className="score-number">{demoResult.score}</div>
                  <div className="score-grade">{demoResult.grade}</div>
                  <p style={{ color: '#727586', marginBottom: '20px' }}>
                    This lead would be automatically classified and routed based on fit.
                  </p>
                  <div className="score-reasons">
                    <h4>Scoring Factors:</h4>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                      {demoResult.reasons.map((reason, idx) => (
                        <li key={idx}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#ebe4ff', padding: '40px', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ color: '#2f1c6a', fontSize: '16px', lineHeight: '1.6' }}>
                    <strong>Fill out the form and click "Score This Lead"</strong> to see how our AI qualification system instantly evaluates and prioritizes leads.
                  </p>
                  <p style={{ color: '#5025d1', marginTop: '15px', fontSize: '14px' }}>
                    This is just one example. We customize the scoring criteria to match your business.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing">
        <div className="container">
          <h2>Pricing & Options</h2>
          <p className="subtitle">Choose how you want to work with us.</p>

          <div className="pricing-grid">
            {/* Free Option */}
            <div className="pricing-card">
              <h3>Free Build Program</h3>
              <div className="price">$0</div>
              <p style={{ color: '#727586', margin: '0 0 20px' }}>Limited to 5 businesses/quarter</p>
              <ul>
                <li>Custom AI system build</li>
                <li>30-day completion</li>
                <li>Case study documentation</li>
                <li>Full ownership of system</li>
                <li>No ongoing commitment</li>
              </ul>
              <a href="https://forms.gle/fjWE9GfZfx3wPGRj8" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Apply for Free Build
              </a>
              <p style={{ fontSize: '12px', color: '#727586', marginTop: '15px' }}>
                Perfect for: Getting started with AI, trying before buying, or contributing a case study.
              </p>
            </div>

            {/* Paid Build */}
            <div className="pricing-card featured">
              <h3>Custom Build</h3>
              <div className="price">$1,500–$5,000</div>
              <p style={{ color: '#727586', margin: '0 0 20px' }}>One-time project</p>
              <ul>
                <li>Custom AI system design</li>
                <li>Fast-track 2-week delivery</li>
                <li>Full ownership & documentation</li>
                <li>Integration support</li>
                <li>30-day launch support</li>
              </ul>
              <button
                onClick={() => setShowQuoteModal(true)}
                className="btn btn-primary"
                style={{ width: '100%', textAlign: 'center', border: 'none', cursor: 'pointer' }}
              >
                Get a Custom Quote
              </button>
              <p style={{ fontSize: '12px', color: '#727586', marginTop: '15px' }}>
                Perfect for: Businesses ready to invest now and want results fast.
              </p>
            </div>

            {/* Ongoing Support */}
            <div className="pricing-card">
              <h3>Ongoing Support</h3>
              <div className="price">$297<span style={{ fontSize: '20px', color: '#727586' }}>/mo</span></div>
              <p style={{ color: '#727586', margin: '0 0 20px' }}>Continuous optimization</p>
              <ul>
                <li>System monitoring & updates</li>
                <li>Performance optimization</li>
                <li>Priority support</li>
                <li>New feature integration</li>
                <li>Monthly strategy calls</li>
              </ul>
              <a href="#contact" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Learn More
              </a>
              <p style={{ fontSize: '12px', color: '#727586', marginTop: '15px' }}>
                Perfect for: Long-term partners who want continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section>
        <div className="container">
          <h2>Why AI Biz Pros</h2>
          <div className="two-column">
            <div>
              <h3>Built for Real Businesses</h3>
              <p>
                We don't sell software. We don't push generic tools. We build custom systems around how your business actually works, then hand you the keys.
              </p>
              <p style={{ marginTop: '20px' }}>
                Our process is straightforward: understand your bottleneck, build a solution, launch it, and support you through it.
              </p>
            </div>
            <div>
              <h3>What You Get</h3>
              <ul>
                <li>Custom-built (not templated) AI systems</li>
                <li>Full ownership—it's yours to keep</li>
                <li>Integration with your existing tools</li>
                <li>Clear timelines and pricing</li>
                <li>Ongoing support available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="container">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <strong>Q: Can I use the free program if I have budget?</strong>
            <p>Yes. If you prefer to invest now instead of waiting, we offer paid builds with faster timelines. Just contact us.</p>
          </div>

          <div className="faq-item">
            <strong>Q: What if my business is unique or complex?</strong>
            <p>That's exactly what we specialize in. We work with any industry and any operational setup. Let's talk about your specific needs.</p>
          </div>

          <div className="faq-item">
            <strong>Q: Do I own the system you build?</strong>
            <p>Yes. Fully. You own the system, the workflows, and everything in it. It's yours to use, modify, or hand off.</p>
          </div>

          <div className="faq-item">
            <strong>Q: Can you integrate with my current tools?</strong>
            <p>In most cases, yes. We work with popular platforms (CRM, email, calendar, databases, etc.). Let's discuss your stack.</p>
          </div>

          <div className="faq-item">
            <strong>Q: What happens after the build is complete?</strong>
            <p>We support your launch and the first 30 days. After that, ongoing support is optional. If you want us to keep optimizing, we offer monthly plans.</p>
          </div>

          <div className="faq-item">
            <strong>Q: How fast can you deliver?</strong>
            <p>Free builds: 2–4 weeks. Paid builds: 2–3 weeks. Complex systems may take longer. We'll give you a clear timeline upfront.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="container">
          <h2>Ready to Automate?</h2>
          <p>
            Whether you're exploring the free program or ready to invest, let's talk about what's possible for your business.
          </p>
          <div className="cta-buttons">
            <a href="https://forms.gle/fjWE9GfZfx3wPGRj8" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Apply for Free Build
            </a>
            <a href="https://forms.gle/fjWE9GfZfx3wPGRj8" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <svg
            viewBox="0 0 200 50"
            style={{ height: '35px', width: 'auto', margin: '0 auto 15px', display: 'block' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logoGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#673de6', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#5025d1', stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            <circle cx="12" cy="25" r="8" fill="url(#logoGradientFooter)" />
            <circle cx="25" cy="15" r="6" fill="#673de6" opacity="0.6" />
            <circle cx="25" cy="35" r="6" fill="#673de6" opacity="0.6" />
            <line x1="20" y1="25" x2="32" y2="25" stroke="#673de6" strokeWidth="1.5" />
            <line x1="25" y1="21" x2="25" y2="29" stroke="#673de6" strokeWidth="1.5" />

            <text x="45" y="32" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="white">
              AI Biz Pros
            </text>
          </svg>
          <p>Custom AI automation for small and mid-sized businesses</p>
          <p>theaibizpros.com | support@theaibizpros.com</p>
          <div style={{ marginTop: '20px' }}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
          <p style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #727586', fontSize: '12px' }}>
            © 2026 AI Biz Pros. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Quote Request Modal */}
      {showQuoteModal && (
        <div className="modal-overlay" onClick={closeQuoteModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {quoteSubmitted ? (
              <div className="quote-success">
                <div className="quote-success-icon">✓</div>
                <h3>Quote Request Received!</h3>
                <p>
                  Thanks for your interest. We'll review your details and follow up within 24 hours with a custom quote.
                </p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2>Request a Custom Quote</h2>
                  <button className="modal-close" onClick={closeQuoteModal}>
                    ×
                  </button>
                </div>

                <form onSubmit={handleQuoteSubmit} className="quote-form">
                  {/* Contact Section */}
                  <div className="quote-form-group">
                    <label>Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      placeholder="Your business name"
                      value={quoteFormData.companyName}
                      onChange={handleQuoteChange}
                    />
                  </div>

                  <div className="quote-form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      name="contactName"
                      required
                      placeholder="Full name"
                      value={quoteFormData.contactName}
                      onChange={handleQuoteChange}
                    />
                  </div>

                  <div className="quote-form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      value={quoteFormData.email}
                      onChange={handleQuoteChange}
                    />
                  </div>

                  <div className="quote-form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="(555) 123-4567"
                      value={quoteFormData.phone}
                      onChange={handleQuoteChange}
                    />
                  </div>

                  {/* Pain Point - REQUIRED */}
                  <div className="quote-form-group quote-form-full">
                    <label>What's Your #1 Pain Point Right Now? *</label>
                    <textarea
                      name="primaryPainPoint"
                      required
                      placeholder="e.g., Too many leads coming in and we can't respond fast enough, manual data entry is killing our team's productivity, clients are frustrated with slow onboarding"
                      value={quoteFormData.primaryPainPoint}
                      onChange={handleQuoteChange}
                      style={{ minHeight: '80px' }}
                    />
                  </div>

                  {/* Optional Context */}
                  <div className="quote-form-group">
                    <label>Industry</label>
                    <select
                      name="industry"
                      value={quoteFormData.industry}
                      onChange={handleQuoteChange}
                    >
                      <option value="">Select your industry...</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Staffing/Recruitment">Staffing/Recruitment</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Technology">Technology</option>
                      <option value="Marketing/Advertising">Marketing/Advertising</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="quote-form-group">
                    <label>Team Size</label>
                    <select
                      name="employeeCount"
                      value={quoteFormData.employeeCount}
                      onChange={handleQuoteChange}
                    >
                      <option value="">How many employees?</option>
                      <option value="1-5">1–5</option>
                      <option value="6-20">6–20</option>
                      <option value="21-50">21–50</option>
                      <option value="51-100">51–100</option>
                      <option value="100+">100+</option>
                    </select>
                  </div>

                  <div className="quote-form-group quote-form-full">
                    <label>Describe the Current Process You Want to Automate</label>
                    <textarea
                      name="currentProcess"
                      placeholder="Walk us through what happens now. Example: Leads fill out a form → someone manually reads it → someone emails them → someone enters data into CRM → someone schedules a call."
                      value={quoteFormData.currentProcess}
                      onChange={handleQuoteChange}
                      style={{ minHeight: '80px' }}
                    />
                  </div>

                  <div className="quote-form-group">
                    <label>Current Monthly Volume</label>
                    <input
                      type="text"
                      name="currentVolume"
                      placeholder="e.g., 50 leads/month, 100 form submissions/week"
                      value={quoteFormData.currentVolume}
                      onChange={handleQuoteChange}
                    />
                  </div>

                  <div className="quote-form-group">
                    <label>What Tools Do You Currently Use?</label>
                    <input
                      type="text"
                      name="toolsUsed"
                      placeholder="e.g., Salesforce, HubSpot, Gmail, Slack, Zapier"
                      value={quoteFormData.toolsUsed}
                      onChange={handleQuoteChange}
                    />
                  </div>

                  <div className="quote-form-group">
                    <label>Timeline</label>
                    <select
                      name="decisionTimeline"
                      value={quoteFormData.decisionTimeline}
                      onChange={handleQuoteChange}
                    >
                      <option value="">When would you need this?</option>
                      <option value="Immediately (this month)">Immediately (this month)</option>
                      <option value="Next 1-2 months">Next 1–2 months</option>
                      <option value="Next quarter">Next quarter</option>
                      <option value="This year">This year</option>
                      <option value="Exploring options">Just exploring options</option>
                    </select>
                  </div>

                  <div className="quote-form-group">
                    <label>Budget Range</label>
                    <select
                      name="budget"
                      value={quoteFormData.budget}
                      onChange={handleQuoteChange}
                    >
                      <option value="">What's your budget?</option>
                      <option value="Under $2K">Under $2,000</option>
                      <option value="$2K–$5K">$2,000–$5,000</option>
                      <option value="$5K–$10K">$5,000–$10,000</option>
                      <option value="$10K+">$10,000+</option>
                      <option value="Open to discuss">Open to discuss</option>
                    </select>
                  </div>

                  <div className="quote-form-group quote-form-full">
                    <label>Anything Else We Should Know?</label>
                    <textarea
                      name="additionalContext"
                      placeholder="Any other details that might be helpful"
                      value={quoteFormData.additionalContext}
                      onChange={handleQuoteChange}
                      style={{ minHeight: '80px' }}
                    />
                  </div>

                  <button type="submit" className="quote-submit">
                    Get Quote & Next Steps
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
