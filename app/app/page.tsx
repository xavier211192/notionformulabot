'use client'
import { useState, useEffect } from 'react'

interface Result {
  formula?: string
  explanation: string
  breakdown?: string
}

const generateExamples = [
  'Calculate days until deadline',
  'Show High/Medium/Low based on score',
  'Count completed tasks',
  'Format phone number with dashes'
]

const explainExamples = [
  'dateBetween(prop("Due Date"), now(), "days")',
  'if(prop("Score") > 80, "High", "Low")',
  'prop("Tasks").filter(current.prop("Status") == "Done").length()',
  'replaceAll(prop("Phone"), "[^0-9]", "")'
]

export default function Home() {
  const [activeTab, setActiveTab] = useState<'generate' | 'explain'>('generate')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [copied, setCopied] = useState(false)

  // Daily usage tracking
  const [dailyUsage, setDailyUsage] = useState(0)
  const [dailyLimit] = useState(5)

  // Get today's storage key
  const getDailyKey = () => {
    const today = new Date().toDateString() // "Mon Dec 25 2023"
    return `notion-bot-daily-${today}`
  }

  // Load daily usage on component mount
  useEffect(() => {
    const todayKey = getDailyKey()
    const stored = localStorage.getItem(todayKey)
    if (stored) {
      setDailyUsage(parseInt(stored, 10))
    } else {
      setDailyUsage(0)
    }
  }, [])

  // Function to increment daily usage
  const incrementDailyUsage = () => {
    const todayKey = getDailyKey()
    const newCount = dailyUsage + 1
    setDailyUsage(newCount)
    localStorage.setItem(todayKey, newCount.toString())
  }

  const handleWaitlistSignup = () => {
    window.open('https://forms.gle/LGEv5ASTdzDVS3k59', '_blank')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    // Check daily limit
    if (dailyUsage >= dailyLimit) {
      alert('You\'ve reached your daily limit of 5 formulas. Try again tomorrow or join the waitlist for unlimited access!')
      handleWaitlistSignup()
      return
    }
    
    setLoading(true)
    setResult(null)

    try {
      const endpoint = activeTab === 'generate' ? '/api/generate' : '/api/explain'
      const body = activeTab === 'generate' ? { input } : { formula: input }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
        incrementDailyUsage() // Track successful usage
      } else {
        alert(data.error || 'Something went wrong')
      }
    } catch (error) {
      alert('Failed to process request')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (result?.formula) {
      try {
        await navigator.clipboard.writeText(result.formula)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  const placeholder = activeTab === 'generate' 
    ? 'e.g., Calculate the number of days until deadline...'
    : 'e.g., dateBetween(prop("Due Date"), now(), "days")'

  const buttonText = activeTab === 'generate' ? 'Generate Formula' : 'Explain Formula'
  const loadingText = activeTab === 'generate' ? 'Generating...' : 'Analyzing...'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              backgroundColor: '#111827', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <span style={{ color: 'white', fontSize: '20px' }}>🤖</span>
            </div>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Notion Assist
              </h1>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                AI-powered Notion assistant
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Hero section */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
            AI-powered Notion assistant
          </h2>
          <p style={{ fontSize: '18px', color: '#4b5563', maxWidth: '512px', margin: '0 auto' }}>
            Generate Notion formulas from plain English or get instant explanations of existing formulas.
          </p>
        </div>
        
        {/* Tab switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#f3f4f6', padding: '4px', borderRadius: '8px', display: 'inline-flex' }}>
            <button
              onClick={() => {
                setActiveTab('generate')
                setResult(null)
                setInput('')
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'generate' ? 'white' : 'transparent',
                color: activeTab === 'generate' ? '#111827' : '#6b7280',
                boxShadow: activeTab === 'generate' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
              }}
            >
              ⚡ Generate Formula
            </button>
            <button
              onClick={() => {
                setActiveTab('explain')
                setResult(null)
                setInput('')
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'explain' ? 'white' : 'transparent',
                color: activeTab === 'explain' ? '#111827' : '#6b7280',
                boxShadow: activeTab === 'explain' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
              }}
            >
              📖 Explain Formula
            </button>
          </div>
        </div>
        
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Main Interface */}
          <div className="lg:col-span-2">
            {/* Input Form */}
            <div style={{ 
              backgroundColor: '#f9fafb', 
              border: '1px solid #e5e7eb', 
              borderRadius: '12px', 
              padding: '24px',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              marginBottom: '24px'
            }}>
              <form onSubmit={handleSubmit}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151', 
                  marginBottom: '12px' 
                }}>
                  {activeTab === 'generate' 
                    ? 'What would you like to calculate?' 
                    : 'Paste your formula here:'}
                </label>
                
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={placeholder}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    resize: 'none',
                    height: '96px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  style={{
                    marginTop: '16px',
                    width: '100%',
                    backgroundColor: loading || !input.trim() ? '#9ca3af' : '#111827',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid white',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      {loadingText}
                    </>
                  ) : (
                    <>
                      ➤ {buttonText}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Results Display */}
            {result && (
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                marginBottom: '24px'
              }}>
                {activeTab === 'generate' ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#374151', margin: 0 }}>
                        Your formula:
                      </h3>
                      {result.formula && (
                        <button
                          onClick={handleCopy}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '14px',
                            color: '#2563eb',
                            fontWeight: '500',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer'
                          }}
                        >
                          {copied ? '✓ Copied!' : '📋 Copy formula'}
                        </button>
                      )}
                    </div>
                    
                    {result.formula && (
                      <div style={{
                        backgroundColor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '16px',
                        marginBottom: '16px'
                      }}>
                        <code style={{
                          fontSize: '14px',
                          fontFamily: 'Monaco, Consolas, monospace',
                          color: '#111827',
                          wordBreak: 'break-all'
                        }}>
                          {result.formula}
                        </code>
                      </div>
                    )}
                    
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ fontSize: '16px' }}>📖</span>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                        {result.explanation}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '16px' }}>
                      Formula explanation:
                    </h3>
                    <div style={{ 
                      backgroundColor: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '16px',
                      marginBottom: '16px'
                    }}>
                      <p style={{ 
                        fontSize: '14px', 
                        color: '#374151', 
                        margin: 0,
                        lineHeight: '1.6'
                      }}>
                        {result.explanation}
                      </p>
                    </div>
                    {result.breakdown && (
                      <div style={{
                        backgroundColor: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        borderRadius: '8px',
                        padding: '16px'
                      }}>
                        <p style={{ 
                          fontSize: '14px', 
                          color: '#1e40af', 
                          margin: 0,
                          lineHeight: '1.5'
                        }}>
                          <strong>How it works:</strong> {result.breakdown}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Progress bar/usage counter - right under results */}
            {result && dailyUsage >= 3 && (
              <div style={{
                backgroundColor: dailyUsage >= dailyLimit ? '#fef2f2' : '#eff6ff',
                border: `1px solid ${dailyUsage >= dailyLimit ? '#fecaca' : '#bfdbfe'}`,
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: dailyUsage >= dailyLimit ? '#dc2626' : '#1e40af', 
                      margin: 0 
                    }}>
                      {dailyUsage >= dailyLimit ? 'Daily limit reached' : 'Getting close to daily limit'}
                    </p>
                    <p style={{ 
                      fontSize: '12px', 
                      color: dailyUsage >= dailyLimit ? '#dc2626' : '#1e40af', 
                      margin: 0 
                    }}>
                      {dailyUsage} of {dailyLimit} formulas used today • Resets tomorrow
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '64px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '9999px',
                      height: '8px'
                    }}>
                      <div style={{
                        backgroundColor: dailyUsage >= dailyLimit ? '#dc2626' : '#3b82f6',
                        height: '8px',
                        borderRadius: '9999px',
                        width: `${Math.min((dailyUsage / dailyLimit) * 100, 100)}%`
                      }}></div>
                    </div>
                    <button 
                      onClick={handleWaitlistSignup}
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#2563eb',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      Join Waitlist
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Examples Sidebar */}
          <div className="lg:sticky lg:top-12 lg:h-fit">
            <div style={{ 
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#111827', 
                marginBottom: '16px',
                margin: 0
              }}>
                {activeTab === 'generate' ? 'Try these examples:' : 'Example formulas to explain:'}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {(activeTab === 'generate' ? generateExamples : explainExamples).map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(example)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px',
                      fontSize: '14px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: activeTab === 'explain' ? 'Monaco, Consolas, monospace' : 'inherit'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6'
                      e.currentTarget.style.borderColor = '#d1d5db'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white'
                      e.currentTarget.style.borderColor = '#e5e7eb'
                    }}
                  >
                    {example}
                  </button>
                ))}
              </div>
              
              {/* Pro tip card */}
              <div style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>💡</span>
                  <div>
                    <h4 style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#1e40af', 
                      margin: '0 0 4px 0' 
                    }}>
                      Pro tip
                    </h4>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#1e40af', 
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                      {activeTab === 'generate' 
                        ? 'Be specific about your requirements. Include property names and desired output formats.'
                        : 'Paste formulas exactly as they appear in Notion for the most accurate explanations.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}