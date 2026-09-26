import React from 'react'
import './styles/dashboard.css'

const Dashboard = React.memo(() => {
  return (
    <section id="dashboard-preview">
      <div className="dashboard-header">
        <h2>Interactive Analytics Dashboard</h2>
        <p>Get comprehensive visual breakdowns of ATS compatibility, keyword matches, and candidate rankings.</p>
      </div>

      {/* Modern Mockup Frame */}
      <div className="mockup-container">
        {/* Browser Top Bar */}
        <div className="browser-header">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
          <div className="browser-address">app.resumeanalyzer.ai/dashboard</div>
        </div>

        {/* Dashboard Image */}
        <div className="image-wrapper">
          <img src="/dashboard.png" alt="AI Resume Dashboard Preview" />
        </div>

        {/* Floating Highlight Card */}
        <div className="floating-stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-info">
            <span className="stat-value">94.2%</span>
            <span className="stat-label">Average Match Accuracy</span>
          </div>
        </div>
      </div>
    </section>
  )
})

Dashboard.displayName = 'Dashboard'
export default Dashboard