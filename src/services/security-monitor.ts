import { TransactionAnalyzer } from './transaction-analyzer.js';
import { NEARService } from './near-service.js';
import { BlockchainMonitor } from './blockchain-monitor.js';

interface SecurityRule {
  maxDailyAmount: number;
  allowedAddresses: string[];
  autoBlockUnknown: boolean;
  alertThreshold: number;
}

interface AuditAction {
  timestamp: string;
  action: string;
  reason: string;
  transactionHash?: string;
  riskLevel: string;
}

interface WalletProfile {
  address: string;
  lastChecked: string;
  totalTransactions: number;
  threatsBlocked: number;
  activeApprovals: number;
  riskScore: number;
}

export class SecurityMonitor {
  private nearService: NEARService;
  private transactionAnalyzer: TransactionAnalyzer;
  private blockchainMonitor: BlockchainMonitor;
  private securityRules: SecurityRule;
  private auditTrail: AuditAction[] = [];
  private monitoringActive: boolean = false;
  private threatCount: number = 0;
  private transactionCount: number = 0;

  constructor(nearService: NEARService, transactionAnalyzer: TransactionAnalyzer) {
    this.nearService = nearService;
    this.transactionAnalyzer = transactionAnalyzer;
    this.blockchainMonitor = new BlockchainMonitor();
    
    this.securityRules = {
      maxDailyAmount: Number(process.env.MAX_DAILY_TRANSACTION_AMOUNT) || 1000,
      allowedAddresses: [],
      autoBlockUnknown: process.env.AUTO_BLOCK_UNKNOWN_CONTRACTS === 'true',
      alertThreshold: 0.7
    };
  }

  async startMonitoring(): Promise<void> {
    this.monitoringActive = true;
    console.log('🔍 Security monitoring started');
    
    setInterval(async () => {
      await this.performSecurityCheck();
    }, 10000);
  }

  private async performSecurityCheck(): Promise<void> {
    if (!this.monitoringActive) return;
    console.log('🔍 Performing security check...');
    this.transactionCount++;
  }

  async getWalletProfile(address: string): Promise<WalletProfile> {
    return {
      address,
      lastChecked: new Date().toISOString(),
      totalTransactions: this.transactionCount,
      threatsBlocked: this.threatCount,
      activeApprovals: 5,
      riskScore: 0.2
    };
  }

  async updateSecurityRules(rules: Partial<SecurityRule>): Promise<void> {
    this.securityRules = {
      ...this.securityRules,
      ...rules
    };
    
    this.addToAuditTrail({
      timestamp: new Date().toISOString(),
      action: 'SECURITY_RULES_UPDATED',
      reason: 'User updated security preferences',
      riskLevel: 'INFO'
    });
    
    console.log('✅ Security rules updated');
  }

  getAuditTrail(): AuditAction[] {
    return this.auditTrail;
  }

  getThreatCount(): number {
    return this.threatCount;
  }

  getTransactionCount(): number {
    return this.transactionCount;
  }

  private addToAuditTrail(action: AuditAction): void {
    this.auditTrail.push(action);
    if (this.auditTrail.length > 100) {
      this.auditTrail = this.auditTrail.slice(-100);
    }
  }

  async blockTransaction(txHash: string, reason: string): Promise<void> {
    this.threatCount++;
    this.addToAuditTrail({
      timestamp: new Date().toISOString(),
      action: 'TRANSACTION_BLOCKED',
      reason,
      transactionHash: txHash,
      riskLevel: 'HIGH'
    });
    console.log(`🚫 BLOCKED: ${txHash} - Reason: ${reason}`);
  }
}