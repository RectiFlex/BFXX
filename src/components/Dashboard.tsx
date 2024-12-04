import { useMemo } from 'react'
import DashboardStats from './dashboard/DashboardStats'
import PageHeader from './common/PageHeader'
import { getProperties } from '../lib/properties'
import { getMaintenanceItems } from '../lib/maintenance'
import { LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B']

function Dashboard() {
  // Get all necessary data
  const properties = useMemo(() => getProperties(), [])
  const maintenanceItems = useMemo(() => getMaintenanceItems(), [])

  // Calculate maintenance trends (last 6 months)
  const maintenanceTrendData = useMemo(() => {
    const now = new Date()
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now)
      d.setMonth(d.getMonth() - i)
      return {
        month: d.toLocaleString('default', { month: 'short' }),
        date: d
      }
    }).reverse()

    return months.map(({ month, date }) => {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      
      const requests = maintenanceItems.filter(item => {
        const itemDate = new Date(item.requestedDate)
        return itemDate >= startOfMonth && itemDate <= endOfMonth
      }).length

      return { month, requests }
    })
  }, [maintenanceItems])

  // Calculate property distribution
  const propertyDistributionData = useMemo(() => {
    const distribution = properties.reduce((acc, property) => {
      acc[property.type] = (acc[property.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value
    }))
  }, [properties])

  // Calculate maintenance by type
  const maintenanceByType = useMemo(() => {
    const byType = maintenanceItems.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return [
      { name: 'Work Orders', value: byType['workOrder'] || 0 },
      { name: 'Requests', value: byType['request'] || 0 }
    ]
  }, [maintenanceItems])

  // Calculate dashboard statistics
  const stats = useMemo(() => {
    const totalProperties = properties.length
    const activeProperties = properties.filter(p => p.status === 'Active').length
    
    const pendingMaintenance = maintenanceItems.filter(
      item => item.status === 'Pending'
    ).length
    
    const completedMaintenance = maintenanceItems.filter(
      item => item.status === 'Completed'
    ).length

    const totalMaintenanceThisMonth = maintenanceItems.filter(item => {
      const itemDate = new Date(item.requestedDate)
      const now = new Date()
      return itemDate.getMonth() === now.getMonth() && 
             itemDate.getFullYear() === now.getFullYear()
    }).length

    const lastMonthMaintenance = maintenanceItems.filter(item => {
      const itemDate = new Date(item.requestedDate)
      const now = new Date()
      const lastMonth = new Date(now.setMonth(now.getMonth() - 1))
      return itemDate.getMonth() === lastMonth.getMonth() && 
             itemDate.getFullYear() === lastMonth.getFullYear()
    }).length

    const maintenanceChange = lastMonthMaintenance 
      ? ((totalMaintenanceThisMonth - lastMonthMaintenance) / lastMonthMaintenance) * 100
      : 0

    return {
      properties: {
        total: totalProperties,
        active: activeProperties,
        trend: ((activeProperties / totalProperties) * 100) - 100
      },
      maintenance: {
        pending: pendingMaintenance,
        total: maintenanceItems.length,
        trend: maintenanceChange
      },
      completion: {
        rate: completedMaintenance 
          ? (completedMaintenance / maintenanceItems.length) * 100 
          : 0,
        trend: 0 // Would need historical data to calculate trend
      }
    }
  }, [properties, maintenanceItems])

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your property management system"
      />

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-medium mb-4">Maintenance Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={maintenanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    background: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-lg font-medium mb-4">Property Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={propertyDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {propertyDistributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6">
              {propertyDistributionData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 col-span-full">
          <h3 className="text-lg font-medium mb-4">Maintenance Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {maintenanceItems
              .filter(item => item.status === 'Pending')
              .slice(0, 3)
              .map(item => (
                <div key={item.id} className="p-4 rounded-lg bg-white/5">
                  <h4 className="font-medium truncate">{item.title}</h4>
                  <p className="text-sm text-gray-400 mt-1 truncate">{item.property}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      item.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                      item.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {item.priority}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(item.requestedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard