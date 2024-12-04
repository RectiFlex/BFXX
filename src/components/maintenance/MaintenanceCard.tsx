import { Building2, AlertTriangle, User, Calendar, ArrowRightCircle, Check, Trash2 } from 'lucide-react'
import { MaintenanceItem } from '../../lib/types'

type MaintenanceCardProps = {
  item: MaintenanceItem
  onUpdate: (id: string, updates: Partial<MaintenanceItem>) => void
  onDelete: (id: string) => void
  onConvert?: (id: string) => void
}

function MaintenanceCard({ item, onUpdate, onDelete, onConvert }: MaintenanceCardProps) {
  const statusColors = {
    'Pending': 'text-yellow-400',
    'In Progress': 'text-blue-400',
    'Completed': 'text-green-400'
  }

  const priorityColors = {
    'Low': 'text-green-400',
    'Medium': 'text-yellow-400',
    'High': 'text-red-400'
  }

  const nextStatus = {
    'Pending': 'In Progress',
    'In Progress': 'Completed',
    'Completed': 'Completed'
  } as const

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this item?')) {
      onDelete(item.id)
    }
  }

  return (
    <div className="p-4 rounded-lg bg-white/5 space-y-3">
      <div className="flex justify-between items-start">
        <h4 className="font-medium">{item.title}</h4>
        <span className={`${statusColors[item.status]} text-sm`}>{item.status}</span>
      </div>
      <p className="text-sm text-gray-400">{item.description}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-400" />
          <span>{item.property}</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className={`w-4 h-4 ${priorityColors[item.priority]}`} />
          <span className={priorityColors[item.priority]}>{item.priority}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span>{item.requestedBy || 'Unassigned'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{new Date(item.requestedDate).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {!item.convertedToWorkOrder && item.type === 'request' && (
          <button 
            className="glass-button text-sm flex-1 flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30"
            onClick={() => onConvert?.(item.id)}
          >
            <ArrowRightCircle className="w-4 h-4" />
            Convert to Work Order
          </button>
        )}
        {item.status !== 'Completed' && !item.convertedToWorkOrder && (
          <button 
            className="glass-button text-sm flex-1 flex items-center justify-center gap-2"
            onClick={() => onUpdate(item.id, { status: nextStatus[item.status] })}
          >
            <Check className="w-4 h-4" />
            Update Status
          </button>
        )}
        <button 
          className="glass-button text-sm flex-1 flex items-center justify-center gap-2 hover:bg-red-500/20"
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
      {item.convertedToWorkOrder && (
        <div className="mt-2 text-sm text-blue-400 flex items-center gap-2">
          <ArrowRightCircle className="w-4 h-4" />
          Converted to Work Order
        </div>
      )}
    </div>
  )
}

export default MaintenanceCard