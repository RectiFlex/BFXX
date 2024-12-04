import { ethers } from 'ethers'

const PROPERTY_CONTRACT_ABI = [
  "function initialize(string propertyId)",
  "function addMaintenance(string maintenanceId, uint256 cost)",
  "function getMaintenanceCount() view returns (uint256)",
  "function getTotalExpenses() view returns (uint256)",
  "function getLastUpdated() view returns (uint256)"
]

export async function createPropertyContract(propertyId: string) {
  try {
    if (!window.ethereum) {
      throw new Error('Metamask not installed')
    }

    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    // In a production environment, you would deploy from your actual contract bytecode
    // This is a simplified version for demonstration
    const factory = new ethers.ContractFactory(
      PROPERTY_CONTRACT_ABI,
      "0x...", // Contract bytecode would go here
      signer
    )

    const contract = await factory.deploy()
    await contract.initialize(propertyId)

    return {
      address: await contract.getAddress(),
      ownerAddress: await signer.getAddress()
    }
  } catch (error) {
    console.error('Failed to create property contract:', error)
    throw error
  }
}

export async function getContractDetails(contractAddress: string) {
  try {
    if (!window.ethereum) {
      throw new Error('Metamask not installed')
    }

    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, PROPERTY_CONTRACT_ABI, provider)

    const [maintenanceCount, totalExpenses, lastUpdated] = await Promise.all([
      contract.getMaintenanceCount(),
      contract.getTotalExpenses(),
      contract.getLastUpdated()
    ])

    return {
      maintenanceCount: Number(maintenanceCount),
      totalExpenses: Number(totalExpenses),
      lastUpdated: new Date(Number(lastUpdated) * 1000).toISOString()
    }
  } catch (error) {
    console.error('Failed to get contract details:', error)
    throw error
  }
}