import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Globe, Users, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import { stats, destinations, bySeason } from '../data/tourismData'

function formatNum(n) {
  if (n >= 1e9) return `₹${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return n.toString()
}

const SEASON_COLORS = { Monsoon: '#4ade80', Summer: '#fb923c', Winter: '#60a5fa', Autumn: '#f59e0b' }

export default function Home() {
  const maxSeason = Math.max(...bySeason.map(s => s.visitors))

  return (
    <div className="home">
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="orb orb3" />
          <div className="grid-overlay" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            India Tourism Analytics 2024
          </div>
          <h1 className="hero-title">
            Discover India's
            <br />
            <em className="hero-accent">Tourism Story</em>
          </h1>
          <p className="hero-sub">
            Deep-dive analytics across 30 destinations, 25 million visitors, and ₹273B in tourism revenue. Built on 10,000 data points.
          </p>
          <div className="hero-actions">
            <Link to="/dashboard" className="btn-primary">
              Explore Dashboard <ArrowRight size={18} />
            </Link>
            <a href="#highlights" className="btn-ghost">View Highlights</a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hstat-val">{formatNum(stats.totalVisitors)}</span>
              <span className="hstat-label">Total Visitors</span>
            </div>
            <div className="hstat-div" />
            <div className="hero-stat">
              <span className="hstat-val">₹{(stats.totalRevenue / 1e9).toFixed(0)}B</span>
              <span className="hstat-label">Est. Revenue</span>
            </div>
            <div className="hstat-div" />
            <div className="hero-stat">
              <span className="hstat-val">30</span>
              <span className="hstat-label">Destinations</span>
            </div>
            <div className="hstat-div" />
            <div className="hero-stat">
              <span className="hstat-val">{stats.avgStay}</span>
              <span className="hstat-label">Avg Nights Stay</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="globe-wrap">
            <div className="globe">
              <div className="globe-ring" />
              <div className="globe-ring ring2" />
              <div className="globe-core">
                <Globe size={56} strokeWidth={0.8} />
              </div>
              {destinations.slice(0, 5).map((d, i) => (
                <div key={d.name} className="globe-pin" style={{
                  '--angle': `${i * 72}deg`,
                  animationDelay: `${i * 0.4}s`
                }}>
                  <span className="pin-emoji">{d.emoji}</span>
                  <span className="pin-label">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="highlights">
        <div className="section-header">
          <span className="section-tag">Key Findings</span>
          <h2 className="section-title">What The Data Reveals</h2>
          <p className="section-sub">Patterns uncovered from 10,000 tourism records spanning all of 2024</p>
        </div>

        <div className="highlights-grid">
          <div className="highlight-card card-tall">
            <div className="hcard-icon"><TrendingUp size={24} /></div>
            <h3>Seasonal Surge</h3>
            <p>Monsoon season dominates with <strong>33%</strong> of all annual visitors — contrary to expectations.</p>
            <div className="season-bars">
              {bySeason.map(s => (
                <div key={s.season} className="sbar-row">
                  <span className="sbar-label">{s.season}</span>
                  <div className="sbar-track">
                    <div className="sbar-fill" style={{
                      width: `${(s.visitors / maxSeason) * 100}%`,
                      background: SEASON_COLORS[s.season]
                    }} />
                  </div>
                  <span className="sbar-val">{(s.visitors / 1e6).toFixed(1)}M</span>
                </div>
              ))}
            </div>
          </div>

          <div className="highlight-card">
            <div className="hcard-icon"><MapPin size={24} /></div>
            <h3>Top Destination</h3>
            <p>Darjeeling leads all destinations with nearly <strong>950K visitors</strong> and ₹10.1B in revenue.</p>
            <div className="top-dest-badge">
              <span className="badge-num">#1</span>
              <div>
                <strong>Darjeeling</strong>
                <span>Hill Station · West Bengal</span>
              </div>
              <span className="badge-emoji">🏔️</span>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hcard-icon"><Users size={24} /></div>
            <h3>Traveller Profile</h3>
            <p>The <strong>50+ age group</strong> is the largest segment — seniors are India's biggest tourism demographic.</p>
            <div className="age-bubbles">
              {[{a:'18–25',v:6.2},{a:'26–35',v:6.2},{a:'36–50',v:6.4},{a:'50+',v:6.4}].map(b => (
                <div key={b.a} className="age-bubble" style={{ '--size': `${40 + b.v * 8}px` }}>
                  <span>{b.a}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="highlight-card card-wide">
            <div className="hcard-icon"><Globe size={24} /></div>
            <h3>International Origins</h3>
            <p>Australia leads international arrivals, with near-equal distribution across 8 source countries.</p>
            <div className="country-flags">
              {[
                { c: 'Australia', f: '🇦🇺', v: 3.27 },
                { c: 'Canada', f: '🇨🇦', v: 3.21 },
                { c: 'UK', f: '🇬🇧', v: 3.21 },
                { c: 'Japan', f: '🇯🇵', v: 3.15 },
                { c: 'USA', f: '🇺🇸', v: 3.13 },
                { c: 'India', f: '🇮🇳', v: 3.12 },
                { c: 'France', f: '🇫🇷', v: 3.09 },
                { c: 'Germany', f: '🇩🇪', v: 3.02 },
              ].map(item => (
                <div key={item.c} className="cflag">
                  <span className="cflag-emoji">{item.f}</span>
                  <span className="cflag-name">{item.c}</span>
                  <span className="cflag-val">{item.v}M</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="destinations-section">
        <div className="section-header">
          <span className="section-tag">Destinations</span>
          <h2 className="section-title">Featured Locations</h2>
          <p className="section-sub">From sun-drenched beaches to snow-capped peaks — India's tourist map</p>
        </div>

        <div className="dest-grid">
          {destinations.map((d, i) => (
            <div key={d.name} className="dest-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="dest-emoji">{d.emoji}</div>
              <span className="dest-tag">{d.tag}</span>
              <h3 className="dest-name">{d.name}</h3>
              <p className="dest-desc">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>Ready to Explore the Full Analysis?</h2>
          <p>Interactive charts, seasonal trends, revenue heatmaps, and demographic breakdowns — all in one dashboard.</p>
          <Link to="/dashboard" className="btn-primary btn-large">
            Open Dashboard <ArrowRight size={20} />
          </Link>
        </div>
        <div className="cta-orbs">
          <div className="corb corb1" />
          <div className="corb corb2" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="brand">
            <span className="brand-icon">✦</span>
            <span className="brand-text">Tourism<em>Insight</em></span>
          </div>
          <p className="footer-note">Travel & Tourism Data Analysis · India 2024 · 10,000 Records</p>
          <p className="footer-note" style={{ opacity: 0.4 }}>Built with React + Vite · Data via CSV Dataset</p>
        </div>
      </footer>
    </div>
  )
}
