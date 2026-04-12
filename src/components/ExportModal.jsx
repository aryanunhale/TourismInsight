import { useState } from 'react'
import { X, Download, FileText, FileJson, Package, Check } from 'lucide-react'
import {
  EXPORT_DATASETS,
  exportDatasetCSV,
  exportDatasetJSON,
  exportAllCSV,
  exportAllJSON,
} from '../data/exportUtils'

function flash(setter, id) {
  setter(id)
  setTimeout(() => setter(null), 1800)
}

export default function ExportModal({ onClose }) {
  const [downloaded, setDownloaded] = useState(null)
  const [tab, setTab] = useState('datasets') // 'datasets' | 'full'

  function handleCSV(ds) {
    exportDatasetCSV(ds)
    flash(setDownloaded, ds.id + '-csv')
  }
  function handleJSON(ds) {
    exportDatasetJSON(ds)
    flash(setDownloaded, ds.id + '-json')
  }
  function handleAllCSV() {
    exportAllCSV()
    flash(setDownloaded, 'all-csv')
  }
  function handleAllJSON() {
    exportAllJSON()
    flash(setDownloaded, 'all-json')
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="export-modal">

        {/* Header */}
        <div className="em-header">
          <div>
            <h2 className="em-title">Export Data</h2>
            <p className="em-sub">Download tourism datasets in CSV or JSON format</p>
          </div>
          <button className="em-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Tabs */}
        <div className="em-tabs">
          <button className={`em-tab ${tab === 'datasets' ? 'active' : ''}`} onClick={() => setTab('datasets')}>
            <FileText size={15} /> Individual Datasets
          </button>
          <button className={`em-tab ${tab === 'full' ? 'active' : ''}`} onClick={() => setTab('full')}>
            <Package size={15} /> Full Export
          </button>
        </div>

        {/* Individual datasets */}
        {tab === 'datasets' && (
          <div className="em-body">
            <div className="em-dataset-list">
              {EXPORT_DATASETS.map(ds => {
                const csvKey = ds.id + '-csv'
                const jsonKey = ds.id + '-json'
                return (
                  <div key={ds.id} className="em-dataset-row">
                    <div className="em-ds-info">
                      <span className="em-ds-icon">{ds.icon}</span>
                      <div>
                        <span className="em-ds-label">{ds.label}</span>
                        <span className="em-ds-desc">{ds.description} · {ds.rows.length} rows</span>
                      </div>
                    </div>
                    <div className="em-ds-actions">
                      <button
                        className={`em-dl-btn csv ${downloaded === csvKey ? 'done' : ''}`}
                        onClick={() => handleCSV(ds)}
                      >
                        {downloaded === csvKey ? <Check size={13} /> : <Download size={13} />}
                        CSV
                      </button>
                      <button
                        className={`em-dl-btn json ${downloaded === jsonKey ? 'done' : ''}`}
                        onClick={() => handleJSON(ds)}
                      >
                        {downloaded === jsonKey ? <Check size={13} /> : <FileJson size={13} />}
                        JSON
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Full export */}
        {tab === 'full' && (
          <div className="em-body em-full-body">
            <div className="em-full-card">
              <div className="em-full-icon">📦</div>
              <h3>Complete Dataset Export</h3>
              <p>All 9 datasets combined into a single file — includes summary statistics, monthly trends, destination rankings, demographics, and more.</p>
              <ul className="em-full-list">
                <li>✓ 9 aggregated datasets</li>
                <li>✓ Summary KPI statistics</li>
                <li>✓ 10,000 source records (aggregated)</li>
                <li>✓ India 2024 tourism data</li>
              </ul>
              <div className="em-full-actions">
                <button
                  className={`em-full-btn csv ${downloaded === 'all-csv' ? 'done' : ''}`}
                  onClick={handleAllCSV}
                >
                  {downloaded === 'all-csv' ? <Check size={16} /> : <Download size={16} />}
                  {downloaded === 'all-csv' ? 'Downloaded!' : 'Download Full CSV'}
                </button>
                <button
                  className={`em-full-btn json ${downloaded === 'all-json' ? 'done' : ''}`}
                  onClick={handleAllJSON}
                >
                  {downloaded === 'all-json' ? <Check size={16} /> : <FileJson size={16} />}
                  {downloaded === 'all-json' ? 'Downloaded!' : 'Download Full JSON'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="em-footer">
          <span>Tourism Insight · India 2024 · 10,000 records</span>
          <button className="em-close-text" onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
  )
}
