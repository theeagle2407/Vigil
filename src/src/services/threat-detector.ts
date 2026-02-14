interface Threat {
  id: string;
  type: 'SCAM_ADDRESS' | 'PHISHING' | 'MALICIOUS_CONTRACT' | 'SUSPICIOUS_PATTERN';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  address?: string;
  timestamp: string;
}

export class ThreatDetector {
  private knownScams: Set<string>;
  private recentThreats: Threat[];
  private threatDatabase: Map<string, Threat>;

  constructor() {
    this.knownScams = new Set([
      // Example known scam addresses (in production, fetch from threat intelligence APIs)
      '0x0000000000000000000000000000000000000000',
      '0xdead000000000000000000000000000000000000'
    ]);

    this.recentThreats = [];
    this.threatDatabase = new Map();
    this.initializeThreatDatabase();
  }

  private initializeThreatDatabase(): void {
    // In production, this would fetch from:
    // - Chainanalysis
    // - CertiK
    // - Forta Network
    // - Community reports

    console.log('🛡️ Threat database initialized');
  }

  isKnownScam(address: string): boolean {
    return this.knownScams.has(address.toLowerCase());
  }

  addScamAddress(address: string, reason: string): void {
    this.knownScams.add(address.toLowerCase());
    
    const threat: Threat = {
      id: `threat-${Date.now()}`,
      type: 'SCAM_ADDRESS',
      severity: 'HIGH',
      description: reason,
      address: address,
      timestamp: new Date().toISOString()
    };

    this.recordThreat(threat);
  }

  detectPhishing(url: string): { isPhishing: boolean; confidence: number } {
    // In production, this would:
    // - Check against known phishing databases
    // - Analyze URL patterns (typosquatting, look-alikes)
    // - Verify SSL certificates
    // - Check domain age and registration

    const phishingPatterns = [
      'metamask-secure',
      'wallet-verify',
      'claim-reward',
      'urgent-action'
    ];

    const isPhishing = phishingPatterns.some(pattern => 
      url.toLowerCase().includes(pattern)
    );

    if (isPhishing) {
      this.recordThreat({
        id: `threat-${Date.now()}`,
        type: 'PHISHING',
        severity: 'CRITICAL',
        description: `Phishing attempt detected: ${url}`,
        timestamp: new Date().toISOString()
      });
    }

    return {
      isPhishing,
      confidence: isPhishing ? 0.95 : 0.05
    };
  }

  analyzeContractCode(bytecode: string): {
    isMalicious: boolean;
    risks: string[];
  } {
    // In production, this would:
    // - Decompile bytecode
    // - Look for known malicious patterns
    // - Check for backdoors, hidden minting functions
    // - Analyze gas usage patterns

    const risks: string[] = [];
    let isMalicious = false;

    // Simulated analysis
    if (bytecode.includes('selfdestruct')) {
      risks.push('Contract contains self-destruct functionality');
      isMalicious = true;
    }

    if (bytecode.length < 100) {
      risks.push('Suspiciously small contract');
    }

    if (isMalicious) {
      this.recordThreat({
        id: `threat-${Date.now()}`,
        type: 'MALICIOUS_CONTRACT',
        severity: 'HIGH',
        description: `Malicious contract detected: ${risks.join(', ')}`,
        timestamp: new Date().toISOString()
      });
    }

    return {
      isMalicious,
      risks
    };
  }

  getRecentThreats(limit: number = 10): Threat[] {
    return this.recentThreats.slice(0, limit);
  }

  private recordThreat(threat: Threat): void {
    this.recentThreats.unshift(threat);
    this.threatDatabase.set(threat.id, threat);

    // Keep only last 100 threats
    if (this.recentThreats.length > 100) {
      const removed = this.recentThreats.pop();
      if (removed) {
        this.threatDatabase.delete(removed.id);
      }
    }

    console.log(`⚠️  THREAT DETECTED: ${threat.type} - ${threat.description}`);
  }

  async fetchLatestThreatIntelligence(): Promise<void> {
    // In production, this would periodically fetch from:
    // - Forta Network alerts
    // - CertiK security feeds
    // - Chainanalysis updates
    // - Community threat reports

    console.log('🔄 Updating threat intelligence...');
  }
}
