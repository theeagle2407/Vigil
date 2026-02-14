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

  constructor() {
    this.knownScams = new Set([
      '0x0000000000000000000000000000000000000000',
      '0xdead000000000000000000000000000000000000'
    ]);
    this.recentThreats = [];
    console.log('🛡️ Threat database initialized');
  }

  isKnownScam(address: string): boolean {
    return this.knownScams.has(address.toLowerCase());
  }

  getRecentThreats(limit: number = 10): Threat[] {
    return this.recentThreats.slice(0, limit);
  }
}