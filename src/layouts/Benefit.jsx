import React, { useState, useCallback } from 'react'
import { FaArrowRight, FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import './styles/benefit.css'

const BENEFIT_DETAILS = [
  { 
    id: 1,
    title: "Improve Your ATS Score", 
    description: "A resume analyzer helps you optimize your resume for Applicant Tracking Systems used by most companies today. It scans your document and identifies missing keywords that recruiters are searching for. By adding the right skills and phrases, your chances of passing automated screening increase significantly." 
  },
  { 
    id: 2,
    title: "Identify Missing Skills and Keywords", 
    description: "One of the biggest advantages of a resume analyzer is discovering what your resume lacks. It compares your resume with job descriptions and points out missing skills or important keywords. This helps you align your resume with industry demands and recruiter expectations." 
  },
  { 
    id: 3,
    title: "Get Professional Suggestions for Improvement", 
    description: "A resume analyzer acts like a personal career assistant by giving smart suggestions. It reviews your content, structure, and wording to improve overall quality. You receive feedback on weak bullet points and how to make them more impactful." 
  },
  { 
    id: 4,
    title: "Save Time and Increase Job Success Rate", 
    description: "Creating a perfect resume manually can take a lot of time and effort. A resume analyzer speeds up this process by instantly identifying problems and providing solutions. Instead of guessing what works, you get data-driven insights to apply faster." 
  }
]

const Benefit = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % BENEFIT_DETAILS.length)
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + BENEFIT_DETAILS.length) % BENEFIT_DETAILS.length)
  }, [])

  const currentCard = BENEFIT_DETAILS[currentIndex]

  return (
    <section id="benefit">
      <div className="benefit-header">
        <h2>Key Benefits of AI Analysis</h2>
        <p>Unlock career growth with actionable insights designed to get your CV noticed.</p>
      </div>

      <div className="carousel-wrapper">
        <div className="benefit-card">
          <div className="card-badge">
            <FaCheckCircle className="badge-icon" />
            <span>Benefit {currentIndex + 1} of {BENEFIT_DETAILS.length}</span>
          </div>
          
          <h3 className="card-title">{currentCard.title}</h3>
          <p className="card-description">{currentCard.description}</p>

          {/* Navigation Controls */}
          <div className="card-footer">
            {/* Step Indicators */}
            <div className="indicators">
              {BENEFIT_DETAILS.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="nav-buttons">
              <button onClick={handlePrev} className="nav-btn" aria-label="Previous Benefit">
                <FaArrowLeft />
              </button>
              <button onClick={handleNext} className="nav-btn primary" aria-label="Next Benefit">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Benefit.displayName = 'Benefit'
export default Benefit