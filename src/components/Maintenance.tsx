import { useState, useEffect } from 'react'
import { Plus, Clock, Wrench, CheckCircle2, MessageSquare, ClipboardList } from 'lucide-react'
import { MaintenanceItem } from '../lib/types'
import { 
  getMaintenanceItems, 
  createMaintenanceItem, 
  updateMaintenanceItem,
  deleteMaintenanceItem,
  convertRequestToWorkOrder
} from '../lib/maintenance'
import MaintenanceColumn from './maintenance/MaintenanceColumn'
import CreateRequestModal from './maintenance/CreateRequestModal'
import PageHeader from './common/PageHeader'

function Maintenance() {
  const [activeTab, setActiveTab] = useState<'workOrders' | 'requests'>('workOrders')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [items, setItems] = useState<MaintenanceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = () => {
    try {
      setLoading(true)
      const maintenanceItems = getMaintenanceItems()
      setItems(maintenanceItems)
      setError(null)
    } catch (err) {
      console.error('Failed to load maintenance items:', err)
      setError('Failed to load maintenance items. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = (newItem: Omit<MaintenanceItem, 'id' | 'requestedDate'>) => {
    try {
      const item = createMaintenanceItem(newItem)
      setItems(prev => [...prev, item])
      setIsCreateModalOpen(false)
    } catch (err) {
      console.error('Failed to create maintenance item:', err)
      setError('Failed to create maintenance item. Please try again.')
    }
  }

  const handleUpdate = (id: string, updates: Partial<MaintenanceItem>) => {
    try {
      const updatedItem = updateMaintenanceItem(id, updates)
      if (updatedItem) {
        setItems(prev => prev.map(item => item.id === id ? updatedItem : item))
      }
    } catch (err) {
      console.error('Failed to update maintenance item:', err)
      setError('Failed to update maintenance item. Please try again.')
    }
  }

  const handleDelete = (id: string) => {
    try {
      deleteMaintenanceItem(id)
      setItems(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      console.error('Failed to delete maintenance item:', err)
      setError('Failed to delete maintenance item. Please try again.')
    }
  }

  const handleConvert = (id: string) => {
    try {
      const workOrder = convertRequestToWorkOrder(id)
      if (workOrder) {
        loadItems() // Refresh all items after conversion
      }
    } catch (err) {
      console.error('Failed to convert request to work order:', err)
      setError('Failed to convert request to work order. Please try again.')
    }
  }

  const filteredItems = items.filter(item => 
    activeTab === 'workOrders' ? item.type === 'workOrder' : item.type === 'request'
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Clock className="w-8 h-8 animate-spin text-blue-400" />
          <p className="text-gray-400">Loading maintenance items...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Maintenance"
        description="Track maintenance requests and work orders"
        action={
          <button 
            className="glass-button flex items-center gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Create Request
          </button>
        }
      />

      {error && (
        <div className="glass-panel p-4 text-red-400 flex items-center justify-between">
          <p>{error}</p>
          <button 
            onClick={() => setError(null)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex gap-4 border-b border-white/10">
        <button
          className={`px-4 py-2 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'workOrders'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent hover:border-white/20'
          }`}
          onClick={() => setActiveTab('workOrders')}
        >
          <ClipboardList className="w-4 h-4" />
          Work Orders ({items.filter(item => item.type === 'workOrder').length})
        </button>
        <button
          className={`px-4 py-2 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'requests'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent hover:border-white/20'
          }`}
          onClick={() => setActiveTab('requests')}
        >
          <MessageSquare className="w-4 h-4" />
          Client Requests ({items.filter(item => item.type === 'request').length})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MaintenanceColumn
          title="Pending"
          icon={Clock}
          items={filteredItems.filter(item => item.status === 'Pending')}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onConvert={handleConvert}
        />
        <MaintenanceColumn
          title="In Progress"
          icon={Wrench}
          items={filteredItems.filter(item => item.status === 'In Progress')}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onConvert={handleConvert}
        />
        <MaintenanceColumn
          title="Completed"
          icon={CheckCircle2}
          items={filteredItems.filter(item => item.status === 'Completed')}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onConvert={handleConvert}
        />
      </div>

      <CreateRequestModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  )
}

export default Maintenance