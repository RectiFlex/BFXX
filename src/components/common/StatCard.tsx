import { TrendingUp, TrendingDown } from 'lucide-react'

type StatCardProps = {
  icon: React.ElementType
  title: string
  value: string
  subtitle: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

function StatCard({ icon: Icon, title, value, subtitle, trend }: StatCardProps) {
  return (
    <div className="glass-panel p-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-blue-500/20">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-3xl font-bold">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${
              trend.isPositive ? 'text-green-400' : 'text-red-400'
            }`}>
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {trend.value}%
            </div>
          )}
        </div>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  )
}

export default StatCard