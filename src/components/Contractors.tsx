import { useState, useEffect } from 'react'
import { UserCircle2, Star, Phone, Mail, Plus, Trash2, Edit } from 'lucide-react'
import { Contractor } from '../lib/types'
import { getContractors, createContractor, updateContractor, deleteContractor } from '../lib/contractors'
import CreateContractorModal from './contractors/CreateContractorModal'
import EditContractorModal from './contractors/EditContractorModal'
import PageHeader from './common/PageHeader'

function ContractorCard({ contractor, onEdit, onDelete }: {
  contractor: Contractor;
  onEdit: (contractor: Contractor) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="glass-panel p-6 space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-blue-500/20 shrink-0">
          <UserCircle2 className="w-8 h-8 text-blue-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-lg truncate">{contractor.name}</h3>
          <p className="text-sm text-gray-400 truncate">{contractor.specialty}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(contractor)}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to delete this contractor?')) {
                onDelete(contractor.id)
              }
            }}
            className="p-2 rounded-lg hover:bg-white/10 text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < contractor.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-400">{contractor.rating}.0</span>
      </div>
      <div className="space-y-2 flex-grow">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="truncate">{contractor.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="truncate">{contractor.email}</span>
        </div>
      </div>
      <div className="pt-4 border-t border-white/10 mt-auto">
        <div className="flex justify-between items-center text-sm">
          <span className={`px-2 py-1 rounded-full ${
            contractor.availability === 'Available' ? 'bg-green-500/20 text-green-400' :
            contractor.availability === 'Busy' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {contractor.availability}
          </span>
          <span className="text-gray-400">{contractor.completedJobs} jobs completed</span>
        </div>
      </div>
    </div>
  )
}

function Contractors() {
  const [contractors, setContractors] = useState<Contractor[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingContractor, setEditingContractor] = useState<Contractor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadContractors()
  }, [])

  const loadContractors = () => {
    try {
      const data = getContractors()
      setContractors(data)
      setError(null)
    } catch (err) {
      console.error('Failed to load contractors:', err)
      setError('Failed to load contractors. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = (data: Omit<Contractor, 'id' | 'joinedDate' | 'completedJobs'>) => {
    try {
      const newContractor = createContractor(data)
      setContractors(prev => [...prev, newContractor])
      setIsCreateModalOpen(false)
    } catch (err) {
      console.error('Failed to create contractor:', err)
      setError('Failed to create contractor. Please try again.')
    }
  }

  const handleUpdate = (id: string, data: Partial<Contractor>) => {
    try {
      const updated = updateContractor(id, data)
      setContractors(prev => prev.map(c => c.id === id ? updated : c))
      setEditingContractor(null)
    } catch (err) {
      console.error('Failed to update contractor:', err)
      setError('Failed to update contractor. Please try again.')
    }
  }

  const handleDelete = (id: string) => {
    try {
      deleteContractor(id)
      setContractors(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      console.error('Failed to delete contractor:', err)
      setError('Failed to delete contractor. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-400">Loading contractors...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Contractors"
        description="Manage your trusted service providers"
        action={
          <button 
            className="glass-button flex items-center gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Contractor
          </button>
        }
      />

      {error && (
        <div className="glass-panel p-4 text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {contractors.map(contractor => (
          <ContractorCard
            key={contractor.id}
            contractor={contractor}
            onEdit={setEditingContractor}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {contractors.length === 0 && !error && (
        <div className="glass-panel p-8 text-center">
          <p className="text-gray-400">No contractors found. Click "Add Contractor" to create one.</p>
        </div>
      )}

      <CreateContractorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      {editingContractor && (
        <EditContractorModal
          contractor={editingContractor}
          isOpen={true}
          onClose={() => setEditingContractor(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

export default Contractors