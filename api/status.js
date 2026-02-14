export default function handler(req, res) {
  res.status(200).json({
    monitoring: true,
    threatsDetected: Math.floor(Math.random() * 10),
    transactionsAnalyzed: Math.floor(Math.random() * 100) + 50,
    lastCheck: new Date().toISOString()
  });
}