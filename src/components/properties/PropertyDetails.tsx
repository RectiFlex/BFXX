import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Building2, 
  ArrowLeft, 
  User, 
  MapPin, 
  CalendarClock, 
  Shield, 
  Link as LinkIcon,
  ExternalLink,
  Clock
} from 'lucide-react'
import { Property, MaintenanceItem } from '../../lib/types'
import { getPropertyWithContract } from '../../lib/properties'
import { getMaintenanceItems } from '../../lib/maintenance'
import MaintenanceHistory from './details/MaintenanceHistory'
import WarrantyStatus from './details/WarrantyStatus'
import ContractDetails from './details/ContractDetails'

function PropertyDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [property, setProperty] = useState<Property & { contract?: any }| null>(null)
  const [maintenanceHistory, setMaintenanceHistory] = useState<MaintenanceItem[]>([])

  useEffect(() => {
    const loadProperty = async () => {
      if (!id) {
        setError('Property ID not found')
        setLoading(false)
        return
      }

      try {
        const propertyData = await getPropertyWithContract(id)
        setProperty(propertyData)
        
        // Get maintenance history for this property
        const allMaintenance = getMaintenanceItems()
        const propertyMaintenance = allMaintenance.filter(item => 
          item.property === propertyData.name
        )
        setMaintenanceHistory(propertyMaintenance)
      } catch (err) {
        console.error('Error loading property:', err)
        setError(err instanceof Error ? err.message : 'Failed to load property')
      } finally {
        setLoading(false)
      }
    }

    loadProperty()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Clock className="w-8 h-8 animate-spin text-blue-400" />
          <p className="text-gray-400">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="glass-panel p-8 text-center">
        <p className="text-red-400 mb-4">{error || 'Property not found'}</p>
        <button 
          onClick={() => navigate('/properties')}
          className="glass-button"
        >
          Back to Properties
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/properties')}
          className="glass-button p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold">{property.name}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Info */}
        <div className="glass-panel p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/20">
              <Building2 className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-medium">Property Information</h3>
          </div>

          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p>{property.address}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-400">Owner Information</p>
                <p>{property.contract?.ownerAddress || 'Not available'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarClock className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-400">Registration Date</p>
                <p>{new Date(property.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-gray-400">Type</p>
                <p className="text-lg font-medium">{property.type}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-gray-400">Size</p>
                <p className="text-lg font-medium">{property.size.toLocaleString()} sq ft</p>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Contract Info */}
        <ContractDetails contract={property.contract} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance History */}
        <MaintenanceHistory items={maintenanceHistory} />

        {/* Warranty Status */}
        <WarrantyStatus propertyId={property.id} />
      </div>
    </div>
  )
}

export default PropertyDetails