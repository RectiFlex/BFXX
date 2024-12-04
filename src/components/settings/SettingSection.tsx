import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

type SettingSectionProps = {
  icon: React.ElementType
  title: string
  description: string
  to: string
}

function SettingSection({ icon: Icon, title, description, to }: SettingSectionProps) {
  return (
    <Link to={to} className="glass-panel p-6 hover:border-white/20 transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </Link>
  )
}

export default SettingSection