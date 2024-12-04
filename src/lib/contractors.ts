import { Contractor } from './types'

const STORAGE_KEY = 'contractors'

function initializeDataIfEmpty() {
  const contractors = getContractors()
  if (contractors.length === 0) {
    const initialData: Contractor[] = [
      {
        id: '1',
        name: 'John Smith',
        specialty: 'HVAC Specialist',
        rating: 5,
        phone: '(555) 123-4567',
        email: 'john.smith@example.com',
        availability: 'Available',
        completedJobs: 45,
        joinedDate: '2023-01-15'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        specialty: 'Electrical Engineer',
        rating: 4,
        phone: '(555) 234-5678',
        email: 'sarah.j@example.com',
        availability: 'Available',
        completedJobs: 32,
        joinedDate: '2023-03-20'
      },
      {
        id: '3',
        name: 'Mike Wilson',
        specialty: 'Plumbing Expert',
        rating: 5,
        phone: '(555) 345-6789',
        email: 'mike.w@example.com',
        availability: 'Busy',
        completedJobs: 58,
        joinedDate: '2022-11-05'
      }
    ]
    saveContractors(initialData)
  }
}

export function getContractors(): Contractor[] {
  const items = localStorage.getItem(STORAGE_KEY)
  return items ? JSON.parse(items) : []
}

export function saveContractors(contractors: Contractor[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contractors))
}

export function createContractor(contractor: Omit<Contractor, 'id' | 'joinedDate' | 'completedJobs'>): Contractor {
  const newContractor: Contractor = {
    ...contractor,
    id: crypto.randomUUID(),
    joinedDate: new Date().toISOString(),
    completedJobs: 0
  }

  const contractors = getContractors()
  contractors.push(newContractor)
  saveContractors(contractors)
  return newContractor
}

export function updateContractor(id: string, updates: Partial<Contractor>): Contractor {
  const contractors = getContractors()
  const index = contractors.findIndex(c => c.id === id)
  
  if (index === -1) {
    throw new Error('Contractor not found')
  }

  contractors[index] = { ...contractors[index], ...updates }
  saveContractors(contractors)
  return contractors[index]
}

export function deleteContractor(id: string): void {
  const contractors = getContractors()
  const newContractors = contractors.filter(c => c.id !== id)
  saveContractors(newContractors)
}

// Initialize when the module is imported
initializeDataIfEmpty()