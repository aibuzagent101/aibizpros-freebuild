import Head from 'next/head';
import { useState } from 'react';

export default function Demo() {
  const [demoData, setDemoData] = useState({
    leadName: '',
    company: '',
    industry: '',
    budget: '',
    timeline: '',
  });

  const [demoResult, setDemoResult] = useState(null);

  const handleDemoChange = (e) => {
    setDemoData({
      ...demoData,
      [e.target.name]: e.target.value,
    });
  };

  const runDemo = (e) => {
    e.preventDefault();

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
        <title>See AI Lead Qualification In Action - AI Biz Pros</title>
        <meta name="description" content="Watch how our AI automatically scores and qualifies leads in seconds." />
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
          padding: 80px 20px;
        }

        .demo-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: start;
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

        .score-display {
          background: white;
          padding: 30px;
          border-radius: 8px;
          text-align: center;
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

        .placeholder-box strong {
          display: block;
          margin-bottom: 10px;
        }

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

        .back-link {
          display: inline-block;
          color: #673de6;
          text-decoration: none;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 32px;
          }

          .demo-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .cta-section h2 {
            font-size: 28px;
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
          <h1>See It In Action</h1>
          <p>Watch how our AI lead qualification system works in real-time. Fill out a sample lead and see how it's instantly scored and classified.</p>
        </div>
      </section>

      {/* Demo */}
      <section className="demo-section">
        <div className="container">
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
                <div className="score-display">
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
                <div className="placeholder-box">
                  <strong>Fill out the form and click "Score This Lead"</strong>
                  <p>
                    Watch how our AI qualification system instantly evaluates and prioritizes leads. This is just one example—we customize the scoring criteria to match your business.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>
            This is just a sample of what's possible. Our AI systems are fully customized to your business, integrating with your existing tools and workflows.
          </p>
          <a href="/#pricing" className="cta-button">
            Explore Our Pricing
          </a>
        </div>
      </section>
    </>
  );
}
