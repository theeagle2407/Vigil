import { ethers } from 'ethers';

export class BlockchainMonitor {
  private ethProvider: ethers.JsonRpcProvider;
  private polygonProvider: ethers.JsonRpcProvider;
  private monitoringAddresses: Set<string> = new Set();

  constructor() {
    this.ethProvider = new ethers.JsonRpcProvider(
      process.env.ETHEREUM_RPC_URL || 'https://rpc.sepolia.org'
    );
    this.polygonProvider = new ethers.JsonRpcProvider(
      process.env.POLYGON_RPC_URL || 'https://rpc-mumbai.maticvigil.com'
    );
    console.log('🌐 Blockchain monitors initialized');
  }

  async getBalance(address: string, chain: 'ethereum' | 'polygon' = 'ethereum'): Promise<string> {
    try {
      const provider = chain === 'ethereum' ? this.ethProvider : this.polygonProvider;
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error(`Failed to get balance for ${address}:`, error);
      return '0';
    }
  }

  async getLatestBlock(chain: 'ethereum' | 'polygon' = 'ethereum'): Promise<number> {
    try {
      const provider = chain === 'ethereum' ? this.ethProvider : this.polygonProvider;
      return await provider.getBlockNumber();
    } catch (error) {
      console.error('Failed to get latest block:', error);
      return 0;
    }
  }

  async monitorAddress(address: string): Promise<void> {
    this.monitoringAddresses.add(address.toLowerCase());
    console.log(`👁️  Now monitoring: ${address}`);

    // Listen for new blocks on Ethereum
    this.ethProvider.on('block', async (blockNumber) => {
      console.log(`📦 New Ethereum block: ${blockNumber}`);
      await this.checkAddressActivity(address, blockNumber);
    });
  }

  private async checkAddressActivity(address: string, blockNumber: number): Promise<void> {
    try {
      const block = await this.ethProvider.getBlock(blockNumber, true);
      if (!block || !block.transactions) return;

      // Check if any transaction involves our monitored address
      for (const tx of block.transactions) {
        if (typeof tx === 'string') continue;
        
        if (tx.to?.toLowerCase() === address.toLowerCase() || 
            tx.from?.toLowerCase() === address.toLowerCase()) {
          console.log(`🔔 Transaction detected for ${address}:`);
          console.log(`   From: ${tx.from}`);
          console.log(`   To: ${tx.to}`);
          console.log(`   Value: ${ethers.formatEther(tx.value || 0)} ETH`);
          console.log(`   Hash: ${tx.hash}`);
        }
      }
    } catch (error) {
      console.error('Error checking address activity:', error);
    }
  }

  async getTransactionCount(address: string, chain: 'ethereum' | 'polygon' = 'ethereum'): Promise<number> {
    try {
      const provider = chain === 'ethereum' ? this.ethProvider : this.polygonProvider;
      return await provider.getTransactionCount(address);
    } catch (error) {
      console.error('Failed to get transaction count:', error);
      return 0;
    }
  }

  stopMonitoring(): void {
    this.ethProvider.removeAllListeners();
    this.polygonProvider.removeAllListeners();
    console.log('🛑 Blockchain monitoring stopped');
  }
}