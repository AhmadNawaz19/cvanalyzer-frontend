import React from 'react'
import './styles/main.css'

const Main = React.memo(() => {
  return (
    <section id='main'>
      <div className='hero-badge'>
        <span className='pulse'></span> Next-Gen ATS Optimization
      </div>
      <h1>
        Elevate Your Resume with <span className='highlight'>AI Precision</span>
      </h1>
      <p>
        Upload your CV to get instant actionable feedback, dynamic ATS scoring, 
        and tailored improvements for your target roles.
      </p>
      <div className='hero-actions'>
        <button className='btn-primary'>Get Started</button>
        <button className='btn-secondary'>View Demo</button>
      </div>
    </section>
  )
})

Main.displayName = 'Main'
export default Main