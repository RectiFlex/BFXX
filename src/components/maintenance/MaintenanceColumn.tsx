import { LucideIcon } from 'lucide-react'
import { MaintenanceItem } from '../../lib/types'
import MaintenanceCard from './MaintenanceCard'

type MaintenanceColumnProps = {
  title: string
  icon: LucideIcon
  items: MaintenanceItem[]
  onUpdate: (id: string, updates: Partial<MaintenanceItem>) => void
  onDelete: (id: string) => void
  onConvert?: (id: string) => void
}

function MaintenanceColumn({ 
  title, 
  icon: Icon, 
  items, 
  onUpdate, 
  onDelete, 
  onConvert 
}: MaintenanceColumnProps) {
  return (
    <div className="glass-panel p-6 space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Icon className="w-5 h-5" /> {title}
      </h3>
      {items.map(item => (
        <MaintenanceCard 
          key={item.id} 
          item={item} 
          onUpdate={onUpdate}
          onDelete={onDelete}
          onConvert={onConvert}
        />
      ))}
    </div>
  )
}

export default MaintenanceColumn