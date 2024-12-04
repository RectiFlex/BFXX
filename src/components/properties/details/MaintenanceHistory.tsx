import { ClipboardList, AlertTriangle } from 'lucide-react'
import { MaintenanceItem } from '../../../lib/types'

type MaintenanceHistoryProps = {
  items: MaintenanceItem[]
}

function MaintenanceHistory({ items }: MaintenanceHistoryProps) {
  const priorityColors = {
    'Low': 'text-green-400',
    'Medium': 'text-yellow-400',
    'High': 'text-red-400'
  }

  const sortedItems = [...items].sort((a, b) => 
    new Date(b.requestedDate).getTime() - new Date(a.requestedDate).getTime()
  )

  return (
    <div className="glass-panel p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-purple-500/20">
          <ClipboardList className="w-6 h-6 text-purple-400" />
        </div>
        <h3 className="text-xl font-medium">Maintenance History</h3>
      </div>

      <div className="space-y-4">
        {sortedItems.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No maintenance history found</p>
        ) : (
          sortedItems.map((item) => (
            <div key={item.id} className="p-4 rounded-lg bg-white/5 space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{item.title}</h4>
                <span className={`text-sm ${priorityColors[item.priority]}`}>
                  {item.priority}
                </span>
              </div>
              <p className="text-sm text-gray-400">{item.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">
                  {new Date(item.requestedDate).toLocaleDateString()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                  item.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MaintenanceHistory