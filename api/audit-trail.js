export default function handler(req, res) {
  const sampleActions = [
    {
      timestamp: new Date().toISOString(),
      action: 'WALLET_CONNECTED',
      reason: 'User connected wallet',
      riskLevel: 'INFO'
    },
    {
      timestamp: new Date().toISOString(),
      action: 'MONITORING_STARTED',
      reason: 'User initiated monitoring',
      riskLevel: 'INFO'
    }
  ];

  res.status(200).json({
    actions: sampleActions,
    total: sampleActions.length
  });
}