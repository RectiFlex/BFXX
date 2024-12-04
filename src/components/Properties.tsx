import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Property, PropertyContract } from '../lib/types'
import { getProperties, createProperty, getPropertyWithContract } from '../lib/properties'
import PropertyCard from './properties/PropertyCard'
import CreatePropertyModal from './properties/CreatePropertyModal'
import PageHeader from './common/PageHeader'

type PropertyWithContract = Property & { contract?: PropertyContract }

function Properties() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [properties, setProperties] = useState<PropertyWithContract[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    setLoading(true)
    setError(null)
    try {
      const propertyList = getProperties()
      const propertiesWithContracts = await Promise.all(
        propertyList.map(property => getPropertyWithContract(property.id))
      )
      setProperties(propertiesWithContracts)
    } catch (error) {
      console.error('Failed to load properties:', error)
      setError('Failed to load properties. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProperty = async (
    propertyData: Omit<Property, 'id' | 'contractAddress' | 'createdAt' | 'status'>
  ) => {
    try {
      const newProperty = await createProperty(propertyData)
      const propertyWithContract = await getPropertyWithContract(newProperty.id)
      setProperties(prev => [...prev, propertyWithContract])
      return newProperty
    } catch (error) {
      console.error('Failed to create property:', error)
      throw error
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Properties"
        description="Manage your registered properties"
        action={
          <button 
            className="glass-button flex items-center gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Property
          </button>
        }
      />

      {loading ? (
        <div className="glass-panel p-8 text-center">
          <div className="animate-pulse text-gray-400">Loading properties...</div>
        </div>
      ) : error ? (
        <div className="glass-panel p-8 text-center">
          <p className="text-red-400">{error}</p>
          <button 
            onClick={loadProperties}
            className="glass-button mt-4"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {properties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              contract={property.contract}
            />
          ))}
          
          {properties.length === 0 && (
            <div className="col-span-full glass-panel p-8 text-center">
              <p className="text-gray-400">No properties found. Click "Add Property" to create one.</p>
            </div>
          )}
        </div>
      )}

      <CreatePropertyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProperty}
      />
    </div>
  )
}

export default Properties