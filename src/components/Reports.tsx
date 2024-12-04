import { useState, useEffect } from 'react'
import { Download, Filter, Plus, Trash2 } from 'lucide-react'
import { Report } from '../lib/types'
import { getReports, generateReport, deleteReport, downloadReport } from '../lib/reports'
import CreateReportModal from './reports/CreateReportModal'
import PageHeader from './common/PageHeader'

function Reports() {
  const [reports, setReports] = useState<Report[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Report['category'] | 'All'>('All')

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = () => {
    try {
      const data = getReports()
      setReports(data)
      setError(null)
    } catch (err) {
      console.error('Failed to load reports:', err)
      setError('Failed to load reports. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = (category: Report['category']) => {
    try {
      const newReport = generateReport(category)
      setReports(prev => [newReport, ...prev])
      setIsCreateModalOpen(false)
    } catch (err) {
      console.error('Failed to generate report:', err)
      setError('Failed to generate report. Please try again.')
    }
  }

  const handleDelete = (id: string) => {
    try {
      deleteReport(id)
      setReports(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      console.error('Failed to delete report:', err)
      setError('Failed to delete report. Please try again.')
    }
  }

  const handleDownload = (report: Report) => {
    try {
      downloadReport(report)
    } catch (err) {
      console.error('Failed to download report:', err)
      setError('Failed to download report. Please try again.')
    }
  }

  const filteredReports = filter === 'All' 
    ? reports
    : reports.filter(report => report.category === filter)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-400">Loading reports...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        description="Generate and download property management reports"
        action={
          <div className="flex gap-4">
            <select
              className="glass-button"
              value={filter}
              onChange={e => setFilter(e.target.value as Report['category'] | 'All')}
            >
              <option value="All">All Categories</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Property">Property</option>
              <option value="Contractor">Contractor</option>
            </select>
            <button 
              className="glass-button flex items-center gap-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        }
      />

      {error && (
        <div className="glass-panel p-4 text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="glass-panel p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{report.title}</h3>
                <p className="text-gray-400">{report.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 rounded-full bg-white/10">
                    {report.type}
                  </span>
                  <span className="text-gray-400">
                    Generated: {new Date(report.generatedDate).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  className="glass-button flex items-center gap-2"
                  onClick={() => handleDownload(report)}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button 
                  className="glass-button flex items-center gap-2 hover:bg-red-500/20"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this report?')) {
                      handleDelete(report.id)
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="glass-panel p-8 text-center">
            <p className="text-gray-400">No reports found. Click "Generate Report" to create one.</p>
          </div>
        )}
      </div>

      <CreateReportModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onGenerate={handleGenerate}
      />
    </div>
  )
}

export default Reports