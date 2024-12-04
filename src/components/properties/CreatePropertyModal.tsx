import { useState } from 'react'
import { Property } from '../../lib/types'
import { Building2, Save } from 'lucide-react'

type CreatePropertyModalProps = {
  isOpen: boolean
  onClose: () => void
  onCreate: (property: Omit<Property, 'id' | 'contractAddress' | 'createdAt' | 'status'>) => Promise<void>
}

function CreatePropertyModal({ isOpen, onClose, onCreate }: CreatePropertyModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: 'Commercial' as Property['type'],
    size: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await onCreate(formData)
      setFormData({
        name: '',
        address: '',
        type: 'Commercial',
        size: 0
      })
      onClose()
    } catch (error) {
      console.error('Failed to create property:', error)
      setError(error instanceof Error ? error.message : 'Failed to create property')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-panel p-6 w-full max-w-2xl space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold">Add New Property</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white"
            disabled={loading}
          >
            ✕
          </button>
        </div>
        
        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Property Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500"
              placeholder="Enter property name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <textarea
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500"
              rows={2}
              placeholder="Enter property address"
              value={formData.address}
              onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Property Type</label>
              <select 
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500"
                value={formData.type}
                onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as Property['type'] }))}
                disabled={loading}
              >
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Size (sq ft)</label>
              <input
                type="number"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500"
                value={formData.size}
                onChange={e => setFormData(prev => ({ ...prev, size: Number(e.target.value) }))}
                required
                min="1"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="glass-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="glass-button bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
              disabled={loading}
            >
              <Save className="w-4 h-4" />
              {loading ? 'Creating...' : 'Create Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePropertyModal