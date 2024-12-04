export type MaintenanceItem = {
  id: string
  title: string
  description: string
  property: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'Pending' | 'In Progress' | 'Completed'
  requestedBy?: string
  requestedDate: string
  type: 'workOrder' | 'request'
  convertedToWorkOrder?: boolean
}

export type Property = {
  id: string
  name: string
  address: string
  type: 'Commercial' | 'Residential' | 'Industrial'
  size: number
  contractAddress?: string
  status: 'Active' | 'Inactive'
  createdAt: string
}

export type PropertyContract = {
  address: string
  ownerAddress: string
  propertyId: string
  maintenanceCount: number
  totalExpenses: number
  lastUpdated: string
}

export type Contractor = {
  id: string
  name: string
  specialty: string
  rating: number
  phone: string
  email: string
  availability: 'Available' | 'Busy' | 'Unavailable'
  completedJobs: number
  joinedDate: string
}

export type Report = {
  id: string
  title: string
  description: string
  type: 'PDF' | 'Excel'
  category: 'Maintenance' | 'Property' | 'Contractor'
  generatedDate: string
  data: any
}

export type Settings = {
  company: {
    name: string
    logo: string | null
    address: string
    email: string
    phone: string
    website: string
    businessHours: string
  }
  notifications: {
    email: boolean
    inApp: boolean
    maintenanceAlerts: boolean
    contractorUpdates: boolean
    reportGeneration: boolean
  }
  appearance: {
    theme: 'light' | 'dark'
    sidebarCollapsed: boolean
    density: 'comfortable' | 'compact'
  }
}