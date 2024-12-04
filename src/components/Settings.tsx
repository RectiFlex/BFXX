import { 
  Bell, 
  Building2, 
  Mail, 
  Shield,
  Users,
  Palette
} from 'lucide-react'
import PageHeader from './common/PageHeader'
import SettingSection from './settings/SettingSection'

function Settings() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your application preferences"
      />

      <div className="space-y-6">
        <SettingSection
          icon={Building2}
          title="Company Settings"
          description="Manage company information and branding"
          to="/settings/company"
        />
        
        <SettingSection
          icon={Users}
          title="User Management"
          description="Manage user access and permissions"
          to="/settings/users"
        />
        
        <SettingSection
          icon={Bell}
          title="Notifications"
          description="Configure notification preferences"
          to="/settings/notifications"
        />
        
        <SettingSection
          icon={Mail}
          title="Email Templates"
          description="Customize automated email messages"
          to="/settings/email-templates"
        />
        
        <SettingSection
          icon={Shield}
          title="Security"
          description="Manage security settings and authentication"
          to="/settings/security"
        />
        
        <SettingSection
          icon={Palette}
          title="Appearance"
          description="Customize the application's look and feel"
          to="/settings/appearance"
        />
      </div>
    </div>
  )
}

export default Settings