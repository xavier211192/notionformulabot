'use client'
import { useState } from 'react'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'generate' | 'explain'>('generate')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    setLoading(true)
    // Simulate API call for now
    setTimeout(() => {
      console.log('Submitted:', input)
      setLoading(false)
    }, 2000)
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
                Notion Formula Bot
              </h1>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                AI-powered formula assistant
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div style={{ maxWidth: '896px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
            AI-powered Notion formula assistant
          </h2>
          <p style={{ fontSize: '18px', color: '#4b5563', maxWidth: '512px', margin: '0 auto' }}>
            Generate formulas from plain English or get instant explanations of existing formulas.
          </p>
        </div>
        
        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#f3f4f6', padding: '4px', borderRadius: '8px', display: 'inline-flex' }}>
            <button
              onClick={() => setActiveTab('generate')}
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
              onClick={() => setActiveTab('explain')}
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
        
        {/* Input Form */}
        <div style={{ maxWidth: '512px', margin: '0 auto' }}>
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