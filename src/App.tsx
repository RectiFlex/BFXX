import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Properties from './components/Properties'
import PropertyDetails from './components/properties/PropertyDetails'
import Maintenance from './components/Maintenance'
import Analytics from './components/Analytics'
import Contractors from './components/Contractors'
import Reports from './components/Reports'
import Settings from './components/Settings'
import CompanySettings from './components/CompanySettings'

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/contractors" element={<Contractors />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/company" element={<CompanySettings />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App