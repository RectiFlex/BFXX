import { Upload, Save } from 'lucide-react'

function CompanySettings() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Company Settings</h2>
        <p className="text-gray-400">Manage your company profile and preferences</p>
      </div>

      <div className="glass-panel p-8 space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 rounded-xl bg-gray-800 border-2 border-dashed border-gray-600 flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Company Logo</h3>
              <button className="glass-button">Upload New Logo</button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Business Address</label>
              <textarea
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                rows={3}
                placeholder="Enter business address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email</label>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="contact@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Phone</label>
                <input
                  type="tel"
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company Website</label>
              <input
                type="url"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="https://www.company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Business Hours</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Mon-Fri 9:00 AM - 5:00 PM"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="glass-button">Cancel</button>
          <button className="glass-button flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompanySettings