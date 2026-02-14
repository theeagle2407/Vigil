import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { SecurityMonitor } from './services/security-monitor.js';
import { TransactionAnalyzer } from './services/transaction-analyzer.js';
import { ThreatDetector } from './services/threat-detector.js';
import { NEARService } from './services/near-service.js';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = new Hono();
const port = process.env.PORT || 3000;

const nearService = new NEARService();
const threatDetector = new ThreatDetector();
const transactionAnalyzer = new TransactionAnalyzer(threatDetector);
const securityMonitor = new SecurityMonitor(nearService, transactionAnalyzer);

app.get('/', (c) => {
  const html = readFileSync('./public/index.html', 'utf-8');
  return c.html(html);
});

app.get('/api', (c) => {
  return c.json({
    name: 'Vigil Security Agent',
    status: 'active',
    version: '1.0.0',
    message: 'Your 24/7 security agent is watching 🛡️'
  });
});

app.get('/api/status', (c) => {
  return c.json({
    monitoring: true,
    threatsDetected: securityMonitor.getThreatCount(),
    transactionsAnalyzed: securityMonitor.getTransactionCount(),
    lastCheck: new Date().toISOString()
  });
});

app.get('/api/wallet/:address', async (c) => {
  const address = c.req.param('address');
  try {
    const profile = await securityMonitor.getWalletProfile(address);
    return c.json(profile);
  } catch (error) {
    return c.json({ error: 'Failed to fetch wallet profile' }, 500);
  }
});

app.post('/api/monitor/:address', async (c) => {
  const address = c.req.param('address');
  return c.json({ 
    success: true, 
    message: `Now monitoring ${address}`,
    address 
  });
});

app.get('/api/threats', (c) => {
  const recentThreats = threatDetector.getRecentThreats();
  return c.json({
    threats: recentThreats,
    total: recentThreats.length
  });
});

app.get('/api/audit-trail', (c) => {
  const actions = securityMonitor.getAuditTrail();
  return c.json({
    actions,
    total: actions.length
  });
});

console.log('🚀 Starting Vigil Security Agent...');
securityMonitor.startMonitoring();

serve({
  fetch: app.fetch,
  port: Number(port)
}, (info) => {
  console.log(`🛡️  Vigil is watching on http://localhost:${info.port}`);
  console.log(`📊 Dashboard: http://localhost:${info.port}`);
  console.log(`🔍 Status: http://localhost:${info.port}/api/status`);
});

export default app;