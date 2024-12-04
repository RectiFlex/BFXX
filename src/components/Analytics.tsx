import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', maintenance: 4, cost: 2400 },
  { name: 'Feb', maintenance: 3, cost: 1398 },
  { name: 'Mar', maintenance: 2, cost: 9800 },
  { name: 'Apr', maintenance: 6, cost: 3908 },
  { name: 'May', maintenance: 4, cost: 4800 },
  { name: 'Jun', maintenance: 3, cost: 3800 },
]

function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Analytics</h2>
        <p className="text-gray-400">Maintenance trends and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-medium mb-4">Maintenance Frequency</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    background: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="maintenance" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-lg font-medium mb-4">Maintenance Costs</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    background: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="cost" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-white/5">
            <p className="text-sm text-gray-400">Average Response Time</p>
            <p className="text-2xl font-bold">4.2 hours</p>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <p className="text-sm text-gray-400">Contractor Rating</p>
            <p className="text-2xl font-bold">4.8/5.0</p>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <p className="text-sm text-gray-400">Compliance Rate</p>
            <p className="text-2xl font-bold">98%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics