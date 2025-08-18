'use client'

export default function LandingPage() {

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                <span style={{ color: 'white', fontSize: '18px' }}>🤖</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                Notion Assist
              </span>
            </div>
            <a 
              href="/app"
              style={{
                backgroundColor: '#f3f4f6',
                color: '#374151',
                padding: '8px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Try Free Version
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: '700', 
            color: '#111827', 
            marginBottom: '24px',
            lineHeight: '1.1'
          }}>
            AI Assistant<br />for Notion
          </h1>
          <p style={{ 
            fontSize: '20px', 
            color: '#6b7280', 
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px auto'
          }}>
            This is the free MVP version of the tool designed to make writing Notion formulas easier.
          </p>
          <a 
            href="/app"
            style={{
              display: 'inline-block',
              backgroundColor: 'white',
              color: '#111827',
              border: '2px solid #111827',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#111827'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
              e.currentTarget.style.color = '#111827'
            }}
          >
            Try it Free
          </a>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #e5e7eb', margin: '80px 0' }}></div>

        {/* Waitlist Section */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '42px', 
            fontWeight: '600', 
            color: '#111827', 
            marginBottom: '24px'
          }}>
            Join the Waitlist
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#6b7280', 
            marginBottom: '40px',
            maxWidth: '500px',
            margin: '0 auto 40px auto'
          }}>
            Interested in the full version? Get early access by joining our waitlist.
          </p>

          {/* Features Preview */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
            maxWidth: '800px',
            margin: '0 auto 48px auto'
          }}>
            <div style={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>∞</div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                Unlimited Formulas
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                Generate as many formulas as you need
              </p>
            </div>
            
            <div style={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔗</div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                Direct Integration
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                Connect directly to your Notion workspace
              </p>
            </div>
            
            <div style={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📚</div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                Template Library
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                Pre-built formulas for common use cases
              </p>
            </div>
          </div>

          {/* Join Waitlist Link */}
          <div style={{ textAlign: 'center' }}>
            <a 
              href="https://forms.gle/LGEv5ASTdzDVS3k59"
              target="_blank"
              style={{
                backgroundColor: '#111827',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Join Waitlist
            </a>
            <p style={{ fontSize: '14px', color: '#9ca3af', margin: '16px 0 0 0' }}>
              No spam, unsubscribe anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}