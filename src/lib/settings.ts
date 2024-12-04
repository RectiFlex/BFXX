import { Settings } from './types'

const STORAGE_KEY = 'app-settings'

const DEFAULT_SETTINGS: Settings = {
  company: {
    name: 'BlockFix',
    logo: null,
    address: '123 Business Street, Tech City, TC 12345',
    email: 'contact@blockfix.com',
    phone: '(555) 123-4567',
    website: 'https://blockfix.com',
    businessHours: 'Mon-Fri 9:00 AM - 5:00 PM'
  },
  notifications: {
    email: true,
    inApp: true,
    maintenanceAlerts: true,
    contractorUpdates: true,
    reportGeneration: true
  },
  appearance: {
    theme: 'dark',
    sidebarCollapsed: false,
    density: 'comfortable'
  }
}

function initializeSettings() {
  const settings = getSettings()
  if (!settings) {
    saveSettings(DEFAULT_SETTINGS)
  }
}

export function getSettings(): Settings {
  const settings = localStorage.getItem(STORAGE_KEY)
  return settings ? JSON.parse(settings) : null
}

export function saveSettings(settings: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function updateSettings(updates: Partial<Settings>): Settings {
  const currentSettings = getSettings()
  const newSettings = {
    ...currentSettings,
    ...updates,
    company: {
      ...currentSettings.company,
      ...(updates.company || {})
    },
    notifications: {
      ...currentSettings.notifications,
      ...(updates.notifications || {})
    },
    appearance: {
      ...currentSettings.appearance,
      ...(updates.appearance || {})
    }
  }
  saveSettings(newSettings)
  return newSettings
}

// Initialize when the module is imported
initializeSettings()