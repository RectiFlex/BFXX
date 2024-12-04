import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Building2, 
  Wrench, 
  BarChart3, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  Settings
} from 'lucide-react'

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={`relative glass-panel p-6 m-2 flex flex-col gap-8 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 p-1.5 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && <h1 className="text-xl font-bold">BlockFix</h1>}
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          className={({isActive}) =>
            `sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink
          to="/properties"
          className={({isActive}) =>
            `sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <Building2 className="w-5 h-5" />
          {!isCollapsed && <span>Properties</span>}
        </NavLink>
        <NavLink
          to="/maintenance"
          className={({isActive}) =>
            `sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <Wrench className="w-5 h-5" />
          {!isCollapsed && <span>Maintenance</span>}
        </NavLink>
        <NavLink
          to="/contractors"
          className={({isActive}) =>
            `sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <Users className="w-5 h-5" />
          {!isCollapsed && <span>Contractors</span>}
        </NavLink>
        <NavLink
          to="/analytics"
          className={({isActive}) =>
            `sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <BarChart3 className="w-5 h-5" />
          {!isCollapsed && <span>Analytics</span>}
        </NavLink>
        <NavLink
          to="/reports"
          className={({isActive}) =>
            `sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <FileText className="w-5 h-5" />
          {!isCollapsed && <span>Reports</span>}
        </NavLink>
        <NavLink
          to="/settings"
          className={({isActive}) =>
            `sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar