import { ThreatDetector } from './threat-detector';

interface Transaction {
  from: string;
  to: string;
  value: string;
  data?: string;
  contractAddress?: string;
}

interface AnalysisResult {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  threats: string[];
  recommendation: string;
  shouldBlock: boolean;
  score: number;
}

export class TransactionAnalyzer {
  private threatDetector: ThreatDetector;

  constructor(threatDetector: ThreatDetector) {
    this.threatDetector = threatDetector;
  }

  async analyze(transaction: Transaction): Promise<AnalysisResult> {
    const threats: string[] = [];
    let score = 0;

    // Check 1: Is recipient a known scam address?
    if (this.threatDetector.isKnownScam(transaction.to)) {
      threats.push('Recipient is a known scam address');
      score += 100; // Critical
    }

    // Check 2: Unusual transaction value
    const value = parseFloat(transaction.value);
    if (value > 10000) {
      threats.push('Transaction value exceeds safety threshold');
      score += 50;
    }

    // Check 3: Contract interaction analysis
    if (transaction.contractAddress) {
      const contractRisk = await this.analyzeContract(transaction.contractAddress);
      if (contractRisk.isRisky) {
        threats.push(`Contract risk: ${contractRisk.reason}`);
        score += contractRisk.severity;
      }
    }

    // Check 4: Unusual timing or patterns
    if (this.isUnusualPattern(transaction)) {
      threats.push('Transaction matches suspicious pattern');
      score += 30;
    }

    // Determine risk level and recommendation
    let riskLevel: AnalysisResult['riskLevel'];
    let recommendation: string;
    let shouldBlock: boolean;

    if (score >= 100) {
      riskLevel = 'CRITICAL';
      recommendation = 'Block immediately - high confidence scam';
      shouldBlock = true;
    } else if (score >= 70) {
      riskLevel = 'HIGH';
      recommendation = 'Block and alert user for review';
      shouldBlock = true;
    } else if (score >= 40) {
      riskLevel = 'MEDIUM';
      recommendation = 'Flag for user approval before proceeding';
      shouldBlock = false;
    } else {
      riskLevel = 'LOW';
      recommendation = 'Transaction appears safe';
      shouldBlock = false;
    }

    return {
      riskLevel,
      threats,
      recommendation,
      shouldBlock,
      score
    };
  }

  private async analyzeContract(address: string): Promise<{ isRisky: boolean; reason: string; severity: number }> {
    // In production, this would:
    // - Check contract against security databases (Etherscan, CertiK)
    // - Analyze contract code for known vulnerabilities
    // - Check if contract is verified
    // - Look for unlimited approval patterns

    // Simulated risk detection
    const riskyPatterns = ['unknown', 'unverified', 'suspicious'];
    const isRisky = riskyPatterns.some(pattern => address.toLowerCase().includes(pattern));

    if (isRisky) {
      return {
        isRisky: true,
        reason: 'Contract not verified or flagged as suspicious',
        severity: 60
      };
    }

    return {
      isRisky: false,
      reason: 'Contract appears safe',
      severity: 0
    };
  }

  private isUnusualPattern(transaction: Transaction): boolean {
    // In production, this would use ML/pattern matching:
    // - Check if transaction is at unusual time
    // - Compare with user's historical behavior
    // - Look for rapid succession of transactions
    // - Detect automation patterns

    // Simulated pattern detection
    const hour = new Date().getHours();
    const isLateNight = hour >= 2 && hour <= 5;
    
    return isLateNight; // Flag late-night transactions as potentially suspicious
  }

  async scanApprovals(walletAddress: string): Promise<{
    totalApprovals: number;
    riskyApprovals: number;
    recommendations: string[];
  }> {
    // In production, this would:
    // 1. Query blockchain for all token approvals from this wallet
    // 2. Check each approved contract
    // 3. Flag unlimited approvals or risky contracts

    // Simulated approval scan
    return {
      totalApprovals: 12,
      riskyApprovals: 3,
      recommendations: [
        'Revoke unlimited USDC approval to 0x1234... (unused for 90 days)',
        'Revoke approval to unverified contract 0x5678...',
        'Consider setting spending limits on 0x9abc...'
      ]
    };
  }
}
