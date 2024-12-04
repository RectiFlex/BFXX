import { Building2, Wrench, ChartBar, CheckCircle } from 'lucide-react'
import StatCard from '../common/StatCard'

type DashboardStatsProps = {
  stats: {
    properties: {
      total: number
      active: number
      trend: number
    }
    maintenance: {
      pending: number
      total: number
      trend: number
    }
    completion: {
      rate: number
      trend: number
    }
  }
}

function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={Building2}
        title="Properties"
        value={stats.properties.total.toString()}
        subtitle={`${stats.properties.active} active properties`}
        trend={{ value: stats.properties.trend, isPositive: stats.properties.trend >= 0 }}
      />
      <StatCard
        icon={Wrench}
        title="Maintenance"
        value={stats.maintenance.pending.toString()}
        subtitle={`${stats.maintenance.total} total requests`}
        trend={{ value: stats.maintenance.trend, isPositive: stats.maintenance.trend >= 0 }}
      />
      <StatCard
        icon={CheckCircle}
        title="Completion Rate"
        value={`${Math.round(stats.completion.rate)}%`}
        subtitle="Work order completion"
        trend={{ value: stats.completion.trend, isPositive: stats.completion.trend >= 0 }}
      />
      <StatCard
        icon={ChartBar}
        title="Activity"
        value={stats.maintenance.total.toString()}
        subtitle="Total maintenance records"
        trend={{ value: stats.maintenance.trend, isPositive: stats.maintenance.trend >= 0 }}
      />
    </div>
  )
}

export default DashboardStats