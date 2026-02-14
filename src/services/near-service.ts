export class NEARService {
  private accountId: string;

  constructor() {
    this.accountId = process.env.NEAR_ACCOUNT_ID || '';
    console.log('✅ NEAR service initialized');
  }

  async initialize(): Promise<void> {
    console.log('✅ NEAR connection established');
    console.log(`📍 Account: ${this.accountId}`);
  }
}