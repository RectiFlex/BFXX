import { useState } from 'react'
import { MaintenanceItem } from '../../lib/types'
import { getProperties } from '../../lib/properties'

type CreateRequestModalProps = {
  isOpen: boolean
  onClose: () => void
  onCreate: (item: Omit<MaintenanceItem, 'id' | 'requestedDate'>) => void
}

function CreateRequestModal({ isOpen, onClose, onCreate }: CreateRequestModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property: '',
    priority: 'Medium' as MaintenanceItem['priority'],
    type: 'request' as MaintenanceItem['type']
  })

  const properties = getProperties()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate({
      ...formData,
      status: 'Pending',
      requestedBy: 'Current User', // In a real app, this would come from auth
    })
    setFormData({
      title: '',
      description: '',
      property: '',
      priority: 'Medium',
      type: 'request'
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-panel p-6 w-full max-w-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Create Maintenance Request</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500"
              placeholder="Enter request title"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500"
              rows={3}
              placeholder="Describe the maintenance issue"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Property</label>
              <select 
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500"
                value={formData.property}
                onChange={e => setFormData(prev => ({ ...prev, property: e.target.value }))}
                required
              >
                <option value="">Select Property</option>
                {properties.map(property => (
                  <option key={property.id} value={property.name}>
                    {property.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select 
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500"
                value={formData.priority}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  priority: e.target.value as MaintenanceItem['priority'] 
                }))}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="glass-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="glass-button bg-blue-500 hover:bg-blue-600"
            >
              Create Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateRequestModal