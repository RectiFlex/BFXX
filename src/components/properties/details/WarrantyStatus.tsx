import { Shield, Check, AlertTriangle } from 'lucide-react'

// This would typically come from your backend or blockchain
const SAMPLE_WARRANTIES = [
  {
    id: 1,
    type: 'HVAC System',
    provider: 'CoolAir Systems',
    expirationDate: '2025-12-31',
    status: 'Active',
    coverage: 'Full parts and labor'
  },
  {
    id: 2,
    type: 'Roof',
    provider: 'TopCover Solutions',
    expirationDate: '2026-06-30',
    status: 'Active',
    coverage: 'Structural integrity and leaks'
  },
  {
    id: 3,
    type: 'Elevator',
    provider: 'ElevateTech',
    expirationDate: '2024-01-15',
    status: 'Expired',
    coverage: 'Maintenance and repairs'
  }
]

type WarrantyStatusProps = {
  propertyId: string
}

function WarrantyStatus({ propertyId }: WarrantyStatusProps) {
  return (
    <div className="glass-panel p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-green-500/20">
          <Shield className="w-6 h-6 text-green-400" />
        </div>
        <h3 className="text-xl font-medium">Warranty Status</h3>
      </div>

      <div className="space-y-4">
        {SAMPLE_WARRANTIES.map((warranty) => (
          <div key={warranty.id} className="p-4 rounded-lg bg-white/5 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{warranty.type}</h4>
                <p className="text-sm text-gray-400">{warranty.provider}</p>
              </div>
              <span className={`flex items-center gap-1 text-sm ${
                warranty.status === 'Active' ? 'text-green-400' : 'text-red-400'
              }`}>
                {warranty.status === 'Active' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <AlertTriangle className="w-4 h-4" />
                )}
                {warranty.status}
              </span>
            </div>
            
            <div className="text-sm">
              <p className="text-gray-400">Coverage:</p>
              <p>{warranty.coverage}</p>
            </div>
            
            <div className="text-sm">
              <p className="text-gray-400">Expiration Date:</p>
              <p>{new Date(warranty.expirationDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WarrantyStatus