import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts'
import { Users, DollarSign, Moon, TrendingUp, MapPin, Plane, Bed, Clock, Download } from 'lucide-react'
import Navbar from '../components/Navbar'
import ExportModal from '../components/ExportModal'
import { useTheme } from '../context/ThemeContext'
import {
  stats, visitorsByMonth, visitorsByLocation, bySeason,
  byPurpose, byTransport, byAccommodation, byAgeGroup, byCountry, visitorType
} from '../data/tourismData'

function fmtV(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`
  return n
}
function fmtR(n) {
  if (n >= 1e9) return `₹${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `₹${(n / 1e6).toFixed(0)}M`
  return `₹${n}`
}

const PALETTE = ['#6366f1', '#22d3ee', '#f59e0b', '#4ade80', '#fb923c', '#e879f9', '#60a5fa', '#34d399']
const SEASON_C = { Monsoon: '#4ade80', Summer: '#fb923c', Winter: '#60a5fa', Autumn: '#f59e0b' }

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip">
      <p className="tt-label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="tt-val" style={{ color: p.color }}>
          {p.name}: {typeof p.value === 'number' && p.value > 1e6 ? fmtV(p.value) : p.value?.toLocaleString?.() ?? p.value}
        </p>
      ))}
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="stat-card" style={{ '--accent': color }}>
      <div className="stat-icon"><Icon size={20} /></div>
      <div className="stat-info">
        <span className="stat-val">{value}</span>
        <span className="stat-label">{label}</span>
        {sub && <span className="stat-sub">{sub}</span>}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [activeMonth, setActiveMonth] = useState(null)
  const [showExport, setShowExport] = useState(false)
  const { theme } = useTheme()
  const gridColor = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"
  const tickColor = theme === "dark" ? "#94a3b8" : "#64748b"
  const legendColor = theme === "dark" ? "#94a3b8" : "#475569"
  const polarGridColor = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dash-header">
        <div className="dash-title-block">
          <span className="section-tag">Live Analytics</span>
          <h1 className="dash-title">Tourism Dashboard</h1>
          <p className="dash-sub">India 2024 · 10,000 records · 30 destinations · 8 source countries</p>
        </div>
        <button className="export-btn" onClick={() => setShowExport(true)}>
          <Download size={16} /> Export Data
        </button>
      </div>

      {showExport && <ExportModal onClose={() => setShowExport(false)} />}

      {/* KPI Cards */}
      <div className="kpi-grid">
        <StatCard icon={Users} label="Total Visitors" value={`${(stats.totalVisitors / 1e6).toFixed(2)}M`} sub="Across all destinations" color="#6366f1" />
        <StatCard icon={DollarSign} label="Est. Revenue" value={`₹${(stats.totalRevenue / 1e9).toFixed(0)}B`} sub="Combined tourism revenue" color="#22d3ee" />
        <StatCard icon={Moon} label="Avg Nights Stay" value={`${stats.avgStay}`} sub="Per visitor group" color="#f59e0b" />
        <StatCard icon={TrendingUp} label="Avg Spend / Pax" value={`₹${stats.avgSpend.toLocaleString()}`} sub="Per person average" color="#4ade80" />
        <StatCard icon={MapPin} label="Destinations" value="30" sub="Across India" color="#fb923c" />
        <StatCard icon={Plane} label="Intl. Arrivals" value={`${(stats.totalVisitors * 0.49 / 1e6).toFixed(1)}M`} sub="From 7 countries" color="#e879f9" />
        <StatCard icon={Bed} label="Top Accommodation" value="Hostel" sub="6.59M visitors" color="#60a5fa" />
        <StatCard icon={Clock} label="Peak Month" value="January" sub="2.28M visitors" color="#34d399" />
      </div>

      <div className="charts-grid">

        {/* Monthly Visitors */}
        <div className="chart-card chart-wide">
          <div className="chart-header">
            <h3>Monthly Visitor Flow</h3>
            <span className="chart-tag">2024 Trend</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={visitorsByMonth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmtV} tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="visitors" name="Visitors" stroke="#6366f1" strokeWidth={2.5} fill="url(#visGrad)" dot={{ fill: '#6366f1', r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Month */}
        <div className="chart-card chart-wide">
          <div className="chart-header">
            <h3>Monthly Revenue</h3>
            <span className="chart-tag">Estimated INR</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={visitorsByMonth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={1} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmtR} tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" name="Revenue" fill="url(#revGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Destinations */}
        <div className="chart-card chart-wide">
          <div className="chart-header">
            <h3>Top 10 Destinations by Visitors</h3>
            <span className="chart-tag">Ranked</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={visitorsByLocation} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
              <XAxis type="number" tickFormatter={fmtV} tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="location" tick={{ fill: '#cbd5e1', fontSize: 12 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="visitors" name="Visitors" radius={[0, 6, 6, 0]}>
                {visitorsByLocation.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Season Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Seasonal Distribution</h3>
            <span className="chart-tag">By Visitors</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={bySeason} cx="50%" cy="50%" innerRadius={65} outerRadius={100} dataKey="visitors" nameKey="season" paddingAngle={3}>
                {bySeason.map((s, i) => (
                  <Cell key={s.season} fill={SEASON_C[s.season]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => fmtV(v)} />
              <Legend formatter={(val) => <span style={{ color: legendColor }}>{val}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Purpose of Visit */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Purpose of Visit</h3>
            <span className="chart-tag">Visitor Intent</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={byPurpose}>
              <PolarGrid stroke={polarGridColor} />
              <PolarAngleAxis dataKey="purpose" tick={{ fill: tickColor, fontSize: 11 }} />
              <Radar name="Visitors" dataKey="visitors" stroke="#6366f1" fill="#6366f1" fillOpacity={0.35} strokeWidth={2} />
              <Tooltip formatter={(v) => fmtV(v)} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Transport Mode */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Transport Modes</h3>
            <span className="chart-tag">How They Travel</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={byTransport} cx="50%" cy="50%" outerRadius={100} dataKey="visitors" nameKey="mode" paddingAngle={2}>
                {byTransport.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => fmtV(v)} />
              <Legend formatter={(val) => <span style={{ color: legendColor }}>{val}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Accommodation */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Accommodation Types</h3>
            <span className="chart-tag">Preference</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byAccommodation} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="type" tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmtV} tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="visitors" name="Visitors" radius={[6, 6, 0, 0]}>
                {byAccommodation.map((_, i) => <Cell key={i} fill={PALETTE[i + 4]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Age Groups */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Visitor Age Groups</h3>
            <span className="chart-tag">Demographics</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byAgeGroup} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="age" tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmtV} tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="visitors" name="Visitors" radius={[6, 6, 0, 0]}>
                {byAgeGroup.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Country of Origin */}
        <div className="chart-card chart-wide">
          <div className="chart-header">
            <h3>Visitors by Country of Origin</h3>
            <span className="chart-tag">International Source Markets</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byCountry} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="country" tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmtV} tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="visitors" name="Visitors" radius={[6, 6, 0, 0]}>
                {byCountry.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Domestic vs International */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Domestic vs International</h3>
            <span className="chart-tag">Visitor Split</span>
          </div>
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={visitorType} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" nameKey="type" paddingAngle={4}>
                  <Cell fill="#6366f1" />
                  <Cell fill="#22d3ee" />
                </Pie>
                <Tooltip formatter={(v) => fmtV(v)} />
                <Legend formatter={(val) => <span style={{ color: legendColor }}>{val}</span>} />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-stats">
              <div className="ds-item">
                <span className="ds-dot" style={{ background: '#6366f1' }} />
                <span>Domestic: <strong>51%</strong></span>
              </div>
              <div className="ds-item">
                <span className="ds-dot" style={{ background: '#22d3ee' }} />
                <span>International: <strong>49%</strong></span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Insights Panel */}
      <div className="insights-panel">
        <h2 className="insights-title">Key Analytical Insights</h2>
        <div className="insights-grid">
          {[
            { icon: '🌧️', title: 'Monsoon Dominance', body: 'Contrary to conventional wisdom, monsoon season attracts the most tourists — likely due to lush greenery, lower prices, and cultural festivals.' },
            { icon: '🚂', title: 'Train Preferred', body: 'Train travel edges out flights as the most popular transport mode, reflecting India\'s extensive rail network and its affordability.' },
            { icon: '🧓', title: 'Senior Surge', body: 'The 50+ demographic is the largest visitor group, suggesting growing senior travel and retirement tourism as a rising market.' },
            { icon: '🏨', title: 'Hostel Leads', body: 'Hostels are the #1 accommodation choice across all age groups — driven by budget travelers, backpackers, and solo adventurers.' },
            { icon: '🌏', title: 'Global Draw', body: 'Australia leads international arrivals, with remarkably balanced distribution across 8 source countries, showing India\'s broad global appeal.' },
            { icon: '📈', title: 'Jan Peak', body: 'January records the highest visitor count annually, indicating a strong post-holiday travel boom driven by cooler temperatures across the country.' },
          ].map(ins => (
            <div key={ins.title} className="insight-card">
              <span className="insight-icon">{ins.icon}</span>
              <h4>{ins.title}</h4>
              <p>{ins.body}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <div className="brand">
            <span className="brand-icon">✦</span>
            <span className="brand-text">Tourism<em>Insight</em></span>
          </div>
          <p className="footer-note">Travel & Tourism Data Analysis · India 2024 · 10,000 Records</p>
        </div>
      </footer>
    </div>
  )
}
