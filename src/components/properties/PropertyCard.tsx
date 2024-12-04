import { Building2, Link as LinkIcon, CircleDollarSign, ClipboardList, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Property, PropertyContract } from '../../lib/types'

type PropertyCardProps = {
  property: Property
  contract?: PropertyContract
}

function PropertyCard({ property, contract }: PropertyCardProps) {
  const typeColors = {
    'Commercial': 'text-blue-400',
    'Residential': 'text-green-400',
    'Industrial': 'text-purple-400'
  }

  return (
    <Link to={`/properties/${property.id}`} className="block h-full">
      <div className="glass-panel p-6 space-y-4 h-full flex flex-col hover:border-white/20 transition-colors">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-blue-500/20 shrink-0">
            <Building2 className="w-6 h-6 text-blue-400" />
          </div>
          <div className="min-w-0">
            <h3 className="font-medium truncate">{property.name}</h3>
            <p className="text-sm text-gray-400 truncate">{property.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400 block">Type</span>
            <p className={typeColors[property.type]}>{property.type}</p>
          </div>
          <div>
            <span className="text-gray-400 block">Size</span>
            <p>{property.size.toLocaleString()} sq ft</p>
          </div>
          <div>
            <span className="text-gray-400 block">Status</span>
            <p className={property.status === 'Active' ? 'text-green-400' : 'text-red-400'}>
              {property.status}
            </p>
          </div>
          <div>
            <span className="text-gray-400 block">Created</span>
            <p>{new Date(property.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {contract && (
          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-blue-400">
                <LinkIcon className="w-4 h-4 shrink-0" />
                <span className="font-mono truncate">{contract.address.slice(0, 8)}...{contract.address.slice(-6)}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                  <ClipboardList className="w-5 h-5 text-blue-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-gray-400 truncate">Records</p>
                    <p className="text-lg font-medium">{contract.maintenanceCount}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                  <CircleDollarSign className="w-5 h-5 text-green-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-gray-400 truncate">Expenses</p>
                    <p className="text-lg font-medium">${contract.totalExpenses.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="truncate">Updated: {new Date(contract.lastUpdated).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default PropertyCard