import { Link as LinkIcon, ExternalLink, CircleDollarSign } from 'lucide-react'
import { PropertyContract } from '../../../lib/types'

type ContractDetailsProps = {
  contract?: PropertyContract
}

function ContractDetails({ contract }: ContractDetailsProps) {
  if (!contract) {
    return (
      <div className="glass-panel p-6">
        <p className="text-center text-gray-400">No smart contract information available</p>
      </div>
    )
  }

  return (
    <div className="glass-panel p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-blue-500/20">
          <LinkIcon className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-xl font-medium">Smart Contract</h3>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">Contract Address</p>
          <div className="flex items-center gap-2">
            <span className="font-mono bg-white/5 px-3 py-2 rounded-lg">
              {contract.address}
            </span>
            <a
              href={`https://etherscan.io/address/${contract.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button p-2"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              <CircleDollarSign className="w-5 h-5 text-green-400" />
              <p className="text-sm text-gray-400">Total Expenses</p>
            </div>
            <p className="text-xl font-medium">
              ${contract.totalExpenses.toLocaleString()}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              <LinkIcon className="w-5 h-5 text-blue-400" />
              <p className="text-sm text-gray-400">Maintenance Records</p>
            </div>
            <p className="text-xl font-medium">{contract.maintenanceCount}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1">Last Updated</p>
          <p>{new Date(contract.lastUpdated).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default ContractDetails