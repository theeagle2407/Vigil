import { ThreatDetector } from './threat-detector.js';

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

    if (this.threatDetector.isKnownScam(transaction.to)) {
      threats.push('Recipient is a known scam address');
      score += 100;
    }

    const value = parseFloat(transaction.value);
    if (value > 10000) {
      threats.push('Transaction value exceeds safety threshold');
      score += 50;
    }

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

    return { riskLevel, threats, recommendation, shouldBlock, score };
  }
}