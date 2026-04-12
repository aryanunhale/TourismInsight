import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { MapPin, BarChart3, Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-icon">✦</span>
          <span className="brand-text">Tourism<em>Insight</em></span>
        </Link>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setOpen(false)}>
            <MapPin size={15} /> Home
          </Link>
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => setOpen(false)}>
            <BarChart3 size={15} /> Dashboard
          </Link>
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <Link to="/dashboard" className="nav-cta" onClick={() => setOpen(false)}>Explore Data →</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="theme-toggle theme-toggle-mobile" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="hamburger" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
