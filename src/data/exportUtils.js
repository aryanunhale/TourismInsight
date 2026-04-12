import {
  visitorsByMonth, visitorsByLocation, bySeason,
  byPurpose, byTransport, byAccommodation, byAgeGroup, byCountry, visitorType, stats
} from './tourismData'

// ── helpers ──────────────────────────────────────────────
function toCSV(rows, columns) {
  const header = columns.join(',')
  const body = rows.map(row =>
    columns.map(col => {
      const val = row[col] ?? ''
      return typeof val === 'string' && val.includes(',') ? `"${val}"` : val
    }).join(',')
  )
  return [header, ...body].join('\n')
}

function downloadText(content, filename) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ── export datasets ───────────────────────────────────────
export const EXPORT_DATASETS = [
  {
    id: 'monthly',
    label: 'Monthly Visitors & Revenue',
    description: '12 months of visitor counts and estimated revenue',
    icon: '📅',
    rows: visitorsByMonth,
    columns: ['month', 'visitors', 'revenue'],
  },
  {
    id: 'locations',
    label: 'Top Destinations',
    description: 'Top 10 destinations by visitor count and revenue',
    icon: '📍',
    rows: visitorsByLocation,
    columns: ['location', 'visitors', 'revenue'],
  },
  {
    id: 'season',
    label: 'Seasonal Distribution',
    description: 'Visitor breakdown across 4 seasons',
    icon: '🌤️',
    rows: bySeason.map(({ season, visitors }) => ({ season, visitors })),
    columns: ['season', 'visitors'],
  },
  {
    id: 'purpose',
    label: 'Purpose of Visit',
    description: 'Why tourists are travelling to India',
    icon: '🎯',
    rows: byPurpose,
    columns: ['purpose', 'visitors'],
  },
  {
    id: 'transport',
    label: 'Transport Modes',
    description: 'How visitors are getting to their destinations',
    icon: '🚆',
    rows: byTransport,
    columns: ['mode', 'visitors'],
  },
  {
    id: 'accommodation',
    label: 'Accommodation Types',
    description: 'Preferred stay options across all visitors',
    icon: '🏨',
    rows: byAccommodation,
    columns: ['type', 'visitors'],
  },
  {
    id: 'age',
    label: 'Age Group Breakdown',
    description: 'Visitor demographics by age segment',
    icon: '👥',
    rows: byAgeGroup,
    columns: ['age', 'visitors'],
  },
  {
    id: 'country',
    label: 'Country of Origin',
    description: 'International visitor source markets',
    icon: '🌍',
    rows: byCountry,
    columns: ['country', 'visitors'],
  },
  {
    id: 'visitor_type',
    label: 'Domestic vs International',
    description: 'Split between domestic and international visitors',
    icon: '✈️',
    rows: visitorType,
    columns: ['type', 'value'],
  },
]

// ── download functions ────────────────────────────────────
export function exportDatasetCSV(dataset) {
  const csv = toCSV(dataset.rows, dataset.columns)
  downloadText(csv, `tourism_${dataset.id}.csv`)
}

export function exportDatasetJSON(dataset) {
  const json = JSON.stringify(dataset.rows, null, 2)
  downloadText(json, `tourism_${dataset.id}.json`)
}

export function exportAllCSV() {
  const sections = EXPORT_DATASETS.map(ds => {
    const header = `# ${ds.label}\n`
    const csv = toCSV(ds.rows, ds.columns)
    return header + csv
  })
  const statsSection = `# Summary Statistics\nmetric,value\nTotal Visitors,${stats.totalVisitors}\nTotal Revenue (INR),${stats.totalRevenue}\nAvg Nights Stay,${stats.avgStay}\nAvg Spend Per Pax (INR),${stats.avgSpend}\nTotal Records,${stats.totalRecords}`
  downloadText([statsSection, ...sections].join('\n\n'), 'tourism_india_2024_full.csv')
}

export function exportAllJSON() {
  const full = {
    metadata: {
      title: 'India Tourism Data Analysis 2024',
      records: stats.totalRecords,
      exportedAt: new Date().toISOString(),
    },
    summary: stats,
    datasets: Object.fromEntries(EXPORT_DATASETS.map(ds => [ds.id, ds.rows])),
  }
  downloadText(JSON.stringify(full, null, 2), 'tourism_india_2024_full.json')
}
