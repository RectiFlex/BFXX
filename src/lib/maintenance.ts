import { MaintenanceItem } from './types'

const STORAGE_KEY = 'maintenance-items'

// Add some initial data if storage is empty
function initializeDataIfEmpty() {
  const items = localStorage.getItem(STORAGE_KEY)
  if (!items) {
    const initialData: MaintenanceItem[] = [
      {
        id: '1',
        title: 'AC Not Working',
        description: 'The air conditioning unit in room 203 is not cooling properly',
        property: 'Downtown Office Complex',
        priority: 'High',
        status: 'Pending',
        requestedBy: 'John Doe',
        requestedDate: '2024-03-15',
        type: 'request'
      },
      {
        id: '2',
        title: 'Leaking Pipe',
        description: 'Water leaking from bathroom ceiling',
        property: 'Riverside Apartments',
        priority: 'Medium',
        status: 'In Progress',
        requestedBy: 'Jane Smith',
        requestedDate: '2024-03-14',
        type: 'request'
      },
      {
        id: '3',
        title: 'Monthly HVAC Maintenance',
        description: 'Regular maintenance and inspection of HVAC systems',
        property: 'Tech Park Warehouse',
        priority: 'Low',
        status: 'Completed',
        requestedBy: 'Maintenance Team',
        requestedDate: '2024-03-10',
        type: 'workOrder'
      }
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
  }
}

// Initialize data when accessing maintenance functions
const ensureInitialized = () => {
  initializeDataIfEmpty()
}

export function getMaintenanceItems(): MaintenanceItem[] {
  ensureInitialized()
  try {
    const items = localStorage.getItem(STORAGE_KEY)
    return items ? JSON.parse(items) : []
  } catch (error) {
    console.error('Error reading maintenance items:', error)
    return []
  }
}

export function saveMaintenanceItems(items: MaintenanceItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Error saving maintenance items:', error)
    throw new Error('Failed to save maintenance items')
  }
}

export function createMaintenanceItem(item: Omit<MaintenanceItem, 'id' | 'requestedDate'>): MaintenanceItem {
  ensureInitialized()
  try {
    const newItem: MaintenanceItem = {
      ...item,
      id: crypto.randomUUID(),
      requestedDate: new Date().toISOString(),
    }

    const items = getMaintenanceItems()
    items.push(newItem)
    saveMaintenanceItems(items)
    return newItem
  } catch (error) {
    console.error('Error creating maintenance item:', error)
    throw new Error('Failed to create maintenance item')
  }
}

export function updateMaintenanceItem(id: string, updates: Partial<MaintenanceItem>): MaintenanceItem | null {
  ensureInitialized()
  try {
    const items = getMaintenanceItems()
    const index = items.findIndex(item => item.id === id)
    if (index !== -1) {
      items[index] = { ...items[index], ...updates }
      saveMaintenanceItems(items)
      return items[index]
    }
    return null
  } catch (error) {
    console.error('Error updating maintenance item:', error)
    throw new Error('Failed to update maintenance item')
  }
}

export function deleteMaintenanceItem(id: string) {
  ensureInitialized()
  try {
    const items = getMaintenanceItems()
    const newItems = items.filter(item => item.id !== id)
    saveMaintenanceItems(newItems)
  } catch (error) {
    console.error('Error deleting maintenance item:', error)
    throw new Error('Failed to delete maintenance item')
  }
}

export function convertRequestToWorkOrder(requestId: string): MaintenanceItem | null {
  ensureInitialized()
  try {
    const items = getMaintenanceItems()
    const requestIndex = items.findIndex(item => item.id === requestId)
    
    if (requestIndex === -1 || items[requestIndex].type !== 'request') {
      return null
    }

    // Mark the original request as converted
    items[requestIndex] = {
      ...items[requestIndex],
      convertedToWorkOrder: true
    }

    // Create a new work order based on the request
    const workOrder: MaintenanceItem = {
      id: crypto.randomUUID(),
      title: items[requestIndex].title,
      description: items[requestIndex].description,
      property: items[requestIndex].property,
      priority: items[requestIndex].priority,
      status: 'Pending',
      requestedBy: items[requestIndex].requestedBy,
      requestedDate: new Date().toISOString(),
      type: 'workOrder'
    }

    items.push(workOrder)
    saveMaintenanceItems(items)
    return workOrder
  } catch (error) {
    console.error('Error converting request to work order:', error)
    throw new Error('Failed to convert request to work order')
  }
}

// Initialize when the module is loaded
initializeDataIfEmpty()