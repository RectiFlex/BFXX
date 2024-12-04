import { Property, PropertyContract } from './types'

const STORAGE_KEY = 'properties'

// Initialize with sample data if empty
function initializeDataIfEmpty() {
  const properties = getProperties()
  if (properties.length === 0) {
    const initialData: Property[] = [
      {
        id: '1',
        name: 'Downtown Office Complex',
        address: '123 Business Ave, Downtown, NY 10001',
        type: 'Commercial',
        size: 25000,
        status: 'Active',
        createdAt: '2024-03-01T00:00:00Z',
        contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      {
        id: '2',
        name: 'Riverside Apartments',
        address: '456 River Road, Riverside, NY 10002',
        type: 'Residential',
        size: 15000,
        status: 'Active',
        createdAt: '2024-03-05T00:00:00Z',
        contractAddress: '0x123d35Cc6634C0532925a3b844Bc454e4438f123'
      },
      {
        id: '3',
        name: 'Tech Park Warehouse',
        address: '789 Industrial Blvd, Tech Park, NY 10003',
        type: 'Industrial',
        size: 50000,
        status: 'Active',
        createdAt: '2024-03-10T00:00:00Z',
        contractAddress: '0x456d35Cc6634C0532925a3b844Bc454e4438f456'
      }
    ]
    saveProperties(initialData)
  }
}

export function getProperties(): Property[] {
  const items = localStorage.getItem(STORAGE_KEY)
  return items ? JSON.parse(items) : []
}

export function saveProperties(properties: Property[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties))
}

export async function createProperty(property: Omit<Property, 'id' | 'contractAddress' | 'createdAt' | 'status'>): Promise<Property> {
  try {
    const newProperty: Property = {
      ...property,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'Active',
      contractAddress: `0x${crypto.randomUUID().replace(/-/g, '')}` // Simplified for demo
    }

    const properties = getProperties()
    properties.push(newProperty)
    saveProperties(properties)

    return newProperty
  } catch (error) {
    console.error('Failed to create property:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to create property')
  }
}

export async function getPropertyWithContract(propertyId: string): Promise<Property & { contract?: PropertyContract }> {
  const properties = getProperties()
  const property = properties.find(p => p.id === propertyId)
  
  if (!property) {
    throw new Error('Property not found')
  }

  // For demonstration purposes, generate mock contract data
  if (property.contractAddress) {
    const contractDetails: PropertyContract = {
      address: property.contractAddress,
      propertyId: property.id,
      ownerAddress: '0x1234567890abcdef1234567890abcdef12345678',
      maintenanceCount: Math.floor(Math.random() * 10),
      totalExpenses: Math.floor(Math.random() * 100000),
      lastUpdated: new Date().toISOString()
    }
    
    return {
      ...property,
      contract: contractDetails
    }
  }

  return property
}

// Initialize data when the module is imported
initializeDataIfEmpty()