import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { SecurityMonitor } from './services/security-monitor';
import { TransactionAnalyzer } from './services/transaction-analyzer';
import { ThreatDetector } from './services/threat-detector';
import { NEARService } from './services/near-service';
import dotenv from 'dotenv';

dotenv.config();

const app = new Hono();
const port = process.env.PORT || 3000;

// Initialize services
const nearService = new NEARService();
const threatDetector = new ThreatDetector();
const transactionAnalyzer = new TransactionAnalyzer(threatDetector);
const securityMonitor = new SecurityMonitor(nearService, transactionAnalyzer);

// Health check
app.get('/', (c) => {
  return c.json({
    name: 'Vigil Security Agent',
    status: 'active',
    version: '1.0.0',
    message: 'Your 24/7 security agent is watching 🛡️'
  });
});

// Get agent status
app.get('/api/status', (c) => {
  return c.json({
    monitoring: true,
    threatsDetected: securityMonitor.getThreatCount(),
    transactionsAnalyzed: securityMonitor.getTransactionCount(),
    lastCheck: new Date().toISOString()
  });
});

// Get wallet security profile
app.get('/api/wallet/:address', async (c) => {
  const address = c.req.param('address');
  
  try {
    const profile = await securityMonitor.getWalletProfile(address);
    return c.json(profile);
  } catch (error) {
    return c.json({ error: 'Failed to fetch wallet profile' }, 500);
  }
});

// Analyze a specific transaction
app.post('/api/analyze-transaction', async (c) => {
  try {
    const transaction = await c.req.json();
    const analysis = await transactionAnalyzer.analyze(transaction);
    
    return c.json({
      riskLevel: analysis.riskLevel,
      threats: analysis.threats,
      recommendation: analysis.recommendation,
      shouldBlock: analysis.shouldBlock
    });
  } catch (error) {
    return c.json({ error: 'Analysis failed' }, 500);
  }
});

// Get threat intelligence
app.get('/api/threats', (c) => {
  const recentThreats = threatDetector.getRecentThreats();
  return c.json({
    threats: recentThreats,
    total: recentThreats.length
  });
});

// Get audit trail
app.get('/api/audit-trail', (c) => {
  const actions = securityMonitor.getAuditTrail();
  return c.json({
    actions,
    total: actions.length
  });
});

// Update security rules
app.post('/api/security-rules', async (c) => {
  try {
    const rules = await c.req.json();
    await securityMonitor.updateSecurityRules(rules);
    return c.json({ success: true, message: 'Security rules updated' });
  } catch (error) {
    return c.json({ error: 'Failed to update rules' }, 500);
  }
});

// Start monitoring
console.log('🚀 Starting Vigil Security Agent...');

// Start the security monitor
securityMonitor.startMonitoring();

// Start the server
serve({
  fetch: app.fetch,
  port: Number(port)
}, (info) => {
  console.log(`🛡️  Vigil is watching on http://localhost:${info.port}`);
  console.log(`📊 Dashboard: http://localhost:${info.port}`);
  console.log(`🔍 Status: http://localhost:${info.port}/api/status`);
});

export default app;
