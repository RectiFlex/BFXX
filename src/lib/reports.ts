import { Report } from './types'
import { getMaintenanceItems } from './maintenance'
import { getProperties } from './properties'
import { getContractors } from './contractors'

const STORAGE_KEY = 'reports'

function initializeDataIfEmpty() {
  const reports = getReports()
  if (reports.length === 0) {
    const initialData: Report[] = [
      {
        id: '1',
        title: 'Maintenance Summary',
        description: 'Monthly overview of maintenance activities and costs',
        type: 'PDF',
        category: 'Maintenance',
        generatedDate: '2024-03-15T10:00:00Z',
        data: null
      },
      {
        id: '2',
        title: 'Property Status',
        description: 'Current status and compliance of all properties',
        type: 'Excel',
        category: 'Property',
        generatedDate: '2024-03-14T15:30:00Z',
        data: null
      }
    ]
    saveReports(initialData)
  }
}

export function getReports(): Report[] {
  const items = localStorage.getItem(STORAGE_KEY)
  return items ? JSON.parse(items) : []
}

export function saveReports(reports: Report[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports))
}

export function generateReport(category: Report['category']): Report {
  let reportData: any = null
  let title = ''
  let description = ''

  switch (category) {
    case 'Maintenance':
      const maintenance = getMaintenanceItems()
      reportData = {
        total: maintenance.length,
        pending: maintenance.filter(m => m.status === 'Pending').length,
        completed: maintenance.filter(m => m.status === 'Completed').length,
        byPriority: {
          high: maintenance.filter(m => m.priority === 'High').length,
          medium: maintenance.filter(m => m.priority === 'Medium').length,
          low: maintenance.filter(m => m.priority === 'Low').length
        }
      }
      title = 'Maintenance Summary'
      description = 'Overview of maintenance activities and status'
      break

    case 'Property':
      const properties = getProperties()
      reportData = {
        total: properties.length,
        byType: {
          commercial: properties.filter(p => p.type === 'Commercial').length,
          residential: properties.filter(p => p.type === 'Residential').length,
          industrial: properties.filter(p => p.type === 'Industrial').length
        },
        totalArea: properties.reduce((sum, p) => sum + p.size, 0)
      }
      title = 'Property Status Report'
      description = 'Overview of property portfolio and statistics'
      break

    case 'Contractor':
      const contractors = getContractors()
      reportData = {
        total: contractors.length,
        averageRating: contractors.reduce((sum, c) => sum + c.rating, 0) / contractors.length,
        totalJobs: contractors.reduce((sum, c) => sum + c.completedJobs, 0)
      }
      title = 'Contractor Performance Report'
      description = 'Overview of contractor metrics and performance'
      break
  }

  const newReport: Report = {
    id: crypto.randomUUID(),
    title,
    description,
    type: 'PDF',
    category,
    generatedDate: new Date().toISOString(),
    data: reportData
  }

  const reports = getReports()
  reports.push(newReport)
  saveReports(reports)
  return newReport
}

export function deleteReport(id: string): void {
  const reports = getReports()
  const newReports = reports.filter(r => r.id !== id)
  saveReports(newReports)
}

export function downloadReport(report: Report): void {
  // In a real application, this would generate and download an actual PDF or Excel file
  // For demo purposes, we'll create a JSON file
  const data = JSON.stringify(report.data, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${report.title.toLowerCase().replace(/\s+/g, '-')}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Initialize when the module is imported
initializeDataIfEmpty()