import React from 'react'
import './styles/features.css'

const FEATURES_DATA = [
  {
    id: 'ats-score',
    title: 'ATS Score',
    description: 'Get an instant Applicant Tracking System score to see how well your resume performs against industry standards.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    badgeColor: 'indigo'
  },
  {
    id: 'skill-analysis',
    title: 'Skill Analysis',
    description: 'Analyze your skills and identify strengths and gaps based on real-time job requirements and market demand.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M12 12L2.5 7.5" />
      </svg>
    ),
    badgeColor: 'violet'
  },
  {
    id: 'missing-keywords',
    title: 'Missing Keywords',
    description: 'Discover crucial high-impact keywords missing from your CV that automated recruiter screeners filter for.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
    badgeColor: 'rose'
  },
  {
    id: 'smart-suggestions',
    title: 'Smart Suggestions',
    description: 'Receive personalized AI suggestions to refine formatting, action verbs, and quantifiable achievements.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    badgeColor: 'amber'
  }
]

const Features = React.memo(() => {
  return (
    <section id="features">
      <div className="features-header">
        <h2 id="features-title">Powerful Resume Analysis Features</h2>
        <p id="features-subtitle">
          Get detailed insights and elevate your job search strategy with AI-driven feedback.
        </p>
      </div>

      <div id="features-container">
        {FEATURES_DATA.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div className={`icon-badge ${feature.badgeColor}`}>
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
})

Features.displayName = 'Features'
export default Features